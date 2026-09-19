import { Schema, model, Types } from "mongoose";

export type EvidenceContextKind = "gate" | "lot" | "control" | "form" | "general";

// Your existing reusable upload shape
export interface IUpload {
  type: "image" | "pdf" | "video" | "other";
  key?: string;
  url?: string;
  originalName?: string;
  uploadedAt: Date;
}

export interface IEvidenceContext {
  kind: EvidenceContextKind;
  // "gate" → store the gateId string (e.g. "CLS-01"), NOT the LifeCycleModel _id —
  // keeps this decoupled and matches how the HTML tags gate evidence by gateId.
  // "lot" | "control" | "form" → store that document's ObjectId.
  // "general" → no refId.
  refId: string | Types.ObjectId | null;
}

export interface IEvidence extends IUpload {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  proof: IUpload,
  sha256: string;
  uploadedBy: Types.ObjectId;
  uploadedByRole: string;
  context: IEvidenceContext;
  isActive: boolean;
}



const uploadSchema = new Schema<IUpload>({
  type: { type: String, enum: ["image", "pdf", "video", "other"] },
  key: { type: String, },
  url: { type: String, },
  originalName: String,
  uploadedAt: { type: Date, default: new Date() }
});

const evidenceSchema = new Schema<IEvidence>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },

    proof: {type: uploadSchema, default: null},

    sha256: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    uploadedByRole: { type: String, required: true },

    context: {
      kind: { type: String, enum: ["gate", "lot", "control", "form", "general"], required: true },
      refId: { type: Schema.Types.Mixed, default: null },
    },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Tenant-scoped listing
evidenceSchema.index({ organizationId: 1, projectId: 1 });

// Core lookup: "all evidence for gate CLS-01 on this project" / "all evidence for this lot"
// evidenceSchema.index({ projectId: 1, "context.kind": 1, "context.refId": 1 });

// Detect duplicate/tampered uploads within a project
// evidenceSchema.index({ projectId: 1 });

export const EvidenceModel = model<IEvidence>("EvidenceModel", evidenceSchema);