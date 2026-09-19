import { isValidObjectId } from "mongoose";
import { ProjectClassificationModel, type IProjectClassification } from "../../models/projectClassification_model/projectClassification.model.js";
import { ApiError } from "../../utils/apiError.js";
import ProjectModel from "../../models/project_model/project.model.js";
import { pickFields } from "../../utils/utils.js";

type ICreateClassificationInput = Partial<
  Pick<
    IProjectClassification,
    | "occupancyType"
    | "buildingHeight"
    | "numberOfStoreys"
    | "dwellingUnits"
    | "builtUpArea"
    | "permitNumber"
    | "permitValidTo"
    | "controlledDrawingRevision"
    | "highRiseDetermination"
    | "fireNocApplicability"
    | "completionRoute"
  >
>;

const ALLOWED_FIELDS: (keyof ICreateClassificationInput)[] = [
  "occupancyType",
  "buildingHeight",
  "numberOfStoreys",
  "dwellingUnits",
  "builtUpArea",
  "permitNumber",
  "permitValidTo",
  "controlledDrawingRevision",
  "highRiseDetermination",
  "fireNocApplicability",
  "completionRoute",
];

// Tenant-safety: never trust a projectId on its own — confirm it actually
// belongs to the organizationId making the request.
const assertProjectBelongsToOrg = async (organizationId: string, projectId: string): Promise<void> => {
  if (!isValidObjectId(projectId)) {
    throw new ApiError(400, "Invalid projectId");
  }
  if (!isValidObjectId(organizationId)) {
    throw new ApiError(400, "Invalid organizationId");
  }

  const project = await ProjectModel.findOne({ _id: projectId, organizationId, isActive: true });
  if (!project) {
    throw new ApiError(404, "Project not found for this organization");
  }
};

export const createProjectClassification = async (
  organizationId: string,
  projectId: string,
  createdBy: string,
  payload: ICreateClassificationInput
): Promise<{ classification: IProjectClassification }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const existing = await ProjectClassificationModel.findOne({ projectId, isActive: true });
  if (existing) {
    throw new ApiError(409, "Project classification already exists for this project");
  }

  const safePayload = pickFields<ICreateClassificationInput>(payload, ALLOWED_FIELDS);

  const classification = await ProjectClassificationModel.create({
    ...safePayload,
    organizationId,
    projectId,
    createdBy,
  });

  return { classification };
};

export const getProjectClassification = async (
  organizationId: string,
  projectId: string
): Promise<{ classification: IProjectClassification | null }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const classification = await ProjectClassificationModel.findOne({
    organizationId,
    projectId,
    isActive: true,
  })
   .populate("createdBy", "_id userName")
  .populate("projectId", "_id projectName");

  return { classification };
};

export const updateProjectClassification = async (
  organizationId: string,
  projectId: string,
  payload: ICreateClassificationInput
): Promise<{ classification: IProjectClassification }> => {
  await assertProjectBelongsToOrg(organizationId, projectId);

  const safePayload = pickFields<ICreateClassificationInput>(payload, ALLOWED_FIELDS);

  const classification = await ProjectClassificationModel.findOneAndUpdate(
    { organizationId, projectId, isActive: true },
    { $set: safePayload },
    { new: true }
  );

  if (!classification) {
    throw new ApiError(404, "Project classification not found for this project");
  }

  return { classification };
};