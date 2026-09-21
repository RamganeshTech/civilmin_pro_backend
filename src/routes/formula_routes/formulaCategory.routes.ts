import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as categoryController from "../../controllers/formula_controller/formula_category/formulaCategory.controller.js"; // TODO confirm path

const formulaCategoryRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// "dropdown" and "inactive" registered BEFORE "/:categoryId" — otherwise
// Express treats them as a categoryId param value.


formulaCategoryRoutes.post(
  "/v1/:organizationId/initialize",
  writeRoles,
  categoryController.initializeFormulaLibrary
);

// GET /formula-categories/v1/:organizationId/dropdown
formulaCategoryRoutes.get("/v1/:organizationId/dropdown", readRoles, categoryController.getCategoryDropdown);

// GET /formula-categories/v1/:organizationId/inactive
formulaCategoryRoutes.get("/v1/:organizationId/inactive", readRoles, categoryController.getInactiveCategories);

// POST /formula-categories/v1/:organizationId
formulaCategoryRoutes.post("/v1/:organizationId", writeRoles, categoryController.createCategory);

// GET /formula-categories/v1/:organizationId
formulaCategoryRoutes.get("/v1/:organizationId", readRoles, categoryController.getAllCategories);

// GET /formula-categories/v1/:organizationId/:categoryId
formulaCategoryRoutes.get("/v1/:organizationId/:categoryId", readRoles, categoryController.getCategoryById);

// PATCH /formula-categories/v1/:organizationId/:categoryId
formulaCategoryRoutes.patch("/v1/:organizationId/:categoryId", writeRoles, categoryController.updateCategory);

// PATCH /formula-categories/v1/:organizationId/:categoryId/deactivate
formulaCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId/deactivate",
  writeRoles,
  categoryController.softDeleteCategory
);

// PATCH /formula-categories/v1/:organizationId/:categoryId/recover
formulaCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId/recover",
  writeRoles,
  categoryController.recoverCategory
);

// DELETE /formula-categories/v1/:organizationId/:categoryId
formulaCategoryRoutes.delete("/v1/:organizationId/:categoryId", writeRoles, categoryController.hardDeleteCategory);

export default formulaCategoryRoutes;