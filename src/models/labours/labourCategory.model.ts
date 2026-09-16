import mongoose, { Schema, Document, Types, model } from "mongoose";

export interface ILabourCategory extends Document {
  organizationId: Types.ObjectId;

  refNo: string; // auto-generated, immutable — e.g. LC-001, LC-999, LC-1000

  categoryName: string;
  description?: string;

  isActive: boolean;


  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const labourCategorySchema = new Schema<ILabourCategory>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    refNo: { type: String, trim: true },

    categoryName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },

   
    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  },
  { timestamps: true }
);

// Prevent duplicate category names within the same org (case-insensitive)
labourCategorySchema.index(
  { organizationId: 1, categoryName: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

labourCategorySchema.index({ organizationId: 1 });

labourCategorySchema.pre("save", async function (this: ILabourCategory) {
  // Only generate once, on creation — never touch it again on updates
  if (!this.isNew) {
    return;
  }

  const prefix = "LC-";

  const lastCategory = await LabourCategoryModel.findOne({
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

const LabourCategoryModel = model<ILabourCategory>("LabourCategoryModel", labourCategorySchema);

export default LabourCategoryModel;