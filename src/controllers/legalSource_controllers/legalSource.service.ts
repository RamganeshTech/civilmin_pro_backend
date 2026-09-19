import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { pickFields } from "../../utils/utils.js";
import {LegalSourceModel, type  ILegalSource } from "../../models/legalSource_model/legalSource.model.js";
// import { ProjectModel } from "../project_controllers/project.model.js";
// import { LegalSourceModel, ILegalSource } from "./legalSource.model.js";

interface ICreateLegalSourceInput {
  name: string;
  editionOrRevision?: string;
  notes?: string;
}

interface IUpdateLegalSourceInput {
  name?: string;
  editionOrRevision?: string;
  notes?: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateLegalSourceInput)[] = ["name", "editionOrRevision", "notes"];
const ALLOWED_UPDATE_FIELDS: (keyof IUpdateLegalSourceInput)[] = ["name", "editionOrRevision", "notes"];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const createLegalSource = async (
  organizationId: string,
  projectId: string,
  createdBy: string,
  payload: ICreateLegalSourceInput
): Promise<{ source: ILegalSource }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateLegalSourceInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.name || !safePayload.name.trim()) {
    throw new ApiError(400, "name is required");
  }

  const source = await LegalSourceModel.create({
    ...safePayload,
    name: safePayload.name.trim(),
    organizationId,
    projectId,
    createdBy,
  });

  return { source };
};

export const getLegalSources = async (
  organizationId: string,
  projectId: string
): Promise<{ sources: ILegalSource[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const sources = await LegalSourceModel.find({ organizationId, projectId, isActive: true })
    .populate("verifiedBy", "_id userName")
    .populate("createdBy", "_id userName")
    .sort({ createdAt: -1 });

  return { sources };
};

export const getLegalSourceById = async (
  organizationId: string,
  projectId: string,
  sourceId: string
): Promise<{ source: ILegalSource }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(sourceId)) throw new ApiError(400, "Invalid sourceId");

  const source = await LegalSourceModel.findOne({ _id: sourceId, organizationId, projectId, isActive: true })
    .populate("verifiedBy", "_id userName")
    .populate("createdBy", "_id userName");

  if (!source) throw new ApiError(404, "Legal source not found");

  return { source };
};

// Editing a verified source must reset it to UNVERIFIED and — per the HTML's
// design — invalidate downstream gate approvals so they get re-reviewed.
// The gate re-open side of this is wired in once wiring-up happens.
export const updateLegalSource = async (
  organizationId: string,
  projectId: string,
  sourceId: string,
  payload: IUpdateLegalSourceInput
): Promise<{ source: ILegalSource }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(sourceId)) throw new ApiError(400, "Invalid sourceId");

  const safePayload = pickFields<IUpdateLegalSourceInput>(payload, ALLOWED_UPDATE_FIELDS);

  const source = await LegalSourceModel.findOneAndUpdate(
    { _id: sourceId, organizationId, projectId, isActive: true },
    { $set: { ...safePayload, verificationStatus: "UNVERIFIED", verifiedBy: null, verifiedAt: null } },
    { new: true }
  );

  if (!source) throw new ApiError(404, "Legal source not found");

  return { source };
};

export const verifyLegalSource = async (
  organizationId: string,
  projectId: string,
  sourceId: string,
  verifiedBy: string
): Promise<{ source: ILegalSource }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(sourceId)) throw new ApiError(400, "Invalid sourceId");

  const source = await LegalSourceModel.findOneAndUpdate(
    { _id: sourceId, organizationId, projectId, isActive: true },
    { $set: { verificationStatus: "VERIFIED", verifiedBy, verifiedAt: new Date() } },
    { new: true }
  );

  if (!source) throw new ApiError(404, "Legal source not found");

  return { source };
};

// Used internally by the Gate lock check — the HTML requires the entire
// source register to be verified before REG-00 (and downstream gates) can lock.
export const isSourceSetVerified = async (projectId: string): Promise<boolean> => {
  const unverifiedCount = await LegalSourceModel.countDocuments({
    projectId,
    isActive: true,
    verificationStatus: "UNVERIFIED",
  });
  return unverifiedCount === 0;
};