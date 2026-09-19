import { createHash } from "crypto";
import { isValidObjectId } from "mongoose";
import { ProjectAuditModel, type IProjectAudit, type IProjectAuditActor } from "../../models/projectAudit_model/projectAudit.model.js";
import { ApiError } from "../../utils/apiError.js";

const GENESIS_HASH = "GENESIS";

const computeHash = (payload: {
  organizationId: string;
  projectId: string;
  type: string;
  message: string;
  actor:  {
    actorId: string;
    actorName: string;
    actorRole: string;
  },
  meta: Record<string, unknown> | null;
  prevHash: string;
  timestamp: number;
}): string => {
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex");
};

// Internal helper — NOT an API endpoint. Called from inside other services
// (gate lock, evidence attach, appointment verify, etc.) right after their
// own write succeeds, so every meaningful action leaves a chained trail.
export const recordProjectAudit = async (
  organizationId: string,
  projectId: string,
  actor: {
    actorId: string;
    actorName: string;
    actorRole: string;
  },
  type: string,
  message: string,
  meta: Record<string, unknown> | null = null
): Promise<IProjectAudit> => {
  const lastEntry = await ProjectAuditModel.findOne({ projectId }).sort({ createdAt: -1 });
  const prevHash = lastEntry ? lastEntry.hash : GENESIS_HASH;

  const timestamp = Date.now();

  const hash = computeHash({
    organizationId,
    projectId,
    type,
    message,
    actor,
    meta,
    prevHash,
    timestamp,
  });

  const entry = await ProjectAuditModel.create({
    organizationId,
    projectId,
    type,
    message,
    actor,
    meta,
    prevHash,
    hash,
  });

  return entry;
};

export const getProjectAuditLogs = async (
  organizationId: string,
  projectId: string,
  page: number,
  limit: number
): Promise<{ logs: IProjectAudit[]; total: number; page: number; limit: number }> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");

  const skip = (page - 1) * limit;

  const [logs, total] = await Promise.all([
    ProjectAuditModel.find({ organizationId, projectId })
      .populate("actor.actorId", "_id userName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    ProjectAuditModel.countDocuments({ organizationId, projectId }),
  ]);

  return { logs, total, page, limit };
};

export const getProjectAuditLogById = async (
  organizationId: string,
  projectId: string,
  auditId: string
): Promise<{ log: IProjectAudit }> => {
  if (!isValidObjectId(organizationId)) throw new ApiError(400, "Invalid organizationId");
  if (!isValidObjectId(projectId)) throw new ApiError(400, "Invalid projectId");
  if (!isValidObjectId(auditId)) throw new ApiError(400, "Invalid auditId");

  const log = await ProjectAuditModel.findOne({ _id: auditId, organizationId, projectId }).populate(
    "actor.actorId",
    "_id userName"
  );

  if (!log) throw new ApiError(404, "Audit log entry not found");

  return { log };
};