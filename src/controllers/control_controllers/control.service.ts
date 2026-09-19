import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { pickFields } from "../../utils/utils.js";
import { ControlModel, type IControl, type ControlType } from "../../models/control_model/control.model.js";

interface ICreateControlInput {
  type: ControlType;
  description: string;
  severity?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  blocksWork?: boolean;
  affectedFromGateId: string;
  scopeId?: string;
}

interface ICloseControlInput {
  role: string;
  registrationNumber: string;
  resolution: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateControlInput)[] = [
  "type",
  "description",
  "severity",
  "blocksWork",
  "affectedFromGateId",
  "scopeId",
];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const createControl = async (
  organizationId: string,
  projectId: string,
  createdBy: string,
  payload: ICreateControlInput
): Promise<{ control: IControl }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateControlInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.type) throw new ApiError(400, "type is required");
  if (!safePayload.description || !safePayload.description.trim()) {
    throw new ApiError(400, "description is required");
  }
  if (!safePayload.affectedFromGateId) throw new ApiError(400, "affectedFromGateId is required");

  // STOP-WORK and CHANGE controls block work by nature, regardless of what the caller sends.
  const blocksWork =
    safePayload.type === "STOP" || safePayload.type === "CHANGE" ? true : !!safePayload.blocksWork;

  const control = await ControlModel.create({
    ...safePayload,
    description: safePayload.description.trim(),
    blocksWork,
    organizationId,
    projectId,
    createdBy,
  });

  return { control };
};

export const getControls = async (
  organizationId: string,
  projectId: string,
  status?: string
): Promise<{ controls: IControl[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const filter: Record<string, unknown> = { organizationId, projectId, isActive: true };
  if (status) filter.status = status;

  const controls = await ControlModel.find(filter)
    .populate("createdBy", "_id userName")
    .populate("closure.actorId", "_id userName")
    .sort({ createdAt: -1 });

  return { controls };
};

export const getControlById = async (
  organizationId: string,
  projectId: string,
  controlId: string
): Promise<{ control: IControl }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(controlId)) throw new ApiError(400, "Invalid controlId");

  const control = await ControlModel.findOne({ _id: controlId, organizationId, projectId, isActive: true })
    .populate("createdBy", "_id userName")
    .populate("evidenceIds", "_id proof")
    .populate("closure.actorId", "_id userName");

  if (!control) throw new ApiError(404, "Control not found");

  return { control };
};

export const closeControl = async (
  organizationId: string,
  projectId: string,
  controlId: string,
  actorId: string,
  actorName: string,
  payload: ICloseControlInput
): Promise<{ control: IControl }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(controlId)) throw new ApiError(400, "Invalid controlId");
  if (!payload.role) throw new ApiError(400, "role is required");
  if (!payload.registrationNumber) throw new ApiError(400, "registrationNumber is required");
  if (!payload.resolution || !payload.resolution.trim()) {
    throw new ApiError(400, "resolution is required");
  }

  const control = await ControlModel.findOne({ _id: controlId, organizationId, projectId, isActive: true });
  if (!control) throw new ApiError(404, "Control not found");

  if (control.status === "CLOSED") {
    throw new ApiError(409, "Control is already closed");
  }

  const { assertRoleIsAuthorizedSigner } = await import("../appointment_controllers/appointment.service.js");
  await assertRoleIsAuthorizedSigner(projectId, payload.role, payload.registrationNumber);

  control.status = "CLOSED";
  control.resolution = payload.resolution.trim();
  control.closure = {
    actorId: actorId as any,
    actorName,
    actorRole: payload.role,
    actorReg: payload.registrationNumber,
    closedAt: new Date(),
  };

  await control.save();

  return { control };
};

// Used internally by Gate lock / Lot release checks —
// confirms no open blocking control targets this gate or lot.
export const hasOpenBlockingControlForGate = async (projectId: string, gateId: string): Promise<boolean> => {
  const count = await ControlModel.countDocuments({
    projectId,
    affectedFromGateId: gateId,
    status: "OPEN",
    blocksWork: true,
    isActive: true,
  });
  return count > 0;
};

export const hasOpenBlockingControlForLot = async (projectId: string, lotId: string): Promise<boolean> => {
  const count = await ControlModel.countDocuments({
    projectId,
    scopeId: lotId,
    status: "OPEN",
    blocksWork: true,
    isActive: true,
  });
  return count > 0;
};