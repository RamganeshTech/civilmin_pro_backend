import { Router } from "express";
import * as evidenceController from "../../controllers/evidence_controllers/evidence.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import { upload } from "../../utils/s3Upload.js";

const evidenceRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

evidenceRoutes.post(
  "/v1/:organizationId/:projectId",
  writeRoles,
  upload.single("file"),
  evidenceController.createEvidence
);

evidenceRoutes.get(
  "/v1/:organizationId/:projectId",
  readRoles,
  evidenceController.getEvidenceList
);

evidenceRoutes.get(
  "/v1/:organizationId/:projectId/:evidenceId",
  readRoles,
  evidenceController.getEvidenceById
);

export default evidenceRoutes;