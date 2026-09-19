import { Schema, model, Types } from "mongoose";

export interface IProjectAuditActor {
  actorId: Types.ObjectId;
  actorName: string;
  actorRole: string;
}

export interface IProjectAudit {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  type: string;                // e.g. "PROFESSIONAL_APPOINTED", "GATE_LOCKED", "EVIDENCE_ATTACHED"
  message: string;
  actor: IProjectAuditActor;
  meta: Record<string, unknown> | null;
  prevHash: string;
  hash: string;
}

const actorSchema = new Schema<IProjectAuditActor>(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    actorName: { type: String, required: true },
    actorRole: { type: String, required: true },
  },
  { _id: false }
);

const projectAuditSchema = new Schema<IProjectAudit>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    actor: { type: actorSchema, required: true },
    meta: { type: Schema.Types.Mixed, default: null },
    prevHash: { type: String, required: true },
    hash: { type: String, required: true },
  },
  { timestamps: true }
);

projectAuditSchema.index({ organizationId: 1 });
projectAuditSchema.index({ projectId: 1, createdAt: -1 });

export const ProjectAuditModel = model<IProjectAudit>("ProjectAuditModel", projectAuditSchema);