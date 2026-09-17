
import { BOQModel, type IBOQ, type IBOQSection, IBOQStatus } from "../../models/BOQ/boq.model.js";
import LabourItemModel from "../../models/labours/labourItem.model.js";
import MaterialItemModel from "../../models/materials/materialItem.model.js";
import { ApiError } from "../../utils/apiError.js";
import { FORMULAS } from "./boq-formulas.config.js";


export const getAllBOQ = async (organizationId: string) => {
  const boq = await BOQModel.find({ organizationId });
  // if (!boq) throw new ApiError(404, "BOQ not found");
  return boq;
};
export const getBOQById = async (organizationId: string, boqId: string) => {
  const boq = await BOQModel.findOne({ _id: boqId, organizationId });
  if (!boq) return null;



  return boq;
};

const getEditableBOQ = async (organizationId: string, boqId: string) => {
  const boq = await BOQModel.findOne({ _id: boqId, organizationId });
  if (!boq) throw new ApiError(404, "BOQ not found");
  if (boq.status === IBOQStatus.APPROVED) throw new ApiError(400, "BOQ is locked and cannot be edited");
  return boq;
};

const recomputeTotals = (boq: IBOQ) => {
  boq.materialsTotal = boq.sections.reduce((s, sec) => s + sec.lineItems.reduce((a, i) => a + (i.amount || 0), 0), 0);
  boq.labourTotal = boq.sections.reduce((s, sec) => s + sec.labours.reduce((a, i) => a + (i.amount || 0), 0), 0);
  boq.totalCost = boq.materialsTotal + boq.labourTotal;
};

// ── STEP 1: SAVE SELECTED SECTIONS (create if no boqId, else update) ────────
export const saveSections = async (
  organizationId: string,
  // projectId: string,
  projectId: string | undefined, // Made optional for updates
  boqId: string | undefined,
  incomingSections: Pick<IBOQSection, "sectionId" | "sectionName" | "sectionCode" | "govtCode">[],
  userId: string
) => {
  if (!boqId) {
    return BOQModel.create({
      organizationId,
      projectId,
      sections: incomingSections.map((s) => ({ ...s, inputs: {}, lineItems: [], labours: [], subtotal: 0, warnings: [] })),
      createdBy: userId,
      updatedBy: userId,
    });
  }

  const boq = await getBOQById(organizationId, boqId);

  if (!boq) throw new ApiError(404, "BOQ not found");
  const incomingIds = incomingSections.map((s) => s.sectionId);
  const retained = boq.sections.filter((s) => incomingIds.includes(s.sectionId));

  MaterialItemModel
  LabourItemModel
  const existingIds = retained.map((s) => s.sectionId);
  const added = incomingSections
    .filter((s) => !existingIds.includes(s.sectionId))
    .map((s) => ({ ...s, inputs: {}, lineItems: [], labours: [], subtotal: 0, warnings: [] }));

  boq.sections = [...retained, ...added] as IBOQSection[];
  boq.updatedBy = userId as any;
  await boq.save();
  return boq;
};

// ── STEP 2: SAVE DIMENSION INPUTS FOR ONE SECTION ────────────────────────────
export const saveSectionInputs = async (
  organizationId: string,
  boqId: string,
  sectionId: string,
  inputs: Record<string, string | number>,
  userId: string
) => {
  const boq = await getBOQById(organizationId, boqId);
  if (!boq) throw new ApiError(404, "BOQ not found");

  const section = boq.sections.find((s) => s.sectionId === sectionId);

  if (!section) throw new ApiError(404, "Section not found on this BOQ");

  section.inputs = inputs;
  boq.updatedBy = userId as any;
  await boq.save();
  return boq;
};

// ── STEP 3: RUN FORMULA ENGINE ───────────────────────────────────────────────
export const runFormulaEngine = async (organizationId: string, boqId: string, userId: string) => {
  const boq = await getBOQById(organizationId, boqId);
  if (!boq) throw new ApiError(404, "BOQ not found");

  let materialsTotal = 0;
  let labourTotal = 0;


  for (const section of boq.sections) {
    const formulaFn = FORMULAS[section.sectionId];
    if (!formulaFn) continue;

    // const result = formulaFn(section.inputs);
    const result = formulaFn(section.inputs);

    section.lineItems = result.lineItems.map((li) => ({ ...li, rate: 0, amount: 0, materialItemId: null })) as any;
    section.labours = result.labours.map((la) => ({ ...la, rate: 0, amount: 0, labourItemId: null })) as any;

    section.warnings = result.warnings ?? [];
    // const materialSum = result.lineItems.reduce((s, i) => s + i.amount, 0);
    // const labourSum = result.labours.reduce((s, i) => s + i.amount, 0);
    // section.subtotal = materialSum + labourSum;
    section.subtotal = 0;
    // materialsTotal += materialSum;
    // labourTotal += labourSum;

    materialsTotal = 0;
    labourTotal = 0;
  }

  // boq.materialsTotal = materialsTotal;
  // boq.labourTotal = labourTotal;
  // boq.totalCost = materialsTotal + labourTotal;
  boq.materialsTotal = 0;
  boq.labourTotal = 0;
  boq.totalCost = 0;
  boq.warnings = boq.sections.flatMap((s) => s.warnings);
  boq.updatedBy = userId as any;
  await boq.save();
  return boq;
};

// ── STEP 4: EDIT A SINGLE LINE ITEM ──────────────────────────────────────────
export const updateLineItem = async (
  organizationId: string,
  boqId: string,
  sectionId: string,
  lineItemId: string,
  changes: Partial<{ description: string; quantity: number; rate: number }>,
  userId: string
) => {
  const boq = await getBOQById(organizationId, boqId);
  if (!boq) throw new ApiError(404, "BOQ not found");

  const section = boq.sections.find((s) => s.sectionId === sectionId);
  if (!section) throw new ApiError(404, "Section not found");

  const item = section.lineItems.find((i) => (i as any)._id.toString() === lineItemId);
  if (!item) throw new ApiError(404, "Line item not found");

  Object.assign(item, changes);
  item.amount = item.quantity * item.rate;

  section.subtotal = section.lineItems.reduce((s, i) => s + i.amount, 0) + section.labours.reduce((s, i) => s + i.amount, 0);
  boq.materialsTotal = boq.sections.reduce((s, sec) => s + sec.lineItems.reduce((a, i) => a + i.amount, 0), 0);
  boq.labourTotal = boq.sections.reduce((s, sec) => s + sec.labours.reduce((a, i) => a + i.amount, 0), 0);
  boq.totalCost = boq.materialsTotal + boq.labourTotal;
  boq.updatedBy = userId as any;
  await boq.save();
  return boq;
};

// ── ASSIGN REAL MATERIAL TO A LINE ITEM (sets rate/amount, auto-saves) ──────
export const assignMaterialToLineItem = async (
  organizationId: string,
  boqId: string,
  sectionId: string,
  lineItemId: string,
  materialItemId: string,
  userId: string
) => {
  const boq = await getEditableBOQ(organizationId, boqId);
  const section = boq.sections.find((s) => s.sectionId === sectionId);
  if (!section) throw new ApiError(404, "Section not found");

  const item = section.lineItems.find((i) => (i as any)._id.toString() === lineItemId);
  if (!item) throw new ApiError(404, "Line item not found");

  const material = await MaterialItemModel.findOne({ _id: materialItemId, organizationId });
  if (!material) throw new ApiError(404, "Material item not found");

  item.materialItemId = material._id as any;
  item.rate = material.currentRate;
  item.amount = +(item.quantity * material.currentRate).toFixed(2);

  section.subtotal =
    section.lineItems.reduce((s, i) => s + (i.amount || 0), 0) +
    section.labours.reduce((s, i) => s + (i.amount || 0), 0);

  recomputeTotals(boq);
  boq.updatedBy = userId as any;
  await boq.save(); // ← auto-saves here
  return boq;
};

// ── ASSIGN REAL LABOUR TO A LABOUR ROW (sets rate/amount, auto-saves) ───────
export const assignLabourToLabourItem = async (
  organizationId: string,
  boqId: string,
  sectionId: string,
  labourRowId: string,
  labourItemId: string,
  userId: string
) => {
  const boq = await getEditableBOQ(organizationId, boqId);
  const section = boq.sections.find((s) => s.sectionId === sectionId);
  if (!section) throw new ApiError(404, "Section not found");

  const item = section.labours.find((i) => (i as any)._id.toString() === labourRowId);
  if (!item) throw new ApiError(404, "Labour item not found");

  const labour = await LabourItemModel.findOne({ _id: labourItemId, organizationId });
  if (!labour) throw new ApiError(404, "Labour item not found");

  item.labourItemId = labour._id as any;
  item.labourType = labour.role; // reflects the real role picked, not the formula's guess
  item.rate = labour.rate;
  item.amount = +(item.quantity * labour.rate).toFixed(2);

  section.subtotal =
    section.lineItems.reduce((s, i) => s + (i.amount || 0), 0) +
    section.labours.reduce((s, i) => s + (i.amount || 0), 0);

  recomputeTotals(boq);
  boq.updatedBy = userId as any;
  await boq.save(); // ← auto-saves here
  return boq;
};

// ── STEP 5: APPROVE ───────────────────────────────────────────────────────────
export const approveBOQ = async (
  organizationId: string,
  boqId: string,
  approvedBy: string,
  approvalNotes: string | null,
  userId: string
) => {
  const boq = await getBOQById(organizationId, boqId);
  if (!boq) throw new ApiError(404, "BOQ not found");

  boq.status = IBOQStatus.APPROVED;
  boq.approvedBy = approvedBy;
  boq.approvalNotes = approvalNotes;
  boq.approvedAt = new Date();
  boq.updatedBy = userId as any;
  await boq.save();
  return boq;
};

