import type { RoleBasedRequest } from "../../utils/utils.js";
import { type Response, type NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as controlService from "./control.service.js";

export const createControl = async (
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

    const result = await controlService.createControl(organizationId, projectId, userId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "CONTROL_RAISED",
      `${req.body.type} raised by ${userName} against ${req.body.affectedFromGateId}`,
      { type: req.body.type, affectedFromGateId: req.body.affectedFromGateId }
    );

    res.status(201).json({ ok: true, data: result, message: "Control raised successfully" });
  } catch (error) {
    next(error);
  }
};

export const getControls = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId } = req.params;
    const { status } = req.query as { status?: string };

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await controlService.getControls(organizationId, projectId, status);

    res.status(200).json({ ok: true, data: result, message: "Controls fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getControlById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, controlId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!controlId) {
      res.status(400).json({ ok: false, message: "controlId is required" });
      return;
    }

    const result = await controlService.getControlById(organizationId, projectId, controlId);

    res.status(200).json({ ok: true, data: result, message: "Control fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const closeControl = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, controlId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!controlId) {
      res.status(400).json({ ok: false, message: "controlId is required" });
      return;
    }

    const result = await controlService.closeControl(
      organizationId,
      projectId,
      controlId,
      userId,
      userName,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "CONTROL_CLOSED",
      `Control closed by ${userName}`,
      { controlId }
    );

    res.status(200).json({ ok: true, data: result, message: "Control closed successfully" });
  } catch (error) {
    next(error);
  }
};