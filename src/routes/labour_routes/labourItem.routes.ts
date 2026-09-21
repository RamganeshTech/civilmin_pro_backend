import { Router } from "express";
// import { multiAuthRole } from "../../middlewares/multiAuthRole.js"; // adjust path to match your project
// import * as itemController from "./labourItem.controller.js";
import * as itemController from "../../controllers/labours/labour_items/labourItem.controller.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";


const labourItemRoutes = Router();

// Standard roles allowed for management and viewing
const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

/* ------------------------------------------------------------------ */
/*  Static/literal sub-paths MUST come before the dynamic             */
/*  "/:organizationId/:itemId" route below — otherwise Express        */
/*  will match "inactive" / "recover" as an itemId value instead      */
/*  of hitting these dedicated routes.                                */
/* ------------------------------------------------------------------ */

// GET /labour-items/:organizationId
labourItemRoutes.get(
  "/v1/:organizationId",
  readRoles,
  itemController.getAllItems
);

// GET /labour-items/:organizationId/inactive
labourItemRoutes.get(
  "/v1/:organizationId/inactive",
  readRoles,
  itemController.getInactiveItems
);


labourItemRoutes.get(
  "/v1/:organizationId/:categoryId/dropdown",
  readRoles,
  itemController.getLabourItemsDropdown
);


// POST /labour-items/:organizationId
labourItemRoutes.post(
  "/v1/:organizationId",
  writeRoles,
  itemController.createItem
);

// PATCH /labour-items/:organizationId/recover  (bulk recover)
labourItemRoutes.patch(
  "/v1/:organizationId/recover",
  writeRoles,
  itemController.recoverItems
);

// GET /labour-items/:organizationId/:itemId
labourItemRoutes.get(
  "/v1/:organizationId/:itemId",
  readRoles,
  itemController.getSingleItem
);

// PATCH /labour-items/:organizationId/:itemId
labourItemRoutes.patch(
  "/v1/:organizationId/:itemId",
  writeRoles,
  itemController.updateItem
);

// PATCH /labour-items/:organizationId/:itemId/recover  (single recover)
labourItemRoutes.patch(
  "/v1/:organizationId/:itemId/recover",
  writeRoles,
  itemController.recoverItem
);

// DELETE /labour-items/:organizationId/:itemId  (soft delete)
labourItemRoutes.delete(
  "/v1/:organizationId/:itemId",
  writeRoles,
  itemController.deleteItem
);

// DELETE /labour-items/:organizationId/:itemId/force  (hard delete)
labourItemRoutes.delete(
  "/v1/:organizationId/:itemId/force",
  writeRoles,
  itemController.hardDeleteItem
);

export default labourItemRoutes;