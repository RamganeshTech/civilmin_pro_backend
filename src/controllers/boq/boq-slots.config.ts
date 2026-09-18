// import type { IMaterialUnit } from "../../models/materials/materialItem.model.js";

import type { IMaterialUnit } from "../../models/materials/materialItem.model.js";

export interface SlotDef {
  description: string;
  unit: IMaterialUnit;
  govtCode?: string;
}
export interface LabourSlotDef extends SlotDef {
  labourType: string;
}

export const BOQ_SLOTS: Record<string, { materials: SlotDef[]; labours: LabourSlotDef[] }> = {
  brickwork: {
    materials: [
      { description: "Solid bricks", unit: "Nos", govtCode: "IS 2212:1991 Cl.5" },
      { description: "Cement (mortar)", unit: "Bag", govtCode: "IS 2212:1991" },
      { description: "River sand (mortar)", unit: "Cft", govtCode: "IS 2116:1980" },
    ],
    labours: [{ labourType: "Mason", description: "Brickwork labour", unit: "Cum", govtCode: "IS 2212:1991" }],
  },
  concrete: {
    materials: [
      { description: "Cement", unit: "Bag", govtCode: "IS 456:2000" },
      { description: "M-Sand (fine aggregate)", unit: "Cft", govtCode: "IS 383:2016" },
      { description: "20mm coarse aggregate", unit: "Cft", govtCode: "IS 383:2016" },
    ],
    labours: [{ labourType: "Mason", description: "Concrete mixing & placing labour", unit: "Cum", govtCode: "IS 456:2000" }],
  },
  plastering: {
    materials: [
      { description: "Cement (mortar)", unit: "Bag", govtCode: "IS 1661:1972" },
      { description: "River sand", unit: "Cft", govtCode: "IS 1661:1972" },
    ],
    labours: [{ labourType: "Mason", description: "Plastering labour", unit: "Sqft", govtCode: "IS 1661:1972" }],
  },
  steel: {
    materials: [
      { description: "TMT Fe500 steel bars", unit: "Ton", govtCode: "IS 456:2000 / IS 1786:2008" },
      { description: "Steel binding wire", unit: "Kg", govtCode: "IS 280:2006" },
    ],
    labours: [{ labourType: "Steel Fixer", description: "Bar bending & fixing labour", unit: "Ton", govtCode: "IS 456:2000" }],
  },
  foundation: {
    materials: [
      { description: "PCC M10 (bed concrete)", unit: "Cum", govtCode: "IS 456:2000" },
      { description: "Cement for PCC", unit: "Bag", govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Helper", description: "Earth excavation", unit: "Cum", govtCode: "IS 3764:1992" },
      { labourType: "Helper", description: "Lorry disposal (loose soil)", unit: "Nos", govtCode: "—" },
    ],
  },
  flooring: {
    materials: [
      { description: "Floor tiles", unit: "Nos", govtCode: "IS 1237:1980" },
      { description: "Cement (bedding mortar)", unit: "Bag", govtCode: "IS 1237:1980" },
      { description: "M-Sand (bedding)", unit: "Cft", govtCode: "IS 1237:1980" },
    ],
    labours: [{ labourType: "Tile Layer", description: "Tiling labour", unit: "Sqft", govtCode: "IS 1237:1980" }],
  },
  waterproof: {
    materials: [
      { description: "Liquid waterproofing membrane", unit: "Kg", govtCode: "IS 2645:2003" },
      { description: "Cement (protective screed)", unit: "Bag", govtCode: "IS 2645:2003" },
    ],
    labours: [{ labourType: "Helper", description: "Waterproofing labour", unit: "Sqft", govtCode: "IS 2645:2003" }],
  },
  paint: {
    materials: [
      { description: "Wall putty (2-coat)", unit: "Kg", govtCode: "NBC 2016" },
      { description: "Primer (1-coat)", unit: "Litre", govtCode: "NBC 2016" },
      { description: "Interior emulsion (2-coat)", unit: "Litre", govtCode: "NBC 2016" },
    ],
    labours: [{ labourType: "Painter", description: "Painting labour", unit: "Sqft", govtCode: "NBC 2016" }],
  },
  rccSlab: {
    materials: [
      { description: "RCC M20 slab concrete", unit: "Cum", govtCode: "IS 456:2000 Cl.24" },
      { description: "Cement", unit: "Bag", govtCode: "IS 456:2000" },
      { description: "Sand", unit: "Cft", govtCode: "IS 383:2016" },
      { description: "20mm Aggregate", unit: "Cft", govtCode: "IS 383:2016" },
      { description: "Slab steel", unit: "Kg", govtCode: "IS 456:2000" },
    ],
    labours: [{ labourType: "Mason", description: "Shuttering & concrete labour", unit: "Sqft", govtCode: "IS 456:2000" }],
  },
  rccColumn: {
    materials: [
      { description: "RCC M20 column concrete", unit: "Cum", govtCode: "IS 456:2000 Cl.39" },
      { description: "Cement", unit: "Bag", govtCode: "IS 456:2000" },
      { description: "Column steel", unit: "Kg", govtCode: "IS 456:2000" },
    ],
    labours: [{ labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", govtCode: "IS 456:2000" }],
  },
  rccBeam: {
    materials: [
      { description: "RCC M20 beam concrete", unit: "Cum", govtCode: "IS 456:2000 Cl.26" },
      { description: "Cement", unit: "Bag", govtCode: "IS 456:2000" },
      { description: "Beam steel", unit: "Kg", govtCode: "IS 456:2000" },
    ],
    labours: [{ labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", govtCode: "IS 456:2000" }],
  },
  staircase: {
    materials: [
      { description: "RCC staircase concrete", unit: "Cum", govtCode: "IS 456:2000 Cl.33" },
      { description: "Staircase steel", unit: "Kg", govtCode: "IS 456:2000" },
    ],
    labours: [{ labourType: "Mason", description: "Shuttering & formwork", unit: "Sqft", govtCode: "IS 456:2000" }],
  },
  drainage: {
    materials: [
      { description: "PVC drainage pipe", unit: "Mtr" as IMaterialUnit, govtCode: "IS 1742:1983" },
      { description: "Pipe fittings & junctions", unit: "Load", govtCode: "IS 1742:1983" },
    ],
    labours: [{ labourType: "Plumber", description: "Plumbing labour", unit: "Mtr" as IMaterialUnit, govtCode: "IS 1742:1983" }],
  },
  septic: {
    materials: [
      { description: "Septic tank", unit: "Nos", govtCode: "IS 2470:1985" },
      { description: "Overhead water tank", unit: "Nos", govtCode: "IS 2470:1985" },
      { description: "Underground sump", unit: "Nos", govtCode: "IS 2470:1985" },
    ],
    labours: [{ labourType: "Plumber", description: "Plumbing connections & labour", unit: "Load", govtCode: "IS 2470:1985" }],
  },
  earthwork: {
    materials: [],
    labours: [
      { labourType: "Helper", description: "Site excavation", unit: "Cum", govtCode: "IS 3764:1992" },
      { labourType: "Helper", description: "Lorry trips (loose soil)", unit: "Nos", govtCode: "—" },
      { labourType: "Helper", description: "Compaction (200mm layers)", unit: "Cum", govtCode: "IS 2720" },
    ],
  },
  electrical: {
    materials: [
      { description: "Main MCB", unit: "Nos", govtCode: "IS 732:1989" },
      { description: "Main cable (copper)", unit: "Mtr" as IMaterialUnit, govtCode: "IS 732:1989" },
      { description: "Distribution board", unit: "Nos", govtCode: "IS 732:1989" },
    ],
    labours: [{ labourType: "Electrician", description: "Electrical wiring labour", unit: "Point" as IMaterialUnit, govtCode: "IS 732:1989" }],
  },
  aac: {
    materials: [
      { description: "AAC blocks", unit: "Nos", govtCode: "IS 2185 Pt.3" },
      { description: "Thin-bed mortar / cement", unit: "Bag", govtCode: "IS 2185 Pt.3" },
      { description: "Sand", unit: "Cft", govtCode: "IS 2185 Pt.3" },
    ],
    labours: [{ labourType: "Mason", description: "Masonry labour (AAC)", unit: "Sqft", govtCode: "IS 2185 Pt.3" }],
  },
  thumbrule: {
    materials: [
      { description: "OPC 53 Cement", unit: "Bag", govtCode: "BN Datta" },
      { description: "River sand / M-Sand", unit: "Cft", govtCode: "BN Datta" },
      { description: "20mm aggregate", unit: "Cft", govtCode: "BN Datta" },
      { description: "Steel Fe500", unit: "Ton", govtCode: "BN Datta" },
    ],
    labours: [],
  },
  compound: {
    materials: [
      { description: "Compound wall brickwork", unit: "Cum", govtCode: "IRC SP 72" },
      { description: "Bricks", unit: "Nos", govtCode: "IS 2212:1991" },
      { description: "Cement", unit: "Bag", govtCode: "IS 2212:1991" },
    ],
    labours: [{ labourType: "Mason", description: "Coping / top finish", unit: "Rft", govtCode: "IRC SP 72" }],
  },
};