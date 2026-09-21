import { Router } from "express";
import * as projectController from "../../controllers/projects/project.controllers.js";
import { multiAuthRole } from "../../middleware/auth.middleware.js";

const projectRoutes = Router();

const readRoles = multiAuthRole("owner", "admin", "cto", "staff");
const writeRoles = multiAuthRole("owner", "admin", "cto");

// GET /projects/:organizationId - List all projects with pagination/filters
projectRoutes.get("/v1/:organizationId", readRoles, projectController.getAllProjects);

// POST /projects/:organizationId - Create new project
projectRoutes.post("/v1/:organizationId", writeRoles, projectController.createProject);

// GET /projects/:organizationId/dropdown - Get simplified projects list for dropdowns
// MUST BE BEFORE :projectId to avoid route parameter collisions
projectRoutes.get("/v1/:organizationId/dropdown", readRoles, projectController.getProjectsDropdown);

// GET /projects/:organizationId/:projectId - Get project details
projectRoutes.get("/v1/:organizationId/:projectId", readRoles, projectController.getProjectById);

// PATCH /projects/:organizationId/:projectId - Update project details
projectRoutes.patch("/v1/:organizationId/:projectId", writeRoles, projectController.updateProject);

// DELETE /projects/:organizationId/:projectId - Soft delete project
projectRoutes.delete("/v1/:organizationId/:projectId", writeRoles, projectController.deleteProject);

export default projectRoutes;