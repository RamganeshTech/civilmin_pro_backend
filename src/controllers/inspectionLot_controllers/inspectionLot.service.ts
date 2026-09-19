import { isValidObjectId } from "mongoose";
// import { ApiError } from "../utils/apiError.js";
// import { pickFields } from "../utils/pickFields.js";
// import { ProjectModel } from "../project_controllers/project.model.js";
import { assertRoleIsAuthorizedSigner } from "../appointment_controllers/appointment.service.js";
import { ApiError } from "../../utils/apiError.js";
import { InspectionLotModel, type IInspectionLot } from "../../models/inspection_model/inspectionLot.model.js";
import { pickFields } from "../../utils/utils.js";

interface ICreateLotInput {
  gateId: string;
  lotType: string;
  location: string;
  drawingRev?: string;
  itpRef?: string;
  criteriaRef?: string;
}

interface IUpdateLotDraftInput {
  location?: string;
  drawingRev?: string;
  itpRef?: string;
  criteriaRef?: string;
  notes?: string;
}

interface IReleaseLotInput {
  role: string;
  registrationNumber: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateLotInput)[] = [
  "gateId",
  "lotType",
  "location",
  "drawingRev",
  "itpRef",
  "criteriaRef",
];

const ALLOWED_DRAFT_FIELDS: (keyof IUpdateLotDraftInput)[] = [
  "location",
  "drawingRev",
  "itpRef",
  "criteriaRef",
  "notes",
];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const createInspectionLot = async (
  organizationId: string,
  projectId: string,
  createdBy: string,
  payload: ICreateLotInput
): Promise<{ lot: IInspectionLot }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateLotInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.gateId) throw new ApiError(400, "gateId is required");
  if (!safePayload.lotType) throw new ApiError(400, "lotType is required");
  if (!safePayload.location || !safePayload.location.trim()) {
    throw new ApiError(400, "location is required");
  }

  const lot = await InspectionLotModel.create({
    ...safePayload,
    location: safePayload.location.trim(),
    organizationId,
    projectId,
    createdBy,
  });

  return { lot };
};

export const getInspectionLots = async (
  organizationId: string,
  projectId: string,
  gateId?: string
): Promise<{ lots: IInspectionLot[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const filter: Record<string, unknown> = { organizationId, projectId, isActive: true };
  if (gateId) filter.gateId = gateId;

  const lots = await InspectionLotModel.find(filter)
    .populate("createdBy", "_id userName")
    .populate("signOff.actorId", "_id userName")
    .sort({ createdAt: -1 });

  return { lots };
};

export const getInspectionLotById = async (
  organizationId: string,
  projectId: string,
  lotId: string
): Promise<{ lot: IInspectionLot }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(lotId)) throw new ApiError(400, "Invalid lotId");

  const lot = await InspectionLotModel.findOne({ _id: lotId, organizationId, projectId, isActive: true })
    .populate("createdBy", "_id userName")
    .populate("evidenceIds", "_id proof")
    .populate("signOff.actorId", "_id userName");

  if (!lot) throw new ApiError(404, "Inspection lot not found");

  return { lot };
};

export const updateInspectionLotDraft = async (
  organizationId: string,
  projectId: string,
  lotId: string,
  payload: IUpdateLotDraftInput
): Promise<{ lot: IInspectionLot }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(lotId)) throw new ApiError(400, "Invalid lotId");

  const existing = await InspectionLotModel.findOne({ _id: lotId, organizationId, projectId, isActive: true });
  if (!existing) throw new ApiError(404, "Inspection lot not found");

  if (existing.status === "RELEASED") {
    throw new ApiError(409, "Lot is released — cannot edit a signed record");
  }

  const safePayload = pickFields<IUpdateLotDraftInput>(payload, ALLOWED_DRAFT_FIELDS);

  const lot = await InspectionLotModel.findOneAndUpdate(
    { _id: lotId, organizationId, projectId, isActive: true },
    { $set: safePayload },
    { new: true }
  );

  if (!lot) throw new ApiError(404, "Inspection lot not found");

  return { lot };
};

export const releaseInspectionLot = async (
  organizationId: string,
  projectId: string,
  lotId: string,
  actorId: string,
  actorName: string,
  payload: IReleaseLotInput
): Promise<{ lot: IInspectionLot }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(lotId)) throw new ApiError(400, "Invalid lotId");
  if (!payload.role) throw new ApiError(400, "role is required");
  if (!payload.registrationNumber) throw new ApiError(400, "registrationNumber is required");

  const lot = await InspectionLotModel.findOne({ _id: lotId, organizationId, projectId, isActive: true });
  if (!lot) throw new ApiError(404, "Inspection lot not found");

  if (lot.status === "RELEASED") {
    throw new ApiError(409, "Lot is already released");
  }
  if (lot.status === "BLOCKED") {
    throw new ApiError(409, "Lot is blocked — resolve the blocking control before releasing");
  }
  if (lot.evidenceIds.length === 0) {
    throw new ApiError(400, "At least one evidence attachment is required to release this lot");
  }

  await assertRoleIsAuthorizedSigner(projectId, payload.role, payload.registrationNumber);

  lot.status = "RELEASED";
  lot.signOff = {
    actorId: actorId as any,
    actorName,
    actorRole: payload.role,
    actorReg: payload.registrationNumber,
    signedAt: new Date(),
  };

  await lot.save();

  return { lot };
};

// Used internally by the Gate lock check (once wired in) —
// confirms every lot opened under a given gate has been released.
export const areAllLotsReleasedForGate = async (projectId: string, gateId: string): Promise<boolean> => {
  const openLots = await InspectionLotModel.countDocuments({
    projectId,
    gateId,
    isActive: true,
    status: { $ne: "RELEASED" },
  });
  return openLots === 0;
};