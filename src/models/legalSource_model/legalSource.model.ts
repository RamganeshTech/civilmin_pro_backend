import { Schema, model, Types } from "mongoose";

export interface ILegalSource {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  name: string;               // e.g. "TNCDBR 2019", "NBC 2016 Part 4"
  editionOrRevision: string | null;
  verificationStatus: "VERIFIED" | "UNVERIFIED";
  verifiedBy: Types.ObjectId | null;
  verifiedAt: Date | null;
  notes: string | null;
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const legalSourceSchema = new Schema<ILegalSource>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    name: { type: String, required: true, trim: true },
    editionOrRevision: { type: String, default: null },
    verificationStatus: { type: String, enum: ["VERIFIED", "UNVERIFIED"], default: "UNVERIFIED" },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    verifiedAt: { type: Date, default: null },
    notes: { type: String, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

legalSourceSchema.index({ organizationId: 1 });
legalSourceSchema.index({ projectId: 1 });

export const LegalSourceModel = model<ILegalSource>("LegalSourceModel", legalSourceSchema);