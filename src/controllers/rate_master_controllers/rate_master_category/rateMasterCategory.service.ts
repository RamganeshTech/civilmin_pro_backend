import { Types } from "mongoose";
import { RateMasterCategoryModel, type IRateMasterCategory } from "../../../models/rate_master_models/rateMasterCategory.model.js";
import { ApiError } from "../../../utils/apiError.js";
import { pickFields } from "../../../utils/utils.js";

export interface ICreateCategoryInput {
  categoryName: string;
}

export interface IUpdateCategoryInput {
  categoryName?: string;
}

const RATE_MASTER_CATEGORY_SEED: string[] = [
  "Earthwork & Demolition",
  "PCC / RCC / Concrete",
  "Brick & Block Masonry",
  "Plastering",
  "Flooring & Screed",
  "Tiles & Granite",
  "Staircase & Ramp",
  "Waterproofing",
  "Roofing & Terrace",
  "Repair & Misc Civil",
  "Plumbing Civil Works",
  "Compound Wall & External",
  "Electrical Civil Works",
  "Electrical Works",
  "Plumbing Works",
  "Painting",
  "False Ceiling",
  "Gypsum Partition",
  "Fabrication",
  "Roofing",
  "Miscellaneous Interior Civil Works",
];


const ALLOWED_CREATE_FIELDS: (keyof ICreateCategoryInput)[] = ["categoryName"];
const ALLOWED_UPDATE_FIELDS: (keyof IUpdateCategoryInput)[] = ["categoryName"];

const assertCategoryNameIsUnique = async (
  organizationId: string,
  categoryName: string,
  excludeId?: string
): Promise<void> => {
  const query: Record<string, unknown> = { organizationId, categoryName };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await RateMasterCategoryModel.findOne(query).lean();
  if (existing) {
    throw new ApiError(409, "A category with this name already exists");
  }
};



const getEditableCategory = async (
  organizationId: string,
  categoryId: string
): Promise<IRateMasterCategory> => {
  const category = await RateMasterCategoryModel.findOne({
    _id: categoryId,
    organizationId,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};



export const initializeRateMasterCategories = async (
  organizationId: string,
  createdBy: string
): Promise<{ categoriesCreated: number; alreadyInitialized: boolean }> => {
  const existingCount = await RateMasterCategoryModel.countDocuments({ organizationId });
  if (existingCount > 0) {
    return { categoriesCreated: 0, alreadyInitialized: true };
  }

  // Created one at a time via .create() (not insertMany) so the refNo
  // pre-save hook fires per document and numbers sequentially: RC-001..RC-021.
  let categoriesCreated = 0;
  for (const categoryName of RATE_MASTER_CATEGORY_SEED) {
    await RateMasterCategoryModel.create({
      organizationId,
      categoryName,
      createdBy,
    });
    categoriesCreated += 1;
  }

  return { categoriesCreated, alreadyInitialized: false };
};

export const createCategory = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateCategoryInput
): Promise<IRateMasterCategory> => {
  const safePayload = pickFields<ICreateCategoryInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.categoryName) {
    throw new ApiError(400, "categoryName is required");
  }

  await assertCategoryNameIsUnique(organizationId, safePayload.categoryName);

  const category = await RateMasterCategoryModel.create({
    ...safePayload,
    organizationId,
    createdBy,
  });

  return category ;
};

export const getAllCategories = async (
  organizationId: string
): Promise< IRateMasterCategory[] > => {
  const categories = await RateMasterCategoryModel.find({
    organizationId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return categories ;
};

export const getCategoryById = async (
  organizationId: string,
  categoryId: string
): Promise< IRateMasterCategory> => {
  const category = await getEditableCategory(organizationId, categoryId);
  return category ;
};

export const updateCategory = async (
  organizationId: string,
  categoryId: string,
  updatedBy: string,
  payload: IUpdateCategoryInput
): Promise<{ category: IRateMasterCategory }> => {
  const category = await getEditableCategory(organizationId, categoryId);
  const safePayload = pickFields<IUpdateCategoryInput>(payload, ALLOWED_UPDATE_FIELDS);

  if (safePayload.categoryName && safePayload.categoryName !== category.categoryName) {
    await assertCategoryNameIsUnique(organizationId, safePayload.categoryName, categoryId);
    category.categoryName = safePayload.categoryName;
  }

  category.updatedBy = new Types.ObjectId(updatedBy);
  await category.save();

  return { category };
};

// Soft delete — flips isActive to false, record stays in the collection.
export const softDeleteCategory = async (
  organizationId: string,
  categoryId: string,
  updatedBy: string
): Promise<{ category: IRateMasterCategory }> => {
  const category = await getEditableCategory(organizationId, categoryId);

  category.isActive = false;
  category.updatedBy = new Types.ObjectId(updatedBy);
  await category.save();

  return { category };
};

// Recovery — flips isActive back to true.
export const recoverCategory = async (
  organizationId: string,
  categoryId: string,
  updatedBy: string
): Promise<{ category: IRateMasterCategory }> => {
  const category = await getEditableCategory(organizationId, categoryId);

  category.isActive = true;
  category.updatedBy = new Types.ObjectId(updatedBy);
  await category.save();

  return { category };
};

// Hard delete — permanently removes the document.
export const hardDeleteCategory = async (
  organizationId: string,
  categoryId: string
): Promise<void> => {
  const category = await RateMasterCategoryModel.findOneAndDelete({
    _id: categoryId,
    organizationId,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
};

// Recycle-bin view — only soft-deleted (isActive: false) categories, for the recovery screen.
export const getInactiveCategories = async (
  organizationId: string
): Promise< IRateMasterCategory[]> => {
  const categories = await RateMasterCategoryModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return categories ;
};

// Minimal dropdown view — active categories, _id + categoryName only.
export const getCategoryDropdown = async (
  organizationId: string
): Promise<Pick<IRateMasterCategory, "_id" | "categoryName">[]> => {
  const categories = await RateMasterCategoryModel.find(
    { organizationId, isActive: true },
    { _id: 1, categoryName: 1 }
  ).sort({ categoryName: 1 });

  return categories ;
};