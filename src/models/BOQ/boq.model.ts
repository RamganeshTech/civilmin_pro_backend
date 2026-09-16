// models/boq.model.ts
import { Schema, model, Types, Document } from "mongoose";
import type { IMaterialUnit } from "../materials/materialItem.model.js";
// import { IMaterialUnit } from "./materialItem.model"; // adjust path to your existing enum location

// ── LINE ITEM ──────────────────────────────────────────────────────────────
export interface IBOQLineItem {
  no: string;
  description: string;
  unit: IMaterialUnit;
  quantity: number;
  rate: number;
  amount: number; // quantity * rate, computed at generation time — never recomputed on read
  isCode?: string;
  materialItemId?: Types.ObjectId; // ref to MaterialItem the rate was sourced from, if any
}

const BOQLineItemSchema = new Schema<IBOQLineItem>(
  {
    no: { type: String, required: true },
    description: { type: String, required: true },
    unit: { type: String, enum: Object.values(IMaterialUnit), required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    amount: { type: Number, required: true },
    isCode: { type: String },
    materialItemId: { type: Schema.Types.ObjectId, ref: "MaterialItem" },
  },
  { _id: false }
);

// ── SECTION (one per selected category) ─────────────────────────────────────
export interface IBOQSection {
  categoryId: string; // matches boq-categories.config.ts key, e.g. 'brickwork' — not a DB ref
  categoryName: string;
  categoryCode: string;
  isCodeRef?: string;
  inputs: Record<string, string | number>; // snapshot of dimension form values used
  lineItems: IBOQLineItem[];
  subtotal: number;
  warnings: string[];
}

const BOQSectionSchema = new Schema<IBOQSection>(
  {
    categoryId: { type: String, required: true },
    categoryName: { type: String, required: true },
    categoryCode: { type: String, required: true },
    isCodeRef: { type: String },
    inputs: { type: Schema.Types.Mixed, required: true, default: {} },
    lineItems: { type: [BOQLineItemSchema], required: true, default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    warnings: { type: [String], required: true, default: [] },
  },
  { _id: false }
);

// ── BOQ STATUS ───────────────────────────────────────────────────────────────
export enum IBOQStatus {
  DRAFT = "draft",
  APPROVED = "approved",
  SUPERSEDED = "superseded",
}

// ── BOQ DOCUMENT ───────────────────────────────────────────────────────────
export interface IBOQ extends Document {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;
  boqCode: string;
  version: number;
  status: IBOQStatus;
  sections: IBOQSection[];
  totalCost: number;
  materialsTotal: number;
  labourTotal: number;
  perSqftRate: number | null;
  warnings: string[];
  approvedBy: string | null;
  approvalNotes: string | null;
  approvedAt: Date | null;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BOQSchema = new Schema<IBOQ>(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "OrganizationModel",
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "ProjectModel",
      required: true,
    },
    boqCode: { type: String, required: true, trim: true },
    version: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: Object.values(IBOQStatus),
      required: true,
      default: IBOQStatus.DRAFT,
    },
    sections: { type: [BOQSectionSchema], required: true, default: [] },
    totalCost: { type: Number, required: true, default: 0 },
    materialsTotal: { type: Number, required: true, default: 0 },
    labourTotal: { type: Number, required: true, default: 0 },
    perSqftRate: { type: Number, default: null },
    warnings: { type: [String], required: true, default: [] },
    approvedBy: { type: String, default: null },
    approvalNotes: { type: String, default: null },
    approvedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

// ── INDEXES ────────────────────────────────────────────────────────────────
// Fast lookup of a project's BOQ history, newest version first
BOQSchema.index({ organizationId: 1, projectId: 1,});

// One version number per project — prevents two drafts racing to the same version
// BOQSchema.index({ projectId: 1, version: 1 }, { unique: true });

// // boqCode should be unique per org (not globally, matching your Project pattern)
// BOQSchema.index({ organizationId: 1, boqCode: 1 }, { unique: true });

export const BOQModel = model<IBOQ>("BOQ", BOQSchema);