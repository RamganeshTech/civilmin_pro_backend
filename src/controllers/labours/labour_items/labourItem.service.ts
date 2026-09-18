import { Types } from "mongoose";
// import LabourItemModel, { ILabourItem } from "../models/labourItem.model.js";
// import LabourCategoryModel from "../models/labourCategory.model.js";
// import { ApiError } from "../../utils/apiError.js";
// import { pickFields } from "../../utils/pickFields.js";
// import {
//   ICreateLabourItemInput,
//   IUpdateLabourItemInput,
//   ILabourItemFilters,
//   ALLOWED_CREATE_FIELDS,
//   ALLOWED_UPDATE_FIELDS,
// } from "./labourItem.types.js";


// import { ISkillLevel, ILabourItemStatus } from "../models/labourItem.model.js";
import { ApiError } from "../../../utils/apiError.js";
import LabourCategoryModel from "../../../models/labours/labourCategory.model.js";
import { pickFields } from "../../../utils/utils.js";
import type { ILabourItem, ILabourItemStatus, ISkillLevel } from "../../../models/labours/labourItem.model.js";
import LabourItemModel from "../../../models/labours/labourItem.model.js";

export interface ICreateLabourItemInput {
  categoryId: string;
  role: string;
  skillLevel: ISkillLevel;
  rate: number;
  halfDayRate: number;
  otPerHour: number;
  status?: ILabourItemStatus;
  notes?: string;
}

export type IUpdateLabourItemInput = Partial<ICreateLabourItemInput> & { isActive?: boolean };

export interface ILabourItemFilters {
  categoryId?: string;
  status?: ILabourItemStatus;
  skillLevel?: ISkillLevel;
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export const ALLOWED_CREATE_FIELDS: (keyof ICreateLabourItemInput)[] = [
  "categoryId", "role", "skillLevel", "rate", "halfDayRate", "otPerHour", "status", "notes",
];

export const ALLOWED_UPDATE_FIELDS: (keyof IUpdateLabourItemInput)[] = [
  "categoryId", "role", "skillLevel", "rate", "halfDayRate", "otPerHour", "status", "notes", "isActive",
];


const assertCategoryIsValid = async (organizationId: string, categoryId: string): Promise<void> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid categoryId");
  }

  const category = await LabourCategoryModel.findOne({
    _id: categoryId,
    organizationId,
    isActive: true,
  }).lean();

  if (!category) {
    throw new ApiError(400, "Category not found or inactive");
  }
};

/* ------------------------------------------------------------------ */
/*  Create                                                             */
/* ------------------------------------------------------------------ */

export const createItem = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateLabourItemInput
): Promise<{ item: ILabourItem }> => {
  const safePayload = pickFields<ICreateLabourItemInput>(payload, ALLOWED_CREATE_FIELDS);

  if (
    !safePayload.categoryId ||
    !safePayload.role ||
    !safePayload.skillLevel ||
    safePayload.rate === undefined ||
    safePayload.halfDayRate === undefined ||
    safePayload.otPerHour === undefined
  ) {
    throw new ApiError(
      400,
      "categoryId, role, skillLevel, rate, halfDayRate and otPerHour are required"
    );
  }

  if (safePayload.rate < 0 || safePayload.halfDayRate < 0 || safePayload.otPerHour < 0) {
    throw new ApiError(400, "Rates cannot be negative");
  }

  await assertCategoryIsValid(organizationId, safePayload.categoryId);

  const item = await LabourItemModel.create({
    ...safePayload,
    role: safePayload.role.trim(),
    organizationId,
    createdBy,
    previousRate: safePayload.rate,
    rateChangePercentage: 0,
    rateChangeDirection: "no_change",
    lastRateUpdatedAt: new Date(),
  });

  return { item };
};

/* ------------------------------------------------------------------ */
/*  Read                                                               */
/* ------------------------------------------------------------------ */

export const getAllItems = async (
  organizationId: string,
  filters: ILabourItemFilters
): Promise<{ items: ILabourItem[]; total: number; page: number; limit: number; totalPages: number }> => {
  const { categoryId, status, skillLevel, search, isActive, page = 1, limit = 20 } = filters;

  const query: Record<string, any> = { organizationId };

  if (categoryId) {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new ApiError(400, "Invalid categoryId");
    }
    query.categoryId = categoryId;
  }

  if (status) query.status = status;
  if (skillLevel) query.skillLevel = skillLevel;
  if (isActive !== undefined) query.isActive = isActive;
  else query.isActive = true; // default view: active items only, unless explicitly asked otherwise

  if (search) query.role = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    LabourItemModel.find(query)
      .populate("categoryId", "categoryName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    LabourItemModel.countDocuments(query),
  ]);

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getSingleItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: ILabourItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await LabourItemModel.findOne({ _id: itemId, organizationId }).populate(
    "categoryId",
    "categoryName"
  );

  if (!item) {
    throw new ApiError(404, "Labour item not found");
  }

  return { item };
};

export interface ILabourItemDropdown {
  _id: Types.ObjectId;
  role: string;
  skillLevel: string;
  rate: number;
  halfDayRate: number;
  otPerHour: number;
  refNo?: string;
}

export const getLabourItemsDropdown = async (
  organizationId: string,
  categoryId: string
): Promise<ILabourItemDropdown[]> => {
  const items = await LabourItemModel.find({ 
    organizationId, 
    categoryId, 
    isActive: true 
  })
    .select("role skillLevel rate halfDayRate otPerHour refNo _id")
    .sort({ role: 1 })
    .lean();

  return items as ILabourItemDropdown[];
};

export const getInactiveItems = async (
  organizationId: string
): Promise<{ items: ILabourItem[] }> => {
  const items = await LabourItemModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return { items };
};

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

export const updateItem = async (
  itemId: string,
  organizationId: string,
  updatedBy: string,
  payload: IUpdateLabourItemInput
): Promise<{ item: ILabourItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const safePayload = pickFields<IUpdateLabourItemInput>(payload, ALLOWED_UPDATE_FIELDS);

  if (Object.keys(safePayload).length === 0) {
    throw new ApiError(400, "No valid fields provided to update");
  }

  if (safePayload.categoryId) {
    await assertCategoryIsValid(organizationId, safePayload.categoryId);
  }

  if (
    (safePayload.rate !== undefined && safePayload.rate < 0) ||
    (safePayload.halfDayRate !== undefined && safePayload.halfDayRate < 0) ||
    (safePayload.otPerHour !== undefined && safePayload.otPerHour < 0)
  ) {
    throw new ApiError(400, "Rates cannot be negative");
  }

  const existingItem = await LabourItemModel.findOne({ _id: itemId, organizationId });

  if (!existingItem) {
    throw new ApiError(404, "Labour item not found");
  }

  const updateData: Record<string, any> = { ...safePayload, updatedBy };

  // Rate-change tracking: computeRateChange() is called explicitly here (not
  // via a pre('save') hook) since this path may run through findOneAndUpdate,
  // which bypasses 'save' middleware entirely.
  if (safePayload.rate !== undefined && safePayload.rate !== existingItem.rate) {
    const { rateChangePercentage, rateChangeDirection } = LabourItemModel.computeRateChange(
      existingItem.rate,
      safePayload.rate
    );

    updateData.previousRate = existingItem.rate;
    updateData.rateChangePercentage = rateChangePercentage;
    updateData.rateChangeDirection = rateChangeDirection;
    updateData.lastRateUpdatedAt = new Date();
  }

  const item = await LabourItemModel.findOneAndUpdate(
    { _id: itemId, organizationId },
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("categoryId", "categoryName");

  if (!item) {
    throw new ApiError(404, "Labour item not found");
  }

  return { item };
};

/* ------------------------------------------------------------------ */
/*  Delete (soft) / Delete (hard) / Recover                            */
/* ------------------------------------------------------------------ */

export const deleteItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: ILabourItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await LabourItemModel.findOneAndUpdate(
    { _id: itemId, organizationId, isActive: true },
    { $set: { isActive: false } },
    { new: true }
  );

  if (!item) {
    throw new ApiError(404, "Active labour item not found");
  }

  return { item };
};

export const hardDeleteItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: ILabourItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await LabourItemModel.findOneAndDelete({ _id: itemId, organizationId });

  if (!item) {
    throw new ApiError(404, "Labour item not found");
  }

  return { item };
};

export const recoverItem = async (
  itemId: string,
  organizationId: string
): Promise<{ item: ILabourItem }> => {
  if (!Types.ObjectId.isValid(itemId)) {
    throw new ApiError(400, "Invalid item id");
  }

  const item = await LabourItemModel.findOneAndUpdate(
    { _id: itemId, organizationId, isActive: false },
    { $set: { isActive: true } },
    { new: true }
  );

  if (!item) {
    throw new ApiError(404, "Inactive labour item not found");
  }

  return { item };
};

export interface RecoverItemsFilters {
  itemIds?: string[];
  refNos?: string[];
  fromDate?: string;
  toDate?: string;
}

export const recoverItems = async (
  organizationId: string,
  filters: RecoverItemsFilters
): Promise<{ recoveredCount: number; items: ILabourItem[] }> => {
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
    if (validIds.length > 0) orConditions.push({ _id: { $in: validIds } });
  }

  if (refNos && refNos.length > 0) {
    orConditions.push({ refNo: { $in: refNos } });
  }

  if (orConditions.length > 0) query.$or = orConditions;

  if (fromDate || toDate) {
    query.updatedAt = {};
    if (fromDate) query.updatedAt.$gte = new Date(fromDate);
    if (toDate) query.updatedAt.$lte = new Date(toDate);
  }

  const itemsToRecover = await LabourItemModel.find(query).select("_id");

  if (itemsToRecover.length === 0) {
    throw new ApiError(404, "No matching inactive items found to recover");
  }

  const idsToRecover = itemsToRecover.map((item) => item._id);

  await LabourItemModel.updateMany({ _id: { $in: idsToRecover } }, { $set: { isActive: true } });

  const items = await LabourItemModel.find({ _id: { $in: idsToRecover } });

  return { recoveredCount: items.length, items };
};