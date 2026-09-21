import { type Response, type  NextFunction } from "express";
import * as itemService from "./formulaItem.service.js"; // TODO confirm path
import type { RoleBasedRequest } from "../../../utils/utils.js";

export const createItem = async (
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

    const result = await itemService.createItem(organizationId, userId, req.body);

    res.status(201).json({ ok: true, data: result, message: "Formula item created successfully" });
  } catch (error) {
    next(error);
  }
};

// Supports optional ?categoryId= and ?confidence= filters.
export const getAllItems = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params;
    const { categoryId, confidence } = req.query;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }

    const result = await itemService.getAllItems(organizationId, { categoryId, confidence });

    res.status(200).json({ ok: true, data: result, message: "Formula items fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, itemId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!itemId) {
      res.status(400).json({ ok: false, message: "itemId is required" });
      return;
    }

    const result = await itemService.getItemById(organizationId, itemId);

    res.status(200).json({ ok: true, data: result, message: "Formula item fetched successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateItem = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, itemId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!itemId) {
      res.status(400).json({ ok: false, message: "itemId is required" });
      return;
    }

    const result = await itemService.updateItem(organizationId, itemId, userId, req.body);

    res.status(200).json({ ok: true, data: result, message: "Formula item updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Soft delete — sets isActive: false, record is kept.
export const softDeleteItem = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, itemId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!itemId) {
      res.status(400).json({ ok: false, message: "itemId is required" });
      return;
    }

    const result = await itemService.softDeleteItem(organizationId, itemId, userId);

    res.status(200).json({ ok: true, data: result, message: "Formula item deactivated successfully" });
  } catch (error) {
    next(error);
  }
};

// Recovery — flips a soft-deleted item's isActive back to true.
export const recoverItem = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;
    const { organizationId, itemId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!itemId) {
      res.status(400).json({ ok: false, message: "itemId is required" });
      return;
    }

    const result = await itemService.recoverItem(organizationId, itemId, userId);

    res.status(200).json({ ok: true, data: result, message: "Formula item recovered successfully" });
  } catch (error) {
    next(error);
  }
};

// Hard delete — permanently removes the document.
export const hardDeleteItem = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId, itemId } = req.params;

    if (!organizationId) {
      res.status(400).json({ ok: false, message: "organizationId is required" });
      return;
    }
    if (!itemId) {
      res.status(400).json({ ok: false, message: "itemId is required" });
      return;
    }

    await itemService.hardDeleteItem(organizationId, itemId);

    res.status(200).json({ ok: true, data: null, message: "Formula item permanently deleted" });
  } catch (error) {
    next(error);
  }
};

// Recycle-bin listing — only isActive: false items.
export const getInactiveItems = async (
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

    const result = await itemService.getInactiveItems(organizationId);

    res
      .status(200)
      .json({ ok: true, data: result, message: "Inactive formula items fetched successfully" });
  } catch (error) {
    next(error);
  }
};