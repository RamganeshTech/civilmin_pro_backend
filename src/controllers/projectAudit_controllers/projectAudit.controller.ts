import { type Response, type NextFunction } from "express";
import * as projectAuditService from "./projectAudit.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";

export const getProjectAuditLogs = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const result = await projectAuditService.getProjectAuditLogs(organizationId, projectId, page, limit);

    res.status(200).json({ ok: true, data: result, message: "Audit logs fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProjectAuditLogById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, auditId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!auditId) {
      res.status(400).json({ ok: false, message: "auditId is required" });
      return;
    }

    const result = await projectAuditService.getProjectAuditLogById(organizationId, projectId, auditId);

    res.status(200).json({ ok: true, data: result, message: "Audit log entry fetched successfully" });
  } catch (error) {
    next(error);
  }
};