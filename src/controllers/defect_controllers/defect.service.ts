import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { pickFields } from "../../utils/utils.js";
import { 
 type IDefect,
 type IDefectActor,
 type IDefectHistoryEntry,
 type IDefectProof,
 type DefectPhotoStage,
 type DefectSeverity,
 type DefectStatus,
 DefectModel, } from "../../models/defect_model/defect.model.js";
import { uploadFileToS3 } from "../../utils/s3Upload.js";
// import { ProjectModel } from "../project_controllers/project.model.js";
// import { uploadFileToS3 } from "../../services/upload.service.js";
// import {
//   DefectModel,
//   IDefect,
//   IDefectActor,
//   IDefectHistoryEntry,
//   IDefectProof,
//   DefectPhotoStage,
//   DefectSeverity,
//   DefectStatus,
// } from "./defect.model.js";

interface ICreateDefectInput {
  stage?: string;
  location?: string;
  description?: string;
  govtCode?: string;
  severity: DefectSeverity;
  assignedToUserId?: string;
  assignedToName: string;
  dueDate?: Date;
}

interface IUpdateDefectDetailsInput {
  stage?: string;
  location?: string;
  description?: string;
  govtCode?: string;
  severity?: DefectSeverity;
  assignedToUserId?: string;
  assignedToName?: string;
  dueDate?: Date;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateDefectInput)[] = [
  "stage",
  "location",
  "description",
  "govtCode",
  "severity",
  "assignedToUserId",
  "assignedToName",
  "dueDate",
];

const ALLOWED_UPDATE_FIELDS: (keyof IUpdateDefectDetailsInput)[] = [
  "stage",
  "location",
  "description",
  "govtCode",
  "severity",
  "assignedToUserId",
  "assignedToName",
  "dueDate",
];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

// Every mutation appends one of these — the single source of truth for "who did what, when."
const buildHistoryEntry = (
  actor: IDefectActor,
  action: string,
  color: IDefectHistoryEntry["color"]
): IDefectHistoryEntry => ({
  date: new Date(),
  action,
  by: actor,
  color,
});

export const createDefect = async (
  organizationId: string,
  projectId: string,
  raisedBy: string,
  actor: IDefectActor,
  payload: ICreateDefectInput,
  files: Express.Multer.File[]
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateDefectInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.severity) throw new ApiError(400, "severity is required");
  if (!safePayload.assignedToName || !safePayload.assignedToName.trim()) {
    throw new ApiError(400, "assignedToName is required");
  }

  const beforeMedia: IDefectProof[] = [];
  for (const file of files) {
    const uploaded = await uploadFileToS3(file);
    beforeMedia.push({
      type: uploaded.type,
      key: uploaded.key,
      url: uploaded.url,
      originalName: uploaded.originalName,
      uploadedAt: uploaded.uploadedAt,
      uploadedBy: raisedBy as any,
    });
  }

  const defect = await DefectModel.create({
    organizationId,
    projectId,
    stage: safePayload.stage ?? null,
    location: safePayload.location ?? null,
    description: safePayload.description ?? null,
    govtCode: safePayload.govtCode ?? null,
    severity: safePayload.severity,
    assignedTo: {
      userId: safePayload.assignedToUserId ?? null,
      name: safePayload.assignedToName.trim(),
    },
    dueDate: safePayload.dueDate,
    raisedBy,
    media: { before: beforeMedia, after: [] },
    history: [buildHistoryEntry(actor, "Defect raised", "red")],
    createdBy: raisedBy,
  });

  return { defect };
};

export const getDefects = async (
  organizationId: string,
  projectId: string,
  status?: string,
  severity?: string
): Promise<{ defects: IDefect[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const filter: Record<string, unknown> = { organizationId, projectId, isActive: true };
  if (status) filter.status = status;
  if (severity) filter.severity = severity;

  const defects = await DefectModel.find(filter)
    .populate("assignedTo.userId", "_id userName")
    .populate("raisedBy", "_id userName")
    .sort({ createdAt: -1 });

  return { defects };
};

export const getInactiveDefects = async (
  organizationId: string,
  projectId: string
): Promise<{ defects: IDefect[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const defects = await DefectModel.find({ organizationId, projectId, isActive: false })
    .populate("assignedTo.userId", "_id userName")
    .populate("raisedBy", "_id userName")
    .sort({ updatedAt: -1 });

  return { defects };
};

export const getDefectById = async (
  organizationId: string,
  projectId: string,
  defectId: string
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");

  const defect = await DefectModel.findOne({ _id: defectId, organizationId, projectId })
    .populate("assignedTo.userId", "_id userName")
    .populate("raisedBy", "_id userName")
    .populate("media.before.uploadedBy", "_id userName")
    .populate("media.after.uploadedBy", "_id userName")
    .populate("history.by.actorId", "_id userName");

  if (!defect) throw new ApiError(404, "Defect not found");

  return { defect };
};

export const updateDefectDetails = async (
  organizationId: string,
  projectId: string,
  defectId: string,
  actor: IDefectActor,
  payload: IUpdateDefectDetailsInput
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");

  const existing = await DefectModel.findOne({ _id: defectId, organizationId, projectId, isActive: true });
  if (!existing) throw new ApiError(404, "Defect not found");

  const safePayload = pickFields<IUpdateDefectDetailsInput>(payload, ALLOWED_UPDATE_FIELDS);

  const updateSet: Record<string, unknown> = { ...safePayload };
  delete updateSet.assignedToUserId;
  delete updateSet.assignedToName;

  if (safePayload.assignedToName) {
    updateSet["assignedTo.name"] = safePayload.assignedToName.trim();
    updateSet["assignedTo.userId"] = safePayload.assignedToUserId ?? null;
  }

  const defect = await DefectModel.findOneAndUpdate(
    { _id: defectId, organizationId, projectId, isActive: true },
    {
      $set: updateSet,
      $push: { history: buildHistoryEntry(actor, "Defect details updated", "amber") },
    },
    { new: true }
  );

  if (!defect) throw new ApiError(404, "Defect not found");

  return { defect };
};

export const updateDefectStatus = async (
  organizationId: string,
  projectId: string,
  defectId: string,
  actor: IDefectActor,
  status: DefectStatus
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");
  if (!status) throw new ApiError(400, "status is required");

  const existing = await DefectModel.findOne({ _id: defectId, organizationId, projectId, isActive: true });
  if (!existing) throw new ApiError(404, "Defect not found");

  if (status === "closed" && existing.media.after.length === 0) {
    throw new ApiError(400, "An after photo is required before this defect can be closed");
  }

  const colorMap: Record<DefectStatus, IDefectHistoryEntry["color"]> = {
    open: "red",
    inprogress: "amber",
    rectified: "purple",
    closed: "green",
  };

  const actionTextMap: Record<DefectStatus, string> = {
    open: "Defect reopened",
    inprogress: "Marked as In Progress",
    rectified: "Marked as Rectified",
    closed: "Defect verified and closed",
  };

  const defect = await DefectModel.findOneAndUpdate(
    { _id: defectId, organizationId, projectId, isActive: true },
    {
      $set: { status, closedOn: status === "closed" ? new Date() : existing.closedOn },
      $push: { history: buildHistoryEntry(actor, actionTextMap[status], colorMap[status]) },
    },
    { new: true }
  );

  if (!defect) throw new ApiError(404, "Defect not found");

  return { defect };
};

export const updateDefectMedia = async (
  organizationId: string,
  projectId: string,
  defectId: string,
  uploadedBy: string,
  actor: IDefectActor,
  mediaStage: DefectPhotoStage,
  files: Express.Multer.File[]
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");
  if (mediaStage !== "before" && mediaStage !== "after") {
    throw new ApiError(400, "mediaStage must be 'before' or 'after'");
  }
  if (!files || files.length === 0) throw new ApiError(400, "At least one file is required");

  const existing = await DefectModel.findOne({ _id: defectId, organizationId, projectId, isActive: true });
  if (!existing) throw new ApiError(404, "Defect not found");

  const uploadedMedia: IDefectProof[] = [];
  for (const file of files) {
    const uploaded = await uploadFileToS3(file);
    uploadedMedia.push({
      type: uploaded.type,
      key: uploaded.key,
      url: uploaded.url,
      originalName: uploaded.originalName,
      uploadedAt: uploaded.uploadedAt,
      uploadedBy: uploadedBy as any,
    });
  }

  const actionText = mediaStage === "before" ? "Before photo added" : "After photo added — proof of rectification";
  const color: IDefectHistoryEntry["color"] = mediaStage === "before" ? "red" : "green";

  const defect = await DefectModel.findOneAndUpdate(
    { _id: defectId, organizationId, projectId, isActive: true },
    {
      $push: {
        [`media.${mediaStage}`]: { $each: uploadedMedia },
        history: buildHistoryEntry(actor, actionText, color),
      },
    },
    { new: true }
  );

  if (!defect) throw new ApiError(404, "Defect not found");

  return { defect };
};

export const softDeleteDefect = async (
  organizationId: string,
  projectId: string,
  defectId: string,
  actor: IDefectActor
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");

  const defect = await DefectModel.findOneAndUpdate(
    { _id: defectId, organizationId, projectId, isActive: true },
    {
      $set: { isActive: false },
      $push: { history: buildHistoryEntry(actor, "Defect deleted", "red") },
    },
    { new: true }
  );

  if (!defect) throw new ApiError(404, "Defect not found");

  return { defect };
};

export const recoverDefect = async (
  organizationId: string,
  projectId: string,
  defectId: string,
  actor: IDefectActor
): Promise<{ defect: IDefect }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");

  const defect = await DefectModel.findOneAndUpdate(
    { _id: defectId, organizationId, projectId, isActive: false },
    {
      $set: { isActive: true },
      $push: { history: buildHistoryEntry(actor, "Defect recovered", "amber") },
    },
    { new: true }
  );

  if (!defect) throw new ApiError(404, "Defect not found in recycle bin");

  return { defect };
};

export const hardDeleteDefect = async (
  organizationId: string,
  projectId: string,
  defectId: string
): Promise<{ deleted: boolean }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(defectId)) throw new ApiError(400, "Invalid defectId");

  const result = await DefectModel.findOneAndDelete({ _id: defectId, organizationId, projectId });
  if (!result) throw new ApiError(404, "Defect not found");

  return { deleted: true };
};