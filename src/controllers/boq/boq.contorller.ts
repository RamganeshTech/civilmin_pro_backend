

// controllers/boq.controller.ts
import type { NextFunction, Response } from "express";
import type { RoleBasedRequest } from "../../utils/utils.js";
import * as boqService from "./boq.service.js";




// ── GET all BOQ ───────────────────────────────────────────────────────────
export const getAllBOQ = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { organizationId, } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }


        const result = await boqService.getAllBOQ(organizationId);

        res.status(200).json({ ok: true, data: result, message: "BOQ's fetched successfully" });
    } catch (error) {
        next(error);
    }
};



// ── GET ONE BOQ ───────────────────────────────────────────────────────────
export const getBOQ = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { organizationId, boqId } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }

        const result = await boqService.getBOQById(organizationId, boqId);

        res.status(200).json({ ok: true, data: result, message: "BOQ fetched successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 1: CREATE (no boqId) OR UPDATE SECTIONS (with boqId) ───────────────
export const saveSections = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, projectId, boqId } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        // FIX: Require projectId ONLY if boqId is missing (Creation flow)
        if (!boqId && !projectId) {
            res.status(400).json({ ok: false, message: "Either projectId or boqId is required" });
            return;
        }
        
        if (!req.body.sections || !Array.isArray(req.body.sections)) {
            res.status(400).json({ ok: false, message: "sections array is required" });
            return;
        }

        const result = await boqService.saveSections(organizationId, projectId, boqId, req.body.sections, userId);

        res
            .status(boqId ? 200 : 201)
            .json({ ok: true, data: result, message: boqId ? "Sections updated successfully" : "BOQ created successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 2: SAVE DIMENSION INPUTS FOR ONE SECTION ────────────────────────────
export const saveSectionInputs = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, boqId, sectionId } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }
        if (!sectionId) {
            res.status(400).json({ ok: false, message: "sectionId is required" });
            return;
        }
        if (!req.body.inputs) {
            res.status(400).json({ ok: false, message: "inputs is required" });
            return;
        }

        const result = await boqService.saveSectionInputs(organizationId, boqId, sectionId, req.body.inputs, userId);

        res.status(200).json({ ok: true, data: result, message: "Inputs saved successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 3: RUN FORMULA ENGINE ───────────────────────────────────────────────
export const runEngine = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, boqId } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }

        const result = await boqService.runFormulaEngine(organizationId, boqId, userId);

        res.status(200).json({ ok: true, data: result, message: "Formula engine completed successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 4a: EDIT A LINE ITEM'S DESCRIPTION/QUANTITY MANUALLY ───────────────
export const updateLineItem = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, boqId, sectionId, lineItemId } = req.params;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }
        if (!sectionId) {
            res.status(400).json({ ok: false, message: "sectionId is required" });
            return;
        }
        if (!lineItemId) {
            res.status(400).json({ ok: false, message: "lineItemId is required" });
            return;
        }

        const result = await boqService.updateLineItem(organizationId, boqId, sectionId, lineItemId, req.body, userId);

        res.status(200).json({ ok: true, data: result, message: "Line item updated successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 4b: ASSIGN REAL MATERIAL TO A LINE ITEM (sets rate/amount) ─────────
export const assignMaterial = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, boqId, sectionId, lineItemId } = req.params;
        const { materialItemId } = req.body;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }
        if (!sectionId) {
            res.status(400).json({ ok: false, message: "sectionId is required" });
            return;
        }
        if (!lineItemId) {
            res.status(400).json({ ok: false, message: "lineItemId is required" });
            return;
        }
        if (!materialItemId) {
            res.status(400).json({ ok: false, message: "materialItemId is required" });
            return;
        }

        const result = await boqService.assignMaterialToLineItem(organizationId, boqId, sectionId, lineItemId, materialItemId, userId);

        res.status(200).json({ ok: true, data: result, message: "Material assigned successfully" });
    } catch (error) {
        next(error);
    }
};

// ── STEP 4c: ASSIGN REAL LABOUR TO A LABOUR ROW (sets rate/amount) ──────────
export const assignLabour = async (
    req: RoleBasedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userId } = req.user!;
        const { organizationId, boqId, sectionId, labourRowId } = req.params;
        const { labourItemId } = req.body;

        if (!organizationId) {
            res.status(400).json({ ok: false, message: "organizationId is required" });
            return;
        }
        if (!boqId) {
            res.status(400).json({ ok: false, message: "boqId is required" });
            return;
        }
        if (!sectionId) {
            res.status(400).json({ ok: false, message: "sectionId is required" });
            return;
        }
        if (!labourRowId) {
            res.status(400).json({ ok: false, message: "labourRowId is required" });
            return;
        }
        if (!labourItemId) {
            res.status(400).json({ ok: false, message: "labourItemId is required" });
            return;
        }

        const result = await boqService.assignLabourToLabourItem(organizationId, boqId, sectionId, labourRowId, labourItemId, userId);

        res.status(200).json({ ok: true, data: result, message: "Labour assigned successfully" });
    } catch (error) {
        next(error);
    }
};