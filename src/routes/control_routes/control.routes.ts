import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as controlController from "../../controllers/control_controllers/control.controller.js";

const controlRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

controlRoutes.post("/v1/:organizationId/:projectId", writeRoles, controlController.createControl);

controlRoutes.get("/v1/:organizationId/:projectId", readRoles, controlController.getControls);

controlRoutes.get(
  "/v1/:organizationId/:projectId/:controlId",
  readRoles,
  controlController.getControlById
);

controlRoutes.patch(
  "/v1/:organizationId/:projectId/:controlId/close",
  writeRoles,
  controlController.closeControl
);

export default controlRoutes;