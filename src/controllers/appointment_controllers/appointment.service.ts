import { isValidObjectId } from "mongoose";
import { AppointmentModel, type IAppointment, type IProfessionalRole } from "../../models/projectClassification_model/projectAppointment.model.js";
import { ApiError } from "../../utils/apiError.js";
import { pickFields } from "../../utils/utils.js";
// import { ApiError } from "../utils/apiError.js";
// import { pickFields } from "../utils/pickFields.js";
// import { ProjectModel } from "../project_controllers/project.model.js";
// import { AppointmentModel, IAppointment, IProfessionalRole } from "./appointment.model.js";

interface ICreateAppointmentInput {
  role: IProfessionalRole;
  name: string;
  registrationNumber: string;
  userId?: string;
  validFrom?: Date;
  validTo?: Date;
  scopeNotes?: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateAppointmentInput)[] = [
  "role",
  "name",
  "registrationNumber",
  "userId",
  "validFrom",
  "validTo",
  "scopeNotes",
];

const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

//   const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
//   if (!project) throw new ApiError(404, "Project not found for this organization");
};

export const createAppointment = async (
  organizationId: string,
  projectId: string,
  createdBy: string,
  payload: ICreateAppointmentInput
): Promise<{ appointment: IAppointment }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateAppointmentInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.role) throw new ApiError(400, "role is required");
  if (!safePayload.name || !safePayload.name.trim()) throw new ApiError(400, "name is required");
  if (!safePayload.registrationNumber || !safePayload.registrationNumber.trim()) {
    throw new ApiError(400, "registrationNumber is required");
  }

  // Re-appointing a role: soft-delete the current active one first, so
  // appointment history is preserved and the partial unique index
  // (projectId + role, isActive:true) never sees two active rows.
  const existingActive = await AppointmentModel.findOne({ projectId, role: safePayload.role, isActive: true });
  if (existingActive) {
    existingActive.isActive = false;
    await existingActive.save();
  }

  const appointment = await AppointmentModel.create({
    ...safePayload,
    name: safePayload.name.trim(),
    registrationNumber: safePayload.registrationNumber.trim(),
    organizationId,
    projectId,
    createdBy,
  });

  return { appointment };
};

export const getAppointments = async (
  organizationId: string,
  projectId: string
): Promise<{ appointments: IAppointment[] }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const appointments = await AppointmentModel.find({ organizationId, projectId, isActive: true })
    .populate("userId", "_id userName")
    .populate("verifiedBy", "_id userName")
    .populate("createdBy", "_id userName")
    .sort({ createdAt: -1 });

  return { appointments };
};

export const getAppointmentById = async (
  organizationId: string,
  projectId: string,
  appointmentId: string
): Promise<{ appointment: IAppointment }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(appointmentId)) throw new ApiError(400, "Invalid appointmentId");

  const appointment = await AppointmentModel.findOne({
    _id: appointmentId,
    organizationId,
    projectId,
    isActive: true,
  })
    .populate("userId", "_id userName")
    .populate("verifiedBy", "_id userName")
    .populate("createdBy", "_id userName");

  if (!appointment) throw new ApiError(404, "Appointment not found");

  return { appointment };
};

export const verifyAppointment = async (
  organizationId: string,
  projectId: string,
  appointmentId: string,
  verifiedBy: string
): Promise<{ appointment: IAppointment }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  if (!isValidObjectId(appointmentId)) throw new ApiError(400, "Invalid appointmentId");

  const appointment = await AppointmentModel.findOneAndUpdate(
    { _id: appointmentId, organizationId, projectId, isActive: true },
    { $set: { isValid: true, verifiedBy, verifiedAt: new Date() } },
    { new: true }
  );

  if (!appointment) throw new ApiError(404, "Appointment not found");

  return { appointment };
};

// Used internally by other services (Gate lock, Control closure) —
// NOT an API endpoint. Confirms the logged-in signer is authorized
// for this role on this project, per the HTML's signPolicyOK check.
export const assertRoleIsAuthorizedSigner = async (
  projectId: string,
  role: string,
  registrationNumber: string
): Promise<IAppointment> => {
  const appointment = await AppointmentModel.findOne({
    projectId,
    role: role as IProfessionalRole,
    registrationNumber,
    isValid: true,
    isActive: true,
  });

  if (!appointment) {
    throw new ApiError(403, "You are not an authorized, verified signer for this role on this project");
  }

  return appointment;
};