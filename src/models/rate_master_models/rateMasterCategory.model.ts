import { Schema, model, Types, Document } from "mongoose";

/**
 * Rate Master Category — grouping for RateMasterItemModel (e.g. "Brick & Block
 * Masonry", "Electrical Works"), same shape/pattern as the existing
 * MaterialCategory / LabourCategory models. RateMasterItemModel.categoryId
 * references this by _id instead of storing the category name as free text.
 */

export interface IRateMasterCategory extends Document {
  organizationId: Types.ObjectId;

  refNo: string; // auto-generated, e.g. RC-001, scoped per organizationId
  categoryName: string;

  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const RateMasterCategorySchema = new Schema<IRateMasterCategory>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    refNo: { type: String, default: null },
    categoryName: { type: String, default: null },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
  },
  { timestamps: true }
);

// Same "query last + increment" pattern as RateMasterItem's refNo / boq.model.ts's boqNo /
// LabourCategory's refNo — not countDocuments, to avoid collisions after deletion.
RateMasterCategorySchema.pre("save", async function (this: IRateMasterCategory) {
  if (this.isNew && !this.refNo) {
    const prefix = "RC-";
    const last = await RateMasterCategoryModel.findOne({
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

RateMasterCategorySchema.index({ organizationId: 1 });

export const RateMasterCategoryModel = model<IRateMasterCategory>(
  "RateMasterCategoryModel",
  RateMasterCategorySchema
);