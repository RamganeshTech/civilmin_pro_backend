import { Router } from "express";
import * as appointmentController from "../../controllers/appointment_controllers/appointment.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";

const appointmentRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

appointmentRoutes.post(
  "/v1/:organizationId/:projectId",
  writeRoles,
  appointmentController.createAppointment
);

appointmentRoutes.get(
  "/v1/:organizationId/:projectId",
  readRoles,
  appointmentController.getAppointments
);

appointmentRoutes.get(
  "/v1/:organizationId/:projectId/:appointmentId",
  readRoles,
  appointmentController.getAppointmentById
);

appointmentRoutes.patch(
  "/v1/:organizationId/:projectId/:appointmentId/verify",
  writeRoles,
  appointmentController.verifyAppointment
);

export default appointmentRoutes;