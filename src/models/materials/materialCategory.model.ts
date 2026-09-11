import mongoose, { Schema, Document, Types, model } from "mongoose";

export interface IMaterialCategory extends Document {
  organizationId: Types.ObjectId;

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
  { organizationId: 1, name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const MaterialCategoryModel = model<IMaterialCategory>("MaterialCategoryModel", materialCategorySchema);

export default MaterialCategoryModel;