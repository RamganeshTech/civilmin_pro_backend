import {type  Response, type NextFunction } from "express";
// import { RoleBasedRequest } from "../../utils/utils.js";
import * as categoryService from "./labourCategory.service.js";
import type { RoleBasedRequest } from "../../../utils/utils.js";

/* ------------------------------------------------------------------ */
/*  POST /labour-categories/:organizationId                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  GET /labour-categories/:organizationId                            */
/* ------------------------------------------------------------------ */

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

    res.status(200).json({ ok: true, data: result.categories });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  GET /labour-categories/:organizationId/dropdown                   */
/* ------------------------------------------------------------------ */

export const getCategoriesForDropdown = async (
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

    const result = await categoryService.getCategoriesForDropdown(organizationId);

    res.status(200).json({ ok: true, data: result.categories });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  GET /labour-categories/:organizationId/inactive                   */
/* ------------------------------------------------------------------ */

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

    res.status(200).json({ ok: true, data: result.categories });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  GET /labour-categories/:organizationId/:categoryId                */
/* ------------------------------------------------------------------ */

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

    const result = await categoryService.getCategoryById(categoryId, organizationId);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  PATCH /labour-categories/:organizationId/:categoryId              */
/* ------------------------------------------------------------------ */

export const updateCategory = async (
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

    const result = await categoryService.updateCategory(categoryId, organizationId, req.body);

    res.status(200).json({ ok: true, data: result, message: "Category updated successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  DELETE /labour-categories/:organizationId/:categoryId  (soft)     */
/* ------------------------------------------------------------------ */

export const deleteCategory = async (
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

    const result = await categoryService.deleteCategory(categoryId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  DELETE /labour-categories/:organizationId/:categoryId/force       */
/* ------------------------------------------------------------------ */

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

    const result = await categoryService.hardDeleteCategory(categoryId, organizationId);

    res.status(200).json({
      ok: true,
      message: `Category and ${result.deletedItemsCount} associated item(s) deleted permanently`,
    });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  PATCH /labour-categories/:organizationId/:categoryId/recover      */
/* ------------------------------------------------------------------ */

export const recoverCategory = async (
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

    const result = await categoryService.recoverCategory(categoryId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Category recovered successfully" });
  } catch (error) {
    next(error);
  }
};