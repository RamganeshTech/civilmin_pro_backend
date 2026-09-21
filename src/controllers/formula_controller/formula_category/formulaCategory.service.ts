import { Types } from "mongoose";
import { FormulaCategoryModel, type IFormulaCategory } from "../../../models/formula_model/formulaCategory.model.js";
import { ApiError } from "../../../utils/apiError.js";
import { pickFields } from "../../../utils/utils.js";
import { FORMULA_CATEGORY_SEED, FORMULA_ITEM_SEED } from "./Formulalibraryseed.data.js";
import { FormulaItemModel } from "../../../models/formula_model/formulaItem.model.js";
// import {
//   FormulaCategoryModel,
//   IFormulaCategory,
// } from "../../models/formulaEngine/formulaCategory.model.js"; // TODO confirm path
// import { ApiError } from "../../utils/apiError.js";
// import { pickFields } from "../../utils/pickFields.js"; // TODO confirm path

export interface ICreateCategoryInput {
  categoryKey?: string;
  categoryName: string;
  engineModules?: string;
}

export interface IUpdateCategoryInput {
  categoryKey?: string;
  categoryName?: string;
  engineModules?: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateCategoryInput)[] = [
  "categoryKey",
  "categoryName",
  "engineModules",
];
const ALLOWED_UPDATE_FIELDS: (keyof IUpdateCategoryInput)[] = ALLOWED_CREATE_FIELDS;

const assertCategoryNameIsUnique = async (
  organizationId: string,
  categoryName: string,
  excludeId?: string
): Promise<void> => {
  const query: Record<string, unknown> = { organizationId, categoryName };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await FormulaCategoryModel.findOne(query).lean();
  if (existing) {
    throw new ApiError(409, "A category with this name already exists");
  }
};

// categoryKey is optional (an org's own custom category may have none), so
// only enforced unique when actually provided.
const assertCategoryKeyIsUnique = async (
  organizationId: string,
  categoryKey: string,
  excludeId?: string
): Promise<void> => {
  const query: Record<string, unknown> = { organizationId, categoryKey };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await FormulaCategoryModel.findOne(query).lean();
  if (existing) {
    throw new ApiError(409, "A category with this key already exists");
  }
};

const getEditableCategory = async (
  organizationId: string,
  categoryId: string
): Promise<IFormulaCategory> => {
  const category = await FormulaCategoryModel.findOne({
    _id: categoryId,
    organizationId,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return category;
};



// INITILIZE THE FORMULA'S


export const initializeFormulaLibrary = async (
  organizationId: string,
  createdBy: string
): Promise<{ categoriesCreated: number; itemsCreated: number; alreadyInitialized: boolean }> => {
  const existingCount = await FormulaCategoryModel.countDocuments({ organizationId });
  if (existingCount > 0) {
    return { categoriesCreated: 0, itemsCreated: 0, alreadyInitialized: true };
  }

  // Step 1 — create all 21 categories, keep a categoryKey -> _id map for step 2.
  const categoryKeyToId = new Map<string, Types.ObjectId>();

  for (const cat of FORMULA_CATEGORY_SEED) {
    const category = await FormulaCategoryModel.create({
      organizationId,
      categoryKey: cat.categoryKey,
      categoryName: cat.categoryName,
      engineModules: cat.engineModules,
      createdBy,
    });
    categoryKeyToId.set(cat.categoryKey, category._id as Types.ObjectId);
  }

  // Step 2 — create all 105 formula items, resolving each to its category's _id.
  // formulaCode is passed through as-is (matches the seed's own CONV-01 style)
  // rather than re-generated, since these come from a known, ordered source.
  const itemDocs = FORMULA_ITEM_SEED.map((item) => {
    const categoryId = categoryKeyToId.get(item.categoryKey);
    if (!categoryId) {
      throw new ApiError(
        500,
        `Seed data error: no category found for key "${item.categoryKey}"`
      );
    }

    return {
      organizationId,
      categoryId,
      formulaCode: item.formulaCode,
      name: item.name,
      type: item.type,
      confidence: item.confidence,
      reference: item.reference,
      unit: item.unit,
      example: item.example,
      workedExample: item.workedExample,
      note: item.note,
      tags: item.tags,
      variables: item.variables,
      calcInputs: item.calcInputs,
      createdBy,
    };
  });

  const createdItems = await FormulaItemModel.insertMany(itemDocs);

  return {
    categoriesCreated: categoryKeyToId.size,
    itemsCreated: createdItems.length,
    alreadyInitialized: false,
  };
};


export const createCategory = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateCategoryInput
): Promise<{ category: IFormulaCategory }> => {
  const safePayload = pickFields<ICreateCategoryInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.categoryName) {
    throw new ApiError(400, "categoryName is required");
  }

  await assertCategoryNameIsUnique(organizationId, safePayload.categoryName);
  if (safePayload.categoryKey) {
    await assertCategoryKeyIsUnique(organizationId, safePayload.categoryKey);
  }

  const category = await FormulaCategoryModel.create({
    ...safePayload,
    organizationId,
    createdBy,
  });

  return { category };
};

export const getAllCategories = async (
  organizationId: string
): Promise<IFormulaCategory[]> => {
  const categories = await FormulaCategoryModel.find({
    organizationId,
    isActive: true,
  }).sort({ createdAt: -1 });

  return categories ;
};

export const getCategoryById = async (
  organizationId: string,
  categoryId: string
): Promise<IFormulaCategory> => {
  const category = await getEditableCategory(organizationId, categoryId);
  return category;
};

export const updateCategory = async (
  organizationId: string,
  categoryId: string,
  updatedBy: string,
  payload: IUpdateCategoryInput
): Promise<{ category: IFormulaCategory }> => {
  const category = await getEditableCategory(organizationId, categoryId);
  const safePayload = pickFields<IUpdateCategoryInput>(payload, ALLOWED_UPDATE_FIELDS);

  if (safePayload.categoryName && safePayload.categoryName !== category.categoryName) {
    await assertCategoryNameIsUnique(organizationId, safePayload.categoryName, categoryId);
    category.categoryName = safePayload.categoryName;
  }
  if (safePayload.categoryKey && safePayload.categoryKey !== category.categoryKey) {
    await assertCategoryKeyIsUnique(organizationId, safePayload.categoryKey, categoryId);
    category.categoryKey = safePayload.categoryKey;
  }
  if (safePayload.engineModules !== undefined) {
    category.engineModules = safePayload.engineModules;
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
): Promise<{ category: IFormulaCategory }> => {
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
): Promise<{ category: IFormulaCategory }> => {
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
  const category = await FormulaCategoryModel.findOneAndDelete({
    _id: categoryId,
    organizationId,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }
};

// Recycle-bin view — only soft-deleted (isActive: false) categories.
export const getInactiveCategories = async (
  organizationId: string
): Promise<IFormulaCategory[]> => {
  const categories = await FormulaCategoryModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return categories ;
};

// Minimal dropdown view — active categories, _id + categoryName only.
export const getCategoryDropdown = async (
  organizationId: string
): Promise<Pick<IFormulaCategory, "_id" | "categoryName">[]> => {
  const categories = await FormulaCategoryModel.find(
    { organizationId, isActive: true },
    { _id: 1, categoryName: 1 }
  ).sort({ categoryName: 1 });

  return categories ;
};


