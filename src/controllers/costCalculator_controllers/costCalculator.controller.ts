import { type Response,  type NextFunction } from "express";
import * as costCalculatorService from "./costCalculator.service.js"; // TODO confirm path
import type { RoleBasedRequest } from "../../utils/utils.js";

export const getCostCalculatorById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, costCalculatorId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!costCalculatorId) {
      res.status(400).json({ ok: false, message: "costCalculatorId is required" });
      return;
    }

    const result = await costCalculatorService.getCostCalculatorById(
      organizationId,
      costCalculatorId
    );

    res.status(200).json({ ok: true, data: result, message: "Cost calculator fetched successfully" });
  } catch (error) {
    next(error);
  }
};


// Single endpoint, both create AND update — presence of costCalculatorId in
// the body decides which. This IS the autosave call: the frontend fires it
// on every category checkbox toggle in step 1.
export const saveCategorySelection = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await costCalculatorService.saveCategorySelection(
      organizationId,
      userId,
      req.body
    );

    res.status(result.created ? 201 : 200).json({
      ok: true,
      data: result,
      message: result.created
        ? "Cost calculator started successfully"
        : "Category selection saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

//  STEP 2 FOR SVING THE DATA IN EACH CATEGORY


 export const saveSectionDetails = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await costCalculatorService.saveSectionDetails(organizationId, userId, req.body);

    res.status(200).json({ ok: true, data: result, message: "Section saved successfully" });
  } catch (error) {
    next(error);
  }
};