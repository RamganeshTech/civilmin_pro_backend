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
  "/:organizationId",
  readRoles,
  categoryController.getAllCategories
);

materialCategoryRoutes.get(
  "/:organizationId/inactive",
  readRoles,
  categoryController.getInactiveCategories
);



/* ------------------------------------------------------------------ */
/*  Organization param-scoped routes                                 */
/* ------------------------------------------------------------------ */

// GET /material-categories/:organizationId/dropdown
// NOTE: Registered BEFORE /:organizationId/:categoryId so "dropdown" is not captured as categoryId
materialCategoryRoutes.get(
  "/:organizationId/dropdown",
  readRoles,
  categoryController.getCategoriesDropdown
);

// POST /material-categories/:organizationId
materialCategoryRoutes.post(
  "/:organizationId",
  writeRoles,
  categoryController.createCategory
);

// GET /material-categories/:organizationId/:categoryId
materialCategoryRoutes.get(
  "/:organizationId/:categoryId",
  readRoles,
  categoryController.getCategoryById
);

// PATCH /material-categories/:organizationId/:categoryId
materialCategoryRoutes.patch(
  "/:organizationId/:categoryId",
  writeRoles,
  categoryController.updateCategory
);

// DELETE /material-categories/:organizationId/:categoryId
materialCategoryRoutes.delete(
  "/:organizationId/:categoryId",
  writeRoles,
  categoryController.softDeleteCategory
);

materialCategoryRoutes.delete(
  "/:organizationId/:categoryId/hard-delete",
  writeRoles,
  categoryController.deleteCategoryFully
);


materialCategoryRoutes.put(
  "/:organizationId/:categoryId/recover",
  writeRoles,
  categoryController.recoverCategory
);


export default materialCategoryRoutes;