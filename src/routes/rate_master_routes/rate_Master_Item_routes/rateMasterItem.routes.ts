import { Router } from "express";
import * as itemController from "../../../controllers/rate_master_controllers/rate_master_item/rateMasterItem.controller.js"; // TODO confirm path
import { multiAuthRole } from "../../../middleware/auth.middleware.js";


const rateMasterItemRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// "inactive" registered BEFORE "/:itemId" — otherwise Express treats
// "inactive" as an itemId param value.

// GET /rate-master-items/v1/:organizationId/inactive
rateMasterItemRoutes.get("/v1/:organizationId/inactive", readRoles, itemController.getInactiveItems);

// POST /rate-master-items/v1/:organizationId
rateMasterItemRoutes.post("/v1/:organizationId", writeRoles, itemController.createItem);

// GET /rate-master-items/v1/:organizationId  (supports ?categoryId=&confidence=)
rateMasterItemRoutes.get("/v1/:organizationId", readRoles, itemController.getAllItems);

// GET /rate-master-items/v1/:organizationId/:itemId
rateMasterItemRoutes.get("/v1/:organizationId/:itemId", readRoles, itemController.getItemById);

// PATCH /rate-master-items/v1/:organizationId/:itemId
rateMasterItemRoutes.patch("/v1/:organizationId/:itemId", writeRoles, itemController.updateItem);

// PATCH /rate-master-items/v1/:organizationId/:itemId/deactivate
rateMasterItemRoutes.patch(
  "/v1/:organizationId/:itemId/deactivate",
  writeRoles,
  itemController.softDeleteItem
);

// PATCH /rate-master-items/v1/:organizationId/:itemId/recover
rateMasterItemRoutes.patch(
  "/v1/:organizationId/:itemId/recover",
  writeRoles,
  itemController.recoverItem
);

// DELETE /rate-master-items/v1/:organizationId/:itemId
rateMasterItemRoutes.delete("/v1/:organizationId/:itemId", writeRoles, itemController.hardDeleteItem);

export default rateMasterItemRoutes;