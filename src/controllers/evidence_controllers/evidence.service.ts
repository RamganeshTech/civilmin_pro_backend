import { createHash } from "crypto";
import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { EvidenceModel, type IEvidence, type  EvidenceContextKind } from "../../models/evidence_model/evidence.model.js";
import { LifeCycleModel } from "../../models/lifecycle_model/lifeCycle.model.js";
import { InspectionLotModel } from "../../models/inspection_model/inspectionLot.model.js";
import { ControlModel } from "../../models/control_model/control.model.js";
import { StatutoryFormModel } from "../../models/statutoryForm_model/statutoryForm.model.js";
import { uploadFileToS3 } from "../../utils/s3Upload.js";
// import { ApiError } from "../utils/apiError";
// import { EvidenceModel, IEvidence, EvidenceContextKind } from "../models/evidence.model";
// import { uploadFileToS3 } from "../services/upload.service";
// import { ProjectModel } from "../models/project.model";
// import { LifeCycleModel } from "../models/lifeCycle.model";
// import { InspectionLotModel } from "../models/inspectionLot.model";
// import { ControlModel } from "../models/control.model";
// import { StatutoryFormModel } from "../models/statutoryForm.model";

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

// Pushes the new evidence's _id into the target entity's evidenceIds array,
// so the gate/lot/control/form always knows what's attached to it.
const attachEvidenceToTarget = async (
  kind: EvidenceContextKind,
  refId: string,
  projectId: string,
  evidenceId: string
): Promise<void> => {
  switch (kind) {
    case "gate": {
      const gate = await LifeCycleModel.findOneAndUpdate(
        { projectId, gateId: refId, isActive: true },
        { $push: { evidenceIds: evidenceId } }
      );
      if (!gate) throw new ApiError(404, "Lifecycle gate not found for this refId");
      break;
    }
    case "lot": {
      if (!isValidObjectId(refId)) throw new ApiError(400, "Invalid refId for lot");
      const lot = await InspectionLotModel.findOneAndUpdate(
        { _id: refId, projectId, isActive: true },
        { $push: { evidenceIds: evidenceId } }
      );
      if (!lot) throw new ApiError(404, "Inspection lot not found for this refId");
      break;
    }
    case "control": {
      if (!isValidObjectId(refId)) throw new ApiError(400, "Invalid refId for control");
      const control = await ControlModel.findOneAndUpdate(
        { _id: refId, projectId, isActive: true },
        { $push: { evidenceIds: evidenceId } }
      );
      if (!control) throw new ApiError(404, "Control not found for this refId");
      break;
    }
    case "form": {
      if (!isValidObjectId(refId)) throw new ApiError(400, "Invalid refId for form");
      const form = await StatutoryFormModel.findOneAndUpdate(
        { _id: refId, projectId, isActive: true },
        { $push: { evidenceIds: evidenceId } }
      );
      if (!form) throw new ApiError(404, "Statutory form not found for this refId");
      break;
    }
    case "general":
      // No target to attach to — evidence stands on its own.
      break;
    default:
      throw new ApiError(400, "Invalid context kind");
  }
};

export const createEvidence = async (
  organizationId: string,
  projectId: string,
  uploadedBy: string,
  uploadedByRole: string,
  file: Express.Multer.File,
  contextKind: EvidenceContextKind,
  contextRefId: string | null
): Promise<{ evidence: IEvidence }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!contextKind) throw new ApiError(400, "context kind is required");
  if (contextKind !== "general" && !contextRefId) {
    throw new ApiError(400, "context refId is required for this context kind");
  }

  const uploadedData = await uploadFileToS3(file);
  const sha256 = createHash("sha256").update(file.buffer).digest("hex");

  const evidence = await EvidenceModel.create({
    organizationId,
    projectId,
    proof: {
      type: uploadedData.type,
      key: uploadedData.key,
      url: uploadedData.url,
      originalName: uploadedData.originalName,
      uploadedAt: uploadedData.uploadedAt,
    },
    sha256,
    uploadedBy,
    uploadedByRole,
    context: { kind: contextKind, refId: contextRefId },
  });

  if (contextRefId) {
    await attachEvidenceToTarget(contextKind, contextRefId, projectId, evidence._id.toString());
  }

  return { evidence };
};

export const getEvidenceList = async (
  organizationId: string,
  projectId: string,
  contextKind?: string,
  contextRefId?: string
): Promise<{ evidenceList: IEvidence[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const filter: Record<string, unknown> = { organizationId, projectId, isActive: true };
  if (contextKind) filter["context.kind"] = contextKind;
  if (contextRefId) filter["context.refId"] = contextRefId;

  const evidenceList = await EvidenceModel.find(filter)
    .populate("uploadedBy", "_id userName")
    .sort({ createdAt: -1 });

  return { evidenceList };
};

export const getEvidenceById = async (
  organizationId: string,
  projectId: string,
  evidenceId: string
): Promise<{ evidence: IEvidence }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(evidenceId)) throw new ApiError(400, "Invalid evidenceId");

  const evidence = await EvidenceModel.findOne({
    _id: evidenceId,
    organizationId,
    projectId,
    isActive: true,
  }).populate("uploadedBy", "_id userName");

  if (!evidence) throw new ApiError(404, "Evidence not found");

  return { evidence };
};