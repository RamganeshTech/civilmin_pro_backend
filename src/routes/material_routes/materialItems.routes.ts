// routes/materials/materialItem.routes.ts
import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as itemController from "../../controllers/materials/material_items/materialItems.controller.js";

const materialItemRoutes = Router();

// Standard roles allowed for management and viewing
const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

/* ------------------------------------------------------------------ */
/*  Organization param-scoped routes                                  */
/* ------------------------------------------------------------------ */

// GET /organizations/:organizationId/material-items
materialItemRoutes.get(
  "/v1/:organizationId",
  readRoles,
  itemController.getAllItems
);

materialItemRoutes.get(
  "/v1/:organizationId/inactive",
  readRoles,
  itemController.getInactiveItems
);




// POST /organizations/:organizationId/material-items
materialItemRoutes.post(
  "/v1/:organizationId",
  writeRoles,
  itemController.createItem
);



materialItemRoutes.patch(
  "/v1/:organizationId/recover",
  writeRoles,
  itemController.recoverItems
);


materialItemRoutes.get(
  "/v1/:organizationId/:categoryId/dropdown",
  readRoles,
  itemController.getMaterialItemsDropdown
);


// GET /organizations/:organizationId/material-items/:itemId
materialItemRoutes.get(
  "/v1/:organizationId/:itemId",
  readRoles,
  itemController.getItemById
);

// PATCH /organizations/:organizationId/material-items/:itemId
materialItemRoutes.patch(
  "/v1/:organizationId/:itemId",
  writeRoles,
  itemController.updateItem
);

// DELETE /organizations/:organizationId/material-items/:itemId
materialItemRoutes.delete(
  "/v1/:organizationId/:itemId",
  writeRoles,
  itemController.deleteItem
);



materialItemRoutes.delete(
  "/v1/:organizationId/:itemId/hard-delete",
  writeRoles,
  itemController.hardDeleteItem
);



materialItemRoutes.put(
  "/v1/:organizationId/:itemId/recover",
  writeRoles,
  itemController.recoverItem
);


export default materialItemRoutes;