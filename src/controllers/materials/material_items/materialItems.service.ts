import { Types } from "mongoose";
import { ApiError } from "../../../utils/apiError.js";
import MaterialCategoryModel from "../../../models/materials/materialCategory.model.js";
import MaterialItemModel, { type IMaterialItem, type IMaterialItemModel, type IMaterialItemStatus, type IMaterialUnit } from "../../../models/materials/materialItem.model.js";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface IItemFilters {
  categoryId?: string;
  status?: string; // "Active" | "Inactive" | "Discontinued"
  search?: string; // matches productName / brand
  isActive?: string; // "true" | "false"
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface ICreateItemInput {
  categoryId: string;
  productName: string;
  brand?: string;
  unit: IMaterialUnit;
  currentRate: number;
  status?: IMaterialItemStatus;
  source?: string;
  notes?: string;
}

export type IUpdateItemInput = Partial<ICreateItemInput> & { isActive?: boolean };

/* ------------------------------------------------------------------ */
/*  Field whitelisting                                                */
/* ------------------------------------------------------------------ */

const ALLOWED_CREATE_FIELDS = [
  "categoryId",
  "productName",
  "brand",
  "unit",
  "currentRate",
  "status",
  "source",
  "notes",
] as const;

const ALLOWED_UPDATE_FIELDS = [...ALLOWED_CREATE_FIELDS, "isActive"] as const;

const pickFields = <T extends object>(source: T, allowedFields: readonly string[]): Partial<T> => {
  const result: Partial<T> = {};
  for (const field of allowedFields) {
    const value = (source as Record<string, unknown>)[field];
    if (value !== undefined) {
      (result as Record<string, unknown>)[field] = value;
    }
  }
  return result;
};

/* ------------------------------------------------------------------ */
/*  Helper: verify category exists, belongs to org, and is active     */
/* ------------------------------------------------------------------ */

const assertCategoryIsValid = async (organizationId: string, categoryId: string): Promise<void> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid categoryId");
  }

  const category = await MaterialCategoryModel.findOne({
    _id: categoryId,
    organizationId,
    isActive: true,
  }).lean();

  if (!category) {
    throw new ApiError(400, "Category not found or inactive");
  }
};

/* ------------------------------------------------------------------ */
/*  Get All (with filters + pagination)                               */
/* ------------------------------------------------------------------ */

export const getAllItems = async (
  organizationId: string,
  filters: IItemFilters
): Promise<{ items: IMaterialItem[]; 
  // total: number; page: number; limit: number; totalPages: number
 }> => {
  const {
    categoryId,
    status,
    search,
    isActive,
    // page = "1",
    // limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const query: Record<string, unknown> = { organizationId };

  if (categoryId) {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new ApiError(400, "Invalid categoryId");
    }
    query.categoryId = categoryId;
  }

  if (status) query.status = status;

  query.isActive = isActive === undefined ? true : isActive === "true";

  if (search) {
    query.$or = [
      { productName: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  // const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  // const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  // const skip = (pageNum - 1) * limitNum;
  const sortDirection = sortOrder === "asc" ? 1 : -1;
  const items = await MaterialItemModel.find({
    organizationId,
    isActive: true,
  }).sort({ updatedAt: -1 });

  // const [items, total] = await Promise.all([
  //   MaterialItemModel.find(query)
  //     .sort({ [sortBy]: sortDirection })
  //     .skip(skip)
  //     .limit(limitNum)
  //     .populate("categoryId", "categoryName code icon color")
  //     .lean(),
  //   MaterialItemModel.countDocuments(query),
  // ]);

  // return {
  //   items: items as unknown as IMaterialItem[],
  //   total,
  //   page: pageNum,
  //   limit: limitNum,
  //   totalPages: Math.max(Math.ceil(total / limitNum), 1),
  // };

  return {items: items}
};

/* ------------------------------------------------------------------ */
/*  Get By Id                                                          */
/* ------------------------------------------------------------------ */

export const getItemById = async (
  itemId: string,
  organizationId: string
): Promise<{ item: IMaterialItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await MaterialItemModel.findOne({ _id: itemId, organizationId }).populate(
    "categoryId",
    "categoryName code icon color"
  );

  if (!item) {
    throw new ApiError(404, "Material item not found");
  }

  return { item };
};

/* ------------------------------------------------------------------ */
/*  Create                                                             */
/* ------------------------------------------------------------------ */

export const createItem = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateItemInput
): Promise<{ item: IMaterialItem }> => {
  const safePayload = pickFields<ICreateItemInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.categoryId || !safePayload.productName || !safePayload.unit || safePayload.currentRate === undefined) {
    throw new ApiError(400, "categoryId, productName, unit and currentRate are required");
  }

  await assertCategoryIsValid(organizationId, safePayload.categoryId);

  const item = await MaterialItemModel.create({
    ...safePayload,
    organizationId,
    createdBy,
    previousRate: safePayload.currentRate,
    rateChangePercentage: 0,
    rateChangeDirection: "no_change",
    lastRateUpdatedAt: new Date(),
  });

  return { item };
};

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

export const updateItem = async (
  itemId: string,
  organizationId: string,
  updatedBy: string,
  payload: IUpdateItemInput
): Promise<{ item: IMaterialItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const existingItem = await MaterialItemModel.findOne({ _id: itemId, organizationId });

  if (!existingItem) {
    throw new ApiError(404, "Material item not found");
  }

  const safePayload = pickFields<IUpdateItemInput>(payload, ALLOWED_UPDATE_FIELDS) as Record<string, unknown>;

  if (safePayload.categoryId) {
    await assertCategoryIsValid(organizationId, safePayload.categoryId as string);
  }

  // Rate change: only recompute when currentRate is actually being changed
  if (
    safePayload.currentRate !== undefined &&
    safePayload.currentRate !== existingItem.currentRate
  ) {
    const { rateChangePercentage, rateChangeDirection } = (
      MaterialItemModel as IMaterialItemModel
    ).computeRateChange(existingItem.currentRate, safePayload.currentRate as number);

    safePayload.previousRate = existingItem.currentRate;
    safePayload.rateChangePercentage = rateChangePercentage;
    safePayload.rateChangeDirection = rateChangeDirection;
    safePayload.lastRateUpdatedAt = new Date();
  }

  safePayload.updatedBy = updatedBy;

  const item = await MaterialItemModel.findOneAndUpdate(
    { _id: itemId, organizationId },
    { $set: safePayload },
    { new: true, runValidators: true }
  );

  if (!item) {
    throw new ApiError(404, "Material item not found");
  }

  return { item };
};

/* ------------------------------------------------------------------ */
/*  Delete (soft delete)                                               */
/* ------------------------------------------------------------------ */

export const deleteItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: IMaterialItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await MaterialItemModel.findOneAndUpdate(
    { _id: itemId, organizationId },
    { $set: { isActive: false } },
    { new: true }
  );

  if (!item) {
    throw new ApiError(404, "Material item not found");
  }

  return { item };
};


export const hardDeleteItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: IMaterialItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await MaterialItemModel.findOneAndDelete({
    _id: itemId,
    organizationId,
  });

  if (!item) {
    throw new ApiError(404, "Material item not found");
  }

  return { item };
};

export const getInactiveItems = async (
  organizationId: string
): Promise<{ items: IMaterialItem[] }> => {
  const items = await MaterialItemModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return { items };
};




export const recoverItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: IMaterialItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await MaterialItemModel.findOneAndUpdate(
    { _id: itemId, organizationId, isActive: false },
    { $set: { isActive: true } },
    { new: true }
  );

  if (!item) {
    throw new ApiError(404, "Inactive material item not found");
  }

  return { item };
};


export interface RecoverItemsFilters {
  itemIds?: string[];
  refNos?: string[];
  fromDate?: string; // ISO date string
  toDate?: string;   // ISO date string
}

export const recoverItems = async (
  organizationId: string,
  filters: RecoverItemsFilters
): Promise<{ recoveredCount: number; items: IMaterialItem[] }> => {
  const { itemIds, refNos, fromDate, toDate } = filters;

  if (
    (!itemIds || itemIds.length === 0) &&
    (!refNos || refNos.length === 0) &&
    !fromDate &&
    !toDate
  ) {
    throw new ApiError(
      400,
      "Provide at least one of: itemIds, refNos, or a date range (fromDate/toDate)"
    );
  }

  const query: Record<string, any> = { organizationId, isActive: false };
  const orConditions: Record<string, any>[] = [];

  if (itemIds && itemIds.length > 0) {
    const validIds = itemIds.filter((id) => Types.ObjectId.isValid(id));
    if (validIds.length > 0) {
      orConditions.push({ _id: { $in: validIds } });
    }
  }

  if (refNos && refNos.length > 0) {
    orConditions.push({ refNo: { $in: refNos } });
  }

  if (orConditions.length > 0) {
    query.$or = orConditions;
  }

  if (fromDate || toDate) {
    query.updatedAt = {};
    if (fromDate) query.updatedAt.$gte = new Date(fromDate);
    if (toDate) query.updatedAt.$lte = new Date(toDate);
  }

  const itemsToRecover = await MaterialItemModel.find(query).select("_id");

  if (itemsToRecover.length === 0) {
    throw new ApiError(404, "No matching inactive items found to recover");
  }

  const idsToRecover = itemsToRecover.map((item) => item._id);

  await MaterialItemModel.updateMany(
    { _id: { $in: idsToRecover } },
    { $set: { isActive: true } }
  );

  const items = await MaterialItemModel.find({ _id: { $in: idsToRecover } });

  return { recoveredCount: items.length, items };
};