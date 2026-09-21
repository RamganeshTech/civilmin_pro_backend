import { Router } from "express";
import { multiAuthRole } from "../../../middleware/auth.middleware.js";
import * as categoryController from "../../../controllers/rate_master_controllers/rate_master_category/rateMasterCategory.controller.js"; // TODO confirm path

const rateMasterCategoryRoutes = Router();

// Standard roles allowed for management and viewing
const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// Dropdown & inactive-list routes registered BEFORE "/:categoryId" — otherwise
// Express treats "dropdown"/"inactive" as a categoryId param value.

rateMasterCategoryRoutes.post(
  "/v1/:organizationId/initialize",
  writeRoles,
  categoryController.initializeRateMasterCategories
);

// GET /rate-master-categories/v1/:organizationId/dropdown
rateMasterCategoryRoutes.get(
  "/v1/:organizationId/dropdown",
  readRoles,
  categoryController.getCategoryDropdown
);

// GET /rate-master-categories/v1/:organizationId/inactive
rateMasterCategoryRoutes.get(
  "/v1/:organizationId/inactive",
  readRoles,
  categoryController.getInactiveCategories
);

// POST /rate-master-categories/v1/:organizationId
rateMasterCategoryRoutes.post(
  "/v1/:organizationId",
  writeRoles,
  categoryController.createCategory
);

// GET /rate-master-categories/v1/:organizationId
rateMasterCategoryRoutes.get(
  "/v1/:organizationId",
  readRoles,
  categoryController.getAllCategories
);

// GET /rate-master-categories/v1/:organizationId/:categoryId
rateMasterCategoryRoutes.get(
  "/v1/:organizationId/:categoryId",
  readRoles,
  categoryController.getCategoryById
);

// PATCH /rate-master-categories/v1/:organizationId/:categoryId
rateMasterCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId",
  writeRoles,
  categoryController.updateCategory
);

// PATCH /rate-master-categories/v1/:organizationId/:categoryId/deactivate
rateMasterCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId/deactivate",
  writeRoles,
  categoryController.softDeleteCategory
);

// PATCH /rate-master-categories/v1/:organizationId/:categoryId/recover
rateMasterCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId/recover",
  writeRoles,
  categoryController.recoverCategory
);

// DELETE /rate-master-categories/v1/:organizationId/:categoryId
rateMasterCategoryRoutes.delete(
  "/v1/:organizationId/:categoryId",
  writeRoles,
  categoryController.hardDeleteCategory
);

export default rateMasterCategoryRoutes;