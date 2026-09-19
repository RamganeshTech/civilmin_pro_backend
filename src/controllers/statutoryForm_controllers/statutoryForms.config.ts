export interface IStatutoryFormConfig {
  formId: string;
  gateId: string;
  title: string;
}

export const STATUTORY_FORMS_CONFIG: IStatutoryFormConfig[] = [
  { formId: "FORM-02", gateId: "COM-07", title: "Commencement Notice" },
  { formId: "FORM-03", gateId: "PLT-10", title: "Progress Certificate — Plinth" },
  { formId: "FORM-04", gateId: "LST-12", title: "Progress Certificate — Last Storey" },
  { formId: "FORM-05", gateId: "ASB-15", title: "Completion Report" },
  { formId: "FORM-06", gateId: "ASB-15", title: "Supervision Certificate" },
  { formId: "FORM-07", gateId: "ASB-15", title: "Structural Stability Certificate" },
  { formId: "FORM-08", gateId: "ASB-15", title: "Site Supervision Report" },
  { formId: "FORM-09-PLINTH", gateId: "PLT-10", title: "Structural Inspection Report — Plinth" },
  { formId: "FORM-09-LASTSTOREY", gateId: "LST-12", title: "Structural Inspection Report — Last Storey" },
  { formId: "FORM-10", gateId: "ASB-15", title: "Technical Audit Report" },
  { formId: "AUTH-COMP-OCC", gateId: "OCC-16", title: "Completion / Occupancy Approval" },
];