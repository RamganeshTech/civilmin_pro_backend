import { Router } from "express";
import { multiAuthRole } from "../../middleware/auth.middleware.js";
import * as costCalculatorController from "../../controllers/costCalculator_controllers/costCalculator.controller.js";

const costCalculatorRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// GET /cost-calculators/v1/:organizationId  (supports ?projectId=&status=)
costCalculatorRoutes.get(
  "/v1/:organizationId",
  readRoles,
  costCalculatorController.getAllCostCalculators
);

// POST /cost-calculators/v1/:organizationId/category-selection
// Step 1 — create-or-update, costCalculatorId comes from the BODY, not a
// route param, so this has no collision risk with "/:costCalculatorId" below.
costCalculatorRoutes.post(
  "/v1/:organizationId/category-selection",
  writeRoles,
  costCalculatorController.saveCategorySelection
);

// POST /cost-calculators/v1/:organizationId/section-details
// Step 2 — same reasoning: costCalculatorId is in the body.
costCalculatorRoutes.post(
  "/v1/:organizationId/section-details",
  writeRoles,
  costCalculatorController.saveSectionDetails
);

// GET /cost-calculators/v1/:organizationId/:costCalculatorId
costCalculatorRoutes.get(
  "/v1/:organizationId/:costCalculatorId",
  readRoles,
  costCalculatorController.getCostCalculatorById
);

// PATCH /cost-calculators/v1/:organizationId/:costCalculatorId/approve
costCalculatorRoutes.patch(
  "/v1/:organizationId/:costCalculatorId/approve",
  writeRoles,
  costCalculatorController.approveCostCalculator
);

export default costCalculatorRoutes;