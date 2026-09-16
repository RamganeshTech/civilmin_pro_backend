import { type Response, type NextFunction } from "express";
import * as itemService from "./labourItem.service.js";
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

    res.status(201).json({ ok: true, data: result, message: "Labour item created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllItems = async (
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

    const { categoryId, status, skillLevel, search, isActive, page, limit } = req.query;

    const result = await itemService.getAllItems(organizationId, {
      categoryId,
      status: status as any,
      skillLevel: skillLevel as any,
      search,
      isActive: isActive === undefined ? undefined : isActive === "true",
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getSingleItem = async (
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

    const result = await itemService.getSingleItem(itemId, organizationId);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

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

    res.status(200).json({ ok: true, data: result.items });
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

    const result = await itemService.updateItem(itemId, organizationId, userId, req.body);

    res.status(200).json({ ok: true, data: result, message: "Labour item updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (
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

    const result = await itemService.deleteItem(itemId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Labour item deleted successfully" });
  } catch (error) {
    next(error);
  }
};

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

    const result = await itemService.hardDeleteItem(itemId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Labour item permanently deleted" });
  } catch (error) {
    next(error);
  }
};

export const recoverItem = async (
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

    const result = await itemService.recoverItem(itemId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Labour item recovered successfully" });
  } catch (error) {
    next(error);
  }
};

export const recoverItems = async (
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

    const { itemIds, refNos, fromDate, toDate } = req.body;

    const result = await itemService.recoverItems(organizationId, {
      itemIds,
      refNos,
      fromDate,
      toDate,
    });

    res.status(200).json({
      ok: true,
      data: result.items,
      message: `${result.recoveredCount} item(s) recovered successfully`,
    });
  } catch (error) {
    next(error);
  }
};