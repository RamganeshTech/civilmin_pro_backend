import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as inspectionLotController from "../../controllers/inspectionLot_controllers/inspectionLot.controller.js";

const inspectionLotRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

inspectionLotRoutes.post(
  "/v1/:organizationId/:projectId",
  writeRoles,
  inspectionLotController.createInspectionLot
);

inspectionLotRoutes.get(
  "/v1/:organizationId/:projectId",
  readRoles,
  inspectionLotController.getInspectionLots
);

inspectionLotRoutes.get(
  "/v1/:organizationId/:projectId/:lotId",
  readRoles,
  inspectionLotController.getInspectionLotById
);

inspectionLotRoutes.patch(
  "/v1/:organizationId/:projectId/:lotId",
  writeRoles,
  inspectionLotController.updateInspectionLotDraft
);

inspectionLotRoutes.patch(
  "/v1/:organizationId/:projectId/:lotId/release",
  writeRoles,
  inspectionLotController.releaseInspectionLot
);

export default inspectionLotRoutes;