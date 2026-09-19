import { Router } from "express";
import * as projectClassificationController from "../../controllers/projectClassification_controllers/projectClassification.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";

const projectClassificationRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

projectClassificationRoutes.post(
  "/v1/:organizationId/:projectId",
  writeRoles,
  projectClassificationController.createProjectClassification
);

projectClassificationRoutes.get(
  "/v1/:organizationId/:projectId",
  readRoles,
  projectClassificationController.getProjectClassification
);

projectClassificationRoutes.patch(
  "/v1/:organizationId/:projectId",
  writeRoles,
  projectClassificationController.updateProjectClassification
);

export default projectClassificationRoutes;