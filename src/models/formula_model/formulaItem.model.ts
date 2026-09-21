import { Schema, model, Types, Document } from "mongoose";
import { FormulaCategoryModel } from "./formulaCategory.model.js";

/**
 * Formula Engine Item — individual formula under a FormulaCategoryModel
 * (e.g. "Area conversion — sqft ↔ sqm" under "Conversions & Site Units").
 * Org-scoped, same reasoning as FormulaCategoryModel: orgs can verify,
 * correct, or extend a formula for their own site conditions.
 *
 * NOTE on `calc`: this intentionally does NOT store executable JS (the demo's
 * `calc.r` is a raw JS function — storing/eval-ing arbitrary code from the DB
 * is a real injection risk). `calcInputs`/`calcOutputs` below are structured
 * data only; the actual computation needs either (a) a safe expression
 * evaluator (e.g. mathjs) reading `outputExpression`, or (b) hardcoded TS
 * per formulaCode the way BOQ formulas already work. Flagging this as an
 * open decision, not solved by this model alone.
 */

export const FORMULA_CONFIDENCE = ["Certain", "Likely", "Verify"] as const;
export type IFormulaConfidence = (typeof FORMULA_CONFIDENCE)[number];

export interface IFormulaVariable {
  key: string;
  label: string;
  unit: string | null;
}

export interface IFormulaCalcInput {
  key: string;
  label: string;
  unit: string | null;
  defaultValue: number | null;
}

export interface IFormulaCalcOutput {
  label: string;
  unit: string | null;
}

export interface IFormulaItem extends Document {
  organizationId: Types.ObjectId;
  categoryId: Types.ObjectId;

  refNo: string; // auto-generated, e.g. FI-001, scoped per organizationId
  formulaCode: string | null; // auto-generated per category, e.g. "CONV-01" (prefix from category's categoryKey)

  name: string;
  type: string | null; // e.g. "Conversion", "Material", "Thumb Rule" — free text, not enum
  confidence: IFormulaConfidence;

  reference: string | null; // e.g. "IS 269:2015", "SI definition"
  unit: string | null;

  example: string | null; // formula text / derivation
  workedExample: string | null; // a real worked numeric example
  note: string | null;
  tags: string[];

  variables: IFormulaVariable[];

  calcInputs: IFormulaCalcInput[];
  calcOutputs: IFormulaCalcOutput[];
  outputExpression: string | null; // safe-evaluator expression string, NOT executable code

  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const FormulaVariableSchema = new Schema<IFormulaVariable>(
  {
    key: { type: String, default: null },
    label: { type: String, default: null },
    unit: { type: String, default: null },
  },
  { _id: true }
);

const FormulaCalcInputSchema = new Schema<IFormulaCalcInput>(
  {
    key: { type: String, default: null },
    label: { type: String, default: null },
    unit: { type: String, default: null },
    defaultValue: { type: Number, default: null },
  },
  { _id: true }
);

const FormulaCalcOutputSchema = new Schema<IFormulaCalcOutput>(
  {
    label: { type: String, default: null },
    unit: { type: String, default: null },
  },
  { _id: true }
);

const FormulaItemSchema = new Schema<IFormulaItem>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
      index: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "FormulaCategoryModel",
      required: true,
      index: true,
    },

    refNo: { type: String, default: null },
    formulaCode: { type: String, default: null },

    name: { type: String, default: null },
    type: { type: String, default: null },
    confidence: { type: String, enum: FORMULA_CONFIDENCE, default: "Verify" },

    reference: { type: String, default: null },
    unit: { type: String, default: null },

    example: { type: String, default: null },
    workedExample: { type: String, default: null },
    note: { type: String, default: null },
    tags: { type: [String], default: [] },

    variables: { type: [FormulaVariableSchema], default: [] },

    calcInputs: { type: [FormulaCalcInputSchema], default: [] },
    calcOutputs: { type: [FormulaCalcOutputSchema], default: [] },
    outputExpression: { type: String, default: null },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
  },
  { timestamps: true }
);

// refNo — same "query last + increment" pattern used everywhere else in the module.
FormulaItemSchema.pre("save", async function (this: IFormulaItem) {
  if (this.isNew && !this.refNo) {
    const prefix = "FI-";
    const last = await FormulaItemModel.findOne({
      organizationId: this.organizationId,
      refNo: { $regex: `^${prefix}` },
    })
      .sort({ createdAt: -1 })
      .select("refNo")
      .lean();

    let nextNum = 1;
    if (last?.refNo) {
      const n = parseInt(last.refNo.replace(prefix, ""), 10);
      if (!isNaN(n)) nextNum = n + 1;
    }
    this.refNo = `${prefix}${String(nextNum).padStart(3, "0")}`;
  }
});

// formulaCode — mirrors the demo's own scheme (CONV-01, EARTH-01, ...): prefix
// comes from the parent category's categoryKey, number scoped per
// (organizationId, categoryId). Falls back to no code if the category has no
// categoryKey (an org's own custom category with no standard key).
FormulaItemSchema.pre("save", async function (this: IFormulaItem) {
  if (this.isNew && !this.formulaCode) {
    const category = await FormulaCategoryModel.findById(this.categoryId).select("categoryKey").lean();
    if (!category?.categoryKey) return;

    const prefix = `${category.categoryKey}-`;
    const last = await FormulaItemModel.findOne({
      organizationId: this.organizationId,
      categoryId: this.categoryId,
      formulaCode: { $regex: `^${prefix}` },
    })
      .sort({ createdAt: -1 })
      .select("formulaCode")
      .lean();

    let nextNum = 1;
    if (last?.formulaCode) {
      const n = parseInt(last.formulaCode.replace(prefix, ""), 10);
      if (!isNaN(n)) nextNum = n + 1;
    }
    this.formulaCode = `${prefix}${String(nextNum).padStart(2, "0")}`;
  }
});

FormulaItemSchema.index({ organizationId: 1, categoryId: 1 });
// FormulaItemSchema.index({ organizationId: 1, confidence: 1 });
// FormulaItemSchema.index({ name: "text", example: "text", note: "text", tags: "text" });

export const FormulaItemModel = model<IFormulaItem>("FormulaItemModel", FormulaItemSchema);