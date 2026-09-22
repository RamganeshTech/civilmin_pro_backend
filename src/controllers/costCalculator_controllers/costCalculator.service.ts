import { CostCalculatorModel, type ICostCalculator, type  ICostCalcSection, type ICostCalcLineItem } from "../../models/costCalculator_model/costCalculator.model.js";
import { ApiError } from "../../utils/apiError.js";
import { Types } from "mongoose";

// Shared helper — reused by every step's service (category selection now,
// dimensions/formula-engine/line-items later). Same pattern as BOQ's
// getEditableBOQ: fetch by id+org, 404 if missing, 400 if not draft anymore.
export const getEditableCostCalculator = async (
  organizationId: string,
  costCalculatorId: string
): Promise<ICostCalculator> => {
  const costCalculator = await CostCalculatorModel.findOne({
    _id: costCalculatorId,
    organizationId,
  });

  if (!costCalculator) {
    throw new ApiError(404, "Cost calculator not found");
  }
  if (costCalculator.status !== "draft") {
    throw new ApiError(400, "This cost calculator is approved and can no longer be edited");
  }

  return costCalculator;
};

export const getCostCalculatorById = async (
  organizationId: string,
  costCalculatorId: string
): Promise<{ costCalculator: ICostCalculator }> => {
  const costCalculator = await CostCalculatorModel.findOne({
    _id: costCalculatorId,
    organizationId,
  })
    .populate("sections.formulaItemId", "name formulaCode unit confidence")
    .populate("sections.lineItems.rateMasterItemId", "service unit vl categoryId");

  if (!costCalculator) {
    throw new ApiError(404, "Cost calculator not found");
  }

  return { costCalculator };
};




export interface ISelectedCategoryInput {
  categoryKey: string;
  categoryLabel: string;
  formulaItemId?: string | null;
}

export interface ISaveCategorySelectionInput {
  costCalculatorId?: string; // present = update, absent = create (per user's own rule)
  projectId?: string; // required only when creating
  sections: ISelectedCategoryInput[];
}

const assertValidObjectId = (id: string, fieldName: string): void => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `${fieldName} is not a valid id`);
  }
};

const assertValidSelectedCategories = (sections: ISelectedCategoryInput[]): void => {
  if (!Array.isArray(sections) || sections.length === 0) {
    throw new ApiError(400, "sections is required and must be a non-empty array");
  }

  const seenKeys = new Set<string>();
  for (const s of sections) {
    if (!s || typeof s.categoryKey !== "string" || !s.categoryKey.trim()) {
      throw new ApiError(400, "Each section requires a non-empty categoryKey");
    }
    if (typeof s.categoryLabel !== "string" || !s.categoryLabel.trim()) {
      throw new ApiError(400, "Each section requires a non-empty categoryLabel");
    }
    if (s.formulaItemId) {
      assertValidObjectId(s.formulaItemId, "formulaItemId");
    }
    if (seenKeys.has(s.categoryKey)) {
      throw new ApiError(400, `Duplicate categoryKey in selection: ${s.categoryKey}`);
    }
    seenKeys.add(s.categoryKey);
  }
};

// Same rule as BOQ's section-selection step: sections still selected KEEP
// their existing inputs/lineItems; newly selected categories get an empty
// skeleton; anything no longer selected is dropped.
const mergeSections = (
  existingSections: ICostCalcSection[],
  selected: ISelectedCategoryInput[]
): ICostCalcSection[] => {
  const existingByKey = new Map(existingSections.map((s) => [s.categoryKey, s]));

  return selected.map((sel) => {
    const existing = existingByKey.get(sel.categoryKey);

    if (existing) {
      existing.categoryLabel = sel.categoryLabel;
      existing.formulaItemId = sel.formulaItemId
        ? new Types.ObjectId(sel.formulaItemId)
        : existing.formulaItemId ?? null;
      return existing;
    }

    return {
      _id: new Types.ObjectId(),
      categoryKey: sel.categoryKey,
      categoryLabel: sel.categoryLabel,
      formulaItemId: sel.formulaItemId ? new Types.ObjectId(sel.formulaItemId) : null,
      inputs: {},
      lineItems: [],
      sectionTotal: 0,
    } as ICostCalcSection;
  });
};

export const saveCategorySelection = async (
  organizationId: string,
  userId: string,
  payload: ISaveCategorySelectionInput
): Promise<{ costCalculator: ICostCalculator; created: boolean }> => {
  assertValidSelectedCategories(payload.sections);

  // UPDATE — id was passed
  if (payload.costCalculatorId) {
    assertValidObjectId(payload.costCalculatorId, "costCalculatorId");

    const costCalculator = await getEditableCostCalculator(organizationId, payload.costCalculatorId);

    costCalculator.sections = mergeSections(costCalculator.sections, payload.sections);
    costCalculator.updatedBy = new Types.ObjectId(userId);
    await costCalculator.save();

    return { costCalculator, created: false };
  }

  // CREATE — no id passed
  if (!payload.projectId) {
    throw new ApiError(400, "projectId is required to start a new cost calculator");
  }
  assertValidObjectId(payload.projectId, "projectId");

  const sections = mergeSections([], payload.sections);

  const costCalculator = await CostCalculatorModel.create({
    organizationId,
    projectId: payload.projectId,
    sections,
    createdBy: userId,
  });

  return { costCalculator, created: true };
};



//  STEP 2 FOR SVING THE DATA IN EACH CATEGORY


import { evaluate } from "mathjs"; // new dependency — npm install mathjs
import { FormulaItemModel } from "../../models/formula_model/formulaItem.model.js";
import { RateMasterItemModel } from "../../models/rate_master_models/rateMaster.model.js";

export interface ISaveSectionDetailsInput {
  costCalculatorId: string;
  sectionId: string;
  inputs?: Record<string, number>; // dimension inputs — only meaningful if a formula auto-matches
  rateMasterItemId: string;
  quantity?: number; // required when no formula matches, OR the matched formula has no outputExpression yet
}

export const saveSectionDetails = async (
  organizationId: string,
  userId: string,
  payload: ISaveSectionDetailsInput
): Promise<{ costCalculator: ICostCalculator }> => {
  if (!payload.costCalculatorId) throw new ApiError(400, "costCalculatorId is required");
  if (!payload.sectionId) throw new ApiError(400, "sectionId is required");
  if (!payload.rateMasterItemId) throw new ApiError(400, "rateMasterItemId is required");
  assertValidObjectId(payload.rateMasterItemId, "rateMasterItemId");

  const costCalculator = await getEditableCostCalculator(organizationId, payload.costCalculatorId);

  const section = ((costCalculator.sections as ICostCalcSection[]) as any).id(payload.sectionId);
  if (!section) {
    throw new ApiError(404, "Section not found on this cost calculator");
  }

  const rateMasterItem = await RateMasterItemModel.findOne({
    _id: payload.rateMasterItemId,
    organizationId,
    isActive: true,
  }).lean();
  if (!rateMasterItem) {
    throw new ApiError(400, "rateMasterItemId does not match any active service in this organization");
  }

  // ---- auto-match the formula for this section's category (no user choice) ----
  const formulaItem = await FormulaItemModel.findOne({
    organizationId,
    costCalculatorCategoryKey: section.categoryKey,
    isActive: true,
  }).lean();

  let quantity: number;
  let validatedInputs: Record<string, number> = {};

  if (formulaItem) {
    const inputs = payload.inputs || {};

    for (const calcInput of formulaItem.calcInputs) {
      const provided = inputs[calcInput.key];

      if (provided === undefined || provided === null) {
        if (calcInput.defaultValue !== null && calcInput.defaultValue !== undefined) {
          validatedInputs[calcInput.key] = calcInput.defaultValue;
          continue;
        }
        throw new ApiError(400, `Missing required input: ${calcInput.label} (${calcInput.key})`);
      }
      if (typeof provided !== "number") {
        throw new ApiError(400, `${calcInput.label} (${calcInput.key}) must be a number`);
      }
      validatedInputs[calcInput.key] = provided;
    }

    if (formulaItem.outputExpression) {
      try {
        const result = evaluate(formulaItem.outputExpression, validatedInputs);
        if (typeof result !== "number" || !isFinite(result)) {
          throw new Error("non-numeric result");
        }
        quantity = result;
      } catch {
        throw new ApiError(500, `Formula "${formulaItem.name}" produced an invalid result — check its outputExpression`);
      }
    } else {
      // No outputExpression configured yet for this formula — fall back to manual quantity.
      if (typeof payload.quantity !== "number" || payload.quantity <= 0) {
        throw new ApiError(
          400,
          `"${formulaItem.name}" has no outputExpression configured yet — quantity must be provided manually`
        );
      }
      quantity = payload.quantity;
    }
  } else {
    // No formula for this category (the 5 rate-card-only categories) — quantity is manual.
    if (typeof payload.quantity !== "number" || payload.quantity <= 0) {
      throw new ApiError(400, "quantity is required and must be a positive number");
    }
    quantity = payload.quantity;
  }

  const amount = quantity * rateMasterItem.vl;

  section.formulaItemId = formulaItem ? (formulaItem._id as Types.ObjectId) : null;
  section.inputs = validatedInputs;

  const existingLine = section.lineItems.find(
    (li: ICostCalcLineItem) => String(li.rateMasterItemId) === String(rateMasterItem._id)
  );
  if (existingLine) {
    existingLine.quantity = quantity;
    existingLine.rate = rateMasterItem.vl;
    existingLine.amount = amount;
  } else {
    section.lineItems.push({
      rateMasterItemId: rateMasterItem._id as Types.ObjectId,
      description: rateMasterItem.service,
      unit: rateMasterItem.unit,
      rate: rateMasterItem.vl,
      quantity,
      amount,
      govtCode: null,
    } as ICostCalcLineItem);
  }

  section.sectionTotal = section.lineItems.reduce((sum:number, li:ICostCalcLineItem) => sum + li.amount, 0);
  costCalculator.grandTotal = costCalculator.sections.reduce((sum, s) => sum + s.sectionTotal, 0);
  costCalculator.updatedBy = new Types.ObjectId(userId);
  await costCalculator.save();

  return { costCalculator };
};