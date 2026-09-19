import { isValidObjectId } from "mongoose";
import { ApiError } from "../../utils/apiError.js";
import { pickFields } from "../../utils/utils.js";
import { assertRoleIsAuthorizedSigner } from "../appointment_controllers/appointment.service.js";
import { STATUTORY_FORMS_CONFIG } from "./statutoryForms.config.js";
import { StatutoryFormModel, type IStatutoryForm } from "../../models/statutoryForm_model/statutoryForm.model.js";

interface IUpdateFormDraftInput {
  applicability?: "REQUIRED" | "NA" | "PENDING";
  naReason?: string;
}

interface ISignFormInput {
  role: string;
  registrationNumber: string;
}

const ALLOWED_DRAFT_FIELDS: (keyof IUpdateFormDraftInput)[] = ["applicability", "naReason"];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const initializeStatutoryForms = async (
  organizationId: string,
  projectId: string,
  createdBy: string
): Promise<{ forms: IStatutoryForm[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const existingCount = await StatutoryFormModel.countDocuments({ projectId, isActive: true });
  if (existingCount > 0) {
    throw new ApiError(409, "Statutory forms already initialized for this project");
  }

  const docs = STATUTORY_FORMS_CONFIG.map((f) => ({
    organizationId,
    projectId,
    formId: f.formId,
    gateId: f.gateId,
    createdBy,
  }));

  const forms = await StatutoryFormModel.insertMany(docs);
  return { forms: forms as unknown as IStatutoryForm[] };
};

export const getStatutoryForms = async (
  organizationId: string,
  projectId: string,
  gateId?: string
): Promise<{ forms: IStatutoryForm[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const filter: Record<string, unknown> = { organizationId, projectId, isActive: true };
  if (gateId) filter.gateId = gateId;

  const forms = await StatutoryFormModel.find(filter)
    .populate("createdBy", "_id userName")
    .sort({ createdAt: 1 });

  return { forms };
};

export const getStatutoryFormById = async (
  organizationId: string,
  projectId: string,
  formId: string
): Promise<{ form: IStatutoryForm }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const form = await StatutoryFormModel.findOne({ organizationId, projectId, formId, isActive: true })
    .populate("createdBy", "_id userName")
    .populate("evidenceIds", "_id proof")
    .populate("signOff.actorId", "_id userName");

  if (!form) throw new ApiError(404, "Statutory form not found");

  return { form };
};

export const updateStatutoryFormDraft = async (
  organizationId: string,
  projectId: string,
  formId: string,
  payload: IUpdateFormDraftInput
): Promise<{ form: IStatutoryForm }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const existing = await StatutoryFormModel.findOne({ organizationId, projectId, formId, isActive: true });
  if (!existing) throw new ApiError(404, "Statutory form not found");

  if (existing.status === "COMPLETE") {
    throw new ApiError(409, "Form is complete — cannot edit a signed record");
  }

  const safePayload = pickFields<IUpdateFormDraftInput>(payload, ALLOWED_DRAFT_FIELDS);

  const form = await StatutoryFormModel.findOneAndUpdate(
    { organizationId, projectId, formId, isActive: true },
    { $set: safePayload },
    { new: true }
  );

  if (!form) throw new ApiError(404, "Statutory form not found");

  return { form };
};

export const signStatutoryForm = async (
  organizationId: string,
  projectId: string,
  formId: string,
  actorId: string,
  actorName: string,
  payload: ISignFormInput
): Promise<{ form: IStatutoryForm }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!payload.role) throw new ApiError(400, "role is required");
  if (!payload.registrationNumber) throw new ApiError(400, "registrationNumber is required");

  const form = await StatutoryFormModel.findOne({ organizationId, projectId, formId, isActive: true });
  if (!form) throw new ApiError(404, "Statutory form not found");

  if (form.status === "COMPLETE") throw new ApiError(409, "Form is already complete");

  if (form.applicability !== "NA" && form.evidenceIds.length === 0) {
    throw new ApiError(400, "At least one evidence attachment is required to sign this form");
  }

  await assertRoleIsAuthorizedSigner(projectId, payload.role, payload.registrationNumber);

  form.status = form.applicability === "NA" ? "NA" : "COMPLETE";
  form.signOff = {
    actorId: actorId as any,
    actorName,
    actorRole: payload.role,
    actorReg: payload.registrationNumber,
    signedAt: new Date(),
  };

  await form.save();

  return { form };
};

// Used internally by the Gate lock check — confirms every form tied
// to this gate is either COMPLETE or explicitly marked N.A.
export const areAllFormsCompleteForGate = async (projectId: string, gateId: string): Promise<boolean> => {
  const incompleteCount = await StatutoryFormModel.countDocuments({
    projectId,
    gateId,
    isActive: true,
    status: "DRAFT",
  });
  return incompleteCount === 0;
};