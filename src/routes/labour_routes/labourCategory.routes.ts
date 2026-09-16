import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
// import { multiAuthRole } from "../../middlewares/multiAuthRole.js"; // adjust path to match your project
import * as categoryController from "../../controllers/labours/labour_category/labourCategory.controller.js";

const labourCategoryRoutes = Router();

// Standard roles allowed for management and viewing
const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

/* ------------------------------------------------------------------ */
/*  Static/literal sub-paths MUST come before the dynamic             */
/*  "/:organizationId/:categoryId" route below — otherwise Express    */
/*  will match "dropdown" / "inactive" as a categoryId value instead  */
/*  of hitting these dedicated routes.                                */
/* ------------------------------------------------------------------ */

// GET /labour-category/:organizationId
labourCategoryRoutes.get(
  "/:organizationId",
  readRoles,
  categoryController.getAllCategories
);

// GET /labour-category/:organizationId/dropdown
labourCategoryRoutes.get(
  "/:organizationId/dropdown",
  readRoles,
  categoryController.getCategoriesForDropdown
);

// GET /labour-category/:organizationId/inactive
labourCategoryRoutes.get(
  "/:organizationId/inactive",
  readRoles,
  categoryController.getInactiveCategories
);

// POST /labour-category/:organizationId
labourCategoryRoutes.post(
  "/:organizationId",
  writeRoles,
  categoryController.createCategory
);

// GET /labour-category/:organizationId/:categoryId
labourCategoryRoutes.get(
  "/:organizationId/:categoryId",
  readRoles,
  categoryController.getCategoryById
);

// PATCH /labour-category/:organizationId/:categoryId
labourCategoryRoutes.patch(
  "/:organizationId/:categoryId",
  writeRoles,
  categoryController.updateCategory
);

// PATCH /labour-category/:organizationId/:categoryId/recover
labourCategoryRoutes.patch(
  "/:organizationId/:categoryId/recover",
  writeRoles,
  categoryController.recoverCategory
);

// DELETE /labour-category/:organizationId/:categoryId  (soft delete)
labourCategoryRoutes.delete(
  "/:organizationId/:categoryId",
  writeRoles,
  categoryController.deleteCategory
);

// DELETE /labour-category/:organizationId/:categoryId/force  (hard delete)
labourCategoryRoutes.delete(
  "/:organizationId/:categoryId/force",
  writeRoles,
  categoryController.hardDeleteCategory
);

export default labourCategoryRoutes;