import { type Response, type  NextFunction } from "express";
import { recordProjectAudit } from "../projectAudit_controllers/projectAudit.service.js";
import * as appointmentService from "./appointment.service.js";
import type { RoleBasedRequest } from "../../utils/utils.js";

export const createAppointment = async (
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

    const result = await appointmentService.createAppointment(organizationId, projectId, userId, req.body);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "APPOINTMENT_CREATED",
      `${req.body.role} appointment created by ${userName}`,
      { role: req.body.role }
    );

    res.status(201).json({ ok: true, data: result, message: "Appointment created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (
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

    const result = await appointmentService.getAppointments(organizationId, projectId);

    res.status(200).json({ ok: true, data: result, message: "Appointments fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAppointmentById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, projectId, appointmentId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!appointmentId) {
      res.status(400).json({ ok: false, message: "appointmentId is required" });
      return;
    }

    const result = await appointmentService.getAppointmentById(organizationId, projectId, appointmentId);

    res.status(200).json({ ok: true, data: result, message: "Appointment fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyAppointment = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, role, userName } = req.user!;
    const { organizationId, projectId, appointmentId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }
    if (!appointmentId) {
      res.status(400).json({ ok: false, message: "appointmentId is required" });
      return;
    }

    const result = await appointmentService.verifyAppointment(organizationId, projectId, appointmentId, userId);

    await recordProjectAudit(
      organizationId,
      projectId,
      { actorId: userId, actorName: userName, actorRole: role },
      "APPOINTMENT_VERIFIED",
      `Appointment verified by ${userName}`,
      { appointmentId }
    );

    res.status(200).json({ ok: true, data: result, message: "Appointment verified successfully" });
  } catch (error) {
    next(error);
  }
};