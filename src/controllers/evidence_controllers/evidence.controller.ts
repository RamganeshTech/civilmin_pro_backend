import { type Response, type  NextFunction } from "express";
import type { RoleBasedRequest } from "../../utils/utils.js";
// import { ApiError } from "../utils/apiError";
import * as evidenceService from "./evidence.service.js";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";

export const createEvidence = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId } = req.params;
    const { contextKind, contextRefId } = req.body;
    const file = req.file;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!file) {
      res.status(400).json({ ok: false, message: "file is required" });
      return;
    }
    if (!contextKind) {
      res.status(400).json({ ok: false, message: "contextKind is required" });
      return;
    }

    const result = await evidenceService.createEvidence(
      organizationId,
      projectId,
      userId,
      role,
      file,
      contextKind,
      contextRefId ?? null
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "EVIDENCE_ATTACHED",
      `Evidence attached by ${userName} to ${contextKind}${contextRefId ? ` (${contextRefId})` : ""}`,
      { contextKind, contextRefId }
    );

    res.status(201).json({ ok: true, data: result, message: "Evidence uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceList = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId } = req.params;
    const { contextKind, contextRefId } = req.query as { contextKind?: string; contextRefId?: string };

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await evidenceService.getEvidenceList(organizationId, projectId, contextKind, contextRefId);

    res.status(200).json({ ok: true, data: result, message: "Evidence fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getEvidenceById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, evidenceId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!evidenceId) {
      res.status(400).json({ ok: false, message: "evidenceId is required" });
      return;
    }

    const result = await evidenceService.getEvidenceById(organizationId, projectId, evidenceId);

    res.status(200).json({ ok: true, data: result, message: "Evidence fetched successfully" });
  } catch (error) {
    next(error);
  }
};