// routes/boq.routes.ts
import { Router } from "express";
import * as boqController from "../../controllers/boq/boq.contorller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";

const boqRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

/* ------------------------------------------------------------------ */
/*  Static/literal sub-paths MUST come before shorter dynamic          */
/*  routes at the same depth — otherwise Express could match a literal */
/*  segment as a param value instead of hitting the dedicated route.   */
/*  Kept in this order deliberately, same convention as labourItemRoutes. */
/* ------------------------------------------------------------------ */


// GET /boq/:organizationId/:boqId
boqRoutes.get(
  "/:organizationId",
  readRoles,
  boqController.getAllBOQ
);


// GET /boq/:organizationId/:boqId
boqRoutes.get(
  "/:organizationId/:boqId",
  readRoles,
  boqController.getBOQ
);

// POST /boq/:organizationId/:projectId  → create new draft (step 1, no boqId yet)
boqRoutes.post(
  "/:organizationId/:projectId",
  writeRoles,
  boqController.saveSections
);

// PATCH /boq/:organizationId/:boqId/sections  → update selected sections (step 1, existing draft)
boqRoutes.patch(
  "/:organizationId/:boqId/sections",
  writeRoles,
  boqController.saveSections
);

// PATCH /boq/:organizationId/:boqId/sections/:sectionId/inputs  → step 2
// boqRoutes.patch(
//   "/:organizationId/:boqId/sections/:sectionId/inputs",
//   writeRoles,
//   boqController.saveSectionInputs
// );

// PATCH /boq/:organizationId/:boqId/sections/:sectionId  → STEP 2, single endpoint for dimensions + material/labour picks
boqRoutes.patch(
  "/:organizationId/:boqId/sections/:sectionId",
  writeRoles,
  boqController.updateSectionData
);

// POST /boq/:organizationId/:boqId/run-engine  → step 3
boqRoutes.post(
  "/:organizationId/:boqId/run-engine",
  writeRoles,
  boqController.runEngine
);

// PATCH /boq/:organizationId/:boqId/sections/:sectionId/line-items/:lineItemId  → step 4, manual edit
// boqRoutes.patch(
//   "/:organizationId/:boqId/sections/:sectionId/line-items/:lineItemId",
//   writeRoles,
//   boqController.updateLineItem
// );

// PATCH .../line-items/:lineItemId/assign-material  → step 4, price via real MaterialItem
boqRoutes.patch(
  "/:organizationId/:boqId/sections/:sectionId/line-items/:lineItemId/assign-material",
  writeRoles,
  boqController.assignMaterial
);

// PATCH .../labours/:labourRowId/assign-labour  → step 4, price via real LabourItem
boqRoutes.patch(
  "/:organizationId/:boqId/sections/:sectionId/labours/:labourRowId/assign-labour",
  writeRoles,
  boqController.assignLabour
);

export default boqRoutes;