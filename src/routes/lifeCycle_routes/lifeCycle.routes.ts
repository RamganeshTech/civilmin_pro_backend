import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as lifeCycleController from "../../controllers/lifeCycle_controllers/lifeCycle.controller.js";

const lifeCycleRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

lifeCycleRoutes.post(
  "/v1/:organizationId/:projectId/init",
  writeRoles,
  lifeCycleController.initializeLifeCycleGates
);

lifeCycleRoutes.get(
  "/v1/:organizationId/:projectId",
  readRoles,
  lifeCycleController.getLifeCycleGates
);

lifeCycleRoutes.get(
  "/v1/:organizationId/:projectId/:gateId",
  readRoles,
  lifeCycleController.getLifeCycleGateById
);

lifeCycleRoutes.patch(
  "/v1/:organizationId/:projectId/:gateId",
  writeRoles,
  lifeCycleController.updateLifeCycleGateDraft
);

lifeCycleRoutes.patch(
  "/v1/:organizationId/:projectId/:gateId/lock",
  writeRoles,
  lifeCycleController.lockLifeCycleGate
);

export default lifeCycleRoutes;