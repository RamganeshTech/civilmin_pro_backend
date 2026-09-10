import mongoose, { Document, Schema } from "mongoose";
export type ICountry = "IN" | "AE" | "SA" | "QA" | "KW" | "BH" | "OM"; // India + GCC, extend as needed

export interface IOrganization extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  contactEmail: string;
  phone?: string;
  ownerId: mongoose.Types.ObjectId;
  isActive: boolean;
  countryCode: ICountry;
  createdAt: Date;
  updatedAt: Date;
}

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    countryCode: { type: String, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// organizationSchema.index({name: 1})


const OrganizationModel = mongoose.model<IOrganization>(
  "OrganizationModel",
  organizationSchema
);

export default OrganizationModel;