import mongoose, { Schema, Document, Types, model } from "mongoose";

export type ISkillLevel = "Unskilled" | "Semi-Skilled" | "Skilled" | "Highly Skilled" | "Supervisor";

export type ILabourItemStatus = "Active" | "Inactive" | "Discontinued";

export type IRateChangeDirection = "increase" | "decrease" | "no_change";

export interface ILabourItem extends Document {
  organizationId: Types.ObjectId;
  categoryId: Types.ObjectId; // ref to LabourCategoryModel

  refNo: string; // auto-generated, immutable — e.g. LI-001, LI-999, LI-1000

  // Basic Info
  role: string; // e.g. "Mason", "Bar Bender", "Electrician"
  skillLevel: ISkillLevel;

  // Rate tracking (mirrors MaterialItem's rate pattern)
  rate: number; // full daily rate
  previousRate?: number;
  rateChangePercentage: number; // signed: positive = increase, negative = decrease
  rateChangeDirection: IRateChangeDirection;
  lastRateUpdatedAt?: Date; // when the RATE itself last changed (distinct from updatedAt, which changes on any field edit)

  halfDayRate: number;
  otPerHour: number;

  status: ILabourItemStatus;

  notes?: string;

  isActive: boolean; // soft delete flag
  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const labourItemSchema = new Schema<ILabourItem>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "LabourCategoryModel", required: true },

    refNo: { type: String, trim: true },

    role: { type: String, required: true, trim: true },
    skillLevel: {
      type: String,
      enum: ["Unskilled", "Semi-Skilled", "Skilled", "Highly Skilled", "Supervisor"],
      required: true,
    },

    rate: { type: Number, required: true, min: 0 },
    previousRate: { type: Number, min: 0 },
    rateChangePercentage: { type: Number, default: 0 }, // computed in the service layer whenever rate changes
    rateChangeDirection: {
      type: String,
      enum: ["increase", "decrease", "no_change"],
      default: "no_change",
    },
    lastRateUpdatedAt: { type: Date },

    halfDayRate: { type: Number, required: true, min: 0 },
    otPerHour: { type: Number, required: true, min: 0 },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Discontinued"],
      default: "Active",
    },

    notes: { type: String, trim: true },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { timestamps: true }
);

// Fast lookups: "all labour items in this category for this org"
labourItemSchema.index({ organizationId: 1, categoryId: 1 });
labourItemSchema.index({ organizationId: 1 });

labourItemSchema.pre("save", async function (this: ILabourItem) {
  // Only generate once, on creation — never touch it again on updates
  if (!this.isNew) {
    return;
  }

  const prefix = "LI-";

  const lastItem = await LabourItemModel.findOne({
    organizationId: this.organizationId,
    refNo: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .select("refNo")
    .lean();

  let nextNumber = 1;

  if (lastItem?.refNo) {
    const lastNumberStr = lastItem.refNo.split("-").pop();
    const lastNumber = parseInt(lastNumberStr || "0", 10);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");
  this.refNo = `${prefix}${paddedNumber}`;
});

/**
 * Computes rate-change percentage + direction between an old and new rate.
 *
 * Deliberately a static method rather than a pre('save') hook: findOneAndUpdate()
 * (which bulk rate updates will likely use) bypasses 'save' middleware entirely,
 * so a hook here would silently fail to fire for that path. Rate-change logic is
 * core business logic - the service layer calls this explicitly before persisting
 * a rate change, so it stays visible and easy to unit test.
 */
labourItemSchema.statics.computeRateChange = function (
  previousRate: number,
  currentRate: number
): { rateChangePercentage: number; rateChangeDirection: IRateChangeDirection } {
  if (!previousRate || previousRate === 0) {
    return { rateChangePercentage: 0, rateChangeDirection: "no_change" };
  }

  const percentage = ((currentRate - previousRate) / previousRate) * 100;
  const rounded = Math.round(percentage * 100) / 100; // 2 decimal places

  let direction: IRateChangeDirection = "no_change";
  if (rounded > 0) direction = "increase";
  else if (rounded < 0) direction = "decrease";

  return { rateChangePercentage: rounded, rateChangeDirection: direction };
};

export interface ILabourItemModel extends mongoose.Model<ILabourItem> {
  computeRateChange(
    previousRate: number,
    currentRate: number
  ): { rateChangePercentage: number; rateChangeDirection: IRateChangeDirection };
}

const LabourItemModel = model<ILabourItem, ILabourItemModel>("LabourItemModel", labourItemSchema);

export default LabourItemModel;