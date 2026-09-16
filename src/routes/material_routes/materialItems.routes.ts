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
  "/:organizationId",
  readRoles,
  itemController.getAllItems
);

materialItemRoutes.get(
  "/:organizationId/inactive",
  readRoles,
  itemController.getInactiveItems
);




// POST /organizations/:organizationId/material-items
materialItemRoutes.post(
  "/:organizationId",
  writeRoles,
  itemController.createItem
);



materialItemRoutes.patch(
  "/:organizationId/recover",
  writeRoles,
  itemController.recoverItems
);



// GET /organizations/:organizationId/material-items/:itemId
materialItemRoutes.get(
  "/:organizationId/:itemId",
  readRoles,
  itemController.getItemById
);

// PATCH /organizations/:organizationId/material-items/:itemId
materialItemRoutes.patch(
  "/:organizationId/:itemId",
  writeRoles,
  itemController.updateItem
);

// DELETE /organizations/:organizationId/material-items/:itemId
materialItemRoutes.delete(
  "/:organizationId/:itemId",
  writeRoles,
  itemController.deleteItem
);



materialItemRoutes.delete(
  "/:organizationId/:itemId/hard-delete",
  writeRoles,
  itemController.hardDeleteItem
);



materialItemRoutes.put(
  "/:organizationId/:itemId/recover",
  writeRoles,
  itemController.recoverItem
);


export default materialItemRoutes;