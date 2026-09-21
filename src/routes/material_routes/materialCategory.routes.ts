import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as categoryController from "../../controllers/materials/material_category/materialCategory.controller.js"
const materialCategoryRoutes = Router();

// Standard roles allowed for management and viewing
const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

/* ------------------------------------------------------------------ */
/*  Query-based routes                                                */
/* ------------------------------------------------------------------ */

// GET /material-categories?organizationId=xxx
materialCategoryRoutes.get(
  "/v1/:organizationId",
  readRoles,
  categoryController.getAllCategories
);

materialCategoryRoutes.get(
  "/v1/:organizationId/inactive",
  readRoles,
  categoryController.getInactiveCategories
);



/* ------------------------------------------------------------------ */
/*  Organization param-scoped routes                                 */
/* ------------------------------------------------------------------ */

// GET /material-categories/:organizationId/dropdown
// NOTE: Registered BEFORE /:organizationId/:categoryId so "dropdown" is not captured as categoryId
materialCategoryRoutes.get(
  "/v1/:organizationId/dropdown",
  readRoles,
  categoryController.getCategoriesDropdown
);

// POST /material-categories/:organizationId
materialCategoryRoutes.post(
  "/v1/:organizationId",
  writeRoles,
  categoryController.createCategory
);

// GET /material-categories/:organizationId/:categoryId
materialCategoryRoutes.get(
  "/v1/:organizationId/:categoryId",
  readRoles,
  categoryController.getCategoryById
);

// PATCH /material-categories/:organizationId/:categoryId
materialCategoryRoutes.patch(
  "/v1/:organizationId/:categoryId",
  writeRoles,
  categoryController.updateCategory
);

// DELETE /material-categories/:organizationId/:categoryId
materialCategoryRoutes.delete(
  "/v1/:organizationId/:categoryId",
  writeRoles,
  categoryController.softDeleteCategory
);

materialCategoryRoutes.delete(
  "/v1/:organizationId/:categoryId/hard-delete",
  writeRoles,
  categoryController.deleteCategoryFully
);


materialCategoryRoutes.put(
  "/v1/:organizationId/:categoryId/recover",
  writeRoles,
  categoryController.recoverCategory
);


export default materialCategoryRoutes;