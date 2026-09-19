import { Schema, model, Types } from "mongoose";

export type GateStatus = "DRAFT" | "LOCKED" | "REVIEW_REQUIRED";
export type GateApplicability = "REQUIRED" | "NA" | "PENDING";

export interface IGateChecklistItem {
  label: string;
  checked: boolean;
}

export interface IGateSignOff {
  actorId: Types.ObjectId;
  actorName: string;
  actorRole: string;
  actorReg: string;
  signedAt: Date;
}

export interface ILifeCycle {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;

  gateId: string;              // fixed config id, e.g. "REG-00", "CLS-01" ... "HOV-17" — not user-defined
  phase: string;                // e.g. "A · Regulatory Setup" — copied from config at creation for easy filtering/display
  title: string;                // copied from config for display without a join

  applicability: GateApplicability;
  naReason: string | null;

  checklist: IGateChecklistItem[];
  evidenceIds: Types.ObjectId[];   // ref: "Evidence"
  notes: string | null;

  status: GateStatus;
  signOff: IGateSignOff | null;

  reviewReason: string | null;     // set when a CHANGE control reopens an already-locked gate

  createdBy: Types.ObjectId;
  isActive: boolean;
}

const checklistItemSchema = new Schema<IGateChecklistItem>(
  {
    label: { type: String, required: true },
    checked: { type: Boolean, default: false },
  },
  { _id: false }
);

const signOffSchema = new Schema<IGateSignOff>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
    actorReg: { type: String, required: true },
    signedAt: { type: Date, required: true },
  },
  { _id: false }
);

const lifeCycleSchema = new Schema<ILifeCycle>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },

    gateId: { type: String, required: true, trim: true },
    phase: { type: String, required: true },
    title: { type: String, required: true },

    applicability: { type: String, enum: ["REQUIRED", "NA", "PENDING"], default: "PENDING" },
    naReason: { type: String, default: null },

    checklist: { type: [checklistItemSchema], default: [] },
    evidenceIds: [{ type: Schema.Types.ObjectId, ref: "EvidenceModel" }],
    notes: { type: String, default: null },

    status: { type: String, enum: ["DRAFT", "LOCKED", "REVIEW_REQUIRED"], default: "DRAFT" },
    signOff: { type: signOffSchema, default: null },

    reviewReason: { type: String, default: null },

    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Tenant-scoped listing — mirrors your Project model's { organizationId: 1 } pattern
lifeCycleSchema.index({ organizationId: 1 });

// One record per gate per project — enforces "18 fixed gates, no duplicates"
lifeCycleSchema.index({ projectId: 1, gateId: 1 }, {unique: true});

export const LifeCycleModel = model<ILifeCycle>("LifeCycleModel", lifeCycleSchema);