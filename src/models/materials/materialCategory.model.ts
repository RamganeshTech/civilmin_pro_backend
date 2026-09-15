import mongoose, { Schema, Document, Types, model } from "mongoose";

export interface IMaterialCategory extends Document {
  organizationId: Types.ObjectId;

    refNo: string; // auto-generated, immutable — e.g. MC-001, MC-999, MC-1000


  categoryName: string; // e.g. "Bricks", "Sand", "Steel", "Cement"
  code?: string; // optional short code for reports/filters, e.g. "BRK", "STL"
  description?: string;

  icon?: string; // optional icon identifier for the frontend (e.g. a lucide-react icon name)
  color?: string; // optional hex color for UI chips/badges

  isActive: boolean; // soft-disable a category without breaking items that reference it
  createdBy: Types.ObjectId; // ref to UserModel
  createdAt: Date;
  updatedAt: Date;
}

const materialCategorySchema = new Schema<IMaterialCategory>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    refNo: { type: String, trim: true },
    categoryName: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    description: { type: String, trim: true },

    icon: { type: String, trim: true },
    color: { type: String, trim: true },
    
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  },
  { timestamps: true }
);

// Prevent duplicate category names within the same org (case-insensitive via collation)
materialCategorySchema.index(
  { organizationId: 1,  },
);

materialCategorySchema.pre("save", async function (this: IMaterialCategory) {
  // Only generate once, on creation — never touch it again on updates
  if (!this.isNew) {
    return;
  }

  const prefix = "MC-";

  // Scoped per organization only, same as MaterialItem's refNo
  const lastCategory = await MaterialCategoryModel.findOne({
    organizationId: this.organizationId,
    refNo: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .select("refNo")
    .lean();

  let nextNumber = 1;

  if (lastCategory?.refNo) {
    const lastNumberStr = lastCategory.refNo.split("-").pop();
    const lastNumber = parseInt(lastNumberStr || "0", 10);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");
  this.refNo = `${prefix}${paddedNumber}`;
});

const MaterialCategoryModel = model<IMaterialCategory>("MaterialCategoryModel", materialCategorySchema);

export default MaterialCategoryModel;