import mongoose, { Schema, Document, Types, model } from "mongoose";

// 1. Reusable Upload Interface
export interface IUpload {
  type: "image";
  key?: string;
  url?: string;
  originalName?: string;
  uploadedAt: Date;
}


export type IRole = "admin" | "owner" | "staff" | "cto";

export interface IUser extends Document {
  organizationId: Types.ObjectId;
  email?: string;
  userName: string;
  password: string;
  role: IRole
  phoneNo?: string;
  profileImage: IUpload | null
  isActive: boolean
  createdAt: Date;
  updatedAt: Date;
}

const uploadSchema = new Schema<IUpload>({
  type: { type: String, enum: ["image"] },
  key: { type: String, },
  url: { type: String, },
  originalName: String,
  uploadedAt: { type: Date, default: new Date() }
});

const userSchema = new Schema<IUser>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    email: { type: String, default: "" },
    userName: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      // required: true, 
      // enum: ["correspondent", "teacher", "principal", "viceprincipal", "administrator", "parent", "accountant", null]
    },
    phoneNo: { type: String, default: "" },
    profileImage: {
      type: uploadSchema, default: null
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);



userSchema.index({ organizationId: 1 , email: 1})

const UserModel = model("UserModel", userSchema);

export default UserModel;
