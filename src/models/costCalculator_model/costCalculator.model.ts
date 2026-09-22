import { Schema, model, Types, Document } from "mongoose";

/**
 * Cost Calculator — the 6-step wizard model (Select Categories → Enter
 * Dimensions → Formula Engine → Cost & BOQ Viewer → Approve → Export).
 * Pulls quantities from Formula Engine (FormulaItemModel) and rates from
 * Rate Master (RateMasterItemModel) instead of the demo's hardcoded config.
 *
 * Per explicit instruction: a line item stores rateMasterItemId ONLY — no
 * separate categoryId — since RateMasterItemModel already carries its own
 * categoryId; duplicating it here would just be denormalization with no
 * purpose. Category grouping in the UI comes from populating
 * rateMasterItemId -> categoryId, not from a field stored on the line item.
 *
 * NOTE on rate/unit/description on the line item: these are SNAPSHOTS taken
 * at the moment the item was added, not live references. RateMasterItem.vl
 * can change after this estimate is created (an org may revise pricing);
 * without a snapshot, a previously-approved estimate's total would silently
 * drift whenever the rate master is edited. Same reasoning BOQ line items
 * already use for material/labour amounts.
 */

export const COST_CALC_STATUS = ["draft", "approved"] as const;
export type ICostCalcStatus = (typeof COST_CALC_STATUS)[number];

export interface ICostCalcLineItem {
  _id: Types.ObjectId;

  rateMasterItemId: Types.ObjectId; // ref RateMasterItemModel — the ONLY rate/category linkage stored

  description: string | null; // snapshot of RateMasterItem.service at time of add
  unit: string | null; // snapshot of RateMasterItem.unit
  rate: number; // snapshot of RateMasterItem.vl
  quantity: number;
  amount: number; // quantity * rate, computed and stored (not derived on read)

  govtCode: string | null; // IS code / standard reference, if applicable
}

export interface ICostCalcSection {
  _id: Types.ObjectId;

  categoryKey: string; // the wizard's own 24-category key (e.g. "brickwork", "falseCeiling") — NOT a DB ref; this taxonomy belongs to the Cost Calculator wizard itself, distinct from both RateMasterCategoryModel and FormulaCategoryModel
  categoryLabel: string; // display name shown in step 1

  formulaItemId: Types.ObjectId | null; // ref FormulaItemModel — set only for the 19 formula-driven categories; null for the 5 rate-card-only ("expanded") categories

  inputs: Record<string, number | string>; // dimension inputs captured in step 2 (length, width, height, etc.)

  lineItems: ICostCalcLineItem[];
  sectionTotal: number;
}

export interface ICostCalculator extends Document {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;

  refNo: string; // auto-generated, e.g. CE-001, scoped per organizationId
  version: number;
  status: ICostCalcStatus;

  sections: ICostCalcSection[];
  grandTotal: number;

   perSqftRate: number | null;
  warnings: string[];
  approvedBy: string | null;
  approvalNotes: string | null;
  approvedAt: Date | null;

  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const CostCalcLineItemSchema = new Schema<ICostCalcLineItem>(
  {
    rateMasterItemId: {
      type: Schema.Types.ObjectId,
      ref: "RateMasterItemModel",
      required: true,
    },

    description: { type: String, default: null },
    unit: { type: String, default: null },
    rate: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },

    govtCode: { type: String, default: null },
  },
  { _id: true }
);

const CostCalcSectionSchema = new Schema<ICostCalcSection>(
  {
    categoryKey: { type: String, default: null },
    categoryLabel: { type: String, default: null },

    formulaItemId: {
      type: Schema.Types.ObjectId,
      ref: "FormulaItemModel",
      default: null,
    },

    inputs: { type: Schema.Types.Mixed, default: {} },

    lineItems: { type: [CostCalcLineItemSchema], default: [] },
    sectionTotal: { type: Number, default: 0 },
  },
  { _id: true }
);

const CostCalculatorSchema = new Schema<ICostCalculator>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectModel",
        default: null
    },

    refNo: { type: String, default: null },
    version: { type: Number, default: 1 },
    status: { type: String, enum: COST_CALC_STATUS, default: "draft" },

    sections: { type: [CostCalcSectionSchema], default: [] },
    grandTotal: { type: Number, default: 0 },

    perSqftRate: { type: Number, default: null },
    warnings: { type: [String], default: [] },
    approvedBy: { type: String, default: null },
    approvalNotes: { type: String, default: null },
    approvedAt: { type: Date, default: null },

    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
  },
  { timestamps: true }
);

// Same "query last + increment" refNo pattern used across the codebase.
CostCalculatorSchema.pre("save", async function (this: ICostCalculator) {
  if (this.isNew && !this.refNo) {
    const prefix = "BOQ-";
    const last = await CostCalculatorModel.findOne({
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

CostCalculatorSchema.index({ organizationId: 1, projectId: 1 });
// CostCalculatorSchema.index({ organizationId: 1, status: 1 });

export const CostCalculatorModel = model<ICostCalculator>(
  "CostCalculatorModel",
  CostCalculatorSchema
);