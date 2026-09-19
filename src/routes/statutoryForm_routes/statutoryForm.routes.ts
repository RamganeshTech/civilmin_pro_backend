import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as statutoryFormController from "../../controllers/statutoryForm_controllers/statutoryForm.controller.js";

const statutoryFormRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

statutoryFormRoutes.post(
  "/v1/:organizationId/:projectId/init",
  writeRoles,
  statutoryFormController.initializeStatutoryForms
);

statutoryFormRoutes.get("/v1/:organizationId/:projectId", readRoles, statutoryFormController.getStatutoryForms);

statutoryFormRoutes.get(
  "/v1/:organizationId/:projectId/:formId",
  readRoles,
  statutoryFormController.getStatutoryFormById
);

statutoryFormRoutes.patch(
  "/v1/:organizationId/:projectId/:formId",
  writeRoles,
  statutoryFormController.updateStatutoryFormDraft
);

statutoryFormRoutes.patch(
  "/v1/:organizationId/:projectId/:formId/sign",
  writeRoles,
  statutoryFormController.signStatutoryForm
);

export default statutoryFormRoutes;