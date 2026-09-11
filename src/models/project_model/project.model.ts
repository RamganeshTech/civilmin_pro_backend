import mongoose, { Schema, Document, Types, model } from "mongoose";

export type IProjectType = "Residential" | "Commercial" | "Villa" | "Renovation" | "Apartment";
export type IBasementType = "no" | "yes" | "stilt";
export type IFacingDirection = "East" | "West" | "North" | "South" | "North-East" | "North-West" | "South-East" | "South-West";
export type IProjectStatus = "Planning" | "Active" | "On Hold" | "Completed";
export type IProjectStage =
  | "Foundation"
  | "Plinth Beam"
  | "Columns (GF)"
  | "Slab (GF)"
  | "Columns (FF)"
  | "Slab (FF)"
  | "Brickwork"
  | "Plastering"
  | "Electrical & Plumbing"
  | "Tiling & Flooring"
  | "Painting"
  | "Handover";

export interface IProject extends Document {
  organizationId: Types.ObjectId;

  // Basic Info
  projectName: string
  projectCode: string; // auto-generated
  projectType: IProjectType;
  clientName: string;
  siteAddress: string;

  // Site Dimensions
  builtUpArea: number;
  numberOfFloors: number;
  basement: IBasementType;
  plotArea?: number;
  plotDimensions?: string;
  facingDirection?: IFacingDirection;

  // Timeline & Status
  startDate: Date;
  plannedCompletion?: Date;
  status: IProjectStatus;
  currentStage?: IProjectStage;

  // Team
  siteEngineerId?: Types.ObjectId; // ref to UserModel
  mainContractor?: string;
  contractorMobile?: string;
  clientMobile?: string;

  // Regulatory (country-agnostic shape; labels differ per country on frontend)
  regulatory: {
    approvalNumber?: string;      // CMDA number (IN) / municipality permit no. (AE, SA, etc.)
    plotSurveyNumber?: string;
    wardOrZone?: string;
    authorityName?: string;       // Corporation / Panchayat / Municipality / Baladiya etc.
    notes?: string;
  };

  isActive: boolean;
  createdBy: Types.ObjectId; // ref to UserModel
  createdAt: Date;
  updatedAt: Date;
}

const regulatorySchema = new Schema(
  {
    approvalNumber: { type: String, trim: true },
    plotSurveyNumber: { type: String, trim: true },
    wardOrZone: { type: String, trim: true },
    authorityName: { type: String, trim: true },
    notes: { type: String, trim: true },
  },
  { _id: false }
);

const projectSchema = new Schema<IProject>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },

    projectName: {type:String, required: true, trim:true},
    projectCode: { type: String, trim: true },
    projectType: {
      type: String,
      enum: ["Residential", "Commercial", "Villa", "Renovation", "Apartment"],
      required: true,
    },
    clientName: { type: String, required: true, trim: true },
    siteAddress: { type: String, required: true, trim: true },

    builtUpArea: { type: Number, required: true },
    numberOfFloors: { type: Number, required: true },
    basement: { type: String, enum: ["no", "yes", "stilt"], default: "no" },
    plotArea: { type: Number },
    plotDimensions: { type: String, trim: true },
    facingDirection: {
      type: String,
      enum: ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"],
    },

    startDate: { type: Date, required: true },
    plannedCompletion: { type: Date },
    status: {
      type: String,
      enum: ["Planning", "Active", "On Hold", "Completed"],
      default: "Planning",
    },
    currentStage: {
      type: String,
      enum: [
        "Foundation", "Plinth Beam", "Columns (GF)", "Slab (GF)",
        "Columns (FF)", "Slab (FF)", "Brickwork", "Plastering",
        "Electrical & Plumbing", "Tiling & Flooring", "Painting", "Handover",
      ],
    },

    siteEngineerId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    mainContractor: { type: String, trim: true },
    contractorMobile: { type: String, trim: true },
    clientMobile: { type: String, trim: true },

    regulatory: { type: regulatorySchema, default: {} },

    isActive: { type: Boolean, default: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  },
  { timestamps: true }
);


projectSchema.pre("save", async function (this: IProject) {
  // Only generate once, on creation — never touch it again on updates
  if (!this.isNew) {
    return;
  }

  const currentYear = new Date().getFullYear();
  const prefix = `PR-${currentYear}-`;

  // Use this.constructor instead of the closed-over ProjectModel —
  // avoids relying on module init order and resolves correctly for discriminators
  const ProjectModelRef = this.constructor as mongoose.Model<IProject>;

  const lastProject = await ProjectModelRef.findOne({
    organizationId: this.organizationId,
    projectCode: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .select("projectCode")
    .lean();

  let nextNumber = 1;

  if (lastProject?.projectCode) {
    const lastNumberStr = lastProject.projectCode.split("-").pop();
    const lastNumber = parseInt(lastNumberStr || "0", 10);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");
  this.projectCode = `${prefix}${paddedNumber}`;
});

projectSchema.index({ organizationId: 1  ,projectCode: 1 }, { unique: true })

const ProjectModel = model("ProjectModel", projectSchema);

export default ProjectModel;