import { Schema, model, Types } from "mongoose";

export enum IProfessionalRole {
  RA_RE = "Registered Architect / Engineer",
  RSE = "Registered Structural Engineer",
  RCE = "Registered Construction Engineer",
  QUALITY_AUDITOR = "Quality Auditor",
  FIRE_LIFE_SAFETY_CONSULTANT = "Fire & Life Safety Consultant",
  MEP_LEAD = "MEP Lead",
}

export interface IAppointment {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  role: IProfessionalRole;
  userId: Types.ObjectId | null; // ref to your User model — links this appointment to a real login
  name: string;
  registrationNumber: string;
  isValid: boolean;
  validFrom: Date | null;
  validTo: Date | null;
  scopeNotes: string | null;
  verifiedBy: Types.ObjectId | null;
  verifiedAt: Date | null;
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    role: { type: String, enum: Object.values(IProfessionalRole), required: true },
    userId: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    name: { type: String, required: true, trim: true },
    registrationNumber: { type: String, trim: true, default: null },
    isValid: { type: Boolean, default: false },
    validFrom: { type: Date, default: null },
    validTo: { type: Date, default: null },
    scopeNotes: { type: String, default: null, trim: true },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    verifiedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Tenant-scoped listing (mirrors your Project model's { organizationId: 1 } pattern)
appointmentSchema.index({ organizationId: 1 });

// Fast lookup: all appointments for a project
appointmentSchema.index({ projectId: 1 });

// // Business rule from the prototype: only ONE active appointment per role, per project.
// // Partial unique index — only enforced while isActive: true, so soft-deleted/replaced
// // appointments don't block a new one being created for the same role.
// appointmentSchema.index(
//   { projectId: 1, role: 1 },
//   { unique: true, partialFilterExpression: { isActive: true } }
// );

export const AppointmentModel = model<IAppointment>("ProjectAppointmentModel", appointmentSchema);