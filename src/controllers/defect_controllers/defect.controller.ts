import type { RoleBasedRequest } from "../../utils/utils.js";
import { type Response, type NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as defectService from "./defect.service.js";

export const createDefect = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId } = req.params;
    const files = (req.files as Express.Multer.File[]) || [];

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await defectService.createDefect(
      organizationId,
      projectId,
      userId,
      { actorId: userId as any, actorName: userName },
      req.body,
      files
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_RAISED",
      `Defect raised by ${userName}`,
      { defectNo: result.defect.defectNo }
    );

    res.status(201).json({ ok: true, data: result, message: "Defect raised successfully" });
  } catch (error) {
    next(error);
  }
};

export const getDefects = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId } = req.params;
    const { status, severity } = req.query as { status?: string; severity?: string };

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await defectService.getDefects(organizationId, projectId, status, severity);

    res.status(200).json({ ok: true, data: result, message: "Defects fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getInactiveDefects = async (
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

    const result = await defectService.getInactiveDefects(organizationId, projectId);

    res.status(200).json({ ok: true, data: result, message: "Deleted defects fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getDefectById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, defectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.getDefectById(organizationId, projectId, defectId);

    res.status(200).json({ ok: true, data: result, message: "Defect fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateDefectDetails = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.updateDefectDetails(
      organizationId,
      projectId,
      defectId,
      { actorId: userId as any, actorName: userName },
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_DETAILS_UPDATED",
      `Defect ${result.defect.defectNo} details updated by ${userName}`,
      { defectId }
    );

    res.status(200).json({ ok: true, data: result, message: "Defect updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateDefectStatus = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;
    const { status } = req.body;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.updateDefectStatus(
      organizationId,
      projectId,
      defectId,
      { actorId: userId as any, actorName: userName },
      status
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_STATUS_UPDATED",
      `Defect ${result.defect.defectNo} status changed to ${status} by ${userName}`,
      { defectId, status }
    );

    res.status(200).json({ ok: true, data: result, message: "Defect status updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateDefectMedia = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;
    const { mediaStage } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }
    if (!mediaStage) {
      res.status(400).json({ ok: false, message: "mediaStage is required" });
      return;
    }

    const result = await defectService.updateDefectMedia(
      organizationId,
      projectId,
      defectId,
      userId,
      { actorId: userId as any, actorName: userName },
      mediaStage,
      files
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_MEDIA_ADDED",
      `${mediaStage} photo added to ${result.defect.defectNo} by ${userName}`,
      { defectId, mediaStage }
    );

    res.status(200).json({ ok: true, data: result, message: "Media uploaded successfully" });
  } catch (error) {
    next(error);
  }
};

export const softDeleteDefect = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.softDeleteDefect(organizationId, projectId, defectId, {
      actorId: userId as any,
      actorName: userName,
    });

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_DELETED",
      `Defect ${result.defect.defectNo} deleted by ${userName}`,
      { defectId }
    );

    res.status(200).json({ ok: true, data: result, message: "Defect deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const recoverDefect = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.recoverDefect(organizationId, projectId, defectId, {
      actorId: userId as any,
      actorName: userName,
    });

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_RECOVERED",
      `Defect ${result.defect.defectNo} recovered by ${userName}`,
      { defectId }
    );

    res.status(200).json({ ok: true, data: result, message: "Defect recovered successfully" });
  } catch (error) {
    next(error);
  }
};

export const hardDeleteDefect = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, defectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!defectId) {
      res.status(400).json({ ok: false, message: "defectId is required" });
      return;
    }

    const result = await defectService.hardDeleteDefect(organizationId, projectId, defectId);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "DEFECT_HARD_DELETED",
      `Defect permanently deleted by ${userName}`,
      { defectId }
    );

    res.status(200).json({ ok: true, data: result, message: "Defect permanently deleted" });
  } catch (error) {
    next(error);
  }
};