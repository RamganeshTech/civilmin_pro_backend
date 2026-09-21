import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as itemController from "../../controllers/formula_controller/formula_items/formulaItem.controller.js"; // TODO confirm path


const formulaItemRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// "inactive" registered BEFORE "/:itemId" — otherwise Express treats
// "inactive" as an itemId param value.

// GET /formula-items/v1/:organizationId/inactive
formulaItemRoutes.get("/v1/:organizationId/inactive", readRoles, itemController.getInactiveItems);

// POST /formula-items/v1/:organizationId
formulaItemRoutes.post("/v1/:organizationId", writeRoles, itemController.createItem);

// GET /formula-items/v1/:organizationId  (supports ?categoryId=&confidence=)
formulaItemRoutes.get("/v1/:organizationId", readRoles, itemController.getAllItems);

// GET /formula-items/v1/:organizationId/:itemId
formulaItemRoutes.get("/v1/:organizationId/:itemId", readRoles, itemController.getItemById);

// PATCH /formula-items/v1/:organizationId/:itemId
formulaItemRoutes.patch("/v1/:organizationId/:itemId", writeRoles, itemController.updateItem);

// PATCH /formula-items/v1/:organizationId/:itemId/deactivate
formulaItemRoutes.patch(
  "/v1/:organizationId/:itemId/deactivate",
  writeRoles,
  itemController.softDeleteItem
);

// PATCH /formula-items/v1/:organizationId/:itemId/recover
formulaItemRoutes.patch(
  "/v1/:organizationId/:itemId/recover",
  writeRoles,
  itemController.recoverItem
);

// DELETE /formula-items/v1/:organizationId/:itemId
formulaItemRoutes.delete("/v1/:organizationId/:itemId", writeRoles, itemController.hardDeleteItem);

export default formulaItemRoutes;