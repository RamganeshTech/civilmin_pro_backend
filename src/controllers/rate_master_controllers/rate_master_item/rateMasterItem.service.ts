import { Types } from "mongoose";
import { RATE_MASTER_CONFIDENCE, RATE_MASTER_STATUS, RATE_MASTER_UNITS, RateMasterItemModel, type IRateMasterConfidence, type IRateMasterItem, type IRateMasterStatus, type IRateMasterUnit } from "../../../models/rate_master_models/rateMaster.model.js";
import { ApiError } from "../../../utils/apiError.js";
import { pickFields } from "../../../utils/utils.js";
// import {
//   RateMasterItemModel,
//   IRateMasterItem,
//   RATE_MASTER_UNITS,
//   RATE_MASTER_CONFIDENCE,
//   RATE_MASTER_STATUS,
// } from "../../models/rateMaster/rateMasterItem.model.js"; // TODO confirm path
// import { ApiError } from "../../utils/apiError.js";
// import { pickFields } from "../../utils/pickFields.js"; // TODO confirm path

export interface ICreateItemInput {
    categoryId: string;
    sourceCategory?: string;
    service: string;
    unit: string;
    vl: number;
    low?: number;
    high?: number;
    spec?: string;
    crew?: string;
    productivity?: string;
    notes?: string;
    status?: string;
    basis?: string;
    sourceUrl?: string;
    confidence?: string;
}

export interface IUpdateItemInput {
    categoryId?: string;
    sourceCategory?: string;
    service?: string;
    unit?: string;
    vl?: number;
    low?: number;
    high?: number;
    spec?: string;
    crew?: string;
    productivity?: string;
    notes?: string;
    status?: string;
    basis?: string;
    sourceUrl?: string;
    confidence?: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateItemInput)[] = [
    "categoryId",
    "sourceCategory",
    "service",
    "unit",
    "vl",
    "low",
    "high",
    "spec",
    "crew",
    "productivity",
    "notes",
    "status",
    "basis",
    "sourceUrl",
    "confidence",
];

const ALLOWED_UPDATE_FIELDS: (keyof IUpdateItemInput)[] = ALLOWED_CREATE_FIELDS;

const assertServiceIsUnique = async (
    organizationId: string,
    categoryId: string,
    service: string,
    excludeId?: string
): Promise<void> => {
    const query: Record<string, unknown> = { organizationId, categoryId, service };
    if (excludeId) {
        query._id = { $ne: excludeId };
    }

    const existing = await RateMasterItemModel.findOne(query).lean();
    if (existing) {
        throw new ApiError(409, "A service with this name already exists in this category");
    }
};

const getEditableItem = async (
    organizationId: string,
    itemId: string
): Promise<IRateMasterItem> => {
    const item = await RateMasterItemModel.findOne({
        _id: itemId,
        organizationId,
    });

    if (!item) {
        throw new ApiError(404, "Rate master item not found");
    }
    return item;
};

export const createItem = async (
    organizationId: string,
    createdBy: string,
    payload: ICreateItemInput
): Promise<{ item: IRateMasterItem }> => {
    const safePayload = pickFields<ICreateItemInput>(payload, ALLOWED_CREATE_FIELDS);

    if (!safePayload.categoryId) {
        throw new ApiError(400, "categoryId is required");
    }
    if (!safePayload.service) {
        throw new ApiError(400, "service is required");
    }
    //   if (!safePayload.unit || !RATE_MASTER_UNITS.includes(safePayload.unit as never)) {
    //     throw new ApiError(400, "A valid unit is required");
    //   }

    const isValidUnit = (val: unknown): val is IRateMasterUnit => {
        return RATE_MASTER_UNITS.includes(val as IRateMasterUnit);
    };

    if (!safePayload.unit || !isValidUnit(safePayload.unit)) {
        throw new ApiError(400, "A valid unit is required");
    }


    if (safePayload.vl === undefined || safePayload.vl === null) {
        throw new ApiError(400, "vl (selling rate) is required");
    }
    if (safePayload.status && !RATE_MASTER_STATUS.includes(safePayload.status as never)) {
        throw new ApiError(400, "Invalid status value");
    }
    if (safePayload.confidence && !RATE_MASTER_CONFIDENCE.includes(safePayload.confidence as never)) {
        throw new ApiError(400, "Invalid confidence value");
    }

    await assertServiceIsUnique(organizationId, safePayload.categoryId, safePayload.service);

    // const item = await RateMasterItemModel.create({
    //     ...safePayload,
    //     organizationId,
    //     createdBy,
    // });

    const item = await RateMasterItemModel.create({
    ...safePayload,
    unit: safePayload.unit as IRateMasterUnit,
    status: safePayload.status as IRateMasterStatus | undefined,
    confidence: safePayload.confidence as IRateMasterConfidence | undefined,
    organizationId,
    createdBy,
  });

    return { item };
};

export const getAllItems = async (
    organizationId: string,
    filters?: { categoryId?: string; confidence?: string }
): Promise<IRateMasterItem[]> => {
    const query: Record<string, unknown> = { organizationId, isActive: true };

    if (filters?.categoryId) {
        query.categoryId = filters.categoryId;
    }
    if (filters?.confidence) {
        query.confidence = filters.confidence;
    }

    const items = await RateMasterItemModel.find(query)
        .populate("categoryId", "categoryName")
        .sort({ createdAt: -1 });

    return items;
};

export const getItemById = async (
    organizationId: string,
    itemId: string
): Promise<IRateMasterItem> => {
    const item = await RateMasterItemModel.findOne({
        _id: itemId,
        organizationId,
    }).populate("categoryId", "categoryName");

    if (!item) {
        throw new ApiError(404, "Rate master item not found");
    }
    return item;
};

export const updateItem = async (
    organizationId: string,
    itemId: string,
    updatedBy: string,
    payload: IUpdateItemInput
): Promise<{ item: IRateMasterItem }> => {
    const item = await getEditableItem(organizationId, itemId);
    const safePayload = pickFields<IUpdateItemInput>(payload, ALLOWED_UPDATE_FIELDS);

    if (safePayload.unit && !RATE_MASTER_UNITS.includes(safePayload.unit as never)) {
        throw new ApiError(400, "Invalid unit value");
    }
    if (safePayload.status && !RATE_MASTER_STATUS.includes(safePayload.status as never)) {
        throw new ApiError(400, "Invalid status value");
    }
    if (safePayload.confidence && !RATE_MASTER_CONFIDENCE.includes(safePayload.confidence as never)) {
        throw new ApiError(400, "Invalid confidence value");
    }

    const nextCategoryId = safePayload.categoryId ?? String(item.categoryId);
    const nextService = safePayload.service ?? item.service;
    if (safePayload.categoryId || safePayload.service) {
        await assertServiceIsUnique(organizationId, nextCategoryId, nextService, itemId);
    }

    Object.assign(item, safePayload);
    item.updatedBy = new Types.ObjectId(updatedBy);
    await item.save();

    return { item };
};

// Soft delete — flips isActive to false, record stays in the collection.
export const softDeleteItem = async (
    organizationId: string,
    itemId: string,
    updatedBy: string
): Promise<{ item: IRateMasterItem }> => {
    const item = await getEditableItem(organizationId, itemId);

    item.isActive = false;
    item.updatedBy = new Types.ObjectId(updatedBy);
    await item.save();

    return { item };
};

// Recovery — flips isActive back to true.
export const recoverItem = async (
    organizationId: string,
    itemId: string,
    updatedBy: string
): Promise<{ item: IRateMasterItem }> => {
    const item = await getEditableItem(organizationId, itemId);

    item.isActive = true;
    item.updatedBy = new Types.ObjectId(updatedBy);
    await item.save();

    return { item };
};

// Hard delete — permanently removes the document.
export const hardDeleteItem = async (
    organizationId: string,
    itemId: string
): Promise<void> => {
    const item = await RateMasterItemModel.findOneAndDelete({
        _id: itemId,
        organizationId,
    });

    if (!item) {
        throw new ApiError(404, "Rate master item not found");
    }
};

// Recycle-bin view — only soft-deleted (isActive: false) items.
export const getInactiveItems = async (
    organizationId: string
): Promise< IRateMasterItem[]> => {
    const items = await RateMasterItemModel.find({
        organizationId,
        isActive: false,
    })
        .populate("categoryId", "categoryName")
        .sort({ updatedAt: -1 });

    return items;
};