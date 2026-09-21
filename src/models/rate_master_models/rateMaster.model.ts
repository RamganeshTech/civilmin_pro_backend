import { Schema, model, Types, Document } from "mongoose";

/**
 * Rate Master — the "Rate Card" module.
 * Pure priced-service master data (category / service / unit / VL rate).
 * No formula or quantity-engine linkage here — that stays on the BOQ side.
 * A BOQ line item can later reference a RateMasterItem by _id
 * (e.g. `rateMasterItemId`) instead of duplicating category/service/rate text.
 */

export const RATE_MASTER_UNITS = [
  "sqft", "sqft opening", "cft", "cum", "rft", "kg",
  "nos", "point", "bathroom", "kitchen", "lot", "day", "load",
] as const;

export type IRateMasterUnit = (typeof RATE_MASTER_UNITS)[number];

export const RATE_MASTER_CONFIDENCE = ["SOURCE", "RESEARCH", "DERIVED"] as const;
export type IRateMasterConfidence = (typeof RATE_MASTER_CONFIDENCE)[number];

export const RATE_MASTER_STATUS = ["PROPOSED", "APPROVED", "ARCHIVED"] as const;
export type IRateMasterStatus = (typeof RATE_MASTER_STATUS)[number];

export interface IRateMasterItem extends Document {
  organizationId: Types.ObjectId;

  refNo: string; // auto-generated, e.g. RATE-001, scoped per organizationId

//   category: string;               // e.g. "Brick & Block Masonry" — display grouping only
  categoryId: Types.ObjectId;     // ref RateMasterCategoryModel
  sourceCategory: string | null;  // e.g. "Masonry" / "Expanded 2026 database"

  service: string;                // e.g. "AAC block wall – 6 in"
  unit: IRateMasterUnit;

  vl: number;          // selling rate quoted to client
  low: number | null;  // market band - low
  high: number | null; // market band - high

  spec: string | null;
  crew: string | null;
  productivity: string | null;
  notes: string | null;

  status: IRateMasterStatus;

  basis: string | null;
  sourceUrl: string | null;
  confidence: IRateMasterConfidence;

  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const RateMasterItemSchema = new Schema<IRateMasterItem>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    refNo: { type: String, default: null },

    // category: { type: String, default: null },
     categoryId: {
      type: Schema.Types.ObjectId,
      ref: "RateMasterCategoryModel",
      default: null,
    },
    sourceCategory: { type: String, default: null },

    service: { type: String, default: null },
    unit: { type: String, enum: RATE_MASTER_UNITS, default: null },

    vl: { type: Number, default: null },
    low: { type: Number, default: null },
    high: { type: Number, default: null },

    spec: { type: String, default: null },
    crew: { type: String, default: null },
    productivity: { type: String, default: null },
    notes: { type: String, default: null },

    status: { type: String, enum: RATE_MASTER_STATUS, default: "PROPOSED" },

    basis: { type: String, default: null },
    sourceUrl: { type: String, default: null },
    confidence: { type: String, enum: RATE_MASTER_CONFIDENCE, default: "DERIVED" },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
  },
  { timestamps: true }
);

// Same "query last + increment" pattern as boq.model.ts's boqNo hook / LabourCategory's refNo
RateMasterItemSchema.pre("save", async function (this: IRateMasterItem) {
  if (this.isNew && !this.refNo) {
    const prefix = "RATE-";
    const last = await RateMasterItemModel.findOne({
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

RateMasterItemSchema.index({ organizationId: 1, category: 1 });
// RateMasterItemSchema.index({ organizationId: 1, confidence: 1 });
// RateMasterItemSchema.index({ service: "text", spec: "text", notes: "text" });

export const RateMasterItemModel = model<IRateMasterItem>(
  "RateMasterItemModel",
  RateMasterItemSchema
);