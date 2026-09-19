import { Schema, model, Types } from "mongoose";

export type FormApplicability = "REQUIRED" | "NA" | "PENDING";
export type FormStatus = "DRAFT" | "COMPLETE" | "NA";

export interface IFormSignOff {
  actorId: Types.ObjectId;
  actorName: string;
  actorRole: string;
  actorReg: string;
  signedAt: Date;
}

export interface IStatutoryForm {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  formId: string;              // fixed config id, e.g. "FORM-01", "FORM-09-PLINTH"
  gateId: string;              // which lifecycle gate this form belongs to
  applicability: FormApplicability;
  naReason: string | null;
  status: FormStatus;
  evidenceIds: Types.ObjectId[];
  signOff: IFormSignOff | null;
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const signOffSchema = new Schema<IFormSignOff>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
    actorReg: { type: String, required: true },
    signedAt: { type: Date, required: true },
  },
  { _id: false }
);

const statutoryFormSchema = new Schema<IStatutoryForm>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    formId: { type: String, required: true, trim: true },
    gateId: { type: String, required: true },
    applicability: { type: String, enum: ["REQUIRED", "NA", "PENDING"], default: "PENDING" },
    naReason: { type: String, default: null },
    status: { type: String, enum: ["DRAFT", "COMPLETE", "NA"], default: "DRAFT" },
    evidenceIds: [{ type: Schema.Types.ObjectId, ref: "EvidenceModel" }],
    signOff: { type: signOffSchema, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

statutoryFormSchema.index({ organizationId: 1 });
statutoryFormSchema.index({ projectId: 1, formId: 1 }, { unique: true }); // one record per fixed form per project

export const StatutoryFormModel = model<IStatutoryForm>("StatutoryFormModel", statutoryFormSchema);