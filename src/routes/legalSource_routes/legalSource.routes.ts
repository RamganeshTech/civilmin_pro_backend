import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as legalSourceController from "../../controllers/legalSource_controllers/legalSource.controller.js";

const legalSourceRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

legalSourceRoutes.post("/v1/:organizationId/:projectId", writeRoles, legalSourceController.createLegalSource);

legalSourceRoutes.get("/v1/:organizationId/:projectId", readRoles, legalSourceController.getLegalSources);

legalSourceRoutes.get(
  "/v1/:organizationId/:projectId/:sourceId",
  readRoles,
  legalSourceController.getLegalSourceById
);

legalSourceRoutes.patch(
  "/v1/:organizationId/:projectId/:sourceId",
  writeRoles,
  legalSourceController.updateLegalSource
);

legalSourceRoutes.patch(
  "/v1/:organizationId/:projectId/:sourceId/verify",
  writeRoles,
  legalSourceController.verifyLegalSource
);

export default legalSourceRoutes;