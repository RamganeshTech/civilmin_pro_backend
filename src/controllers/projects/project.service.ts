import { Types } from "mongoose";
import type { Filter } from "mongodb";
import type {  IProject,
 IProjectType,
 IProjectStatus,
 IProjectStage,
 IBasementType,
 IFacingDirection, } from "../../models/project_model/project.model.js";
import { ApiError } from "../../utils/apiError.js";
import ProjectModel from "../../models/project_model/project.model.js";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface IProjectFilters {
  projectType?: IProjectType;
  status?: IProjectStatus;
  currentStage?: IProjectStage;
  basement?: IBasementType;
  facingDirection?: IFacingDirection;
  siteEngineerId?: string;
  clientName?: string;
  search?: string; // matches projectCode / clientName / siteAddress
  startDateFrom?: string;
  startDateTo?: string;
  isActive?: string; // "true" | "false" (comes in as a string via req.query)
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string; // "asc" | "desc"
}

interface IRegulatoryInput {
  approvalNumber?: string;
  plotSurveyNumber?: string;
  wardOrZone?: string;
  authorityName?: string;
  notes?: string;
}

export interface ICreateProjectInput {
  projectType: IProjectType;
  clientName: string;
    projectName: string;
  siteAddress: string;
  builtUpArea: number;
  numberOfFloors: number;
  basement?: IBasementType;
  plotArea?: number;
  plotDimensions?: string;
  facingDirection?: IFacingDirection;
  startDate: Date | string;
  plannedCompletion?: Date | string;
  status?: IProjectStatus;
  currentStage?: IProjectStage;
  siteEngineerId?: string;
  mainContractor?: string;
  contractorMobile?: string;
  clientMobile?: string;
  regulatory?: IRegulatoryInput;
}

export interface IUpdateProjectInput extends Partial<ICreateProjectInput> {
  isActive?: boolean;
}


/* ------------------------------------------------------------------ */
/*  Get All (with filters + pagination)                               */
/* ------------------------------------------------------------------ */

export const getAllProjects = async (
  organizationId: string,
  filters: IProjectFilters
): Promise<{
  projects: IProject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const {
    projectType,
    status,
    currentStage,
    basement,
    facingDirection,
    siteEngineerId,
    clientName,
    search,
    startDateFrom,
    startDateTo,
    isActive,
    page = "1",
    limit = "10",
    sortBy = "createdAt",
    sortOrder = "desc",
  } = filters;

  const query: Record<string , any> = { organizationId };

  if (projectType) query.projectType = projectType;
  if (status) query.status = status;
  if (currentStage) query.currentStage = currentStage;
  if (basement) query.basement = basement;
  if (facingDirection) query.facingDirection = facingDirection;

  if (siteEngineerId) {
    if (!Types.ObjectId.isValid(siteEngineerId)) {
      throw new ApiError(400, "Invalid siteEngineerId");
    }
    query.siteEngineerId = siteEngineerId;
  }

  if (clientName) {
    query.clientName = { $regex: clientName, $options: "i" };
  }

  // Default to only active projects unless the caller explicitly asks otherwise
  query.isActive = isActive === undefined ? true : isActive === "true";

  if (startDateFrom || startDateTo) {
    query.startDate = {};
    if (startDateFrom) (query.startDate as any).$gte = new Date(startDateFrom);
    if (startDateTo) (query.startDate as any).$lte = new Date(startDateTo);
  }

  if (search) {
    query.$or = [
      { projectName: { $regex: search, $options: "i" } },
      { projectCode: { $regex: search, $options: "i" } },
      { clientName: { $regex: search, $options: "i" } },
      { siteAddress: { $regex: search, $options: "i" } },
    ];
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const [projects, total] = await Promise.all([
    ProjectModel.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limitNum)
      .populate("siteEngineerId", "userName email mobile")
      .lean(),
    ProjectModel.countDocuments(query),
  ]);

  return {
    projects: projects as unknown as IProject[],
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.max(Math.ceil(total / limitNum), 1),
  };
};


/* ------------------------------------------------------------------ */
/*  Dropdown (lightweight list for <select> options)                   */
/* ------------------------------------------------------------------ */
 
export interface IProjectDropdownItem {
  _id: Types.ObjectId;
  projectName: string;
  projectCode: string;
}
 
export const getProjectsDropdown = async (
  organizationId: string
): Promise<{ projects: IProjectDropdownItem[] }> => {
  const projects = await ProjectModel.find({ organizationId, isActive: true })
    .select("projectName projectCode _id")
    .sort({ projectName: 1 })
    .lean();
 
  return { projects: projects as unknown as IProjectDropdownItem[] };
};

/* ------------------------------------------------------------------ */
/*  Get By Id                                                          */
/* ------------------------------------------------------------------ */

export const getProjectById = async (
  projectId: string,
  organizationId: string
): Promise<{ project: IProject }> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await ProjectModel.findOne({ _id: projectId, organizationId })
    .populate("siteEngineerId", "userName email _id")
    .populate("createdBy", "userName email _id");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return { project };
};

/* ------------------------------------------------------------------ */
/*  Create                                                             */
/* ------------------------------------------------------------------ */

export const createProject = async (
  organizationId: string,
  createdBy: string,
  payload: ICreateProjectInput
): Promise<{ project: IProject }> => {

    const projectData: Record<string, any> = { ...payload };
  if (projectData.siteEngineerId === "") {
    delete projectData.siteEngineerId;
  }

  const project = await ProjectModel.create({
    ...projectData,
    organizationId,
    createdBy,
  });

  return { project };
};

/* ------------------------------------------------------------------ */
/*  Update                                                             */
/* ------------------------------------------------------------------ */

export const updateProject = async (
  projectId: string,
  organizationId: string,
  payload: IUpdateProjectInput
): Promise<{ project: IProject }> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  // Never let these be changed via the update endpoint
  const safePayload: Record<string, unknown> = { ...payload };
  delete safePayload.projectCode;
  delete safePayload.organizationId;
  delete safePayload.createdBy;

  // Handle siteEngineerId if sent as empty string from frontend dropdown
  if (safePayload.siteEngineerId === "") {
    safePayload.siteEngineerId = null;
  }


  // Flatten regulatory object so existing fields don't get deleted
  if (safePayload.regulatory) {
    for (const [key, value] of Object.entries(safePayload.regulatory)) {
      safePayload[`regulatory.${key}`] = value;
    }
    delete safePayload.regulatory;
  }

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, organizationId },
    { $set: safePayload },
    { new: true, runValidators: true }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return { project };
};

/* ------------------------------------------------------------------ */
/*  Delete (soft delete)                                               */
/* ------------------------------------------------------------------ */

export const deleteProject = async (
  projectId: string,
  organizationId: string
): Promise<{ project: IProject }> => {
  if (!Types.ObjectId.isValid(projectId)) {
    throw new ApiError(400, "Invalid project id");
  }

  const project = await ProjectModel.findOneAndUpdate(
    { _id: projectId, organizationId },
    { $set: { isActive: false } },
    { new: true }
  );

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return { project };
};