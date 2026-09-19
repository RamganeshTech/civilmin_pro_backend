import { type Response, type NextFunction } from "express";
import * as projectClassificationService from "./projectClassification.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";

export const createProjectClassification = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // const { userId } = req.user!;
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

    const result = await projectClassificationService.createProjectClassification(
      organizationId,
      projectId,
      userId ,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "PROJECT_CLASSIFICATION_CREATED",
      `Project classification created by ${userName}`
    );


    res.status(201).json({ ok: true, data: result, message: "Project classification created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProjectClassification = async (
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

    const result = await projectClassificationService.getProjectClassification(organizationId, projectId);

    res.status(200).json({ ok: true, data: result, message: "Project classification fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateProjectClassification = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!
    const { organizationId, projectId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await projectClassificationService.updateProjectClassification(
      organizationId,
      projectId,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId, 
      { actorId: userId, actorName: userName, actorRole: role },
      "PROJECT_CLASSIFICATION_UPDATED",
      `Project classification updated by ${userName}`
    );

    res.status(200).json({ ok: true, data: result, message: "Project classification updated successfully" });
  } catch (error) {
    next(error);
  }
};