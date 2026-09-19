import { Schema, model, Types } from "mongoose";

export type LotStatus = "DRAFT" | "RELEASED" | "BLOCKED";

export interface ILotSignOff {
  actorId: Types.ObjectId;
  actorName: string;
  actorRole: string;
  actorReg: string;
  signedAt: Date;
}

export interface IInspectionLot {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  gateId: string;              // e.g. "FDN-09", "SUP-11", "ARC-13"
  lotType: string;             // "Foundation" | "Superstructure" | "Finishes / MEP"
  location: string;            // e.g. "Footing F12", "3rd Floor Slab"
  drawingRev: string | null;
  itpRef: string | null;
  criteriaRef: string | null;
  status: LotStatus;
  notes: string | null;
  evidenceIds: Types.ObjectId[];
  signOff: ILotSignOff | null;
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const signOffSchema = new Schema<ILotSignOff>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
    actorReg: { type: String, required: true },
    signedAt: { type: Date, required: true },
  },
  { _id: false }
);

const inspectionLotSchema = new Schema<IInspectionLot>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    gateId: { type: String, required: true, trim: true },
    lotType: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    drawingRev: { type: String, default: null },
    itpRef: { type: String, default: null },
    criteriaRef: { type: String, default: null },
    status: { type: String, enum: ["DRAFT", "RELEASED", "BLOCKED"], default: "DRAFT" },
    notes: { type: String, default: null },
    evidenceIds: [{ type: Schema.Types.ObjectId, ref: "EvidenceModel" }],
    signOff: { type: signOffSchema, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

inspectionLotSchema.index({ organizationId: 1 });
inspectionLotSchema.index({ projectId: 1, gateId: 1 }); // repeatable, so NOT unique

export const InspectionLotModel = model<IInspectionLot>("InspectionLotModel", inspectionLotSchema);