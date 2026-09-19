import { Schema, model, Types } from "mongoose";
import type { IUpload } from "../evidence_model/evidence.model.js";

export type DefectSeverity = "Critical" | "Major" | "Minor";
export type DefectStatus = "open" | "inprogress" | "rectified" | "closed";
export type DefectPhotoStage = "before" | "after";
export type DefectHistoryColor = "red" | "amber" | "purple" | "green";

export interface IDefectActor {
    actorId: Types.ObjectId | null; // null when the action was done by "System" (e.g. auto-reminder)
    actorName: string;
}

export interface IDefectProof extends IUpload {
    //   type: "image" | "pdf";
    //   key: string;
    //   url: string;
    //   originalName: string;
    //   uploadedAt: Date;
    uploadedBy: Types.ObjectId;
}

export interface IDefectMedia {
    before: IDefectProof[];
    after: IDefectProof[];
}

export interface IDefectHistoryEntry {
    date: Date;
    action: string;
    by: IDefectActor;
    color: DefectHistoryColor;
}
export interface IDefect {
  organizationId: Types.ObjectId;
  projectId: Types.ObjectId;

  defectNo: string;

  stage: string | null;
  location: string | null;
  description: string | null;
  govtCode: string | null;

  severity: DefectSeverity;
  status: DefectStatus;

  assignedTo: {
    userId: Types.ObjectId | null;
    name: string;
  };

  dueDate: Date;
  raisedBy: Types.ObjectId;
  raisedOn: Date;
  closedOn: Date | null;

  media: IDefectMedia;
  history: IDefectHistoryEntry[];

  createdBy: Types.ObjectId;
  isActive: boolean;
}

const actorSchema = new Schema<IDefectActor>(
    {
        actorId: { type: Schema.Types.ObjectId, ref: "UserModel", default: null },
        actorName: { type: String, required: true },
    },
    { _id: false }
);

const proofSchema = new Schema<IDefectProof>(
    {
        type: { type: String, enum: ["image", "video", "pdf", "other"], required: true },
        key: { type: String },
        url: { type: String },
        originalName: { type: String },
        uploadedAt: { type: Date, default: new Date() },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    },
    { _id: true }
);


const mediaSchema = new Schema<IDefectMedia>(
    {
        before: { type: [proofSchema], default: [] },
        after: { type: [proofSchema], default: [] },
    },
    { _id: false }
);

const historyEntrySchema = new Schema<IDefectHistoryEntry>(
    {
        date: { type: Date, required: true },
        action: { type: String, required: true },
        by: { type: actorSchema, required: true },
        color: { type: String, enum: ["red", "amber", "purple", "green"], required: true },
    },
    { _id: true }
);

const defectSchema = new Schema<IDefect>(
    {
        organizationId: { type: Schema.Types.ObjectId, ref: "OrganizationModel", required: true },
        projectId: { type: Schema.Types.ObjectId, ref: "ProjectModel", required: true },

        defectNo: { type: String, default: null },

        stage: { type: String, default: null },
        location: { type: String, default: null, trim: true },
        description: { type: String, default: null },
        govtCode: { type: String, default: null },

        severity: { type: String, enum: ["Critical", "Major", "Minor"], required: true },
        status: { type: String, enum: ["open", "inprogress", "rectified", "closed"], default: "open" },

        assignedTo: { type: String, required: true, trim: true },

        dueDate: { type: Date, required: true },
        raisedBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
        raisedOn: { type: Date, default: () => new Date() },
        closedOn: { type: Date, default: null },

        media: { type: mediaSchema, default: () => ({ before: [], after: [] }) },

        history: { type: [historyEntrySchema], default: [] },

        createdBy: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Per your instruction — no index on defectNo itself, only tenant/project scoping.
defectSchema.index({ organizationId: 1 });
defectSchema.index({ projectId: 1 });

// Auto-generate defectNo: DEF-{year}-{sequence}, sequence scoped per organization.
defectSchema.pre("save", async function (this: any) {
    if (!this.isNew) return;

    const year = new Date().getFullYear();
    const prefix = `DEF-${year}-`;

    const lastDefect = await DefectModel.findOne({
        organizationId: this.organizationId,
        defectNo: { $regex: `^${prefix}` },
    }).sort({ createdAt: -1 });

    let nextSeq = 1;
    // if (lastDefect) {
    //     const lastSeq = parseInt(lastDefect.defectNo.split("-")[2], 10);
    //     nextSeq = lastSeq + 1;
    // }

    if (lastDefect) {
        const parts = lastDefect.defectNo.split("-");
        const lastSeqStr = parts[2] ?? "0";
        const lastSeq = parseInt(lastSeqStr, 10);
        nextSeq = lastSeq + 1;
    }

    this.defectNo = `${prefix}${String(nextSeq).padStart(3, "0")}`;
});


export const DefectModel = model<IDefect>("DefectModel", defectSchema);