import { type Response, type NextFunction } from "express";
import type { RoleBasedRequest } from "../../utils/utils.js";
import * as projectService from "./project.service.js"

/* ------------------------------------------------------------------ */
/*  GET /projects                                                      */
/* ------------------------------------------------------------------ */

export const getAllProjects = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const { organizationId } = req.params;

    if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }

    const result = await projectService.getAllProjects(organizationId, req.query as any);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};


/* ------------------------------------------------------------------ */
/*  GET /projects/dropdown                                             */
/* --- */

export const getProjectsDropdown = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { organizationId } = req.params!;

     if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }


    const result = await projectService.getProjectsDropdown(organizationId);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};


/* ------------------------------------------------------------------ */
/*  GET /projects/:projectId                                           */
/* ------------------------------------------------------------------ */

export const getProjectById = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId, organizationId } = req.params;

    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

     if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }


    const result = await projectService.getProjectById(projectId, organizationId);

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  POST /projects                                                     */
/* ------------------------------------------------------------------ */

export const createProject = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.user!;

    const { organizationId} = req.params;


     if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }


    const result = await projectService.createProject(organizationId, userId, req.body);

    res.status(201).json({ ok: true, data: result, message: "Project created successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  PATCH /projects/:projectId                                         */
/* ------------------------------------------------------------------ */

export const updateProject = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId, organizationId } = req.params;

     if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }


    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await projectService.updateProject(projectId, organizationId, req.body);

    res.status(200).json({ ok: true, data: result, message: "Project updated successfully" });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------------------------------------------ */
/*  DELETE /projects/:projectId                                        */
/* ------------------------------------------------------------------ */

export const deleteProject = async (
  req: RoleBasedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId, organizationId } = req.params;

     if (!organizationId) {
      res.status(404).json({ message: "organizationId is required", ok: false })
      return;
    }


    if (!projectId) {
      res.status(400).json({ ok: false, message: "projectId is required" });
      return;
    }

    const result = await projectService.deleteProject(projectId, organizationId);

    res.status(200).json({ ok: true, data: result, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};