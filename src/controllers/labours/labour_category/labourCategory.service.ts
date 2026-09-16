import { Types } from "mongoose";
import LabourCategoryModel, { type ILabourCategory } from "../../../models/labours/labourCategory.model.js";
import { ApiError } from "../../../utils/apiError.js";
import LabourItemModel from "../../../models/labours/labourItem.model.js";
import { pickFields } from "../../../utils/utils.js";

export interface ICreateCategoryInput {
  categoryName: string;
  description?: string;
}

export type IUpdateCategoryInput = Partial<ICreateCategoryInput>;

const ALLOWED_CREATE_FIELDS: (keyof ICreateCategoryInput)[] = ["categoryName", "description"];
const ALLOWED_UPDATE_FIELDS: (keyof IUpdateCategoryInput)[] = ["categoryName", "description"];

export { ALLOWED_CREATE_FIELDS, ALLOWED_UPDATE_FIELDS };



const assertCategoryNameIsUnique = async (
  organizationId: string,
  categoryName: string,
  excludeCategoryId?: string
): Promise<void> => {
  const existing = await LabourCategoryModel.findOne({
    organizationId,
    isActive: true,
    categoryName: { $regex: `^${categoryName}$`, $options: "i" },
    ...(excludeCategoryId ? { _id: { $ne: excludeCategoryId } } : {}),
  }).lean();

  if (existing) {
    throw new ApiError(409, "A category with this name already exists");
  }
};

/* ------------------------------------------------------------------ */
/*  Create                                                             */
/* ------------------------------------------------------------------ */

export const createCategory = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateCategoryInput
): Promise<{ category: ILabourCategory }> => {
  const safePayload = pickFields<ICreateCategoryInput>(payload, ALLOWED_CREATE_FIELDS);

  if (!safePayload.categoryName || !safePayload.categoryName.trim()) {
    throw new ApiError(400, "categoryName is required");
  }

  await assertCategoryNameIsUnique(organizationId, safePayload.categoryName.trim());

  const category = await LabourCategoryModel.create({
    ...safePayload,
    categoryName: safePayload.categoryName.trim(),
    organizationId,
    createdBy,
  });

  return { category };
};

/* ------------------------------------------------------------------ */
/*  Read                                                               */
/* ------------------------------------------------------------------ */

export const getAllCategories = async (
  organizationId: string
): Promise<{ categories: ILabourCategory[] }> => {
  const categories = await LabourCategoryModel.find({
    organizationId,
    isActive: true,
  }).sort({ categoryName: 1 });

  return { categories };
};

export const getCategoriesForDropdown = async (
  organizationId: string
): Promise<{ categories: { _id: Types.ObjectId; categoryName: string }[] }> => {
  const categories = await LabourCategoryModel.find({
    organizationId,
    isActive: true,
  })
    .select("_id categoryName")
    .sort({ categoryName: 1 })
    .lean();

  return { categories };
};

export const getCategoryById = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: ILabourCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  const category = await LabourCategoryModel.findOne({
    _id: categoryId,
    organizationId,
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return { category };
};

export const getInactiveCategories = async (
  organizationId: string
): Promise<{ categories: ILabourCategory[] }> => {
  const categories = await LabourCategoryModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return { categories };
};

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

export const updateCategory = async (
  categoryId: string,
  organizationId: string,
  payload: IUpdateCategoryInput
): Promise<{ category: ILabourCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  const safePayload = pickFields<IUpdateCategoryInput>(payload, ALLOWED_UPDATE_FIELDS);

  if (Object.keys(safePayload).length === 0) {
    throw new ApiError(400, "No valid fields provided to update");
  }

  if (safePayload.categoryName !== undefined) {
    if (!safePayload.categoryName.trim()) {
      throw new ApiError(400, "categoryName cannot be empty");
    }
    safePayload.categoryName = safePayload.categoryName.trim();
    await assertCategoryNameIsUnique(organizationId, safePayload.categoryName, categoryId);
  }

  const category = await LabourCategoryModel.findOneAndUpdate(
    { _id: categoryId, organizationId },
    { $set: safePayload },
    { new: true, runValidators: true }
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return { category };
};

/* ------------------------------------------------------------------ */
/*  Delete (soft) / Delete (hard) / Recover                            */
/* ------------------------------------------------------------------ */

export const deleteCategory = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: ILabourCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

//   // Guard against orphaning labour items that still point at this category
//   const activeItemCount = await LabourItemModel.countDocuments({
//     categoryId,
//     organizationId,
//     isActive: true,
//   });

//   if (activeItemCount > 0) {
//     throw new ApiError(
//       400,
//       `Cannot delete this category - ${activeItemCount} active labour item(s) are still assigned to it. Reassign or deactivate those items first.`
//     );
//   }

  const category = await LabourCategoryModel.findOneAndUpdate(
    { _id: categoryId, organizationId, isActive: true },
    { $set: { isActive: false } },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "Active category not found");
  }

  return { category };
};

export const hardDeleteCategory = async (
  categoryId: string,
  organizationId: string
): Promise<{ deletedItemsCount: number }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

//   const category = await LabourCategoryModel.findOne({
//     _id: categoryId,
//     organizationId,
//   }).lean();

//   if (!category) {
//     throw new ApiError(404, "Category not found");
//   }


  // Delete all labour items under this category first
  const deleteItemsResult = await LabourItemModel.deleteMany({
    categoryId,
    organizationId,
  });

  // Delete the category and get back what was deleted, in one call
  const deletedCategory = await LabourCategoryModel.findOneAndDelete({
    _id: categoryId,
    organizationId,
  });

  if (!deletedCategory) {
    throw new ApiError(404, "Category not found");
  }

  return { deletedItemsCount: deleteItemsResult.deletedCount || 0 };
};

export const recoverCategory = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: ILabourCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  const category = await LabourCategoryModel.findOneAndUpdate(
    { _id: categoryId, organizationId, isActive: false },
    { $set: { isActive: true } },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "Inactive category not found");
  }

  return { category };
};