import { type Response, type NextFunction } from "express";
import * as categoryService from "./formulaCategory.service.js"; // TODO confirm path
import type { RoleBasedRequest } from "../../../utils/utils.js";




export const initializeFormulaLibrary = async (
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

    const result = await categoryService.initializeFormulaLibrary(organizationId, userId);

    if (result.alreadyInitialized) {
      res.status(200).json({
        ok: true,
        data: result,
        message: "Formula library already initialized for this organization",
      });
      return;
    }

    res.status(201).json({
      ok: true,
      data: result,
      message: `Formula library initialized: ${result.categoriesCreated} categories, ${result.itemsCreated} formulas`,
    });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
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

    const result = await categoryService.createCategory(organizationId, userId, req.body);

    res.status(201).json({ ok: true, data: result, message: "Category created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await categoryService.getAllCategories(organizationId);

    res.status(200).json({ ok: true, data: result, message: "Categories fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, categoryId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!categoryId) {
      res.status(400).json({ ok: false, message: "categoryId is required" });
      return;
    }

    const result = await categoryService.getCategoryById(organizationId, categoryId);

    res.status(200).json({ ok: true, data: result, message: "Category fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, categoryId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!categoryId) {
      res.status(400).json({ ok: false, message: "categoryId is required" });
      return;
    }

    const result = await categoryService.updateCategory(
      organizationId,
      categoryId,
      userId,
      req.body
    );

    res.status(200).json({ ok: true, data: result, message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Soft delete — sets isActive: false, record is kept.
export const softDeleteCategory = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, categoryId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!categoryId) {
      res.status(400).json({ ok: false, message: "categoryId is required" });
      return;
    }

    const result = await categoryService.softDeleteCategory(organizationId, categoryId, userId);

    res.status(200).json({ ok: true, data: result, message: "Category deactivated successfully" });
  } catch (error) {
    next(error);
  }
};

// Recovery — flips a soft-deleted category's isActive back to true.
export const recoverCategory = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, categoryId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!categoryId) {
      res.status(400).json({ ok: false, message: "categoryId is required" });
      return;
    }

    const result = await categoryService.recoverCategory(organizationId, categoryId, userId);

    res.status(200).json({ ok: true, data: result, message: "Category recovered successfully" });
  } catch (error) {
    next(error);
  }
};

// Hard delete — permanently removes the document.
export const hardDeleteCategory = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, categoryId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!categoryId) {
      res.status(400).json({ ok: false, message: "categoryId is required" });
      return;
    }

    await categoryService.hardDeleteCategory(organizationId, categoryId);

    res.status(200).json({ ok: true, data: null, message: "Category permanently deleted" });
  } catch (error) {
    next(error);
  }
};

// Recycle-bin listing — only isActive: false categories.
export const getInactiveCategories = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await categoryService.getInactiveCategories(organizationId);

    res
      .status(200)
      .json({ ok: true, data: result, message: "Inactive categories fetched successfully" });
  } catch (error) {
    next(error);
  }
};

// Minimal dropdown listing — active categories, _id + categoryName only.
// NOTE: register this route BEFORE "/:categoryId" (see conventions.md — otherwise
// Express treats "dropdown" as a categoryId param value).
export const getCategoryDropdown = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await categoryService.getCategoryDropdown(organizationId);

    res.status(200).json({ ok: true, data: result, message: "Categories fetched successfully" });
  } catch (error) {
    next(error);
  }
};