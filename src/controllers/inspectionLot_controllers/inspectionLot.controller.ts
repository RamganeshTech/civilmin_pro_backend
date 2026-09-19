import { type Response,  type NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as inspectionLotService from "./inspectionLot.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";

export const createInspectionLot = async (
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

    const result = await inspectionLotService.createInspectionLot(organizationId, projectId, userId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "INSPECTION_LOT_CREATED",
      `Inspection lot created by ${userName} for ${req.body.gateId}`,
      { gateId: req.body.gateId }
    );

    res.status(201).json({ ok: true, data: result, message: "Inspection lot created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getInspectionLots = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId } = req.params;
    const { gateId } = req.query as { gateId?: string };

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await inspectionLotService.getInspectionLots(organizationId, projectId, gateId);

    res.status(200).json({ ok: true, data: result, message: "Inspection lots fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getInspectionLotById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, lotId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!lotId) {
      res.status(400).json({ ok: false, message: "lotId is required" });
      return;
    }

    const result = await inspectionLotService.getInspectionLotById(organizationId, projectId, lotId);

    res.status(200).json({ ok: true, data: result, message: "Inspection lot fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateInspectionLotDraft = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, lotId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!lotId) {
      res.status(400).json({ ok: false, message: "lotId is required" });
      return;
    }

    const result = await inspectionLotService.updateInspectionLotDraft(organizationId, projectId, lotId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "INSPECTION_LOT_DRAFT_UPDATED",
      `Inspection lot draft updated by ${userName}`,
      { lotId }
    );

    res.status(200).json({ ok: true, data: result, message: "Inspection lot updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const releaseInspectionLot = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, lotId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!lotId) {
      res.status(400).json({ ok: false, message: "lotId is required" });
      return;
    }

    const result = await inspectionLotService.releaseInspectionLot(
      organizationId,
      projectId,
      lotId,
      userId,
      userName,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "INSPECTION_LOT_RELEASED",
      `Inspection lot released by ${userName}`,
      { lotId }
    );

    res.status(200).json({ ok: true, data: result, message: "Inspection lot released successfully" });
  } catch (error) {
    next(error);
  }
};