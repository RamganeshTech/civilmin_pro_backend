import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as defectController from "../../controllers/defect_controllers/defect.controller.js";
import { upload } from "../../utils/s3Upload.js";

const defectRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");
const deleteRoles = multiAuthRole("owner", "admin");

defectRoutes.post(
  "/v1/:organizationId/:projectId",
  writeRoles,
  upload.array("files", 5),
  defectController.createDefect
);

defectRoutes.get("/v1/:organizationId/:projectId", readRoles, defectController.getDefects);

defectRoutes.get(
  "/v1/:organizationId/:projectId/deleted",
  readRoles,
  defectController.getInactiveDefects
);

defectRoutes.get(
  "/v1/:organizationId/:projectId/:defectId",
  readRoles,
  defectController.getDefectById
);

defectRoutes.patch(
  "/v1/:organizationId/:projectId/:defectId/details",
  writeRoles,
  defectController.updateDefectDetails
);

defectRoutes.patch(
  "/v1/:organizationId/:projectId/:defectId/status",
  writeRoles,
  defectController.updateDefectStatus
);

defectRoutes.patch(
  "/v1/:organizationId/:projectId/:defectId/media",
  writeRoles,
  upload.array("files", 5),
  defectController.updateDefectMedia
);

defectRoutes.delete(
  "/v1/:organizationId/:projectId/:defectId",
  deleteRoles,
  defectController.softDeleteDefect
);

defectRoutes.patch(
  "/v1/:organizationId/:projectId/:defectId/recover",
  deleteRoles,
  defectController.recoverDefect
);

defectRoutes.delete(
  "/v1/:organizationId/:projectId/:defectId/hard",
  deleteRoles,
  defectController.hardDeleteDefect
);

export default defectRoutes;