import { isValidObjectId } from "mongoose";
import { LifeCycleModel, type ILifeCycle, type IGateChecklistItem } from "../../models/lifecycle_model/lifeCycle.model.js";
import { ApiError } from "../../utils/apiError.js";
import { LIFECYCLE_GATES_CONFIG } from "./lifecycleGates.config.js";
import { pickFields } from "../../utils/utils.js";
// import { ApiError } from "../utils/apiError";
// import { pickFields } from "../utils/pickFields";
// import { ProjectModel } from "../models/project.model";

interface IUpdateDraftInput {
  checklist?: IGateChecklistItem[];
  notes?: string;
  applicability?: "REQUIRED" | "NA" | "PENDING";
  naReason?: string;
  evidenceIds?: string[];
}

const ALLOWED_DRAFT_FIELDS: (keyof IUpdateDraftInput)[] = [
  "checklist",
  "notes",
  "applicability",
  "naReason",
  "evidenceIds",
];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const initializeLifeCycleGates = async (
  organizationId: string,
  projectId: string,
  createdBy: string
): Promise<{ gates: ILifeCycle[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const existingCount = await LifeCycleModel.countDocuments({ projectId, isActive: true });
  if (existingCount > 0) {
    throw new ApiError(409, "Lifecycle gates already initialized for this project");
  }

  const docs = LIFECYCLE_GATES_CONFIG.map((g) => ({
    organizationId,
    projectId,
    gateId: g.gateId,
    phase: g.phase,
    title: g.title,
    checklist: g.checklist.map((label) => ({ label, checked: false })),
    createdBy,
  }));

  const gates = await LifeCycleModel.insertMany(docs);
  return { gates: gates as unknown as ILifeCycle[] };
};

export const getLifeCycleGates = async (
  organizationId: string,
  projectId: string
): Promise<{ gates: ILifeCycle[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const gates = await LifeCycleModel.find({ organizationId, projectId, isActive: true }).sort({ createdAt: 1 });
  return { gates };
};

export const getLifeCycleGateById = async (
  organizationId: string,
  projectId: string,
  gateId: string
): Promise<{ gate: ILifeCycle }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const gate = await LifeCycleModel.findOne({ organizationId, projectId, gateId, isActive: true })
    .populate("createdBy", "_id userName")
    .populate("evidenceIds", "_id url originalName type");

  if (!gate) throw new ApiError(404, "Lifecycle gate not found");
  return { gate };
};

export const updateLifeCycleGateDraft = async (
  organizationId: string,
  projectId: string,
  gateId: string,
  payload: IUpdateDraftInput
): Promise<{ gate: ILifeCycle }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const existing = await LifeCycleModel.findOne({ organizationId, projectId, gateId, isActive: true });
  if (!existing) throw new ApiError(404, "Lifecycle gate not found");

  if (existing.status === "LOCKED") {
    throw new ApiError(409, "Gate is locked — cannot edit a signed record");
  }

  const safePayload = pickFields<IUpdateDraftInput>(payload, ALLOWED_DRAFT_FIELDS);

  const gate = await LifeCycleModel.findOneAndUpdate(
    { organizationId, projectId, gateId, isActive: true },
    { $set: safePayload },
    { new: true }
  );

  if (!gate) throw new ApiError(404, "Lifecycle gate not found");
  return { gate };
};



//  second phase

import { assertRoleIsAuthorizedSigner } from "../appointment_controllers/appointment.service.js";

interface ILockGateInput {
  role: string;
  registrationNumber: string;
}

export const lockLifeCycleGate = async (
  organizationId: string,
  projectId: string,
  gateId: string,
  actorId: string,
  actorName: string,
  payload: ILockGateInput
): Promise<{ gate: ILifeCycle }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!payload.role) throw new ApiError(400, "role is required");
  if (!payload.registrationNumber) throw new ApiError(400, "registrationNumber is required");

  const gate = await LifeCycleModel.findOne({ organizationId, projectId, gateId, isActive: true });
  if (!gate) throw new ApiError(404, "Lifecycle gate not found");

  if (gate.status === "LOCKED") {
    throw new ApiError(409, "Gate is already locked");
  }

  // 1. Confirm the signer holds a verified, active appointment for the claimed role
  // on this exact project — mirrors the HTML's signPolicyOK check.
  await assertRoleIsAuthorizedSigner(projectId, payload.role, payload.registrationNumber);

  // 2. Every checklist item must be checked before a gate can lock.
  const allChecked = gate.checklist.every((item) => item.checked);
  if (!allChecked) {
    throw new ApiError(400, "All checklist items must be completed before locking this gate");
  }

  // 3. Evidence must exist unless the gate was explicitly marked Not Applicable.
  if (gate.applicability !== "NA" && gate.evidenceIds.length === 0) {
    throw new ApiError(400, "At least one evidence attachment is required to lock this gate");
  }

  // NOTE: not yet enforced here — add once these modules exist:
  //   - block lock if an open Control (STOP/critical NCR) targets this gate
  //   - block lock if this gate's related Inspection Lots aren't RELEASED
  //   - block lock if this gate's related Statutory Forms aren't COMPLETE

  gate.status = "LOCKED";
  gate.signOff = {
    actorId: actorId as any,
    actorName,
    actorRole: payload.role,
    actorReg: payload.registrationNumber,
    signedAt: new Date(),
  };

  await gate.save();

  return { gate };
};