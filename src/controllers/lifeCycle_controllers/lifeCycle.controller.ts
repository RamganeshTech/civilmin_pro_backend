import { type Response, type NextFunction } from "express";
import * as lifeCycleService from "./lifeCycle.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";

export const initializeLifeCycleGates = async (
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

    const result = await lifeCycleService.initializeLifeCycleGates(organizationId, projectId, userId);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "LIFECYCLE_GATES_INITIALIZED",
      `Lifecycle gates initialized by ${userName}`
    );

    res.status(201).json({ ok: true, data: result, message: "Lifecycle gates initialized successfully" });
  } catch (error) {
    next(error);
  }
};

export const getLifeCycleGates = async (
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

    const result = await lifeCycleService.getLifeCycleGates(organizationId, projectId);

    res.status(200).json({ ok: true, data: result, message: "Lifecycle gates fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getLifeCycleGateById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, gateId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!gateId) {
      res.status(400).json({ ok: false, message: "gateId is required" });
      return;
    }

    const result = await lifeCycleService.getLifeCycleGateById(organizationId, projectId, gateId);

    res.status(200).json({ ok: true, data: result, message: "Lifecycle gate fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateLifeCycleGateDraft = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, gateId } = req.params;
        const { userId, role, userName } = req.user!;


    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!gateId) {
      res.status(400).json({ ok: false, message: "gateId is required" });
      return;
    }

    const result = await lifeCycleService.updateLifeCycleGateDraft(organizationId, projectId, gateId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "LIFECYCLE_GATE_DRAFT_UPDATED",
      `${gateId} draft updated by ${userName}`,
      { gateId }
    );


    res.status(200).json({ ok: true, data: result, message: "Lifecycle gate updated successfully" });
  } catch (error) {
    next(error);
  }
};


//  second phase


export const lockLifeCycleGate = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, gateId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!gateId) {
      res.status(400).json({ ok: false, message: "gateId is required" });
      return;
    }

    const result = await lifeCycleService.lockLifeCycleGate(
      organizationId,
      projectId,
      gateId,
      userId,
      userName,
      req.body
    );

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "GATE_LOCKED",
      `${gateId} locked by ${userName}`,
      { gateId }
    );

    res.status(200).json({ ok: true, data: result, message: "Gate locked successfully" });
  } catch (error) {
    next(error);
  }
};