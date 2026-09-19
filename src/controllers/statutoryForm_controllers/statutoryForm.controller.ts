import type { RoleBasedRequest } from "../../utils/utils.js";
import { type Response, type NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as statutoryFormService from "./statutoryForm.service.js";

export const initializeStatutoryForms = async (
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

    const result = await statutoryFormService.initializeStatutoryForms(organizationId, projectId, userId);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "STATUTORY_FORMS_INITIALIZED",
      `Statutory forms initialized by ${userName}`
    );

    res.status(201).json({ ok: true, data: result, message: "Statutory forms initialized successfully" });
  } catch (error) {
    next(error);
  }
};

export const getStatutoryForms = async (
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

    const result = await statutoryFormService.getStatutoryForms(organizationId, projectId, gateId);

    res.status(200).json({ ok: true, data: result, message: "Statutory forms fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getStatutoryFormById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, formId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!formId) {
      res.status(400).json({ ok: false, message: "formId is required" });
      return;
    }

    const result = await statutoryFormService.getStatutoryFormById(organizationId, projectId, formId);

    res.status(200).json({ ok: true, data: result, message: "Statutory form fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateStatutoryFormDraft = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, formId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!formId) {
      res.status(400).json({ ok: false, message: "formId is required" });
      return;
    }

    const result = await statutoryFormService.updateStatutoryFormDraft(
      organizationId,
      projectId,
      formId,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "STATUTORY_FORM_DRAFT_UPDATED",
      `${formId} draft updated by ${userName}`,
      { formId }
    );

    res.status(200).json({ ok: true, data: result, message: "Statutory form updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const signStatutoryForm = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, formId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!formId) {
      res.status(400).json({ ok: false, message: "formId is required" });
      return;
    }

    const result = await statutoryFormService.signStatutoryForm(
      organizationId,
      projectId,
      formId,
      userId,
      userName,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "STATUTORY_FORM_SIGNED",
      `${formId} signed by ${userName}`,
      { formId }
    );

    res.status(200).json({ ok: true, data: result, message: "Statutory form signed successfully" });
  } catch (error) {
    next(error);
  }
};