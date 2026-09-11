import { type Response, type NextFunction } from "express";
import type { RoleBasedRequest } from "../../../utils/utils.js";
import * as categoryService from "./materialCategory.service.js"



/* ------------------------------------------------------------------ */
/*  GET /material-categories                                           */
/* ------------------------------------------------------------------ */

export const getAllCategories = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { organizationId } = req.query;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }

        const result = await categoryService.getAllCategories(organizationId, req.query as any);

        res.status(200).json({ ok: true, data: result });
    } catch (error) {
        next(error);
    }
};

/* ------------------------------------------------------------------ */
/*  GET /material-categories/dropdown                                  */
/*  NOTE: register this route BEFORE /:categoryId in the router,       */
/*  otherwise Express will treat "dropdown" as a categoryId param.     */
/* ------------------------------------------------------------------ */

export const getCategoriesDropdown = async (
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

        const result = await categoryService.getCategoriesDropdown(organizationId);

        res.status(200).json({ ok: true, data: result });
    } catch (error) {
        next(error);
    }
};

/* ------------------------------------------------------------------ */
/*  GET /material-categories/:categoryId                               */
/* ------------------------------------------------------------------ */

export const getCategoryById = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {organizationId, categoryId } = req.params;

        if (!categoryId) {
            res.status(400).json({ ok: false, message: "categoryId is required" });
            return;
        }

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }

        const result = await categoryService.getCategoryById(categoryId, organizationId);

        res.status(200).json({ ok: true, data: result });
    } catch (error) {
        next(error);
    }
};

/* ------------------------------------------------------------------ */
/*  POST /material-categories                                          */
/* ------------------------------------------------------------------ */

export const createCategory = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {  userId } = req.user!;

        const {organizationId} = req.params

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
/*  PATCH /material-categories/:categoryId                             */
/* ------------------------------------------------------------------ */

export const updateCategory = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { categoryId, organizationId } = req.params;

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
/*  DELETE /material-categories/:categoryId                            */
/* ------------------------------------------------------------------ */

export const deleteCategory = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { categoryId, organizationId } = req.params;

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