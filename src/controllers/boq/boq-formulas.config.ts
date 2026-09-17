// // config/boq-formulas.config.ts
// import type { IMaterialUnit } from "../../models/materials/materialItem.model.js";

// // with this:
// export interface FormulaLineItem {
//   description: string;
//   unit: IMaterialUnit;
//   quantity: number;
//   rate: number;
//   amount: number;
//   govtCode?: string;
// }


// export interface FormulaLabourItem {
//   labourType: string;
//   description: string;
//   unit: IMaterialUnit;
//   quantity: number;
//   rate: number;
//   amount: number;
//   govtCode?: string;
// }

// export interface FormulaResult {
//   lineItems: FormulaLineItem[];
//   labours: FormulaLabourItem[];
//   warnings: string[];
// }

// // Placeholder rates — swap the SOURCE of this object (hardcoded here vs.
// // fetched from MaterialItem/LabourRate by formulaKey) later. Formula
// // functions only ever receive `rates` as a parameter, so nothing inside
// // them needs to change when real DB rates are wired in.
// export const RATES = {
//   cement: 390, sand_river: 35, sand_m: 30, aggregate_20: 34,
//   brick_solid: 9, aac_block: 50, steel_fe500: 60,
//   tile_vitrified: 55, tile_ceramic: 30, paint_int: 210, primer: 120,
//   putty: 28, waterproofing_liquid: 180, pcc_concrete: 3800,
//   pvc_pipe_4in: 280, wire_sqmm: 85, binding_wire: 80, mcb_unit: 850, db_8way: 2800,
//   labour_mason: 900, labour_helper: 600, labour_steel: 800, labour_tile: 450,
//   labour_paint: 220, labour_plaster: 700, labour_electrical: 850, labour_plumbing: 780,
//   labour_concrete: 4500,
// };

// export type BOQRates = typeof RATES;
// export type FormulaFn = (inputs: Record<string, string | number>, rates: BOQRates) => FormulaResult;

// const amt = (qty: number, rate: number) => +(qty * rate).toFixed(2);
// const num = (v: string | number | undefined, fallback = 0) => (v === undefined || v === "" ? fallback : +v);

// // ── 1. BRICKWORK ─────────────────────────────────────────────────────────
// const brickwork: FormulaFn = (p, r) => {
//   const L = num(p.length), H = num(p.height), T = num(p.thickness, 0.75);
//   const ratio = num(p.mortarRatio, 6), waste = num(p.waste, 10);
//   const wallVolCum = L * H * T * 0.0283168;
//   const bricksPerCum = T === 0.75 ? 500 : 250;
//   const bricks = Math.ceil(wallVolCum * bricksPerCum * (1 + waste / 100));
//   const dryMortarVol = wallVolCum * 0.3;
//   const cementBags = Math.ceil(dryMortarVol * (1 / (ratio + 1)) / 0.0347);
//   const sandCft = Math.ceil(dryMortarVol * (ratio / (ratio + 1)) * 35.31);
//   const labourCum = +wallVolCum.toFixed(2);

//   return {
//     lineItems: [
//       { description: `Solid bricks (${T === 0.75 ? "9" : "4.5"}-inch wall)`, unit: "Nos", quantity: bricks, rate: r.brick_solid, amount: amt(bricks, r.brick_solid), govtCode: "IS 2212:1991 Cl.5" },
//       { description: `Cement (1:${ratio} mortar)`, unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 2212:1991" },
//       { description: "River sand (mortar)", unit: "Cft", quantity: sandCft, rate: r.sand_river, amount: amt(sandCft, r.sand_river), govtCode: "IS 2116:1980" },
//     ],
//     labours: [
//       { labourType: "Mason", description: "Brickwork labour", unit: "Cum", quantity: labourCum, rate: r.labour_mason * 2, amount: amt(labourCum, r.labour_mason * 2), govtCode: "IS 2212:1991" },
//     ] as any,
//     warnings: L * H > 500 ? ["Large wall area — verify structural requirements"] : [],
//   };
// };

// // ── 2. CONCRETE MIX ──────────────────────────────────────────────────────
// const concrete: FormulaFn = (p, r) => {
//   const L = num(p.length), W = num(p.width), D = num(p.depth);
//   const grade = String(p.grade || "M20"), waste = num(p.waste, 2);
//   const RATIOS: Record<string, number[]> = { M10: [1, 3, 6, 10], M15: [1, 2, 4, 7], M20: [1, 1.5, 3, 5.5], M25: [1, 1, 2, 4], M30: [1, 1, 2, 4] };
//   const ratio = RATIOS[grade] || RATIOS.M20;
//   const wetVol = L * W * (D / 12) * 0.0283168;
//   const dryVol = wetVol * 1.54 * (1 + waste / 100);
//   const sum = ratio[1] + ratio[2] + ratio[3];
//   const cementBags = Math.ceil(dryVol * (1 / sum) / 0.0347);
//   const sandCft = Math.ceil(dryVol * (ratio[1] / sum) * 35.31);
//   const aggCft = Math.ceil(dryVol * (ratio[2] / sum) * 35.31);

//   return {
//     lineItems: [
//       { description: `Cement (${grade})`, unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 456:2000" },
//       { description: "M-Sand (fine aggregate)", unit: "Cft", quantity: sandCft, rate: r.sand_m, amount: amt(sandCft, r.sand_m), govtCode: "IS 383:2016" },
//       { description: "20mm coarse aggregate", unit: "Cft", quantity: aggCft, rate: r.aggregate_20, amount: amt(aggCft, r.aggregate_20), govtCode: "IS 383:2016" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Concrete mixing & placing labour", unit: "Cum", quantity: +wetVol.toFixed(2), rate: r.labour_concrete, amount: amt(+wetVol.toFixed(2), r.labour_concrete), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: grade === "M30" ? ["M30 is design mix — lab testing required before use"] : [],
//   };
// };

// // ── 3. PLASTERING ─────────────────────────────────────────────────────────
// const plastering: FormulaFn = (p, r) => {
//   const area = num(p.area), thick = num(p.thickness, 12), ratio = num(p.ratio, 4);
//   const areaSqm = area * 0.0929;
//   const dryVol = areaSqm * (thick / 1000) * 1.35;
//   const cementBags = Math.ceil(dryVol * (1 / (ratio + 1)) / 0.0347);
//   const sandCft = Math.ceil(dryVol * (ratio / (ratio + 1)) * 35.31);

//   return {
//     lineItems: [
//       { description: `Cement (1:${ratio} mortar, ${thick}mm thick)`, unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 1661:1972" },
//       { description: "River sand", unit: "Cft", quantity: sandCft, rate: r.sand_river, amount: amt(sandCft, r.sand_river), govtCode: "IS 1661:1972" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Plastering labour", unit: "Sqft", quantity: area, rate: r.labour_plaster / 100, amount: amt(area, r.labour_plaster / 100), govtCode: "IS 1661:1972" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 4. STEEL / RCC ────────────────────────────────────────────────────────
// const steel: FormulaFn = (p, r) => {
//   const area = num(p.builtUpArea), type = String(p.buildingType || "residential");
//   const RATE_MAP: Record<string, number> = { residential: 4.5, commercial: 5.0, "high-rise": 6.0 };
//   const steelKg = Math.ceil(area * 0.0929 * (RATE_MAP[type] || 4.5) * 10.764);
//   const steelMT = +(steelKg / 1000).toFixed(2);

//   return {
//     lineItems: [
//       { description: `TMT Fe500 steel bars (${type} thumb rule)`, unit: "Ton", quantity: steelMT, rate: r.steel_fe500 * 1000, amount: amt(steelMT, r.steel_fe500 * 1000), govtCode: "IS 456:2000 / IS 1786:2008" },
//       { description: "Steel binding wire", unit: "Kg", quantity: Math.ceil(steelKg * 0.01), rate: r.binding_wire, amount: amt(Math.ceil(steelKg * 0.01), r.binding_wire), govtCode: "IS 280:2006" },
//     ] as any,
//     labours: [
//       { labourType: "Steel Fixer", description: "Bar bending & fixing labour", unit: "Ton", quantity: steelMT, rate: r.labour_steel * 5.625, amount: amt(steelMT, r.labour_steel * 5.625), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: steelMT > 50 ? ["Large steel quantity — get structural engineer BOQ for accuracy"] : [],
//   };
// };

// // ── 5. FOUNDATION & PCC ──────────────────────────────────────────────────
// const foundation: FormulaFn = (p, r) => {
//   const L = num(p.length), W = num(p.width), D = num(p.depth, 4), soil = String(p.soilType || "sandy");
//   const excavVol = +(L * W * D * 0.0283168).toFixed(2);
//   const swell: Record<string, number> = { sandy: 1.1, clay: 1.15, "black cotton": 1.2 };
//   const looseVol = +(excavVol * (swell[soil] || 1.1)).toFixed(2);
//   const lorries = Math.ceil(looseVol / 5);
//   const pccVol = +(L * W * 0.075 * 0.0283168).toFixed(2);
//   const cementBags = Math.ceil(pccVol * 1.54 * (1 / 10) / 0.0347);

//   return {
//     lineItems: [
//       { description: "PCC M10 (75mm bed)", unit: "Cum", quantity: pccVol, rate: r.pcc_concrete, amount: amt(pccVol, r.pcc_concrete), govtCode: "IS 456:2000" },
//       { description: "Cement for PCC", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 456:2000" },
//     ] as any,
//     labours: [
//       { labourType: "Helper", description: `Earth excavation (${soil} soil)`, unit: "Cum", quantity: excavVol, rate: 650, amount: amt(excavVol, 650), govtCode: "IS 3764:1992" },
//       { labourType: "Helper", description: "Lorry disposal (loose soil)", unit: "Nos", quantity: lorries, rate: 1800, amount: amt(lorries, 1800), govtCode: "—" },
//     ] as any,
//     warnings: soil === "black cotton" ? ["Black cotton soil: extra waterproofing and lime treatment recommended"] : [],
//   };
// };

// // ── 6. FLOORING & TILING ─────────────────────────────────────────────────
// const flooring: FormulaFn = (p, r) => {
//   const area = num(p.area), tileType = String(p.tileType || "vitrified"), tileSize = num(p.tileSize, 0.36);
//   const areaSqm = area * 0.0929, waste = num(p.waste, 10);
//   const tilesNeeded = Math.ceil((areaSqm / tileSize) * (1 + waste / 100));
//   const cementBags = Math.ceil(areaSqm * 0.28);
//   const sandCft = Math.ceil(areaSqm * 0.5);
//   const tileRate = tileType === "vitrified" ? r.tile_vitrified : r.tile_ceramic;

//   return {
//     lineItems: [
//       { description: `${tileType === "vitrified" ? "Vitrified" : "Ceramic"} tiles (600×600mm)`, unit: "Nos", quantity: tilesNeeded, rate: +(tileRate * 0.36).toFixed(2), amount: amt(tilesNeeded, +(tileRate * 0.36).toFixed(2)), govtCode: "IS 1237:1980" },
//       { description: "Cement (bedding mortar)", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 1237:1980" },
//       { description: "M-Sand (bedding)", unit: "Cft", quantity: sandCft, rate: r.sand_m, amount: amt(sandCft, r.sand_m), govtCode: "IS 1237:1980" },
//     ] as any,
//     labours: [
//       { labourType: "Tile Layer", description: "Tiling labour", unit: "Sqft", quantity: area, rate: r.labour_tile / 100, amount: amt(area, r.labour_tile / 100), govtCode: "IS 1237:1980" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 7. WATERPROOFING ─────────────────────────────────────────────────────
// const waterproof: FormulaFn = (p, r) => {
//   const area = num(p.area), type = String(p.surfaceType || "terrace");
//   const areaSqm = area * 0.0929;
//   const CEMENT_RATE: Record<string, number> = { terrace: 0.23, sunkSlab: 0.65, toilet: 0.65, wall: 0.23 };
//   const cementBags = Math.ceil(areaSqm * (CEMENT_RATE[type] || 0.23));
//   const liquidKg = Math.ceil(areaSqm * 1.75);

//   return {
//     lineItems: [
//       { description: `Liquid waterproofing membrane (2-coat, ${type})`, unit: "Kg", quantity: liquidKg, rate: r.waterproofing_liquid, amount: amt(liquidKg, r.waterproofing_liquid), govtCode: "IS 2645:2003" },
//       { description: "Cement (protective screed)", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 2645:2003" },
//     ] as any,
//     labours: [
//       { labourType: "Helper", description: "Waterproofing labour", unit: "Sqft", quantity: area, rate: 3.5, amount: amt(area, 3.5), govtCode: "IS 2645:2003" },
//     ] as any,
//     warnings: type === "terrace" ? ["Terrace: provide 1% slope to drains as per IS 2645"] : [],
//   };
// };

// // ── 8. PAINT & PUTTY ─────────────────────────────────────────────────────
// const paint: FormulaFn = (p, r) => {
//   const area = num(p.wallArea), doors = num(p.doors), windows = num(p.windows);
//   const netArea = area - doors * 21 - windows * 12;
//   if (netArea <= 0) return { lineItems: [], labours: [], warnings: ["Check door/window count"] };

//   const puttyKg = +(netArea / 14.5).toFixed(1);
//   const primerL = +(netArea / 130).toFixed(1);
//   const paintL = +(netArea / 90).toFixed(1);

//   return {
//     lineItems: [
//       { description: "Wall putty (2-coat)", unit: "Kg", quantity: Math.ceil(puttyKg), rate: r.putty, amount: amt(Math.ceil(puttyKg), r.putty), govtCode: "NBC 2016" },
//       { description: "Primer (1-coat)", unit: "Litre", quantity: Math.ceil(primerL), rate: r.primer, amount: amt(Math.ceil(primerL), r.primer), govtCode: "NBC 2016" },
//       { description: "Interior emulsion (2-coat)", unit: "Litre", quantity: Math.ceil(paintL), rate: r.paint_int, amount: amt(Math.ceil(paintL), r.paint_int), govtCode: "NBC 2016" },
//     ] as any,
//     labours: [
//       { labourType: "Painter", description: "Painting labour", unit: "Sqft", quantity: netArea, rate: r.labour_paint / 100, amount: amt(netArea, r.labour_paint / 100), govtCode: "NBC 2016" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 9. RCC SLAB ───────────────────────────────────────────────────────────
// const rccSlab: FormulaFn = (p, r) => {
//   const L = num(p.length), W = num(p.width), D = num(p.depth, 5);
//   const areaSqm = L * W * 0.0929;
//   const slabVol = +(areaSqm * (D * 25.4 / 1000)).toFixed(2);
//   const steelKg = Math.ceil(slabVol * 7850 * 0.01);
//   const cementBags = Math.ceil(slabVol * 1.54 * (2 / 5.5) / 0.0347);
//   const sandCft = Math.ceil(slabVol * 1.54 * (1.5 / 5.5) * 35.31);
//   const aggCft = Math.ceil(slabVol * 1.54 * (3 / 5.5) * 35.31);

//   return {
//     lineItems: [
//       { description: `RCC M20 slab (${D}-inch thick)`, unit: "Cum", quantity: slabVol, rate: r.pcc_concrete, amount: amt(slabVol, r.pcc_concrete), govtCode: "IS 456:2000 Cl.24" },
//       { description: "Cement", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 456:2000" },
//       { description: "Sand", unit: "Cft", quantity: sandCft, rate: r.sand_m, amount: amt(sandCft, r.sand_m), govtCode: "IS 383:2016" },
//       { description: "20mm Aggregate", unit: "Cft", quantity: aggCft, rate: r.aggregate_20, amount: amt(aggCft, r.aggregate_20), govtCode: "IS 383:2016" },
//       { description: "Slab steel (1% of concrete vol × 7850)", unit: "Kg", quantity: steelKg, rate: r.steel_fe500, amount: amt(steelKg, r.steel_fe500), govtCode: "IS 456:2000" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Sqft", quantity: L * W, rate: 45, amount: amt(L * W, 45), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 10. RCC COLUMN ────────────────────────────────────────────────────────
// const rccColumn: FormulaFn = (p, r) => {
//   const cols = num(p.noOfColumns, 1), H = num(p.height, 10), size = num(p.size, 230);
//   const volPerCol = +((size / 1000) * (size / 1000) * H * 0.3048).toFixed(3);
//   const totalVol = +(volPerCol * cols).toFixed(2);
//   const steelKg = Math.ceil(totalVol * 7850 * 0.025);
//   const cementBags = Math.ceil(totalVol * 1.54 * (1 / 5.5) / 0.0347);

//   return {
//     lineItems: [
//       { description: `RCC M20 columns (${cols} nos × ${size}×${size}mm × ${H}ft)`, unit: "Cum", quantity: totalVol, rate: r.pcc_concrete, amount: amt(totalVol, r.pcc_concrete), govtCode: "IS 456:2000 Cl.39" },
//       { description: "Cement", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 456:2000" },
//       { description: "Column steel (2.5% of concrete vol)", unit: "Kg", quantity: steelKg, rate: r.steel_fe500, amount: amt(steelKg, r.steel_fe500), govtCode: "IS 456:2000" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", quantity: cols, rate: 1800, amount: amt(cols, 1800), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 11. RCC BEAM ──────────────────────────────────────────────────────────
// const rccBeam: FormulaFn = (p, r) => {
//   const beams = num(p.noOfBeams, 1), L = num(p.length, 10), B = num(p.width, 230), D = num(p.depth, 350);
//   const vol = +(beams * L * 0.3048 * (B / 1000) * (D / 1000)).toFixed(2);
//   const steelKg = Math.ceil(vol * 7850 * 0.02);
//   const cementBags = Math.ceil(vol * 1.54 * (1 / 5.5) / 0.0347);

//   return {
//     lineItems: [
//       { description: `RCC M20 beams (${beams} nos × ${B}×${D}mm × ${L}ft)`, unit: "Cum", quantity: vol, rate: r.pcc_concrete, amount: amt(vol, r.pcc_concrete), govtCode: "IS 456:2000 Cl.26" },
//       { description: "Cement", unit: "Bag", quantity: cementBags, rate: r.cement, amount: amt(cementBags, r.cement), govtCode: "IS 456:2000" },
//       { description: "Beam steel (2% of concrete vol)", unit: "Kg", quantity: steelKg, rate: r.steel_fe500, amount: amt(steelKg, r.steel_fe500), govtCode: "IS 456:2000" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", quantity: beams, rate: 1400, amount: amt(beams, 1400), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 12. STAIRCASE ─────────────────────────────────────────────────────────
// const staircase: FormulaFn = (p, r) => {
//   const floors = num(p.floors, 1), riser = num(p.riser, 175), tread = num(p.tread, 250);
//   const floorHt = 3000;
//   const nRisers = Math.round(floorHt / riser);
//   const actualRiser = Math.round(floorHt / nRisers);
//   const blondel = 2 * actualRiser + tread;
//   const concretePerFloor = +(nRisers * 0.05).toFixed(2);
//   const steelPerFloor = nRisers * 5;

//   return {
//     lineItems: [
//       { description: `RCC staircase (${nRisers} risers × ${floors} floors, M20)`, unit: "Cum", quantity: +(concretePerFloor * floors).toFixed(2), rate: r.pcc_concrete, amount: amt(+(concretePerFloor * floors).toFixed(2), r.pcc_concrete), govtCode: "IS 456:2000 Cl.33" },
//       { description: "Staircase steel", unit: "Kg", quantity: steelPerFloor * floors, rate: r.steel_fe500, amount: amt(steelPerFloor * floors, r.steel_fe500), govtCode: "IS 456:2000" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Shuttering & formwork", unit: "Sqft", quantity: +((nRisers * tread) / 304.8 * floors).toFixed(2), rate: 35, amount: amt(+((nRisers * tread) / 304.8 * floors).toFixed(2), 35), govtCode: "IS 456:2000" },
//     ] as any,
//     warnings: [
//       `Blondel check: 2R+T = ${blondel}mm (ideal: 550–650mm)`,
//       blondel < 550 || blondel > 650 ? "⚠ Blondel out of range — adjust riser/tread" : "✓ Blondel within comfortable range",
//     ],
//   };
// };

// // ── 13. DRAINAGE & PLUMBING ──────────────────────────────────────────────
// const drainage: FormulaFn = (p, r) => {
//   const len = num(p.pipeLength), dia = num(p.dia, 100);
//   const GRAD: Record<number, number> = { 40: 50, 75: 50, 100: 80, 150: 150 };
//   const fall = Math.ceil((len * 1000) / (GRAD[dia] || 80));
//   const pipeRate = +(r.pvc_pipe_4in * (dia / 100)).toFixed(2);

//   return {
//     lineItems: [
//       { description: `PVC pipe ${dia}mm dia (drainage)`, unit: "Mtr" as any, quantity: len, rate: pipeRate, amount: amt(len, pipeRate), govtCode: "IS 1742:1983" },
//       { description: "Pipe fittings & junctions (15%)", unit: "Load", quantity: 1, rate: Math.ceil(len * pipeRate * 0.15), amount: Math.ceil(len * pipeRate * 0.15), govtCode: "IS 1742:1983" },
//     ] as any,
//     labours: [
//       { labourType: "Plumber", description: "Plumbing labour", unit: "Mtr" as any, quantity: len, rate: r.labour_plumbing / 100, amount: amt(len, r.labour_plumbing / 100), govtCode: "IS 1742:1983" },
//     ] as any,
//     warnings: [`Required fall over ${len}m pipe: ${fall}mm (gradient 1:${GRAD[dia] || 80})`],
//   };
// };

// // ── 14. SEPTIC & WATER TANK ──────────────────────────────────────────────
// const septic: FormulaFn = (p) => {
//   const persons = num(p.persons, 5), lpcd = num(p.lpcd, 135);
//   const septicL = Math.max(2000, persons * 210);
//   const overheadL = Math.ceil((persons * lpcd) / 3 / 100) * 100;
//   const sumpL = Math.ceil((persons * lpcd * 2) / 3 / 100) * 100;

//   return {
//     lineItems: [
//       { description: `Septic tank (${septicL}L, IS 2470)`, unit: "Nos", quantity: 1, rate: septicL * 8, amount: septicL * 8, govtCode: "IS 2470:1985" },
//       { description: `Overhead tank (${overheadL}L)`, unit: "Nos", quantity: 1, rate: overheadL * 6, amount: overheadL * 6, govtCode: "IS 2470:1985" },
//       { description: `Underground sump (${sumpL}L)`, unit: "Nos", quantity: 1, rate: sumpL * 5, amount: sumpL * 5, govtCode: "IS 2470:1985" },
//     ] as any,
//     labours: [
//       { labourType: "Plumber", description: "Plumbing connections & labour", unit: "Load", quantity: 1, rate: 18000, amount: 18000, govtCode: "IS 2470:1985" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 15. EARTHWORK ─────────────────────────────────────────────────────────
// const earthwork: FormulaFn = (p) => {
//   const L = num(p.length), W = num(p.width), D = num(p.depth, 3);
//   const vol = +(L * W * D * 0.0283168).toFixed(2);
//   const lorries = Math.ceil((vol * 1.1) / 5);

//   return {
//     lineItems: [],
//     labours: [
//       { labourType: "Helper", description: "Site excavation", unit: "Cum", quantity: vol, rate: 600, amount: amt(vol, 600), govtCode: "IS 3764:1992" },
//       { labourType: "Helper", description: "Lorry trips (loose soil)", unit: "Nos", quantity: lorries, rate: 1800, amount: amt(lorries, 1800), govtCode: "—" },
//       { labourType: "Helper", description: "Compaction (200mm layers)", unit: "Cum", quantity: +(vol * 0.8).toFixed(2), rate: 200, amount: amt(+(vol * 0.8).toFixed(2), 200), govtCode: "IS 2720" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 16. ELECTRICAL LOAD ──────────────────────────────────────────────────
// const electrical: FormulaFn = (p, r) => {
//   const lights = num(p.lights), fans = num(p.fans), ac = num(p.ac), geysers = num(p.geysers);
//   const totalW = lights * 18 + fans * 75 + ac * 1500 + geysers * 2000;
//   const demandW = Math.round(totalW * 0.65);
//   const currentA = Math.round((demandW / 230) * 1.1);
//   const STD_MCB = [6, 10, 16, 20, 25, 32, 40, 63, 100];
//   const mcb = STD_MCB.find((v) => v >= currentA) || 100;
//   const wire = currentA <= 25 ? "6sqmm" : currentA <= 40 ? "10sqmm" : "16sqmm";
//   const wireMult = wire === "6sqmm" ? 6 : wire === "10sqmm" ? 10 : 16;

//   return {
//     lineItems: [
//       { description: `Main MCB (${mcb}A rated, ${demandW}W demand)`, unit: "Nos", quantity: 1, rate: r.mcb_unit, amount: r.mcb_unit, govtCode: "IS 732:1989" },
//       { description: `Main cable (${wire} copper)`, unit: "Mtr" as any, quantity: 20, rate: r.wire_sqmm * wireMult, amount: amt(20, r.wire_sqmm * wireMult), govtCode: "IS 732:1989" },
//       { description: "Distribution board (8-way MCB)", unit: "Nos", quantity: Math.ceil(currentA / 20), rate: r.db_8way, amount: amt(Math.ceil(currentA / 20), r.db_8way), govtCode: "IS 732:1989" },
//     ] as any,
//     labours: [
//       { labourType: "Electrician", description: "Electrical wiring labour", unit: "Point" as any, quantity: lights + fans + ac * 2 + geysers, rate: r.labour_electrical, amount: amt(lights + fans + ac * 2 + geysers, r.labour_electrical), govtCode: "IS 732:1989" },
//     ] as any,
//     warnings: totalW > 8000 ? ["High load — consult licensed electrician for detailed electrical BOQ"] : [],
//   };
// };

// // ── 17. AAC / HOLLOW BLOCK ────────────────────────────────────────────────
// const aac: FormulaFn = (p, r) => {
//   const L = num(p.length), H = num(p.height), blockSize = String(p.blockSize || "aac200");
//   const areaSqm = L * H * 0.0929;
//   const CONFIG: Record<string, { perSqm: number; cementPerCum: number; sandCft: number }> = {
//     aac200: { perSqm: 8.3, cementPerCum: 0.87, sandCft: 4.26 },
//     aac100: { perSqm: 16.7, cementPerCum: 0.5, sandCft: 2.1 },
//   };
//   const cfg = CONFIG[blockSize] || CONFIG.aac200;
//   const blocks = Math.ceil(areaSqm * cfg.perSqm * 1.05);
//   const wallCum = areaSqm * (blockSize === "aac200" ? 0.2 : 0.1);
//   const cement = Math.ceil(wallCum * cfg.cementPerCum);
//   const sand = Math.ceil(wallCum * cfg.sandCft);

//   return {
//     lineItems: [
//       { description: `AAC blocks (${blockSize === "aac200" ? "600×200×200" : "600×100×200"}mm)`, unit: "Nos", quantity: blocks, rate: r.aac_block, amount: amt(blocks, r.aac_block), govtCode: "IS 2185 Pt.3" },
//       { description: "Thin-bed mortar / cement", unit: "Bag", quantity: cement, rate: r.cement, amount: amt(cement, r.cement), govtCode: "IS 2185 Pt.3" },
//       { description: "Sand", unit: "Cft", quantity: sand, rate: r.sand_m, amount: amt(sand, r.sand_m), govtCode: "IS 2185 Pt.3" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Masonry labour (AAC)", unit: "Sqft", quantity: L * H, rate: 8, amount: amt(L * H, 8), govtCode: "IS 2185 Pt.3" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── 18. THUMB RULES (FULL BUILDING) ──────────────────────────────────────
// const thumbrule: FormulaFn = (p, r) => {
//   const area = num(p.builtUpArea);
//   const cement = Math.ceil(area * 0.0929 * 0.4);
//   const sand = Math.ceil(area * 0.0929 * 0.6 * 35.31);
//   const agg = Math.ceil(area * 0.0929 * 0.8 * 35.31);
//   const steelMT = +((area * 0.0929 * 5) / 1000).toFixed(2);

//   return {
//     lineItems: [
//       { description: "OPC 53 Cement (thumb rule 0.4 bags/sqm)", unit: "Bag", quantity: cement, rate: r.cement, amount: amt(cement, r.cement), govtCode: "BN Datta" },
//       { description: "River sand / M-Sand", unit: "Cft", quantity: sand, rate: r.sand_m, amount: amt(sand, r.sand_m), govtCode: "BN Datta" },
//       { description: "20mm aggregate", unit: "Cft", quantity: agg, rate: r.aggregate_20, amount: amt(agg, r.aggregate_20), govtCode: "BN Datta" },
//       { description: "Steel Fe500 (5 kg/sqm thumb rule)", unit: "Ton", quantity: steelMT, rate: r.steel_fe500 * 1000, amount: amt(steelMT, r.steel_fe500 * 1000), govtCode: "BN Datta" },
//     ] as any,
//     labours: [],
//     warnings: ["Thumb rule estimates — use category-wise formulas for accuracy"],
//   };
// };

// // ── 19. COMPOUND WALL ─────────────────────────────────────────────────────
// const compound: FormulaFn = (p, r) => {
//   const len = num(p.length), H = num(p.height, 5);
//   const wallVol = +(len * H * 0.75 * 0.0283168).toFixed(2);
//   const bricks = Math.ceil(wallVol * 500 * 1.1);
//   const cement = Math.ceil(wallVol * 0.3 * (1 / 7) / 0.0347);

//   return {
//     lineItems: [
//       { description: `Compound wall brickwork (${H}ft height)`, unit: "Cum", quantity: wallVol, rate: 3200, amount: amt(wallVol, 3200), govtCode: "IRC SP 72" },
//       { description: "Bricks", unit: "Nos", quantity: bricks, rate: r.brick_solid, amount: amt(bricks, r.brick_solid), govtCode: "IS 2212:1991" },
//       { description: "Cement", unit: "Bag", quantity: cement, rate: r.cement, amount: amt(cement, r.cement), govtCode: "IS 2212:1991" },
//     ] as any,
//     labours: [
//       { labourType: "Mason", description: "Coping / top finish", unit: "Rft", quantity: len, rate: 180, amount: amt(len, 180), govtCode: "IRC SP 72" },
//     ] as any,
//     warnings: [],
//   };
// };

// // ── REGISTRY ──────────────────────────────────────────────────────────────
// export const FORMULAS: Record<string, FormulaFn> = {
//   brickwork, concrete, plastering, steel, foundation, flooring, waterproof, paint,
//   rccSlab, rccColumn, rccBeam, staircase, drainage, septic, earthwork, electrical,
//   aac, thumbrule, compound,
// };




// config/boq-formulas.config.ts
import type { IMaterialUnit } from "../../models/materials/materialItem.model.js";

export interface FormulaLineItem {
  description: string;
  unit: IMaterialUnit;
  quantity: number;
  govtCode?: string;
}

export interface FormulaLabourItem {
  labourType: string;
  description: string;
  unit: IMaterialUnit;
  quantity: number;
  govtCode?: string;
}

export interface FormulaResult {
  lineItems: FormulaLineItem[];
  labours: FormulaLabourItem[];
  warnings: string[];
}

export type FormulaFn = (inputs: Record<string, string | number>) => FormulaResult;

const num = (v: string | number | undefined, fallback = 0) => (v === undefined || v === "" ? fallback : +v);

// ── 1. BRICKWORK ─────────────────────────────────────────────────────────
const brickwork: FormulaFn = (p) => {
  const L = num(p.length), H = num(p.height), T = num(p.thickness, 0.75);
  const ratio = num(p.mortarRatio, 6), waste = num(p.waste, 10);
  const wallVolCum = L * H * T * 0.0283168;
  const bricksPerCum = T === 0.75 ? 500 : 250;
  const bricks = Math.ceil(wallVolCum * bricksPerCum * (1 + waste / 100));
  const dryMortarVol = wallVolCum * 0.3;
  const cementBags = Math.ceil(dryMortarVol * (1 / (ratio + 1)) / 0.0347);
  const sandCft = Math.ceil(dryMortarVol * (ratio / (ratio + 1)) * 35.31);
  const labourCum = +wallVolCum.toFixed(2);

  return {
    lineItems: [
      { description: `Solid bricks (${T === 0.75 ? "9" : "4.5"}-inch wall)`, unit: "Nos", quantity: bricks, govtCode: "IS 2212:1991 Cl.5" },
      { description: `Cement (1:${ratio} mortar)`, unit: "Bag", quantity: cementBags, govtCode: "IS 2212:1991" },
      { description: "River sand (mortar)", unit: "Cft", quantity: sandCft, govtCode: "IS 2116:1980" },
    ],
    labours: [
      { labourType: "Mason", description: "Brickwork labour", unit: "Cum", quantity: labourCum, govtCode: "IS 2212:1991" },
    ],
    warnings: L * H > 500 ? ["Large wall area — verify structural requirements"] : [],
  };
};

// ── 2. CONCRETE MIX ──────────────────────────────────────────────────────
const concrete: FormulaFn = (p) => {
  const L = num(p.length), W = num(p.width), D = num(p.depth);
  const grade = String(p.grade || "M20"), waste = num(p.waste, 2);
  // const RATIOS: Record<string, number[]> = { M10: [1, 3, 6, 10], M15: [1, 2, 4, 7], M20: [1, 1.5, 3, 5.5], M25: [1, 1, 2, 4], M30: [1, 1, 2, 4] };
  // const ratio = RATIOS[grade] || RATIOS.M20;

  const RATIOS = {
    M10: [1, 3, 6, 10],
    M15: [1, 2, 4, 7],
    M20: [1, 1.5, 3, 5.5],
    M25: [1, 1, 2, 4],
    M30: [1, 1, 2, 4],
  } as const;
  const ratio = RATIOS[grade as keyof typeof RATIOS] ?? RATIOS.M20;

  const wetVol = L * W * (D / 12) * 0.0283168;
  const dryVol = wetVol * 1.54 * (1 + waste / 100);
  const sum = ratio[1] + ratio[2] + ratio[3];
  const cementBags = Math.ceil(dryVol * (1 / sum) / 0.0347);
  const sandCft = Math.ceil(dryVol * (ratio[1] / sum) * 35.31);
  const aggCft = Math.ceil(dryVol * (ratio[2] / sum) * 35.31);

  return {
    lineItems: [
      { description: `Cement (${grade})`, unit: "Bag", quantity: cementBags, govtCode: "IS 456:2000" },
      { description: "M-Sand (fine aggregate)", unit: "Cft", quantity: sandCft, govtCode: "IS 383:2016" },
      { description: "20mm coarse aggregate", unit: "Cft", quantity: aggCft, govtCode: "IS 383:2016" },
    ],
    labours: [
      { labourType: "Mason", description: "Concrete mixing & placing labour", unit: "Cum", quantity: +wetVol.toFixed(2), govtCode: "IS 456:2000" },
    ],
    warnings: grade === "M30" ? ["M30 is design mix — lab testing required before use"] : [],
  };
};

// ── 3. PLASTERING ─────────────────────────────────────────────────────────
const plastering: FormulaFn = (p) => {
  const area = num(p.area), thick = num(p.thickness, 12), ratio = num(p.ratio, 4);
  const areaSqm = area * 0.0929;
  const dryVol = areaSqm * (thick / 1000) * 1.35;
  const cementBags = Math.ceil(dryVol * (1 / (ratio + 1)) / 0.0347);
  const sandCft = Math.ceil(dryVol * (ratio / (ratio + 1)) * 35.31);

  return {
    lineItems: [
      { description: `Cement (1:${ratio} mortar, ${thick}mm thick)`, unit: "Bag", quantity: cementBags, govtCode: "IS 1661:1972" },
      { description: "River sand", unit: "Cft", quantity: sandCft, govtCode: "IS 1661:1972" },
    ],
    labours: [
      { labourType: "Mason", description: "Plastering labour", unit: "Sqft", quantity: area, govtCode: "IS 1661:1972" },
    ],
    warnings: [],
  };
};

// ── 4. STEEL / RCC ────────────────────────────────────────────────────────
const steel: FormulaFn = (p) => {
  const area = num(p.builtUpArea), type = String(p.buildingType || "residential");
  const RATE_MAP: Record<string, number> = { residential: 4.5, commercial: 5.0, "high-rise": 6.0 };
  const steelKg = Math.ceil(area * 0.0929 * (RATE_MAP[type] || 4.5) * 10.764);
  const steelMT = +(steelKg / 1000).toFixed(2);

  return {
    lineItems: [
      { description: `TMT Fe500 steel bars (${type} thumb rule)`, unit: "Ton", quantity: steelMT, govtCode: "IS 456:2000 / IS 1786:2008" },
      { description: "Steel binding wire", unit: "Kg", quantity: Math.ceil(steelKg * 0.01), govtCode: "IS 280:2006" },
    ],
    labours: [
      { labourType: "Steel Fixer", description: "Bar bending & fixing labour", unit: "Ton", quantity: steelMT, govtCode: "IS 456:2000" },
    ],
    warnings: steelMT > 50 ? ["Large steel quantity — get structural engineer BOQ for accuracy"] : [],
  };
};

// ── 5. FOUNDATION & PCC ──────────────────────────────────────────────────
const foundation: FormulaFn = (p) => {
  const L = num(p.length), W = num(p.width), D = num(p.depth, 4), soil = String(p.soilType || "sandy");
  const excavVol = +(L * W * D * 0.0283168).toFixed(2);
  const swell: Record<string, number> = { sandy: 1.1, clay: 1.15, "black cotton": 1.2 };
  const looseVol = +(excavVol * (swell[soil] || 1.1)).toFixed(2);
  const lorries = Math.ceil(looseVol / 5);
  const pccVol = +(L * W * 0.075 * 0.0283168).toFixed(2);
  const cementBags = Math.ceil(pccVol * 1.54 * (1 / 10) / 0.0347);

  return {
    lineItems: [
      { description: "PCC M10 (75mm bed)", unit: "Cum", quantity: pccVol, govtCode: "IS 456:2000" },
      { description: "Cement for PCC", unit: "Bag", quantity: cementBags, govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Helper", description: `Earth excavation (${soil} soil)`, unit: "Cum", quantity: excavVol, govtCode: "IS 3764:1992" },
      { labourType: "Helper", description: "Lorry disposal (loose soil)", unit: "Nos", quantity: lorries, govtCode: "—" },
    ],
    warnings: soil === "black cotton" ? ["Black cotton soil: extra waterproofing and lime treatment recommended"] : [],
  };
};

// ── 6. FLOORING & TILING ─────────────────────────────────────────────────
const flooring: FormulaFn = (p) => {
  const area = num(p.area), tileType = String(p.tileType || "vitrified"), tileSize = num(p.tileSize, 0.36);
  const areaSqm = area * 0.0929, waste = num(p.waste, 10);
  const tilesNeeded = Math.ceil((areaSqm / tileSize) * (1 + waste / 100));
  const cementBags = Math.ceil(areaSqm * 0.28);
  const sandCft = Math.ceil(areaSqm * 0.5);

  return {
    lineItems: [
      { description: `${tileType === "vitrified" ? "Vitrified" : "Ceramic"} tiles (600×600mm)`, unit: "Nos", quantity: tilesNeeded, govtCode: "IS 1237:1980" },
      { description: "Cement (bedding mortar)", unit: "Bag", quantity: cementBags, govtCode: "IS 1237:1980" },
      { description: "M-Sand (bedding)", unit: "Cft", quantity: sandCft, govtCode: "IS 1237:1980" },
    ],
    labours: [
      { labourType: "Tile Layer", description: "Tiling labour", unit: "Sqft", quantity: area, govtCode: "IS 1237:1980" },
    ],
    warnings: [],
  };
};

// ── 7. WATERPROOFING ─────────────────────────────────────────────────────
const waterproof: FormulaFn = (p) => {
  const area = num(p.area), type = String(p.surfaceType || "terrace");
  const areaSqm = area * 0.0929;
  const CEMENT_RATE: Record<string, number> = { terrace: 0.23, sunkSlab: 0.65, toilet: 0.65, wall: 0.23 };
  const cementBags = Math.ceil(areaSqm * (CEMENT_RATE[type] || 0.23));
  const liquidKg = Math.ceil(areaSqm * 1.75);

  return {
    lineItems: [
      { description: `Liquid waterproofing membrane (2-coat, ${type})`, unit: "Kg", quantity: liquidKg, govtCode: "IS 2645:2003" },
      { description: "Cement (protective screed)", unit: "Bag", quantity: cementBags, govtCode: "IS 2645:2003" },
    ],
    labours: [
      { labourType: "Helper", description: "Waterproofing labour", unit: "Sqft", quantity: area, govtCode: "IS 2645:2003" },
    ],
    warnings: type === "terrace" ? ["Terrace: provide 1% slope to drains as per IS 2645"] : [],
  };
};

// ── 8. PAINT & PUTTY ─────────────────────────────────────────────────────
const paint: FormulaFn = (p) => {
  const area = num(p.wallArea), doors = num(p.doors), windows = num(p.windows);
  const netArea = area - doors * 21 - windows * 12;
  if (netArea <= 0) return { lineItems: [], labours: [], warnings: ["Check door/window count"] };

  const puttyKg = +(netArea / 14.5).toFixed(1);
  const primerL = +(netArea / 130).toFixed(1);
  const paintL = +(netArea / 90).toFixed(1);

  return {
    lineItems: [
      { description: "Wall putty (2-coat)", unit: "Kg", quantity: Math.ceil(puttyKg), govtCode: "NBC 2016" },
      { description: "Primer (1-coat)", unit: "Litre", quantity: Math.ceil(primerL), govtCode: "NBC 2016" },
      { description: "Interior emulsion (2-coat)", unit: "Litre", quantity: Math.ceil(paintL), govtCode: "NBC 2016" },
    ],
    labours: [
      { labourType: "Painter", description: "Painting labour", unit: "Sqft", quantity: netArea, govtCode: "NBC 2016" },
    ],
    warnings: [],
  };
};

// ── 9. RCC SLAB ───────────────────────────────────────────────────────────
const rccSlab: FormulaFn = (p) => {
  const L = num(p.length), W = num(p.width), D = num(p.depth, 5);
  const areaSqm = L * W * 0.0929;
  const slabVol = +(areaSqm * (D * 25.4 / 1000)).toFixed(2);
  const steelKg = Math.ceil(slabVol * 7850 * 0.01);
  const cementBags = Math.ceil(slabVol * 1.54 * (2 / 5.5) / 0.0347);
  const sandCft = Math.ceil(slabVol * 1.54 * (1.5 / 5.5) * 35.31);
  const aggCft = Math.ceil(slabVol * 1.54 * (3 / 5.5) * 35.31);

  return {
    lineItems: [
      { description: `RCC M20 slab (${D}-inch thick)`, unit: "Cum", quantity: slabVol, govtCode: "IS 456:2000 Cl.24" },
      { description: "Cement", unit: "Bag", quantity: cementBags, govtCode: "IS 456:2000" },
      { description: "Sand", unit: "Cft", quantity: sandCft, govtCode: "IS 383:2016" },
      { description: "20mm Aggregate", unit: "Cft", quantity: aggCft, govtCode: "IS 383:2016" },
      { description: "Slab steel (1% of concrete vol × 7850)", unit: "Kg", quantity: steelKg, govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Sqft", quantity: L * W, govtCode: "IS 456:2000" },
    ],
    warnings: [],
  };
};

// ── 10. RCC COLUMN ────────────────────────────────────────────────────────
const rccColumn: FormulaFn = (p) => {
  const cols = num(p.noOfColumns, 1), H = num(p.height, 10), size = num(p.size, 230);
  const volPerCol = +((size / 1000) * (size / 1000) * H * 0.3048).toFixed(3);
  const totalVol = +(volPerCol * cols).toFixed(2);
  const steelKg = Math.ceil(totalVol * 7850 * 0.025);
  const cementBags = Math.ceil(totalVol * 1.54 * (1 / 5.5) / 0.0347);

  return {
    lineItems: [
      { description: `RCC M20 columns (${cols} nos × ${size}×${size}mm × ${H}ft)`, unit: "Cum", quantity: totalVol, govtCode: "IS 456:2000 Cl.39" },
      { description: "Cement", unit: "Bag", quantity: cementBags, govtCode: "IS 456:2000" },
      { description: "Column steel (2.5% of concrete vol)", unit: "Kg", quantity: steelKg, govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", quantity: cols, govtCode: "IS 456:2000" },
    ],
    warnings: [],
  };
};

// ── 11. RCC BEAM ──────────────────────────────────────────────────────────
const rccBeam: FormulaFn = (p) => {
  const beams = num(p.noOfBeams, 1), L = num(p.length, 10), B = num(p.width, 230), D = num(p.depth, 350);
  const vol = +(beams * L * 0.3048 * (B / 1000) * (D / 1000)).toFixed(2);
  const steelKg = Math.ceil(vol * 7850 * 0.02);
  const cementBags = Math.ceil(vol * 1.54 * (1 / 5.5) / 0.0347);

  return {
    lineItems: [
      { description: `RCC M20 beams (${beams} nos × ${B}×${D}mm × ${L}ft)`, unit: "Cum", quantity: vol, govtCode: "IS 456:2000 Cl.26" },
      { description: "Cement", unit: "Bag", quantity: cementBags, govtCode: "IS 456:2000" },
      { description: "Beam steel (2% of concrete vol)", unit: "Kg", quantity: steelKg, govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Mason", description: "Shuttering & concrete labour", unit: "Nos", quantity: beams, govtCode: "IS 456:2000" },
    ],
    warnings: [],
  };
};

// ── 12. STAIRCASE ─────────────────────────────────────────────────────────
const staircase: FormulaFn = (p) => {
  const floors = num(p.floors, 1), riser = num(p.riser, 175), tread = num(p.tread, 250);
  const floorHt = 3000;
  const nRisers = Math.round(floorHt / riser);
  const actualRiser = Math.round(floorHt / nRisers);
  const blondel = 2 * actualRiser + tread;
  const concretePerFloor = +(nRisers * 0.05).toFixed(2);
  const steelPerFloor = nRisers * 5;

  return {
    lineItems: [
      { description: `RCC staircase (${nRisers} risers × ${floors} floors, M20)`, unit: "Cum", quantity: +(concretePerFloor * floors).toFixed(2), govtCode: "IS 456:2000 Cl.33" },
      { description: "Staircase steel", unit: "Kg", quantity: steelPerFloor * floors, govtCode: "IS 456:2000" },
    ],
    labours: [
      { labourType: "Mason", description: "Shuttering & formwork", unit: "Sqft", quantity: +((nRisers * tread) / 304.8 * floors).toFixed(2), govtCode: "IS 456:2000" },
    ],
    warnings: [
      `Blondel check: 2R+T = ${blondel}mm (ideal: 550–650mm)`,
      blondel < 550 || blondel > 650 ? "⚠ Blondel out of range — adjust riser/tread" : "✓ Blondel within comfortable range",
    ],
  };
};

// ── 13. DRAINAGE & PLUMBING ──────────────────────────────────────────────
const drainage: FormulaFn = (p) => {
  const len = num(p.pipeLength), dia = num(p.dia, 100);
  const GRAD: Record<number, number> = { 40: 50, 75: 50, 100: 80, 150: 150 };
  const fall = Math.ceil((len * 1000) / (GRAD[dia] || 80));

  return {
    lineItems: [
      { description: `PVC pipe ${dia}mm dia (drainage)`, unit: "Mtr" as IMaterialUnit, quantity: len, govtCode: "IS 1742:1983" },
      { description: "Pipe fittings & junctions", unit: "Load", quantity: 1, govtCode: "IS 1742:1983" },
    ],
    labours: [
      { labourType: "Plumber", description: "Plumbing labour", unit: "Mtr" as IMaterialUnit, quantity: len, govtCode: "IS 1742:1983" },
    ],
    warnings: [`Required fall over ${len}m pipe: ${fall}mm (gradient 1:${GRAD[dia] || 80})`],
  };
};

// ── 14. SEPTIC & WATER TANK ──────────────────────────────────────────────
const septic: FormulaFn = (p) => {
  const persons = num(p.persons, 5), lpcd = num(p.lpcd, 135);
  const septicL = Math.max(2000, persons * 210);
  const overheadL = Math.ceil((persons * lpcd) / 3 / 100) * 100;
  const sumpL = Math.ceil((persons * lpcd * 2) / 3 / 100) * 100;

  return {
    lineItems: [
      { description: `Septic tank (${septicL}L, IS 2470)`, unit: "Nos", quantity: 1, govtCode: "IS 2470:1985" },
      { description: `Overhead tank (${overheadL}L)`, unit: "Nos", quantity: 1, govtCode: "IS 2470:1985" },
      { description: `Underground sump (${sumpL}L)`, unit: "Nos", quantity: 1, govtCode: "IS 2470:1985" },
    ],
    labours: [
      { labourType: "Plumber", description: "Plumbing connections & labour", unit: "Load", quantity: 1, govtCode: "IS 2470:1985" },
    ],
    warnings: [],
  };
};

// ── 15. EARTHWORK ─────────────────────────────────────────────────────────
const earthwork: FormulaFn = (p) => {
  const L = num(p.length), W = num(p.width), D = num(p.depth, 3);
  const vol = +(L * W * D * 0.0283168).toFixed(2);
  const lorries = Math.ceil((vol * 1.1) / 5);

  return {
    lineItems: [],
    labours: [
      { labourType: "Helper", description: "Site excavation", unit: "Cum", quantity: vol, govtCode: "IS 3764:1992" },
      { labourType: "Helper", description: "Lorry trips (loose soil)", unit: "Nos", quantity: lorries, govtCode: "—" },
      { labourType: "Helper", description: "Compaction (200mm layers)", unit: "Cum", quantity: +(vol * 0.8).toFixed(2), govtCode: "IS 2720" },
    ],
    warnings: [],
  };
};

// ── 16. ELECTRICAL LOAD ──────────────────────────────────────────────────
const electrical: FormulaFn = (p) => {
  const lights = num(p.lights), fans = num(p.fans), ac = num(p.ac), geysers = num(p.geysers);
  const totalW = lights * 18 + fans * 75 + ac * 1500 + geysers * 2000;
  const demandW = Math.round(totalW * 0.65);
  const currentA = Math.round((demandW / 230) * 1.1);
  const STD_MCB = [6, 10, 16, 20, 25, 32, 40, 63, 100];
  const mcb = STD_MCB.find((v) => v >= currentA) || 100;
  const wire = currentA <= 25 ? "6sqmm" : currentA <= 40 ? "10sqmm" : "16sqmm";

  return {
    lineItems: [
      { description: `Main MCB (${mcb}A rated, ${demandW}W demand)`, unit: "Nos", quantity: 1, govtCode: "IS 732:1989" },
      { description: `Main cable (${wire} copper)`, unit: "Mtr" as IMaterialUnit, quantity: 20, govtCode: "IS 732:1989" },
      { description: "Distribution board (8-way MCB)", unit: "Nos", quantity: Math.ceil(currentA / 20), govtCode: "IS 732:1989" },
    ],
    labours: [
      { labourType: "Electrician", description: "Electrical wiring labour", unit: "Point" as IMaterialUnit, quantity: lights + fans + ac * 2 + geysers, govtCode: "IS 732:1989" },
    ],
    warnings: totalW > 8000 ? ["High load — consult licensed electrician for detailed electrical BOQ"] : [],
  };
};

// ── 17. AAC / HOLLOW BLOCK ────────────────────────────────────────────────
const aac: FormulaFn = (p) => {
  const L = num(p.length), H = num(p.height), blockSize = String(p.blockSize || "aac200");
  const areaSqm = L * H * 0.0929;
  // const CONFIG: Record<string, { perSqm: number; cementPerCum: number; sandCft: number }> = {
  //   aac200: { perSqm: 8.3, cementPerCum: 0.87, sandCft: 4.26 },
  //   aac100: { perSqm: 16.7, cementPerCum: 0.5, sandCft: 2.1 },
  // };
  // const cfg = CONFIG[blockSize] || CONFIG.aac200;

  const CONFIG = {
    aac200: { perSqm: 8.3, cementPerCum: 0.87, sandCft: 4.26 },
    aac100: { perSqm: 16.7, cementPerCum: 0.5, sandCft: 2.1 },
  } as const;
  const cfg = CONFIG[blockSize as keyof typeof CONFIG] ?? CONFIG.aac200;

  const blocks = Math.ceil(areaSqm * cfg.perSqm * 1.05);
  const wallCum = areaSqm * (blockSize === "aac200" ? 0.2 : 0.1);
  const cement = Math.ceil(wallCum * cfg.cementPerCum);
  const sand = Math.ceil(wallCum * cfg.sandCft);

  return {
    lineItems: [
      { description: `AAC blocks (${blockSize === "aac200" ? "600×200×200" : "600×100×200"}mm)`, unit: "Nos", quantity: blocks, govtCode: "IS 2185 Pt.3" },
      { description: "Thin-bed mortar / cement", unit: "Bag", quantity: cement, govtCode: "IS 2185 Pt.3" },
      { description: "Sand", unit: "Cft", quantity: sand, govtCode: "IS 2185 Pt.3" },
    ],
    labours: [
      { labourType: "Mason", description: "Masonry labour (AAC)", unit: "Sqft", quantity: L * H, govtCode: "IS 2185 Pt.3" },
    ],
    warnings: [],
  };
};

// ── 18. THUMB RULES (FULL BUILDING) ──────────────────────────────────────
const thumbrule: FormulaFn = (p) => {
  const area = num(p.builtUpArea);
  const cement = Math.ceil(area * 0.0929 * 0.4);
  const sand = Math.ceil(area * 0.0929 * 0.6 * 35.31);
  const agg = Math.ceil(area * 0.0929 * 0.8 * 35.31);
  const steelMT = +((area * 0.0929 * 5) / 1000).toFixed(2);

  return {
    lineItems: [
      { description: "OPC 53 Cement (thumb rule 0.4 bags/sqm)", unit: "Bag", quantity: cement, govtCode: "BN Datta" },
      { description: "River sand / M-Sand", unit: "Cft", quantity: sand, govtCode: "BN Datta" },
      { description: "20mm aggregate", unit: "Cft", quantity: agg, govtCode: "BN Datta" },
      { description: "Steel Fe500 (5 kg/sqm thumb rule)", unit: "Ton", quantity: steelMT, govtCode: "BN Datta" },
    ],
    labours: [],
    warnings: ["Thumb rule estimates — use category-wise formulas for accuracy"],
  };
};

// ── 19. COMPOUND WALL ─────────────────────────────────────────────────────
const compound: FormulaFn = (p) => {
  const len = num(p.length), H = num(p.height, 5);
  const wallVol = +(len * H * 0.75 * 0.0283168).toFixed(2);
  const bricks = Math.ceil(wallVol * 500 * 1.1);
  const cement = Math.ceil(wallVol * 0.3 * (1 / 7) / 0.0347);

  return {
    lineItems: [
      { description: `Compound wall brickwork (${H}ft height)`, unit: "Cum", quantity: wallVol, govtCode: "IRC SP 72" },
      { description: "Bricks", unit: "Nos", quantity: bricks, govtCode: "IS 2212:1991" },
      { description: "Cement", unit: "Bag", quantity: cement, govtCode: "IS 2212:1991" },
    ],
    labours: [
      { labourType: "Mason", description: "Coping / top finish", unit: "Rft", quantity: len, govtCode: "IRC SP 72" },
    ],
    warnings: [],
  };
};

// ── REGISTRY ──────────────────────────────────────────────────────────────
export const FORMULAS: Record<string, FormulaFn> = {
  brickwork, concrete, plastering, steel, foundation, flooring, waterproof, paint,
  rccSlab, rccColumn, rccBeam, staircase, drainage, septic, earthwork, electrical,
  aac, thumbrule, compound,
};