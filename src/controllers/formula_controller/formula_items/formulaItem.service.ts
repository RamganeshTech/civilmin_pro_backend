import { Types } from "mongoose";
// import {
//   FormulaItemModel,
//   IFormulaItem,
//   IFormulaVariable,
//   IFormulaCalcInput,
//   IFormulaCalcOutput,
//   FORMULA_CONFIDENCE,
// } from "../../models/formulaEngine/formulaItem.model.js"; // TODO confirm path
// import { FormulaCategoryModel } from "../../models/formulaEngine/formulaCategory.model.js"; // TODO confirm path
// import { ApiError } from "../../utils/apiError.js";
// import { pickFields } from "../../utils/pickFields.js"; // TODO confirm path
import { ApiError } from "../../../utils/apiError.js";
import { pickFields } from "../../../utils/utils.js";
import {
    type IFormulaItem,
    type IFormulaVariable,
type IFormulaCalcInput,
type IFormulaCalcOutput,
FORMULA_CONFIDENCE,
FormulaItemModel,
type IFormulaConfidence,
 } from "../../../models/formula_model/formulaItem.model.js";
import { FormulaCategoryModel } from "../../../models/formula_model/formulaCategory.model.js";

export interface ICreateItemInput {
  categoryId: string;
  name: string;
  type?: string;
  confidence?: IFormulaConfidence;
  reference?: string;
  unit?: string;
  example?: string;
  workedExample?: string;
  note?: string;
  tags?: string[];
  variables?: IFormulaVariable[];
  calcInputs?: IFormulaCalcInput[];
  calcOutputs?: IFormulaCalcOutput[];
  outputExpression?: string;
}

export interface IUpdateItemInput {
  categoryId?: string;
  name?: string;
  type?: string;
  confidence?: string;
  reference?: string;
  unit?: string;
  example?: string;
  workedExample?: string;
  note?: string;
  tags?: string[];
  variables?: IFormulaVariable[];
  calcInputs?: IFormulaCalcInput[];
  calcOutputs?: IFormulaCalcOutput[];
  outputExpression?: string;
}

const ALLOWED_CREATE_FIELDS: (keyof ICreateItemInput)[] = [
  "categoryId",
  "name",
  "type",
  "confidence",
  "reference",
  "unit",
  "example",
  "workedExample",
  "note",
  "tags",
  "variables",
  "calcInputs",
  "calcOutputs",
  "outputExpression",
];

const ALLOWED_UPDATE_FIELDS: (keyof IUpdateItemInput)[] = ALLOWED_CREATE_FIELDS;

// ---------- validation helpers ----------

const assertValidObjectId = (id: string, fieldName: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `${fieldName} is not a valid id`);
  }
};

const assertCategoryExists = async (
  organizationId: string,
  categoryId: string
): Promise<void> => {
  assertValidObjectId(categoryId, "categoryId");

  const category = await FormulaCategoryModel.findOne({
    _id: categoryId,
    organizationId,
  }).lean();

  if (!category) {
    throw new ApiError(400, "categoryId does not match any category in this organization");
  }
  if (category.isActive === false) {
    throw new ApiError(400, "Cannot attach a formula to a deactivated category");
  }
};

const assertValidConfidence = (confidence?: string): void => {
  if (confidence && !FORMULA_CONFIDENCE.includes(confidence as never)) {
    throw new ApiError(400, `confidence must be one of: ${FORMULA_CONFIDENCE.join(", ")}`);
  }
};

const assertValidTags = (tags?: string[]): void => {
  if (tags === undefined) return;
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string" || !t.trim())) {
    throw new ApiError(400, "tags must be an array of non-empty strings");
  }
};

const assertValidVariables = (variables?: IFormulaVariable[]): void => {
  if (variables === undefined) return;
  if (!Array.isArray(variables)) {
    throw new ApiError(400, "variables must be an array");
  }
  for (const v of variables) {
    if (!v || typeof v.key !== "string" || !v.key.trim()) {
      throw new ApiError(400, "Each variable requires a non-empty key");
    }
    if (typeof v.label !== "string" || !v.label.trim()) {
      throw new ApiError(400, "Each variable requires a non-empty label");
    }
  }
};

const assertValidCalcInputs = (calcInputs?: IFormulaCalcInput[]): void => {
  if (calcInputs === undefined) return;
  if (!Array.isArray(calcInputs)) {
    throw new ApiError(400, "calcInputs must be an array");
  }
  for (const c of calcInputs) {
    if (!c || typeof c.key !== "string" || !c.key.trim()) {
      throw new ApiError(400, "Each calcInput requires a non-empty key");
    }
    if (typeof c.label !== "string" || !c.label.trim()) {
      throw new ApiError(400, "Each calcInput requires a non-empty label");
    }
    if (c.defaultValue !== undefined && c.defaultValue !== null && typeof c.defaultValue !== "number") {
      throw new ApiError(400, "calcInput.defaultValue must be a number");
    }
  }
};

const assertValidCalcOutputs = (calcOutputs?: IFormulaCalcOutput[]): void => {
  if (calcOutputs === undefined) return;
  if (!Array.isArray(calcOutputs)) {
    throw new ApiError(400, "calcOutputs must be an array");
  }
  for (const c of calcOutputs) {
    if (!c || typeof c.label !== "string" || !c.label.trim()) {
      throw new ApiError(400, "Each calcOutput requires a non-empty label");
    }
  }
};

const assertNameIsUnique = async (
  organizationId: string,
  categoryId: string,
  name: string,
  excludeId?: string
): Promise<void> => {
  const query: Record<string, unknown> = { organizationId, categoryId, name };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const existing = await FormulaItemModel.findOne(query).lean();
  if (existing) {
    throw new ApiError(409, "A formula with this name already exists in this category");
  }
};

const validatePayload = async (
  organizationId: string,
  payload: ICreateItemInput | IUpdateItemInput,
  isCreate: boolean
): Promise<void> => {
  if (isCreate) {
    const createPayload = payload as ICreateItemInput;
    if (!createPayload.categoryId) {
      throw new ApiError(400, "categoryId is required");
    }
    if (!createPayload.name || !createPayload.name.trim()) {
      throw new ApiError(400, "name is required");
    }
  }

  if (payload.categoryId) {
    await assertCategoryExists(organizationId, payload.categoryId);
  }

  assertValidConfidence(payload.confidence);
  assertValidTags(payload.tags);
  assertValidVariables(payload.variables);
  assertValidCalcInputs(payload.calcInputs);
  assertValidCalcOutputs(payload.calcOutputs);
  assertValidConfidence(payload.confidence);
};


const COST_CALCULATOR_FORMULA_CATEGORY_KEYS = [
  "brickwork", "concrete", "plastering", "steel", "foundation", "flooring",
  "waterproof", "paint", "rccSlab", "rccColumn", "rccBeam", "staircase",
  "drainage", "septic", "earthwork", "electrical", "aac", "thumbrule", "compound",
] as const;

const assertValidCostCalculatorCategoryKey = (key?: string | null): void => {
  if (key === undefined || key === null) return; // optional field, null is fine
  if (!COST_CALCULATOR_FORMULA_CATEGORY_KEYS.includes(key as never)) {
    throw new ApiError(
      400,
      `costCalculatorCategoryKey must be one of: ${COST_CALCULATOR_FORMULA_CATEGORY_KEYS.join(", ")}`
    );
  }
};

const getEditableItem = async (
  organizationId: string,
  itemId: string
): Promise<IFormulaItem> => {
  assertValidObjectId(itemId, "itemId");

  const item = await FormulaItemModel.findOne({
    _id: itemId,
    organizationId,
  });

  if (!item) {
    throw new ApiError(404, "Formula item not found");
  }
  return item;
};

// ---------- CRUD ----------

export const createItem = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateItemInput
): Promise<{ item: IFormulaItem }> => {
  const safePayload = pickFields<ICreateItemInput>(payload, ALLOWED_CREATE_FIELDS);

  await validatePayload(organizationId, safePayload, true);

  if (!safePayload.categoryId || !safePayload.name) {
  throw new Error('Missing required fields');
}

  await assertNameIsUnique(organizationId, safePayload.categoryId, safePayload.name);

  const item = await FormulaItemModel.create({
    ...safePayload,
    organizationId,
    createdBy,
  });

  return { item };
};

export const getAllItems = async (
  organizationId: string,
  filters?: { categoryId?: string; confidence?: string }
): Promise<IFormulaItem[]> => {
  const query: Record<string, unknown> = { organizationId, isActive: true };

  if (filters?.categoryId) {
    assertValidObjectId(filters.categoryId, "categoryId");
    query.categoryId = filters.categoryId;
  }
  if (filters?.confidence) {
    assertValidConfidence(filters.confidence);
    query.confidence = filters.confidence;
  }

  const items = await FormulaItemModel.find(query)
    .populate("categoryId", "categoryName categoryKey")
    .sort({ createdAt: -1 });

  return items;
};

export const getItemById = async (
  organizationId: string,
  itemId: string
): Promise< IFormulaItem> => {
  assertValidObjectId(itemId, "itemId");

  const item = await FormulaItemModel.findOne({
    _id: itemId,
    organizationId,
  }).populate("categoryId", "categoryName categoryKey");

  if (!item) {
    throw new ApiError(404, "Formula item not found");
  }
  return item ;
};

export const updateItem = async (
  organizationId: string,
  itemId: string,
  updatedBy: string,
  payload: IUpdateItemInput
): Promise<{ item: IFormulaItem }> => {
  const item = await getEditableItem(organizationId, itemId);
  const safePayload = pickFields<IUpdateItemInput>(payload, ALLOWED_UPDATE_FIELDS);

  await validatePayload(organizationId, safePayload, false);

  const nextCategoryId = safePayload.categoryId ?? String(item.categoryId);
  const nextName = safePayload.name ?? item.name;
  if (safePayload.categoryId || safePayload.name) {
    if (!nextName.trim()) {
      throw new ApiError(400, "name cannot be empty");
    }
    await assertNameIsUnique(organizationId, nextCategoryId, nextName, itemId);
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
): Promise<{ item: IFormulaItem }> => {
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
): Promise<{ item: IFormulaItem }> => {
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
  assertValidObjectId(itemId, "itemId");

  const item = await FormulaItemModel.findOneAndDelete({
    _id: itemId,
    organizationId,
  });

  if (!item) {
    throw new ApiError(404, "Formula item not found");
  }
};

// Recycle-bin view — only soft-deleted (isActive: false) items.
export const getInactiveItems = async (
  organizationId: string
): Promise<IFormulaItem[]> => {
  const items = await FormulaItemModel.find({
    organizationId,
    isActive: false,
  })
    .populate("categoryId", "categoryName categoryKey")
    .sort({ updatedAt: -1 });

  return items;
};