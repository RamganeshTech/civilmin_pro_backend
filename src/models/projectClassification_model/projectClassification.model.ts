import { Schema, model, Types } from "mongoose";

export interface IProjectClassification {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  occupancyType: string | null;
  buildingHeight: number | null;
  numberOfStoreys: number | null;
  dwellingUnits: number | null;
  builtUpArea: number | null;
  permitNumber: string | null;
  permitValidTo: Date | null;
  controlledDrawingRevision: string | null;
  highRiseDetermination: "PENDING" | "YES" | "NO";
  fireNocApplicability: "PENDING" | "REQUIRED" | "NA";
  completionRoute: "PENDING" | "COMPLETION" | "OCCUPANCY" | "PROFESSIONAL_DETERMINATION";
  createdBy: Types.ObjectId;
  isActive: boolean;
}

const projectClassificationSchema = new Schema<IProjectClassification>(
  {
    organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },

    occupancyType: { type: String, default: null },
    buildingHeight: { type: Number, default: null },
    numberOfStoreys: { type: Number, default: null },
    dwellingUnits: { type: Number, default: null },
    builtUpArea: { type: Number, default: null },
    permitNumber: { type: String, default: null, trim: true },
    permitValidTo: { type: Date, default: null },
    controlledDrawingRevision: { type: String, default: null, trim: true },

    highRiseDetermination: { type: String, enum: ["PENDING", "YES", "NO"], default: "PENDING" },
    fireNocApplicability: { type: String, enum: ["PENDING", "REQUIRED", "NA"], default: "PENDING" },
    completionRoute: {
      type: String,
      enum: ["PENDING", "COMPLETION", "OCCUPANCY", "PROFESSIONAL_DETERMINATION"],
      default: "PENDING",
    },

    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Tenant-scoped listing — mirrors your Project model's { organizationId: 1 } pattern
projectClassificationSchema.index({ organizationId: 1 , projectId: 1});

// Enforces the 1:1 relationship — one classification record per project, ever.
// projectClassificationSchema.index({  },);

export const ProjectClassificationModel = model<IProjectClassification>(
  "ProjectClassificationModel",
  projectClassificationSchema
);