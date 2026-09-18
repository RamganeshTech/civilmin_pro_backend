import { Types } from "mongoose";
import MaterialCategoryModel, { type IMaterialCategory } from "../../../models/materials/materialCategory.model.js";
import { ApiError } from "../../../utils/apiError.js";
import MaterialItemModel from "../../../models/materials/materialItem.model.js";
import mongoose from "mongoose";


export interface ICategoryFilters {
  search?: string; // matches categoryName / code
  isActive?: string; // "true" | "false"
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string; // "asc" | "desc"
}
 
export interface ICreateCategoryInput {
  categoryName: string;
  code?: string;
  description?: string;
  icon?: string;
  color?: string;
}
 
export type IUpdateCategoryInput = Partial<ICreateCategoryInput> & { isActive?: boolean };
 
/* ------------------------------------------------------------------ */
/*  Field whitelisting - never trust req.body directly. Only fields    */
/*  listed here can ever reach the DB write, regardless of what the    */
/*  client sends.                                                      */
/* ------------------------------------------------------------------ */
 
const ALLOWED_CREATE_FIELDS = ["categoryName", "code", "description", "icon", "color"] as const;
const ALLOWED_UPDATE_FIELDS = [...ALLOWED_CREATE_FIELDS, "isActive"] as const;

 const pickFields = <T extends object>(
  source: T,
  allowedFields: readonly string[]
): Partial<T> => {
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
/*  Helper: duplicate name check (no DB-level unique index for now)    */
/* ------------------------------------------------------------------ */
 
const assertCategoryNameIsUnique = async (
  organizationId: string,
  categoryName: string,
  excludeCategoryId?: string
): Promise<void> => {
  const existing = await MaterialCategoryModel.findOne({
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
/*  Get All (with filters + pagination)                               */
/* ------------------------------------------------------------------ */

export const getAllCategories = async (
  organizationId: string,
  filters: ICategoryFilters
): Promise<{
  categories: IMaterialCategory[];
  // total: number;
  // page: number;
  // limit: number;
  // totalPages: number;
}> => {
  const {
    search,
    isActive,
    // page = "1",
    // limit = "10",
    sortBy = "categoryName",
    sortOrder = "asc",
  } = filters;

  const query: Record<string, unknown> = { organizationId };

  query.isActive = isActive === undefined ? true : isActive === "true";

  if (search) {
    query.$or = [
      { categoryName: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
    ];
  }

  // const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  // const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  // const skip = (pageNum - 1) * limitNum;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

   const categories = await MaterialCategoryModel.find({ organizationId, isActive: true })
    // .select("categoryName code icon color _id")
    .sort({ categoryName: 1 })
    .lean();


  // const [categories, total] = await Promise.all([
  //   MaterialCategoryModel.find(query)
  //     .sort({ [sortBy]: sortDirection })
  //     .skip(skip)
  //     .limit(limitNum)
  //     .lean(),
  //   MaterialCategoryModel.countDocuments(query),
  // ]);

  

  // return {
  //   categories: categories as unknown as IMaterialCategory[],
  //   total,
  //   page: pageNum,
  //   limit: limitNum,
  //   totalPages: Math.max(Math.ceil(total / limitNum), 1),
  // };

  return {categories: categories as unknown as IMaterialCategory[]}
};



export const getInactiveCategories = async (
  organizationId: string
): Promise<{ categories: IMaterialCategory[] }> => {
  const categories = await MaterialCategoryModel.find({
    organizationId,
    isActive: false,
  }).sort({ updatedAt: -1 });

  return { categories };
};

/* ------------------------------------------------------------------ */
/*  Get By Id                                                          */
/* ------------------------------------------------------------------ */

export const getCategoryById = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: IMaterialCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  const category = await MaterialCategoryModel.findOne({ _id: categoryId, organizationId });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return { category };
};

/* ------------------------------------------------------------------ */
/*  Create                                                             */
/* ------------------------------------------------------------------ */

export const createCategory = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateCategoryInput
): Promise<{ category: IMaterialCategory }> => {
//   const safePayload = pickFields(payload, ALLOWED_CREATE_FIELDS) as ICreateCategoryInput;
const safePayload = pickFields<ICreateCategoryInput>(payload, ALLOWED_CREATE_FIELDS);
 
  if (!safePayload.categoryName) {
    throw new ApiError(400, "categoryName is required");
  }
 
  await assertCategoryNameIsUnique(organizationId, safePayload.categoryName);

  const category = await MaterialCategoryModel.create({
    ...payload,
    organizationId,
    createdBy,
  });

  return { category };
};

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

export const updateCategory = async (
  categoryId: string,
  organizationId: string,
  payload: IUpdateCategoryInput
): Promise<{ category: IMaterialCategory }> => {
 if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }
 
  if (payload.categoryName) {
    await assertCategoryNameIsUnique(organizationId, payload.categoryName, categoryId);
  }
 
  const safePayload = pickFields(payload, ALLOWED_UPDATE_FIELDS);
 
  const category = await MaterialCategoryModel.findOneAndUpdate(
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
/*  Delete (soft delete)                                               */
/* ------------------------------------------------------------------ */

export const deleteCategory = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: IMaterialCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  // // Guard against orphaning material items that still point at this category
  // const activeItemCount = await MaterialItemModel.countDocuments({
  //   categoryId,
  //   organizationId,
  //   isActive: true,
  // });

  // if (activeItemCount > 0) {
  //   throw new ApiError(
  //     400,
  //     `Cannot delete this category - ${activeItemCount} active material item(s) are still assigned to it. Reassign or deactivate those items first.`
  //   );
  // }

  const category = await MaterialCategoryModel.findOneAndUpdate(
    { _id: categoryId, organizationId },
    { $set: { isActive: false } },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "Category not found");
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

  const session = await mongoose.startSession();

  try {
    let deletedItemsCount = 0;

    await session.withTransaction(async () => {
      const deleteItemsResult = await MaterialItemModel.deleteMany(
        { categoryId, organizationId },
        { session }
      );

      deletedItemsCount = deleteItemsResult.deletedCount || 0;

      const deletedCategory = await MaterialCategoryModel.findOneAndDelete(
        { _id: categoryId, organizationId },
        { session }
      );

      if (!deletedCategory) {
        throw new ApiError(404, "Category not found");
      }
    });

    return { deletedItemsCount };
  } finally {
    await session.endSession();
  }
};


/* ------------------------------------------------------------------ */
/*  Dropdown (lightweight list for <select> options)                   */
/* ------------------------------------------------------------------ */

export interface ICategoryDropdownItem {
  _id: Types.ObjectId;
  categoryName: string;
  code?: string;
  icon?: string;
  color?: string;
}

export const getCategoriesDropdown = async (
  organizationId: string
): Promise<ICategoryDropdownItem[]> => {
  const categories = await MaterialCategoryModel.find({ organizationId, isActive: true })
    .select("categoryName code icon color _id")
    .sort({ categoryName: 1 })
    .lean();

  return  categories as unknown as ICategoryDropdownItem[] ;
};



export const recoverCategory = async (
  categoryId: string,
  organizationId: string
): Promise<{ category: IMaterialCategory }> => {
  if (!Types.ObjectId.isValid(categoryId)) {
    throw new ApiError(400, "Invalid category id");
  }

  const category = await MaterialCategoryModel.findOneAndUpdate(
    { _id: categoryId, organizationId, isActive: false },
    { $set: { isActive: true } },
    { new: true }
  );

  if (!category) {
    throw new ApiError(404, "Inactive category not found");
  }

  return { category };
};