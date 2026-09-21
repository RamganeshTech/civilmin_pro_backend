import { Schema, model, Types, Document } from "mongoose";

/**
 * Formula Engine Category — grouping for FormulaItemModel (e.g. "Concrete &
 * Mix Design", "Masonry — Brick & Block"). Org-scoped, same as
 * RateMasterCategoryModel, NOT global/static config — unlike the BOQ's 19
 * quantity-takeoff formulas (which stay as backend TS config because they
 * are not meant to be edited per org), these formulas are reference/how-to
 * material an org may want to tweak, verify, or extend with their own site
 * conditions — so each org gets its own editable copy, seeded from the
 * standard 17-category list.
 */

export interface IFormulaCategory extends Document {
  organizationId: Types.ObjectId;

  refNo: string; // auto-generated, e.g. FC-001, scoped per organizationId

  categoryKey: string | null; // e.g. "CONV", "EARTH" — matches the standard seed list where applicable; null for an org's own custom category
  categoryName: string; // e.g. "Conversions & Site Units"
  engineModules: string | null; // reference note, e.g. "units.js" / "concrete.js" — documentation only, not a real import

  isActive: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId | null;

  createdAt: Date;
  updatedAt: Date;
}

const FormulaCategorySchema = new Schema<IFormulaCategory>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    refNo: { type: String, default: null },

    categoryKey: { type: String, default: null },
    categoryName: { type: String, default: null },
    engineModules: { type: String, default: null },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
  },
  { timestamps: true }
);

// Same "query last + increment" pattern used across boq.model.ts / RateMasterCategory / LabourCategory.
FormulaCategorySchema.pre("save", async function (this: IFormulaCategory) {
  if (this.isNew && !this.refNo) {
    const prefix = "FC-";
    const last = await FormulaCategoryModel.findOne({
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

FormulaCategorySchema.index({ organizationId: 1, categoryName: 1 });
// FormulaCategorySchema.index({ organizationId: 1, categoryKey: 1 });

export const FormulaCategoryModel = model<IFormulaCategory>(
  "FormulaCategoryModel",
  FormulaCategorySchema
);