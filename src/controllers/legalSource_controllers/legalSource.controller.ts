import type { RoleBasedRequest } from "../../utils/utils.js";
import { type Response, type NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as legalSourceService from "./legalSource.service.js";

export const createLegalSource = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await legalSourceService.createLegalSource(organizationId, projectId, userId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "LEGAL_SOURCE_CREATED",
      `Legal source "${req.body.name}" added by ${userName}`
    );

    res.status(201).json({ ok: true, data: result, message: "Legal source created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getLegalSources = async (
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

    const result = await legalSourceService.getLegalSources(organizationId, projectId);

    res.status(200).json({ ok: true, data: result, message: "Legal sources fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getLegalSourceById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, sourceId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!sourceId) {
      res.status(400).json({ ok: false, message: "sourceId is required" });
      return;
    }

    const result = await legalSourceService.getLegalSourceById(organizationId, projectId, sourceId);

    res.status(200).json({ ok: true, data: result, message: "Legal source fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateLegalSource = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, sourceId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!sourceId) {
      res.status(400).json({ ok: false, message: "sourceId is required" });
      return;
    }

    const result = await legalSourceService.updateLegalSource(organizationId, projectId, sourceId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "LEGAL_SOURCE_UPDATED",
      `Legal source updated by ${userName} — reset to UNVERIFIED`,
      { sourceId }
    );

    res.status(200).json({ ok: true, data: result, message: "Legal source updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyLegalSource = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, sourceId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!sourceId) {
      res.status(400).json({ ok: false, message: "sourceId is required" });
      return;
    }

    const result = await legalSourceService.verifyLegalSource(organizationId, projectId, sourceId, userId);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "LEGAL_SOURCE_VERIFIED",
      `Legal source verified by ${userName}`,
      { sourceId }
    );

    res.status(200).json({ ok: true, data: result, message: "Legal source verified successfully" });
  } catch (error) {
    next(error);
  }
};