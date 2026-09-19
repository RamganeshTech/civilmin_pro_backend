import { Schema, model, Types } from "mongoose";

export type ControlType = "STOP" | "NCR" | "RFI" | "CHANGE";
export type ControlStatus = "OPEN" | "CLOSED";

export interface IControlClosure {
  actorId: Types.ObjectId;
  actorName: string;
  actorRole: string;
  actorReg: string;
  closedAt: Date;
}

export interface IControl {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  type: ControlType;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  blocksWork: boolean;
  affectedFromGateId: string;              // gate index/id this control affects onward
  scopeId: Types.ObjectId | null;          // optional — ref InspectionLotModel if scoped to one lot
  status: ControlStatus;
  resolution: string | null;
  evidenceIds: Types.ObjectId[];
  closure: IControlClosure | null;
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const closureSchema = new Schema<IControlClosure>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
    actorReg: { type: String, required: true },
    closedAt: { type: Date, required: true },
  },
  { _id: false }
);

const controlSchema = new Schema<IControl>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    type: { type: String, enum: ["STOP", "NCR", "RFI", "CHANGE"], required: true },
    description: { type: String, required: true },
    severity: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"], default: "MEDIUM" },
    blocksWork: { type: Boolean, default: false },
    affectedFromGateId: { type: String, required: true },
    scopeId: { type: Schema.Types.ObjectId, ref: "InspectionLotModel", default: null },
    status: { type: String, enum: ["OPEN", "CLOSED"], default: "OPEN" },
    resolution: { type: String, default: null },
    evidenceIds: [{ type: Schema.Types.ObjectId, ref: "EvidenceModel" }],
    closure: { type: closureSchema, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

controlSchema.index({ organizationId: 1 });
controlSchema.index({ projectId: 1, status: 1 });

export const ControlModel = model<IControl>("ControlModel", controlSchema);