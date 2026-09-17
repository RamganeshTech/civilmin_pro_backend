// models/boq.model.ts
import { Schema, model, Types, Document } from "mongoose";
import { MATERIAL_UNITS, type IMaterialUnit } from "../materials/materialItem.model.js";
// import { IMaterialUnit } from "./materialItem.model"; // adjust path to your existing enum location

// ── LINE ITEM ──────────────────────────────────────────────────────────────
export interface IBOQLineItem {
  // no: string;
  description: string;
  unit: IMaterialUnit;
  quantity: number;
  rate: number;
  amount: number; // quantity * rate, computed at generation time — never recomputed on read
  govtCode?: string;
  materialItemId?: Types.ObjectId; // ref to MaterialItem the rate was sourced from, if any
}

const BOQLineItemSchema = new Schema<IBOQLineItem>(
  {
    // no: { type: String, required: true },
    description: { type: String, default: null },
    unit: { type: String, enum: Object.values(MATERIAL_UNITS), default: null },
    quantity: { type: Number, default: null },
    rate: { type: Number, default: null },  // price per unit
    amount: { type: Number, default: null },  // quantity × rate
    govtCode: { type: String, default: null },  // S 2212:1991 Cl.5
    materialItemId: { type: Schema.Types.ObjectId, ref: "MaterialItemModel", default: null },
  },
  { _id: true }
);

// ── LABOUR ITEM ───────────────────────────────────────────────────────────
export interface IBOQLabourItem {
  labourType: string;      // "Mason", "Helper", "Tile Layer", "Electrician" — what kind of worker
  description: string;     // "Brickwork labour", "Plastering labour" — what task they're doing
  unit: IMaterialUnit;     // "cum", "sqft", "point", "MT" — how this labour is measured/priced
  quantity: number;
  rate: number;            // rate per unit for this labour type
  amount: number;          // quantity * rate
  govtCode?: string;
  labourItemId?: Types.ObjectId; // ref to LabourItem the rate was sourced from

}

const BOQLabourItemSchema = new Schema<IBOQLabourItem>(
  {
    labourType: { type: String, default: null },
    description: { type: String, default: null },
    unit: { type: String, enum: MATERIAL_UNITS, default: null },
    quantity: { type: Number, default: null },
    rate: { type: Number, default: null },
    amount: { type: Number, default: null },
    govtCode: { type: String, default: null },
    labourItemId: { type: Schema.Types.ObjectId, ref: "LabourItemModel", default: null },

  },
  { _id: true }
);

// ── SECTION (one per selected category) ─────────────────────────────────────
export interface IBOQSection {
  sectionId: string; // matches boq-categories.config.ts key, e.g. 'brickwork' — not a DB ref
  sectionName: string;
  sectionCode: string;
  govtCode?: string;
  inputs: Record<string, string | number>; // snapshot of dimension form values used
  lineItems: IBOQLineItem[];
  labours: IBOQLabourItem[];   // NEW

  subtotal: number;
  warnings: string[];
}

const BOQSectionSchema = new Schema<IBOQSection>(
  {
    sectionId: { type: String, default: null }, // 'brickwork' it is a key for the finding the right formula
    sectionName: { type: String, default: null },  // 'Brickwork'
    sectionCode: { type: String, default: null },  // 'F01'
    govtCode: { type: String, default: null },
    inputs: { type: Schema.Types.Mixed, default: {} },  // {length: 40, height: 10, thickness: 0.75,}
    lineItems: { type: [BOQLineItemSchema], default: [] },
    labours: { type: [BOQLabourItemSchema], default: [] },
    subtotal: { type: Number, default: 0 },
    warnings: { type: [String], default: [] },
  },
  { _id: true }
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
  boqNo: string;
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
    boqNo: { type: String, trim: true, default: null },
    version: { type: Number, default: 1 },
    status: {
      type: String,
      enum: Object.values(IBOQStatus),
      required: true,
      default: IBOQStatus.DRAFT,
    },
    sections: { type: [BOQSectionSchema], default: [] },
    totalCost: { type: Number, default: 0 },
    materialsTotal: { type: Number, default: 0 },
    labourTotal: { type: Number, default: 0 },
    perSqftRate: { type: Number, default: null },
    warnings: { type: [String], default: [] },
    approvedBy: { type: String, default: null },
    approvalNotes: { type: String, default: null },
    approvedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    updatedBy: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ── PRE-SAVE: AUTO-GENERATE boqNo ───────────────────────────────────────────
BOQSchema.pre("save", async function (this: IBOQ) {
  if (!this.isNew) return; // only generate once, on creation — never touch it again on updates

  const prefix = "BOQ-";

  const lastBOQ = await BOQModel.findOne({
    organizationId: this.organizationId,
    boqNo: { $regex: `^${prefix}` },
  })
    .sort({ createdAt: -1 })
    .select("boqNo")
    .lean();

  let nextNumber = 1;

  if (lastBOQ?.boqNo) {
    const lastNumberStr = lastBOQ.boqNo.split("-").pop();
    const lastNumber = parseInt(lastNumberStr || "0", 10);
    nextNumber = lastNumber + 1;
  }

  const paddedNumber = String(nextNumber).padStart(3, "0");
  this.boqNo = `${prefix}${paddedNumber}`;
});

// ── INDEXES ────────────────────────────────────────────────────────────────
// Fast lookup of a project's BOQ history, newest version first
BOQSchema.index({ organizationId: 1, projectId: 1, });

// One version number per project — prevents two drafts racing to the same version
// BOQSchema.index({ projectId: 1, version: 1 }, { unique: true });

// // boqCode should be unique per org (not globally, matching your Project pattern)
// BOQSchema.index({ organizationId: 1, boqCode: 1 }, { unique: true });

export const BOQModel = model<IBOQ>("BOQ", BOQSchema);