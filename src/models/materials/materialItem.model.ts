import mongoose, { Schema, Document, Types, model } from "mongoose";

export type IMaterialUnit =
    | "Bag" | "Kg" | "Ton" | "Cft" | "Cum" | "Sqft" | "Sqm"
    | "Rft" | "Nos" | "Litre" | "Load" | "Bundle" | "Roll"
    | "Box";

export type IMaterialItemStatus = "Active" | "Inactive" | "Discontinued";

export type IRateChangeDirection = "increase" | "decrease" | "no_change";

// export type IRateSourceType = "Vendor" | "Market Survey" | "Government Rate" | "Manual Entry" | "Other";
export const MATERIAL_UNITS: IMaterialUnit[] = [
    "Bag" , "Kg" , "Ton" , "Cft" , "Cum" , "Sqft" , "Sqm",
    "Rft" , "Nos" , "Litre" , "Load" , "Bundle" , "Roll", "Box"]; 

export interface IMaterialItem extends Document {
    organizationId: Types.ObjectId;
    categoryId: Types.ObjectId; // ref to MaterialCategoryModel

    // Basic Info
    productName: string; // e.g. "Red Clay Brick", "TMT Bar 12mm"
    brand?: string; // e.g. "Tata Tiscon" - optional, not every material has a brand
    unit: IMaterialUnit;

    // Rate tracking
    currentRate: number;
    previousRate?: number;
    rateChangePercentage: number; // signed: positive = increase, negative = decrease
    rateChangeDirection: IRateChangeDirection;
    lastRateUpdatedAt?: Date; // when the RATE itself last changed (distinct from updatedAt, which changes on any field edit)

    status: IMaterialItemStatus;

    //   source: {
    //     type: IRateSourceType;
    //     name?: string; // vendor name / market name
    //     reference?: string; // quotation no. / invoice no. / document reference
    //   };

        refNo: string; // auto-generated, immutable — e.g. MI-001, MI-999, MI-1000


    source: string

    notes?: string;

    isActive: boolean; // soft delete flag - keeps history/references (estimates, BOQs) intact
    createdBy: Types.ObjectId;
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// const sourceSchema = new Schema(
//   {
//     type: {
//       type: String,
//       enum: ["Vendor", "Market Survey", "Government Rate", "Manual Entry", "Other"],
//       default: "Manual Entry",
//     },
//     name: { type: String, trim: true },
//     reference: { type: String, trim: true },
//   },
//   { _id: false }
// );

const materialItemSchema = new Schema<IMaterialItem>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
        categoryId: { type: Schema.Types.ObjectId, ref: "MaterialCategoryModel", required: true },

        productName: { type: String, required: true, trim: true },
        brand: { type: String, trim: true },
        unit: {
            type: String,
            // enum: ["Bag", "Kg", "Ton", "Cft", "Cum", "Sqft", "Sqm", "Rft", "Nos", "Litre", "Load", "Bundle", "Roll", "Box"],
            enum: MATERIAL_UNITS,
            required: true,
        },

        refNo: { type: String, trim: true },

        currentRate: { type: Number, required: true, min: 0 },
        previousRate: { type: Number, min: 0 },
        rateChangePercentage: { type: Number, default: 0 }, // computed in the service layer whenever rate changes
        rateChangeDirection: {
            type: String,
            enum: ["increase", "decrease", "no_change"],
            default: "no_change",
        },
        lastRateUpdatedAt: { type: Date },

        status: {
            type: String,
            enum: ["Active", "Inactive", "Discontinued"],
            default: "Active",
        },

        // source: { type: sourceSchema, default: () => ({ type: "Manual Entry" }) },
        source: { type: String, trim: true },

        notes: { type: String, trim: true },

        isActive: { type: Boolean, default: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
        updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    },
    { timestamps: true }
);

// Fast lookups: "all items in this category for this org", "search by name within org"
materialItemSchema.index({ organizationId: 1, categoryId: 1 });
// materialItemSchema.index({ organizationId: 1, productName: 1 });

/**
 * Computes rate-change percentage + direction between an old and new rate.
 *
 * Deliberately a static method rather than a pre('save') hook: findOneAndUpdate()
 * (which bulk rate updates will likely use) bypasses 'save' middleware entirely,
 * so a hook here would silently fail to fire for that path. Rate-change logic is
 * core business logic - the service layer calls this explicitly before persisting
 * a rate change, so it stays visible and easy to unit test.
 */
materialItemSchema.statics.computeRateChange = function (
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


materialItemSchema.pre("save", async function (this: IMaterialItem) {
  // Only generate once, on creation — never touch it again on updates
  if (!this.isNew) {
    return;
  }

  const prefix = "MI-";

  // Scoped per organization only (no year component here, unlike project codes)
  const lastItem = await MaterialItemModel.findOne({
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

export interface IMaterialItemModel extends mongoose.Model<IMaterialItem> {
    computeRateChange(
        previousRate: number,
        currentRate: number
    ): { rateChangePercentage: number; rateChangeDirection: IRateChangeDirection };
}

const MaterialItemModel = model<IMaterialItem, IMaterialItemModel>("MaterialItemModel", materialItemSchema);

export default MaterialItemModel;