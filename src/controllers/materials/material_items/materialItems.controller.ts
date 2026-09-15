import { type Response, type NextFunction } from "express";
import type { RoleBasedRequest } from "../../../utils/utils.js";
import * as itemService from "./materialItems.service.js"
/* ------------------------------------------------------------------ */
/*  GET /organizations/:organizationId/material-items                 */
/* ------------------------------------------------------------------ */

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

    const result = await itemService.getAllItems(organizationId, req.query as any);

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

/* ------------------------------------------------------------------ */
/*  GET /organizations/:organizationId/material-items/:itemId          */
/* ------------------------------------------------------------------ */

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

    const result = await itemService.getItemById(itemId, organizationId);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  POST /organizations/:organizationId/material-items                 */
/* ------------------------------------------------------------------ */

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

    res.status(201).json({ ok: true, data: result, message: "Material item created successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  PATCH /organizations/:organizationId/material-items/:itemId        */
/* ------------------------------------------------------------------ */

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

    res.status(200).json({ ok: true, data: result, message: "Material item updated successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  DELETE /organizations/:organizationId/material-items/:itemId       */
/* ------------------------------------------------------------------ */

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

    res.status(200).json({ ok: true, data: result, message: "Material item deleted successfully" });
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

    res.status(200).json({ ok: true, data: result, message: "Material item permanently deleted" });
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

    res.status(200).json({ ok: true, data: result, message: "Material item recovered successfully" });
  } catch (error) {
    next(error);
  }
};