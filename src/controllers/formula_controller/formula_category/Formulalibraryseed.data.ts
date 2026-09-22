// /**
//  * Seed data for the Formula Engine module — extracted directly from the
//  * Formula Engine Library demo (CATS + FORMULAS.push blocks, including the
//  * later CATS.push() that adds Ceilings & Dry Partitions, Fabrication &
//  * Metalwork, Roofing & Sheeting, and External & Site Works — these ARE
//  * officially registered categories in the source, not orphaned drafts as
//  * earlier believed; that was a mistake from only reading the array's first
//  * declaration and missing the later .push() call further down the file).
//  *
//  * Used by formulaCategory.service.ts's initializeFormulaLibrary() to
//  * populate a brand-new organization's Formula Engine on first setup.
//  *
//  * NOTE: executable calculator logic (calc.r) is deliberately NOT included
//  * here — see the "open decision" note in formulaItem.model.ts. Only
//  * calcInputs (structured, safe data) are carried over; calcOutputs and
//  * outputExpression are left for the org/team to fill in once the
//  * evaluator approach (mathjs vs hardcoded TS) is decided.
//  */

// export interface IFormulaCategorySeed {
//   categoryKey: string;
//   categoryName: string;
//   engineModules: string;
// }

// export interface IFormulaItemSeed {
//   formulaCode: string;
//   name: string;
//   categoryKey: string; // resolved to categoryId at seed time
//   type: string | null;
//   confidence: string;
//   reference: string | null;
//   unit: string | null;
//   example: string | null;
//   workedExample: string | null;
//   note: string | null;
//   tags: string[];
//   variables: { key: string; label: string; unit: string | null }[];
//   calcInputs: { key: string; label: string; unit: string | null; defaultValue: number | null }[];
// }

// export const FORMULA_CATEGORY_SEED: IFormulaCategorySeed[] = [
//   {
//     "categoryKey": "CONV",
//     "categoryName": "Conversions & Site Units",
//     "engineModules": "units.js"
//   },
//   {
//     "categoryKey": "EARTH",
//     "categoryName": "Earthwork & Foundation",
//     "engineModules": "earthwork.js / foundation.js"
//   },
//   {
//     "categoryKey": "CONC",
//     "categoryName": "Concrete & Mix Design",
//     "engineModules": "concrete.js"
//   },
//   {
//     "categoryKey": "MASON",
//     "categoryName": "Masonry — Brick & Block",
//     "engineModules": "brickwork.js / masonryBlock.js"
//   },
//   {
//     "categoryKey": "PLAST",
//     "categoryName": "Plastering & Surface Finish",
//     "engineModules": "plastering.js"
//   },
//   {
//     "categoryKey": "STEEL",
//     "categoryName": "Steel & RCC Detailing",
//     "engineModules": "steel.js / rccBeam.js"
//   },
//   {
//     "categoryKey": "FORM",
//     "categoryName": "Formwork & Shuttering",
//     "engineModules": "formwork.js"
//   },
//   {
//     "categoryKey": "FLOOR",
//     "categoryName": "Flooring & Tiling",
//     "engineModules": "flooring.js"
//   },
//   {
//     "categoryKey": "WPF",
//     "categoryName": "Waterproofing",
//     "engineModules": "waterproofing.js"
//   },
//   {
//     "categoryKey": "PAINT",
//     "categoryName": "Painting & Putty",
//     "engineModules": "paint.js"
//   },
//   {
//     "categoryKey": "PLUMB",
//     "categoryName": "Plumbing, Drainage & Water",
//     "engineModules": "drainage.js / septicTank.js"
//   },
//   {
//     "categoryKey": "ELEC",
//     "categoryName": "Electrical",
//     "engineModules": "electrical.js"
//   },
//   {
//     "categoryKey": "LAB",
//     "categoryName": "Labour & Productivity",
//     "engineModules": "labour.js"
//   },
//   {
//     "categoryKey": "TIME",
//     "categoryName": "Time, Curing & Scheduling",
//     "engineModules": "schedule.js"
//   },
//   {
//     "categoryKey": "THUMB",
//     "categoryName": "Whole-Building Thumb Rules",
//     "engineModules": "thumbRules.js"
//   },
//   {
//     "categoryKey": "COST",
//     "categoryName": "Cost, Wastage & Statutory",
//     "engineModules": "costing.js"
//   },
//   {
//     "categoryKey": "DESIGN",
//     "categoryName": "Structural Design Checks",
//     "engineModules": "rccSlab.js / rccColumn.js"
//   },
//   {
//     "categoryKey": "CEIL",
//     "categoryName": "Ceilings & Dry Partitions",
//     "engineModules": "ceiling.js"
//   },
//   {
//     "categoryKey": "FAB",
//     "categoryName": "Fabrication & Metalwork",
//     "engineModules": "fabrication.js"
//   },
//   {
//     "categoryKey": "ROOF",
//     "categoryName": "Roofing & Sheeting",
//     "engineModules": "roofing.js"
//   },
//   {
//     "categoryKey": "EXT",
//     "categoryName": "External & Site Works",
//     "engineModules": "external.js"
//   }
// ];

// export const FORMULA_ITEM_SEED: IFormulaItemSeed[] = [
//   {
//     "formulaCode": "CONV-01",
//     "name": "Area conversion — sqft ↔ sqm",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Certain",
//     "reference": "SI definition",
//     "unit": "sqm / sqft",
//     "example": "1 sqm = 10.7639 sqft\nArea(sqm) = Area(sqft) ÷ 10.7639\nArea(sqft) = Area(sqm) × 10.7639",
//     "workedExample": "Ayapakkam site, built-up 2,400 sqft\n= 2400 ÷ 10.7639\n= 222.97 sqm",
//     "note": "All CivilMind formulas compute internally in SI (m, sqm, cum) and display in the unit the site team uses. Never mix the two inside one formula.",
//     "tags": [
//       "conversion",
//       "area",
//       "sqft",
//       "sqm"
//     ],
//     "variables": [
//       {
//         "key": "A_sqft",
//         "label": "Area in square feet",
//         "unit": "sqft"
//       },
//       {
//         "key": "A_sqm",
//         "label": "Area in square metre",
//         "unit": "sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "a",
//         "label": "Area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-02",
//     "name": "Volume conversion — cft ↔ cum",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Certain",
//     "reference": "SI definition",
//     "unit": "cum / cft",
//     "example": "1 cum = 35.3147 cft\nVol(cum) = Vol(cft) ÷ 35.3147",
//     "workedExample": "Sand ordered 300 cft\n= 300 ÷ 35.3147\n= 8.50 cum",
//     "note": "Sand and jelly are quoted in cft or in \"units\" in Chennai; concrete and mortar formulas need cum. Convert once, at input.",
//     "tags": [
//       "conversion",
//       "volume",
//       "cft",
//       "cum"
//     ],
//     "variables": [
//       {
//         "key": "V_cft",
//         "label": "Volume in cubic feet",
//         "unit": "cft"
//       },
//       {
//         "key": "V_cum",
//         "label": "Volume in cubic metre",
//         "unit": "cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "v",
//         "label": "Volume",
//         "unit": "cft",
//         "defaultValue": 300
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-03",
//     "name": "Cement bag — weight, volume and bags per cum",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Certain",
//     "reference": "IS 269:2015",
//     "unit": "bags",
//     "example": "1 bag = 50 kg\nDensity of cement = 1440 kg/cum\nVolume of 1 bag = 50 ÷ 1440 = 0.0347 cum = 1.226 cft (34.7 litres)\nBags per cum = 1 ÷ 0.0347 = 28.8 bags",
//     "workedExample": "Cement volume required = 0.28 cum\nBags = 0.28 ÷ 0.0347 = 8.07 → order 9 bags (no part bags on site)",
//     "note": "Always round cement UP to whole bags at the line-item level, not at the BOQ total — part bags cannot be procured and half-open bags harden.",
//     "tags": [
//       "cement",
//       "bag",
//       "conversion",
//       "density"
//     ],
//     "variables": [
//       {
//         "key": "W",
//         "label": "Bag weight",
//         "unit": "kg"
//       },
//       {
//         "key": "ρ",
//         "label": "Loose bulk density of cement",
//         "unit": "kg/cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "c",
//         "label": "Cement volume",
//         "unit": "cum",
//         "defaultValue": 0.28
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-04",
//     "name": "Steel bar unit weight — d²/162",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Certain",
//     "reference": "IS 1786:2008",
//     "unit": "kg/m",
//     "example": "W (kg/m) = d² ÷ 162\nDerivation: W = (π/4 × d²/10⁶) × 7850 = d² ÷ 162.28",
//     "workedExample": "12 mm bar, 240 m total\nW = 12² ÷ 162 = 144 ÷ 162 = 0.889 kg/m\nWeight = 240 × 0.889 = 213.3 kg",
//     "note": "Standard unit weights (kg/m): 6→0.222, 8→0.395, 10→0.617, 12→0.888, 16→1.580, 20→2.469, 25→3.858, 32→6.321. Mill tolerance under IS 1786 is ±7% for ≤10 mm, ±5% for 12–16 mm, ±3% above — weigh-bridge slips will differ slightly from theory.",
//     "tags": [
//       "steel",
//       "bar",
//       "weight",
//       "rebar",
//       "d2/162"
//     ],
//     "variables": [
//       {
//         "key": "d",
//         "label": "Bar diameter",
//         "unit": "mm"
//       },
//       {
//         "key": "W",
//         "label": "Unit weight",
//         "unit": "kg/m"
//       },
//       {
//         "key": "L",
//         "label": "Total running length",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "d",
//         "label": "Bar dia",
//         "unit": "mm",
//         "defaultValue": 12
//       },
//       {
//         "key": "L",
//         "label": "Total length",
//         "unit": "m",
//         "defaultValue": 240
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-05",
//     "name": "Standard material densities",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Likely",
//     "reference": "IS 875 Pt.1",
//     "unit": "kg/cum",
//     "example": "Cement 1440 · Dry sand 1600 (river, loose) · Coarse aggregate 1500\nPCC 2400 · RCC 2500 · Brick masonry 1920 · AAC block 550–650\nSteel 7850 · Water 1000 · Bitumen 1040",
//     "workedExample": "Self-weight of a 125 mm RCC slab\n= 0.125 × 2500 = 312.5 kg/sqm = 3.13 kN/sqm",
//     "note": "Sand density varies 1450–1750 kg/cum with moisture and source. For dead-load design use IS 875 Part 1 values; for procurement use the supplier weigh-bridge figure.",
//     "tags": [
//       "density",
//       "dead load",
//       "unit weight"
//     ],
//     "variables": [
//       {
//         "key": "ρ",
//         "label": "Bulk density",
//         "unit": "kg/cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "r",
//         "label": "Density",
//         "unit": "kg/cum",
//         "defaultValue": 2500
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-06",
//     "name": "Tamil Nadu trade \"unit\" — sand & jelly",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Likely",
//     "reference": "Local trade practice",
//     "unit": "units",
//     "example": "1 unit = 100 cft = 2.832 cum\nUnits = Volume(cft) ÷ 100\nTypical lorry: 1 unit (small), 2 units (medium), 3 units (full tipper)",
//     "workedExample": "Brickwork mortar sand for the job = 470 cft\nUnits = 470 ÷ 100 = 4.7 → order 5 units\nAt ₹5,200 per unit ≈ ₹26,000",
//     "note": "This is a trade convention, not a code unit — confirm with each supplier whether their \"unit\" is 100 cft, and whether it is measured loose in the lorry body or after unloading. The difference is routinely 5–8%.",
//     "tags": [
//       "sand",
//       "jelly",
//       "unit",
//       "chennai",
//       "procurement",
//       "local"
//     ],
//     "variables": [
//       {
//         "key": "U",
//         "label": "Trade units",
//         "unit": "units"
//       },
//       {
//         "key": "V",
//         "label": "Volume",
//         "unit": "cft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "v",
//         "label": "Volume required",
//         "unit": "cft",
//         "defaultValue": 470
//       },
//       {
//         "key": "r",
//         "label": "Rate per unit",
//         "unit": "INR",
//         "defaultValue": 5200
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-07",
//     "name": "Brick sizes and bricks per cubic metre",
//     "categoryKey": "CONV",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 1077:1992 · IS 2212:1991",
//     "unit": "nos/cum",
//     "example": "Modular brick 190×90×90 mm, with 10 mm joint → 200×100×100\nBricks/cum = 1 ÷ (0.20 × 0.10 × 0.10) = 500 nos\n\nChennai country brick ≈ 230×110×75 mm, with 10 mm joint → 240×120×85\nBricks/cum = 1 ÷ (0.240 × 0.120 × 0.085) = 408 nos",
//     "workedExample": "9 inch wall, 10 m × 3 m = 30 sqm, thickness 0.23 m\nVolume = 30 × 0.23 = 6.9 cum\nModular: 6.9 × 500 = 3,450 nos + 5% wastage = 3,623 nos",
//     "note": "Do not assume 500/cum for Chennai country brick — measure 10 bricks from the actual delivered lot, average them, and update this formula. Country brick sizes vary kiln to kiln by up to 8 mm.",
//     "tags": [
//       "brick",
//       "masonry",
//       "count",
//       "chennai"
//     ],
//     "variables": [
//       {
//         "key": "l,b,h",
//         "label": "Brick nominal size incl. joint",
//         "unit": "m"
//       },
//       {
//         "key": "N",
//         "label": "Bricks per cum",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Brick length + joint",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "B",
//         "label": "Brick width + joint",
//         "unit": "mm",
//         "defaultValue": 100
//       },
//       {
//         "key": "H",
//         "label": "Brick height + joint",
//         "unit": "mm",
//         "defaultValue": 100
//       },
//       {
//         "key": "V",
//         "label": "Wall volume",
//         "unit": "cum",
//         "defaultValue": 6.9
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 5
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONV-08",
//     "name": "Length & weight conversions for site",
//     "categoryKey": "CONV",
//     "type": "Conversion",
//     "confidence": "Certain",
//     "reference": "SI definition",
//     "unit": "m / kg",
//     "example": "1 m = 3.28084 ft · 1 ft = 0.3048 m · 1 inch = 25.4 mm\n1 MT = 1000 kg · 1 quintal = 100 kg\n1 acre = 43,560 sqft · 1 ground (Chennai) = 2,400 sqft · 1 cent = 435.6 sqft",
//     "workedExample": "Plot of 1.5 ground = 1.5 × 2400 = 3,600 sqft = 334.45 sqm",
//     "note": "\"Ground\" (2,400 sqft) and \"cent\" (1/100 acre) are the land units used in Chennai deeds. CMDA drawings are in sqm — mismatches here cause FSI errors.",
//     "tags": [
//       "conversion",
//       "ground",
//       "cent",
//       "acre",
//       "chennai",
//       "land"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Standard conversions",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "g",
//         "label": "Land area",
//         "unit": "ground",
//         "defaultValue": 1.5
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-01",
//     "name": "Excavation volume — open trench / pit",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.1:1992",
//     "unit": "cum",
//     "example": "V = L × B × D  (per pit)\nTotal = V × number of pits\nWith side slope 1:n → V = D/6 × [(L₁B₁) + (L₂B₂) + 4(Lm·Bm)]  (prismoidal)",
//     "workedExample": "12 footing pits, each 1.8 m × 1.8 m × 1.5 m deep\nV per pit = 1.8 × 1.8 × 1.5 = 4.86 cum\nTotal = 4.86 × 12 = 58.32 cum",
//     "note": "IS 1200 measures excavation on the net dimension of the foundation plus working space, not on the widened top of a sloped cut — contractors bill the sloped volume. Fix which basis your contract uses before the first bill.",
//     "tags": [
//       "excavation",
//       "earthwork",
//       "footing",
//       "trench"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Length at bottom",
//         "unit": "m"
//       },
//       {
//         "key": "B",
//         "label": "Width at bottom",
//         "unit": "m"
//       },
//       {
//         "key": "D",
//         "label": "Depth below NGL",
//         "unit": "m"
//       },
//       {
//         "key": "n",
//         "label": "Side slope ratio",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Length",
//         "unit": "m",
//         "defaultValue": 1.8
//       },
//       {
//         "key": "B",
//         "label": "Width",
//         "unit": "m",
//         "defaultValue": 1.8
//       },
//       {
//         "key": "D",
//         "label": "Depth",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "N",
//         "label": "No. of pits",
//         "unit": "nos",
//         "defaultValue": 12
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-02",
//     "name": "Soil bulking (swell) and lorry trips for disposal",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2720 / trade practice",
//     "unit": "cum · trips",
//     "example": "Loose volume = In-situ volume × Swell factor\nSwell factor: sandy 1.10–1.15 · ordinary red soil 1.20–1.25 · clay / black cotton 1.25–1.40 · soft rock 1.40–1.60\nTrips = ⌈Loose volume ÷ Lorry capacity⌉",
//     "workedExample": "58.32 cum excavated in red soil, f = 1.22, tipper 5 cum\nLoose = 58.32 × 1.22 = 71.15 cum\nTrips = 71.15 ÷ 5 = 14.23 → 15 trips\nAt ₹1,800/trip = ₹27,000",
//     "note": "[Verify] Swell factor is site-specific. Calibrate it once per site: count the actual trips for the first 20 cum of measured excavation, then back-solve f = (trips × capacity) ÷ in-situ volume. This single calibration usually pays for itself on disposal billing.",
//     "tags": [
//       "swell",
//       "bulking",
//       "disposal",
//       "lorry",
//       "earthwork",
//       "labour"
//     ],
//     "variables": [
//       {
//         "key": "V_i",
//         "label": "In-situ (measured) volume",
//         "unit": "cum"
//       },
//       {
//         "key": "f",
//         "label": "Swell factor",
//         "unit": "—"
//       },
//       {
//         "key": "C",
//         "label": "Lorry capacity",
//         "unit": "cum/trip"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "V",
//         "label": "In-situ volume",
//         "unit": "cum",
//         "defaultValue": 58.32
//       },
//       {
//         "key": "f",
//         "label": "Swell factor",
//         "unit": "—",
//         "defaultValue": 1.22
//       },
//       {
//         "key": "C",
//         "label": "Lorry capacity",
//         "unit": "cum",
//         "defaultValue": 5
//       },
//       {
//         "key": "r",
//         "label": "Rate per trip",
//         "unit": "INR",
//         "defaultValue": 1800
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-03",
//     "name": "Back-filling and surplus earth balance",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.1",
//     "unit": "cum",
//     "example": "Backfill = Excavated volume − Volume of structure below NGL\nSurplus for disposal = Excavated − Backfill (in in-situ measure)\nCompacted backfill needs ≈ 1.10 × loose volume of borrowed earth",
//     "workedExample": "Excavation 58.32 cum, structure below GL 19.40 cum\nBackfill = 58.32 − 19.40 = 38.92 cum\nSurplus = 19.40 cum (in-situ) → ×1.22 swell = 23.67 cum loose",
//     "note": "The commonest silent leak on a residential site: paying for disposal of the full excavation AND paying again for borrowed filling soil. Always run this balance before approving either bill.",
//     "tags": [
//       "backfill",
//       "earthwork",
//       "balance",
//       "disposal"
//     ],
//     "variables": [
//       {
//         "key": "V_e",
//         "label": "Excavation",
//         "unit": "cum"
//       },
//       {
//         "key": "V_s",
//         "label": "Footing + PCC + pedestal below GL",
//         "unit": "cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "e",
//         "label": "Excavation",
//         "unit": "cum",
//         "defaultValue": 58.32
//       },
//       {
//         "key": "s",
//         "label": "Structure below GL",
//         "unit": "cum",
//         "defaultValue": 19.4
//       },
//       {
//         "key": "f",
//         "label": "Swell factor",
//         "unit": "—",
//         "defaultValue": 1.22
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-04",
//     "name": "Compaction layers and roller/rammer passes",
//     "categoryKey": "EARTH",
//     "type": "Labour",
//     "confidence": "Verify",
//     "reference": "IS 3764 / MoRTH",
//     "unit": "layers",
//     "example": "Layers = ⌈Total fill depth ÷ Layer thickness⌉\nLayer thickness: hand rammer 100–150 mm · plate compactor 200 mm · vibratory roller 250–300 mm\nWater added ≈ OMC (6–12% by weight of soil)",
//     "workedExample": "Plinth filling 900 mm deep, plate compactor at 200 mm layers\nLayers = 900 ÷ 200 = 4.5 → 5 layers\nAt 2 passes per layer = 10 compaction passes",
//     "note": "[Verify] Achieve 95% Proctor density (IS 2720 Pt.7). Without a field density test this is a guess — for anything carrying a floor slab, insist on one sand-replacement test per 200 sqm per layer.",
//     "tags": [
//       "compaction",
//       "filling",
//       "layers",
//       "plinth",
//       "quality"
//     ],
//     "variables": [
//       {
//         "key": "D",
//         "label": "Total fill depth",
//         "unit": "mm"
//       },
//       {
//         "key": "t",
//         "label": "Compacted layer thickness",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "D",
//         "label": "Fill depth",
//         "unit": "mm",
//         "defaultValue": 900
//       },
//       {
//         "key": "t",
//         "label": "Layer thickness",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "p",
//         "label": "Passes per layer",
//         "unit": "nos",
//         "defaultValue": 2
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-05",
//     "name": "Sand bulking correction for volume batching",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 2386 Pt.3:1963",
//     "unit": "%",
//     "example": "Bulking (%) = [(V_moist − V_dry) ÷ V_dry] × 100\nCorrected sand volume = Design volume × (1 + bulking/100)\nTypical bulking: 4% moisture → 25–30% · fully saturated → ≈ 0%",
//     "workedExample": "Field test: 100 cft loose damp sand settles to 78 cft when flooded\nBulking = (100 − 78)/78 × 100 = 28.2%\nIf design needs 15 cft dry sand, measure 15 × 1.282 = 19.2 cft at site",
//     "note": "This is the single largest cause of weak site-mixed concrete in the monsoon. Damp sand occupies up to 30% more volume, so a \"1:1.5:3\" box-batched mix silently becomes 1:1.15:3 — under-sanded and over-cement. Run the jar test weekly in June–November.",
//     "tags": [
//       "sand",
//       "bulking",
//       "batching",
//       "concrete",
//       "quality",
//       "monsoon"
//     ],
//     "variables": [
//       {
//         "key": "V_m",
//         "label": "Loose moist sand volume",
//         "unit": "cft"
//       },
//       {
//         "key": "V_d",
//         "label": "Volume after inundation",
//         "unit": "cft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "m",
//         "label": "Moist sand volume",
//         "unit": "cft",
//         "defaultValue": 100
//       },
//       {
//         "key": "d",
//         "label": "Inundated volume",
//         "unit": "cft",
//         "defaultValue": 78
//       },
//       {
//         "key": "req",
//         "label": "Design (dry) sand needed",
//         "unit": "cft",
//         "defaultValue": 15
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-06",
//     "name": "Anti-termite chemical quantity",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 6313 Pt.2:2013",
//     "unit": "litres",
//     "example": "Bottom & sides of excavation: 5 litres/sqm of emulsion\nBackfill against foundation: 7.5 litres per running metre per 300 mm depth\nUnder floor slab (top surface of fill): 5 litres/sqm\nEmulsion = chemical concentrate diluted to 1% w/w (Chlorpyriphos 20 EC)",
//     "workedExample": "Ground floor plinth area 750 sqft = 69.68 sqm\nEmulsion = 69.68 × 5 = 348.4 litres\nConcentrate at 1% = 3.48 litres of Chlorpyriphos 20 EC",
//     "note": "[Verify] Doses differ between IS 6313 Part 2 clauses (pre-constructional) and Part 3 (post-constructional). Ask the applicator for the empty containers as proof of quantity — under-dosing here is invisible until termites appear two years later.",
//     "tags": [
//       "termite",
//       "chemical",
//       "foundation",
//       "treatment"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Treated area",
//         "unit": "sqm"
//       },
//       {
//         "key": "q",
//         "label": "Dose",
//         "unit": "l/sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Plinth area",
//         "unit": "sqft",
//         "defaultValue": 750
//       },
//       {
//         "key": "q",
//         "label": "Dose",
//         "unit": "l/sqm",
//         "defaultValue": 5
//       },
//       {
//         "key": "c",
//         "label": "Concentration",
//         "unit": "%",
//         "defaultValue": 1
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-07",
//     "name": "PCC levelling course under footing",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 456:2000 cl.34.1.3",
//     "unit": "cum",
//     "example": "V_pcc = (L + 2×o) × (B + 2×o) × t × N\nStandard: t = 75 mm (residential) or 100 mm (heavy footing), offset o = 75–100 mm all round\nMix: M10 (1:3:6) or M7.5 (1:4:8)",
//     "workedExample": "Footing 1.5×1.5 m, offset 0.075 m, PCC 75 mm, 12 nos\nPlan = 1.65 × 1.65 = 2.72 sqm\nV = 2.72 × 0.075 × 12 = 2.45 cum\nM10 cement = 2.45 × 4.44 bags = 10.9 → 11 bags",
//     "note": "PCC is a levelling and blinding course, not a structural element — do not let a contractor bill 100 mm where 75 mm is specified without a written instruction.",
//     "tags": [
//       "pcc",
//       "foundation",
//       "levelling",
//       "m10"
//     ],
//     "variables": [
//       {
//         "key": "L,B",
//         "label": "Footing size",
//         "unit": "m"
//       },
//       {
//         "key": "o",
//         "label": "Offset beyond footing",
//         "unit": "m"
//       },
//       {
//         "key": "t",
//         "label": "PCC thickness",
//         "unit": "m"
//       },
//       {
//         "key": "N",
//         "label": "No. of footings",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Footing length",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "B",
//         "label": "Footing width",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "o",
//         "label": "Offset each side",
//         "unit": "m",
//         "defaultValue": 0.075
//       },
//       {
//         "key": "t",
//         "label": "PCC thickness",
//         "unit": "m",
//         "defaultValue": 0.075
//       },
//       {
//         "key": "N",
//         "label": "No. of footings",
//         "unit": "nos",
//         "defaultValue": 12
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-08",
//     "name": "Isolated footing — concrete and steel",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.34",
//     "unit": "cum · kg",
//     "example": "Sloped footing V = (L×B×d₁) + (h/3)[A_bottom + A_top + √(A_b×A_t)]\nFlat footing V = L × B × D\nSteel = V × steel% × 7850 ÷ 100   (footing 0.5–0.8% typical)",
//     "workedExample": "Footing 1.5 × 1.5 × 0.45 m, 12 nos, steel 0.7%\nV = 1.5×1.5×0.45 = 1.0125 cum → ×12 = 12.15 cum\nSteel = 12.15 × 0.7/100 × 7850 = 667.6 kg ≈ 0.67 MT",
//     "note": "The 0.5–0.8% band is a budgeting thumb rule only. Actual footing steel comes from the structural drawing and the soil bearing capacity — never issue a purchase order on the thumb rule alone.",
//     "tags": [
//       "footing",
//       "foundation",
//       "rcc",
//       "steel",
//       "concrete"
//     ],
//     "variables": [
//       {
//         "key": "L,B",
//         "label": "Footing plan size",
//         "unit": "m"
//       },
//       {
//         "key": "D",
//         "label": "Footing depth",
//         "unit": "m"
//       },
//       {
//         "key": "p",
//         "label": "Steel percentage",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Length",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "B",
//         "label": "Width",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "D",
//         "label": "Depth",
//         "unit": "m",
//         "defaultValue": 0.45
//       },
//       {
//         "key": "N",
//         "label": "Nos",
//         "unit": "nos",
//         "defaultValue": 12
//       },
//       {
//         "key": "p",
//         "label": "Steel %",
//         "unit": "%",
//         "defaultValue": 0.7
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-09",
//     "name": "Footing area from column load and SBC",
//     "categoryKey": "EARTH",
//     "type": "Design",
//     "confidence": "Verify",
//     "reference": "IS 6403:1981 · IS 1904",
//     "unit": "sqm",
//     "example": "A_req = (P × 1.10) ÷ SBC        (10% added for footing self-weight)\nSquare footing side = √A_req\nSBC (Chennai typical): filled-up soil 50–80 · red soil 120–180 · sandy clay 150–200 kN/sqm",
//     "workedExample": "Column load 450 kN, SBC 150 kN/sqm\nA = 450 × 1.10 ÷ 150 = 3.30 sqm\nSide = √3.30 = 1.82 m → adopt 1.85 × 1.85 m",
//     "note": "[Verify] SBC must come from a soil investigation report, not a thumb rule. Ayapakkam and much of North Chennai has pockets of filled-up soil where assumed SBC is dangerously optimistic. One borehole costs far less than one differential settlement crack.",
//     "tags": [
//       "sbc",
//       "footing",
//       "bearing capacity",
//       "design",
//       "soil"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Service axial load on column",
//         "unit": "kN"
//       },
//       {
//         "key": "SBC",
//         "label": "Safe bearing capacity",
//         "unit": "kN/sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "P",
//         "label": "Column service load",
//         "unit": "kN",
//         "defaultValue": 450
//       },
//       {
//         "key": "s",
//         "label": "SBC",
//         "unit": "kN/sqm",
//         "defaultValue": 150
//       },
//       {
//         "key": "f",
//         "label": "Self-wt allowance",
//         "unit": "%",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "EARTH-10",
//     "name": "Plinth filling and plinth beam volume",
//     "categoryKey": "EARTH",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.1",
//     "unit": "cum",
//     "example": "Plinth fill = Plinth area × (Plinth height − Slab thk − Sub-base thk)\nPlinth beam V = Σ (b × d × L) over all beam runs\nSub-base (jelly/WMM) = Plinth area × 100 to 150 mm",
//     "workedExample": "Plinth area 750 sqft = 69.68 sqm, fill depth 0.6 m\nFill = 69.68 × 0.6 = 41.81 cum → at swell 1.2, order 50.2 cum loose\nPlinth beam 0.23 × 0.30 × 62 m run = 4.28 cum",
//     "note": "Plinth filling is billed in compacted (in-situ) measure but purchased in loose lorry measure. State clearly in the work order which one the rate applies to.",
//     "tags": [
//       "plinth",
//       "filling",
//       "beam",
//       "volume"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Plinth area",
//         "unit": "sqm"
//       },
//       {
//         "key": "h",
//         "label": "Fill depth",
//         "unit": "m"
//       },
//       {
//         "key": "b,d,L",
//         "label": "Beam breadth, depth, length",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Plinth area",
//         "unit": "sqft",
//         "defaultValue": 750
//       },
//       {
//         "key": "h",
//         "label": "Fill depth",
//         "unit": "m",
//         "defaultValue": 0.6
//       },
//       {
//         "key": "b",
//         "label": "Beam width",
//         "unit": "m",
//         "defaultValue": 0.23
//       },
//       {
//         "key": "d",
//         "label": "Beam depth",
//         "unit": "m",
//         "defaultValue": 0.3
//       },
//       {
//         "key": "L",
//         "label": "Beam run",
//         "unit": "m",
//         "defaultValue": 62
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-01",
//     "name": "Dry volume factor for concrete and mortar",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 456:2000",
//     "unit": "factor",
//     "example": "Dry volume = Wet volume × 1.54   (concrete)\nDry volume = Wet volume × 1.33   (cement mortar)\n\nReason: voids in loose sand (≈20%) and in aggregate (≈34%) fill up on mixing,\nso loose dry material always exceeds the compacted wet volume.",
//     "workedExample": "1 cum of finished M20 concrete\nDry material required = 1 × 1.54 = 1.54 cum\nSplit in ratio 1 : 1.5 : 3 (sum 5.5)",
//     "note": "The factor ranges 1.52–1.57 in different references. 1.54 is the accepted Indian default and is what your BOQ Engine spec already uses — keep it consistent across all 19 modules or your cement totals will not reconcile between modules.",
//     "tags": [
//       "dry volume",
//       "1.54",
//       "concrete",
//       "mortar",
//       "factor"
//     ],
//     "variables": [
//       {
//         "key": "V_wet",
//         "label": "Finished (wet) concrete volume",
//         "unit": "cum"
//       },
//       {
//         "key": "f",
//         "label": "Dry volume factor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "w",
//         "label": "Wet volume",
//         "unit": "cum",
//         "defaultValue": 1
//       },
//       {
//         "key": "f",
//         "label": "Factor",
//         "unit": "—",
//         "defaultValue": 1.54
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-02",
//     "name": "Nominal mix concrete — full material take-off",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 456:2000 Table 9 · IS 383",
//     "unit": "bags · cft · litres",
//     "example": "Dry volume      = Wet volume × 1.54\nCement volume   = Dry × (1 ÷ Σratio)\nCement bags     = Cement volume ÷ 0.0347\nSand volume     = Dry × (sand ÷ Σratio)\nAggregate       = Dry × (agg ÷ Σratio)\nWater           = Cement weight × w/c ratio",
//     "workedExample": "10 cum of M20 (1:1.5:3), Σ = 5.5, w/c = 0.50\nDry = 10 × 1.54 = 15.4 cum\nCement = 15.4 × 1/5.5 = 2.80 cum = 2.80 ÷ 0.0347 = 80.7 → 81 bags\nSand = 15.4 × 1.5/5.5 = 4.20 cum = 148.3 cft\nAggregate = 15.4 × 3/5.5 = 8.40 cum = 296.6 cft\nWater = 81 × 50 × 0.50 = 2,025 litres\n\nWith 3% wastage (the calculator default): 84 bags, 152.8 cft sand, 305.5 cft aggregate",
//     "note": "Per cum of concrete, cement bags are: M5 → 2.77 · M7.5 → 3.41 · M10 → 4.44 · M15 → 6.34 · M20 → 8.06 · M25 → 11.09. Nominal mixes are permitted by IS 456 only up to M20; M25 and above should be design mixes with a lab trial.",
//     "tags": [
//       "concrete",
//       "m20",
//       "m25",
//       "mix",
//       "cement",
//       "sand",
//       "aggregate",
//       "boq"
//     ],
//     "variables": [
//       {
//         "key": "V",
//         "label": "Wet concrete volume",
//         "unit": "cum"
//       },
//       {
//         "key": "Σ",
//         "label": "Sum of mix ratio parts",
//         "unit": "—"
//       },
//       {
//         "key": "w/c",
//         "label": "Water–cement ratio",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "V",
//         "label": "Wet volume",
//         "unit": "cum",
//         "defaultValue": 10
//       },
//       {
//         "key": "g",
//         "label": "Grade",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "f",
//         "label": "Dry factor",
//         "unit": "—",
//         "defaultValue": 1.54
//       },
//       {
//         "key": "wc",
//         "label": "Water–cement",
//         "unit": "—",
//         "defaultValue": 0.5
//       },
//       {
//         "key": "wa",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 3
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-03",
//     "name": "Water–cement ratio and water per bag",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 Table 5",
//     "unit": "litres/bag",
//     "example": "Water = Cement weight × (w/c)\nWater per bag = 50 × (w/c)\n\nw/c 0.45 → 22.5 l/bag · 0.50 → 25 l/bag · 0.55 → 27.5 l/bag · 0.60 → 30 l/bag\nMaximum free w/c (mild exposure, RCC) = 0.55 · moderate = 0.50 · severe (coastal) = 0.45",
//     "workedExample": "M20 slab, 81 bags, exposure moderate → w/c 0.50\nWater = 81 × 50 × 0.50 = 2,025 litres\nDeduct free moisture already in the sand (typically 3–6% by weight of sand).",
//     "note": "[Verify for coastal sites] Sholinganallur / ECR projects fall under \"severe\" exposure in IS 456 Table 3 — maximum w/c 0.45, minimum cement 320 kg/cum, minimum grade M30 for RCC. A standard M20 mix specified inland is not compliant there.",
//     "tags": [
//       "water cement",
//       "wc ratio",
//       "durability",
//       "exposure",
//       "coastal"
//     ],
//     "variables": [
//       {
//         "key": "w/c",
//         "label": "Free water–cement ratio",
//         "unit": "—"
//       },
//       {
//         "key": "W_c",
//         "label": "Cement weight",
//         "unit": "kg"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Cement bags",
//         "unit": "bags",
//         "defaultValue": 81
//       },
//       {
//         "key": "wc",
//         "label": "w/c ratio",
//         "unit": "—",
//         "defaultValue": 0.5
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-04",
//     "name": "Slab concrete volume",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.2",
//     "unit": "cum",
//     "example": "V = Plan area × Thickness\nDeduct openings > 0.10 sqm (staircase voids, shafts, cut-outs)\nAdd drop / sunken portions separately",
//     "workedExample": "Ground floor slab 1,050 sqft = 97.55 sqm, thickness 125 mm, staircase void 3.2 sqm\nV = (97.55 − 3.20) × 0.125 = 11.79 cum\nM20 cement = 11.79 × 8.06 = 95 bags",
//     "note": "Site teams routinely pour 10–15 mm thicker than drawing. On a 100 sqm slab that is 1.0–1.5 cum of extra concrete — about 12 extra bags of cement per floor. Check the level pegs, not the bill.",
//     "tags": [
//       "slab",
//       "concrete",
//       "volume",
//       "rcc"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Slab plan area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Slab area",
//         "unit": "sqft",
//         "defaultValue": 1050
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "o",
//         "label": "Openings deduct",
//         "unit": "sqm",
//         "defaultValue": 3.2
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-05",
//     "name": "Column concrete volume (per floor)",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.2",
//     "unit": "cum",
//     "example": "V = b × D × H × N\nH measured from top of footing / floor slab to underside of beam\nDeduct nothing for reinforcement (IS 1200)",
//     "workedExample": "14 columns of 230 × 450 mm, floor height 3.0 m, beam depth 0.45 → clear 2.55 m\nV = 0.23 × 0.45 × 2.55 × 14 = 3.69 cum\nSteel @ 2.0% = 3.69 × 0.02 × 7850 = 579 kg",
//     "note": "Column steel is the densest in the building (1.0–2.5% typical, IS 456 allows 0.8–6%). Budget 2% for G+2 residential and confirm against the bar bending schedule.",
//     "tags": [
//       "column",
//       "concrete",
//       "rcc",
//       "volume"
//     ],
//     "variables": [
//       {
//         "key": "b,D",
//         "label": "Column section",
//         "unit": "m"
//       },
//       {
//         "key": "H",
//         "label": "Clear height",
//         "unit": "m"
//       },
//       {
//         "key": "N",
//         "label": "Number of columns",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Width",
//         "unit": "mm",
//         "defaultValue": 230
//       },
//       {
//         "key": "D",
//         "label": "Depth",
//         "unit": "mm",
//         "defaultValue": 450
//       },
//       {
//         "key": "H",
//         "label": "Clear height",
//         "unit": "m",
//         "defaultValue": 2.55
//       },
//       {
//         "key": "N",
//         "label": "Nos",
//         "unit": "nos",
//         "defaultValue": 14
//       },
//       {
//         "key": "p",
//         "label": "Steel %",
//         "unit": "%",
//         "defaultValue": 2
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-06",
//     "name": "Beam concrete volume",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.2",
//     "unit": "cum",
//     "example": "V = b × (D − t_slab) × L_clear × N     (beam below slab, slab measured separately)\nL_clear = centre-to-centre span − column width\nDo not double-count the slab thickness portion of the beam",
//     "workedExample": "Beam 230 × 450 mm, slab 125 mm, total clear run 58 m\nV = 0.23 × (0.45 − 0.125) × 58 = 4.34 cum\nSteel @ 1.8% = 4.34 × 0.018 × 7850 = 613 kg",
//     "note": "Double-counting the beam/slab overlap is the most frequent quantity error in manual BOQs — typically 4–6% of total RCC. The engine must subtract slab thickness automatically.",
//     "tags": [
//       "beam",
//       "concrete",
//       "rcc",
//       "volume",
//       "double count"
//     ],
//     "variables": [
//       {
//         "key": "b",
//         "label": "Beam width",
//         "unit": "m"
//       },
//       {
//         "key": "D",
//         "label": "Overall beam depth",
//         "unit": "m"
//       },
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "m"
//       },
//       {
//         "key": "L",
//         "label": "Clear span",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Beam width",
//         "unit": "mm",
//         "defaultValue": 230
//       },
//       {
//         "key": "D",
//         "label": "Beam depth",
//         "unit": "mm",
//         "defaultValue": 450
//       },
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "L",
//         "label": "Total clear run",
//         "unit": "m",
//         "defaultValue": 58
//       },
//       {
//         "key": "p",
//         "label": "Steel %",
//         "unit": "%",
//         "defaultValue": 1.8
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-07",
//     "name": "Staircase concrete and steel",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.33",
//     "unit": "cum",
//     "example": "Waist slab V = √(R² + T²)/T × (going length) × width × waist thk\nSteps V = ½ × R × T × width × number of steps\nTotal V = Waist + Steps + Landing\nThumb: 0.05 cum concrete per riser, 5 kg steel per riser",
//     "workedExample": "Floor height 3.0 m, riser 150 mm → 20 risers, tread 280 mm, width 1.05 m, waist 150 mm\nThumb check: 20 × 0.05 = 1.0 cum concrete, 20 × 5 = 100 kg steel",
//     "note": "Blondel comfort rule: 2R + T should fall between 550 and 650 mm. 2(150) + 280 = 580 mm — comfortable. Anything above 650 mm feels like climbing a ladder; NBC caps residential riser at 190 mm and requires minimum tread 250 mm.",
//     "tags": [
//       "staircase",
//       "riser",
//       "tread",
//       "blondel",
//       "concrete"
//     ],
//     "variables": [
//       {
//         "key": "R",
//         "label": "Riser",
//         "unit": "m"
//       },
//       {
//         "key": "T",
//         "label": "Tread (going)",
//         "unit": "m"
//       },
//       {
//         "key": "W",
//         "label": "Flight width",
//         "unit": "m"
//       },
//       {
//         "key": "n",
//         "label": "Number of risers",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "H",
//         "label": "Floor height",
//         "unit": "mm",
//         "defaultValue": 3000
//       },
//       {
//         "key": "R",
//         "label": "Riser",
//         "unit": "mm",
//         "defaultValue": 150
//       },
//       {
//         "key": "T",
//         "label": "Tread",
//         "unit": "mm",
//         "defaultValue": 280
//       },
//       {
//         "key": "W",
//         "label": "Width",
//         "unit": "m",
//         "defaultValue": 1.05
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-08",
//     "name": "Lintel and sunshade (chajja) volume",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 456 / NBC 2016",
//     "unit": "cum",
//     "example": "Lintel length = Opening width + 2 × bearing   (bearing = 150–230 mm each side)\nLintel V = b × d × L × N\nSunshade V = Projection × Width × Avg thickness  (taper 100 mm at wall → 60 mm at tip)\nLintel depth thumb = opening width ÷ 12, minimum 150 mm",
//     "workedExample": "Window 1.5 m wide, bearing 0.20 m each side, lintel 0.23 × 0.15 m\nL = 1.5 + 0.40 = 1.90 m\nV = 0.23 × 0.15 × 1.90 = 0.0656 cum per lintel\nChajja 0.60 m projection × 1.9 m × 0.08 avg = 0.091 cum",
//     "note": "Chajja projection above 0.60 m needs a design check for cantilever deflection and anchorage into the lintel — the top steel must extend back at least 1.5 × projection into the slab or lintel.",
//     "tags": [
//       "lintel",
//       "sunshade",
//       "chajja",
//       "opening",
//       "cantilever"
//     ],
//     "variables": [
//       {
//         "key": "W_o",
//         "label": "Opening width",
//         "unit": "m"
//       },
//       {
//         "key": "bg",
//         "label": "Bearing each side",
//         "unit": "m"
//       },
//       {
//         "key": "P",
//         "label": "Chajja projection",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "W",
//         "label": "Opening width",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "bg",
//         "label": "Bearing each side",
//         "unit": "m",
//         "defaultValue": 0.2
//       },
//       {
//         "key": "b",
//         "label": "Lintel width",
//         "unit": "m",
//         "defaultValue": 0.23
//       },
//       {
//         "key": "d",
//         "label": "Lintel depth",
//         "unit": "m",
//         "defaultValue": 0.15
//       },
//       {
//         "key": "N",
//         "label": "No. of openings",
//         "unit": "nos",
//         "defaultValue": 9
//       },
//       {
//         "key": "P",
//         "label": "Chajja projection",
//         "unit": "m",
//         "defaultValue": 0.6
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-09",
//     "name": "Cube test — 7-day vs 28-day and acceptance",
//     "categoryKey": "CONC",
//     "type": "Quality",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.15 & 16 · IS 516",
//     "unit": "N/sqmm",
//     "example": "7-day strength ≈ 0.65 to 0.70 × 28-day strength\nAcceptance (IS 456 cl.16.1): mean of 4 consecutive results ≥ fck + 0.825σ  AND  ≥ fck + 3 (for M15–M20) or fck + 4 (M25+)\nIndividual result must be ≥ fck − 3 (M15–M20) or fck − 4 (M25+)\nSampling: 1–5 cum → 1 sample · 6–15 → 2 · 16–30 → 3 · 31–50 → 4 · >50 → 4 + 1 per 50 cum",
//     "workedExample": "M20 slab pour of 12 cum → 2 samples (6 cubes) required\n7-day result 14.2 N/sqmm → projected 28-day = 14.2 ÷ 0.67 = 21.2 N/sqmm ✓\nIndividual acceptance floor = 20 − 3 = 17 N/sqmm",
//     "note": "A 7-day result below 0.65 × fck is an early warning, not a failure — but stop the next pour and check the sand bulking (EARTH-05) and w/c ratio before continuing. Retesting after 28 days when three floors are already up is not a remedy.",
//     "tags": [
//       "cube test",
//       "quality",
//       "strength",
//       "acceptance",
//       "is 456"
//     ],
//     "variables": [
//       {
//         "key": "fck",
//         "label": "Characteristic strength",
//         "unit": "N/sqmm"
//       },
//       {
//         "key": "σ",
//         "label": "Standard deviation",
//         "unit": "N/sqmm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "f",
//         "label": "Grade fck",
//         "unit": "N/sqmm",
//         "defaultValue": 20
//       },
//       {
//         "key": "s7",
//         "label": "7-day result",
//         "unit": "N/sqmm",
//         "defaultValue": 14.2
//       },
//       {
//         "key": "V",
//         "label": "Pour volume",
//         "unit": "cum",
//         "defaultValue": 12
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-10",
//     "name": "Slump values by member",
//     "categoryKey": "CONC",
//     "type": "Quality",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 Table 11 · IS 1199",
//     "unit": "mm",
//     "example": "Lightly reinforced foundations / mass concrete : 25 – 75 mm\nBeams, slabs, columns (normal reinforcement)    : 50 – 100 mm\nHeavily reinforced sections, thin walls          : 75 – 125 mm\nPumped concrete                                  : 100 – 150 mm\nSlump test: 300 mm cone, 3 layers × 25 tamps",
//     "workedExample": "Adding 20 litres of water to a 0.5 cum site mix raises slump by roughly 25 mm — and drops 28-day strength by about 8–10%.",
//     "note": "[Verify against your own mix] The water-for-workability trade-off is the most expensive habit on an Indian site. Use a plasticiser instead: 0.5–1.0% by weight of cement typically buys 40–60 mm of slump at no strength cost.",
//     "tags": [
//       "slump",
//       "workability",
//       "quality",
//       "concrete"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Workability band by member",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "CONC-11",
//     "name": "Curing water requirement",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 456:2000 cl.13.5",
//     "unit": "litres",
//     "example": "Ponding water for slab ≈ Area × 50 mm depth, topped up daily\nV (litres) = Area(sqm) × 0.05 × 1000 × (evaporation top-up factor ≈ 0.3/day)\nMinimum curing: 7 days (OPC) · 10–14 days (PPC / blended) · 14 days for severe exposure",
//     "workedExample": "Slab 97.5 sqm, ponded 50 mm, 14 days\nInitial fill = 97.5 × 0.05 × 1000 = 4,875 litres\nDaily top-up ≈ 30% = 1,463 l/day × 13 = 19,019 l\nTotal ≈ 23,894 litres ≈ 24 kl (about 3 tanker loads of 8 kl)",
//     "note": "[Verify] The 30% evaporation top-up is a Chennai summer estimate and will be lower in the monsoon. Curing compound (₹/sqm) is worth costing against tanker water for sites without a bore — one 20-litre drum covers roughly 100–120 sqm.",
//     "tags": [
//       "curing",
//       "water",
//       "slab",
//       "is 456",
//       "quality"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Slab area",
//         "unit": "sqm"
//       },
//       {
//         "key": "d",
//         "label": "Curing days",
//         "unit": "days"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Slab area",
//         "unit": "sqm",
//         "defaultValue": 97.5
//       },
//       {
//         "key": "p",
//         "label": "Ponding depth",
//         "unit": "mm",
//         "defaultValue": 50
//       },
//       {
//         "key": "d",
//         "label": "Curing days",
//         "unit": "days",
//         "defaultValue": 14
//       },
//       {
//         "key": "e",
//         "label": "Daily evaporation",
//         "unit": "%",
//         "defaultValue": 30
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-12",
//     "name": "Admixture dosage",
//     "categoryKey": "CONC",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 9103:1999",
//     "unit": "litres / kg",
//     "example": "Dosage = Cement weight × dose%\nPlasticiser 0.3 – 1.0% by weight of cement\nSuperplasticiser 0.5 – 2.0%\nIntegral waterproofing compound 1 – 2% (or 200 ml per bag, per manufacturer)",
//     "workedExample": "81 bags = 4,050 kg cement, plasticiser at 0.6%\nDose = 4,050 × 0.006 = 24.3 kg ≈ 24.3 litres (SG ≈ 1.0)",
//     "note": "[Verify with the product datasheet] Overdosing a plasticiser causes severe retardation — the slab can stay green for 48 hours. Always run a trial batch before a major pour, and never dose \"by eye\" from a bucket.",
//     "tags": [
//       "admixture",
//       "plasticiser",
//       "dosage",
//       "waterproofing compound"
//     ],
//     "variables": [
//       {
//         "key": "W_c",
//         "label": "Cement weight",
//         "unit": "kg"
//       },
//       {
//         "key": "p",
//         "label": "Dose",
//         "unit": "% by wt of cement"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Cement bags",
//         "unit": "bags",
//         "defaultValue": 81
//       },
//       {
//         "key": "p",
//         "label": "Dose",
//         "unit": "%",
//         "defaultValue": 0.6
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/litre",
//         "defaultValue": 85
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-01",
//     "name": "Brick masonry — bricks, cement and sand (master)",
//     "categoryKey": "MASON",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 2212:1991 · IS 1077",
//     "unit": "nos · bags · cft",
//     "example": "Wall volume     = L × H × T − deductions\nBricks          = Volume × bricks per cum × (1 + wastage)\nWet mortar      = Volume × mortar fraction (≈0.23 for 10 mm joint)\nDry mortar      = Wet mortar × 1.33\nCement          = Dry mortar × 1/(1+r) ÷ 0.0347   bags\nSand            = Dry mortar × r/(1+r) × 35.3147  cft",
//     "workedExample": "Wall 10 m × 3 m × 0.23 m = 6.90 cum, mortar 1:6, 5% brick wastage\nBricks = 6.90 × 500 × 1.05 = 3,623 nos\nWet mortar = 6.90 × 0.23 = 1.587 cum → dry = 2.111 cum\nCement = 2.111 × 1/7 ÷ 0.0347 = 8.69 → 9 bags\nSand = 2.111 × 6/7 × 35.3147 = 63.9 cft",
//     "note": "Per cum of 9-inch brickwork in 1:6 mortar: ≈ 1.26 bags cement and 9.3 cft sand. Cross-check any contractor quantity against this. Deduct openings over 0.10 sqm per IS 1200.",
//     "tags": [
//       "brickwork",
//       "masonry",
//       "mortar",
//       "cement",
//       "sand",
//       "boq"
//     ],
//     "variables": [
//       {
//         "key": "L,H,T",
//         "label": "Wall length, height, thickness",
//         "unit": "m"
//       },
//       {
//         "key": "r",
//         "label": "Mortar ratio (1:r)",
//         "unit": "—"
//       },
//       {
//         "key": "m",
//         "label": "Mortar fraction of wall volume",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Wall length",
//         "unit": "m",
//         "defaultValue": 10
//       },
//       {
//         "key": "H",
//         "label": "Wall height",
//         "unit": "m",
//         "defaultValue": 3
//       },
//       {
//         "key": "T",
//         "label": "Thickness",
//         "unit": "m",
//         "defaultValue": 0.23
//       },
//       {
//         "key": "ded",
//         "label": "Openings deduct",
//         "unit": "cum",
//         "defaultValue": 0
//       },
//       {
//         "key": "bpc",
//         "label": "Bricks per cum",
//         "unit": "nos",
//         "defaultValue": 500
//       },
//       {
//         "key": "r",
//         "label": "Mortar ratio 1:r",
//         "unit": "—",
//         "defaultValue": 6
//       },
//       {
//         "key": "mf",
//         "label": "Mortar fraction",
//         "unit": "—",
//         "defaultValue": 0.23
//       },
//       {
//         "key": "w",
//         "label": "Brick wastage",
//         "unit": "%",
//         "defaultValue": 5
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-02",
//     "name": "Half-brick (115 mm) partition wall per sqm",
//     "categoryKey": "MASON",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 2212:1991",
//     "unit": "per sqm",
//     "example": "Volume per sqm = 1 × 0.115 = 0.115 cum\nBricks per sqm  = 0.115 × 500 = 57.5 ≈ 58 nos (+5% = 61)\nCement (1:4)    = 0.115 × 0.23 × 1.33 ÷ 5 ÷ 0.0347 = 0.203 bags/sqm\nSand            = 0.115 × 0.23 × 1.33 × 4/5 × 35.3147 = 0.99 cft/sqm",
//     "workedExample": "Internal partitions 48 sqm\nBricks = 48 × 61 = 2,928 nos\nCement = 48 × 0.203 = 9.74 → 10 bags\nSand = 48 × 0.99 = 47.5 cft",
//     "note": "Half-brick walls use richer mortar (1:4, not 1:6) because there is no thickness to carry load. Above 3.0 m height or 4.0 m length they need an RCC stiffener band — otherwise they crack at the junction within a year.",
//     "tags": [
//       "partition",
//       "half brick",
//       "115mm",
//       "masonry"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm",
//         "defaultValue": 48
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "m",
//         "defaultValue": 0.115
//       },
//       {
//         "key": "r",
//         "label": "Mortar 1:r",
//         "unit": "—",
//         "defaultValue": 4
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 5
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-03",
//     "name": "AAC block masonry — blocks, adhesive, mortar",
//     "categoryKey": "MASON",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2185 Pt.3:1984",
//     "unit": "nos · bags",
//     "example": "Blocks per sqm = 1 ÷ (Block length × Block height)\nStandard AAC face 600 × 200 mm → 1 ÷ (0.6 × 0.2) = 8.33 blocks/sqm  (any thickness)\nBlocks per cum = 8.33 ÷ thickness(m)\nThin-bed adhesive (3 mm joint) ≈ 3.5–4.0 kg/sqm for 100 mm, 5–6 kg/sqm for 200 mm\nOne 40 kg adhesive bag covers ≈ 10–12 sqm of 100 mm wall",
//     "workedExample": "Wall 60 sqm in 200 mm AAC\nBlocks = 60 × 8.33 × 1.03 (3% wastage) = 515 nos\nAdhesive = 60 × 5.5 = 330 kg = 9 bags of 40 kg\nSaving vs brick: AAC dead load 650 kg/cum against brickwork 1,920 kg/cum",
//     "note": "⚠ DISCREPANCY WITH YOUR SPEC: BOQ Engine F17 lists aac100 at perSqm 16.7 — that is exactly double the geometric value. A 600×200 face is 0.12 sqm, so 1 ÷ 0.12 = 8.33 blocks/sqm regardless of whether the block is 100 or 200 mm thick. Thickness changes blocks-per-CUM, never blocks-per-SQM. The hollow-block perCum figures (392, 49) in the same table also do not reconcile. Fix before Prabhu codes masonryBlock.js.",
//     "tags": [
//       "aac",
//       "block",
//       "masonry",
//       "adhesive",
//       "discrepancy",
//       "spec error"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm"
//       },
//       {
//         "key": "l,h",
//         "label": "Block face dimensions",
//         "unit": "m"
//       },
//       {
//         "key": "t",
//         "label": "Block thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm",
//         "defaultValue": 60
//       },
//       {
//         "key": "l",
//         "label": "Block length",
//         "unit": "mm",
//         "defaultValue": 600
//       },
//       {
//         "key": "h",
//         "label": "Block height",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "t",
//         "label": "Block thickness",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "ad",
//         "label": "Adhesive rate",
//         "unit": "kg/sqm",
//         "defaultValue": 5.5
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 3
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-04",
//     "name": "Hollow concrete block masonry",
//     "categoryKey": "MASON",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2185 Pt.1:2005",
//     "unit": "nos · bags",
//     "example": "Standard block 400 × 200 mm face, thickness 100/150/200/230 mm\nBlocks per sqm = 1 ÷ (0.4 × 0.2) = 12.5 nos  (any thickness)\nBlocks per cum = 12.5 ÷ thickness(m)\nMortar (1:6) ≈ 0.025 cum per sqm of 200 mm wall",
//     "workedExample": "Compound wall 200 mm, 45 sqm\nBlocks = 45 × 12.5 × 1.03 = 580 nos\nMortar = 45 × 0.025 = 1.125 cum wet → dry 1.50 cum\nCement (1:6) = 1.50 ÷ 7 ÷ 0.0347 = 6.2 → 7 bags",
//     "note": "[Verify block face size with your supplier] Chennai suppliers also sell 390 × 190 mm faces, which gives 13.5 blocks/sqm, not 12.5 — an 8% difference on a large compound wall.",
//     "tags": [
//       "hollow block",
//       "solid block",
//       "masonry",
//       "compound wall"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t",
//         "label": "Block thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Wall area",
//         "unit": "sqm",
//         "defaultValue": 45
//       },
//       {
//         "key": "l",
//         "label": "Face length",
//         "unit": "mm",
//         "defaultValue": 400
//       },
//       {
//         "key": "h",
//         "label": "Face height",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "mm",
//         "defaultValue": 200
//       },
//       {
//         "key": "m",
//         "label": "Mortar per sqm",
//         "unit": "cum",
//         "defaultValue": 0.025
//       },
//       {
//         "key": "r",
//         "label": "Mortar 1:r",
//         "unit": "—",
//         "defaultValue": 6
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-05",
//     "name": "Deduction rules for openings (measurement)",
//     "categoryKey": "MASON",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 1200 Pt.3 & Pt.12",
//     "unit": "sqm",
//     "example": "Masonry & plaster: deduct full area of openings exceeding 0.10 sqm\nOpenings ≤ 0.50 sqm — no deduction for plaster (jambs & soffits not measured either)\nEnds of beams, lintels, posts up to 0.10 sqm — not deducted\nFor painting: deduct openings, then add back the framed area by a factor (panelled door ×1.30 both sides)",
//     "workedExample": "Wall 30 sqm with 2 windows of 1.5 × 1.2 m and 1 door of 0.9 × 2.1 m\nDeduction = 2(1.80) + 1.89 = 5.49 sqm\nNet masonry area = 30 − 5.49 = 24.51 sqm",
//     "note": "Contractors bill gross wall area and clients pay for windows as if they were brick. On a 2,400 sqft house with 14 openings this is typically 30–40 sqm of phantom masonry and plaster on both sides — roughly ₹35,000–₹50,000 at Chennai rates.",
//     "tags": [
//       "deduction",
//       "openings",
//       "is 1200",
//       "measurement",
//       "billing"
//     ],
//     "variables": [
//       {
//         "key": "A_o",
//         "label": "Opening area",
//         "unit": "sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Gross wall area",
//         "unit": "sqm",
//         "defaultValue": 30
//       },
//       {
//         "key": "n1",
//         "label": "Windows",
//         "unit": "nos",
//         "defaultValue": 2
//       },
//       {
//         "key": "w1",
//         "label": "Window W",
//         "unit": "m",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "h1",
//         "label": "Window H",
//         "unit": "m",
//         "defaultValue": 1.2
//       },
//       {
//         "key": "n2",
//         "label": "Doors",
//         "unit": "nos",
//         "defaultValue": 1
//       },
//       {
//         "key": "w2",
//         "label": "Door W",
//         "unit": "m",
//         "defaultValue": 0.9
//       },
//       {
//         "key": "h2",
//         "label": "Door H",
//         "unit": "m",
//         "defaultValue": 2.1
//       }
//     ]
//   },
//   {
//     "formulaCode": "MASON-06",
//     "name": "Brick soaking and pre-laying checks",
//     "categoryKey": "MASON",
//     "type": "Quality",
//     "confidence": "Likely",
//     "reference": "IS 2212:1991 · IS 3495",
//     "unit": "hours",
//     "example": "Soak bricks in water for 6 – 12 hours before laying (until bubbles stop)\nWater absorption limit: common burnt clay ≤ 20% by weight (IS 1077)\nMinimum compressive strength: Class 3.5 → 3.5 N/sqmm\nEfflorescence: not more than \"moderate\" (IS 3495 Pt.3)",
//     "workedExample": "Absorption test: dry brick 3.10 kg, after 24 h immersion 3.68 kg\nAbsorption = (3.68 − 3.10)/3.10 × 100 = 18.7% ✓ (within 20%)",
//     "note": "Unsoaked bricks suck water out of the mortar, and the joint never gains strength — this is the root cause of most plaster cracks along mortar lines. It costs nothing to fix and is almost never done properly.",
//     "tags": [
//       "brick",
//       "soaking",
//       "absorption",
//       "quality",
//       "is 3495"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Pre-laying quality gates",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "d",
//         "label": "Dry weight",
//         "unit": "kg",
//         "defaultValue": 3.1
//       },
//       {
//         "key": "w",
//         "label": "Wet weight (24h)",
//         "unit": "kg",
//         "defaultValue": 3.68
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLAST-01",
//     "name": "Plastering — cement and sand (master)",
//     "categoryKey": "PLAST",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1661:1972 · IS 1200 Pt.12",
//     "unit": "bags · cft",
//     "example": "Dry mortar = Area × Thickness × Factor\nFactor = 1.33 (dry volume) × 1.0–1.2 (uneven surface & joints) → use 1.35 default\nCement = Dry mortar × 1/(1+r) ÷ 0.0347   bags\nSand   = Dry mortar × r/(1+r) × 35.3147  cft",
//     "workedExample": "Internal plaster 12 mm, 1:4, area 320 sqm\nDry = 320 × 0.012 × 1.35 = 5.184 cum\nCement = 5.184 × 1/5 ÷ 0.0347 = 29.88 → 30 bags\nSand = 5.184 × 4/5 × 35.3147 = 146.4 cft\nCheck: 30 ÷ 320 = 0.094 bags/sqm ✓ (1 bag ≈ 10.7 sqm)\n\nWith 10% wastage (the calculator default): 33 bags, 161 cft sand, 9.7 sqm per bag",
//     "note": "Quick field check — 12 mm internal plaster in 1:4 covers about 10–11 sqm per cement bag. If the site is consuming a bag per 7–8 sqm, either the thickness has crept up or cement is walking off site.",
//     "tags": [
//       "plaster",
//       "mortar",
//       "cement",
//       "sand",
//       "internal",
//       "external"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Plaster area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "m"
//       },
//       {
//         "key": "r",
//         "label": "Mix 1:r",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Plaster area",
//         "unit": "sqm",
//         "defaultValue": 320
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "mm",
//         "defaultValue": 12
//       },
//       {
//         "key": "r",
//         "label": "Mix 1:r",
//         "unit": "—",
//         "defaultValue": 4
//       },
//       {
//         "key": "f",
//         "label": "Dry factor",
//         "unit": "—",
//         "defaultValue": 1.35
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLAST-02",
//     "name": "Standard plaster thickness and mix by surface",
//     "categoryKey": "PLAST",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 1661:1972",
//     "unit": "mm : ratio",
//     "example": "Internal wall (single coat)   : 12 mm · 1:4 or 1:5\nExternal wall (single coat)   : 15 mm · 1:4 (coastal) or 1:6\nExternal two-coat             : 12 mm base (1:5) + 8 mm finish (1:4) = 20 mm\nCeiling / soffit               : 6 mm · 1:3\nRCC surface (smooth shuttering): 6–10 mm · 1:3 with bonding agent\nRough / backing coat behind tiles: 12 mm · 1:4",
//     "workedExample": "For 2,400 sqft G+2, plaster quantities typically split:\nInternal 12 mm ≈ 62% · External 15 mm ≈ 28% · Ceiling 6 mm ≈ 10%",
//     "note": "Ceiling plaster in 1:3 at 6 mm is often skipped in favour of direct putty on a smooth slab soffit. That works only if the shuttering was plywood and the soffit is truly level — otherwise the putty cracks within 18 months.",
//     "tags": [
//       "plaster",
//       "thickness",
//       "mix ratio",
//       "ceiling",
//       "external"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Standard practice",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "PLAST-03",
//     "name": "Total plaster area for a building",
//     "categoryKey": "PLAST",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Derived / trade practice",
//     "unit": "sqm",
//     "example": "Internal plaster area ≈ 2 × (internal wall area) − openings\nExternal plaster area  = External wall perimeter × height − openings\nCeiling plaster        = Floor area per floor × number of floors\n\nThumb rule: total plaster area ≈ 3.0 to 3.5 × built-up area",
//     "workedExample": "2,400 sqft built-up × 3.2 = 7,680 sqft = 713.5 sqm of plaster\nCement at 0.094 bags/sqm ≈ 67 bags for internal-equivalent plaster",
//     "note": "[Verify against your own completed projects] The 3.0–3.5 multiplier depends entirely on the internal partition density. A villa with large open rooms sits near 2.8; a compact G+2 with many bedrooms can exceed 3.8. This is exactly the coefficient worth calibrating from your last three sites.",
//     "tags": [
//       "plaster",
//       "thumb rule",
//       "area",
//       "estimating"
//     ],
//     "variables": [
//       {
//         "key": "A_bu",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "Multiplier",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "Multiplier",
//         "unit": "—",
//         "defaultValue": 3.2
//       },
//       {
//         "key": "t",
//         "label": "Avg thickness",
//         "unit": "mm",
//         "defaultValue": 12
//       },
//       {
//         "key": "r",
//         "label": "Mix 1:r",
//         "unit": "—",
//         "defaultValue": 4
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLAST-04",
//     "name": "Wall putty and cement punning",
//     "categoryKey": "PLAST",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "Manufacturer data",
//     "unit": "kg",
//     "example": "Wall putty coverage ≈ 12 – 14 sqft per kg for 2 coats (≈ 1.2 sqm/kg)\nPutty (kg) = Area(sqft) ÷ 13\nOne 40 kg bag covers ≈ 480 – 560 sqft, 2 coats\nCement punning (neat cement slurry) ≈ 0.5 kg/sqm",
//     "workedExample": "Internal wall + ceiling area 6,200 sqft\nPutty = 6,200 ÷ 13 = 477 kg = 12 bags of 40 kg\nAt ₹800 per 40 kg bag = ₹9,600",
//     "note": "[Verify with the brand datasheet] Coverage drops sharply on rough plaster — a badly finished 12 mm plaster can push consumption to 9–10 sqft/kg, adding 30% to the putty bill. Good plastering pays for itself twice: once in putty, once in paint.",
//     "tags": [
//       "putty",
//       "punning",
//       "finish",
//       "coverage"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Putty area",
//         "unit": "sqft"
//       },
//       {
//         "key": "c",
//         "label": "Coverage",
//         "unit": "sqft/kg"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Area",
//         "unit": "sqft",
//         "defaultValue": 6200
//       },
//       {
//         "key": "c",
//         "label": "Coverage",
//         "unit": "sqft/kg",
//         "defaultValue": 13
//       },
//       {
//         "key": "r",
//         "label": "Rate per 40 kg bag",
//         "unit": "INR",
//         "defaultValue": 800
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-01",
//     "name": "Bar bending schedule — cutting length and weight",
//     "categoryKey": "STEEL",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 2502:1963 · IS 1786",
//     "unit": "kg",
//     "example": "Cutting length = Clear span − 2×cover + 2×(bend/hook allowance) − bend deductions\nTotal length     = Cutting length × Number of bars\nWeight (kg)      = Total length(m) × d² ÷ 162\n\nBend deduction: 45° → 1d · 90° → 2d · 135° hook → 3d\nHook allowance : 9d to 12d per hook (minimum 75 mm)",
//     "workedExample": "Beam bottom steel: 4 nos 16 mm, clear span 4.2 m, cover 25 mm, 2 hooks of 9d\nCutting length = 4.20 − 0.05 + 2(0.144) = 4.438 m\nTotal = 4.438 × 4 = 17.75 m\nWeight = 17.75 × 1.58 = 28.05 kg",
//     "note": "The BBS is where estimate and reality diverge most. A 4.5 kg/sqft thumb rule can be 20% off; a BBS from the actual drawing is within 3%. Build BBS into CivilMind before Phase 2 — it is the module that pays for itself first.",
//     "tags": [
//       "bbs",
//       "steel",
//       "cutting length",
//       "rebar",
//       "weight"
//     ],
//     "variables": [
//       {
//         "key": "d",
//         "label": "Bar diameter",
//         "unit": "mm"
//       },
//       {
//         "key": "n",
//         "label": "Number of bars",
//         "unit": "nos"
//       },
//       {
//         "key": "L",
//         "label": "Cutting length",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "d",
//         "label": "Bar dia",
//         "unit": "mm",
//         "defaultValue": null
//       },
//       {
//         "key": "L",
//         "label": "Clear span",
//         "unit": "m",
//         "defaultValue": 4.2
//       },
//       {
//         "key": "c",
//         "label": "Cover (each end)",
//         "unit": "mm",
//         "defaultValue": 25
//       },
//       {
//         "key": "hk",
//         "label": "Hook allowance",
//         "unit": "× d",
//         "defaultValue": 9
//       },
//       {
//         "key": "n",
//         "label": "No. of bars",
//         "unit": "nos",
//         "defaultValue": 4
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-02",
//     "name": "Steel percentage by member and tonnage estimate",
//     "categoryKey": "STEEL",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "IS 456:2000 cl.26.5",
//     "unit": "kg / %",
//     "example": "Steel (kg) = Concrete volume(cum) × (p/100) × 7850\n\nTypical p by member:\nFooting 0.50 – 0.80% · Plinth beam 1.00 – 1.50% · Column 1.00 – 2.50%\nBeam 1.50 – 2.00% · Slab (one-way) 0.70 – 1.00% · Slab (two-way) 0.80 – 1.10%\nStaircase 1.00 – 1.50% · Retaining wall 0.80 – 1.20%\n\nIS 456 limits: slab min 0.12% (Fe500) · column 0.8% min, 6% max · beam tension min 0.205% (Fe500)",
//     "workedExample": "Total RCC 96 cum on a G+2, weighted average 1.3%\nSteel = 96 × 0.013 × 7850 = 9,796 kg ≈ 9.8 MT\nAt ₹62,000/MT ≈ ₹6.08 lakh",
//     "note": "[Verify] These bands are for budgeting a tender, never for procurement. Order steel against the BBS, in two or three tranches — steel prices move weekly and holding 10 MT on an open site is both a cash-flow and a theft risk.",
//     "tags": [
//       "steel",
//       "percentage",
//       "tonnage",
//       "estimating",
//       "rcc"
//     ],
//     "variables": [
//       {
//         "key": "V",
//         "label": "Concrete volume",
//         "unit": "cum"
//       },
//       {
//         "key": "p",
//         "label": "Steel percentage",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "V",
//         "label": "Concrete volume",
//         "unit": "cum",
//         "defaultValue": 96
//       },
//       {
//         "key": "p",
//         "label": "Avg steel %",
//         "unit": "%",
//         "defaultValue": 1.3
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/MT",
//         "defaultValue": 62000
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 4
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-03",
//     "name": "Development length and lap length",
//     "categoryKey": "STEEL",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.26.2.1",
//     "unit": "× d",
//     "example": "L_d = (φ × 0.87 f_y) ÷ (4 × τ_bd)\nτ_bd (plain bars): M20 1.2 · M25 1.4 · M30 1.5 · M35 1.7 · M40 1.9 N/sqmm\nDeformed bars: τ_bd × 1.60 · Compression: τ_bd × 1.25\n\nLap length (tension)     = L_d, minimum 30d\nLap length (compression) = L_d in compression, minimum 24d",
//     "workedExample": "Fe500 bar, 16 mm, M25 concrete, tension, deformed\nτ_bd = 1.4 × 1.6 = 2.24 N/sqmm\nL_d = (16 × 0.87 × 500) ÷ (4 × 2.24) = 6,960 ÷ 8.96 = 776.8 mm ≈ 48.5d → adopt 780 mm",
//     "note": "Common site shortcuts: 50d for tension lap, 40d for compression. For Fe500 in M20 the true figure is about 57d — a 50d lap there is short. Stagger laps so that no more than 50% of bars are lapped at one section, and never lap at the point of maximum bending moment.",
//     "tags": [
//       "development length",
//       "lap length",
//       "bond",
//       "is 456",
//       "fe500"
//     ],
//     "variables": [
//       {
//         "key": "φ",
//         "label": "Bar diameter",
//         "unit": "mm"
//       },
//       {
//         "key": "f_y",
//         "label": "Steel yield strength",
//         "unit": "N/sqmm"
//       },
//       {
//         "key": "τ_bd",
//         "label": "Design bond stress",
//         "unit": "N/sqmm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "d",
//         "label": "Bar dia",
//         "unit": "mm",
//         "defaultValue": 16
//       },
//       {
//         "key": "fy",
//         "label": "Steel grade fy",
//         "unit": "N/sqmm",
//         "defaultValue": null
//       },
//       {
//         "key": "g",
//         "label": "Concrete grade",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "m",
//         "label": "Condition",
//         "unit": null,
//         "defaultValue": null
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-04",
//     "name": "Nominal clear cover to reinforcement",
//     "categoryKey": "STEEL",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.26.4.2 & Table 16",
//     "unit": "mm",
//     "example": "Footing (cast against earth) : 50 mm\nColumn                       : 40 mm (25 mm if ≤ 12 mm bars and ≤ 200 mm section)\nBeam                         : 25 mm\nSlab                         : 20 mm (15 mm for ≤ 12 mm bars, mild exposure)\nStaircase / walls            : 20 mm\n\nExposure adjustment: moderate +5 mm · severe +15 mm · very severe +25 mm",
//     "workedExample": "Sholinganallur (coastal, severe exposure) beam\nBase cover 25 + 15 = 40 mm, and minimum grade rises to M30",
//     "note": "Cover blocks must be cement-mortar or PVC of the stated thickness — not stone chips, not broken tile. Nearly every early corrosion case in Chennai coastal projects traces back to cover, not to steel quality.",
//     "tags": [
//       "cover",
//       "durability",
//       "is 456",
//       "corrosion",
//       "coastal"
//     ],
//     "variables": [
//       {
//         "key": "c",
//         "label": "Nominal cover",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Base cover",
//         "unit": "mm",
//         "defaultValue": 25
//       },
//       {
//         "key": "e",
//         "label": "Exposure",
//         "unit": null,
//         "defaultValue": null
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-05",
//     "name": "Stirrup cutting length and count",
//     "categoryKey": "STEEL",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 2502:1963",
//     "unit": "nos · kg",
//     "example": "A = beam width − 2×cover\nB = beam depth − 2×cover\nCutting length = 2(A + B) + 2×hook − bend deductions\n  bend deductions = 3 × 2d (90° corners) + 2 × 3d (135° hooks) = 12d\nNumber of stirrups = ⌊Clear span ÷ spacing⌋ + 1",
//     "workedExample": "Beam 230 × 450, cover 25, stirrup 8 mm, spacing 150 mm, span 4.2 m\nA = 230 − 50 = 180 mm · B = 450 − 50 = 400 mm\nCL = 2(180 + 400) + 2(9×8) − 12(8) = 1,160 + 144 − 96 = 1,208 mm\nCount = 4200/150 + 1 = 29 nos\nWeight = 29 × 1.208 × 0.395 = 13.84 kg",
//     "note": "[Likely] Two conventions exist on site: the \"2(A+B) + 24d\" shortcut (no deductions) and the detailed version above. The shortcut over-estimates by roughly 3–5% per stirrup. Pick one convention for the whole project — mixing them makes BBS reconciliation impossible.",
//     "tags": [
//       "stirrup",
//       "bbs",
//       "cutting length",
//       "beam",
//       "shear"
//     ],
//     "variables": [
//       {
//         "key": "A,B",
//         "label": "Stirrup inner dimensions",
//         "unit": "mm"
//       },
//       {
//         "key": "d",
//         "label": "Stirrup bar dia",
//         "unit": "mm"
//       },
//       {
//         "key": "s",
//         "label": "Spacing",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Beam width",
//         "unit": "mm",
//         "defaultValue": 230
//       },
//       {
//         "key": "D",
//         "label": "Beam depth",
//         "unit": "mm",
//         "defaultValue": 450
//       },
//       {
//         "key": "c",
//         "label": "Cover",
//         "unit": "mm",
//         "defaultValue": 25
//       },
//       {
//         "key": "d",
//         "label": "Stirrup dia",
//         "unit": "mm",
//         "defaultValue": 8
//       },
//       {
//         "key": "hk",
//         "label": "Hook",
//         "unit": "× d",
//         "defaultValue": 9
//       },
//       {
//         "key": "s",
//         "label": "Spacing",
//         "unit": "mm",
//         "defaultValue": 150
//       },
//       {
//         "key": "L",
//         "label": "Clear span",
//         "unit": "m",
//         "defaultValue": 4.2
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-06",
//     "name": "Slab reinforcement — bar count and spacing",
//     "categoryKey": "STEEL",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.26.3.3 & 26.5.2",
//     "unit": "nos · mm",
//     "example": "Number of bars = ⌊(Span ⊥ to bars − 2×cover) ÷ spacing⌋ + 1\nSpacing limit: main steel ≤ 3d or 300 mm, whichever is less\n               distribution steel ≤ 5d or 450 mm\nMinimum steel: 0.12% of gross area (Fe500) · 0.15% (Fe415)\nA_st provided = n × (π/4)d²",
//     "workedExample": "Slab 4.0 × 5.0 m, 125 mm thick, 10 mm bars @150 c/c main\nBars = (5000 − 40)/150 + 1 = 34 nos\nLength each = 4.0 + 2 bends ≈ 4.30 m → 146.2 m\nWeight = 146.2 × 0.617 = 90.2 kg\nMin steel check: 0.0012 × 1000 × 125 = 150 sqmm/m; provided = 523 sqmm/m ✓",
//     "note": "Distribution bars are the ones site teams thin out to \"save steel\". They control shrinkage cracking across the slab — the cost saved is about ₹4,000 on a typical floor, and the crack repair costs ten times that.",
//     "tags": [
//       "slab",
//       "reinforcement",
//       "spacing",
//       "distribution steel",
//       "is 456"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Slab dimension",
//         "unit": "m"
//       },
//       {
//         "key": "s",
//         "label": "Bar spacing",
//         "unit": "mm"
//       },
//       {
//         "key": "d",
//         "label": "Bar dia",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "Lx",
//         "label": "Short span",
//         "unit": "m",
//         "defaultValue": 4
//       },
//       {
//         "key": "Ly",
//         "label": "Long span",
//         "unit": "m",
//         "defaultValue": 5
//       },
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "d",
//         "label": "Main bar dia",
//         "unit": "mm",
//         "defaultValue": 10
//       },
//       {
//         "key": "s",
//         "label": "Spacing",
//         "unit": "mm",
//         "defaultValue": 150
//       },
//       {
//         "key": "c",
//         "label": "Cover",
//         "unit": "mm",
//         "defaultValue": 20
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-07",
//     "name": "Binding wire, cover blocks and chairs",
//     "categoryKey": "STEEL",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "Trade practice",
//     "unit": "kg · nos",
//     "example": "Binding wire = 9 to 13 kg per MT of steel (use 10 kg/MT)\nCover blocks  = 4 to 6 nos per sqm of slab · 4 per running metre of beam\nChair bars    = 1 per sqm of slab (two-layer slabs), 0.5–1.0 kg each\n  Chair length = 2×(chair height) + 2×(300 mm legs) + top width",
//     "workedExample": "9.8 MT steel, slab area 195 sqm (two floors)\nBinding wire = 9.8 × 10 = 98 kg\nCover blocks = 195 × 5 = 975 nos\nChairs = 195 nos × 0.8 kg = 156 kg of extra steel",
//     "note": "Chairs are almost never in the estimate and always on the site. 156 kg of chair steel is ₹9,700 that shows up as a \"variation\" — put it in the BOQ from day one.",
//     "tags": [
//       "binding wire",
//       "chairs",
//       "cover blocks",
//       "consumables"
//     ],
//     "variables": [
//       {
//         "key": "W",
//         "label": "Steel tonnage",
//         "unit": "MT"
//       },
//       {
//         "key": "A",
//         "label": "Slab area",
//         "unit": "sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "W",
//         "label": "Steel tonnage",
//         "unit": "MT",
//         "defaultValue": 9.8
//       },
//       {
//         "key": "A",
//         "label": "Slab area",
//         "unit": "sqm",
//         "defaultValue": 195
//       },
//       {
//         "key": "bw",
//         "label": "Binding wire rate",
//         "unit": "kg/MT",
//         "defaultValue": 10
//       },
//       {
//         "key": "ch",
//         "label": "Chair weight",
//         "unit": "kg each",
//         "defaultValue": 0.8
//       }
//     ]
//   },
//   {
//     "formulaCode": "STEEL-08",
//     "name": "Steel per sqft — whole building thumb rule",
//     "categoryKey": "STEEL",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice / BN Datta",
//     "unit": "kg/sqft",
//     "example": "Steel (kg) = Built-up area(sqft) × rate\n\nRate by building type:\nLoad-bearing with RCC slab : 2.0 – 2.5 kg/sqft\nRCC framed, G to G+2       : 3.5 – 4.5 kg/sqft\nCommercial / G+3 and above : 4.5 – 5.5 kg/sqft\nHigh-rise (>G+7)           : 5.5 – 7.0 kg/sqft",
//     "workedExample": "2,400 sqft residential G+2 at 4.5 kg/sqft\nSteel = 2400 × 4.5 = 10,800 kg = 10.8 MT\nCompare with BBS-derived 9.8 MT → thumb rule is 10% high, which is the right direction for a budget.",
//     "note": "[Verify — calibrate this first] This single coefficient moves the budget by lakhs. Take your three completed Vertical Living projects, divide actual steel invoiced by built-up sqft, and replace 4.5 with your own number. That is a 30-minute job with permanent payoff.",
//     "tags": [
//       "steel",
//       "thumb rule",
//       "per sqft",
//       "estimating",
//       "calibrate"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "Steel rate",
//         "unit": "kg/sqft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "Steel rate",
//         "unit": "kg/sqft",
//         "defaultValue": 4.5
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/MT",
//         "defaultValue": 62000
//       }
//     ]
//   },
//   {
//     "formulaCode": "FORM-01",
//     "name": "Shuttering area by member",
//     "categoryKey": "FORM",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.5 · IS 14687",
//     "unit": "sqm",
//     "example": "Column  = Perimeter × Height = 2(b + D) × H\nBeam    = 2 × (depth − slab thk) × L + (width × L)     [two sides + soffit]\nSlab    = Plan area (soffit) + edge band\nFooting = 2(L + B) × D\nStaircase = waist soffit + riser boards + side",
//     "workedExample": "14 columns 230×450, height 2.55 m\nArea = 2(0.23 + 0.45) × 2.55 × 14 = 1.36 × 2.55 × 14 = 48.55 sqm\nBeams 230×450 with 125 slab, 58 m run: 2(0.325)(58) + 0.23(58) = 37.7 + 13.3 = 51.0 sqm",
//     "note": "Formwork is measured on the contact area only. A contractor billing \"column shuttering\" on plan area instead of perimeter area is over-billing by a factor of 3 or more.",
//     "tags": [
//       "shuttering",
//       "formwork",
//       "contact area",
//       "measurement"
//     ],
//     "variables": [
//       {
//         "key": "b,D",
//         "label": "Member section",
//         "unit": "m"
//       },
//       {
//         "key": "H,L",
//         "label": "Height / length",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Column width",
//         "unit": "m",
//         "defaultValue": 0.23
//       },
//       {
//         "key": "D",
//         "label": "Column depth",
//         "unit": "m",
//         "defaultValue": 0.45
//       },
//       {
//         "key": "H",
//         "label": "Height",
//         "unit": "m",
//         "defaultValue": 2.55
//       },
//       {
//         "key": "N",
//         "label": "Nos",
//         "unit": "nos",
//         "defaultValue": 14
//       }
//     ]
//   },
//   {
//     "formulaCode": "FORM-02",
//     "name": "Formwork quantity thumb rule per cum of concrete",
//     "categoryKey": "FORM",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "sqm/cum",
//     "example": "Formwork area ≈ 6 sqm per cum of RCC (whole building average)\n\nBy member: Slab 8 – 10 · Beam 10 – 12 · Column 12 – 16 · Footing 2 – 3 sqm/cum\nPly consumption: 1 sheet (8×4 ft = 2.97 sqm) reused 6 – 10 times",
//     "workedExample": "96 cum RCC × 6 = 576 sqm of shuttering contact area\nPly sheets = 576 ÷ 2.97 ÷ 8 reuses = 24.2 → 25 sheets\nProps at 1 per 1.2 sqm of slab soffit",
//     "note": "[Verify] The factor is higher for column-heavy buildings and lower for slab-heavy ones. Where a contractor supplies shuttering in his rate, this matters only for programme; where you buy the ply, it is a direct cost.",
//     "tags": [
//       "formwork",
//       "thumb rule",
//       "plywood",
//       "props",
//       "reuse"
//     ],
//     "variables": [
//       {
//         "key": "V",
//         "label": "Concrete volume",
//         "unit": "cum"
//       },
//       {
//         "key": "k",
//         "label": "Formwork factor",
//         "unit": "sqm/cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "V",
//         "label": "RCC volume",
//         "unit": "cum",
//         "defaultValue": 96
//       },
//       {
//         "key": "k",
//         "label": "Factor",
//         "unit": "sqm/cum",
//         "defaultValue": 6
//       },
//       {
//         "key": "re",
//         "label": "Ply reuses",
//         "unit": "nos",
//         "defaultValue": 8
//       },
//       {
//         "key": "pr",
//         "label": "Ply rate",
//         "unit": "INR/sheet",
//         "defaultValue": 1450
//       }
//     ]
//   },
//   {
//     "formulaCode": "FORM-03",
//     "name": "Formwork striking (deshuttering) periods",
//     "categoryKey": "FORM",
//     "type": "Time",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.11.3 Table",
//     "unit": "days",
//     "example": "Vertical formwork — columns, walls, beam sides : 16 – 24 hours\nSoffit formwork to slabs (props left under)    : 3 days\nSoffit formwork to beams (props left under)    : 7 days\nProps to slabs — span ≤ 4.5 m                   : 7 days\nProps to slabs — span > 4.5 m                   : 14 days\nProps to beams & arches — span ≤ 6 m            : 14 days\nProps to beams & arches — span > 6 m            : 21 days",
//     "workedExample": "Slab of 4.2 m span, OPC 53, ambient 32 °C\nSide forms off at 24 h · slab soffit ply at day 3 · props stay until day 7\nWith PPC or fly-ash cement, add 3 – 4 days to every prop figure.",
//     "note": "[Likely — confirm against a current copy of IS 456 Table 11] Early prop removal is the single most common cause of permanent slab deflection in fast-track residential work. It is invisible for two years, then the false ceiling line gives it away.",
//     "tags": [
//       "deshuttering",
//       "striking",
//       "formwork",
//       "is 456",
//       "curing",
//       "time"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Span",
//         "unit": "m"
//       },
//       {
//         "key": "t",
//         "label": "Striking time",
//         "unit": "days"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Span",
//         "unit": "m",
//         "defaultValue": 4.2
//       },
//       {
//         "key": "m",
//         "label": "Member",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "c",
//         "label": "Cement",
//         "unit": null,
//         "defaultValue": null
//       }
//     ]
//   },
//   {
//     "formulaCode": "FORM-04",
//     "name": "Shuttering oil / release agent",
//     "categoryKey": "FORM",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "Manufacturer data",
//     "unit": "litres",
//     "example": "Coverage ≈ 25 – 35 sqm per litre per application\nQuantity = Total shuttering area(sqm) ÷ 30",
//     "workedExample": "576 sqm shuttering ÷ 30 = 19.2 litres per full cycle\nAcross 3 floors with reuse ≈ 58 litres total",
//     "note": "[Verify] Used engine oil is still common on Chennai sites — it stains concrete permanently and interferes with plaster bonding. Proper release agent costs about ₹110/litre; on a full house that is under ₹7,000.",
//     "tags": [
//       "shuttering oil",
//       "release agent",
//       "formwork"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Shuttering area",
//         "unit": "sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Shuttering area",
//         "unit": "sqm",
//         "defaultValue": 576
//       },
//       {
//         "key": "c",
//         "label": "Coverage",
//         "unit": "sqm/litre",
//         "defaultValue": 30
//       },
//       {
//         "key": "n",
//         "label": "Applications",
//         "unit": "nos",
//         "defaultValue": 3
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/litre",
//         "defaultValue": 110
//       }
//     ]
//   },
//   {
//     "formulaCode": "FLOOR-01",
//     "name": "Tile quantity with wastage and box rounding",
//     "categoryKey": "FLOOR",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1237:1980 · IS 15622",
//     "unit": "nos · boxes",
//     "example": "Tiles = ⌈Area ÷ (tile length × tile width)⌉ × (1 + wastage)\nBoxes = ⌈Tiles ÷ tiles per box⌉\n\nWastage: straight layout 5% · diagonal layout 10 – 15% · small rooms / many cuts 12%",
//     "workedExample": "Living area 46.5 sqm, tile 600 × 600 mm (0.36 sqm), wastage 7%\nTiles = 46.5 ÷ 0.36 = 129.2 → 130 × 1.07 = 139.1 → 140 nos\nBoxes (4 tiles/box) = 140 ÷ 4 = 35 boxes\nAlways add 1 extra box for future replacement — same batch, same shade.",
//     "note": "Buy the full quantity in one dye-lot. A second purchase three months later will not match, and a single mismatched tile in a hall is a visible defect the client will remember longer than anything else you did well.",
//     "tags": [
//       "tiles",
//       "flooring",
//       "wastage",
//       "boxes",
//       "vitrified"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Floor area",
//         "unit": "sqm"
//       },
//       {
//         "key": "l,b",
//         "label": "Tile size",
//         "unit": "m"
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Floor area",
//         "unit": "sqm",
//         "defaultValue": 46.5
//       },
//       {
//         "key": "l",
//         "label": "Tile length",
//         "unit": "mm",
//         "defaultValue": 600
//       },
//       {
//         "key": "b",
//         "label": "Tile width",
//         "unit": "mm",
//         "defaultValue": 600
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 7
//       },
//       {
//         "key": "pb",
//         "label": "Tiles per box",
//         "unit": "nos",
//         "defaultValue": 4
//       },
//       {
//         "key": "r",
//         "label": "Rate per box",
//         "unit": "INR",
//         "defaultValue": 640
//       }
//     ]
//   },
//   {
//     "formulaCode": "FLOOR-02",
//     "name": "Tile bedding mortar, adhesive and grout",
//     "categoryKey": "FLOOR",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 1443:2002",
//     "unit": "bags · kg",
//     "example": "Bedding mortar (1:4), 20 – 25 mm bed:\n  Dry mortar = Area × 0.025 × 1.35\n  Cement = Dry ÷ 5 ÷ 0.0347 ≈ 0.195 bags/sqm\n  Plus neat cement slurry 3.5 kg/sqm\nTile adhesive (thin-bed 3–5 mm): 4 – 6 kg/sqm; 1 bag of 20 kg covers 4 – 5 sqm\nGrout: 0.3 – 0.5 kg/sqm for 2 mm joints on 600×600",
//     "workedExample": "Area 46.5 sqm, 25 mm bed 1:4\nDry mortar = 46.5 × 0.025 × 1.35 = 1.569 cum\nCement = 1.569 ÷ 5 ÷ 0.0347 = 9.04 bags\nSlurry = 46.5 × 3.5 = 163 kg = 3.3 bags\nTotal ≈ 13 bags → 0.28 bags/sqm ✓ (matches BOQ Engine F06)",
//     "note": "[Likely] Your spec F06 value of 0.28 bags/sqm reconciles correctly with bedding plus slurry. Adhesive-fixed tiles cost more per sqm in material but save 20 mm of dead load per floor and roughly 30% of the mason time.",
//     "tags": [
//       "tile",
//       "bedding",
//       "adhesive",
//       "grout",
//       "cement"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Tiling area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t",
//         "label": "Bed thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Tiling area",
//         "unit": "sqm",
//         "defaultValue": 46.5
//       },
//       {
//         "key": "t",
//         "label": "Bed thickness",
//         "unit": "mm",
//         "defaultValue": 25
//       },
//       {
//         "key": "r",
//         "label": "Mix 1:r",
//         "unit": "—",
//         "defaultValue": 4
//       },
//       {
//         "key": "sl",
//         "label": "Slurry",
//         "unit": "kg/sqm",
//         "defaultValue": 3.5
//       },
//       {
//         "key": "g",
//         "label": "Grout",
//         "unit": "kg/sqm",
//         "defaultValue": 0.4
//       }
//     ]
//   },
//   {
//     "formulaCode": "FLOOR-03",
//     "name": "Skirting and dado area",
//     "categoryKey": "FLOOR",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 1200 Pt.11",
//     "unit": "rmt · sqm",
//     "example": "Skirting length = Room perimeter − door openings\nSkirting area   = Length × height (100 mm standard)\nDado / wall tiling area = Perimeter × dado height − openings\nTiles for skirting = ⌈Length ÷ tile length⌉ × strips per tile",
//     "workedExample": "Room 4.0 × 5.0 m → perimeter 18 m, minus 2 doors of 0.9 m = 16.2 m\nSkirting at 100 mm = 1.62 sqm\nFrom 600 mm tiles cut into 6 strips: 16.2 ÷ 0.6 = 27 strips = 4.5 tiles → 5 tiles",
//     "note": "Skirting is cut from the same floor tile, so it must be included in the floor tile order, not treated as a separate purchase. Forgetting it is why sites run 3–4 boxes short at the end.",
//     "tags": [
//       "skirting",
//       "dado",
//       "perimeter",
//       "tiles"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Room perimeter",
//         "unit": "m"
//       },
//       {
//         "key": "h",
//         "label": "Skirting height",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Room length",
//         "unit": "m",
//         "defaultValue": 4
//       },
//       {
//         "key": "B",
//         "label": "Room width",
//         "unit": "m",
//         "defaultValue": 5
//       },
//       {
//         "key": "dr",
//         "label": "Door openings total",
//         "unit": "m",
//         "defaultValue": 1.8
//       },
//       {
//         "key": "h",
//         "label": "Skirting height",
//         "unit": "mm",
//         "defaultValue": 100
//       },
//       {
//         "key": "tl",
//         "label": "Tile length",
//         "unit": "mm",
//         "defaultValue": 600
//       }
//     ]
//   },
//   {
//     "formulaCode": "FLOOR-04",
//     "name": "Bathroom and kitchen wall tiling",
//     "categoryKey": "FLOOR",
//     "type": "Material",
//     "confidence": "Certain",
//     "reference": "IS 15622:2017",
//     "unit": "sqm",
//     "example": "Wall tile area = (Room perimeter × dado height) − openings\nBathroom dado: full height 2.1 m (or 7 ft) standard\nKitchen dado : 0.6 m above counter (counter at 0.85 m) → 0.85 to 2.1 m\nFloor tiles: anti-skid, minimum slope 1:80 towards trap",
//     "workedExample": "Bathroom 1.8 × 2.4 m → perimeter 8.4 m, dado 2.1 m\nGross = 8.4 × 2.1 = 17.64 sqm\nLess door 0.75 × 2.1 = 1.58, window 0.6 × 0.6 = 0.36\nNet = 15.70 sqm + 10% wastage = 17.3 sqm",
//     "note": "Wall tiling wastage runs 10–12%, not 5% — bathrooms are small, full of cuts around plumbing points and niches. Budget the higher figure or you will be short.",
//     "tags": [
//       "bathroom",
//       "kitchen",
//       "dado",
//       "wall tile",
//       "wastage"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Perimeter",
//         "unit": "m"
//       },
//       {
//         "key": "H",
//         "label": "Dado height",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Room length",
//         "unit": "m",
//         "defaultValue": 1.8
//       },
//       {
//         "key": "B",
//         "label": "Room width",
//         "unit": "m",
//         "defaultValue": 2.4
//       },
//       {
//         "key": "H",
//         "label": "Dado height",
//         "unit": "m",
//         "defaultValue": 2.1
//       },
//       {
//         "key": "op",
//         "label": "Openings",
//         "unit": "sqm",
//         "defaultValue": 1.94
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "WPF-01",
//     "name": "Terrace brickbat coba",
//     "categoryKey": "WPF",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2645:2003",
//     "unit": "cum · bags",
//     "example": "Average thickness = (thickness at drain + thickness at high point) ÷ 2\nSlope: minimum 1:100 towards outlets (1 cm fall per 1 m run)\nVolume = Area × Average thickness\nBrickbats ≈ 60% of volume · Mortar (1:4 with waterproofing compound) ≈ 40%\nCement ≈ 0.25 – 0.30 bags per sqm for 100 mm average",
//     "workedExample": "Terrace 90 sqm, 75 mm at drain, 125 mm at ridge → average 100 mm\nVolume = 90 × 0.10 = 9.0 cum\nBrickbats = 5.4 cum · Mortar = 3.6 cum wet → dry 4.79 cum\nCement (1:4) = 4.79 ÷ 5 ÷ 0.0347 = 27.6 → 28 bags",
//     "note": "[Verify] Coba adds roughly 200 kg/sqm of dead load — on a slab designed without it, that matters. Check the structural drawing before specifying coba on an existing building. The alternative, a liquid membrane system, adds under 5 kg/sqm.",
//     "tags": [
//       "waterproofing",
//       "coba",
//       "terrace",
//       "brickbat",
//       "slope"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Terrace area",
//         "unit": "sqm"
//       },
//       {
//         "key": "t_avg",
//         "label": "Average coba thickness",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Terrace area",
//         "unit": "sqm",
//         "defaultValue": 90
//       },
//       {
//         "key": "t1",
//         "label": "Thickness at drain",
//         "unit": "mm",
//         "defaultValue": 75
//       },
//       {
//         "key": "t2",
//         "label": "Thickness at ridge",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "r",
//         "label": "Mortar 1:r",
//         "unit": "—",
//         "defaultValue": 4
//       }
//     ]
//   },
//   {
//     "formulaCode": "WPF-02",
//     "name": "Liquid / cementitious membrane coating",
//     "categoryKey": "WPF",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2645:2003 / product data",
//     "unit": "kg",
//     "example": "Quantity = Area × coverage rate × number of coats\nTypical: acrylic elastomeric 0.7 – 0.9 kg/sqm/coat, 2 coats → 1.4 – 1.8 kg/sqm\nCementitious (2-component) 1.5 kg/sqm/coat, 2 coats → 3.0 kg/sqm\nAdd 15% for corners, coving and upstands (300 mm turn-up at parapet)",
//     "workedExample": "Terrace 90 sqm, acrylic at 0.875 kg/sqm/coat, 2 coats\nQuantity = 90 × 0.875 × 2 = 157.5 kg + 15% = 181 kg\nAt 20 kg pails = 10 pails",
//     "note": "[Verify with the datasheet] Your spec F07 uses 1.75 kg/sqm for a 2-coat system, which matches the acrylic figure. Coverage is stated on smooth substrate — on rough coba it can rise 30%. Always specify a 300 mm turn-up onto the parapet; most leaks start at the junction, not the field.",
//     "tags": [
//       "waterproofing",
//       "membrane",
//       "coating",
//       "acrylic",
//       "coverage"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Area",
//         "unit": "sqm"
//       },
//       {
//         "key": "q",
//         "label": "Coverage",
//         "unit": "kg/sqm/coat"
//       },
//       {
//         "key": "n",
//         "label": "Coats",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Area",
//         "unit": "sqm",
//         "defaultValue": 90
//       },
//       {
//         "key": "q",
//         "label": "Coverage per coat",
//         "unit": "kg/sqm",
//         "defaultValue": 0.875
//       },
//       {
//         "key": "n",
//         "label": "Coats",
//         "unit": "nos",
//         "defaultValue": 2
//       },
//       {
//         "key": "ex",
//         "label": "Extra for corners",
//         "unit": "%",
//         "defaultValue": 15
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/kg",
//         "defaultValue": 210
//       }
//     ]
//   },
//   {
//     "formulaCode": "WPF-03",
//     "name": "Sunken slab filling and bathroom waterproofing",
//     "categoryKey": "WPF",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 2645 / NBC 2016",
//     "unit": "cum · sqm",
//     "example": "Sunken depth = 300 – 450 mm below finished floor level\nFill volume = Area × depth\nFill options: brickbat + mortar (2,000 kg/cum) · lightweight EPS/vermiculite concrete (600 – 900 kg/cum)\nWaterproofing area = Floor + 300 mm upstand on all walls\n  = (L × B) + 2(L + B) × 0.3",
//     "workedExample": "Bathroom 1.8 × 2.4 m, sunk 350 mm\nFill = 1.8 × 2.4 × 0.35 = 1.512 cum\nWaterproofing area = 4.32 + 2(4.2)(0.3) = 4.32 + 2.52 = 6.84 sqm\nBrickbat fill dead load = 1.512 × 2000 = 3,024 kg on 4.32 sqm = 700 kg/sqm",
//     "note": "700 kg/sqm from sunken filling is a serious concentrated load. Lightweight fill cuts that to about 250 kg/sqm for roughly ₹1,200 extra per bathroom — cheap insurance, and it also lets the plumber rework the trap later without breaking a solid mass.",
//     "tags": [
//       "sunken slab",
//       "bathroom",
//       "waterproofing",
//       "filling",
//       "dead load"
//     ],
//     "variables": [
//       {
//         "key": "L,B",
//         "label": "Sunken area",
//         "unit": "m"
//       },
//       {
//         "key": "d",
//         "label": "Sunken depth",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Length",
//         "unit": "m",
//         "defaultValue": 1.8
//       },
//       {
//         "key": "B",
//         "label": "Width",
//         "unit": "m",
//         "defaultValue": 2.4
//       },
//       {
//         "key": "d",
//         "label": "Sunken depth",
//         "unit": "mm",
//         "defaultValue": 350
//       },
//       {
//         "key": "up",
//         "label": "Upstand",
//         "unit": "mm",
//         "defaultValue": 300
//       },
//       {
//         "key": "den",
//         "label": "Fill density",
//         "unit": "kg/cum",
//         "defaultValue": 2000
//       }
//     ]
//   },
//   {
//     "formulaCode": "WPF-04",
//     "name": "Rainwater harvesting — recharge volume",
//     "categoryKey": "WPF",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "TN Govt RWH rules · IS 15797",
//     "unit": "litres",
//     "example": "Harvestable volume (litres) = Roof area(sqm) × Rainfall(mm) × Runoff coefficient\nRunoff coefficient: RCC roof 0.85 · tiled roof 0.75 · paved area 0.70 · lawn 0.15\n\nChennai average annual rainfall ≈ 1,400 mm (NE monsoon dominant, Oct–Dec)\nRecharge pit: 1 pit of 1 m³ per 100 sqm of roof, minimum",
//     "workedExample": "Roof 90 sqm, annual rainfall 1,400 mm, RCC roof C = 0.85\nVolume = 90 × 1400 × 0.85 = 107,100 litres per year ≈ 107 kl\nSingle heaviest-day event (say 100 mm): 90 × 100 × 0.85 = 7,650 litres in one day",
//     "note": "Rainwater harvesting is mandatory for all buildings in Tamil Nadu and is checked at completion certificate stage. Size the sump for the single-event volume, not the annual total — the annual figure tells you the value, the daily figure tells you the size.",
//     "tags": [
//       "rainwater",
//       "rwh",
//       "chennai",
//       "tamil nadu",
//       "recharge",
//       "statutory"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Roof area",
//         "unit": "sqm"
//       },
//       {
//         "key": "R",
//         "label": "Rainfall",
//         "unit": "mm"
//       },
//       {
//         "key": "C",
//         "label": "Runoff coefficient",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Roof area",
//         "unit": "sqm",
//         "defaultValue": 90
//       },
//       {
//         "key": "R",
//         "label": "Annual rainfall",
//         "unit": "mm",
//         "defaultValue": 1400
//       },
//       {
//         "key": "C",
//         "label": "Runoff coeff",
//         "unit": "—",
//         "defaultValue": 0.85
//       },
//       {
//         "key": "ev",
//         "label": "Heavy-day rainfall",
//         "unit": "mm",
//         "defaultValue": 100
//       }
//     ]
//   },
//   {
//     "formulaCode": "PAINT-01",
//     "name": "Paintable area from built-up area",
//     "categoryKey": "PAINT",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "IS 1200 Pt.13",
//     "unit": "sqft",
//     "example": "Internal paintable area ≈ 3.0 – 3.5 × built-up area  (walls both faces + ceiling)\nExternal paintable area  = External wall area − openings\n\nMeasurement add-backs for painting (IS 1200 Pt.13):\n  Panelled door  ×1.30 per face · Flush door ×1.00 · Grill / railing ×0.50 of elevation\n  Corrugated sheet ×1.14",
//     "workedExample": "2,400 sqft built-up × 3.2 = 7,680 sqft internal paintable\nAt 2 coats emulsion (75 sqft/litre for 2 coats) = 102.4 litres\n= 6 buckets of 20 litres",
//     "note": "[Verify] Same multiplier as plaster (PLAST-03) — calibrate both from the same completed project and the whole finishing estimate tightens at once.",
//     "tags": [
//       "paint",
//       "area",
//       "thumb rule",
//       "estimating"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "Multiplier",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "Multiplier",
//         "unit": "—",
//         "defaultValue": 3.2
//       }
//     ]
//   },
//   {
//     "formulaCode": "PAINT-02",
//     "name": "Paint quantity by coverage",
//     "categoryKey": "PAINT",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "Manufacturer data",
//     "unit": "litres",
//     "example": "Litres = Area(sqft) ÷ Coverage(sqft per litre for the full system)\n\nCoverage per litre, per coat:\n  Wall primer          120 – 140 sqft\n  Interior emulsion    140 – 160 sqft\n  Exterior emulsion     90 – 110 sqft\n  Enamel (wood/metal)  140 – 160 sqft\n  Cement primer (ext)  100 – 120 sqft\n\nFull system = 1 primer + 2 finish coats",
//     "workedExample": "Internal 7,680 sqft: primer 1 coat at 130 = 59.1 l; emulsion 2 coats at 150 = 102.4 l\nTotal = 161.5 litres\nPutty (PLAST-04) = 7,680 ÷ 13 = 591 kg\nCost at ₹280/l emulsion + ₹150/l primer ≈ ₹37,540",
//     "note": "[Verify with the brand datasheet] Manufacturer coverage is measured on a smooth puttied surface. On bare or rough plaster the first coat can consume 40% more. Your spec F08 figures (netArea/130 primer, /90 for 2-coat emulsion) sit in the right band.",
//     "tags": [
//       "paint",
//       "coverage",
//       "emulsion",
//       "primer",
//       "enamel",
//       "litres"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Area",
//         "unit": "sqft"
//       },
//       {
//         "key": "c",
//         "label": "Coverage",
//         "unit": "sqft/litre/coat"
//       },
//       {
//         "key": "n",
//         "label": "Coats",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Area",
//         "unit": "sqft",
//         "defaultValue": 7680
//       },
//       {
//         "key": "cp",
//         "label": "Primer coverage",
//         "unit": "sqft/l",
//         "defaultValue": 130
//       },
//       {
//         "key": "ce",
//         "label": "Emulsion coverage",
//         "unit": "sqft/l/coat",
//         "defaultValue": 150
//       },
//       {
//         "key": "n",
//         "label": "Finish coats",
//         "unit": "nos",
//         "defaultValue": 2
//       },
//       {
//         "key": "rp",
//         "label": "Primer rate",
//         "unit": "INR/l",
//         "defaultValue": 150
//       },
//       {
//         "key": "re",
//         "label": "Emulsion rate",
//         "unit": "INR/l",
//         "defaultValue": 280
//       }
//     ]
//   },
//   {
//     "formulaCode": "PAINT-03",
//     "name": "Paint system sequence and interval",
//     "categoryKey": "PAINT",
//     "type": "Time",
//     "confidence": "Likely",
//     "reference": "IS 2395 Pt.1",
//     "unit": "days",
//     "example": "Internal: surface prep → 1 coat primer → 2 coats putty (sanding between) → 1 coat primer → 2 coats emulsion\nExternal: surface prep → 1 coat cement/alkali-resistant primer → 2 coats exterior emulsion\n\nRecoat interval: 4 – 6 hours (emulsion) · 12 – 16 hours (enamel) · 24 h after putty sanding\nPlaster must cure and dry 21 – 28 days before painting; moisture content below 12%",
//     "workedExample": "Painting started 10 days after plaster on a Chennai site in December\nResult: alkali attack and patchy discolouration within 4 months — the repaint cost more than the original job.",
//     "note": "[Likely] The 21–28 day plaster drying window is the most commonly compressed step in a rushed handover. If the schedule cannot allow it, use an alkali-resistant primer and tell the client in writing why.",
//     "tags": [
//       "paint",
//       "sequence",
//       "interval",
//       "curing",
//       "alkali"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Sequence and waiting periods",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "PLUMB-01",
//     "name": "Water demand and storage sizing",
//     "categoryKey": "PLUMB",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "NBC 2016 Pt.9 · IS 1172:1993",
//     "unit": "litres",
//     "example": "Daily demand = Persons × LPCD\nLPCD (NBC 2016): residences with full flushing 135 · without flushing 70\n  offices 45 · schools (day) 45 · hotels 180\n\nStorage split: Overhead tank = 1/3 of daily demand (minimum 500 l)\n               Underground sump = 2/3 of daily demand (or 2-day reserve where supply is alternate-day)",
//     "workedExample": "G+2 with 3 families, 4 persons each = 12 persons\nDemand = 12 × 135 = 1,620 litres/day\nOHT = 1,620 ÷ 3 = 540 → adopt 1,000 l (standard tank size)\nSump = 1,620 × 2/3 = 1,080 l; Chennai alternate-day supply → 2-day reserve = 3,240 l → adopt 4,000 l",
//     "note": "In Chennai, size the sump on supply frequency, not on the textbook 2/3 rule. Metro water in many zones is alternate-day or worse in summer; a 2-day sump is the practical minimum and a 3-day sump is what clients thank you for in May.",
//     "tags": [
//       "water",
//       "demand",
//       "lpcd",
//       "sump",
//       "oht",
//       "nbc",
//       "chennai"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Number of persons",
//         "unit": "nos"
//       },
//       {
//         "key": "q",
//         "label": "Per capita demand",
//         "unit": "lpcd"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "P",
//         "label": "Persons",
//         "unit": "nos",
//         "defaultValue": 12
//       },
//       {
//         "key": "q",
//         "label": "LPCD",
//         "unit": "litres",
//         "defaultValue": 135
//       },
//       {
//         "key": "r",
//         "label": "Supply reserve",
//         "unit": "days",
//         "defaultValue": 2
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLUMB-02",
//     "name": "Septic tank sizing",
//     "categoryKey": "PLUMB",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 2470 Pt.1:1985",
//     "unit": "litres · m",
//     "example": "Capacity = (Sewage flow × Detention period) + Sludge storage\n  Sewage flow     ≈ 90 – 135 lpcd\n  Detention       = 24 hours (1 day)\n  Sludge storage  ≈ 0.0765 cum/person for 1-year desludging (0.153 for 2 years)\n\nCapacity per person ≈ 210 litres (1-year cleaning) or ≈ 290 litres (2-year)\nMinimum capacity 2,000 litres · Minimum liquid depth 1.0 m · L:B ratio 2:1 to 4:1\nFree board 300 mm",
//     "workedExample": "12 persons, 1-year desludging\nCapacity = 12 × 210 = 2,520 litres = 2.52 cum\nAdopt liquid depth 1.2 m → plan area = 2.10 sqm → 2.1 m × 1.0 m (L:B = 2.1:1 ✓)\nOverall depth = 1.2 + 0.3 freeboard = 1.5 m",
//     "note": "Your BOQ spec F14 uses persons × 210 litres with a 2,000 l floor — that is the 1-year desludging basis and is correct as written. State the desludging assumption on the drawing; clients who expect 2-year intervals from a 1-year tank complain about odour, not about arithmetic.",
//     "tags": [
//       "septic tank",
//       "is 2470",
//       "sanitation",
//       "sizing"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Persons",
//         "unit": "nos"
//       },
//       {
//         "key": "q",
//         "label": "Flow",
//         "unit": "lpcd"
//       },
//       {
//         "key": "T",
//         "label": "Desludging interval",
//         "unit": "years"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "P",
//         "label": "Persons",
//         "unit": "nos",
//         "defaultValue": 12
//       },
//       {
//         "key": "q",
//         "label": "Flow",
//         "unit": "lpcd",
//         "defaultValue": 135
//       },
//       {
//         "key": "T",
//         "label": "Desludge interval",
//         "unit": "years",
//         "defaultValue": 1
//       },
//       {
//         "key": "D",
//         "label": "Liquid depth",
//         "unit": "m",
//         "defaultValue": 1.2
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLUMB-03",
//     "name": "Drainage pipe gradient and invert fall",
//     "categoryKey": "PLUMB",
//     "type": "Design",
//     "confidence": "Verify",
//     "reference": "IS 1742:1983 · NBC 2016 Pt.9",
//     "unit": "mm",
//     "example": "Fall (mm) = Pipe length(mm) ÷ Gradient denominator\n\nMinimum self-cleansing gradients (velocity ≥ 0.6 m/s):\n  100 mm dia → 1 in 60\n  150 mm dia → 1 in 100\n  200 mm dia → 1 in 150\n  250 mm dia → 1 in 200\nSoil pipe (vertical stack) 110 mm · Waste 75 mm · Vent 50 mm",
//     "workedExample": "100 mm drain, 18 m run, gradient 1:60\nFall = 18,000 ÷ 60 = 300 mm\nIf inlet invert is at −450 mm, outlet invert = −750 mm below ground\nCheck this against the street sewer invert BEFORE finalising plinth level.",
//     "note": "⚠ [Verify] Your BOQ spec F13 uses a gradient map of {100:80, 150:150} which is flatter than IS 1742 practice (1:60 and 1:100). A flatter drain silts up. Confirm the source of those numbers before Prabhu hard-codes drainage.js — this is a defect you cannot fix after the floor is laid.",
//     "tags": [
//       "drainage",
//       "gradient",
//       "slope",
//       "invert",
//       "is 1742",
//       "discrepancy"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Pipe run",
//         "unit": "m"
//       },
//       {
//         "key": "G",
//         "label": "Gradient denominator",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Pipe run",
//         "unit": "m",
//         "defaultValue": 18
//       },
//       {
//         "key": "d",
//         "label": "Pipe dia",
//         "unit": "mm",
//         "defaultValue": null
//       },
//       {
//         "key": "iv",
//         "label": "Start invert (below GL)",
//         "unit": "mm",
//         "defaultValue": 450
//       }
//     ]
//   },
//   {
//     "formulaCode": "PLUMB-04",
//     "name": "Plumbing points and pipe length estimate",
//     "categoryKey": "PLUMB",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "nos · rmt",
//     "example": "Points per bathroom: 6 – 8 (WC, health faucet, wash basin, shower, 2 taps, geyser in/out)\nPoints per kitchen : 3 – 4\nCPVC pipe ≈ 12 – 15 rmt per bathroom · UPVC drainage ≈ 10 – 12 rmt per bathroom\nThumb: total plumbing cost ≈ 5 – 7% of civil cost",
//     "workedExample": "G+2 with 6 bathrooms, 3 kitchens\nPoints = 6 × 7 + 3 × 3.5 = 42 + 10.5 = 52.5 → 53 points\nCPVC = 6 × 13 = 78 rmt · UPVC = 6 × 11 = 66 rmt",
//     "note": "[Verify against your last project] Point-based plumbing contracts are common in Chennai (₹ per point, labour only). Count the points from the drawing before agreeing a lump sum — the difference between 45 and 53 points is real money and always surfaces as a claim at the end.",
//     "tags": [
//       "plumbing",
//       "points",
//       "cpvc",
//       "upvc",
//       "estimating"
//     ],
//     "variables": [
//       {
//         "key": "n_b",
//         "label": "Bathrooms",
//         "unit": "nos"
//       },
//       {
//         "key": "n_k",
//         "label": "Kitchens",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Bathrooms",
//         "unit": "nos",
//         "defaultValue": 6
//       },
//       {
//         "key": "pb",
//         "label": "Points per bath",
//         "unit": "nos",
//         "defaultValue": 7
//       },
//       {
//         "key": "k",
//         "label": "Kitchens",
//         "unit": "nos",
//         "defaultValue": 3
//       },
//       {
//         "key": "pk",
//         "label": "Points per kitchen",
//         "unit": "nos",
//         "defaultValue": 3.5
//       },
//       {
//         "key": "r",
//         "label": "Labour per point",
//         "unit": "INR",
//         "defaultValue": 850
//       }
//     ]
//   },
//   {
//     "formulaCode": "ELEC-01",
//     "name": "Connected load and maximum demand",
//     "categoryKey": "ELEC",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 732:2019 · NBC 2016 Pt.8",
//     "unit": "W · kW",
//     "example": "Connected load = Σ (quantity × wattage)\n  LED light 12 W · Tube 20 W · Ceiling fan 75 W · TV 120 W · Fridge 200 W\n  Washing machine 800 W · Microwave 1,200 W · Geyser 2,000 W\n  AC 1.0 T 1,200 W · 1.5 T 1,500 W · 2.0 T 2,200 W · Motor 1 HP 750 W\n\nMaximum demand = Connected load × Diversity factor\n  Diversity: single residence 0.6 – 0.7 · apartment block 0.5 – 0.6",
//     "workedExample": "Single flat: 20 lights (12 W), 6 fans, 2 AC of 1.5 T, 1 geyser, misc 1,500 W\n= 240 + 450 + 3,000 + 2,000 + 1,500 = 7,190 W\nMax demand = 7,190 × 0.65 = 4,674 W ≈ 4.7 kW\nSanctioned load to apply for from TNEB: 5 kW",
//     "note": "Your spec F16 uses a diversity factor of 0.65 — correct for a single residence. Apply for the sanctioned load based on maximum demand, not connected load; TNEB tariff slabs and the service cable size both follow from it.",
//     "tags": [
//       "electrical",
//       "load",
//       "diversity",
//       "tneb",
//       "sanctioned load"
//     ],
//     "variables": [
//       {
//         "key": "W",
//         "label": "Connected load",
//         "unit": "W"
//       },
//       {
//         "key": "DF",
//         "label": "Diversity factor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "l",
//         "label": "Lights",
//         "unit": "nos",
//         "defaultValue": 20
//       },
//       {
//         "key": "lw",
//         "label": "Watt each",
//         "unit": "W",
//         "defaultValue": 12
//       },
//       {
//         "key": "f",
//         "label": "Fans",
//         "unit": "nos",
//         "defaultValue": 6
//       },
//       {
//         "key": "ac",
//         "label": "AC 1.5T",
//         "unit": "nos",
//         "defaultValue": 2
//       },
//       {
//         "key": "gy",
//         "label": "Geysers",
//         "unit": "nos",
//         "defaultValue": 1
//       },
//       {
//         "key": "ms",
//         "label": "Misc load",
//         "unit": "W",
//         "defaultValue": 1500
//       },
//       {
//         "key": "df",
//         "label": "Diversity",
//         "unit": "—",
//         "defaultValue": 0.65
//       }
//     ]
//   },
//   {
//     "formulaCode": "ELEC-02",
//     "name": "Current, MCB rating and cable size",
//     "categoryKey": "ELEC",
//     "type": "Design",
//     "confidence": "Verify",
//     "reference": "IS 732:2019 · IS 8828",
//     "unit": "A · sqmm",
//     "example": "Single phase: I = P ÷ (V × pf)        V = 230 V, pf ≈ 0.85\nThree phase : I = P ÷ (√3 × V × pf)   V = 415 V\n\nMCB = next standard rating above design current\nStandard MCB: 6, 10, 16, 20, 25, 32, 40, 63, 100 A\n\nIndicative copper cable capacity (PVC, conduit, 40 °C):\n  1.0 sqmm ≈ 11 A · 1.5 ≈ 14 A · 2.5 ≈ 19 A · 4 ≈ 25 A · 6 ≈ 32 A · 10 ≈ 44 A · 16 ≈ 59 A",
//     "workedExample": "Max demand 4,674 W, single phase\nI = 4,674 ÷ (230 × 0.85) = 23.9 A\nMain MCB = 25 A · Service cable = 6 sqmm copper (32 A capacity) ✓",
//     "note": "⚠ [Verify with a licensed electrician — Rajan T.] Cable capacities must be derated for ambient temperature, grouping and installation method per IS 732 tables. The figures above are indicative only; an undersized cable is a fire risk, not a cost saving. Never finalise cable size from a thumb table alone.",
//     "tags": [
//       "electrical",
//       "mcb",
//       "cable",
//       "current",
//       "is 732",
//       "safety"
//     ],
//     "variables": [
//       {
//         "key": "P",
//         "label": "Load",
//         "unit": "W"
//       },
//       {
//         "key": "V",
//         "label": "Voltage",
//         "unit": "V"
//       },
//       {
//         "key": "pf",
//         "label": "Power factor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "P",
//         "label": "Load",
//         "unit": "W",
//         "defaultValue": 4674
//       },
//       {
//         "key": "ph",
//         "label": "Phase",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "pf",
//         "label": "Power factor",
//         "unit": "—",
//         "defaultValue": 0.85
//       }
//     ]
//   },
//   {
//     "formulaCode": "ELEC-03",
//     "name": "Electrical points per sqft",
//     "categoryKey": "ELEC",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice / NBC 2016",
//     "unit": "points",
//     "example": "Points ≈ Built-up area(sqft) ÷ 45 to 60   (modern residential with more sockets)\nOlder thumb: 1 point per 80 – 100 sqft\n\nPer-room guide: bedroom 8 – 10 · living 12 – 16 · kitchen 8 – 12 · bathroom 4 – 5\nConduit ≈ 2.5 – 3.0 rmt per point · Wire ≈ 9 – 12 rmt per point (2 runs + earth)",
//     "workedExample": "2,400 sqft ÷ 50 = 48 points per floor-equivalent\nFor G+2 at 800 sqft each floor: 800/50 = 16 points × 3 = 48 points\nWire = 48 × 10 = 480 rmt ≈ 5 coils of 90 m",
//     "note": "[Verify] Point count drives the electrical labour contract. Count from the drawing, not the thumb rule, before signing — and price extra points in the contract at a stated rate, because clients always add three after the conduiting is done.",
//     "tags": [
//       "electrical",
//       "points",
//       "thumb rule",
//       "wiring",
//       "conduit"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "sqft per point",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "sqft per point",
//         "unit": "—",
//         "defaultValue": 50
//       },
//       {
//         "key": "r",
//         "label": "Rate per point",
//         "unit": "INR",
//         "defaultValue": 950
//       }
//     ]
//   },
//   {
//     "formulaCode": "LAB-01",
//     "name": "Labour days from quantity and productivity (master)",
//     "categoryKey": "LAB",
//     "type": "Labour",
//     "confidence": "Verify",
//     "reference": "CPWD Analysis of Rates (basis)",
//     "unit": "man-days",
//     "example": "Skilled man-days = Quantity ÷ Output per skilled worker per day\nHelper man-days  = Skilled man-days × Helper ratio\nCalendar days    = Skilled man-days ÷ Number of skilled workers deployed\nLabour cost      = (Skilled days × Skilled wage) + (Helper days × Helper wage)",
//     "workedExample": "Brickwork 6.90 cum, mason output 1.1 cum/day, helper ratio 2, crew of 3 masons\nMason days = 6.90 ÷ 1.1 = 6.27 man-days\nHelper days = 6.27 × 2 = 12.55 man-days\nCalendar = 6.27 ÷ 3 = 2.09 → 3 days on site\nCost = 6.27 × ₹1,100 + 12.55 × ₹750 = ₹6,897 + ₹9,412 = ₹16,309",
//     "note": "[Verify — THE most important calibration in this library] Every output figure here is a trade range, not a code value. Record actual output on your next three activities at Ayapakkam (quantity completed ÷ workers × days) and replace these numbers. Once calibrated, this one formula prices and schedules every trade you run.",
//     "tags": [
//       "labour",
//       "productivity",
//       "man days",
//       "crew",
//       "scheduling",
//       "cost"
//     ],
//     "variables": [
//       {
//         "key": "Q",
//         "label": "Quantity of work",
//         "unit": "varies"
//       },
//       {
//         "key": "O",
//         "label": "Output per man-day",
//         "unit": "varies"
//       },
//       {
//         "key": "n",
//         "label": "Crew size",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "a",
//         "label": "Activity",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "(see unit)",
//         "defaultValue": 6.9
//       },
//       {
//         "key": "p",
//         "label": "Output position",
//         "unit": "0=low 1=high",
//         "defaultValue": 0.5
//       },
//       {
//         "key": "n",
//         "label": "Skilled crew size",
//         "unit": "nos",
//         "defaultValue": 3
//       },
//       {
//         "key": "ws",
//         "label": "Skilled wage",
//         "unit": "INR/day",
//         "defaultValue": 1100
//       },
//       {
//         "key": "wh",
//         "label": "Helper wage",
//         "unit": "INR/day",
//         "defaultValue": 750
//       }
//     ]
//   },
//   {
//     "formulaCode": "LAB-02",
//     "name": "Standard labour output table (all trades)",
//     "categoryKey": "LAB",
//     "type": "Labour",
//     "confidence": "Verify",
//     "reference": "CPWD DSR / trade practice",
//     "unit": "per man-day",
//     "example": "Excavation manual (soft soil)  2.5 – 3.0 cum/mazdoor-day\nPCC mix & lay                  1.5 – 2.0 cum/mason-day (1 mason : 4 helpers)\nRCC manual                     1.0 – 1.3 cum/mason-day (1 mason : 8 helpers)\nBrickwork 230 mm               1.0 – 1.25 cum/mason-day  ≈ 500 bricks/day\nBrickwork 115 mm               8 – 10 sqm/mason-day\nPlaster 12 mm internal         8 – 10 sqm/mason-day\nPlaster 15 mm external         6 – 8 sqm/mason-day\nBar bending & binding          100 – 150 kg/bender-day\nShuttering fixing              8 – 10 sqm/carpenter-day\nFloor tiling                   8 – 12 sqm/mason-day\nPutty / primer / emulsion      20–25 / 40–45 / 35–40 sqm per coat per painter-day\nElectrical conduiting / wiring 8–10 / 12–15 points per electrician-day",
//     "workedExample": "Cross-check: a 6-mason gang should complete roughly 6.6 cum of 9-inch brickwork a day — about 3,300 bricks. If your site logs 2,000, either the gang is under-staffed with helpers or the material is not reaching the wall.",
//     "note": "[Verify] These are budgeting ranges drawn from standard Indian rate-analysis practice, not from a published code table. Treat the low end as monsoon / congested site and the high end as open, well-supplied work. SiteOps already captures daily headcount and progress — that data is exactly what replaces this table.",
//     "tags": [
//       "labour",
//       "output",
//       "table",
//       "trades",
//       "cpwd",
//       "productivity"
//     ],
//     "variables": [
//       {
//         "key": "O",
//         "label": "Output per man-day",
//         "unit": "varies"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "LAB-03",
//     "name": "Crew composition for a residential site",
//     "categoryKey": "LAB",
//     "type": "Labour",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "nos",
//     "example": "Helper (mazdoor) requirement = Skilled workers × Trade ratio\n\nTrade ratios (skilled : helper):\n  RCC concreting 1 : 8 · Brickwork 1 : 2 · Plastering 1 : 1.5\n  Tiling 1 : 1 · Painting 1 : 0.5 · Bar bending 1 : 1 · Carpentry 1 : 1\n\nSupervision: 1 site engineer per 8,000 – 12,000 sqft of active work\n             1 supervisor / maistry per 15 – 20 workers",
//     "workedExample": "Slab pour day: 3 masons for concreting → 24 helpers, plus 2 bar benders + 2 carpenters standing by\nTotal headcount on a pour day ≈ 32 — which is why slab days need advance planning and a full material stock the previous evening.",
//     "note": "[Verify] A manual RCC pour is the single most labour-intensive day on the programme. If your headcount cannot reach roughly 30 for a 12 cum slab, either hire a concrete pump with RMC or split the pour with a proper construction joint — do not stretch the pour past the initial setting time.",
//     "tags": [
//       "crew",
//       "gang",
//       "helper ratio",
//       "supervision",
//       "manpower"
//     ],
//     "variables": [
//       {
//         "key": "n_s",
//         "label": "Skilled workers",
//         "unit": "nos"
//       },
//       {
//         "key": "r",
//         "label": "Helper ratio",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "s",
//         "label": "Skilled workers",
//         "unit": "nos",
//         "defaultValue": 3
//       },
//       {
//         "key": "r",
//         "label": "Helper ratio",
//         "unit": "—",
//         "defaultValue": 8
//       },
//       {
//         "key": "sqft",
//         "label": "Active area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       }
//     ]
//   },
//   {
//     "formulaCode": "LAB-04",
//     "name": "Labour cost with overtime, ESI and PF",
//     "categoryKey": "LAB",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "TN Factories Act · ESI Act · EPF Act",
//     "unit": "INR",
//     "example": "Basic wage cost = Man-days × Daily wage\nOvertime        = OT hours × (Daily wage ÷ 8) × 2      [TN: 2× for overtime]\nESI (employer)  = 3.25% of wages   (employee 0.75%)\nPF (employer)   = 12% of basic wages\nContractor margin = 10 – 15%\n\nTotal = (Basic + OT) × (1 + ESI% + PF%) × (1 + margin%)",
//     "workedExample": "120 mason-days at ₹1,100, 40 OT hours, ESI 3.25%, PF 12%, margin 12%\nBasic = 120 × 1,100 = ₹1,32,000\nOT = 40 × (1,100 ÷ 8) × 2 = 40 × 275 = ₹11,000\nSubtotal = ₹1,43,000\nStatutory = ₹1,43,000 × 15.25% = ₹21,808\nMargin = (1,43,000 + 21,808) × 12% = ₹19,777\nTotal = ₹1,84,585",
//     "note": "[Verify current rates] ESI 3.25% employer / 0.75% employee and PF 12% match what LabourLedger already carries. Statutory rates and wage-ceiling thresholds change — confirm with your auditor each financial year before using these in a client quotation.",
//     "tags": [
//       "labour cost",
//       "overtime",
//       "esi",
//       "pf",
//       "statutory",
//       "labourledger"
//     ],
//     "variables": [
//       {
//         "key": "D",
//         "label": "Man-days",
//         "unit": "days"
//       },
//       {
//         "key": "W",
//         "label": "Daily wage",
//         "unit": "INR"
//       },
//       {
//         "key": "OT",
//         "label": "Overtime hours",
//         "unit": "hrs"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "D",
//         "label": "Man-days",
//         "unit": "days",
//         "defaultValue": 120
//       },
//       {
//         "key": "W",
//         "label": "Daily wage",
//         "unit": "INR",
//         "defaultValue": 1100
//       },
//       {
//         "key": "ot",
//         "label": "OT hours",
//         "unit": "hrs",
//         "defaultValue": 40
//       },
//       {
//         "key": "esi",
//         "label": "ESI employer",
//         "unit": "%",
//         "defaultValue": 3.25
//       },
//       {
//         "key": "pf",
//         "label": "PF employer",
//         "unit": "%",
//         "defaultValue": 12
//       },
//       {
//         "key": "m",
//         "label": "Margin",
//         "unit": "%",
//         "defaultValue": 12
//       }
//     ]
//   },
//   {
//     "formulaCode": "TIME-01",
//     "name": "Activity duration from quantity and crew",
//     "categoryKey": "TIME",
//     "type": "Time",
//     "confidence": "Verify",
//     "reference": "Derived",
//     "unit": "days",
//     "example": "Duration (days) = Quantity ÷ (Output per man-day × Crew size × Efficiency)\n\nEfficiency factor: normal 1.00 · monsoon 0.70 – 0.80 · congested site 0.85\n                   first-time crew 0.75 · night shift 0.85\nAdd float: 10 – 15% on every activity, 20% on weather-exposed activities",
//     "workedExample": "Plastering 713 sqm internal, output 9 sqm/mason-day, 6 masons, monsoon efficiency 0.75\nDuration = 713 ÷ (9 × 6 × 0.75) = 713 ÷ 40.5 = 17.6 → 18 days\nWith 15% float = 21 days on the programme",
//     "note": "[Verify] Most residential programmes slip because the efficiency factor is silently assumed to be 1.0 in October–December. For Chennai, plan the NE monsoon (Oct–Dec) at 0.7 for all external and roof work. Schedule internal finishing into that window deliberately.",
//     "tags": [
//       "duration",
//       "schedule",
//       "crew",
//       "efficiency",
//       "monsoon",
//       "planning"
//     ],
//     "variables": [
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "varies"
//       },
//       {
//         "key": "O",
//         "label": "Output/man-day",
//         "unit": "varies"
//       },
//       {
//         "key": "n",
//         "label": "Crew",
//         "unit": "nos"
//       },
//       {
//         "key": "e",
//         "label": "Efficiency",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "units",
//         "defaultValue": 713
//       },
//       {
//         "key": "O",
//         "label": "Output per man-day",
//         "unit": "units",
//         "defaultValue": 9
//       },
//       {
//         "key": "n",
//         "label": "Crew size",
//         "unit": "nos",
//         "defaultValue": 6
//       },
//       {
//         "key": "e",
//         "label": "Efficiency",
//         "unit": "—",
//         "defaultValue": 0.75
//       },
//       {
//         "key": "fl",
//         "label": "Float",
//         "unit": "%",
//         "defaultValue": 15
//       }
//     ]
//   },
//   {
//     "formulaCode": "TIME-02",
//     "name": "Slab cycle time per floor",
//     "categoryKey": "TIME",
//     "type": "Time",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "days",
//     "example": "Slab cycle = Column casting + Shuttering + Reinforcement + Pour + Curing/prop period\n\nConventional timber/ply formwork, residential: 21 – 30 days per floor\nSystem formwork (aluminium) : 7 – 14 days per floor\nWith PPC / blended cement   : add 3 – 4 days for prop removal\n\nTypical break-up (conventional, one floor of 1,000 sqft):\n  Column reinforcement + shuttering + pour  5 days\n  Slab & beam shuttering                    6 days\n  Slab & beam reinforcement                 5 days\n  Services conduiting in slab               1 day\n  Pour + finish                             1 day\n  Prop retention before next floor          7 days",
//     "workedExample": "G+2 (3 slabs) at 25-day cycle = 75 days of structural work\nPlus foundation 30 days and finishing 120 days → 225 days ≈ 7.5 months\nAdd monsoon and approval delays: 10 – 12 months realistic for a 2,400 sqft house.",
//     "note": "[Verify against your own sites] The gap between the 25-day plan and the 35-day reality is almost always material supply, not labour. Track \"days lost waiting for material\" as a separate field in SiteOps — it is usually the largest single line.",
//     "tags": [
//       "slab cycle",
//       "schedule",
//       "floor",
//       "formwork",
//       "duration"
//     ],
//     "variables": [
//       {
//         "key": "—",
//         "label": "Cycle components",
//         "unit": "days"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "c",
//         "label": "Column stage",
//         "unit": "days",
//         "defaultValue": 5
//       },
//       {
//         "key": "sh",
//         "label": "Shuttering",
//         "unit": "days",
//         "defaultValue": 6
//       },
//       {
//         "key": "rf",
//         "label": "Reinforcement",
//         "unit": "days",
//         "defaultValue": 5
//       },
//       {
//         "key": "sv",
//         "label": "Services",
//         "unit": "days",
//         "defaultValue": 1
//       },
//       {
//         "key": "p",
//         "label": "Pour",
//         "unit": "days",
//         "defaultValue": 1
//       },
//       {
//         "key": "pr",
//         "label": "Prop retention",
//         "unit": "days",
//         "defaultValue": 7
//       },
//       {
//         "key": "n",
//         "label": "No. of floors",
//         "unit": "nos",
//         "defaultValue": 3
//       }
//     ]
//   },
//   {
//     "formulaCode": "TIME-03",
//     "name": "Minimum curing periods",
//     "categoryKey": "TIME",
//     "type": "Time",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.13.5",
//     "unit": "days",
//     "example": "RCC with OPC, normal exposure      :  7 days minimum\nRCC with PPC / blended cement       : 10 days minimum\nRCC in hot weather (>35 °C) or severe exposure : 14 days\nBrick masonry                       :  7 days\nPlaster                             :  7 days (keep damp, not flooded)\nConcrete flooring / IPS             : 14 days\nWaterproofing coba                  : 14 days + 24 h ponding test",
//     "workedExample": "Ponding test after coba: fill terrace 50 mm deep, hold 24–48 hours, inspect the ceiling below.\nThis one test, done before flooring, prevents the most expensive category of client complaint.",
//     "note": "[Likely — confirm against a current IS 456 copy] Curing is free and is the step most often cut when the site is behind. A slab cured 3 days instead of 7 loses roughly 20–25% of its 28-day strength. There is no way to add it back later.",
//     "tags": [
//       "curing",
//       "is 456",
//       "quality",
//       "ponding test",
//       "time"
//     ],
//     "variables": [
//       {
//         "key": "t",
//         "label": "Curing period",
//         "unit": "days"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "TIME-04",
//     "name": "Overall project duration thumb rule",
//     "categoryKey": "TIME",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "months",
//     "example": "Duration (months) ≈ Built-up area(sqft) ÷ 200 to 250   (individual residence, conventional)\n\nStage split (% of total duration):\n  Foundation & plinth  12 – 15%\n  Superstructure RCC   30 – 35%\n  Masonry & plaster    18 – 20%\n  Finishing (tile, paint, joinery) 25 – 30%\n  Services & handover   5 – 8%",
//     "workedExample": "2,400 sqft ÷ 220 = 10.9 months\nStage split: foundation 1.5 mo · RCC 3.6 mo · masonry+plaster 2.1 mo · finishing 3.0 mo · services 0.7 mo",
//     "note": "[Verify] This is a pre-contract sanity check, not a programme. A real programme comes from TIME-01 applied activity by activity. But if your detailed programme says 7 months for 2,400 sqft, this rule says check it again — nobody finishes that fast without RMC, system formwork and uninterrupted cash flow.",
//     "tags": [
//       "duration",
//       "project",
//       "thumb rule",
//       "programme",
//       "stages"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "Divisor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "Divisor",
//         "unit": "—",
//         "defaultValue": 220
//       }
//     ]
//   },
//   {
//     "formulaCode": "TIME-05",
//     "name": "Concrete handling time limits",
//     "categoryKey": "TIME",
//     "type": "Time",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.13.2 · IS 269",
//     "unit": "minutes",
//     "example": "Initial setting time (OPC)  : not less than 30 minutes\nFinal setting time          : not more than 600 minutes (10 hours)\nConcrete must be placed and compacted within the initial setting time\nPractical limit, site mix    : 30 minutes from water contact\nRMC with retarder            : 90 – 120 minutes from batching\nRe-tempering with water      : NOT permitted\nConstruction joint if delay exceeds 30 min between layers",
//     "workedExample": "A 12 cum manual pour at 1.2 cum/mason-day output needs a large gang precisely because every batch must be placed within 30 minutes. This is a sequencing constraint, not a productivity one.",
//     "note": "[Likely] Watch for the afternoon slowdown on a big pour. If the last 2 cum goes in after the first has set, you have an unplanned cold joint at mid-span — the worst possible location. Plan the pour sequence and the stopping line before the mixer starts.",
//     "tags": [
//       "setting time",
//       "concrete",
//       "cold joint",
//       "pour",
//       "is 456"
//     ],
//     "variables": [
//       {
//         "key": "t",
//         "label": "Time from mixing",
//         "unit": "min"
//       }
//     ],
//     "calcInputs": []
//   },
//   {
//     "formulaCode": "THUMB-01",
//     "name": "Material quantity per sqft of built-up area",
//     "categoryKey": "THUMB",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice / BN Datta",
//     "unit": "per sqft",
//     "example": "Quantity = Built-up area(sqft) × Coefficient\n\nCoefficient bands (RCC framed residential, G to G+2):\n  Cement      0.35 – 0.45 bags/sqft   (use 0.40)\n  Steel       3.50 – 4.50 kg/sqft     (use 4.00)\n  River sand  1.00 – 1.40 cft/sqft    (use 1.20)\n  Aggregate   1.00 – 1.35 cft/sqft    (use 1.20)\n  Bricks      7 – 9 nos/sqft          (use 8)\n  Flooring    1.20 – 1.30 sqft/sqft\n  Paint       0.15 – 0.20 litre/sqft",
//     "workedExample": "2,400 sqft at the mid-band figures:\nCement = 2400 × 0.40 = 960 bags\nSteel  = 2400 × 4.00 = 9,600 kg = 9.6 MT\nSand   = 2400 × 1.20 = 2,880 cft = 28.8 units\nAggregate = 2,880 cft = 28.8 units\nBricks = 2400 × 8 = 19,200 nos",
//     "note": "[Verify — calibrate from your own completed projects] These bands vary with structural system, number of floors, span lengths and finish level by ±25%. Use them to sanity-check a detailed BOQ, never to replace one. The calibration loop in the \"Reusable Loops\" tab shows exactly how to derive your own coefficients from three completed sites.",
//     "tags": [
//       "thumb rule",
//       "per sqft",
//       "cement",
//       "steel",
//       "sand",
//       "bricks",
//       "estimating",
//       "calibrate"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "c",
//         "label": "Coefficient",
//         "unit": "per sqft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "ce",
//         "label": "Cement",
//         "unit": "bags/sqft",
//         "defaultValue": 0.4
//       },
//       {
//         "key": "st",
//         "label": "Steel",
//         "unit": "kg/sqft",
//         "defaultValue": 4
//       },
//       {
//         "key": "sa",
//         "label": "Sand",
//         "unit": "cft/sqft",
//         "defaultValue": 1.2
//       },
//       {
//         "key": "ag",
//         "label": "Aggregate",
//         "unit": "cft/sqft",
//         "defaultValue": 1.2
//       },
//       {
//         "key": "br",
//         "label": "Bricks",
//         "unit": "nos/sqft",
//         "defaultValue": 8
//       }
//     ]
//   },
//   {
//     "formulaCode": "THUMB-02",
//     "name": "RCC volume and concrete per sqft",
//     "categoryKey": "THUMB",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Derived",
//     "unit": "cum/sqft",
//     "example": "Total RCC volume ≈ Built-up area(sqft) × 0.035 to 0.045 cum/sqft\n\nSplit by member (% of total RCC):\n  Footings & pedestals 12 – 15% · Columns 12 – 15% · Plinth beams 8 – 10%\n  Beams 20 – 25% · Slabs 35 – 40% · Staircase & misc 5 – 8%",
//     "workedExample": "2,400 sqft × 0.040 = 96 cum of RCC\nCement at M20 equivalent = 96 × 8.06 = 774 bags (structure only)\nRemaining cement (masonry, plaster, flooring) = 960 − 774 = 186 bags — which cross-checks THUMB-01.",
//     "note": "[Verify] This coefficient is the bridge between the thumb rule and the BOQ. If your detailed BOQ produces 0.055 cum/sqft, the sections are oversized; if it produces 0.028, check whether the beam/slab overlap has been double-deducted.",
//     "tags": [
//       "rcc",
//       "concrete",
//       "thumb rule",
//       "per sqft",
//       "cross check"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft"
//       },
//       {
//         "key": "k",
//         "label": "RCC coefficient",
//         "unit": "cum/sqft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Built-up area",
//         "unit": "sqft",
//         "defaultValue": 2400
//       },
//       {
//         "key": "k",
//         "label": "RCC coeff",
//         "unit": "cum/sqft",
//         "defaultValue": 0.04
//       }
//     ]
//   },
//   {
//     "formulaCode": "THUMB-03",
//     "name": "Carpet, built-up and super built-up area",
//     "categoryKey": "THUMB",
//     "type": "Thumb Rule",
//     "confidence": "Likely",
//     "reference": "RERA 2016 definition",
//     "unit": "sqft",
//     "example": "Carpet area      = Net usable floor area within walls (RERA definition — excludes external walls, balcony, shaft)\nBuilt-up area     = Carpet + wall thickness + balcony ≈ Carpet ÷ 0.70 to 0.80\nSuper built-up    = Built-up + share of common areas ≈ Built-up × 1.20 to 1.35\n\nLoading factor = (Super built-up − Carpet) ÷ Carpet",
//     "workedExample": "Carpet 1,700 sqft → Built-up = 1,700 ÷ 0.75 = 2,267 sqft → Super built-up = 2,267 × 1.25 = 2,833 sqft\nLoading factor = (2,833 − 1,700) ÷ 1,700 = 66.6%",
//     "note": "Under RERA, apartments must be sold on carpet area. For an individual residence the client thinks in built-up area and the contractor quotes per built-up sqft — state which basis your rate applies to in the agreement, in one line. Disputes over this are common and entirely avoidable.",
//     "tags": [
//       "carpet area",
//       "built up",
//       "super built up",
//       "rera",
//       "loading factor"
//     ],
//     "variables": [
//       {
//         "key": "A_c",
//         "label": "Carpet area",
//         "unit": "sqft"
//       },
//       {
//         "key": "A_b",
//         "label": "Built-up area",
//         "unit": "sqft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "c",
//         "label": "Carpet area",
//         "unit": "sqft",
//         "defaultValue": 1700
//       },
//       {
//         "key": "e",
//         "label": "Carpet efficiency",
//         "unit": "—",
//         "defaultValue": 0.75
//       },
//       {
//         "key": "l",
//         "label": "Common area loading",
//         "unit": "—",
//         "defaultValue": 1.25
//       }
//     ]
//   },
//   {
//     "formulaCode": "THUMB-04",
//     "name": "Preliminary member sizing thumb rules",
//     "categoryKey": "THUMB",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice — NOT a design",
//     "unit": "mm",
//     "example": "Slab thickness      ≈ Short span ÷ 28 (two-way continuous), minimum 100 mm; 125 mm typical residential\nBeam depth          ≈ Span ÷ 12 to Span ÷ 15  (in mm: span in ft × 25 approximately)\nBeam width          ≈ 0.5 × depth, minimum 200 mm (230 mm to match wall)\nColumn (G+1)        230 × 230 mm with 4–6 nos 12 mm\nColumn (G+2)        230 × 300 to 230 × 450 mm\nLintel depth        ≈ Opening ÷ 12, minimum 150 mm\nCantilever depth    ≈ Projection ÷ 7",
//     "workedExample": "Span 4.2 m → beam depth = 4,200 ÷ 12 = 350 mm, adopt 450 mm with slab\nSlab short span 4.0 m → 4,000 ÷ 28 = 143 mm → adopt 125 mm with proper steel, or 150 mm for comfort",
//     "note": "⚠ [Verify — these are NOT design values] Sizing thumb rules are for quoting and for checking whether a drawing looks sane. Every member must be designed by a qualified structural engineer against actual loads, span continuity, and IS 456 deflection limits. Your BOQ spec F09 uses lx/28 for effective depth, which is on the slender side — confirm it carries the modification factor for tension steel per IS 456 cl.23.2.1.",
//     "tags": [
//       "sizing",
//       "thumb rule",
//       "beam",
//       "column",
//       "slab",
//       "preliminary",
//       "warning"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Span",
//         "unit": "m"
//       },
//       {
//         "key": "t",
//         "label": "Thickness",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Span",
//         "unit": "m",
//         "defaultValue": 4.2
//       },
//       {
//         "key": "sl",
//         "label": "Slab short span",
//         "unit": "m",
//         "defaultValue": 4
//       }
//     ]
//   },
//   {
//     "formulaCode": "THUMB-05",
//     "name": "Openings, ventilation and door/window area",
//     "categoryKey": "THUMB",
//     "type": "Thumb Rule",
//     "confidence": "Likely",
//     "reference": "NBC 2016 Pt.3 · TN Building Rules",
//     "unit": "sqm",
//     "example": "Window area ≥ 1/10 of floor area (habitable room, natural light & ventilation)\nHabitable room minimum area 9.5 sqm, minimum width 2.4 m\nKitchen minimum 5.0 sqm · Bathroom minimum 1.8 sqm (1.2 m min width)\nMinimum floor-to-ceiling height 2.75 m (habitable), 2.4 m (bathroom/store)\nDoor sizes: main 1.0 × 2.1 m · bedroom 0.9 × 2.1 m · bathroom 0.75 × 2.1 m",
//     "workedExample": "Bedroom 3.6 × 3.6 = 12.96 sqm\nMinimum window = 12.96 ÷ 10 = 1.30 sqm → a 1.2 × 1.2 m window (1.44 sqm) satisfies it",
//     "note": "[Likely — verify against current TN Combined Development and Building Rules] Room dimensions and ventilation ratios are checked at CMDA sanction and again at completion. A room that fails the 1/10 rule cannot be regularised without cutting a new opening in a structural wall.",
//     "tags": [
//       "nbc",
//       "ventilation",
//       "window",
//       "room size",
//       "cmda",
//       "statutory"
//     ],
//     "variables": [
//       {
//         "key": "A_f",
//         "label": "Floor area",
//         "unit": "sqm"
//       },
//       {
//         "key": "A_w",
//         "label": "Window area",
//         "unit": "sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Room length",
//         "unit": "m",
//         "defaultValue": 3.6
//       },
//       {
//         "key": "B",
//         "label": "Room width",
//         "unit": "m",
//         "defaultValue": 3.6
//       },
//       {
//         "key": "r",
//         "label": "Ventilation ratio 1:n",
//         "unit": "—",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-01",
//     "name": "Standard wastage allowances",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "%",
//     "example": "Quantity to order = Theoretical quantity × (1 + wastage%)\n\nCement       2 – 3%   (spillage, hardened bags)\nSteel        3 – 5%   (cutting waste, off-cuts)\nSand         5 – 8%   (handling, lorry shortfall)\nAggregate    3 – 5%\nBricks       5 – 8%   (breakage in transit and handling)\nTiles        5 – 15%  (layout dependent)\nPaint        5 – 10%\nPlaster mortar 10 – 15%\nElectrical wire 5 – 10%",
//     "workedExample": "Steel 9,600 kg theoretical at 4% wastage = 9,984 kg to order\nAt ₹62/kg the wastage alone is ₹23,808 — worth managing, not ignoring.",
//     "note": "[Verify] Wastage is a management variable, not a constant. Off-cut steel can be reused for stirrups and chairs if the bar bender is instructed; broken bricks go into coba instead of the skip. Track actual wastage per material in SiteOps and you will find one or two materials carrying nearly all of it.",
//     "tags": [
//       "wastage",
//       "material",
//       "ordering",
//       "procurement"
//     ],
//     "variables": [
//       {
//         "key": "Q",
//         "label": "Theoretical quantity",
//         "unit": "varies"
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "Q",
//         "label": "Theoretical quantity",
//         "unit": "units",
//         "defaultValue": 9600
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 4
//       },
//       {
//         "key": "r",
//         "label": "Rate",
//         "unit": "INR/unit",
//         "defaultValue": 62
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-02",
//     "name": "Rate analysis structure",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Likely",
//     "reference": "CPWD Analysis of Rates (structure)",
//     "unit": "INR/unit",
//     "example": "Rate per unit = Material + Labour + Plant + Overheads + Profit\n\n  Material cost   = Σ (quantity × rate) including wastage\n  Labour cost     = Σ (man-days × wage) including statutory\n  Plant / tools   = 1 – 3% of material + labour (\"sundries & T&P\")\n  Overheads       = 5 – 8%  (site establishment, supervision, water, power)\n  Profit          = 8 – 12%\n\nContractor margin (overheads + profit) commonly quoted as a single 15%",
//     "workedExample": "Brickwork per cum: material ₹5,480 (bricks + cement + sand), labour ₹2,360\nSub-total = ₹7,840\nT&P 2% = ₹157 · Overheads 6% = ₹470 · Profit 10% = ₹847\nRate = ₹9,314 per cum",
//     "note": "[Likely] Building your own rate analysis from this structure — rather than accepting a market rate — is what lets you argue a contractor quote line by line. CivilMind already has RateSync (materials) and LabourLedger (wages); this formula is the join between them.",
//     "tags": [
//       "rate analysis",
//       "costing",
//       "overhead",
//       "profit",
//       "cpwd",
//       "boq"
//     ],
//     "variables": [
//       {
//         "key": "M",
//         "label": "Material",
//         "unit": "INR"
//       },
//       {
//         "key": "L",
//         "label": "Labour",
//         "unit": "INR"
//       },
//       {
//         "key": "OH",
//         "label": "Overhead",
//         "unit": "%"
//       },
//       {
//         "key": "P",
//         "label": "Profit",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "M",
//         "label": "Material cost",
//         "unit": "INR",
//         "defaultValue": 5480
//       },
//       {
//         "key": "L",
//         "label": "Labour cost",
//         "unit": "INR",
//         "defaultValue": 2360
//       },
//       {
//         "key": "tp",
//         "label": "Tools & plant",
//         "unit": "%",
//         "defaultValue": 2
//       },
//       {
//         "key": "oh",
//         "label": "Overheads",
//         "unit": "%",
//         "defaultValue": 6
//       },
//       {
//         "key": "p",
//         "label": "Profit",
//         "unit": "%",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-03",
//     "name": "Cost distribution across a residential project",
//     "categoryKey": "COST",
//     "type": "Thumb Rule",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "%",
//     "example": "By work head (% of total construction cost):\n  Foundation & plinth      10 – 13%\n  RCC superstructure       28 – 33%\n  Masonry & plaster        12 – 15%\n  Flooring & tiling         8 – 11%\n  Doors, windows, joinery   8 – 12%\n  Painting                  4 – 6%\n  Plumbing & sanitary       5 – 8%\n  Electrical                5 – 8%\n  Waterproofing             2 – 3%\n  Miscellaneous & external  4 – 6%\n\nBy resource: Material 55 – 62% · Labour 25 – 32% · Overheads & profit 12 – 18%",
//     "workedExample": "Budget ₹48,00,000 for 2,400 sqft (₹2,000/sqft)\nRCC structure = 30% = ₹14.4 lakh · Finishing heads together ≈ 30% = ₹14.4 lakh\nMEP (plumbing + electrical) = 13% = ₹6.24 lakh",
//     "note": "[Verify against your own final accounts] This distribution is the fastest way to spot an unbalanced quotation. A contractor whose RCC is 22% and finishing is 40% is either using undersized sections or padding the finishes — either way, ask.",
//     "tags": [
//       "cost distribution",
//       "budget",
//       "percentage",
//       "estimating",
//       "benchmark"
//     ],
//     "variables": [
//       {
//         "key": "C",
//         "label": "Total cost",
//         "unit": "INR"
//       },
//       {
//         "key": "p",
//         "label": "Head percentage",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "C",
//         "label": "Total budget",
//         "unit": "INR",
//         "defaultValue": 4800000
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-04",
//     "name": "GST and statutory levies on construction",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "GST Act · BOCW Act 1996",
//     "unit": "%",
//     "example": "GST on works contract (construction service)     : 18% with input tax credit\nGST on affordable residential apartment           : 1% without ITC\nGST on other residential apartment (under construction) : 5% without ITC\nCompleted property with occupancy certificate     : no GST\n\nBOCW labour cess : 1% of the cost of construction, where cost exceeds ₹10 lakh\nTDS under 194C   : 1% (individual/HUF) or 2% (company) on contractor payments",
//     "workedExample": "Works contract of ₹48,00,000 at 18% GST = ₹8,64,000\nLabour cess at 1% = ₹48,000\nTotal outflow = ₹56,64,000",
//     "note": "⚠ [Verify with your CA before quoting] GST rates and the conditions attached to them change frequently, and my information may be out of date. The rates above are indicative of the structure only. Never put a GST figure into a client agreement without written confirmation from your auditor for that financial year.",
//     "tags": [
//       "gst",
//       "tax",
//       "labour cess",
//       "bocw",
//       "tds",
//       "statutory",
//       "verify"
//     ],
//     "variables": [
//       {
//         "key": "C",
//         "label": "Contract value",
//         "unit": "INR"
//       },
//       {
//         "key": "g",
//         "label": "GST rate",
//         "unit": "%"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "C",
//         "label": "Contract value",
//         "unit": "INR",
//         "defaultValue": 4800000
//       },
//       {
//         "key": "g",
//         "label": "GST rate",
//         "unit": "%",
//         "defaultValue": 18
//       },
//       {
//         "key": "cs",
//         "label": "Labour cess",
//         "unit": "%",
//         "defaultValue": 1
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-05",
//     "name": "Site-mixed concrete vs ready-mix comparison",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "Derived",
//     "unit": "INR/cum",
//     "example": "Site mix cost/cum = Material cost + Labour cost + Mixer hire + Wastage allowance\nRMC cost/cum      = RMC rate + Pumping charge + Minimum-load penalty\n\nSite mix hidden costs: 3 – 5% material wastage, storage space, quality variation,\nlabour gang of ~30 on pour day, no batching accuracy\nRMC hidden costs: minimum load (usually 6 cum), waiting charges, site access width",
//     "workedExample": "12 cum slab pour\nSite mix at ₹5,600/cum = ₹67,200 + labour gang of 30 for a day\nRMC at ₹6,400/cum + ₹450/cum pumping = ₹82,200, gang of 8\nDifference ₹15,000 — against roughly 22 fewer man-days (₹17,000) and guaranteed grade.",
//     "note": "[Verify with current Chennai rates via RateSync] The comparison flips depending on pour size. Below about 5 cum, site mix usually wins; above 10 cum with pumping access, RMC usually wins on total cost and always wins on quality consistency. Run this calculation per pour, not once per project.",
//     "tags": [
//       "rmc",
//       "site mix",
//       "comparison",
//       "decision",
//       "concrete",
//       "cost"
//     ],
//     "variables": [
//       {
//         "key": "V",
//         "label": "Pour volume",
//         "unit": "cum"
//       },
//       {
//         "key": "r_s",
//         "label": "Site mix rate",
//         "unit": "INR/cum"
//       },
//       {
//         "key": "r_r",
//         "label": "RMC rate",
//         "unit": "INR/cum"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "V",
//         "label": "Pour volume",
//         "unit": "cum",
//         "defaultValue": 12
//       },
//       {
//         "key": "rs",
//         "label": "Site mix rate",
//         "unit": "INR/cum",
//         "defaultValue": 5600
//       },
//       {
//         "key": "rr",
//         "label": "RMC rate",
//         "unit": "INR/cum",
//         "defaultValue": 6400
//       },
//       {
//         "key": "pm",
//         "label": "Pumping",
//         "unit": "INR/cum",
//         "defaultValue": 450
//       },
//       {
//         "key": "gs",
//         "label": "Site mix gang",
//         "unit": "nos",
//         "defaultValue": 30
//       },
//       {
//         "key": "gr",
//         "label": "RMC gang",
//         "unit": "nos",
//         "defaultValue": 8
//       },
//       {
//         "key": "w",
//         "label": "Avg wage",
//         "unit": "INR/day",
//         "defaultValue": 780
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-01",
//     "name": "One-way or two-way slab classification",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.24",
//     "unit": "ratio",
//     "example": "Ratio = Longer span (ly) ÷ Shorter span (lx)\n\nIf ratio ≥ 2.0 → ONE-WAY slab (main steel along short span only)\nIf ratio < 2.0 → TWO-WAY slab (main steel both directions)\n\nMoment (one-way, simply supported) : M = w·l² ÷ 8\nMoment (two-way)                   : Mx = αx·w·lx² ,  My = αy·w·lx²   (IS 456 Table 26/27)",
//     "workedExample": "Slab 4.0 × 5.0 m → ratio = 5.0 ÷ 4.0 = 1.25 < 2 → TWO-WAY\nSlab 3.0 × 6.5 m → ratio = 2.17 ≥ 2 → ONE-WAY, main steel along the 3.0 m span",
//     "note": "Your spec F09 uses (ly/lx >= 2) for one-way, which matches IS 456. Getting this wrong in the other direction — detailing a two-way slab as one-way — leaves the long-span direction with only distribution steel and produces visible sagging.",
//     "tags": [
//       "slab",
//       "one way",
//       "two way",
//       "is 456",
//       "design",
//       "moment"
//     ],
//     "variables": [
//       {
//         "key": "lx",
//         "label": "Short span",
//         "unit": "m"
//       },
//       {
//         "key": "ly",
//         "label": "Long span",
//         "unit": "m"
//       },
//       {
//         "key": "w",
//         "label": "Factored load",
//         "unit": "kN/sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "lx",
//         "label": "Short span",
//         "unit": "m",
//         "defaultValue": 4
//       },
//       {
//         "key": "ly",
//         "label": "Long span",
//         "unit": "m",
//         "defaultValue": 5
//       },
//       {
//         "key": "w",
//         "label": "Factored load wu",
//         "unit": "kN/sqm",
//         "defaultValue": 11.5
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-02",
//     "name": "Span-to-depth ratio for deflection control",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.23.2.1",
//     "unit": "ratio",
//     "example": "Basic span/effective depth ratios:\n  Cantilever         7\n  Simply supported  20\n  Continuous        26\n\nEffective depth d ≥ Span ÷ (Basic ratio × Modification factor)\nModification factor for tension steel: 0.8 to 1.4 (IS 456 Fig.4), ≈1.2 for p = 0.4% Fe500\nOverall depth D = d + cover + half bar diameter",
//     "workedExample": "Continuous slab, span 4.0 m, Fe500, MF = 1.2\nd ≥ 4,000 ÷ (26 × 1.2) = 4,000 ÷ 31.2 = 128 mm\nD = 128 + 20 cover + 5 = 153 mm → adopt 150 mm\n\nNote this gives 150 mm, not the 143 mm that lx/28 gives — lx/28 already assumes an MF near 1.08.",
//     "note": "⚠ [Likely — reconcile with your engine] Your spec F09 computes d = lx/28 directly. That is a shortcut equivalent to (26 × 1.08). It is safe only if the tension steel percentage actually delivers MF ≥ 1.08. Make the modification factor an explicit input in rccSlab.js rather than burying it in a constant.",
//     "tags": [
//       "deflection",
//       "span depth",
//       "is 456",
//       "slab",
//       "design",
//       "modification factor"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Effective span",
//         "unit": "m"
//       },
//       {
//         "key": "r",
//         "label": "Basic ratio",
//         "unit": "—"
//       },
//       {
//         "key": "MF",
//         "label": "Modification factor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Effective span",
//         "unit": "m",
//         "defaultValue": 4
//       },
//       {
//         "key": "s",
//         "label": "Support",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "mf",
//         "label": "Modification factor",
//         "unit": "—",
//         "defaultValue": 1.2
//       },
//       {
//         "key": "c",
//         "label": "Cover",
//         "unit": "mm",
//         "defaultValue": 20
//       },
//       {
//         "key": "d",
//         "label": "Bar dia",
//         "unit": "mm",
//         "defaultValue": 10
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-03",
//     "name": "Slab load calculation and load combination",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 875 Pt.1 & Pt.2 · IS 456 cl.36.4",
//     "unit": "kN/sqm",
//     "example": "Dead load (slab)   = Thickness(m) × 25 kN/cum\nFloor finish       = 1.0 – 1.5 kN/sqm\nPartition allowance= 1.0 kN/sqm (where not located on a beam)\nLive load (IS 875 Pt.2): residential rooms 2.0 · balcony 3.0 · staircase 3.0\n                          office 2.5 – 4.0 · shops 4.0 · terrace (accessible) 1.5\n\nFactored load  wu = 1.5 × (DL + LL)",
//     "workedExample": "125 mm residential slab\nSelf weight = 0.125 × 25 = 3.125 kN/sqm\nFloor finish = 1.0 · Partition = 1.0 → DL = 5.125\nLL = 2.0\nwu = 1.5 × (5.125 + 2.0) = 10.69 kN/sqm",
//     "note": "The partition allowance is the item most often forgotten. A 115 mm brick partition 3 m high weighs about 0.66 kN per metre run — spread over a slab it is close to 1.0 kN/sqm. Clients who later add a \"small brick wall\" in the hall are adding a real load.",
//     "tags": [
//       "load",
//       "dead load",
//       "live load",
//       "is 875",
//       "factored",
//       "slab"
//     ],
//     "variables": [
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "m"
//       },
//       {
//         "key": "DL",
//         "label": "Dead load",
//         "unit": "kN/sqm"
//       },
//       {
//         "key": "LL",
//         "label": "Live load",
//         "unit": "kN/sqm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "t",
//         "label": "Slab thickness",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "ff",
//         "label": "Floor finish",
//         "unit": "kN/sqm",
//         "defaultValue": 1
//       },
//       {
//         "key": "pt",
//         "label": "Partition",
//         "unit": "kN/sqm",
//         "defaultValue": 1
//       },
//       {
//         "key": "ll",
//         "label": "Live load",
//         "unit": "kN/sqm",
//         "defaultValue": 2
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-04",
//     "name": "Limiting moment and area of tension steel",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 Annex G",
//     "unit": "sqmm",
//     "example": "Mu,lim = 0.148 f_ck b d²   (Fe250)\nMu,lim = 0.138 f_ck b d²   (Fe415)\nMu,lim = 0.133 f_ck b d²   (Fe500)\n\nA_st = (0.5 f_ck ÷ f_y) × [1 − √(1 − 4.6 M_u ÷ (f_ck b d²))] × b × d\n\nIf Mu > Mu,lim → increase depth or design as doubly reinforced",
//     "workedExample": "Slab strip b = 1000 mm, d = 105 mm, M20, Fe500, Mu = 10.69 × 4²/8 = 21.4 kN·m\nMu,lim = 0.133 × 20 × 1000 × 105² = 29.33 kN·m > 21.4 ✓ singly reinforced\nAst = (0.5×20/500)[1 − √(1 − 4.6×21.4e6/(20×1000×105²))] × 1000 × 105\n    = 0.02 × [1 − √(1 − 0.4463)] × 105,000 = 0.02 × 0.2559 × 105,000 = 537 sqmm/m\n10 mm @ 140 c/c gives 561 sqmm/m ✓",
//     "note": "[Likely — verify against your structural engineer's output] This is the same expression your spec F09 uses. It is correct for singly reinforced rectangular sections only. Do not extend it to flanged beams, doubly reinforced sections or continuous spans without the relevant coefficients.",
//     "tags": [
//       "ast",
//       "moment",
//       "mu lim",
//       "is 456",
//       "design",
//       "reinforcement"
//     ],
//     "variables": [
//       {
//         "key": "Mu",
//         "label": "Factored moment",
//         "unit": "kN·m"
//       },
//       {
//         "key": "b",
//         "label": "Width",
//         "unit": "mm"
//       },
//       {
//         "key": "d",
//         "label": "Effective depth",
//         "unit": "mm"
//       },
//       {
//         "key": "fck",
//         "label": "Concrete grade",
//         "unit": "N/sqmm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "Mu",
//         "label": "Factored moment",
//         "unit": "kN·m",
//         "defaultValue": 21.4
//       },
//       {
//         "key": "b",
//         "label": "Width",
//         "unit": "mm",
//         "defaultValue": 1000
//       },
//       {
//         "key": "d",
//         "label": "Effective depth",
//         "unit": "mm",
//         "defaultValue": 105
//       },
//       {
//         "key": "fck",
//         "label": "fck",
//         "unit": "N/sqmm",
//         "defaultValue": 20
//       },
//       {
//         "key": "fy",
//         "label": "fy",
//         "unit": "N/sqmm",
//         "defaultValue": null
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-05",
//     "name": "Short column axial load capacity",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Likely",
//     "reference": "IS 456:2000 cl.39.3",
//     "unit": "kN",
//     "example": "P_u = 0.4 f_ck A_c + 0.67 f_y A_sc\n  A_c  = gross area − steel area\n  A_sc = area of longitudinal steel\n\nValid for short columns with minimum eccentricity only.\nSlenderness: short if effective length ÷ least lateral dimension < 12\nMinimum steel 0.8% · Maximum 6% (4% practical for lapping)\nMinimum 4 bars (rectangular), 6 bars (circular); minimum bar dia 12 mm",
//     "workedExample": "Column 230 × 450, M25, Fe500, 6 nos 16 mm\nAsc = 6 × 201 = 1,206 sqmm (1.17% ✓ between 0.8 and 6)\nAg = 103,500; Ac = 102,294\nPu = 0.4 × 25 × 102,294 + 0.67 × 500 × 1,206\n   = 1,022,940 + 404,010 = 1,426,950 N = 1,427 kN\nService capacity = 1,427 ÷ 1.5 = 951 kN",
//     "note": "[Likely] This formula assumes a SHORT column with minimal eccentricity. Check slenderness first: a 230 mm column with 3.2 m effective length has a ratio of 13.9 — that is slender, and this formula over-estimates its capacity. Your spec F10 states \"short column, axial load\" which is correct, but the engine must also return a slenderness warning.",
//     "tags": [
//       "column",
//       "axial",
//       "capacity",
//       "is 456",
//       "slenderness",
//       "design"
//     ],
//     "variables": [
//       {
//         "key": "fck",
//         "label": "Concrete grade",
//         "unit": "N/sqmm"
//       },
//       {
//         "key": "fy",
//         "label": "Steel grade",
//         "unit": "N/sqmm"
//       },
//       {
//         "key": "Ag",
//         "label": "Gross area",
//         "unit": "sqmm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "b",
//         "label": "Width",
//         "unit": "mm",
//         "defaultValue": 230
//       },
//       {
//         "key": "D",
//         "label": "Depth",
//         "unit": "mm",
//         "defaultValue": 450
//       },
//       {
//         "key": "fck",
//         "label": "fck",
//         "unit": "N/sqmm",
//         "defaultValue": 25
//       },
//       {
//         "key": "fy",
//         "label": "fy",
//         "unit": "N/sqmm",
//         "defaultValue": 500
//       },
//       {
//         "key": "n",
//         "label": "No. of bars",
//         "unit": "nos",
//         "defaultValue": 6
//       },
//       {
//         "key": "dia",
//         "label": "Bar dia",
//         "unit": "mm",
//         "defaultValue": 16
//       },
//       {
//         "key": "le",
//         "label": "Effective length",
//         "unit": "m",
//         "defaultValue": 3.2
//       }
//     ]
//   },
//   {
//     "formulaCode": "DESIGN-06",
//     "name": "Chennai design parameters — seismic and wind",
//     "categoryKey": "DESIGN",
//     "type": "Design",
//     "confidence": "Verify",
//     "reference": "IS 1893 Pt.1:2016 · IS 875 Pt.3:2015",
//     "unit": "—",
//     "example": "Chennai — Seismic Zone III, zone factor Z = 0.16\n  Importance factor I = 1.0 (residential) / 1.2 (important structures)\n  Response reduction R = 3 (OMRF) / 5 (SMRF)\n  Base shear V_B = A_h × W,  A_h = (Z/2)(I/R)(S_a/g)\n\nBasic wind speed for Chennai ≈ 50 m/s\n  Design wind pressure p_z = 0.6 × V_z²  (N/sqm), V_z = V_b·k1·k2·k3·k4",
//     "workedExample": "Chennai G+2 residential, Z = 0.16, I = 1.0, R = 3, Sa/g = 2.5 (short period, medium soil)\nA_h = (0.16/2) × (1.0/3) × 2.5 = 0.0667\nIf seismic weight W = 4,500 kN → base shear = 300 kN",
//     "note": "⚠ [Verify against current IS 1893 and IS 875 Part 3 maps] Zone and wind-speed assignments are revised periodically and my information may be outdated. Confirm from a current code copy or from your structural consultant before any design. For G+2 residential in Chennai, seismic detailing (ductile detailing per IS 13920) is what matters in practice more than the base shear number.",
//     "tags": [
//       "seismic",
//       "wind",
//       "chennai",
//       "zone iii",
//       "is 1893",
//       "is 875",
//       "design"
//     ],
//     "variables": [
//       {
//         "key": "Z",
//         "label": "Zone factor",
//         "unit": "—"
//       },
//       {
//         "key": "V_b",
//         "label": "Basic wind speed",
//         "unit": "m/s"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "Z",
//         "label": "Zone factor Z",
//         "unit": "—",
//         "defaultValue": 0.16
//       },
//       {
//         "key": "I",
//         "label": "Importance I",
//         "unit": "—",
//         "defaultValue": 1
//       },
//       {
//         "key": "Rf",
//         "label": "Response R",
//         "unit": "—",
//         "defaultValue": 3
//       },
//       {
//         "key": "sa",
//         "label": "Sa/g",
//         "unit": "—",
//         "defaultValue": 2.5
//       },
//       {
//         "key": "W",
//         "label": "Seismic weight",
//         "unit": "kN",
//         "defaultValue": 4500
//       }
//     ]
//   },
//   {
//     "formulaCode": "LAB-05",
//     "name": "Crew-days and cost from the VL Rate Card",
//     "categoryKey": "LAB",
//     "type": "Labour",
//     "confidence": "Likely",
//     "reference": "VL Master Rate Card 2026",
//     "unit": "days · INR",
//     "example": "Crew-days  = Quantity ÷ Daily output of the stated crew\nMan-days   = Crew-days × Crew size\nCalendar   = Crew-days ÷ Number of crews deployed\nCost       = Quantity × VL rate\n\nOutput and crew are taken from the rate card entry itself — not from a generic table.",
//     "workedExample": "Red brick masonry 9 in, 1,200 sqft\nRate card: 1 mason + 1 helper, 55–90 sqft/day, VL ₹210/sqft\nCrew-days = 1200 ÷ 72.5 (mid) = 16.6 days\nMan-days  = 16.6 × 2 = 33.1\nWith 2 crews = 8.3 calendar days\nCost = 1200 × 210 = ₹2,52,000",
//     "note": "This replaces the generic trade ranges in LAB-01 and LAB-02 with your own published figures. Where the two disagree, the rate card wins — it is your data. Note the rate card carries 167 services all at status PROPOSED: the productivity figures are still estimates until SiteOps confirms them (Loop 02).",
//     "tags": [
//       "labour",
//       "rate card",
//       "productivity",
//       "crew",
//       "vertical living",
//       "cost",
//       "schedule"
//     ],
//     "variables": [
//       {
//         "key": "Q",
//         "label": "Quantity of work",
//         "unit": "service unit"
//       },
//       {
//         "key": "O",
//         "label": "Crew output per day",
//         "unit": "unit/day"
//       },
//       {
//         "key": "n",
//         "label": "Crews deployed",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "s",
//         "label": "Service",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "service unit",
//         "defaultValue": 1200
//       },
//       {
//         "key": "pos",
//         "label": "Output position",
//         "unit": "0=slow 1=fast",
//         "defaultValue": 0.5
//       },
//       {
//         "key": "n",
//         "label": "Crews deployed",
//         "unit": "nos",
//         "defaultValue": 2
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-06",
//     "name": "Rate-card pricing and margin position",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "VL Master Rate Card 2026",
//     "unit": "INR",
//     "example": "Quote value      = Quantity × VL rate\nBand position    = (VL rate − Low) ÷ (High − Low) × 100\nMargin headroom  = (High − VL) ÷ VL × 100\nExposure if low  = (VL − Low) × Quantity\n\nBand position near 0% = priced at the bottom of the market\nBand position near 100% = priced at the top of the market",
//     "workedExample": "Interior standard emulsion, 7,680 sqft\nVL ₹30/sqft, band ₹24–₹32\nBand position = (30 − 24) ÷ (32 − 24) × 100 = 75%\nQuote = 7,680 × 30 = ₹2,30,400\nIf a competitor quotes at the ₹24 floor: ₹1,84,320 — a ₹46,080 gap you must justify on spec, not on price.",
//     "note": "[Verify] All 167 rate-card services are at status PROPOSED with confidence SOURCE / RESEARCH / DERIVED. Before a rate goes into a client quotation, check what it was derived from: 67 came from the uploaded Excel, 45 from research, 55 were derived. A DERIVED rate has never been tested against an actual job.",
//     "tags": [
//       "rate card",
//       "pricing",
//       "margin",
//       "quotation",
//       "band",
//       "vertical living"
//     ],
//     "variables": [
//       {
//         "key": "VL",
//         "label": "Your rate",
//         "unit": "INR/unit"
//       },
//       {
//         "key": "Low,High",
//         "label": "Market band",
//         "unit": "INR/unit"
//       },
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "unit"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "s",
//         "label": "Service",
//         "unit": null,
//         "defaultValue": null
//       },
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "service unit",
//         "defaultValue": 7680
//       }
//     ]
//   },
//   {
//     "formulaCode": "CONC-13",
//     "name": "Mix fraction reconciliation check (engine guard)",
//     "categoryKey": "CONC",
//     "type": "Quality",
//     "confidence": "Certain",
//     "reference": "Arithmetic identity",
//     "unit": "—",
//     "example": "For any nominal mix c : s : a with Σ = c + s + a\n\n  cement fraction + sand fraction + aggregate fraction\n= c/Σ + s/Σ + a/Σ\n= 1.000   ALWAYS\n\nEngine guard:  assert(|Σfractions − 1| < 0.001)\nIf the three fractions do not sum to 1, the ratio array is being indexed wrongly.",
//     "workedExample": "M20 = 1 : 1.5 : 3, Σ = 5.5\n1/5.5 + 1.5/5.5 + 3/5.5 = 0.1818 + 0.2727 + 0.5455 = 1.0000 ✓\n\nFAILING CASE — ratio stored as [1, 1.5, 3, 5.5] and summed as r[1]+r[2]+r[3]:\nΣ = 1.5 + 3 + 5.5 = 10\n1/10 + 1.5/10 + 3/10 = 0.55 ✗  → 45% of the material is missing",
//     "note": "This is a three-line guard that would have caught the single most expensive defect found in the Cost Calculator. Add it to concrete.js, plastering.js, brickwork.js and masonryBlock.js — every module that splits a dry volume by a ratio. See the Engine Defects tab.",
//     "tags": [
//       "guard",
//       "assertion",
//       "reconciliation",
//       "mix",
//       "quality",
//       "engine",
//       "defect"
//     ],
//     "variables": [
//       {
//         "key": "c,s,a",
//         "label": "Mix parts",
//         "unit": "—"
//       },
//       {
//         "key": "Σ",
//         "label": "Sum of parts",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "c",
//         "label": "Cement part",
//         "unit": "—",
//         "defaultValue": 1
//       },
//       {
//         "key": "s",
//         "label": "Sand part",
//         "unit": "—",
//         "defaultValue": 1.5
//       },
//       {
//         "key": "a",
//         "label": "Aggregate part",
//         "unit": "—",
//         "defaultValue": 3
//       },
//       {
//         "key": "sum",
//         "label": "Divisor used by code",
//         "unit": "—",
//         "defaultValue": 5.5
//       }
//     ]
//   },
//   {
//     "formulaCode": "CEIL-01",
//     "name": "Gypsum false ceiling — framework and boards",
//     "categoryKey": "CEIL",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2095 / manufacturer",
//     "unit": "sqft · nos",
//     "example": "Board area     = Ceiling area × (1 + wastage 8–12%)\nBoards (8×4 ft) = ⌈Board area ÷ 32⌉\nGI perimeter channel = Room perimeter\nGI intermediate channel ≈ Area ÷ 4  (at 1,220 mm centres)\nCeiling section ≈ Area ÷ 1.5        (at 457 mm centres)\nSoffit cleat + rod ≈ 1 per 1.2 sqm\nDrywall screws ≈ 25 – 30 nos per board · Jointing compound ≈ 0.35 kg/sqm",
//     "workedExample": "Living room 20 × 16 ft = 320 sqft, perimeter 72 rft\nBoards = 320 × 1.10 ÷ 32 = 11 nos\nIntermediate channel = 320 ÷ 4 = 80 rft · Ceiling section = 320 ÷ 1.5 = 213 rft\nVL rate: plain gypsum ceiling ₹120/sqft → ₹38,400 (crew 3–4, 200–350 sqft/day → 1–2 days)",
//     "note": "[Verify with your ceiling contractor] Framework spacing drives both cost and sag. At 610 mm ceiling-section centres instead of 457 mm you save about 8% on framework and buy a visible sag within two summers. Specify centres in the work order.",
//     "tags": [
//       "false ceiling",
//       "gypsum",
//       "framework",
//       "interior",
//       "boards"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Ceiling area",
//         "unit": "sqft"
//       },
//       {
//         "key": "P",
//         "label": "Perimeter",
//         "unit": "rft"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Room length",
//         "unit": "ft",
//         "defaultValue": 20
//       },
//       {
//         "key": "B",
//         "label": "Room width",
//         "unit": "ft",
//         "defaultValue": 16
//       },
//       {
//         "key": "w",
//         "label": "Board wastage",
//         "unit": "%",
//         "defaultValue": 10
//       },
//       {
//         "key": "r",
//         "label": "VL rate",
//         "unit": "INR/sqft",
//         "defaultValue": 120
//       }
//     ]
//   },
//   {
//     "formulaCode": "CEIL-02",
//     "name": "Gypsum stud partition — studs, track and boards",
//     "categoryKey": "CEIL",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "IS 2095 Pt.1 / manufacturer",
//     "unit": "sqft · nos",
//     "example": "Board area  = Partition area × 2 faces × layers × (1 + wastage)\nBoards      = ⌈Board area ÷ 32⌉\nFloor + ceiling track = 2 × partition length\nStuds       = ⌈Length(mm) ÷ stud spacing⌉ + 1   (spacing 407 / 457 / 610 mm)\nRockwool (if acoustic) = Partition area, 50 mm at 48 kg/cum\nScrews ≈ 35 per sqm · Jointing tape = 2.5 × partition length",
//     "workedExample": "Partition 12 ft × 10 ft = 120 sqft, single layer both faces, studs at 457 mm\nBoard area = 120 × 2 × 1 × 1.10 = 264 sqft → 9 boards\nStuds = ⌈(12 × 304.8) ÷ 457⌉ + 1 = ⌈8.0⌉ + 1 = 10 nos · Track = 24 rft\nVL rate ₹145/sqft → ₹17,400 (crew 3–4, 180–300 sqft/day)",
//     "note": "[Verify] A gypsum partition weighs roughly 25–30 kg/sqm against 200 kg/sqm for 115 mm brickwork. On an upper floor or a renovation that is the difference between needing a structural check and not. It is also the reason it cannot carry a wall-hung WC without a backing plate.",
//     "tags": [
//       "partition",
//       "gypsum",
//       "drywall",
//       "studs",
//       "interior",
//       "dead load"
//     ],
//     "variables": [
//       {
//         "key": "L,H",
//         "label": "Partition length and height",
//         "unit": "ft"
//       },
//       {
//         "key": "s",
//         "label": "Stud spacing",
//         "unit": "mm"
//       },
//       {
//         "key": "n",
//         "label": "Layers per face",
//         "unit": "nos"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Length",
//         "unit": "ft",
//         "defaultValue": 12
//       },
//       {
//         "key": "H",
//         "label": "Height",
//         "unit": "ft",
//         "defaultValue": 10
//       },
//       {
//         "key": "lay",
//         "label": "Layers per face",
//         "unit": "nos",
//         "defaultValue": 1
//       },
//       {
//         "key": "sp",
//         "label": "Stud spacing",
//         "unit": "mm",
//         "defaultValue": 457
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 10
//       },
//       {
//         "key": "r",
//         "label": "VL rate",
//         "unit": "INR/sqft",
//         "defaultValue": 145
//       }
//     ]
//   },
//   {
//     "formulaCode": "FAB-01",
//     "name": "MS fabrication weight from sections",
//     "categoryKey": "FAB",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 808:1989 · IS 1732",
//     "unit": "kg",
//     "example": "Weight = Σ (Length × Unit weight of section)\n\nUnit weights (kg/m):\n  MS square tube 25×25×2 mm  1.43 · 40×40×2 mm  2.36\n  MS flat 25×5 mm 0.98 · 40×6 mm 1.88\n  MS angle 25×25×3 mm 1.11 · 40×40×5 mm 2.90\n  MS round bar 12 mm 0.888 · 16 mm 1.58\n  MS square bar 12 mm 1.13 · 16 mm 2.01\n\nAdd 5% for welds, cleats and wastage; add primer 1 coat at 12 sqm/litre",
//     "workedExample": "Balcony railing 20 rft = 6.1 m, 1.0 m high\nVerticals at 125 mm: 49 nos × 1.0 m of 12 mm square bar = 49 × 1.13 = 55.4 kg\nTop & bottom rail: 2 × 6.1 m of 40×40×2 tube = 12.2 × 2.36 = 28.8 kg\nTotal = 84.2 kg + 5% = 88.4 kg\nAt VL fabrication ₹145/kg = ₹12,818 — cross-check against the railing rate of ₹1,250/rft × 20 = ₹25,000",
//     "note": "The rate card prices railing two ways: by weight (₹145/kg, MS fabrication) and by running foot (₹1,250/rft, MS railing). For the example above those give ₹12,800 and ₹25,000. The rft rate includes design, installation, finish and margin; the kg rate is fabrication only. Quote one or the other — never let a contractor pick whichever is higher per item.",
//     "tags": [
//       "fabrication",
//       "ms",
//       "railing",
//       "grill",
//       "steel sections",
//       "weight"
//     ],
//     "variables": [
//       {
//         "key": "L",
//         "label": "Total section length",
//         "unit": "m"
//       },
//       {
//         "key": "w",
//         "label": "Unit weight",
//         "unit": "kg/m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Railing length",
//         "unit": "rft",
//         "defaultValue": 20
//       },
//       {
//         "key": "H",
//         "label": "Height",
//         "unit": "m",
//         "defaultValue": 1
//       },
//       {
//         "key": "sp",
//         "label": "Vertical spacing",
//         "unit": "mm",
//         "defaultValue": 125
//       },
//       {
//         "key": "wv",
//         "label": "Vertical unit wt",
//         "unit": "kg/m",
//         "defaultValue": 1.13
//       },
//       {
//         "key": "wr",
//         "label": "Rail unit wt",
//         "unit": "kg/m",
//         "defaultValue": 2.36
//       },
//       {
//         "key": "nr",
//         "label": "No. of rails",
//         "unit": "nos",
//         "defaultValue": 2
//       },
//       {
//         "key": "rk",
//         "label": "Rate per kg",
//         "unit": "INR",
//         "defaultValue": 145
//       },
//       {
//         "key": "rf",
//         "label": "Rate per rft",
//         "unit": "INR",
//         "defaultValue": 1250
//       }
//     ]
//   },
//   {
//     "formulaCode": "ROOF-01",
//     "name": "Metal roofing sheets with overlap",
//     "categoryKey": "ROOF",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 277:2018 / manufacturer",
//     "unit": "sqft · nos",
//     "example": "Sloped area  = Plan area × √(1 + slope²)      slope as rise/run\nSheets       = ⌈Sloped area ÷ Effective sheet area⌉\nEffective width = Sheet width − side lap (usually one rib, ≈ 75 mm)\nEnd lap      = 150 – 200 mm where sheets are joined\nSelf-drilling screws ≈ 8 – 10 per sqm · Ridge cap = ridge length × 1.1\nMinimum pitch: trapezoidal profile 1 in 12 (≈5°)",
//     "workedExample": "Car porch 16 × 12 ft = 192 sqft plan, slope 1:6 (rise 0.167)\nSloped area = 192 × √(1 + 0.0278) = 192 × 1.0138 = 194.6 sqft\nSheets 1,050 mm cover width × 12 ft long = 3.44 sqft/ft × 12 = 41.3 sqft each\nSheets = ⌈194.6 ÷ 41.3⌉ = 5 nos + screws 8 × 18.1 sqm = 145 nos\nVL rate ₹125/sqft (fixing on existing frame) = ₹24,000 — frame is extra",
//     "note": "The rate card prices sheet fixing \"on existing frame\" only. The MS frame underneath is a separate fabrication item at ₹145/kg and is usually 40–60% of the total roof cost. Quoting only the sheet rate is the most common under-quote in car porch and terrace-cover work.",
//     "tags": [
//       "roofing",
//       "sheet",
//       "gi",
//       "ppgi",
//       "slope",
//       "overlap",
//       "car porch"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Plan area",
//         "unit": "sqft"
//       },
//       {
//         "key": "s",
//         "label": "Slope rise/run",
//         "unit": "—"
//       },
//       {
//         "key": "W",
//         "label": "Sheet width",
//         "unit": "mm"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "L",
//         "label": "Plan length",
//         "unit": "ft",
//         "defaultValue": 16
//       },
//       {
//         "key": "B",
//         "label": "Plan width",
//         "unit": "ft",
//         "defaultValue": 12
//       },
//       {
//         "key": "ri",
//         "label": "Slope rise per 1 run",
//         "unit": "—",
//         "defaultValue": 0.167
//       },
//       {
//         "key": "cw",
//         "label": "Sheet cover width",
//         "unit": "mm",
//         "defaultValue": 1050
//       },
//       {
//         "key": "sl",
//         "label": "Sheet length",
//         "unit": "ft",
//         "defaultValue": 12
//       },
//       {
//         "key": "r",
//         "label": "VL rate",
//         "unit": "INR/sqft",
//         "defaultValue": 125
//       }
//     ]
//   },
//   {
//     "formulaCode": "EXT-01",
//     "name": "Paver block quantity and bedding",
//     "categoryKey": "EXT",
//     "type": "Material",
//     "confidence": "Likely",
//     "reference": "IS 15658:2006",
//     "unit": "nos · cft",
//     "example": "Pavers per sqm = 1 ÷ (paver length × paver width)\n  Zig-zag 225×112 mm → 1 ÷ 0.0252 = 39.7 ≈ 40 nos/sqm\n  Rectangle 200×100 mm → 50 nos/sqm\nPavers = Area × per sqm × (1 + wastage 3–5%)\nBedding sand 30 – 40 mm = Area × 0.035 cum\nJoint filling sand ≈ Area × 0.005 cum\nThickness: footpath 60 mm · car park 80 mm · heavy vehicle 100 mm",
//     "workedExample": "Driveway 40 sqm, 80 mm zig-zag pavers\nPavers = 40 × 39.7 × 1.04 = 1,652 nos\nBedding sand = 40 × 0.035 = 1.40 cum = 49.4 cft\nVL rate (complete, paver included) ₹145/sqft × 430 sqft = ₹62,350",
//     "note": "[Verify paver size with the supplier] Specify the paver thickness by traffic, not by price. A 60 mm paver under a car will crack at the wheel path within a year — the ₹12/sqft saved comes back as a relaying bill at ₹65/sqft.",
//     "tags": [
//       "paver",
//       "driveway",
//       "external",
//       "bedding sand",
//       "is 15658"
//     ],
//     "variables": [
//       {
//         "key": "A",
//         "label": "Paved area",
//         "unit": "sqm"
//       },
//       {
//         "key": "l,b",
//         "label": "Paver size",
//         "unit": "m"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "A",
//         "label": "Paved area",
//         "unit": "sqm",
//         "defaultValue": 40
//       },
//       {
//         "key": "l",
//         "label": "Paver length",
//         "unit": "mm",
//         "defaultValue": 225
//       },
//       {
//         "key": "b",
//         "label": "Paver width",
//         "unit": "mm",
//         "defaultValue": 112
//       },
//       {
//         "key": "w",
//         "label": "Wastage",
//         "unit": "%",
//         "defaultValue": 4
//       },
//       {
//         "key": "bd",
//         "label": "Bedding thickness",
//         "unit": "mm",
//         "defaultValue": 35
//       },
//       {
//         "key": "r",
//         "label": "VL rate",
//         "unit": "INR/sqft",
//         "defaultValue": 145
//       }
//     ]
//   },
//   {
//     "formulaCode": "MISC-01",
//     "name": "Demolition debris volume and disposal loads",
//     "categoryKey": "EXT",
//     "type": "Material",
//     "confidence": "Verify",
//     "reference": "Trade practice",
//     "unit": "cum · loads",
//     "example": "Debris volume = Σ (Element volume × Bulking factor)\n  Brick masonry rubble 1.6 – 1.8 · Concrete rubble 1.5 – 1.7\n  Tile + mortar 1.4 – 1.6 · Plaster 1.5\nLoads = ⌈Debris volume ÷ Load capacity⌉\nMini tipper ≈ 3 cum · Standard tipper ≈ 5 cum",
//     "workedExample": "Renovation: remove 400 sqft tile flooring (25 mm bed) + demolish 150 sqft of 4.5 in wall\nTile + bed = 400 × 0.0929 × 0.04 = 1.49 cum → × 1.5 = 2.23 cum\nWall = 150 × 0.0929 × 0.115 = 1.60 cum → × 1.7 = 2.72 cum\nTotal = 4.95 cum → 2 mini loads\nVL rate ₹5,500 per mini load = ₹11,000",
//     "note": "[Verify] Every demolition line in the rate card says \"disposal extra\". On a renovation, debris disposal routinely reaches 8–12% of the total bill and is the item clients dispute most, because nobody mentioned it at quotation stage. Put it in the quote as a named line with an assumed number of loads.",
//     "tags": [
//       "debris",
//       "demolition",
//       "disposal",
//       "renovation",
//       "bulking",
//       "loads"
//     ],
//     "variables": [
//       {
//         "key": "V",
//         "label": "In-situ element volume",
//         "unit": "cum"
//       },
//       {
//         "key": "f",
//         "label": "Bulking factor",
//         "unit": "—"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "tA",
//         "label": "Tile removal area",
//         "unit": "sqft",
//         "defaultValue": 400
//       },
//       {
//         "key": "tT",
//         "label": "Tile + bed thickness",
//         "unit": "mm",
//         "defaultValue": 40
//       },
//       {
//         "key": "wA",
//         "label": "Wall demolition area",
//         "unit": "sqft",
//         "defaultValue": 150
//       },
//       {
//         "key": "wT",
//         "label": "Wall thickness",
//         "unit": "mm",
//         "defaultValue": 115
//       },
//       {
//         "key": "f",
//         "label": "Bulking factor",
//         "unit": "—",
//         "defaultValue": 1.6
//       },
//       {
//         "key": "cap",
//         "label": "Load capacity",
//         "unit": "cum",
//         "defaultValue": 3
//       },
//       {
//         "key": "r",
//         "label": "Rate per load",
//         "unit": "INR",
//         "defaultValue": 5500
//       }
//     ]
//   },
//   {
//     "formulaCode": "COST-07",
//     "name": "Quantity to cost — material rate bridge",
//     "categoryKey": "COST",
//     "type": "Cost",
//     "confidence": "Verify",
//     "reference": "RateSync / Chennai May 2026",
//     "unit": "INR",
//     "example": "Line cost = Quantity × Unit rate\nSection cost = Σ line costs\n\nMaterial rate basis currently in the Cost Calculator (Chennai, May 2026):\n  Cement ₹390/bag · River sand ₹35/cft · M-sand ₹30/cft · 20 mm aggregate ₹34/cft\n  Solid brick ₹9 · Hollow brick ₹11 · AAC block ₹50 · Steel Fe500 ₹60/kg\n  Vitrified tile ₹55/sqft · Interior emulsion ₹210/l · Primer ₹120/l\n  Liquid waterproofing ₹180/kg · PVC 4 in pipe ₹280/m",
//     "workedExample": "M20 concrete, 10 cum (from CONC-02 with 3% wastage)\nCement 84 bags × ₹390 = ₹32,760\nSand 152.8 cft × ₹30 = ₹4,584\nAggregate 305.5 cft × ₹34 = ₹10,387\nMaterial total = ₹47,731 → ₹4,773 per cum",
//     "note": "⚠ [Verify] These rates are dated May 2026 and are hard-coded inside the Cost Calculator HTML. That is the wrong place for them. Rates belong in RateSync, pulled at BOQ generation time — which is exactly what your own BOQ Engine Spec §3.5 already says. A hard-coded rate silently ages; a RateSync rate carries a lastUpdated date and a stale-rate alert.",
//     "tags": [
//       "rates",
//       "costing",
//       "ratesync",
//       "material",
//       "bridge",
//       "chennai"
//     ],
//     "variables": [
//       {
//         "key": "Q",
//         "label": "Quantity",
//         "unit": "unit"
//       },
//       {
//         "key": "r",
//         "label": "Unit rate",
//         "unit": "INR/unit"
//       }
//     ],
//     "calcInputs": [
//       {
//         "key": "cb",
//         "label": "Cement",
//         "unit": "bags",
//         "defaultValue": 84
//       },
//       {
//         "key": "sa",
//         "label": "Sand",
//         "unit": "cft",
//         "defaultValue": 152.8
//       },
//       {
//         "key": "ag",
//         "label": "Aggregate",
//         "unit": "cft",
//         "defaultValue": 305.5
//       },
//       {
//         "key": "st",
//         "label": "Steel",
//         "unit": "kg",
//         "defaultValue": 0
//       },
//       {
//         "key": "br",
//         "label": "Bricks",
//         "unit": "nos",
//         "defaultValue": 0
//       },
//       {
//         "key": "rc",
//         "label": "Cement rate",
//         "unit": "INR/bag",
//         "defaultValue": 390
//       },
//       {
//         "key": "rs",
//         "label": "Sand rate",
//         "unit": "INR/cft",
//         "defaultValue": 30
//       },
//       {
//         "key": "ra",
//         "label": "Aggregate rate",
//         "unit": "INR/cft",
//         "defaultValue": 34
//       },
//       {
//         "key": "rt",
//         "label": "Steel rate",
//         "unit": "INR/kg",
//         "defaultValue": 60
//       },
//       {
//         "key": "rb",
//         "label": "Brick rate",
//         "unit": "INR/no",
//         "defaultValue": 9
//       }
//     ]
//   }
// ];





/**
 * Seed data for the Formula Engine module — extracted directly from the
 * Formula Engine Library demo (CATS + FORMULAS.push blocks, including the
 * later CATS.push() that adds Ceilings & Dry Partitions, Fabrication &
 * Metalwork, Roofing & Sheeting, and External & Site Works).
 *
 * costCalculatorCategoryKey tags the ONE formula per wizard category that
 * initializeFormulaLibrary() should auto-wire as the canonical formula for
 * that Cost Calculator step (see costCalculatorCategoryKey on
 * formulaItem.model.ts). 18 of the 19 formula-driven wizard categories have
 * a match; "compound" (Compound Wall) has none in the source data and is
 * left unmapped — needs a real formula written before it can auto-compute.
 *
 * Used by formulaCategory.service.ts's initializeFormulaLibrary() to
 * populate a brand-new organization's Formula Engine on first setup.
 *
 * NOTE: executable calculator logic (calc.r) is deliberately NOT included
 * here — see the "open decision" note in formulaItem.model.ts. calcInputs
 * (structured, safe data) are carried over; outputExpression is NOT
 * populated by this seed and must be added per formula before that
 * formula's quantity can auto-compute in Cost Calculator Step 2.
 */

export interface IFormulaCategorySeed {
  categoryKey: string;
  categoryName: string;
  engineModules: string;
}

export interface IFormulaItemSeed {
  formulaCode: string;
  name: string;
  categoryKey: string; // resolved to categoryId at seed time
  costCalculatorCategoryKey: string | null; // resolved to FormulaItemModel.costCalculatorCategoryKey at seed time
  type: string | null;
  confidence: string;
  reference: string | null;
  unit: string | null;
  example: string | null;
  workedExample: string | null;
  note: string | null;
  tags: string[];
  variables: { key: string; label: string; unit: string | null }[];
  calcInputs: { key: string; label: string; unit: string | null; defaultValue: number | null }[];
}

export const FORMULA_CATEGORY_SEED: IFormulaCategorySeed[] = [
  {
    "categoryKey": "CONV",
    "categoryName": "Conversions & Site Units",
    "engineModules": "units.js"
  },
  {
    "categoryKey": "EARTH",
    "categoryName": "Earthwork & Foundation",
    "engineModules": "earthwork.js / foundation.js"
  },
  {
    "categoryKey": "CONC",
    "categoryName": "Concrete & Mix Design",
    "engineModules": "concrete.js"
  },
  {
    "categoryKey": "MASON",
    "categoryName": "Masonry — Brick & Block",
    "engineModules": "brickwork.js / masonryBlock.js"
  },
  {
    "categoryKey": "PLAST",
    "categoryName": "Plastering & Surface Finish",
    "engineModules": "plastering.js"
  },
  {
    "categoryKey": "STEEL",
    "categoryName": "Steel & RCC Detailing",
    "engineModules": "steel.js / rccBeam.js"
  },
  {
    "categoryKey": "FORM",
    "categoryName": "Formwork & Shuttering",
    "engineModules": "formwork.js"
  },
  {
    "categoryKey": "FLOOR",
    "categoryName": "Flooring & Tiling",
    "engineModules": "flooring.js"
  },
  {
    "categoryKey": "WPF",
    "categoryName": "Waterproofing",
    "engineModules": "waterproofing.js"
  },
  {
    "categoryKey": "PAINT",
    "categoryName": "Painting & Putty",
    "engineModules": "paint.js"
  },
  {
    "categoryKey": "PLUMB",
    "categoryName": "Plumbing, Drainage & Water",
    "engineModules": "drainage.js / septicTank.js"
  },
  {
    "categoryKey": "ELEC",
    "categoryName": "Electrical",
    "engineModules": "electrical.js"
  },
  {
    "categoryKey": "LAB",
    "categoryName": "Labour & Productivity",
    "engineModules": "labour.js"
  },
  {
    "categoryKey": "TIME",
    "categoryName": "Time, Curing & Scheduling",
    "engineModules": "schedule.js"
  },
  {
    "categoryKey": "THUMB",
    "categoryName": "Whole-Building Thumb Rules",
    "engineModules": "thumbRules.js"
  },
  {
    "categoryKey": "COST",
    "categoryName": "Cost, Wastage & Statutory",
    "engineModules": "costing.js"
  },
  {
    "categoryKey": "DESIGN",
    "categoryName": "Structural Design Checks",
    "engineModules": "rccSlab.js / rccColumn.js"
  },
  {
    "categoryKey": "CEIL",
    "categoryName": "Ceilings & Dry Partitions",
    "engineModules": "ceiling.js"
  },
  {
    "categoryKey": "FAB",
    "categoryName": "Fabrication & Metalwork",
    "engineModules": "fabrication.js"
  },
  {
    "categoryKey": "ROOF",
    "categoryName": "Roofing & Sheeting",
    "engineModules": "roofing.js"
  },
  {
    "categoryKey": "EXT",
    "categoryName": "External & Site Works",
    "engineModules": "external.js"
  }
];

export const FORMULA_ITEM_SEED: IFormulaItemSeed[] = [
  {
    "formulaCode": "CONV-01",
    "name": "Area conversion — sqft ↔ sqm",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Certain",
    "reference": "SI definition",
    "unit": "sqm / sqft",
    "example": "1 sqm = 10.7639 sqft\nArea(sqm) = Area(sqft) ÷ 10.7639\nArea(sqft) = Area(sqm) × 10.7639",
    "workedExample": "Ayapakkam site, built-up 2,400 sqft\n= 2400 ÷ 10.7639\n= 222.97 sqm",
    "note": "All CivilMind formulas compute internally in SI (m, sqm, cum) and display in the unit the site team uses. Never mix the two inside one formula.",
    "tags": [
      "conversion",
      "area",
      "sqft",
      "sqm"
    ],
    "variables": [
      {
        "key": "A_sqft",
        "label": "Area in square feet",
        "unit": "sqft"
      },
      {
        "key": "A_sqm",
        "label": "Area in square metre",
        "unit": "sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "a",
        "label": "Area",
        "unit": "sqft",
        "defaultValue": 2400
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-02",
    "name": "Volume conversion — cft ↔ cum",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Certain",
    "reference": "SI definition",
    "unit": "cum / cft",
    "example": "1 cum = 35.3147 cft\nVol(cum) = Vol(cft) ÷ 35.3147",
    "workedExample": "Sand ordered 300 cft\n= 300 ÷ 35.3147\n= 8.50 cum",
    "note": "Sand and jelly are quoted in cft or in \"units\" in Chennai; concrete and mortar formulas need cum. Convert once, at input.",
    "tags": [
      "conversion",
      "volume",
      "cft",
      "cum"
    ],
    "variables": [
      {
        "key": "V_cft",
        "label": "Volume in cubic feet",
        "unit": "cft"
      },
      {
        "key": "V_cum",
        "label": "Volume in cubic metre",
        "unit": "cum"
      }
    ],
    "calcInputs": [
      {
        "key": "v",
        "label": "Volume",
        "unit": "cft",
        "defaultValue": 300
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-03",
    "name": "Cement bag — weight, volume and bags per cum",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Certain",
    "reference": "IS 269:2015",
    "unit": "bags",
    "example": "1 bag = 50 kg\nDensity of cement = 1440 kg/cum\nVolume of 1 bag = 50 ÷ 1440 = 0.0347 cum = 1.226 cft (34.7 litres)\nBags per cum = 1 ÷ 0.0347 = 28.8 bags",
    "workedExample": "Cement volume required = 0.28 cum\nBags = 0.28 ÷ 0.0347 = 8.07 → order 9 bags (no part bags on site)",
    "note": "Always round cement UP to whole bags at the line-item level, not at the BOQ total — part bags cannot be procured and half-open bags harden.",
    "tags": [
      "cement",
      "bag",
      "conversion",
      "density"
    ],
    "variables": [
      {
        "key": "W",
        "label": "Bag weight",
        "unit": "kg"
      },
      {
        "key": "ρ",
        "label": "Loose bulk density of cement",
        "unit": "kg/cum"
      }
    ],
    "calcInputs": [
      {
        "key": "c",
        "label": "Cement volume",
        "unit": "cum",
        "defaultValue": 0.28
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-04",
    "name": "Steel bar unit weight — d²/162",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Certain",
    "reference": "IS 1786:2008",
    "unit": "kg/m",
    "example": "W (kg/m) = d² ÷ 162\nDerivation: W = (π/4 × d²/10⁶) × 7850 = d² ÷ 162.28",
    "workedExample": "12 mm bar, 240 m total\nW = 12² ÷ 162 = 144 ÷ 162 = 0.889 kg/m\nWeight = 240 × 0.889 = 213.3 kg",
    "note": "Standard unit weights (kg/m): 6→0.222, 8→0.395, 10→0.617, 12→0.888, 16→1.580, 20→2.469, 25→3.858, 32→6.321. Mill tolerance under IS 1786 is ±7% for ≤10 mm, ±5% for 12–16 mm, ±3% above — weigh-bridge slips will differ slightly from theory.",
    "tags": [
      "steel",
      "bar",
      "weight",
      "rebar",
      "d2/162"
    ],
    "variables": [
      {
        "key": "d",
        "label": "Bar diameter",
        "unit": "mm"
      },
      {
        "key": "W",
        "label": "Unit weight",
        "unit": "kg/m"
      },
      {
        "key": "L",
        "label": "Total running length",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "d",
        "label": "Bar dia",
        "unit": "mm",
        "defaultValue": 12
      },
      {
        "key": "L",
        "label": "Total length",
        "unit": "m",
        "defaultValue": 240
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-05",
    "name": "Standard material densities",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Likely",
    "reference": "IS 875 Pt.1",
    "unit": "kg/cum",
    "example": "Cement 1440 · Dry sand 1600 (river, loose) · Coarse aggregate 1500\nPCC 2400 · RCC 2500 · Brick masonry 1920 · AAC block 550–650\nSteel 7850 · Water 1000 · Bitumen 1040",
    "workedExample": "Self-weight of a 125 mm RCC slab\n= 0.125 × 2500 = 312.5 kg/sqm = 3.13 kN/sqm",
    "note": "Sand density varies 1450–1750 kg/cum with moisture and source. For dead-load design use IS 875 Part 1 values; for procurement use the supplier weigh-bridge figure.",
    "tags": [
      "density",
      "dead load",
      "unit weight"
    ],
    "variables": [
      {
        "key": "ρ",
        "label": "Bulk density",
        "unit": "kg/cum"
      }
    ],
    "calcInputs": [
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "r",
        "label": "Density",
        "unit": "kg/cum",
        "defaultValue": 2500
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-06",
    "name": "Tamil Nadu trade \"unit\" — sand & jelly",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Likely",
    "reference": "Local trade practice",
    "unit": "units",
    "example": "1 unit = 100 cft = 2.832 cum\nUnits = Volume(cft) ÷ 100\nTypical lorry: 1 unit (small), 2 units (medium), 3 units (full tipper)",
    "workedExample": "Brickwork mortar sand for the job = 470 cft\nUnits = 470 ÷ 100 = 4.7 → order 5 units\nAt ₹5,200 per unit ≈ ₹26,000",
    "note": "This is a trade convention, not a code unit — confirm with each supplier whether their \"unit\" is 100 cft, and whether it is measured loose in the lorry body or after unloading. The difference is routinely 5–8%.",
    "tags": [
      "sand",
      "jelly",
      "unit",
      "chennai",
      "procurement",
      "local"
    ],
    "variables": [
      {
        "key": "U",
        "label": "Trade units",
        "unit": "units"
      },
      {
        "key": "V",
        "label": "Volume",
        "unit": "cft"
      }
    ],
    "calcInputs": [
      {
        "key": "v",
        "label": "Volume required",
        "unit": "cft",
        "defaultValue": 470
      },
      {
        "key": "r",
        "label": "Rate per unit",
        "unit": "INR",
        "defaultValue": 5200
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-07",
    "name": "Brick sizes and bricks per cubic metre",
    "categoryKey": "CONV",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 1077:1992 · IS 2212:1991",
    "unit": "nos/cum",
    "example": "Modular brick 190×90×90 mm, with 10 mm joint → 200×100×100\nBricks/cum = 1 ÷ (0.20 × 0.10 × 0.10) = 500 nos\n\nChennai country brick ≈ 230×110×75 mm, with 10 mm joint → 240×120×85\nBricks/cum = 1 ÷ (0.240 × 0.120 × 0.085) = 408 nos",
    "workedExample": "9 inch wall, 10 m × 3 m = 30 sqm, thickness 0.23 m\nVolume = 30 × 0.23 = 6.9 cum\nModular: 6.9 × 500 = 3,450 nos + 5% wastage = 3,623 nos",
    "note": "Do not assume 500/cum for Chennai country brick — measure 10 bricks from the actual delivered lot, average them, and update this formula. Country brick sizes vary kiln to kiln by up to 8 mm.",
    "tags": [
      "brick",
      "masonry",
      "count",
      "chennai"
    ],
    "variables": [
      {
        "key": "l,b,h",
        "label": "Brick nominal size incl. joint",
        "unit": "m"
      },
      {
        "key": "N",
        "label": "Bricks per cum",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Brick length + joint",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "B",
        "label": "Brick width + joint",
        "unit": "mm",
        "defaultValue": 100
      },
      {
        "key": "H",
        "label": "Brick height + joint",
        "unit": "mm",
        "defaultValue": 100
      },
      {
        "key": "V",
        "label": "Wall volume",
        "unit": "cum",
        "defaultValue": 6.9
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONV-08",
    "name": "Length & weight conversions for site",
    "categoryKey": "CONV",
    "type": "Conversion",
    "confidence": "Certain",
    "reference": "SI definition",
    "unit": "m / kg",
    "example": "1 m = 3.28084 ft · 1 ft = 0.3048 m · 1 inch = 25.4 mm\n1 MT = 1000 kg · 1 quintal = 100 kg\n1 acre = 43,560 sqft · 1 ground (Chennai) = 2,400 sqft · 1 cent = 435.6 sqft",
    "workedExample": "Plot of 1.5 ground = 1.5 × 2400 = 3,600 sqft = 334.45 sqm",
    "note": "\"Ground\" (2,400 sqft) and \"cent\" (1/100 acre) are the land units used in Chennai deeds. CMDA drawings are in sqm — mismatches here cause FSI errors.",
    "tags": [
      "conversion",
      "ground",
      "cent",
      "acre",
      "chennai",
      "land"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Standard conversions",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "g",
        "label": "Land area",
        "unit": "ground",
        "defaultValue": 1.5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-01",
    "name": "Excavation volume — open trench / pit",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.1:1992",
    "unit": "cum",
    "example": "V = L × B × D  (per pit)\nTotal = V × number of pits\nWith side slope 1:n → V = D/6 × [(L₁B₁) + (L₂B₂) + 4(Lm·Bm)]  (prismoidal)",
    "workedExample": "12 footing pits, each 1.8 m × 1.8 m × 1.5 m deep\nV per pit = 1.8 × 1.8 × 1.5 = 4.86 cum\nTotal = 4.86 × 12 = 58.32 cum",
    "note": "IS 1200 measures excavation on the net dimension of the foundation plus working space, not on the widened top of a sloped cut — contractors bill the sloped volume. Fix which basis your contract uses before the first bill.",
    "tags": [
      "excavation",
      "earthwork",
      "footing",
      "trench"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Length at bottom",
        "unit": "m"
      },
      {
        "key": "B",
        "label": "Width at bottom",
        "unit": "m"
      },
      {
        "key": "D",
        "label": "Depth below NGL",
        "unit": "m"
      },
      {
        "key": "n",
        "label": "Side slope ratio",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Length",
        "unit": "m",
        "defaultValue": 1.8
      },
      {
        "key": "B",
        "label": "Width",
        "unit": "m",
        "defaultValue": 1.8
      },
      {
        "key": "D",
        "label": "Depth",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "N",
        "label": "No. of pits",
        "unit": "nos",
        "defaultValue": 12
      }
    ],
    "costCalculatorCategoryKey": "earthwork"
  },
  {
    "formulaCode": "EARTH-02",
    "name": "Soil bulking (swell) and lorry trips for disposal",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2720 / trade practice",
    "unit": "cum · trips",
    "example": "Loose volume = In-situ volume × Swell factor\nSwell factor: sandy 1.10–1.15 · ordinary red soil 1.20–1.25 · clay / black cotton 1.25–1.40 · soft rock 1.40–1.60\nTrips = ⌈Loose volume ÷ Lorry capacity⌉",
    "workedExample": "58.32 cum excavated in red soil, f = 1.22, tipper 5 cum\nLoose = 58.32 × 1.22 = 71.15 cum\nTrips = 71.15 ÷ 5 = 14.23 → 15 trips\nAt ₹1,800/trip = ₹27,000",
    "note": "[Verify] Swell factor is site-specific. Calibrate it once per site: count the actual trips for the first 20 cum of measured excavation, then back-solve f = (trips × capacity) ÷ in-situ volume. This single calibration usually pays for itself on disposal billing.",
    "tags": [
      "swell",
      "bulking",
      "disposal",
      "lorry",
      "earthwork",
      "labour"
    ],
    "variables": [
      {
        "key": "V_i",
        "label": "In-situ (measured) volume",
        "unit": "cum"
      },
      {
        "key": "f",
        "label": "Swell factor",
        "unit": "—"
      },
      {
        "key": "C",
        "label": "Lorry capacity",
        "unit": "cum/trip"
      }
    ],
    "calcInputs": [
      {
        "key": "V",
        "label": "In-situ volume",
        "unit": "cum",
        "defaultValue": 58.32
      },
      {
        "key": "f",
        "label": "Swell factor",
        "unit": "—",
        "defaultValue": 1.22
      },
      {
        "key": "C",
        "label": "Lorry capacity",
        "unit": "cum",
        "defaultValue": 5
      },
      {
        "key": "r",
        "label": "Rate per trip",
        "unit": "INR",
        "defaultValue": 1800
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-03",
    "name": "Back-filling and surplus earth balance",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.1",
    "unit": "cum",
    "example": "Backfill = Excavated volume − Volume of structure below NGL\nSurplus for disposal = Excavated − Backfill (in in-situ measure)\nCompacted backfill needs ≈ 1.10 × loose volume of borrowed earth",
    "workedExample": "Excavation 58.32 cum, structure below GL 19.40 cum\nBackfill = 58.32 − 19.40 = 38.92 cum\nSurplus = 19.40 cum (in-situ) → ×1.22 swell = 23.67 cum loose",
    "note": "The commonest silent leak on a residential site: paying for disposal of the full excavation AND paying again for borrowed filling soil. Always run this balance before approving either bill.",
    "tags": [
      "backfill",
      "earthwork",
      "balance",
      "disposal"
    ],
    "variables": [
      {
        "key": "V_e",
        "label": "Excavation",
        "unit": "cum"
      },
      {
        "key": "V_s",
        "label": "Footing + PCC + pedestal below GL",
        "unit": "cum"
      }
    ],
    "calcInputs": [
      {
        "key": "e",
        "label": "Excavation",
        "unit": "cum",
        "defaultValue": 58.32
      },
      {
        "key": "s",
        "label": "Structure below GL",
        "unit": "cum",
        "defaultValue": 19.4
      },
      {
        "key": "f",
        "label": "Swell factor",
        "unit": "—",
        "defaultValue": 1.22
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-04",
    "name": "Compaction layers and roller/rammer passes",
    "categoryKey": "EARTH",
    "type": "Labour",
    "confidence": "Verify",
    "reference": "IS 3764 / MoRTH",
    "unit": "layers",
    "example": "Layers = ⌈Total fill depth ÷ Layer thickness⌉\nLayer thickness: hand rammer 100–150 mm · plate compactor 200 mm · vibratory roller 250–300 mm\nWater added ≈ OMC (6–12% by weight of soil)",
    "workedExample": "Plinth filling 900 mm deep, plate compactor at 200 mm layers\nLayers = 900 ÷ 200 = 4.5 → 5 layers\nAt 2 passes per layer = 10 compaction passes",
    "note": "[Verify] Achieve 95% Proctor density (IS 2720 Pt.7). Without a field density test this is a guess — for anything carrying a floor slab, insist on one sand-replacement test per 200 sqm per layer.",
    "tags": [
      "compaction",
      "filling",
      "layers",
      "plinth",
      "quality"
    ],
    "variables": [
      {
        "key": "D",
        "label": "Total fill depth",
        "unit": "mm"
      },
      {
        "key": "t",
        "label": "Compacted layer thickness",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "D",
        "label": "Fill depth",
        "unit": "mm",
        "defaultValue": 900
      },
      {
        "key": "t",
        "label": "Layer thickness",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "p",
        "label": "Passes per layer",
        "unit": "nos",
        "defaultValue": 2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-05",
    "name": "Sand bulking correction for volume batching",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 2386 Pt.3:1963",
    "unit": "%",
    "example": "Bulking (%) = [(V_moist − V_dry) ÷ V_dry] × 100\nCorrected sand volume = Design volume × (1 + bulking/100)\nTypical bulking: 4% moisture → 25–30% · fully saturated → ≈ 0%",
    "workedExample": "Field test: 100 cft loose damp sand settles to 78 cft when flooded\nBulking = (100 − 78)/78 × 100 = 28.2%\nIf design needs 15 cft dry sand, measure 15 × 1.282 = 19.2 cft at site",
    "note": "This is the single largest cause of weak site-mixed concrete in the monsoon. Damp sand occupies up to 30% more volume, so a \"1:1.5:3\" box-batched mix silently becomes 1:1.15:3 — under-sanded and over-cement. Run the jar test weekly in June–November.",
    "tags": [
      "sand",
      "bulking",
      "batching",
      "concrete",
      "quality",
      "monsoon"
    ],
    "variables": [
      {
        "key": "V_m",
        "label": "Loose moist sand volume",
        "unit": "cft"
      },
      {
        "key": "V_d",
        "label": "Volume after inundation",
        "unit": "cft"
      }
    ],
    "calcInputs": [
      {
        "key": "m",
        "label": "Moist sand volume",
        "unit": "cft",
        "defaultValue": 100
      },
      {
        "key": "d",
        "label": "Inundated volume",
        "unit": "cft",
        "defaultValue": 78
      },
      {
        "key": "req",
        "label": "Design (dry) sand needed",
        "unit": "cft",
        "defaultValue": 15
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-06",
    "name": "Anti-termite chemical quantity",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 6313 Pt.2:2013",
    "unit": "litres",
    "example": "Bottom & sides of excavation: 5 litres/sqm of emulsion\nBackfill against foundation: 7.5 litres per running metre per 300 mm depth\nUnder floor slab (top surface of fill): 5 litres/sqm\nEmulsion = chemical concentrate diluted to 1% w/w (Chlorpyriphos 20 EC)",
    "workedExample": "Ground floor plinth area 750 sqft = 69.68 sqm\nEmulsion = 69.68 × 5 = 348.4 litres\nConcentrate at 1% = 3.48 litres of Chlorpyriphos 20 EC",
    "note": "[Verify] Doses differ between IS 6313 Part 2 clauses (pre-constructional) and Part 3 (post-constructional). Ask the applicator for the empty containers as proof of quantity — under-dosing here is invisible until termites appear two years later.",
    "tags": [
      "termite",
      "chemical",
      "foundation",
      "treatment"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Treated area",
        "unit": "sqm"
      },
      {
        "key": "q",
        "label": "Dose",
        "unit": "l/sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Plinth area",
        "unit": "sqft",
        "defaultValue": 750
      },
      {
        "key": "q",
        "label": "Dose",
        "unit": "l/sqm",
        "defaultValue": 5
      },
      {
        "key": "c",
        "label": "Concentration",
        "unit": "%",
        "defaultValue": 1
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-07",
    "name": "PCC levelling course under footing",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 456:2000 cl.34.1.3",
    "unit": "cum",
    "example": "V_pcc = (L + 2×o) × (B + 2×o) × t × N\nStandard: t = 75 mm (residential) or 100 mm (heavy footing), offset o = 75–100 mm all round\nMix: M10 (1:3:6) or M7.5 (1:4:8)",
    "workedExample": "Footing 1.5×1.5 m, offset 0.075 m, PCC 75 mm, 12 nos\nPlan = 1.65 × 1.65 = 2.72 sqm\nV = 2.72 × 0.075 × 12 = 2.45 cum\nM10 cement = 2.45 × 4.44 bags = 10.9 → 11 bags",
    "note": "PCC is a levelling and blinding course, not a structural element — do not let a contractor bill 100 mm where 75 mm is specified without a written instruction.",
    "tags": [
      "pcc",
      "foundation",
      "levelling",
      "m10"
    ],
    "variables": [
      {
        "key": "L,B",
        "label": "Footing size",
        "unit": "m"
      },
      {
        "key": "o",
        "label": "Offset beyond footing",
        "unit": "m"
      },
      {
        "key": "t",
        "label": "PCC thickness",
        "unit": "m"
      },
      {
        "key": "N",
        "label": "No. of footings",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Footing length",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "B",
        "label": "Footing width",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "o",
        "label": "Offset each side",
        "unit": "m",
        "defaultValue": 0.075
      },
      {
        "key": "t",
        "label": "PCC thickness",
        "unit": "m",
        "defaultValue": 0.075
      },
      {
        "key": "N",
        "label": "No. of footings",
        "unit": "nos",
        "defaultValue": 12
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-08",
    "name": "Isolated footing — concrete and steel",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.34",
    "unit": "cum · kg",
    "example": "Sloped footing V = (L×B×d₁) + (h/3)[A_bottom + A_top + √(A_b×A_t)]\nFlat footing V = L × B × D\nSteel = V × steel% × 7850 ÷ 100   (footing 0.5–0.8% typical)",
    "workedExample": "Footing 1.5 × 1.5 × 0.45 m, 12 nos, steel 0.7%\nV = 1.5×1.5×0.45 = 1.0125 cum → ×12 = 12.15 cum\nSteel = 12.15 × 0.7/100 × 7850 = 667.6 kg ≈ 0.67 MT",
    "note": "The 0.5–0.8% band is a budgeting thumb rule only. Actual footing steel comes from the structural drawing and the soil bearing capacity — never issue a purchase order on the thumb rule alone.",
    "tags": [
      "footing",
      "foundation",
      "rcc",
      "steel",
      "concrete"
    ],
    "variables": [
      {
        "key": "L,B",
        "label": "Footing plan size",
        "unit": "m"
      },
      {
        "key": "D",
        "label": "Footing depth",
        "unit": "m"
      },
      {
        "key": "p",
        "label": "Steel percentage",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Length",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "B",
        "label": "Width",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "D",
        "label": "Depth",
        "unit": "m",
        "defaultValue": 0.45
      },
      {
        "key": "N",
        "label": "Nos",
        "unit": "nos",
        "defaultValue": 12
      },
      {
        "key": "p",
        "label": "Steel %",
        "unit": "%",
        "defaultValue": 0.7
      }
    ],
    "costCalculatorCategoryKey": "foundation"
  },
  {
    "formulaCode": "EARTH-09",
    "name": "Footing area from column load and SBC",
    "categoryKey": "EARTH",
    "type": "Design",
    "confidence": "Verify",
    "reference": "IS 6403:1981 · IS 1904",
    "unit": "sqm",
    "example": "A_req = (P × 1.10) ÷ SBC        (10% added for footing self-weight)\nSquare footing side = √A_req\nSBC (Chennai typical): filled-up soil 50–80 · red soil 120–180 · sandy clay 150–200 kN/sqm",
    "workedExample": "Column load 450 kN, SBC 150 kN/sqm\nA = 450 × 1.10 ÷ 150 = 3.30 sqm\nSide = √3.30 = 1.82 m → adopt 1.85 × 1.85 m",
    "note": "[Verify] SBC must come from a soil investigation report, not a thumb rule. Ayapakkam and much of North Chennai has pockets of filled-up soil where assumed SBC is dangerously optimistic. One borehole costs far less than one differential settlement crack.",
    "tags": [
      "sbc",
      "footing",
      "bearing capacity",
      "design",
      "soil"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Service axial load on column",
        "unit": "kN"
      },
      {
        "key": "SBC",
        "label": "Safe bearing capacity",
        "unit": "kN/sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "P",
        "label": "Column service load",
        "unit": "kN",
        "defaultValue": 450
      },
      {
        "key": "s",
        "label": "SBC",
        "unit": "kN/sqm",
        "defaultValue": 150
      },
      {
        "key": "f",
        "label": "Self-wt allowance",
        "unit": "%",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EARTH-10",
    "name": "Plinth filling and plinth beam volume",
    "categoryKey": "EARTH",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.1",
    "unit": "cum",
    "example": "Plinth fill = Plinth area × (Plinth height − Slab thk − Sub-base thk)\nPlinth beam V = Σ (b × d × L) over all beam runs\nSub-base (jelly/WMM) = Plinth area × 100 to 150 mm",
    "workedExample": "Plinth area 750 sqft = 69.68 sqm, fill depth 0.6 m\nFill = 69.68 × 0.6 = 41.81 cum → at swell 1.2, order 50.2 cum loose\nPlinth beam 0.23 × 0.30 × 62 m run = 4.28 cum",
    "note": "Plinth filling is billed in compacted (in-situ) measure but purchased in loose lorry measure. State clearly in the work order which one the rate applies to.",
    "tags": [
      "plinth",
      "filling",
      "beam",
      "volume"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Plinth area",
        "unit": "sqm"
      },
      {
        "key": "h",
        "label": "Fill depth",
        "unit": "m"
      },
      {
        "key": "b,d,L",
        "label": "Beam breadth, depth, length",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Plinth area",
        "unit": "sqft",
        "defaultValue": 750
      },
      {
        "key": "h",
        "label": "Fill depth",
        "unit": "m",
        "defaultValue": 0.6
      },
      {
        "key": "b",
        "label": "Beam width",
        "unit": "m",
        "defaultValue": 0.23
      },
      {
        "key": "d",
        "label": "Beam depth",
        "unit": "m",
        "defaultValue": 0.3
      },
      {
        "key": "L",
        "label": "Beam run",
        "unit": "m",
        "defaultValue": 62
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-01",
    "name": "Dry volume factor for concrete and mortar",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 456:2000",
    "unit": "factor",
    "example": "Dry volume = Wet volume × 1.54   (concrete)\nDry volume = Wet volume × 1.33   (cement mortar)\n\nReason: voids in loose sand (≈20%) and in aggregate (≈34%) fill up on mixing,\nso loose dry material always exceeds the compacted wet volume.",
    "workedExample": "1 cum of finished M20 concrete\nDry material required = 1 × 1.54 = 1.54 cum\nSplit in ratio 1 : 1.5 : 3 (sum 5.5)",
    "note": "The factor ranges 1.52–1.57 in different references. 1.54 is the accepted Indian default and is what your BOQ Engine spec already uses — keep it consistent across all 19 modules or your cement totals will not reconcile between modules.",
    "tags": [
      "dry volume",
      "1.54",
      "concrete",
      "mortar",
      "factor"
    ],
    "variables": [
      {
        "key": "V_wet",
        "label": "Finished (wet) concrete volume",
        "unit": "cum"
      },
      {
        "key": "f",
        "label": "Dry volume factor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "w",
        "label": "Wet volume",
        "unit": "cum",
        "defaultValue": 1
      },
      {
        "key": "f",
        "label": "Factor",
        "unit": "—",
        "defaultValue": 1.54
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-02",
    "name": "Nominal mix concrete — full material take-off",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 456:2000 Table 9 · IS 383",
    "unit": "bags · cft · litres",
    "example": "Dry volume      = Wet volume × 1.54\nCement volume   = Dry × (1 ÷ Σratio)\nCement bags     = Cement volume ÷ 0.0347\nSand volume     = Dry × (sand ÷ Σratio)\nAggregate       = Dry × (agg ÷ Σratio)\nWater           = Cement weight × w/c ratio",
    "workedExample": "10 cum of M20 (1:1.5:3), Σ = 5.5, w/c = 0.50\nDry = 10 × 1.54 = 15.4 cum\nCement = 15.4 × 1/5.5 = 2.80 cum = 2.80 ÷ 0.0347 = 80.7 → 81 bags\nSand = 15.4 × 1.5/5.5 = 4.20 cum = 148.3 cft\nAggregate = 15.4 × 3/5.5 = 8.40 cum = 296.6 cft\nWater = 81 × 50 × 0.50 = 2,025 litres\n\nWith 3% wastage (the calculator default): 84 bags, 152.8 cft sand, 305.5 cft aggregate",
    "note": "Per cum of concrete, cement bags are: M5 → 2.77 · M7.5 → 3.41 · M10 → 4.44 · M15 → 6.34 · M20 → 8.06 · M25 → 11.09. Nominal mixes are permitted by IS 456 only up to M20; M25 and above should be design mixes with a lab trial.",
    "tags": [
      "concrete",
      "m20",
      "m25",
      "mix",
      "cement",
      "sand",
      "aggregate",
      "boq"
    ],
    "variables": [
      {
        "key": "V",
        "label": "Wet concrete volume",
        "unit": "cum"
      },
      {
        "key": "Σ",
        "label": "Sum of mix ratio parts",
        "unit": "—"
      },
      {
        "key": "w/c",
        "label": "Water–cement ratio",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "V",
        "label": "Wet volume",
        "unit": "cum",
        "defaultValue": 10
      },
      {
        "key": "g",
        "label": "Grade",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "f",
        "label": "Dry factor",
        "unit": "—",
        "defaultValue": 1.54
      },
      {
        "key": "wc",
        "label": "Water–cement",
        "unit": "—",
        "defaultValue": 0.5
      },
      {
        "key": "wa",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 3
      }
    ],
    "costCalculatorCategoryKey": "concrete"
  },
  {
    "formulaCode": "CONC-03",
    "name": "Water–cement ratio and water per bag",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 456:2000 Table 5",
    "unit": "litres/bag",
    "example": "Water = Cement weight × (w/c)\nWater per bag = 50 × (w/c)\n\nw/c 0.45 → 22.5 l/bag · 0.50 → 25 l/bag · 0.55 → 27.5 l/bag · 0.60 → 30 l/bag\nMaximum free w/c (mild exposure, RCC) = 0.55 · moderate = 0.50 · severe (coastal) = 0.45",
    "workedExample": "M20 slab, 81 bags, exposure moderate → w/c 0.50\nWater = 81 × 50 × 0.50 = 2,025 litres\nDeduct free moisture already in the sand (typically 3–6% by weight of sand).",
    "note": "[Verify for coastal sites] Sholinganallur / ECR projects fall under \"severe\" exposure in IS 456 Table 3 — maximum w/c 0.45, minimum cement 320 kg/cum, minimum grade M30 for RCC. A standard M20 mix specified inland is not compliant there.",
    "tags": [
      "water cement",
      "wc ratio",
      "durability",
      "exposure",
      "coastal"
    ],
    "variables": [
      {
        "key": "w/c",
        "label": "Free water–cement ratio",
        "unit": "—"
      },
      {
        "key": "W_c",
        "label": "Cement weight",
        "unit": "kg"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Cement bags",
        "unit": "bags",
        "defaultValue": 81
      },
      {
        "key": "wc",
        "label": "w/c ratio",
        "unit": "—",
        "defaultValue": 0.5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-04",
    "name": "Slab concrete volume",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.2",
    "unit": "cum",
    "example": "V = Plan area × Thickness\nDeduct openings > 0.10 sqm (staircase voids, shafts, cut-outs)\nAdd drop / sunken portions separately",
    "workedExample": "Ground floor slab 1,050 sqft = 97.55 sqm, thickness 125 mm, staircase void 3.2 sqm\nV = (97.55 − 3.20) × 0.125 = 11.79 cum\nM20 cement = 11.79 × 8.06 = 95 bags",
    "note": "Site teams routinely pour 10–15 mm thicker than drawing. On a 100 sqm slab that is 1.0–1.5 cum of extra concrete — about 12 extra bags of cement per floor. Check the level pegs, not the bill.",
    "tags": [
      "slab",
      "concrete",
      "volume",
      "rcc"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Slab plan area",
        "unit": "sqm"
      },
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Slab area",
        "unit": "sqft",
        "defaultValue": 1050
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "o",
        "label": "Openings deduct",
        "unit": "sqm",
        "defaultValue": 3.2
      }
    ],
    "costCalculatorCategoryKey": "rccSlab"
  },
  {
    "formulaCode": "CONC-05",
    "name": "Column concrete volume (per floor)",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.2",
    "unit": "cum",
    "example": "V = b × D × H × N\nH measured from top of footing / floor slab to underside of beam\nDeduct nothing for reinforcement (IS 1200)",
    "workedExample": "14 columns of 230 × 450 mm, floor height 3.0 m, beam depth 0.45 → clear 2.55 m\nV = 0.23 × 0.45 × 2.55 × 14 = 3.69 cum\nSteel @ 2.0% = 3.69 × 0.02 × 7850 = 579 kg",
    "note": "Column steel is the densest in the building (1.0–2.5% typical, IS 456 allows 0.8–6%). Budget 2% for G+2 residential and confirm against the bar bending schedule.",
    "tags": [
      "column",
      "concrete",
      "rcc",
      "volume"
    ],
    "variables": [
      {
        "key": "b,D",
        "label": "Column section",
        "unit": "m"
      },
      {
        "key": "H",
        "label": "Clear height",
        "unit": "m"
      },
      {
        "key": "N",
        "label": "Number of columns",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Width",
        "unit": "mm",
        "defaultValue": 230
      },
      {
        "key": "D",
        "label": "Depth",
        "unit": "mm",
        "defaultValue": 450
      },
      {
        "key": "H",
        "label": "Clear height",
        "unit": "m",
        "defaultValue": 2.55
      },
      {
        "key": "N",
        "label": "Nos",
        "unit": "nos",
        "defaultValue": 14
      },
      {
        "key": "p",
        "label": "Steel %",
        "unit": "%",
        "defaultValue": 2
      }
    ],
    "costCalculatorCategoryKey": "rccColumn"
  },
  {
    "formulaCode": "CONC-06",
    "name": "Beam concrete volume",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.2",
    "unit": "cum",
    "example": "V = b × (D − t_slab) × L_clear × N     (beam below slab, slab measured separately)\nL_clear = centre-to-centre span − column width\nDo not double-count the slab thickness portion of the beam",
    "workedExample": "Beam 230 × 450 mm, slab 125 mm, total clear run 58 m\nV = 0.23 × (0.45 − 0.125) × 58 = 4.34 cum\nSteel @ 1.8% = 4.34 × 0.018 × 7850 = 613 kg",
    "note": "Double-counting the beam/slab overlap is the most frequent quantity error in manual BOQs — typically 4–6% of total RCC. The engine must subtract slab thickness automatically.",
    "tags": [
      "beam",
      "concrete",
      "rcc",
      "volume",
      "double count"
    ],
    "variables": [
      {
        "key": "b",
        "label": "Beam width",
        "unit": "m"
      },
      {
        "key": "D",
        "label": "Overall beam depth",
        "unit": "m"
      },
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "m"
      },
      {
        "key": "L",
        "label": "Clear span",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Beam width",
        "unit": "mm",
        "defaultValue": 230
      },
      {
        "key": "D",
        "label": "Beam depth",
        "unit": "mm",
        "defaultValue": 450
      },
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "L",
        "label": "Total clear run",
        "unit": "m",
        "defaultValue": 58
      },
      {
        "key": "p",
        "label": "Steel %",
        "unit": "%",
        "defaultValue": 1.8
      }
    ],
    "costCalculatorCategoryKey": "rccBeam"
  },
  {
    "formulaCode": "CONC-07",
    "name": "Staircase concrete and steel",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.33",
    "unit": "cum",
    "example": "Waist slab V = √(R² + T²)/T × (going length) × width × waist thk\nSteps V = ½ × R × T × width × number of steps\nTotal V = Waist + Steps + Landing\nThumb: 0.05 cum concrete per riser, 5 kg steel per riser",
    "workedExample": "Floor height 3.0 m, riser 150 mm → 20 risers, tread 280 mm, width 1.05 m, waist 150 mm\nThumb check: 20 × 0.05 = 1.0 cum concrete, 20 × 5 = 100 kg steel",
    "note": "Blondel comfort rule: 2R + T should fall between 550 and 650 mm. 2(150) + 280 = 580 mm — comfortable. Anything above 650 mm feels like climbing a ladder; NBC caps residential riser at 190 mm and requires minimum tread 250 mm.",
    "tags": [
      "staircase",
      "riser",
      "tread",
      "blondel",
      "concrete"
    ],
    "variables": [
      {
        "key": "R",
        "label": "Riser",
        "unit": "m"
      },
      {
        "key": "T",
        "label": "Tread (going)",
        "unit": "m"
      },
      {
        "key": "W",
        "label": "Flight width",
        "unit": "m"
      },
      {
        "key": "n",
        "label": "Number of risers",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "H",
        "label": "Floor height",
        "unit": "mm",
        "defaultValue": 3000
      },
      {
        "key": "R",
        "label": "Riser",
        "unit": "mm",
        "defaultValue": 150
      },
      {
        "key": "T",
        "label": "Tread",
        "unit": "mm",
        "defaultValue": 280
      },
      {
        "key": "W",
        "label": "Width",
        "unit": "m",
        "defaultValue": 1.05
      }
    ],
    "costCalculatorCategoryKey": "staircase"
  },
  {
    "formulaCode": "CONC-08",
    "name": "Lintel and sunshade (chajja) volume",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 456 / NBC 2016",
    "unit": "cum",
    "example": "Lintel length = Opening width + 2 × bearing   (bearing = 150–230 mm each side)\nLintel V = b × d × L × N\nSunshade V = Projection × Width × Avg thickness  (taper 100 mm at wall → 60 mm at tip)\nLintel depth thumb = opening width ÷ 12, minimum 150 mm",
    "workedExample": "Window 1.5 m wide, bearing 0.20 m each side, lintel 0.23 × 0.15 m\nL = 1.5 + 0.40 = 1.90 m\nV = 0.23 × 0.15 × 1.90 = 0.0656 cum per lintel\nChajja 0.60 m projection × 1.9 m × 0.08 avg = 0.091 cum",
    "note": "Chajja projection above 0.60 m needs a design check for cantilever deflection and anchorage into the lintel — the top steel must extend back at least 1.5 × projection into the slab or lintel.",
    "tags": [
      "lintel",
      "sunshade",
      "chajja",
      "opening",
      "cantilever"
    ],
    "variables": [
      {
        "key": "W_o",
        "label": "Opening width",
        "unit": "m"
      },
      {
        "key": "bg",
        "label": "Bearing each side",
        "unit": "m"
      },
      {
        "key": "P",
        "label": "Chajja projection",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "W",
        "label": "Opening width",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "bg",
        "label": "Bearing each side",
        "unit": "m",
        "defaultValue": 0.2
      },
      {
        "key": "b",
        "label": "Lintel width",
        "unit": "m",
        "defaultValue": 0.23
      },
      {
        "key": "d",
        "label": "Lintel depth",
        "unit": "m",
        "defaultValue": 0.15
      },
      {
        "key": "N",
        "label": "No. of openings",
        "unit": "nos",
        "defaultValue": 9
      },
      {
        "key": "P",
        "label": "Chajja projection",
        "unit": "m",
        "defaultValue": 0.6
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-09",
    "name": "Cube test — 7-day vs 28-day and acceptance",
    "categoryKey": "CONC",
    "type": "Quality",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.15 & 16 · IS 516",
    "unit": "N/sqmm",
    "example": "7-day strength ≈ 0.65 to 0.70 × 28-day strength\nAcceptance (IS 456 cl.16.1): mean of 4 consecutive results ≥ fck + 0.825σ  AND  ≥ fck + 3 (for M15–M20) or fck + 4 (M25+)\nIndividual result must be ≥ fck − 3 (M15–M20) or fck − 4 (M25+)\nSampling: 1–5 cum → 1 sample · 6–15 → 2 · 16–30 → 3 · 31–50 → 4 · >50 → 4 + 1 per 50 cum",
    "workedExample": "M20 slab pour of 12 cum → 2 samples (6 cubes) required\n7-day result 14.2 N/sqmm → projected 28-day = 14.2 ÷ 0.67 = 21.2 N/sqmm ✓\nIndividual acceptance floor = 20 − 3 = 17 N/sqmm",
    "note": "A 7-day result below 0.65 × fck is an early warning, not a failure — but stop the next pour and check the sand bulking (EARTH-05) and w/c ratio before continuing. Retesting after 28 days when three floors are already up is not a remedy.",
    "tags": [
      "cube test",
      "quality",
      "strength",
      "acceptance",
      "is 456"
    ],
    "variables": [
      {
        "key": "fck",
        "label": "Characteristic strength",
        "unit": "N/sqmm"
      },
      {
        "key": "σ",
        "label": "Standard deviation",
        "unit": "N/sqmm"
      }
    ],
    "calcInputs": [
      {
        "key": "f",
        "label": "Grade fck",
        "unit": "N/sqmm",
        "defaultValue": 20
      },
      {
        "key": "s7",
        "label": "7-day result",
        "unit": "N/sqmm",
        "defaultValue": 14.2
      },
      {
        "key": "V",
        "label": "Pour volume",
        "unit": "cum",
        "defaultValue": 12
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-10",
    "name": "Slump values by member",
    "categoryKey": "CONC",
    "type": "Quality",
    "confidence": "Likely",
    "reference": "IS 456:2000 Table 11 · IS 1199",
    "unit": "mm",
    "example": "Lightly reinforced foundations / mass concrete : 25 – 75 mm\nBeams, slabs, columns (normal reinforcement)    : 50 – 100 mm\nHeavily reinforced sections, thin walls          : 75 – 125 mm\nPumped concrete                                  : 100 – 150 mm\nSlump test: 300 mm cone, 3 layers × 25 tamps",
    "workedExample": "Adding 20 litres of water to a 0.5 cum site mix raises slump by roughly 25 mm — and drops 28-day strength by about 8–10%.",
    "note": "[Verify against your own mix] The water-for-workability trade-off is the most expensive habit on an Indian site. Use a plasticiser instead: 0.5–1.0% by weight of cement typically buys 40–60 mm of slump at no strength cost.",
    "tags": [
      "slump",
      "workability",
      "quality",
      "concrete"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Workability band by member",
        "unit": "mm"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-11",
    "name": "Curing water requirement",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 456:2000 cl.13.5",
    "unit": "litres",
    "example": "Ponding water for slab ≈ Area × 50 mm depth, topped up daily\nV (litres) = Area(sqm) × 0.05 × 1000 × (evaporation top-up factor ≈ 0.3/day)\nMinimum curing: 7 days (OPC) · 10–14 days (PPC / blended) · 14 days for severe exposure",
    "workedExample": "Slab 97.5 sqm, ponded 50 mm, 14 days\nInitial fill = 97.5 × 0.05 × 1000 = 4,875 litres\nDaily top-up ≈ 30% = 1,463 l/day × 13 = 19,019 l\nTotal ≈ 23,894 litres ≈ 24 kl (about 3 tanker loads of 8 kl)",
    "note": "[Verify] The 30% evaporation top-up is a Chennai summer estimate and will be lower in the monsoon. Curing compound (₹/sqm) is worth costing against tanker water for sites without a bore — one 20-litre drum covers roughly 100–120 sqm.",
    "tags": [
      "curing",
      "water",
      "slab",
      "is 456",
      "quality"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Slab area",
        "unit": "sqm"
      },
      {
        "key": "d",
        "label": "Curing days",
        "unit": "days"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Slab area",
        "unit": "sqm",
        "defaultValue": 97.5
      },
      {
        "key": "p",
        "label": "Ponding depth",
        "unit": "mm",
        "defaultValue": 50
      },
      {
        "key": "d",
        "label": "Curing days",
        "unit": "days",
        "defaultValue": 14
      },
      {
        "key": "e",
        "label": "Daily evaporation",
        "unit": "%",
        "defaultValue": 30
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-12",
    "name": "Admixture dosage",
    "categoryKey": "CONC",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 9103:1999",
    "unit": "litres / kg",
    "example": "Dosage = Cement weight × dose%\nPlasticiser 0.3 – 1.0% by weight of cement\nSuperplasticiser 0.5 – 2.0%\nIntegral waterproofing compound 1 – 2% (or 200 ml per bag, per manufacturer)",
    "workedExample": "81 bags = 4,050 kg cement, plasticiser at 0.6%\nDose = 4,050 × 0.006 = 24.3 kg ≈ 24.3 litres (SG ≈ 1.0)",
    "note": "[Verify with the product datasheet] Overdosing a plasticiser causes severe retardation — the slab can stay green for 48 hours. Always run a trial batch before a major pour, and never dose \"by eye\" from a bucket.",
    "tags": [
      "admixture",
      "plasticiser",
      "dosage",
      "waterproofing compound"
    ],
    "variables": [
      {
        "key": "W_c",
        "label": "Cement weight",
        "unit": "kg"
      },
      {
        "key": "p",
        "label": "Dose",
        "unit": "% by wt of cement"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Cement bags",
        "unit": "bags",
        "defaultValue": 81
      },
      {
        "key": "p",
        "label": "Dose",
        "unit": "%",
        "defaultValue": 0.6
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/litre",
        "defaultValue": 85
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "MASON-01",
    "name": "Brick masonry — bricks, cement and sand (master)",
    "categoryKey": "MASON",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 2212:1991 · IS 1077",
    "unit": "nos · bags · cft",
    "example": "Wall volume     = L × H × T − deductions\nBricks          = Volume × bricks per cum × (1 + wastage)\nWet mortar      = Volume × mortar fraction (≈0.23 for 10 mm joint)\nDry mortar      = Wet mortar × 1.33\nCement          = Dry mortar × 1/(1+r) ÷ 0.0347   bags\nSand            = Dry mortar × r/(1+r) × 35.3147  cft",
    "workedExample": "Wall 10 m × 3 m × 0.23 m = 6.90 cum, mortar 1:6, 5% brick wastage\nBricks = 6.90 × 500 × 1.05 = 3,623 nos\nWet mortar = 6.90 × 0.23 = 1.587 cum → dry = 2.111 cum\nCement = 2.111 × 1/7 ÷ 0.0347 = 8.69 → 9 bags\nSand = 2.111 × 6/7 × 35.3147 = 63.9 cft",
    "note": "Per cum of 9-inch brickwork in 1:6 mortar: ≈ 1.26 bags cement and 9.3 cft sand. Cross-check any contractor quantity against this. Deduct openings over 0.10 sqm per IS 1200.",
    "tags": [
      "brickwork",
      "masonry",
      "mortar",
      "cement",
      "sand",
      "boq"
    ],
    "variables": [
      {
        "key": "L,H,T",
        "label": "Wall length, height, thickness",
        "unit": "m"
      },
      {
        "key": "r",
        "label": "Mortar ratio (1:r)",
        "unit": "—"
      },
      {
        "key": "m",
        "label": "Mortar fraction of wall volume",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Wall length",
        "unit": "m",
        "defaultValue": 10
      },
      {
        "key": "H",
        "label": "Wall height",
        "unit": "m",
        "defaultValue": 3
      },
      {
        "key": "T",
        "label": "Thickness",
        "unit": "m",
        "defaultValue": 0.23
      },
      {
        "key": "ded",
        "label": "Openings deduct",
        "unit": "cum",
        "defaultValue": 0
      },
      {
        "key": "bpc",
        "label": "Bricks per cum",
        "unit": "nos",
        "defaultValue": 500
      },
      {
        "key": "r",
        "label": "Mortar ratio 1:r",
        "unit": "—",
        "defaultValue": 6
      },
      {
        "key": "mf",
        "label": "Mortar fraction",
        "unit": "—",
        "defaultValue": 0.23
      },
      {
        "key": "w",
        "label": "Brick wastage",
        "unit": "%",
        "defaultValue": 5
      }
    ],
    "costCalculatorCategoryKey": "brickwork"
  },
  {
    "formulaCode": "MASON-02",
    "name": "Half-brick (115 mm) partition wall per sqm",
    "categoryKey": "MASON",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 2212:1991",
    "unit": "per sqm",
    "example": "Volume per sqm = 1 × 0.115 = 0.115 cum\nBricks per sqm  = 0.115 × 500 = 57.5 ≈ 58 nos (+5% = 61)\nCement (1:4)    = 0.115 × 0.23 × 1.33 ÷ 5 ÷ 0.0347 = 0.203 bags/sqm\nSand            = 0.115 × 0.23 × 1.33 × 4/5 × 35.3147 = 0.99 cft/sqm",
    "workedExample": "Internal partitions 48 sqm\nBricks = 48 × 61 = 2,928 nos\nCement = 48 × 0.203 = 9.74 → 10 bags\nSand = 48 × 0.99 = 47.5 cft",
    "note": "Half-brick walls use richer mortar (1:4, not 1:6) because there is no thickness to carry load. Above 3.0 m height or 4.0 m length they need an RCC stiffener band — otherwise they crack at the junction within a year.",
    "tags": [
      "partition",
      "half brick",
      "115mm",
      "masonry"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm"
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm",
        "defaultValue": 48
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "m",
        "defaultValue": 0.115
      },
      {
        "key": "r",
        "label": "Mortar 1:r",
        "unit": "—",
        "defaultValue": 4
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "MASON-03",
    "name": "AAC block masonry — blocks, adhesive, mortar",
    "categoryKey": "MASON",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2185 Pt.3:1984",
    "unit": "nos · bags",
    "example": "Blocks per sqm = 1 ÷ (Block length × Block height)\nStandard AAC face 600 × 200 mm → 1 ÷ (0.6 × 0.2) = 8.33 blocks/sqm  (any thickness)\nBlocks per cum = 8.33 ÷ thickness(m)\nThin-bed adhesive (3 mm joint) ≈ 3.5–4.0 kg/sqm for 100 mm, 5–6 kg/sqm for 200 mm\nOne 40 kg adhesive bag covers ≈ 10–12 sqm of 100 mm wall",
    "workedExample": "Wall 60 sqm in 200 mm AAC\nBlocks = 60 × 8.33 × 1.03 (3% wastage) = 515 nos\nAdhesive = 60 × 5.5 = 330 kg = 9 bags of 40 kg\nSaving vs brick: AAC dead load 650 kg/cum against brickwork 1,920 kg/cum",
    "note": "⚠ DISCREPANCY WITH YOUR SPEC: BOQ Engine F17 lists aac100 at perSqm 16.7 — that is exactly double the geometric value. A 600×200 face is 0.12 sqm, so 1 ÷ 0.12 = 8.33 blocks/sqm regardless of whether the block is 100 or 200 mm thick. Thickness changes blocks-per-CUM, never blocks-per-SQM. The hollow-block perCum figures (392, 49) in the same table also do not reconcile. Fix before Prabhu codes masonryBlock.js.",
    "tags": [
      "aac",
      "block",
      "masonry",
      "adhesive",
      "discrepancy",
      "spec error"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm"
      },
      {
        "key": "l,h",
        "label": "Block face dimensions",
        "unit": "m"
      },
      {
        "key": "t",
        "label": "Block thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm",
        "defaultValue": 60
      },
      {
        "key": "l",
        "label": "Block length",
        "unit": "mm",
        "defaultValue": 600
      },
      {
        "key": "h",
        "label": "Block height",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "t",
        "label": "Block thickness",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "ad",
        "label": "Adhesive rate",
        "unit": "kg/sqm",
        "defaultValue": 5.5
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 3
      }
    ],
    "costCalculatorCategoryKey": "aac"
  },
  {
    "formulaCode": "MASON-04",
    "name": "Hollow concrete block masonry",
    "categoryKey": "MASON",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2185 Pt.1:2005",
    "unit": "nos · bags",
    "example": "Standard block 400 × 200 mm face, thickness 100/150/200/230 mm\nBlocks per sqm = 1 ÷ (0.4 × 0.2) = 12.5 nos  (any thickness)\nBlocks per cum = 12.5 ÷ thickness(m)\nMortar (1:6) ≈ 0.025 cum per sqm of 200 mm wall",
    "workedExample": "Compound wall 200 mm, 45 sqm\nBlocks = 45 × 12.5 × 1.03 = 580 nos\nMortar = 45 × 0.025 = 1.125 cum wet → dry 1.50 cum\nCement (1:6) = 1.50 ÷ 7 ÷ 0.0347 = 6.2 → 7 bags",
    "note": "[Verify block face size with your supplier] Chennai suppliers also sell 390 × 190 mm faces, which gives 13.5 blocks/sqm, not 12.5 — an 8% difference on a large compound wall.",
    "tags": [
      "hollow block",
      "solid block",
      "masonry",
      "compound wall"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm"
      },
      {
        "key": "t",
        "label": "Block thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Wall area",
        "unit": "sqm",
        "defaultValue": 45
      },
      {
        "key": "l",
        "label": "Face length",
        "unit": "mm",
        "defaultValue": 400
      },
      {
        "key": "h",
        "label": "Face height",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "mm",
        "defaultValue": 200
      },
      {
        "key": "m",
        "label": "Mortar per sqm",
        "unit": "cum",
        "defaultValue": 0.025
      },
      {
        "key": "r",
        "label": "Mortar 1:r",
        "unit": "—",
        "defaultValue": 6
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "MASON-05",
    "name": "Deduction rules for openings (measurement)",
    "categoryKey": "MASON",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 1200 Pt.3 & Pt.12",
    "unit": "sqm",
    "example": "Masonry & plaster: deduct full area of openings exceeding 0.10 sqm\nOpenings ≤ 0.50 sqm — no deduction for plaster (jambs & soffits not measured either)\nEnds of beams, lintels, posts up to 0.10 sqm — not deducted\nFor painting: deduct openings, then add back the framed area by a factor (panelled door ×1.30 both sides)",
    "workedExample": "Wall 30 sqm with 2 windows of 1.5 × 1.2 m and 1 door of 0.9 × 2.1 m\nDeduction = 2(1.80) + 1.89 = 5.49 sqm\nNet masonry area = 30 − 5.49 = 24.51 sqm",
    "note": "Contractors bill gross wall area and clients pay for windows as if they were brick. On a 2,400 sqft house with 14 openings this is typically 30–40 sqm of phantom masonry and plaster on both sides — roughly ₹35,000–₹50,000 at Chennai rates.",
    "tags": [
      "deduction",
      "openings",
      "is 1200",
      "measurement",
      "billing"
    ],
    "variables": [
      {
        "key": "A_o",
        "label": "Opening area",
        "unit": "sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Gross wall area",
        "unit": "sqm",
        "defaultValue": 30
      },
      {
        "key": "n1",
        "label": "Windows",
        "unit": "nos",
        "defaultValue": 2
      },
      {
        "key": "w1",
        "label": "Window W",
        "unit": "m",
        "defaultValue": 1.5
      },
      {
        "key": "h1",
        "label": "Window H",
        "unit": "m",
        "defaultValue": 1.2
      },
      {
        "key": "n2",
        "label": "Doors",
        "unit": "nos",
        "defaultValue": 1
      },
      {
        "key": "w2",
        "label": "Door W",
        "unit": "m",
        "defaultValue": 0.9
      },
      {
        "key": "h2",
        "label": "Door H",
        "unit": "m",
        "defaultValue": 2.1
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "MASON-06",
    "name": "Brick soaking and pre-laying checks",
    "categoryKey": "MASON",
    "type": "Quality",
    "confidence": "Likely",
    "reference": "IS 2212:1991 · IS 3495",
    "unit": "hours",
    "example": "Soak bricks in water for 6 – 12 hours before laying (until bubbles stop)\nWater absorption limit: common burnt clay ≤ 20% by weight (IS 1077)\nMinimum compressive strength: Class 3.5 → 3.5 N/sqmm\nEfflorescence: not more than \"moderate\" (IS 3495 Pt.3)",
    "workedExample": "Absorption test: dry brick 3.10 kg, after 24 h immersion 3.68 kg\nAbsorption = (3.68 − 3.10)/3.10 × 100 = 18.7% ✓ (within 20%)",
    "note": "Unsoaked bricks suck water out of the mortar, and the joint never gains strength — this is the root cause of most plaster cracks along mortar lines. It costs nothing to fix and is almost never done properly.",
    "tags": [
      "brick",
      "soaking",
      "absorption",
      "quality",
      "is 3495"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Pre-laying quality gates",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "d",
        "label": "Dry weight",
        "unit": "kg",
        "defaultValue": 3.1
      },
      {
        "key": "w",
        "label": "Wet weight (24h)",
        "unit": "kg",
        "defaultValue": 3.68
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PLAST-01",
    "name": "Plastering — cement and sand (master)",
    "categoryKey": "PLAST",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1661:1972 · IS 1200 Pt.12",
    "unit": "bags · cft",
    "example": "Dry mortar = Area × Thickness × Factor\nFactor = 1.33 (dry volume) × 1.0–1.2 (uneven surface & joints) → use 1.35 default\nCement = Dry mortar × 1/(1+r) ÷ 0.0347   bags\nSand   = Dry mortar × r/(1+r) × 35.3147  cft",
    "workedExample": "Internal plaster 12 mm, 1:4, area 320 sqm\nDry = 320 × 0.012 × 1.35 = 5.184 cum\nCement = 5.184 × 1/5 ÷ 0.0347 = 29.88 → 30 bags\nSand = 5.184 × 4/5 × 35.3147 = 146.4 cft\nCheck: 30 ÷ 320 = 0.094 bags/sqm ✓ (1 bag ≈ 10.7 sqm)\n\nWith 10% wastage (the calculator default): 33 bags, 161 cft sand, 9.7 sqm per bag",
    "note": "Quick field check — 12 mm internal plaster in 1:4 covers about 10–11 sqm per cement bag. If the site is consuming a bag per 7–8 sqm, either the thickness has crept up or cement is walking off site.",
    "tags": [
      "plaster",
      "mortar",
      "cement",
      "sand",
      "internal",
      "external"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Plaster area",
        "unit": "sqm"
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "m"
      },
      {
        "key": "r",
        "label": "Mix 1:r",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Plaster area",
        "unit": "sqm",
        "defaultValue": 320
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "mm",
        "defaultValue": 12
      },
      {
        "key": "r",
        "label": "Mix 1:r",
        "unit": "—",
        "defaultValue": 4
      },
      {
        "key": "f",
        "label": "Dry factor",
        "unit": "—",
        "defaultValue": 1.35
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": "plastering"
  },
  {
    "formulaCode": "PLAST-02",
    "name": "Standard plaster thickness and mix by surface",
    "categoryKey": "PLAST",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 1661:1972",
    "unit": "mm : ratio",
    "example": "Internal wall (single coat)   : 12 mm · 1:4 or 1:5\nExternal wall (single coat)   : 15 mm · 1:4 (coastal) or 1:6\nExternal two-coat             : 12 mm base (1:5) + 8 mm finish (1:4) = 20 mm\nCeiling / soffit               : 6 mm · 1:3\nRCC surface (smooth shuttering): 6–10 mm · 1:3 with bonding agent\nRough / backing coat behind tiles: 12 mm · 1:4",
    "workedExample": "For 2,400 sqft G+2, plaster quantities typically split:\nInternal 12 mm ≈ 62% · External 15 mm ≈ 28% · Ceiling 6 mm ≈ 10%",
    "note": "Ceiling plaster in 1:3 at 6 mm is often skipped in favour of direct putty on a smooth slab soffit. That works only if the shuttering was plywood and the soffit is truly level — otherwise the putty cracks within 18 months.",
    "tags": [
      "plaster",
      "thickness",
      "mix ratio",
      "ceiling",
      "external"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Standard practice",
        "unit": "—"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PLAST-03",
    "name": "Total plaster area for a building",
    "categoryKey": "PLAST",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Derived / trade practice",
    "unit": "sqm",
    "example": "Internal plaster area ≈ 2 × (internal wall area) − openings\nExternal plaster area  = External wall perimeter × height − openings\nCeiling plaster        = Floor area per floor × number of floors\n\nThumb rule: total plaster area ≈ 3.0 to 3.5 × built-up area",
    "workedExample": "2,400 sqft built-up × 3.2 = 7,680 sqft = 713.5 sqm of plaster\nCement at 0.094 bags/sqm ≈ 67 bags for internal-equivalent plaster",
    "note": "[Verify against your own completed projects] The 3.0–3.5 multiplier depends entirely on the internal partition density. A villa with large open rooms sits near 2.8; a compact G+2 with many bedrooms can exceed 3.8. This is exactly the coefficient worth calibrating from your last three sites.",
    "tags": [
      "plaster",
      "thumb rule",
      "area",
      "estimating"
    ],
    "variables": [
      {
        "key": "A_bu",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "Multiplier",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "Multiplier",
        "unit": "—",
        "defaultValue": 3.2
      },
      {
        "key": "t",
        "label": "Avg thickness",
        "unit": "mm",
        "defaultValue": 12
      },
      {
        "key": "r",
        "label": "Mix 1:r",
        "unit": "—",
        "defaultValue": 4
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PLAST-04",
    "name": "Wall putty and cement punning",
    "categoryKey": "PLAST",
    "type": "Material",
    "confidence": "Likely",
    "reference": "Manufacturer data",
    "unit": "kg",
    "example": "Wall putty coverage ≈ 12 – 14 sqft per kg for 2 coats (≈ 1.2 sqm/kg)\nPutty (kg) = Area(sqft) ÷ 13\nOne 40 kg bag covers ≈ 480 – 560 sqft, 2 coats\nCement punning (neat cement slurry) ≈ 0.5 kg/sqm",
    "workedExample": "Internal wall + ceiling area 6,200 sqft\nPutty = 6,200 ÷ 13 = 477 kg = 12 bags of 40 kg\nAt ₹800 per 40 kg bag = ₹9,600",
    "note": "[Verify with the brand datasheet] Coverage drops sharply on rough plaster — a badly finished 12 mm plaster can push consumption to 9–10 sqft/kg, adding 30% to the putty bill. Good plastering pays for itself twice: once in putty, once in paint.",
    "tags": [
      "putty",
      "punning",
      "finish",
      "coverage"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Putty area",
        "unit": "sqft"
      },
      {
        "key": "c",
        "label": "Coverage",
        "unit": "sqft/kg"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Area",
        "unit": "sqft",
        "defaultValue": 6200
      },
      {
        "key": "c",
        "label": "Coverage",
        "unit": "sqft/kg",
        "defaultValue": 13
      },
      {
        "key": "r",
        "label": "Rate per 40 kg bag",
        "unit": "INR",
        "defaultValue": 800
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-01",
    "name": "Bar bending schedule — cutting length and weight",
    "categoryKey": "STEEL",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 2502:1963 · IS 1786",
    "unit": "kg",
    "example": "Cutting length = Clear span − 2×cover + 2×(bend/hook allowance) − bend deductions\nTotal length     = Cutting length × Number of bars\nWeight (kg)      = Total length(m) × d² ÷ 162\n\nBend deduction: 45° → 1d · 90° → 2d · 135° hook → 3d\nHook allowance : 9d to 12d per hook (minimum 75 mm)",
    "workedExample": "Beam bottom steel: 4 nos 16 mm, clear span 4.2 m, cover 25 mm, 2 hooks of 9d\nCutting length = 4.20 − 0.05 + 2(0.144) = 4.438 m\nTotal = 4.438 × 4 = 17.75 m\nWeight = 17.75 × 1.58 = 28.05 kg",
    "note": "The BBS is where estimate and reality diverge most. A 4.5 kg/sqft thumb rule can be 20% off; a BBS from the actual drawing is within 3%. Build BBS into CivilMind before Phase 2 — it is the module that pays for itself first.",
    "tags": [
      "bbs",
      "steel",
      "cutting length",
      "rebar",
      "weight"
    ],
    "variables": [
      {
        "key": "d",
        "label": "Bar diameter",
        "unit": "mm"
      },
      {
        "key": "n",
        "label": "Number of bars",
        "unit": "nos"
      },
      {
        "key": "L",
        "label": "Cutting length",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "d",
        "label": "Bar dia",
        "unit": "mm",
        "defaultValue": null
      },
      {
        "key": "L",
        "label": "Clear span",
        "unit": "m",
        "defaultValue": 4.2
      },
      {
        "key": "c",
        "label": "Cover (each end)",
        "unit": "mm",
        "defaultValue": 25
      },
      {
        "key": "hk",
        "label": "Hook allowance",
        "unit": "× d",
        "defaultValue": 9
      },
      {
        "key": "n",
        "label": "No. of bars",
        "unit": "nos",
        "defaultValue": 4
      }
    ],
    "costCalculatorCategoryKey": "steel"
  },
  {
    "formulaCode": "STEEL-02",
    "name": "Steel percentage by member and tonnage estimate",
    "categoryKey": "STEEL",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "IS 456:2000 cl.26.5",
    "unit": "kg / %",
    "example": "Steel (kg) = Concrete volume(cum) × (p/100) × 7850\n\nTypical p by member:\nFooting 0.50 – 0.80% · Plinth beam 1.00 – 1.50% · Column 1.00 – 2.50%\nBeam 1.50 – 2.00% · Slab (one-way) 0.70 – 1.00% · Slab (two-way) 0.80 – 1.10%\nStaircase 1.00 – 1.50% · Retaining wall 0.80 – 1.20%\n\nIS 456 limits: slab min 0.12% (Fe500) · column 0.8% min, 6% max · beam tension min 0.205% (Fe500)",
    "workedExample": "Total RCC 96 cum on a G+2, weighted average 1.3%\nSteel = 96 × 0.013 × 7850 = 9,796 kg ≈ 9.8 MT\nAt ₹62,000/MT ≈ ₹6.08 lakh",
    "note": "[Verify] These bands are for budgeting a tender, never for procurement. Order steel against the BBS, in two or three tranches — steel prices move weekly and holding 10 MT on an open site is both a cash-flow and a theft risk.",
    "tags": [
      "steel",
      "percentage",
      "tonnage",
      "estimating",
      "rcc"
    ],
    "variables": [
      {
        "key": "V",
        "label": "Concrete volume",
        "unit": "cum"
      },
      {
        "key": "p",
        "label": "Steel percentage",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "V",
        "label": "Concrete volume",
        "unit": "cum",
        "defaultValue": 96
      },
      {
        "key": "p",
        "label": "Avg steel %",
        "unit": "%",
        "defaultValue": 1.3
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/MT",
        "defaultValue": 62000
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 4
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-03",
    "name": "Development length and lap length",
    "categoryKey": "STEEL",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.26.2.1",
    "unit": "× d",
    "example": "L_d = (φ × 0.87 f_y) ÷ (4 × τ_bd)\nτ_bd (plain bars): M20 1.2 · M25 1.4 · M30 1.5 · M35 1.7 · M40 1.9 N/sqmm\nDeformed bars: τ_bd × 1.60 · Compression: τ_bd × 1.25\n\nLap length (tension)     = L_d, minimum 30d\nLap length (compression) = L_d in compression, minimum 24d",
    "workedExample": "Fe500 bar, 16 mm, M25 concrete, tension, deformed\nτ_bd = 1.4 × 1.6 = 2.24 N/sqmm\nL_d = (16 × 0.87 × 500) ÷ (4 × 2.24) = 6,960 ÷ 8.96 = 776.8 mm ≈ 48.5d → adopt 780 mm",
    "note": "Common site shortcuts: 50d for tension lap, 40d for compression. For Fe500 in M20 the true figure is about 57d — a 50d lap there is short. Stagger laps so that no more than 50% of bars are lapped at one section, and never lap at the point of maximum bending moment.",
    "tags": [
      "development length",
      "lap length",
      "bond",
      "is 456",
      "fe500"
    ],
    "variables": [
      {
        "key": "φ",
        "label": "Bar diameter",
        "unit": "mm"
      },
      {
        "key": "f_y",
        "label": "Steel yield strength",
        "unit": "N/sqmm"
      },
      {
        "key": "τ_bd",
        "label": "Design bond stress",
        "unit": "N/sqmm"
      }
    ],
    "calcInputs": [
      {
        "key": "d",
        "label": "Bar dia",
        "unit": "mm",
        "defaultValue": 16
      },
      {
        "key": "fy",
        "label": "Steel grade fy",
        "unit": "N/sqmm",
        "defaultValue": null
      },
      {
        "key": "g",
        "label": "Concrete grade",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "m",
        "label": "Condition",
        "unit": null,
        "defaultValue": null
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-04",
    "name": "Nominal clear cover to reinforcement",
    "categoryKey": "STEEL",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.26.4.2 & Table 16",
    "unit": "mm",
    "example": "Footing (cast against earth) : 50 mm\nColumn                       : 40 mm (25 mm if ≤ 12 mm bars and ≤ 200 mm section)\nBeam                         : 25 mm\nSlab                         : 20 mm (15 mm for ≤ 12 mm bars, mild exposure)\nStaircase / walls            : 20 mm\n\nExposure adjustment: moderate +5 mm · severe +15 mm · very severe +25 mm",
    "workedExample": "Sholinganallur (coastal, severe exposure) beam\nBase cover 25 + 15 = 40 mm, and minimum grade rises to M30",
    "note": "Cover blocks must be cement-mortar or PVC of the stated thickness — not stone chips, not broken tile. Nearly every early corrosion case in Chennai coastal projects traces back to cover, not to steel quality.",
    "tags": [
      "cover",
      "durability",
      "is 456",
      "corrosion",
      "coastal"
    ],
    "variables": [
      {
        "key": "c",
        "label": "Nominal cover",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Base cover",
        "unit": "mm",
        "defaultValue": 25
      },
      {
        "key": "e",
        "label": "Exposure",
        "unit": null,
        "defaultValue": null
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-05",
    "name": "Stirrup cutting length and count",
    "categoryKey": "STEEL",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 2502:1963",
    "unit": "nos · kg",
    "example": "A = beam width − 2×cover\nB = beam depth − 2×cover\nCutting length = 2(A + B) + 2×hook − bend deductions\n  bend deductions = 3 × 2d (90° corners) + 2 × 3d (135° hooks) = 12d\nNumber of stirrups = ⌊Clear span ÷ spacing⌋ + 1",
    "workedExample": "Beam 230 × 450, cover 25, stirrup 8 mm, spacing 150 mm, span 4.2 m\nA = 230 − 50 = 180 mm · B = 450 − 50 = 400 mm\nCL = 2(180 + 400) + 2(9×8) − 12(8) = 1,160 + 144 − 96 = 1,208 mm\nCount = 4200/150 + 1 = 29 nos\nWeight = 29 × 1.208 × 0.395 = 13.84 kg",
    "note": "[Likely] Two conventions exist on site: the \"2(A+B) + 24d\" shortcut (no deductions) and the detailed version above. The shortcut over-estimates by roughly 3–5% per stirrup. Pick one convention for the whole project — mixing them makes BBS reconciliation impossible.",
    "tags": [
      "stirrup",
      "bbs",
      "cutting length",
      "beam",
      "shear"
    ],
    "variables": [
      {
        "key": "A,B",
        "label": "Stirrup inner dimensions",
        "unit": "mm"
      },
      {
        "key": "d",
        "label": "Stirrup bar dia",
        "unit": "mm"
      },
      {
        "key": "s",
        "label": "Spacing",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Beam width",
        "unit": "mm",
        "defaultValue": 230
      },
      {
        "key": "D",
        "label": "Beam depth",
        "unit": "mm",
        "defaultValue": 450
      },
      {
        "key": "c",
        "label": "Cover",
        "unit": "mm",
        "defaultValue": 25
      },
      {
        "key": "d",
        "label": "Stirrup dia",
        "unit": "mm",
        "defaultValue": 8
      },
      {
        "key": "hk",
        "label": "Hook",
        "unit": "× d",
        "defaultValue": 9
      },
      {
        "key": "s",
        "label": "Spacing",
        "unit": "mm",
        "defaultValue": 150
      },
      {
        "key": "L",
        "label": "Clear span",
        "unit": "m",
        "defaultValue": 4.2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-06",
    "name": "Slab reinforcement — bar count and spacing",
    "categoryKey": "STEEL",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.26.3.3 & 26.5.2",
    "unit": "nos · mm",
    "example": "Number of bars = ⌊(Span ⊥ to bars − 2×cover) ÷ spacing⌋ + 1\nSpacing limit: main steel ≤ 3d or 300 mm, whichever is less\n               distribution steel ≤ 5d or 450 mm\nMinimum steel: 0.12% of gross area (Fe500) · 0.15% (Fe415)\nA_st provided = n × (π/4)d²",
    "workedExample": "Slab 4.0 × 5.0 m, 125 mm thick, 10 mm bars @150 c/c main\nBars = (5000 − 40)/150 + 1 = 34 nos\nLength each = 4.0 + 2 bends ≈ 4.30 m → 146.2 m\nWeight = 146.2 × 0.617 = 90.2 kg\nMin steel check: 0.0012 × 1000 × 125 = 150 sqmm/m; provided = 523 sqmm/m ✓",
    "note": "Distribution bars are the ones site teams thin out to \"save steel\". They control shrinkage cracking across the slab — the cost saved is about ₹4,000 on a typical floor, and the crack repair costs ten times that.",
    "tags": [
      "slab",
      "reinforcement",
      "spacing",
      "distribution steel",
      "is 456"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Slab dimension",
        "unit": "m"
      },
      {
        "key": "s",
        "label": "Bar spacing",
        "unit": "mm"
      },
      {
        "key": "d",
        "label": "Bar dia",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "Lx",
        "label": "Short span",
        "unit": "m",
        "defaultValue": 4
      },
      {
        "key": "Ly",
        "label": "Long span",
        "unit": "m",
        "defaultValue": 5
      },
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "d",
        "label": "Main bar dia",
        "unit": "mm",
        "defaultValue": 10
      },
      {
        "key": "s",
        "label": "Spacing",
        "unit": "mm",
        "defaultValue": 150
      },
      {
        "key": "c",
        "label": "Cover",
        "unit": "mm",
        "defaultValue": 20
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-07",
    "name": "Binding wire, cover blocks and chairs",
    "categoryKey": "STEEL",
    "type": "Material",
    "confidence": "Likely",
    "reference": "Trade practice",
    "unit": "kg · nos",
    "example": "Binding wire = 9 to 13 kg per MT of steel (use 10 kg/MT)\nCover blocks  = 4 to 6 nos per sqm of slab · 4 per running metre of beam\nChair bars    = 1 per sqm of slab (two-layer slabs), 0.5–1.0 kg each\n  Chair length = 2×(chair height) + 2×(300 mm legs) + top width",
    "workedExample": "9.8 MT steel, slab area 195 sqm (two floors)\nBinding wire = 9.8 × 10 = 98 kg\nCover blocks = 195 × 5 = 975 nos\nChairs = 195 nos × 0.8 kg = 156 kg of extra steel",
    "note": "Chairs are almost never in the estimate and always on the site. 156 kg of chair steel is ₹9,700 that shows up as a \"variation\" — put it in the BOQ from day one.",
    "tags": [
      "binding wire",
      "chairs",
      "cover blocks",
      "consumables"
    ],
    "variables": [
      {
        "key": "W",
        "label": "Steel tonnage",
        "unit": "MT"
      },
      {
        "key": "A",
        "label": "Slab area",
        "unit": "sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "W",
        "label": "Steel tonnage",
        "unit": "MT",
        "defaultValue": 9.8
      },
      {
        "key": "A",
        "label": "Slab area",
        "unit": "sqm",
        "defaultValue": 195
      },
      {
        "key": "bw",
        "label": "Binding wire rate",
        "unit": "kg/MT",
        "defaultValue": 10
      },
      {
        "key": "ch",
        "label": "Chair weight",
        "unit": "kg each",
        "defaultValue": 0.8
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "STEEL-08",
    "name": "Steel per sqft — whole building thumb rule",
    "categoryKey": "STEEL",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice / BN Datta",
    "unit": "kg/sqft",
    "example": "Steel (kg) = Built-up area(sqft) × rate\n\nRate by building type:\nLoad-bearing with RCC slab : 2.0 – 2.5 kg/sqft\nRCC framed, G to G+2       : 3.5 – 4.5 kg/sqft\nCommercial / G+3 and above : 4.5 – 5.5 kg/sqft\nHigh-rise (>G+7)           : 5.5 – 7.0 kg/sqft",
    "workedExample": "2,400 sqft residential G+2 at 4.5 kg/sqft\nSteel = 2400 × 4.5 = 10,800 kg = 10.8 MT\nCompare with BBS-derived 9.8 MT → thumb rule is 10% high, which is the right direction for a budget.",
    "note": "[Verify — calibrate this first] This single coefficient moves the budget by lakhs. Take your three completed Vertical Living projects, divide actual steel invoiced by built-up sqft, and replace 4.5 with your own number. That is a 30-minute job with permanent payoff.",
    "tags": [
      "steel",
      "thumb rule",
      "per sqft",
      "estimating",
      "calibrate"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "Steel rate",
        "unit": "kg/sqft"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "Steel rate",
        "unit": "kg/sqft",
        "defaultValue": 4.5
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/MT",
        "defaultValue": 62000
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FORM-01",
    "name": "Shuttering area by member",
    "categoryKey": "FORM",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.5 · IS 14687",
    "unit": "sqm",
    "example": "Column  = Perimeter × Height = 2(b + D) × H\nBeam    = 2 × (depth − slab thk) × L + (width × L)     [two sides + soffit]\nSlab    = Plan area (soffit) + edge band\nFooting = 2(L + B) × D\nStaircase = waist soffit + riser boards + side",
    "workedExample": "14 columns 230×450, height 2.55 m\nArea = 2(0.23 + 0.45) × 2.55 × 14 = 1.36 × 2.55 × 14 = 48.55 sqm\nBeams 230×450 with 125 slab, 58 m run: 2(0.325)(58) + 0.23(58) = 37.7 + 13.3 = 51.0 sqm",
    "note": "Formwork is measured on the contact area only. A contractor billing \"column shuttering\" on plan area instead of perimeter area is over-billing by a factor of 3 or more.",
    "tags": [
      "shuttering",
      "formwork",
      "contact area",
      "measurement"
    ],
    "variables": [
      {
        "key": "b,D",
        "label": "Member section",
        "unit": "m"
      },
      {
        "key": "H,L",
        "label": "Height / length",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Column width",
        "unit": "m",
        "defaultValue": 0.23
      },
      {
        "key": "D",
        "label": "Column depth",
        "unit": "m",
        "defaultValue": 0.45
      },
      {
        "key": "H",
        "label": "Height",
        "unit": "m",
        "defaultValue": 2.55
      },
      {
        "key": "N",
        "label": "Nos",
        "unit": "nos",
        "defaultValue": 14
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FORM-02",
    "name": "Formwork quantity thumb rule per cum of concrete",
    "categoryKey": "FORM",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "sqm/cum",
    "example": "Formwork area ≈ 6 sqm per cum of RCC (whole building average)\n\nBy member: Slab 8 – 10 · Beam 10 – 12 · Column 12 – 16 · Footing 2 – 3 sqm/cum\nPly consumption: 1 sheet (8×4 ft = 2.97 sqm) reused 6 – 10 times",
    "workedExample": "96 cum RCC × 6 = 576 sqm of shuttering contact area\nPly sheets = 576 ÷ 2.97 ÷ 8 reuses = 24.2 → 25 sheets\nProps at 1 per 1.2 sqm of slab soffit",
    "note": "[Verify] The factor is higher for column-heavy buildings and lower for slab-heavy ones. Where a contractor supplies shuttering in his rate, this matters only for programme; where you buy the ply, it is a direct cost.",
    "tags": [
      "formwork",
      "thumb rule",
      "plywood",
      "props",
      "reuse"
    ],
    "variables": [
      {
        "key": "V",
        "label": "Concrete volume",
        "unit": "cum"
      },
      {
        "key": "k",
        "label": "Formwork factor",
        "unit": "sqm/cum"
      }
    ],
    "calcInputs": [
      {
        "key": "V",
        "label": "RCC volume",
        "unit": "cum",
        "defaultValue": 96
      },
      {
        "key": "k",
        "label": "Factor",
        "unit": "sqm/cum",
        "defaultValue": 6
      },
      {
        "key": "re",
        "label": "Ply reuses",
        "unit": "nos",
        "defaultValue": 8
      },
      {
        "key": "pr",
        "label": "Ply rate",
        "unit": "INR/sheet",
        "defaultValue": 1450
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FORM-03",
    "name": "Formwork striking (deshuttering) periods",
    "categoryKey": "FORM",
    "type": "Time",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.11.3 Table",
    "unit": "days",
    "example": "Vertical formwork — columns, walls, beam sides : 16 – 24 hours\nSoffit formwork to slabs (props left under)    : 3 days\nSoffit formwork to beams (props left under)    : 7 days\nProps to slabs — span ≤ 4.5 m                   : 7 days\nProps to slabs — span > 4.5 m                   : 14 days\nProps to beams & arches — span ≤ 6 m            : 14 days\nProps to beams & arches — span > 6 m            : 21 days",
    "workedExample": "Slab of 4.2 m span, OPC 53, ambient 32 °C\nSide forms off at 24 h · slab soffit ply at day 3 · props stay until day 7\nWith PPC or fly-ash cement, add 3 – 4 days to every prop figure.",
    "note": "[Likely — confirm against a current copy of IS 456 Table 11] Early prop removal is the single most common cause of permanent slab deflection in fast-track residential work. It is invisible for two years, then the false ceiling line gives it away.",
    "tags": [
      "deshuttering",
      "striking",
      "formwork",
      "is 456",
      "curing",
      "time"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Span",
        "unit": "m"
      },
      {
        "key": "t",
        "label": "Striking time",
        "unit": "days"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Span",
        "unit": "m",
        "defaultValue": 4.2
      },
      {
        "key": "m",
        "label": "Member",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "c",
        "label": "Cement",
        "unit": null,
        "defaultValue": null
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FORM-04",
    "name": "Shuttering oil / release agent",
    "categoryKey": "FORM",
    "type": "Material",
    "confidence": "Verify",
    "reference": "Manufacturer data",
    "unit": "litres",
    "example": "Coverage ≈ 25 – 35 sqm per litre per application\nQuantity = Total shuttering area(sqm) ÷ 30",
    "workedExample": "576 sqm shuttering ÷ 30 = 19.2 litres per full cycle\nAcross 3 floors with reuse ≈ 58 litres total",
    "note": "[Verify] Used engine oil is still common on Chennai sites — it stains concrete permanently and interferes with plaster bonding. Proper release agent costs about ₹110/litre; on a full house that is under ₹7,000.",
    "tags": [
      "shuttering oil",
      "release agent",
      "formwork"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Shuttering area",
        "unit": "sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Shuttering area",
        "unit": "sqm",
        "defaultValue": 576
      },
      {
        "key": "c",
        "label": "Coverage",
        "unit": "sqm/litre",
        "defaultValue": 30
      },
      {
        "key": "n",
        "label": "Applications",
        "unit": "nos",
        "defaultValue": 3
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/litre",
        "defaultValue": 110
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FLOOR-01",
    "name": "Tile quantity with wastage and box rounding",
    "categoryKey": "FLOOR",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1237:1980 · IS 15622",
    "unit": "nos · boxes",
    "example": "Tiles = ⌈Area ÷ (tile length × tile width)⌉ × (1 + wastage)\nBoxes = ⌈Tiles ÷ tiles per box⌉\n\nWastage: straight layout 5% · diagonal layout 10 – 15% · small rooms / many cuts 12%",
    "workedExample": "Living area 46.5 sqm, tile 600 × 600 mm (0.36 sqm), wastage 7%\nTiles = 46.5 ÷ 0.36 = 129.2 → 130 × 1.07 = 139.1 → 140 nos\nBoxes (4 tiles/box) = 140 ÷ 4 = 35 boxes\nAlways add 1 extra box for future replacement — same batch, same shade.",
    "note": "Buy the full quantity in one dye-lot. A second purchase three months later will not match, and a single mismatched tile in a hall is a visible defect the client will remember longer than anything else you did well.",
    "tags": [
      "tiles",
      "flooring",
      "wastage",
      "boxes",
      "vitrified"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Floor area",
        "unit": "sqm"
      },
      {
        "key": "l,b",
        "label": "Tile size",
        "unit": "m"
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Floor area",
        "unit": "sqm",
        "defaultValue": 46.5
      },
      {
        "key": "l",
        "label": "Tile length",
        "unit": "mm",
        "defaultValue": 600
      },
      {
        "key": "b",
        "label": "Tile width",
        "unit": "mm",
        "defaultValue": 600
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 7
      },
      {
        "key": "pb",
        "label": "Tiles per box",
        "unit": "nos",
        "defaultValue": 4
      },
      {
        "key": "r",
        "label": "Rate per box",
        "unit": "INR",
        "defaultValue": 640
      }
    ],
    "costCalculatorCategoryKey": "flooring"
  },
  {
    "formulaCode": "FLOOR-02",
    "name": "Tile bedding mortar, adhesive and grout",
    "categoryKey": "FLOOR",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 1443:2002",
    "unit": "bags · kg",
    "example": "Bedding mortar (1:4), 20 – 25 mm bed:\n  Dry mortar = Area × 0.025 × 1.35\n  Cement = Dry ÷ 5 ÷ 0.0347 ≈ 0.195 bags/sqm\n  Plus neat cement slurry 3.5 kg/sqm\nTile adhesive (thin-bed 3–5 mm): 4 – 6 kg/sqm; 1 bag of 20 kg covers 4 – 5 sqm\nGrout: 0.3 – 0.5 kg/sqm for 2 mm joints on 600×600",
    "workedExample": "Area 46.5 sqm, 25 mm bed 1:4\nDry mortar = 46.5 × 0.025 × 1.35 = 1.569 cum\nCement = 1.569 ÷ 5 ÷ 0.0347 = 9.04 bags\nSlurry = 46.5 × 3.5 = 163 kg = 3.3 bags\nTotal ≈ 13 bags → 0.28 bags/sqm ✓ (matches BOQ Engine F06)",
    "note": "[Likely] Your spec F06 value of 0.28 bags/sqm reconciles correctly with bedding plus slurry. Adhesive-fixed tiles cost more per sqm in material but save 20 mm of dead load per floor and roughly 30% of the mason time.",
    "tags": [
      "tile",
      "bedding",
      "adhesive",
      "grout",
      "cement"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Tiling area",
        "unit": "sqm"
      },
      {
        "key": "t",
        "label": "Bed thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Tiling area",
        "unit": "sqm",
        "defaultValue": 46.5
      },
      {
        "key": "t",
        "label": "Bed thickness",
        "unit": "mm",
        "defaultValue": 25
      },
      {
        "key": "r",
        "label": "Mix 1:r",
        "unit": "—",
        "defaultValue": 4
      },
      {
        "key": "sl",
        "label": "Slurry",
        "unit": "kg/sqm",
        "defaultValue": 3.5
      },
      {
        "key": "g",
        "label": "Grout",
        "unit": "kg/sqm",
        "defaultValue": 0.4
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FLOOR-03",
    "name": "Skirting and dado area",
    "categoryKey": "FLOOR",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 1200 Pt.11",
    "unit": "rmt · sqm",
    "example": "Skirting length = Room perimeter − door openings\nSkirting area   = Length × height (100 mm standard)\nDado / wall tiling area = Perimeter × dado height − openings\nTiles for skirting = ⌈Length ÷ tile length⌉ × strips per tile",
    "workedExample": "Room 4.0 × 5.0 m → perimeter 18 m, minus 2 doors of 0.9 m = 16.2 m\nSkirting at 100 mm = 1.62 sqm\nFrom 600 mm tiles cut into 6 strips: 16.2 ÷ 0.6 = 27 strips = 4.5 tiles → 5 tiles",
    "note": "Skirting is cut from the same floor tile, so it must be included in the floor tile order, not treated as a separate purchase. Forgetting it is why sites run 3–4 boxes short at the end.",
    "tags": [
      "skirting",
      "dado",
      "perimeter",
      "tiles"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Room perimeter",
        "unit": "m"
      },
      {
        "key": "h",
        "label": "Skirting height",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Room length",
        "unit": "m",
        "defaultValue": 4
      },
      {
        "key": "B",
        "label": "Room width",
        "unit": "m",
        "defaultValue": 5
      },
      {
        "key": "dr",
        "label": "Door openings total",
        "unit": "m",
        "defaultValue": 1.8
      },
      {
        "key": "h",
        "label": "Skirting height",
        "unit": "mm",
        "defaultValue": 100
      },
      {
        "key": "tl",
        "label": "Tile length",
        "unit": "mm",
        "defaultValue": 600
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FLOOR-04",
    "name": "Bathroom and kitchen wall tiling",
    "categoryKey": "FLOOR",
    "type": "Material",
    "confidence": "Certain",
    "reference": "IS 15622:2017",
    "unit": "sqm",
    "example": "Wall tile area = (Room perimeter × dado height) − openings\nBathroom dado: full height 2.1 m (or 7 ft) standard\nKitchen dado : 0.6 m above counter (counter at 0.85 m) → 0.85 to 2.1 m\nFloor tiles: anti-skid, minimum slope 1:80 towards trap",
    "workedExample": "Bathroom 1.8 × 2.4 m → perimeter 8.4 m, dado 2.1 m\nGross = 8.4 × 2.1 = 17.64 sqm\nLess door 0.75 × 2.1 = 1.58, window 0.6 × 0.6 = 0.36\nNet = 15.70 sqm + 10% wastage = 17.3 sqm",
    "note": "Wall tiling wastage runs 10–12%, not 5% — bathrooms are small, full of cuts around plumbing points and niches. Budget the higher figure or you will be short.",
    "tags": [
      "bathroom",
      "kitchen",
      "dado",
      "wall tile",
      "wastage"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Perimeter",
        "unit": "m"
      },
      {
        "key": "H",
        "label": "Dado height",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Room length",
        "unit": "m",
        "defaultValue": 1.8
      },
      {
        "key": "B",
        "label": "Room width",
        "unit": "m",
        "defaultValue": 2.4
      },
      {
        "key": "H",
        "label": "Dado height",
        "unit": "m",
        "defaultValue": 2.1
      },
      {
        "key": "op",
        "label": "Openings",
        "unit": "sqm",
        "defaultValue": 1.94
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "WPF-01",
    "name": "Terrace brickbat coba",
    "categoryKey": "WPF",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2645:2003",
    "unit": "cum · bags",
    "example": "Average thickness = (thickness at drain + thickness at high point) ÷ 2\nSlope: minimum 1:100 towards outlets (1 cm fall per 1 m run)\nVolume = Area × Average thickness\nBrickbats ≈ 60% of volume · Mortar (1:4 with waterproofing compound) ≈ 40%\nCement ≈ 0.25 – 0.30 bags per sqm for 100 mm average",
    "workedExample": "Terrace 90 sqm, 75 mm at drain, 125 mm at ridge → average 100 mm\nVolume = 90 × 0.10 = 9.0 cum\nBrickbats = 5.4 cum · Mortar = 3.6 cum wet → dry 4.79 cum\nCement (1:4) = 4.79 ÷ 5 ÷ 0.0347 = 27.6 → 28 bags",
    "note": "[Verify] Coba adds roughly 200 kg/sqm of dead load — on a slab designed without it, that matters. Check the structural drawing before specifying coba on an existing building. The alternative, a liquid membrane system, adds under 5 kg/sqm.",
    "tags": [
      "waterproofing",
      "coba",
      "terrace",
      "brickbat",
      "slope"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Terrace area",
        "unit": "sqm"
      },
      {
        "key": "t_avg",
        "label": "Average coba thickness",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Terrace area",
        "unit": "sqm",
        "defaultValue": 90
      },
      {
        "key": "t1",
        "label": "Thickness at drain",
        "unit": "mm",
        "defaultValue": 75
      },
      {
        "key": "t2",
        "label": "Thickness at ridge",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "r",
        "label": "Mortar 1:r",
        "unit": "—",
        "defaultValue": 4
      }
    ],
    "costCalculatorCategoryKey": "waterproof"
  },
  {
    "formulaCode": "WPF-02",
    "name": "Liquid / cementitious membrane coating",
    "categoryKey": "WPF",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2645:2003 / product data",
    "unit": "kg",
    "example": "Quantity = Area × coverage rate × number of coats\nTypical: acrylic elastomeric 0.7 – 0.9 kg/sqm/coat, 2 coats → 1.4 – 1.8 kg/sqm\nCementitious (2-component) 1.5 kg/sqm/coat, 2 coats → 3.0 kg/sqm\nAdd 15% for corners, coving and upstands (300 mm turn-up at parapet)",
    "workedExample": "Terrace 90 sqm, acrylic at 0.875 kg/sqm/coat, 2 coats\nQuantity = 90 × 0.875 × 2 = 157.5 kg + 15% = 181 kg\nAt 20 kg pails = 10 pails",
    "note": "[Verify with the datasheet] Your spec F07 uses 1.75 kg/sqm for a 2-coat system, which matches the acrylic figure. Coverage is stated on smooth substrate — on rough coba it can rise 30%. Always specify a 300 mm turn-up onto the parapet; most leaks start at the junction, not the field.",
    "tags": [
      "waterproofing",
      "membrane",
      "coating",
      "acrylic",
      "coverage"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Area",
        "unit": "sqm"
      },
      {
        "key": "q",
        "label": "Coverage",
        "unit": "kg/sqm/coat"
      },
      {
        "key": "n",
        "label": "Coats",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Area",
        "unit": "sqm",
        "defaultValue": 90
      },
      {
        "key": "q",
        "label": "Coverage per coat",
        "unit": "kg/sqm",
        "defaultValue": 0.875
      },
      {
        "key": "n",
        "label": "Coats",
        "unit": "nos",
        "defaultValue": 2
      },
      {
        "key": "ex",
        "label": "Extra for corners",
        "unit": "%",
        "defaultValue": 15
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/kg",
        "defaultValue": 210
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "WPF-03",
    "name": "Sunken slab filling and bathroom waterproofing",
    "categoryKey": "WPF",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 2645 / NBC 2016",
    "unit": "cum · sqm",
    "example": "Sunken depth = 300 – 450 mm below finished floor level\nFill volume = Area × depth\nFill options: brickbat + mortar (2,000 kg/cum) · lightweight EPS/vermiculite concrete (600 – 900 kg/cum)\nWaterproofing area = Floor + 300 mm upstand on all walls\n  = (L × B) + 2(L + B) × 0.3",
    "workedExample": "Bathroom 1.8 × 2.4 m, sunk 350 mm\nFill = 1.8 × 2.4 × 0.35 = 1.512 cum\nWaterproofing area = 4.32 + 2(4.2)(0.3) = 4.32 + 2.52 = 6.84 sqm\nBrickbat fill dead load = 1.512 × 2000 = 3,024 kg on 4.32 sqm = 700 kg/sqm",
    "note": "700 kg/sqm from sunken filling is a serious concentrated load. Lightweight fill cuts that to about 250 kg/sqm for roughly ₹1,200 extra per bathroom — cheap insurance, and it also lets the plumber rework the trap later without breaking a solid mass.",
    "tags": [
      "sunken slab",
      "bathroom",
      "waterproofing",
      "filling",
      "dead load"
    ],
    "variables": [
      {
        "key": "L,B",
        "label": "Sunken area",
        "unit": "m"
      },
      {
        "key": "d",
        "label": "Sunken depth",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Length",
        "unit": "m",
        "defaultValue": 1.8
      },
      {
        "key": "B",
        "label": "Width",
        "unit": "m",
        "defaultValue": 2.4
      },
      {
        "key": "d",
        "label": "Sunken depth",
        "unit": "mm",
        "defaultValue": 350
      },
      {
        "key": "up",
        "label": "Upstand",
        "unit": "mm",
        "defaultValue": 300
      },
      {
        "key": "den",
        "label": "Fill density",
        "unit": "kg/cum",
        "defaultValue": 2000
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "WPF-04",
    "name": "Rainwater harvesting — recharge volume",
    "categoryKey": "WPF",
    "type": "Design",
    "confidence": "Likely",
    "reference": "TN Govt RWH rules · IS 15797",
    "unit": "litres",
    "example": "Harvestable volume (litres) = Roof area(sqm) × Rainfall(mm) × Runoff coefficient\nRunoff coefficient: RCC roof 0.85 · tiled roof 0.75 · paved area 0.70 · lawn 0.15\n\nChennai average annual rainfall ≈ 1,400 mm (NE monsoon dominant, Oct–Dec)\nRecharge pit: 1 pit of 1 m³ per 100 sqm of roof, minimum",
    "workedExample": "Roof 90 sqm, annual rainfall 1,400 mm, RCC roof C = 0.85\nVolume = 90 × 1400 × 0.85 = 107,100 litres per year ≈ 107 kl\nSingle heaviest-day event (say 100 mm): 90 × 100 × 0.85 = 7,650 litres in one day",
    "note": "Rainwater harvesting is mandatory for all buildings in Tamil Nadu and is checked at completion certificate stage. Size the sump for the single-event volume, not the annual total — the annual figure tells you the value, the daily figure tells you the size.",
    "tags": [
      "rainwater",
      "rwh",
      "chennai",
      "tamil nadu",
      "recharge",
      "statutory"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Roof area",
        "unit": "sqm"
      },
      {
        "key": "R",
        "label": "Rainfall",
        "unit": "mm"
      },
      {
        "key": "C",
        "label": "Runoff coefficient",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Roof area",
        "unit": "sqm",
        "defaultValue": 90
      },
      {
        "key": "R",
        "label": "Annual rainfall",
        "unit": "mm",
        "defaultValue": 1400
      },
      {
        "key": "C",
        "label": "Runoff coeff",
        "unit": "—",
        "defaultValue": 0.85
      },
      {
        "key": "ev",
        "label": "Heavy-day rainfall",
        "unit": "mm",
        "defaultValue": 100
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PAINT-01",
    "name": "Paintable area from built-up area",
    "categoryKey": "PAINT",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "IS 1200 Pt.13",
    "unit": "sqft",
    "example": "Internal paintable area ≈ 3.0 – 3.5 × built-up area  (walls both faces + ceiling)\nExternal paintable area  = External wall area − openings\n\nMeasurement add-backs for painting (IS 1200 Pt.13):\n  Panelled door  ×1.30 per face · Flush door ×1.00 · Grill / railing ×0.50 of elevation\n  Corrugated sheet ×1.14",
    "workedExample": "2,400 sqft built-up × 3.2 = 7,680 sqft internal paintable\nAt 2 coats emulsion (75 sqft/litre for 2 coats) = 102.4 litres\n= 6 buckets of 20 litres",
    "note": "[Verify] Same multiplier as plaster (PLAST-03) — calibrate both from the same completed project and the whole finishing estimate tightens at once.",
    "tags": [
      "paint",
      "area",
      "thumb rule",
      "estimating"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "Multiplier",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "Multiplier",
        "unit": "—",
        "defaultValue": 3.2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PAINT-02",
    "name": "Paint quantity by coverage",
    "categoryKey": "PAINT",
    "type": "Material",
    "confidence": "Verify",
    "reference": "Manufacturer data",
    "unit": "litres",
    "example": "Litres = Area(sqft) ÷ Coverage(sqft per litre for the full system)\n\nCoverage per litre, per coat:\n  Wall primer          120 – 140 sqft\n  Interior emulsion    140 – 160 sqft\n  Exterior emulsion     90 – 110 sqft\n  Enamel (wood/metal)  140 – 160 sqft\n  Cement primer (ext)  100 – 120 sqft\n\nFull system = 1 primer + 2 finish coats",
    "workedExample": "Internal 7,680 sqft: primer 1 coat at 130 = 59.1 l; emulsion 2 coats at 150 = 102.4 l\nTotal = 161.5 litres\nPutty (PLAST-04) = 7,680 ÷ 13 = 591 kg\nCost at ₹280/l emulsion + ₹150/l primer ≈ ₹37,540",
    "note": "[Verify with the brand datasheet] Manufacturer coverage is measured on a smooth puttied surface. On bare or rough plaster the first coat can consume 40% more. Your spec F08 figures (netArea/130 primer, /90 for 2-coat emulsion) sit in the right band.",
    "tags": [
      "paint",
      "coverage",
      "emulsion",
      "primer",
      "enamel",
      "litres"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Area",
        "unit": "sqft"
      },
      {
        "key": "c",
        "label": "Coverage",
        "unit": "sqft/litre/coat"
      },
      {
        "key": "n",
        "label": "Coats",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Area",
        "unit": "sqft",
        "defaultValue": 7680
      },
      {
        "key": "cp",
        "label": "Primer coverage",
        "unit": "sqft/l",
        "defaultValue": 130
      },
      {
        "key": "ce",
        "label": "Emulsion coverage",
        "unit": "sqft/l/coat",
        "defaultValue": 150
      },
      {
        "key": "n",
        "label": "Finish coats",
        "unit": "nos",
        "defaultValue": 2
      },
      {
        "key": "rp",
        "label": "Primer rate",
        "unit": "INR/l",
        "defaultValue": 150
      },
      {
        "key": "re",
        "label": "Emulsion rate",
        "unit": "INR/l",
        "defaultValue": 280
      }
    ],
    "costCalculatorCategoryKey": "paint"
  },
  {
    "formulaCode": "PAINT-03",
    "name": "Paint system sequence and interval",
    "categoryKey": "PAINT",
    "type": "Time",
    "confidence": "Likely",
    "reference": "IS 2395 Pt.1",
    "unit": "days",
    "example": "Internal: surface prep → 1 coat primer → 2 coats putty (sanding between) → 1 coat primer → 2 coats emulsion\nExternal: surface prep → 1 coat cement/alkali-resistant primer → 2 coats exterior emulsion\n\nRecoat interval: 4 – 6 hours (emulsion) · 12 – 16 hours (enamel) · 24 h after putty sanding\nPlaster must cure and dry 21 – 28 days before painting; moisture content below 12%",
    "workedExample": "Painting started 10 days after plaster on a Chennai site in December\nResult: alkali attack and patchy discolouration within 4 months — the repaint cost more than the original job.",
    "note": "[Likely] The 21–28 day plaster drying window is the most commonly compressed step in a rushed handover. If the schedule cannot allow it, use an alkali-resistant primer and tell the client in writing why.",
    "tags": [
      "paint",
      "sequence",
      "interval",
      "curing",
      "alkali"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Sequence and waiting periods",
        "unit": "—"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PLUMB-01",
    "name": "Water demand and storage sizing",
    "categoryKey": "PLUMB",
    "type": "Design",
    "confidence": "Likely",
    "reference": "NBC 2016 Pt.9 · IS 1172:1993",
    "unit": "litres",
    "example": "Daily demand = Persons × LPCD\nLPCD (NBC 2016): residences with full flushing 135 · without flushing 70\n  offices 45 · schools (day) 45 · hotels 180\n\nStorage split: Overhead tank = 1/3 of daily demand (minimum 500 l)\n               Underground sump = 2/3 of daily demand (or 2-day reserve where supply is alternate-day)",
    "workedExample": "G+2 with 3 families, 4 persons each = 12 persons\nDemand = 12 × 135 = 1,620 litres/day\nOHT = 1,620 ÷ 3 = 540 → adopt 1,000 l (standard tank size)\nSump = 1,620 × 2/3 = 1,080 l; Chennai alternate-day supply → 2-day reserve = 3,240 l → adopt 4,000 l",
    "note": "In Chennai, size the sump on supply frequency, not on the textbook 2/3 rule. Metro water in many zones is alternate-day or worse in summer; a 2-day sump is the practical minimum and a 3-day sump is what clients thank you for in May.",
    "tags": [
      "water",
      "demand",
      "lpcd",
      "sump",
      "oht",
      "nbc",
      "chennai"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Number of persons",
        "unit": "nos"
      },
      {
        "key": "q",
        "label": "Per capita demand",
        "unit": "lpcd"
      }
    ],
    "calcInputs": [
      {
        "key": "P",
        "label": "Persons",
        "unit": "nos",
        "defaultValue": 12
      },
      {
        "key": "q",
        "label": "LPCD",
        "unit": "litres",
        "defaultValue": 135
      },
      {
        "key": "r",
        "label": "Supply reserve",
        "unit": "days",
        "defaultValue": 2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "PLUMB-02",
    "name": "Septic tank sizing",
    "categoryKey": "PLUMB",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 2470 Pt.1:1985",
    "unit": "litres · m",
    "example": "Capacity = (Sewage flow × Detention period) + Sludge storage\n  Sewage flow     ≈ 90 – 135 lpcd\n  Detention       = 24 hours (1 day)\n  Sludge storage  ≈ 0.0765 cum/person for 1-year desludging (0.153 for 2 years)\n\nCapacity per person ≈ 210 litres (1-year cleaning) or ≈ 290 litres (2-year)\nMinimum capacity 2,000 litres · Minimum liquid depth 1.0 m · L:B ratio 2:1 to 4:1\nFree board 300 mm",
    "workedExample": "12 persons, 1-year desludging\nCapacity = 12 × 210 = 2,520 litres = 2.52 cum\nAdopt liquid depth 1.2 m → plan area = 2.10 sqm → 2.1 m × 1.0 m (L:B = 2.1:1 ✓)\nOverall depth = 1.2 + 0.3 freeboard = 1.5 m",
    "note": "Your BOQ spec F14 uses persons × 210 litres with a 2,000 l floor — that is the 1-year desludging basis and is correct as written. State the desludging assumption on the drawing; clients who expect 2-year intervals from a 1-year tank complain about odour, not about arithmetic.",
    "tags": [
      "septic tank",
      "is 2470",
      "sanitation",
      "sizing"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Persons",
        "unit": "nos"
      },
      {
        "key": "q",
        "label": "Flow",
        "unit": "lpcd"
      },
      {
        "key": "T",
        "label": "Desludging interval",
        "unit": "years"
      }
    ],
    "calcInputs": [
      {
        "key": "P",
        "label": "Persons",
        "unit": "nos",
        "defaultValue": 12
      },
      {
        "key": "q",
        "label": "Flow",
        "unit": "lpcd",
        "defaultValue": 135
      },
      {
        "key": "T",
        "label": "Desludge interval",
        "unit": "years",
        "defaultValue": 1
      },
      {
        "key": "D",
        "label": "Liquid depth",
        "unit": "m",
        "defaultValue": 1.2
      }
    ],
    "costCalculatorCategoryKey": "septic"
  },
  {
    "formulaCode": "PLUMB-03",
    "name": "Drainage pipe gradient and invert fall",
    "categoryKey": "PLUMB",
    "type": "Design",
    "confidence": "Verify",
    "reference": "IS 1742:1983 · NBC 2016 Pt.9",
    "unit": "mm",
    "example": "Fall (mm) = Pipe length(mm) ÷ Gradient denominator\n\nMinimum self-cleansing gradients (velocity ≥ 0.6 m/s):\n  100 mm dia → 1 in 60\n  150 mm dia → 1 in 100\n  200 mm dia → 1 in 150\n  250 mm dia → 1 in 200\nSoil pipe (vertical stack) 110 mm · Waste 75 mm · Vent 50 mm",
    "workedExample": "100 mm drain, 18 m run, gradient 1:60\nFall = 18,000 ÷ 60 = 300 mm\nIf inlet invert is at −450 mm, outlet invert = −750 mm below ground\nCheck this against the street sewer invert BEFORE finalising plinth level.",
    "note": "⚠ [Verify] Your BOQ spec F13 uses a gradient map of {100:80, 150:150} which is flatter than IS 1742 practice (1:60 and 1:100). A flatter drain silts up. Confirm the source of those numbers before Prabhu hard-codes drainage.js — this is a defect you cannot fix after the floor is laid.",
    "tags": [
      "drainage",
      "gradient",
      "slope",
      "invert",
      "is 1742",
      "discrepancy"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Pipe run",
        "unit": "m"
      },
      {
        "key": "G",
        "label": "Gradient denominator",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Pipe run",
        "unit": "m",
        "defaultValue": 18
      },
      {
        "key": "d",
        "label": "Pipe dia",
        "unit": "mm",
        "defaultValue": null
      },
      {
        "key": "iv",
        "label": "Start invert (below GL)",
        "unit": "mm",
        "defaultValue": 450
      }
    ],
    "costCalculatorCategoryKey": "drainage"
  },
  {
    "formulaCode": "PLUMB-04",
    "name": "Plumbing points and pipe length estimate",
    "categoryKey": "PLUMB",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "nos · rmt",
    "example": "Points per bathroom: 6 – 8 (WC, health faucet, wash basin, shower, 2 taps, geyser in/out)\nPoints per kitchen : 3 – 4\nCPVC pipe ≈ 12 – 15 rmt per bathroom · UPVC drainage ≈ 10 – 12 rmt per bathroom\nThumb: total plumbing cost ≈ 5 – 7% of civil cost",
    "workedExample": "G+2 with 6 bathrooms, 3 kitchens\nPoints = 6 × 7 + 3 × 3.5 = 42 + 10.5 = 52.5 → 53 points\nCPVC = 6 × 13 = 78 rmt · UPVC = 6 × 11 = 66 rmt",
    "note": "[Verify against your last project] Point-based plumbing contracts are common in Chennai (₹ per point, labour only). Count the points from the drawing before agreeing a lump sum — the difference between 45 and 53 points is real money and always surfaces as a claim at the end.",
    "tags": [
      "plumbing",
      "points",
      "cpvc",
      "upvc",
      "estimating"
    ],
    "variables": [
      {
        "key": "n_b",
        "label": "Bathrooms",
        "unit": "nos"
      },
      {
        "key": "n_k",
        "label": "Kitchens",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Bathrooms",
        "unit": "nos",
        "defaultValue": 6
      },
      {
        "key": "pb",
        "label": "Points per bath",
        "unit": "nos",
        "defaultValue": 7
      },
      {
        "key": "k",
        "label": "Kitchens",
        "unit": "nos",
        "defaultValue": 3
      },
      {
        "key": "pk",
        "label": "Points per kitchen",
        "unit": "nos",
        "defaultValue": 3.5
      },
      {
        "key": "r",
        "label": "Labour per point",
        "unit": "INR",
        "defaultValue": 850
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "ELEC-01",
    "name": "Connected load and maximum demand",
    "categoryKey": "ELEC",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 732:2019 · NBC 2016 Pt.8",
    "unit": "W · kW",
    "example": "Connected load = Σ (quantity × wattage)\n  LED light 12 W · Tube 20 W · Ceiling fan 75 W · TV 120 W · Fridge 200 W\n  Washing machine 800 W · Microwave 1,200 W · Geyser 2,000 W\n  AC 1.0 T 1,200 W · 1.5 T 1,500 W · 2.0 T 2,200 W · Motor 1 HP 750 W\n\nMaximum demand = Connected load × Diversity factor\n  Diversity: single residence 0.6 – 0.7 · apartment block 0.5 – 0.6",
    "workedExample": "Single flat: 20 lights (12 W), 6 fans, 2 AC of 1.5 T, 1 geyser, misc 1,500 W\n= 240 + 450 + 3,000 + 2,000 + 1,500 = 7,190 W\nMax demand = 7,190 × 0.65 = 4,674 W ≈ 4.7 kW\nSanctioned load to apply for from TNEB: 5 kW",
    "note": "Your spec F16 uses a diversity factor of 0.65 — correct for a single residence. Apply for the sanctioned load based on maximum demand, not connected load; TNEB tariff slabs and the service cable size both follow from it.",
    "tags": [
      "electrical",
      "load",
      "diversity",
      "tneb",
      "sanctioned load"
    ],
    "variables": [
      {
        "key": "W",
        "label": "Connected load",
        "unit": "W"
      },
      {
        "key": "DF",
        "label": "Diversity factor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "l",
        "label": "Lights",
        "unit": "nos",
        "defaultValue": 20
      },
      {
        "key": "lw",
        "label": "Watt each",
        "unit": "W",
        "defaultValue": 12
      },
      {
        "key": "f",
        "label": "Fans",
        "unit": "nos",
        "defaultValue": 6
      },
      {
        "key": "ac",
        "label": "AC 1.5T",
        "unit": "nos",
        "defaultValue": 2
      },
      {
        "key": "gy",
        "label": "Geysers",
        "unit": "nos",
        "defaultValue": 1
      },
      {
        "key": "ms",
        "label": "Misc load",
        "unit": "W",
        "defaultValue": 1500
      },
      {
        "key": "df",
        "label": "Diversity",
        "unit": "—",
        "defaultValue": 0.65
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "ELEC-02",
    "name": "Current, MCB rating and cable size",
    "categoryKey": "ELEC",
    "type": "Design",
    "confidence": "Verify",
    "reference": "IS 732:2019 · IS 8828",
    "unit": "A · sqmm",
    "example": "Single phase: I = P ÷ (V × pf)        V = 230 V, pf ≈ 0.85\nThree phase : I = P ÷ (√3 × V × pf)   V = 415 V\n\nMCB = next standard rating above design current\nStandard MCB: 6, 10, 16, 20, 25, 32, 40, 63, 100 A\n\nIndicative copper cable capacity (PVC, conduit, 40 °C):\n  1.0 sqmm ≈ 11 A · 1.5 ≈ 14 A · 2.5 ≈ 19 A · 4 ≈ 25 A · 6 ≈ 32 A · 10 ≈ 44 A · 16 ≈ 59 A",
    "workedExample": "Max demand 4,674 W, single phase\nI = 4,674 ÷ (230 × 0.85) = 23.9 A\nMain MCB = 25 A · Service cable = 6 sqmm copper (32 A capacity) ✓",
    "note": "⚠ [Verify with a licensed electrician — Rajan T.] Cable capacities must be derated for ambient temperature, grouping and installation method per IS 732 tables. The figures above are indicative only; an undersized cable is a fire risk, not a cost saving. Never finalise cable size from a thumb table alone.",
    "tags": [
      "electrical",
      "mcb",
      "cable",
      "current",
      "is 732",
      "safety"
    ],
    "variables": [
      {
        "key": "P",
        "label": "Load",
        "unit": "W"
      },
      {
        "key": "V",
        "label": "Voltage",
        "unit": "V"
      },
      {
        "key": "pf",
        "label": "Power factor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "P",
        "label": "Load",
        "unit": "W",
        "defaultValue": 4674
      },
      {
        "key": "ph",
        "label": "Phase",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "pf",
        "label": "Power factor",
        "unit": "—",
        "defaultValue": 0.85
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "ELEC-03",
    "name": "Electrical points per sqft",
    "categoryKey": "ELEC",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice / NBC 2016",
    "unit": "points",
    "example": "Points ≈ Built-up area(sqft) ÷ 45 to 60   (modern residential with more sockets)\nOlder thumb: 1 point per 80 – 100 sqft\n\nPer-room guide: bedroom 8 – 10 · living 12 – 16 · kitchen 8 – 12 · bathroom 4 – 5\nConduit ≈ 2.5 – 3.0 rmt per point · Wire ≈ 9 – 12 rmt per point (2 runs + earth)",
    "workedExample": "2,400 sqft ÷ 50 = 48 points per floor-equivalent\nFor G+2 at 800 sqft each floor: 800/50 = 16 points × 3 = 48 points\nWire = 48 × 10 = 480 rmt ≈ 5 coils of 90 m",
    "note": "[Verify] Point count drives the electrical labour contract. Count from the drawing, not the thumb rule, before signing — and price extra points in the contract at a stated rate, because clients always add three after the conduiting is done.",
    "tags": [
      "electrical",
      "points",
      "thumb rule",
      "wiring",
      "conduit"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "sqft per point",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "sqft per point",
        "unit": "—",
        "defaultValue": 50
      },
      {
        "key": "r",
        "label": "Rate per point",
        "unit": "INR",
        "defaultValue": 950
      }
    ],
    "costCalculatorCategoryKey": "electrical"
  },
  {
    "formulaCode": "LAB-01",
    "name": "Labour days from quantity and productivity (master)",
    "categoryKey": "LAB",
    "type": "Labour",
    "confidence": "Verify",
    "reference": "CPWD Analysis of Rates (basis)",
    "unit": "man-days",
    "example": "Skilled man-days = Quantity ÷ Output per skilled worker per day\nHelper man-days  = Skilled man-days × Helper ratio\nCalendar days    = Skilled man-days ÷ Number of skilled workers deployed\nLabour cost      = (Skilled days × Skilled wage) + (Helper days × Helper wage)",
    "workedExample": "Brickwork 6.90 cum, mason output 1.1 cum/day, helper ratio 2, crew of 3 masons\nMason days = 6.90 ÷ 1.1 = 6.27 man-days\nHelper days = 6.27 × 2 = 12.55 man-days\nCalendar = 6.27 ÷ 3 = 2.09 → 3 days on site\nCost = 6.27 × ₹1,100 + 12.55 × ₹750 = ₹6,897 + ₹9,412 = ₹16,309",
    "note": "[Verify — THE most important calibration in this library] Every output figure here is a trade range, not a code value. Record actual output on your next three activities at Ayapakkam (quantity completed ÷ workers × days) and replace these numbers. Once calibrated, this one formula prices and schedules every trade you run.",
    "tags": [
      "labour",
      "productivity",
      "man days",
      "crew",
      "scheduling",
      "cost"
    ],
    "variables": [
      {
        "key": "Q",
        "label": "Quantity of work",
        "unit": "varies"
      },
      {
        "key": "O",
        "label": "Output per man-day",
        "unit": "varies"
      },
      {
        "key": "n",
        "label": "Crew size",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "a",
        "label": "Activity",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "(see unit)",
        "defaultValue": 6.9
      },
      {
        "key": "p",
        "label": "Output position",
        "unit": "0=low 1=high",
        "defaultValue": 0.5
      },
      {
        "key": "n",
        "label": "Skilled crew size",
        "unit": "nos",
        "defaultValue": 3
      },
      {
        "key": "ws",
        "label": "Skilled wage",
        "unit": "INR/day",
        "defaultValue": 1100
      },
      {
        "key": "wh",
        "label": "Helper wage",
        "unit": "INR/day",
        "defaultValue": 750
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "LAB-02",
    "name": "Standard labour output table (all trades)",
    "categoryKey": "LAB",
    "type": "Labour",
    "confidence": "Verify",
    "reference": "CPWD DSR / trade practice",
    "unit": "per man-day",
    "example": "Excavation manual (soft soil)  2.5 – 3.0 cum/mazdoor-day\nPCC mix & lay                  1.5 – 2.0 cum/mason-day (1 mason : 4 helpers)\nRCC manual                     1.0 – 1.3 cum/mason-day (1 mason : 8 helpers)\nBrickwork 230 mm               1.0 – 1.25 cum/mason-day  ≈ 500 bricks/day\nBrickwork 115 mm               8 – 10 sqm/mason-day\nPlaster 12 mm internal         8 – 10 sqm/mason-day\nPlaster 15 mm external         6 – 8 sqm/mason-day\nBar bending & binding          100 – 150 kg/bender-day\nShuttering fixing              8 – 10 sqm/carpenter-day\nFloor tiling                   8 – 12 sqm/mason-day\nPutty / primer / emulsion      20–25 / 40–45 / 35–40 sqm per coat per painter-day\nElectrical conduiting / wiring 8–10 / 12–15 points per electrician-day",
    "workedExample": "Cross-check: a 6-mason gang should complete roughly 6.6 cum of 9-inch brickwork a day — about 3,300 bricks. If your site logs 2,000, either the gang is under-staffed with helpers or the material is not reaching the wall.",
    "note": "[Verify] These are budgeting ranges drawn from standard Indian rate-analysis practice, not from a published code table. Treat the low end as monsoon / congested site and the high end as open, well-supplied work. SiteOps already captures daily headcount and progress — that data is exactly what replaces this table.",
    "tags": [
      "labour",
      "output",
      "table",
      "trades",
      "cpwd",
      "productivity"
    ],
    "variables": [
      {
        "key": "O",
        "label": "Output per man-day",
        "unit": "varies"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "LAB-03",
    "name": "Crew composition for a residential site",
    "categoryKey": "LAB",
    "type": "Labour",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "nos",
    "example": "Helper (mazdoor) requirement = Skilled workers × Trade ratio\n\nTrade ratios (skilled : helper):\n  RCC concreting 1 : 8 · Brickwork 1 : 2 · Plastering 1 : 1.5\n  Tiling 1 : 1 · Painting 1 : 0.5 · Bar bending 1 : 1 · Carpentry 1 : 1\n\nSupervision: 1 site engineer per 8,000 – 12,000 sqft of active work\n             1 supervisor / maistry per 15 – 20 workers",
    "workedExample": "Slab pour day: 3 masons for concreting → 24 helpers, plus 2 bar benders + 2 carpenters standing by\nTotal headcount on a pour day ≈ 32 — which is why slab days need advance planning and a full material stock the previous evening.",
    "note": "[Verify] A manual RCC pour is the single most labour-intensive day on the programme. If your headcount cannot reach roughly 30 for a 12 cum slab, either hire a concrete pump with RMC or split the pour with a proper construction joint — do not stretch the pour past the initial setting time.",
    "tags": [
      "crew",
      "gang",
      "helper ratio",
      "supervision",
      "manpower"
    ],
    "variables": [
      {
        "key": "n_s",
        "label": "Skilled workers",
        "unit": "nos"
      },
      {
        "key": "r",
        "label": "Helper ratio",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "s",
        "label": "Skilled workers",
        "unit": "nos",
        "defaultValue": 3
      },
      {
        "key": "r",
        "label": "Helper ratio",
        "unit": "—",
        "defaultValue": 8
      },
      {
        "key": "sqft",
        "label": "Active area",
        "unit": "sqft",
        "defaultValue": 2400
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "LAB-04",
    "name": "Labour cost with overtime, ESI and PF",
    "categoryKey": "LAB",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "TN Factories Act · ESI Act · EPF Act",
    "unit": "INR",
    "example": "Basic wage cost = Man-days × Daily wage\nOvertime        = OT hours × (Daily wage ÷ 8) × 2      [TN: 2× for overtime]\nESI (employer)  = 3.25% of wages   (employee 0.75%)\nPF (employer)   = 12% of basic wages\nContractor margin = 10 – 15%\n\nTotal = (Basic + OT) × (1 + ESI% + PF%) × (1 + margin%)",
    "workedExample": "120 mason-days at ₹1,100, 40 OT hours, ESI 3.25%, PF 12%, margin 12%\nBasic = 120 × 1,100 = ₹1,32,000\nOT = 40 × (1,100 ÷ 8) × 2 = 40 × 275 = ₹11,000\nSubtotal = ₹1,43,000\nStatutory = ₹1,43,000 × 15.25% = ₹21,808\nMargin = (1,43,000 + 21,808) × 12% = ₹19,777\nTotal = ₹1,84,585",
    "note": "[Verify current rates] ESI 3.25% employer / 0.75% employee and PF 12% match what LabourLedger already carries. Statutory rates and wage-ceiling thresholds change — confirm with your auditor each financial year before using these in a client quotation.",
    "tags": [
      "labour cost",
      "overtime",
      "esi",
      "pf",
      "statutory",
      "labourledger"
    ],
    "variables": [
      {
        "key": "D",
        "label": "Man-days",
        "unit": "days"
      },
      {
        "key": "W",
        "label": "Daily wage",
        "unit": "INR"
      },
      {
        "key": "OT",
        "label": "Overtime hours",
        "unit": "hrs"
      }
    ],
    "calcInputs": [
      {
        "key": "D",
        "label": "Man-days",
        "unit": "days",
        "defaultValue": 120
      },
      {
        "key": "W",
        "label": "Daily wage",
        "unit": "INR",
        "defaultValue": 1100
      },
      {
        "key": "ot",
        "label": "OT hours",
        "unit": "hrs",
        "defaultValue": 40
      },
      {
        "key": "esi",
        "label": "ESI employer",
        "unit": "%",
        "defaultValue": 3.25
      },
      {
        "key": "pf",
        "label": "PF employer",
        "unit": "%",
        "defaultValue": 12
      },
      {
        "key": "m",
        "label": "Margin",
        "unit": "%",
        "defaultValue": 12
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "TIME-01",
    "name": "Activity duration from quantity and crew",
    "categoryKey": "TIME",
    "type": "Time",
    "confidence": "Verify",
    "reference": "Derived",
    "unit": "days",
    "example": "Duration (days) = Quantity ÷ (Output per man-day × Crew size × Efficiency)\n\nEfficiency factor: normal 1.00 · monsoon 0.70 – 0.80 · congested site 0.85\n                   first-time crew 0.75 · night shift 0.85\nAdd float: 10 – 15% on every activity, 20% on weather-exposed activities",
    "workedExample": "Plastering 713 sqm internal, output 9 sqm/mason-day, 6 masons, monsoon efficiency 0.75\nDuration = 713 ÷ (9 × 6 × 0.75) = 713 ÷ 40.5 = 17.6 → 18 days\nWith 15% float = 21 days on the programme",
    "note": "[Verify] Most residential programmes slip because the efficiency factor is silently assumed to be 1.0 in October–December. For Chennai, plan the NE monsoon (Oct–Dec) at 0.7 for all external and roof work. Schedule internal finishing into that window deliberately.",
    "tags": [
      "duration",
      "schedule",
      "crew",
      "efficiency",
      "monsoon",
      "planning"
    ],
    "variables": [
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "varies"
      },
      {
        "key": "O",
        "label": "Output/man-day",
        "unit": "varies"
      },
      {
        "key": "n",
        "label": "Crew",
        "unit": "nos"
      },
      {
        "key": "e",
        "label": "Efficiency",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "units",
        "defaultValue": 713
      },
      {
        "key": "O",
        "label": "Output per man-day",
        "unit": "units",
        "defaultValue": 9
      },
      {
        "key": "n",
        "label": "Crew size",
        "unit": "nos",
        "defaultValue": 6
      },
      {
        "key": "e",
        "label": "Efficiency",
        "unit": "—",
        "defaultValue": 0.75
      },
      {
        "key": "fl",
        "label": "Float",
        "unit": "%",
        "defaultValue": 15
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "TIME-02",
    "name": "Slab cycle time per floor",
    "categoryKey": "TIME",
    "type": "Time",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "days",
    "example": "Slab cycle = Column casting + Shuttering + Reinforcement + Pour + Curing/prop period\n\nConventional timber/ply formwork, residential: 21 – 30 days per floor\nSystem formwork (aluminium) : 7 – 14 days per floor\nWith PPC / blended cement   : add 3 – 4 days for prop removal\n\nTypical break-up (conventional, one floor of 1,000 sqft):\n  Column reinforcement + shuttering + pour  5 days\n  Slab & beam shuttering                    6 days\n  Slab & beam reinforcement                 5 days\n  Services conduiting in slab               1 day\n  Pour + finish                             1 day\n  Prop retention before next floor          7 days",
    "workedExample": "G+2 (3 slabs) at 25-day cycle = 75 days of structural work\nPlus foundation 30 days and finishing 120 days → 225 days ≈ 7.5 months\nAdd monsoon and approval delays: 10 – 12 months realistic for a 2,400 sqft house.",
    "note": "[Verify against your own sites] The gap between the 25-day plan and the 35-day reality is almost always material supply, not labour. Track \"days lost waiting for material\" as a separate field in SiteOps — it is usually the largest single line.",
    "tags": [
      "slab cycle",
      "schedule",
      "floor",
      "formwork",
      "duration"
    ],
    "variables": [
      {
        "key": "—",
        "label": "Cycle components",
        "unit": "days"
      }
    ],
    "calcInputs": [
      {
        "key": "c",
        "label": "Column stage",
        "unit": "days",
        "defaultValue": 5
      },
      {
        "key": "sh",
        "label": "Shuttering",
        "unit": "days",
        "defaultValue": 6
      },
      {
        "key": "rf",
        "label": "Reinforcement",
        "unit": "days",
        "defaultValue": 5
      },
      {
        "key": "sv",
        "label": "Services",
        "unit": "days",
        "defaultValue": 1
      },
      {
        "key": "p",
        "label": "Pour",
        "unit": "days",
        "defaultValue": 1
      },
      {
        "key": "pr",
        "label": "Prop retention",
        "unit": "days",
        "defaultValue": 7
      },
      {
        "key": "n",
        "label": "No. of floors",
        "unit": "nos",
        "defaultValue": 3
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "TIME-03",
    "name": "Minimum curing periods",
    "categoryKey": "TIME",
    "type": "Time",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.13.5",
    "unit": "days",
    "example": "RCC with OPC, normal exposure      :  7 days minimum\nRCC with PPC / blended cement       : 10 days minimum\nRCC in hot weather (>35 °C) or severe exposure : 14 days\nBrick masonry                       :  7 days\nPlaster                             :  7 days (keep damp, not flooded)\nConcrete flooring / IPS             : 14 days\nWaterproofing coba                  : 14 days + 24 h ponding test",
    "workedExample": "Ponding test after coba: fill terrace 50 mm deep, hold 24–48 hours, inspect the ceiling below.\nThis one test, done before flooring, prevents the most expensive category of client complaint.",
    "note": "[Likely — confirm against a current IS 456 copy] Curing is free and is the step most often cut when the site is behind. A slab cured 3 days instead of 7 loses roughly 20–25% of its 28-day strength. There is no way to add it back later.",
    "tags": [
      "curing",
      "is 456",
      "quality",
      "ponding test",
      "time"
    ],
    "variables": [
      {
        "key": "t",
        "label": "Curing period",
        "unit": "days"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "TIME-04",
    "name": "Overall project duration thumb rule",
    "categoryKey": "TIME",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "months",
    "example": "Duration (months) ≈ Built-up area(sqft) ÷ 200 to 250   (individual residence, conventional)\n\nStage split (% of total duration):\n  Foundation & plinth  12 – 15%\n  Superstructure RCC   30 – 35%\n  Masonry & plaster    18 – 20%\n  Finishing (tile, paint, joinery) 25 – 30%\n  Services & handover   5 – 8%",
    "workedExample": "2,400 sqft ÷ 220 = 10.9 months\nStage split: foundation 1.5 mo · RCC 3.6 mo · masonry+plaster 2.1 mo · finishing 3.0 mo · services 0.7 mo",
    "note": "[Verify] This is a pre-contract sanity check, not a programme. A real programme comes from TIME-01 applied activity by activity. But if your detailed programme says 7 months for 2,400 sqft, this rule says check it again — nobody finishes that fast without RMC, system formwork and uninterrupted cash flow.",
    "tags": [
      "duration",
      "project",
      "thumb rule",
      "programme",
      "stages"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "Divisor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "Divisor",
        "unit": "—",
        "defaultValue": 220
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "TIME-05",
    "name": "Concrete handling time limits",
    "categoryKey": "TIME",
    "type": "Time",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.13.2 · IS 269",
    "unit": "minutes",
    "example": "Initial setting time (OPC)  : not less than 30 minutes\nFinal setting time          : not more than 600 minutes (10 hours)\nConcrete must be placed and compacted within the initial setting time\nPractical limit, site mix    : 30 minutes from water contact\nRMC with retarder            : 90 – 120 minutes from batching\nRe-tempering with water      : NOT permitted\nConstruction joint if delay exceeds 30 min between layers",
    "workedExample": "A 12 cum manual pour at 1.2 cum/mason-day output needs a large gang precisely because every batch must be placed within 30 minutes. This is a sequencing constraint, not a productivity one.",
    "note": "[Likely] Watch for the afternoon slowdown on a big pour. If the last 2 cum goes in after the first has set, you have an unplanned cold joint at mid-span — the worst possible location. Plan the pour sequence and the stopping line before the mixer starts.",
    "tags": [
      "setting time",
      "concrete",
      "cold joint",
      "pour",
      "is 456"
    ],
    "variables": [
      {
        "key": "t",
        "label": "Time from mixing",
        "unit": "min"
      }
    ],
    "calcInputs": [],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "THUMB-01",
    "name": "Material quantity per sqft of built-up area",
    "categoryKey": "THUMB",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice / BN Datta",
    "unit": "per sqft",
    "example": "Quantity = Built-up area(sqft) × Coefficient\n\nCoefficient bands (RCC framed residential, G to G+2):\n  Cement      0.35 – 0.45 bags/sqft   (use 0.40)\n  Steel       3.50 – 4.50 kg/sqft     (use 4.00)\n  River sand  1.00 – 1.40 cft/sqft    (use 1.20)\n  Aggregate   1.00 – 1.35 cft/sqft    (use 1.20)\n  Bricks      7 – 9 nos/sqft          (use 8)\n  Flooring    1.20 – 1.30 sqft/sqft\n  Paint       0.15 – 0.20 litre/sqft",
    "workedExample": "2,400 sqft at the mid-band figures:\nCement = 2400 × 0.40 = 960 bags\nSteel  = 2400 × 4.00 = 9,600 kg = 9.6 MT\nSand   = 2400 × 1.20 = 2,880 cft = 28.8 units\nAggregate = 2,880 cft = 28.8 units\nBricks = 2400 × 8 = 19,200 nos",
    "note": "[Verify — calibrate from your own completed projects] These bands vary with structural system, number of floors, span lengths and finish level by ±25%. Use them to sanity-check a detailed BOQ, never to replace one. The calibration loop in the \"Reusable Loops\" tab shows exactly how to derive your own coefficients from three completed sites.",
    "tags": [
      "thumb rule",
      "per sqft",
      "cement",
      "steel",
      "sand",
      "bricks",
      "estimating",
      "calibrate"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "c",
        "label": "Coefficient",
        "unit": "per sqft"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "ce",
        "label": "Cement",
        "unit": "bags/sqft",
        "defaultValue": 0.4
      },
      {
        "key": "st",
        "label": "Steel",
        "unit": "kg/sqft",
        "defaultValue": 4
      },
      {
        "key": "sa",
        "label": "Sand",
        "unit": "cft/sqft",
        "defaultValue": 1.2
      },
      {
        "key": "ag",
        "label": "Aggregate",
        "unit": "cft/sqft",
        "defaultValue": 1.2
      },
      {
        "key": "br",
        "label": "Bricks",
        "unit": "nos/sqft",
        "defaultValue": 8
      }
    ],
    "costCalculatorCategoryKey": "thumbrule"
  },
  {
    "formulaCode": "THUMB-02",
    "name": "RCC volume and concrete per sqft",
    "categoryKey": "THUMB",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Derived",
    "unit": "cum/sqft",
    "example": "Total RCC volume ≈ Built-up area(sqft) × 0.035 to 0.045 cum/sqft\n\nSplit by member (% of total RCC):\n  Footings & pedestals 12 – 15% · Columns 12 – 15% · Plinth beams 8 – 10%\n  Beams 20 – 25% · Slabs 35 – 40% · Staircase & misc 5 – 8%",
    "workedExample": "2,400 sqft × 0.040 = 96 cum of RCC\nCement at M20 equivalent = 96 × 8.06 = 774 bags (structure only)\nRemaining cement (masonry, plaster, flooring) = 960 − 774 = 186 bags — which cross-checks THUMB-01.",
    "note": "[Verify] This coefficient is the bridge between the thumb rule and the BOQ. If your detailed BOQ produces 0.055 cum/sqft, the sections are oversized; if it produces 0.028, check whether the beam/slab overlap has been double-deducted.",
    "tags": [
      "rcc",
      "concrete",
      "thumb rule",
      "per sqft",
      "cross check"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft"
      },
      {
        "key": "k",
        "label": "RCC coefficient",
        "unit": "cum/sqft"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Built-up area",
        "unit": "sqft",
        "defaultValue": 2400
      },
      {
        "key": "k",
        "label": "RCC coeff",
        "unit": "cum/sqft",
        "defaultValue": 0.04
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "THUMB-03",
    "name": "Carpet, built-up and super built-up area",
    "categoryKey": "THUMB",
    "type": "Thumb Rule",
    "confidence": "Likely",
    "reference": "RERA 2016 definition",
    "unit": "sqft",
    "example": "Carpet area      = Net usable floor area within walls (RERA definition — excludes external walls, balcony, shaft)\nBuilt-up area     = Carpet + wall thickness + balcony ≈ Carpet ÷ 0.70 to 0.80\nSuper built-up    = Built-up + share of common areas ≈ Built-up × 1.20 to 1.35\n\nLoading factor = (Super built-up − Carpet) ÷ Carpet",
    "workedExample": "Carpet 1,700 sqft → Built-up = 1,700 ÷ 0.75 = 2,267 sqft → Super built-up = 2,267 × 1.25 = 2,833 sqft\nLoading factor = (2,833 − 1,700) ÷ 1,700 = 66.6%",
    "note": "Under RERA, apartments must be sold on carpet area. For an individual residence the client thinks in built-up area and the contractor quotes per built-up sqft — state which basis your rate applies to in the agreement, in one line. Disputes over this are common and entirely avoidable.",
    "tags": [
      "carpet area",
      "built up",
      "super built up",
      "rera",
      "loading factor"
    ],
    "variables": [
      {
        "key": "A_c",
        "label": "Carpet area",
        "unit": "sqft"
      },
      {
        "key": "A_b",
        "label": "Built-up area",
        "unit": "sqft"
      }
    ],
    "calcInputs": [
      {
        "key": "c",
        "label": "Carpet area",
        "unit": "sqft",
        "defaultValue": 1700
      },
      {
        "key": "e",
        "label": "Carpet efficiency",
        "unit": "—",
        "defaultValue": 0.75
      },
      {
        "key": "l",
        "label": "Common area loading",
        "unit": "—",
        "defaultValue": 1.25
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "THUMB-04",
    "name": "Preliminary member sizing thumb rules",
    "categoryKey": "THUMB",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice — NOT a design",
    "unit": "mm",
    "example": "Slab thickness      ≈ Short span ÷ 28 (two-way continuous), minimum 100 mm; 125 mm typical residential\nBeam depth          ≈ Span ÷ 12 to Span ÷ 15  (in mm: span in ft × 25 approximately)\nBeam width          ≈ 0.5 × depth, minimum 200 mm (230 mm to match wall)\nColumn (G+1)        230 × 230 mm with 4–6 nos 12 mm\nColumn (G+2)        230 × 300 to 230 × 450 mm\nLintel depth        ≈ Opening ÷ 12, minimum 150 mm\nCantilever depth    ≈ Projection ÷ 7",
    "workedExample": "Span 4.2 m → beam depth = 4,200 ÷ 12 = 350 mm, adopt 450 mm with slab\nSlab short span 4.0 m → 4,000 ÷ 28 = 143 mm → adopt 125 mm with proper steel, or 150 mm for comfort",
    "note": "⚠ [Verify — these are NOT design values] Sizing thumb rules are for quoting and for checking whether a drawing looks sane. Every member must be designed by a qualified structural engineer against actual loads, span continuity, and IS 456 deflection limits. Your BOQ spec F09 uses lx/28 for effective depth, which is on the slender side — confirm it carries the modification factor for tension steel per IS 456 cl.23.2.1.",
    "tags": [
      "sizing",
      "thumb rule",
      "beam",
      "column",
      "slab",
      "preliminary",
      "warning"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Span",
        "unit": "m"
      },
      {
        "key": "t",
        "label": "Thickness",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Span",
        "unit": "m",
        "defaultValue": 4.2
      },
      {
        "key": "sl",
        "label": "Slab short span",
        "unit": "m",
        "defaultValue": 4
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "THUMB-05",
    "name": "Openings, ventilation and door/window area",
    "categoryKey": "THUMB",
    "type": "Thumb Rule",
    "confidence": "Likely",
    "reference": "NBC 2016 Pt.3 · TN Building Rules",
    "unit": "sqm",
    "example": "Window area ≥ 1/10 of floor area (habitable room, natural light & ventilation)\nHabitable room minimum area 9.5 sqm, minimum width 2.4 m\nKitchen minimum 5.0 sqm · Bathroom minimum 1.8 sqm (1.2 m min width)\nMinimum floor-to-ceiling height 2.75 m (habitable), 2.4 m (bathroom/store)\nDoor sizes: main 1.0 × 2.1 m · bedroom 0.9 × 2.1 m · bathroom 0.75 × 2.1 m",
    "workedExample": "Bedroom 3.6 × 3.6 = 12.96 sqm\nMinimum window = 12.96 ÷ 10 = 1.30 sqm → a 1.2 × 1.2 m window (1.44 sqm) satisfies it",
    "note": "[Likely — verify against current TN Combined Development and Building Rules] Room dimensions and ventilation ratios are checked at CMDA sanction and again at completion. A room that fails the 1/10 rule cannot be regularised without cutting a new opening in a structural wall.",
    "tags": [
      "nbc",
      "ventilation",
      "window",
      "room size",
      "cmda",
      "statutory"
    ],
    "variables": [
      {
        "key": "A_f",
        "label": "Floor area",
        "unit": "sqm"
      },
      {
        "key": "A_w",
        "label": "Window area",
        "unit": "sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Room length",
        "unit": "m",
        "defaultValue": 3.6
      },
      {
        "key": "B",
        "label": "Room width",
        "unit": "m",
        "defaultValue": 3.6
      },
      {
        "key": "r",
        "label": "Ventilation ratio 1:n",
        "unit": "—",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-01",
    "name": "Standard wastage allowances",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "%",
    "example": "Quantity to order = Theoretical quantity × (1 + wastage%)\n\nCement       2 – 3%   (spillage, hardened bags)\nSteel        3 – 5%   (cutting waste, off-cuts)\nSand         5 – 8%   (handling, lorry shortfall)\nAggregate    3 – 5%\nBricks       5 – 8%   (breakage in transit and handling)\nTiles        5 – 15%  (layout dependent)\nPaint        5 – 10%\nPlaster mortar 10 – 15%\nElectrical wire 5 – 10%",
    "workedExample": "Steel 9,600 kg theoretical at 4% wastage = 9,984 kg to order\nAt ₹62/kg the wastage alone is ₹23,808 — worth managing, not ignoring.",
    "note": "[Verify] Wastage is a management variable, not a constant. Off-cut steel can be reused for stirrups and chairs if the bar bender is instructed; broken bricks go into coba instead of the skip. Track actual wastage per material in SiteOps and you will find one or two materials carrying nearly all of it.",
    "tags": [
      "wastage",
      "material",
      "ordering",
      "procurement"
    ],
    "variables": [
      {
        "key": "Q",
        "label": "Theoretical quantity",
        "unit": "varies"
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "Q",
        "label": "Theoretical quantity",
        "unit": "units",
        "defaultValue": 9600
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 4
      },
      {
        "key": "r",
        "label": "Rate",
        "unit": "INR/unit",
        "defaultValue": 62
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-02",
    "name": "Rate analysis structure",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Likely",
    "reference": "CPWD Analysis of Rates (structure)",
    "unit": "INR/unit",
    "example": "Rate per unit = Material + Labour + Plant + Overheads + Profit\n\n  Material cost   = Σ (quantity × rate) including wastage\n  Labour cost     = Σ (man-days × wage) including statutory\n  Plant / tools   = 1 – 3% of material + labour (\"sundries & T&P\")\n  Overheads       = 5 – 8%  (site establishment, supervision, water, power)\n  Profit          = 8 – 12%\n\nContractor margin (overheads + profit) commonly quoted as a single 15%",
    "workedExample": "Brickwork per cum: material ₹5,480 (bricks + cement + sand), labour ₹2,360\nSub-total = ₹7,840\nT&P 2% = ₹157 · Overheads 6% = ₹470 · Profit 10% = ₹847\nRate = ₹9,314 per cum",
    "note": "[Likely] Building your own rate analysis from this structure — rather than accepting a market rate — is what lets you argue a contractor quote line by line. CivilMind already has RateSync (materials) and LabourLedger (wages); this formula is the join between them.",
    "tags": [
      "rate analysis",
      "costing",
      "overhead",
      "profit",
      "cpwd",
      "boq"
    ],
    "variables": [
      {
        "key": "M",
        "label": "Material",
        "unit": "INR"
      },
      {
        "key": "L",
        "label": "Labour",
        "unit": "INR"
      },
      {
        "key": "OH",
        "label": "Overhead",
        "unit": "%"
      },
      {
        "key": "P",
        "label": "Profit",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "M",
        "label": "Material cost",
        "unit": "INR",
        "defaultValue": 5480
      },
      {
        "key": "L",
        "label": "Labour cost",
        "unit": "INR",
        "defaultValue": 2360
      },
      {
        "key": "tp",
        "label": "Tools & plant",
        "unit": "%",
        "defaultValue": 2
      },
      {
        "key": "oh",
        "label": "Overheads",
        "unit": "%",
        "defaultValue": 6
      },
      {
        "key": "p",
        "label": "Profit",
        "unit": "%",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-03",
    "name": "Cost distribution across a residential project",
    "categoryKey": "COST",
    "type": "Thumb Rule",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "%",
    "example": "By work head (% of total construction cost):\n  Foundation & plinth      10 – 13%\n  RCC superstructure       28 – 33%\n  Masonry & plaster        12 – 15%\n  Flooring & tiling         8 – 11%\n  Doors, windows, joinery   8 – 12%\n  Painting                  4 – 6%\n  Plumbing & sanitary       5 – 8%\n  Electrical                5 – 8%\n  Waterproofing             2 – 3%\n  Miscellaneous & external  4 – 6%\n\nBy resource: Material 55 – 62% · Labour 25 – 32% · Overheads & profit 12 – 18%",
    "workedExample": "Budget ₹48,00,000 for 2,400 sqft (₹2,000/sqft)\nRCC structure = 30% = ₹14.4 lakh · Finishing heads together ≈ 30% = ₹14.4 lakh\nMEP (plumbing + electrical) = 13% = ₹6.24 lakh",
    "note": "[Verify against your own final accounts] This distribution is the fastest way to spot an unbalanced quotation. A contractor whose RCC is 22% and finishing is 40% is either using undersized sections or padding the finishes — either way, ask.",
    "tags": [
      "cost distribution",
      "budget",
      "percentage",
      "estimating",
      "benchmark"
    ],
    "variables": [
      {
        "key": "C",
        "label": "Total cost",
        "unit": "INR"
      },
      {
        "key": "p",
        "label": "Head percentage",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "C",
        "label": "Total budget",
        "unit": "INR",
        "defaultValue": 4800000
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-04",
    "name": "GST and statutory levies on construction",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "GST Act · BOCW Act 1996",
    "unit": "%",
    "example": "GST on works contract (construction service)     : 18% with input tax credit\nGST on affordable residential apartment           : 1% without ITC\nGST on other residential apartment (under construction) : 5% without ITC\nCompleted property with occupancy certificate     : no GST\n\nBOCW labour cess : 1% of the cost of construction, where cost exceeds ₹10 lakh\nTDS under 194C   : 1% (individual/HUF) or 2% (company) on contractor payments",
    "workedExample": "Works contract of ₹48,00,000 at 18% GST = ₹8,64,000\nLabour cess at 1% = ₹48,000\nTotal outflow = ₹56,64,000",
    "note": "⚠ [Verify with your CA before quoting] GST rates and the conditions attached to them change frequently, and my information may be out of date. The rates above are indicative of the structure only. Never put a GST figure into a client agreement without written confirmation from your auditor for that financial year.",
    "tags": [
      "gst",
      "tax",
      "labour cess",
      "bocw",
      "tds",
      "statutory",
      "verify"
    ],
    "variables": [
      {
        "key": "C",
        "label": "Contract value",
        "unit": "INR"
      },
      {
        "key": "g",
        "label": "GST rate",
        "unit": "%"
      }
    ],
    "calcInputs": [
      {
        "key": "C",
        "label": "Contract value",
        "unit": "INR",
        "defaultValue": 4800000
      },
      {
        "key": "g",
        "label": "GST rate",
        "unit": "%",
        "defaultValue": 18
      },
      {
        "key": "cs",
        "label": "Labour cess",
        "unit": "%",
        "defaultValue": 1
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-05",
    "name": "Site-mixed concrete vs ready-mix comparison",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "Derived",
    "unit": "INR/cum",
    "example": "Site mix cost/cum = Material cost + Labour cost + Mixer hire + Wastage allowance\nRMC cost/cum      = RMC rate + Pumping charge + Minimum-load penalty\n\nSite mix hidden costs: 3 – 5% material wastage, storage space, quality variation,\nlabour gang of ~30 on pour day, no batching accuracy\nRMC hidden costs: minimum load (usually 6 cum), waiting charges, site access width",
    "workedExample": "12 cum slab pour\nSite mix at ₹5,600/cum = ₹67,200 + labour gang of 30 for a day\nRMC at ₹6,400/cum + ₹450/cum pumping = ₹82,200, gang of 8\nDifference ₹15,000 — against roughly 22 fewer man-days (₹17,000) and guaranteed grade.",
    "note": "[Verify with current Chennai rates via RateSync] The comparison flips depending on pour size. Below about 5 cum, site mix usually wins; above 10 cum with pumping access, RMC usually wins on total cost and always wins on quality consistency. Run this calculation per pour, not once per project.",
    "tags": [
      "rmc",
      "site mix",
      "comparison",
      "decision",
      "concrete",
      "cost"
    ],
    "variables": [
      {
        "key": "V",
        "label": "Pour volume",
        "unit": "cum"
      },
      {
        "key": "r_s",
        "label": "Site mix rate",
        "unit": "INR/cum"
      },
      {
        "key": "r_r",
        "label": "RMC rate",
        "unit": "INR/cum"
      }
    ],
    "calcInputs": [
      {
        "key": "V",
        "label": "Pour volume",
        "unit": "cum",
        "defaultValue": 12
      },
      {
        "key": "rs",
        "label": "Site mix rate",
        "unit": "INR/cum",
        "defaultValue": 5600
      },
      {
        "key": "rr",
        "label": "RMC rate",
        "unit": "INR/cum",
        "defaultValue": 6400
      },
      {
        "key": "pm",
        "label": "Pumping",
        "unit": "INR/cum",
        "defaultValue": 450
      },
      {
        "key": "gs",
        "label": "Site mix gang",
        "unit": "nos",
        "defaultValue": 30
      },
      {
        "key": "gr",
        "label": "RMC gang",
        "unit": "nos",
        "defaultValue": 8
      },
      {
        "key": "w",
        "label": "Avg wage",
        "unit": "INR/day",
        "defaultValue": 780
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-01",
    "name": "One-way or two-way slab classification",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.24",
    "unit": "ratio",
    "example": "Ratio = Longer span (ly) ÷ Shorter span (lx)\n\nIf ratio ≥ 2.0 → ONE-WAY slab (main steel along short span only)\nIf ratio < 2.0 → TWO-WAY slab (main steel both directions)\n\nMoment (one-way, simply supported) : M = w·l² ÷ 8\nMoment (two-way)                   : Mx = αx·w·lx² ,  My = αy·w·lx²   (IS 456 Table 26/27)",
    "workedExample": "Slab 4.0 × 5.0 m → ratio = 5.0 ÷ 4.0 = 1.25 < 2 → TWO-WAY\nSlab 3.0 × 6.5 m → ratio = 2.17 ≥ 2 → ONE-WAY, main steel along the 3.0 m span",
    "note": "Your spec F09 uses (ly/lx >= 2) for one-way, which matches IS 456. Getting this wrong in the other direction — detailing a two-way slab as one-way — leaves the long-span direction with only distribution steel and produces visible sagging.",
    "tags": [
      "slab",
      "one way",
      "two way",
      "is 456",
      "design",
      "moment"
    ],
    "variables": [
      {
        "key": "lx",
        "label": "Short span",
        "unit": "m"
      },
      {
        "key": "ly",
        "label": "Long span",
        "unit": "m"
      },
      {
        "key": "w",
        "label": "Factored load",
        "unit": "kN/sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "lx",
        "label": "Short span",
        "unit": "m",
        "defaultValue": 4
      },
      {
        "key": "ly",
        "label": "Long span",
        "unit": "m",
        "defaultValue": 5
      },
      {
        "key": "w",
        "label": "Factored load wu",
        "unit": "kN/sqm",
        "defaultValue": 11.5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-02",
    "name": "Span-to-depth ratio for deflection control",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.23.2.1",
    "unit": "ratio",
    "example": "Basic span/effective depth ratios:\n  Cantilever         7\n  Simply supported  20\n  Continuous        26\n\nEffective depth d ≥ Span ÷ (Basic ratio × Modification factor)\nModification factor for tension steel: 0.8 to 1.4 (IS 456 Fig.4), ≈1.2 for p = 0.4% Fe500\nOverall depth D = d + cover + half bar diameter",
    "workedExample": "Continuous slab, span 4.0 m, Fe500, MF = 1.2\nd ≥ 4,000 ÷ (26 × 1.2) = 4,000 ÷ 31.2 = 128 mm\nD = 128 + 20 cover + 5 = 153 mm → adopt 150 mm\n\nNote this gives 150 mm, not the 143 mm that lx/28 gives — lx/28 already assumes an MF near 1.08.",
    "note": "⚠ [Likely — reconcile with your engine] Your spec F09 computes d = lx/28 directly. That is a shortcut equivalent to (26 × 1.08). It is safe only if the tension steel percentage actually delivers MF ≥ 1.08. Make the modification factor an explicit input in rccSlab.js rather than burying it in a constant.",
    "tags": [
      "deflection",
      "span depth",
      "is 456",
      "slab",
      "design",
      "modification factor"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Effective span",
        "unit": "m"
      },
      {
        "key": "r",
        "label": "Basic ratio",
        "unit": "—"
      },
      {
        "key": "MF",
        "label": "Modification factor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Effective span",
        "unit": "m",
        "defaultValue": 4
      },
      {
        "key": "s",
        "label": "Support",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "mf",
        "label": "Modification factor",
        "unit": "—",
        "defaultValue": 1.2
      },
      {
        "key": "c",
        "label": "Cover",
        "unit": "mm",
        "defaultValue": 20
      },
      {
        "key": "d",
        "label": "Bar dia",
        "unit": "mm",
        "defaultValue": 10
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-03",
    "name": "Slab load calculation and load combination",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 875 Pt.1 & Pt.2 · IS 456 cl.36.4",
    "unit": "kN/sqm",
    "example": "Dead load (slab)   = Thickness(m) × 25 kN/cum\nFloor finish       = 1.0 – 1.5 kN/sqm\nPartition allowance= 1.0 kN/sqm (where not located on a beam)\nLive load (IS 875 Pt.2): residential rooms 2.0 · balcony 3.0 · staircase 3.0\n                          office 2.5 – 4.0 · shops 4.0 · terrace (accessible) 1.5\n\nFactored load  wu = 1.5 × (DL + LL)",
    "workedExample": "125 mm residential slab\nSelf weight = 0.125 × 25 = 3.125 kN/sqm\nFloor finish = 1.0 · Partition = 1.0 → DL = 5.125\nLL = 2.0\nwu = 1.5 × (5.125 + 2.0) = 10.69 kN/sqm",
    "note": "The partition allowance is the item most often forgotten. A 115 mm brick partition 3 m high weighs about 0.66 kN per metre run — spread over a slab it is close to 1.0 kN/sqm. Clients who later add a \"small brick wall\" in the hall are adding a real load.",
    "tags": [
      "load",
      "dead load",
      "live load",
      "is 875",
      "factored",
      "slab"
    ],
    "variables": [
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "m"
      },
      {
        "key": "DL",
        "label": "Dead load",
        "unit": "kN/sqm"
      },
      {
        "key": "LL",
        "label": "Live load",
        "unit": "kN/sqm"
      }
    ],
    "calcInputs": [
      {
        "key": "t",
        "label": "Slab thickness",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "ff",
        "label": "Floor finish",
        "unit": "kN/sqm",
        "defaultValue": 1
      },
      {
        "key": "pt",
        "label": "Partition",
        "unit": "kN/sqm",
        "defaultValue": 1
      },
      {
        "key": "ll",
        "label": "Live load",
        "unit": "kN/sqm",
        "defaultValue": 2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-04",
    "name": "Limiting moment and area of tension steel",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 Annex G",
    "unit": "sqmm",
    "example": "Mu,lim = 0.148 f_ck b d²   (Fe250)\nMu,lim = 0.138 f_ck b d²   (Fe415)\nMu,lim = 0.133 f_ck b d²   (Fe500)\n\nA_st = (0.5 f_ck ÷ f_y) × [1 − √(1 − 4.6 M_u ÷ (f_ck b d²))] × b × d\n\nIf Mu > Mu,lim → increase depth or design as doubly reinforced",
    "workedExample": "Slab strip b = 1000 mm, d = 105 mm, M20, Fe500, Mu = 10.69 × 4²/8 = 21.4 kN·m\nMu,lim = 0.133 × 20 × 1000 × 105² = 29.33 kN·m > 21.4 ✓ singly reinforced\nAst = (0.5×20/500)[1 − √(1 − 4.6×21.4e6/(20×1000×105²))] × 1000 × 105\n    = 0.02 × [1 − √(1 − 0.4463)] × 105,000 = 0.02 × 0.2559 × 105,000 = 537 sqmm/m\n10 mm @ 140 c/c gives 561 sqmm/m ✓",
    "note": "[Likely — verify against your structural engineer's output] This is the same expression your spec F09 uses. It is correct for singly reinforced rectangular sections only. Do not extend it to flanged beams, doubly reinforced sections or continuous spans without the relevant coefficients.",
    "tags": [
      "ast",
      "moment",
      "mu lim",
      "is 456",
      "design",
      "reinforcement"
    ],
    "variables": [
      {
        "key": "Mu",
        "label": "Factored moment",
        "unit": "kN·m"
      },
      {
        "key": "b",
        "label": "Width",
        "unit": "mm"
      },
      {
        "key": "d",
        "label": "Effective depth",
        "unit": "mm"
      },
      {
        "key": "fck",
        "label": "Concrete grade",
        "unit": "N/sqmm"
      }
    ],
    "calcInputs": [
      {
        "key": "Mu",
        "label": "Factored moment",
        "unit": "kN·m",
        "defaultValue": 21.4
      },
      {
        "key": "b",
        "label": "Width",
        "unit": "mm",
        "defaultValue": 1000
      },
      {
        "key": "d",
        "label": "Effective depth",
        "unit": "mm",
        "defaultValue": 105
      },
      {
        "key": "fck",
        "label": "fck",
        "unit": "N/sqmm",
        "defaultValue": 20
      },
      {
        "key": "fy",
        "label": "fy",
        "unit": "N/sqmm",
        "defaultValue": null
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-05",
    "name": "Short column axial load capacity",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Likely",
    "reference": "IS 456:2000 cl.39.3",
    "unit": "kN",
    "example": "P_u = 0.4 f_ck A_c + 0.67 f_y A_sc\n  A_c  = gross area − steel area\n  A_sc = area of longitudinal steel\n\nValid for short columns with minimum eccentricity only.\nSlenderness: short if effective length ÷ least lateral dimension < 12\nMinimum steel 0.8% · Maximum 6% (4% practical for lapping)\nMinimum 4 bars (rectangular), 6 bars (circular); minimum bar dia 12 mm",
    "workedExample": "Column 230 × 450, M25, Fe500, 6 nos 16 mm\nAsc = 6 × 201 = 1,206 sqmm (1.17% ✓ between 0.8 and 6)\nAg = 103,500; Ac = 102,294\nPu = 0.4 × 25 × 102,294 + 0.67 × 500 × 1,206\n   = 1,022,940 + 404,010 = 1,426,950 N = 1,427 kN\nService capacity = 1,427 ÷ 1.5 = 951 kN",
    "note": "[Likely] This formula assumes a SHORT column with minimal eccentricity. Check slenderness first: a 230 mm column with 3.2 m effective length has a ratio of 13.9 — that is slender, and this formula over-estimates its capacity. Your spec F10 states \"short column, axial load\" which is correct, but the engine must also return a slenderness warning.",
    "tags": [
      "column",
      "axial",
      "capacity",
      "is 456",
      "slenderness",
      "design"
    ],
    "variables": [
      {
        "key": "fck",
        "label": "Concrete grade",
        "unit": "N/sqmm"
      },
      {
        "key": "fy",
        "label": "Steel grade",
        "unit": "N/sqmm"
      },
      {
        "key": "Ag",
        "label": "Gross area",
        "unit": "sqmm"
      }
    ],
    "calcInputs": [
      {
        "key": "b",
        "label": "Width",
        "unit": "mm",
        "defaultValue": 230
      },
      {
        "key": "D",
        "label": "Depth",
        "unit": "mm",
        "defaultValue": 450
      },
      {
        "key": "fck",
        "label": "fck",
        "unit": "N/sqmm",
        "defaultValue": 25
      },
      {
        "key": "fy",
        "label": "fy",
        "unit": "N/sqmm",
        "defaultValue": 500
      },
      {
        "key": "n",
        "label": "No. of bars",
        "unit": "nos",
        "defaultValue": 6
      },
      {
        "key": "dia",
        "label": "Bar dia",
        "unit": "mm",
        "defaultValue": 16
      },
      {
        "key": "le",
        "label": "Effective length",
        "unit": "m",
        "defaultValue": 3.2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "DESIGN-06",
    "name": "Chennai design parameters — seismic and wind",
    "categoryKey": "DESIGN",
    "type": "Design",
    "confidence": "Verify",
    "reference": "IS 1893 Pt.1:2016 · IS 875 Pt.3:2015",
    "unit": "—",
    "example": "Chennai — Seismic Zone III, zone factor Z = 0.16\n  Importance factor I = 1.0 (residential) / 1.2 (important structures)\n  Response reduction R = 3 (OMRF) / 5 (SMRF)\n  Base shear V_B = A_h × W,  A_h = (Z/2)(I/R)(S_a/g)\n\nBasic wind speed for Chennai ≈ 50 m/s\n  Design wind pressure p_z = 0.6 × V_z²  (N/sqm), V_z = V_b·k1·k2·k3·k4",
    "workedExample": "Chennai G+2 residential, Z = 0.16, I = 1.0, R = 3, Sa/g = 2.5 (short period, medium soil)\nA_h = (0.16/2) × (1.0/3) × 2.5 = 0.0667\nIf seismic weight W = 4,500 kN → base shear = 300 kN",
    "note": "⚠ [Verify against current IS 1893 and IS 875 Part 3 maps] Zone and wind-speed assignments are revised periodically and my information may be outdated. Confirm from a current code copy or from your structural consultant before any design. For G+2 residential in Chennai, seismic detailing (ductile detailing per IS 13920) is what matters in practice more than the base shear number.",
    "tags": [
      "seismic",
      "wind",
      "chennai",
      "zone iii",
      "is 1893",
      "is 875",
      "design"
    ],
    "variables": [
      {
        "key": "Z",
        "label": "Zone factor",
        "unit": "—"
      },
      {
        "key": "V_b",
        "label": "Basic wind speed",
        "unit": "m/s"
      }
    ],
    "calcInputs": [
      {
        "key": "Z",
        "label": "Zone factor Z",
        "unit": "—",
        "defaultValue": 0.16
      },
      {
        "key": "I",
        "label": "Importance I",
        "unit": "—",
        "defaultValue": 1
      },
      {
        "key": "Rf",
        "label": "Response R",
        "unit": "—",
        "defaultValue": 3
      },
      {
        "key": "sa",
        "label": "Sa/g",
        "unit": "—",
        "defaultValue": 2.5
      },
      {
        "key": "W",
        "label": "Seismic weight",
        "unit": "kN",
        "defaultValue": 4500
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "LAB-05",
    "name": "Crew-days and cost from the VL Rate Card",
    "categoryKey": "LAB",
    "type": "Labour",
    "confidence": "Likely",
    "reference": "VL Master Rate Card 2026",
    "unit": "days · INR",
    "example": "Crew-days  = Quantity ÷ Daily output of the stated crew\nMan-days   = Crew-days × Crew size\nCalendar   = Crew-days ÷ Number of crews deployed\nCost       = Quantity × VL rate\n\nOutput and crew are taken from the rate card entry itself — not from a generic table.",
    "workedExample": "Red brick masonry 9 in, 1,200 sqft\nRate card: 1 mason + 1 helper, 55–90 sqft/day, VL ₹210/sqft\nCrew-days = 1200 ÷ 72.5 (mid) = 16.6 days\nMan-days  = 16.6 × 2 = 33.1\nWith 2 crews = 8.3 calendar days\nCost = 1200 × 210 = ₹2,52,000",
    "note": "This replaces the generic trade ranges in LAB-01 and LAB-02 with your own published figures. Where the two disagree, the rate card wins — it is your data. Note the rate card carries 167 services all at status PROPOSED: the productivity figures are still estimates until SiteOps confirms them (Loop 02).",
    "tags": [
      "labour",
      "rate card",
      "productivity",
      "crew",
      "vertical living",
      "cost",
      "schedule"
    ],
    "variables": [
      {
        "key": "Q",
        "label": "Quantity of work",
        "unit": "service unit"
      },
      {
        "key": "O",
        "label": "Crew output per day",
        "unit": "unit/day"
      },
      {
        "key": "n",
        "label": "Crews deployed",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "s",
        "label": "Service",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "service unit",
        "defaultValue": 1200
      },
      {
        "key": "pos",
        "label": "Output position",
        "unit": "0=slow 1=fast",
        "defaultValue": 0.5
      },
      {
        "key": "n",
        "label": "Crews deployed",
        "unit": "nos",
        "defaultValue": 2
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-06",
    "name": "Rate-card pricing and margin position",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "VL Master Rate Card 2026",
    "unit": "INR",
    "example": "Quote value      = Quantity × VL rate\nBand position    = (VL rate − Low) ÷ (High − Low) × 100\nMargin headroom  = (High − VL) ÷ VL × 100\nExposure if low  = (VL − Low) × Quantity\n\nBand position near 0% = priced at the bottom of the market\nBand position near 100% = priced at the top of the market",
    "workedExample": "Interior standard emulsion, 7,680 sqft\nVL ₹30/sqft, band ₹24–₹32\nBand position = (30 − 24) ÷ (32 − 24) × 100 = 75%\nQuote = 7,680 × 30 = ₹2,30,400\nIf a competitor quotes at the ₹24 floor: ₹1,84,320 — a ₹46,080 gap you must justify on spec, not on price.",
    "note": "[Verify] All 167 rate-card services are at status PROPOSED with confidence SOURCE / RESEARCH / DERIVED. Before a rate goes into a client quotation, check what it was derived from: 67 came from the uploaded Excel, 45 from research, 55 were derived. A DERIVED rate has never been tested against an actual job.",
    "tags": [
      "rate card",
      "pricing",
      "margin",
      "quotation",
      "band",
      "vertical living"
    ],
    "variables": [
      {
        "key": "VL",
        "label": "Your rate",
        "unit": "INR/unit"
      },
      {
        "key": "Low,High",
        "label": "Market band",
        "unit": "INR/unit"
      },
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "unit"
      }
    ],
    "calcInputs": [
      {
        "key": "s",
        "label": "Service",
        "unit": null,
        "defaultValue": null
      },
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "service unit",
        "defaultValue": 7680
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CONC-13",
    "name": "Mix fraction reconciliation check (engine guard)",
    "categoryKey": "CONC",
    "type": "Quality",
    "confidence": "Certain",
    "reference": "Arithmetic identity",
    "unit": "—",
    "example": "For any nominal mix c : s : a with Σ = c + s + a\n\n  cement fraction + sand fraction + aggregate fraction\n= c/Σ + s/Σ + a/Σ\n= 1.000   ALWAYS\n\nEngine guard:  assert(|Σfractions − 1| < 0.001)\nIf the three fractions do not sum to 1, the ratio array is being indexed wrongly.",
    "workedExample": "M20 = 1 : 1.5 : 3, Σ = 5.5\n1/5.5 + 1.5/5.5 + 3/5.5 = 0.1818 + 0.2727 + 0.5455 = 1.0000 ✓\n\nFAILING CASE — ratio stored as [1, 1.5, 3, 5.5] and summed as r[1]+r[2]+r[3]:\nΣ = 1.5 + 3 + 5.5 = 10\n1/10 + 1.5/10 + 3/10 = 0.55 ✗  → 45% of the material is missing",
    "note": "This is a three-line guard that would have caught the single most expensive defect found in the Cost Calculator. Add it to concrete.js, plastering.js, brickwork.js and masonryBlock.js — every module that splits a dry volume by a ratio. See the Engine Defects tab.",
    "tags": [
      "guard",
      "assertion",
      "reconciliation",
      "mix",
      "quality",
      "engine",
      "defect"
    ],
    "variables": [
      {
        "key": "c,s,a",
        "label": "Mix parts",
        "unit": "—"
      },
      {
        "key": "Σ",
        "label": "Sum of parts",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "c",
        "label": "Cement part",
        "unit": "—",
        "defaultValue": 1
      },
      {
        "key": "s",
        "label": "Sand part",
        "unit": "—",
        "defaultValue": 1.5
      },
      {
        "key": "a",
        "label": "Aggregate part",
        "unit": "—",
        "defaultValue": 3
      },
      {
        "key": "sum",
        "label": "Divisor used by code",
        "unit": "—",
        "defaultValue": 5.5
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CEIL-01",
    "name": "Gypsum false ceiling — framework and boards",
    "categoryKey": "CEIL",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2095 / manufacturer",
    "unit": "sqft · nos",
    "example": "Board area     = Ceiling area × (1 + wastage 8–12%)\nBoards (8×4 ft) = ⌈Board area ÷ 32⌉\nGI perimeter channel = Room perimeter\nGI intermediate channel ≈ Area ÷ 4  (at 1,220 mm centres)\nCeiling section ≈ Area ÷ 1.5        (at 457 mm centres)\nSoffit cleat + rod ≈ 1 per 1.2 sqm\nDrywall screws ≈ 25 – 30 nos per board · Jointing compound ≈ 0.35 kg/sqm",
    "workedExample": "Living room 20 × 16 ft = 320 sqft, perimeter 72 rft\nBoards = 320 × 1.10 ÷ 32 = 11 nos\nIntermediate channel = 320 ÷ 4 = 80 rft · Ceiling section = 320 ÷ 1.5 = 213 rft\nVL rate: plain gypsum ceiling ₹120/sqft → ₹38,400 (crew 3–4, 200–350 sqft/day → 1–2 days)",
    "note": "[Verify with your ceiling contractor] Framework spacing drives both cost and sag. At 610 mm ceiling-section centres instead of 457 mm you save about 8% on framework and buy a visible sag within two summers. Specify centres in the work order.",
    "tags": [
      "false ceiling",
      "gypsum",
      "framework",
      "interior",
      "boards"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Ceiling area",
        "unit": "sqft"
      },
      {
        "key": "P",
        "label": "Perimeter",
        "unit": "rft"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Room length",
        "unit": "ft",
        "defaultValue": 20
      },
      {
        "key": "B",
        "label": "Room width",
        "unit": "ft",
        "defaultValue": 16
      },
      {
        "key": "w",
        "label": "Board wastage",
        "unit": "%",
        "defaultValue": 10
      },
      {
        "key": "r",
        "label": "VL rate",
        "unit": "INR/sqft",
        "defaultValue": 120
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "CEIL-02",
    "name": "Gypsum stud partition — studs, track and boards",
    "categoryKey": "CEIL",
    "type": "Material",
    "confidence": "Verify",
    "reference": "IS 2095 Pt.1 / manufacturer",
    "unit": "sqft · nos",
    "example": "Board area  = Partition area × 2 faces × layers × (1 + wastage)\nBoards      = ⌈Board area ÷ 32⌉\nFloor + ceiling track = 2 × partition length\nStuds       = ⌈Length(mm) ÷ stud spacing⌉ + 1   (spacing 407 / 457 / 610 mm)\nRockwool (if acoustic) = Partition area, 50 mm at 48 kg/cum\nScrews ≈ 35 per sqm · Jointing tape = 2.5 × partition length",
    "workedExample": "Partition 12 ft × 10 ft = 120 sqft, single layer both faces, studs at 457 mm\nBoard area = 120 × 2 × 1 × 1.10 = 264 sqft → 9 boards\nStuds = ⌈(12 × 304.8) ÷ 457⌉ + 1 = ⌈8.0⌉ + 1 = 10 nos · Track = 24 rft\nVL rate ₹145/sqft → ₹17,400 (crew 3–4, 180–300 sqft/day)",
    "note": "[Verify] A gypsum partition weighs roughly 25–30 kg/sqm against 200 kg/sqm for 115 mm brickwork. On an upper floor or a renovation that is the difference between needing a structural check and not. It is also the reason it cannot carry a wall-hung WC without a backing plate.",
    "tags": [
      "partition",
      "gypsum",
      "drywall",
      "studs",
      "interior",
      "dead load"
    ],
    "variables": [
      {
        "key": "L,H",
        "label": "Partition length and height",
        "unit": "ft"
      },
      {
        "key": "s",
        "label": "Stud spacing",
        "unit": "mm"
      },
      {
        "key": "n",
        "label": "Layers per face",
        "unit": "nos"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Length",
        "unit": "ft",
        "defaultValue": 12
      },
      {
        "key": "H",
        "label": "Height",
        "unit": "ft",
        "defaultValue": 10
      },
      {
        "key": "lay",
        "label": "Layers per face",
        "unit": "nos",
        "defaultValue": 1
      },
      {
        "key": "sp",
        "label": "Stud spacing",
        "unit": "mm",
        "defaultValue": 457
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 10
      },
      {
        "key": "r",
        "label": "VL rate",
        "unit": "INR/sqft",
        "defaultValue": 145
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "FAB-01",
    "name": "MS fabrication weight from sections",
    "categoryKey": "FAB",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 808:1989 · IS 1732",
    "unit": "kg",
    "example": "Weight = Σ (Length × Unit weight of section)\n\nUnit weights (kg/m):\n  MS square tube 25×25×2 mm  1.43 · 40×40×2 mm  2.36\n  MS flat 25×5 mm 0.98 · 40×6 mm 1.88\n  MS angle 25×25×3 mm 1.11 · 40×40×5 mm 2.90\n  MS round bar 12 mm 0.888 · 16 mm 1.58\n  MS square bar 12 mm 1.13 · 16 mm 2.01\n\nAdd 5% for welds, cleats and wastage; add primer 1 coat at 12 sqm/litre",
    "workedExample": "Balcony railing 20 rft = 6.1 m, 1.0 m high\nVerticals at 125 mm: 49 nos × 1.0 m of 12 mm square bar = 49 × 1.13 = 55.4 kg\nTop & bottom rail: 2 × 6.1 m of 40×40×2 tube = 12.2 × 2.36 = 28.8 kg\nTotal = 84.2 kg + 5% = 88.4 kg\nAt VL fabrication ₹145/kg = ₹12,818 — cross-check against the railing rate of ₹1,250/rft × 20 = ₹25,000",
    "note": "The rate card prices railing two ways: by weight (₹145/kg, MS fabrication) and by running foot (₹1,250/rft, MS railing). For the example above those give ₹12,800 and ₹25,000. The rft rate includes design, installation, finish and margin; the kg rate is fabrication only. Quote one or the other — never let a contractor pick whichever is higher per item.",
    "tags": [
      "fabrication",
      "ms",
      "railing",
      "grill",
      "steel sections",
      "weight"
    ],
    "variables": [
      {
        "key": "L",
        "label": "Total section length",
        "unit": "m"
      },
      {
        "key": "w",
        "label": "Unit weight",
        "unit": "kg/m"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Railing length",
        "unit": "rft",
        "defaultValue": 20
      },
      {
        "key": "H",
        "label": "Height",
        "unit": "m",
        "defaultValue": 1
      },
      {
        "key": "sp",
        "label": "Vertical spacing",
        "unit": "mm",
        "defaultValue": 125
      },
      {
        "key": "wv",
        "label": "Vertical unit wt",
        "unit": "kg/m",
        "defaultValue": 1.13
      },
      {
        "key": "wr",
        "label": "Rail unit wt",
        "unit": "kg/m",
        "defaultValue": 2.36
      },
      {
        "key": "nr",
        "label": "No. of rails",
        "unit": "nos",
        "defaultValue": 2
      },
      {
        "key": "rk",
        "label": "Rate per kg",
        "unit": "INR",
        "defaultValue": 145
      },
      {
        "key": "rf",
        "label": "Rate per rft",
        "unit": "INR",
        "defaultValue": 1250
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "ROOF-01",
    "name": "Metal roofing sheets with overlap",
    "categoryKey": "ROOF",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 277:2018 / manufacturer",
    "unit": "sqft · nos",
    "example": "Sloped area  = Plan area × √(1 + slope²)      slope as rise/run\nSheets       = ⌈Sloped area ÷ Effective sheet area⌉\nEffective width = Sheet width − side lap (usually one rib, ≈ 75 mm)\nEnd lap      = 150 – 200 mm where sheets are joined\nSelf-drilling screws ≈ 8 – 10 per sqm · Ridge cap = ridge length × 1.1\nMinimum pitch: trapezoidal profile 1 in 12 (≈5°)",
    "workedExample": "Car porch 16 × 12 ft = 192 sqft plan, slope 1:6 (rise 0.167)\nSloped area = 192 × √(1 + 0.0278) = 192 × 1.0138 = 194.6 sqft\nSheets 1,050 mm cover width × 12 ft long = 3.44 sqft/ft × 12 = 41.3 sqft each\nSheets = ⌈194.6 ÷ 41.3⌉ = 5 nos + screws 8 × 18.1 sqm = 145 nos\nVL rate ₹125/sqft (fixing on existing frame) = ₹24,000 — frame is extra",
    "note": "The rate card prices sheet fixing \"on existing frame\" only. The MS frame underneath is a separate fabrication item at ₹145/kg and is usually 40–60% of the total roof cost. Quoting only the sheet rate is the most common under-quote in car porch and terrace-cover work.",
    "tags": [
      "roofing",
      "sheet",
      "gi",
      "ppgi",
      "slope",
      "overlap",
      "car porch"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Plan area",
        "unit": "sqft"
      },
      {
        "key": "s",
        "label": "Slope rise/run",
        "unit": "—"
      },
      {
        "key": "W",
        "label": "Sheet width",
        "unit": "mm"
      }
    ],
    "calcInputs": [
      {
        "key": "L",
        "label": "Plan length",
        "unit": "ft",
        "defaultValue": 16
      },
      {
        "key": "B",
        "label": "Plan width",
        "unit": "ft",
        "defaultValue": 12
      },
      {
        "key": "ri",
        "label": "Slope rise per 1 run",
        "unit": "—",
        "defaultValue": 0.167
      },
      {
        "key": "cw",
        "label": "Sheet cover width",
        "unit": "mm",
        "defaultValue": 1050
      },
      {
        "key": "sl",
        "label": "Sheet length",
        "unit": "ft",
        "defaultValue": 12
      },
      {
        "key": "r",
        "label": "VL rate",
        "unit": "INR/sqft",
        "defaultValue": 125
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "EXT-01",
    "name": "Paver block quantity and bedding",
    "categoryKey": "EXT",
    "type": "Material",
    "confidence": "Likely",
    "reference": "IS 15658:2006",
    "unit": "nos · cft",
    "example": "Pavers per sqm = 1 ÷ (paver length × paver width)\n  Zig-zag 225×112 mm → 1 ÷ 0.0252 = 39.7 ≈ 40 nos/sqm\n  Rectangle 200×100 mm → 50 nos/sqm\nPavers = Area × per sqm × (1 + wastage 3–5%)\nBedding sand 30 – 40 mm = Area × 0.035 cum\nJoint filling sand ≈ Area × 0.005 cum\nThickness: footpath 60 mm · car park 80 mm · heavy vehicle 100 mm",
    "workedExample": "Driveway 40 sqm, 80 mm zig-zag pavers\nPavers = 40 × 39.7 × 1.04 = 1,652 nos\nBedding sand = 40 × 0.035 = 1.40 cum = 49.4 cft\nVL rate (complete, paver included) ₹145/sqft × 430 sqft = ₹62,350",
    "note": "[Verify paver size with the supplier] Specify the paver thickness by traffic, not by price. A 60 mm paver under a car will crack at the wheel path within a year — the ₹12/sqft saved comes back as a relaying bill at ₹65/sqft.",
    "tags": [
      "paver",
      "driveway",
      "external",
      "bedding sand",
      "is 15658"
    ],
    "variables": [
      {
        "key": "A",
        "label": "Paved area",
        "unit": "sqm"
      },
      {
        "key": "l,b",
        "label": "Paver size",
        "unit": "m"
      }
    ],
    "calcInputs": [
      {
        "key": "A",
        "label": "Paved area",
        "unit": "sqm",
        "defaultValue": 40
      },
      {
        "key": "l",
        "label": "Paver length",
        "unit": "mm",
        "defaultValue": 225
      },
      {
        "key": "b",
        "label": "Paver width",
        "unit": "mm",
        "defaultValue": 112
      },
      {
        "key": "w",
        "label": "Wastage",
        "unit": "%",
        "defaultValue": 4
      },
      {
        "key": "bd",
        "label": "Bedding thickness",
        "unit": "mm",
        "defaultValue": 35
      },
      {
        "key": "r",
        "label": "VL rate",
        "unit": "INR/sqft",
        "defaultValue": 145
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "MISC-01",
    "name": "Demolition debris volume and disposal loads",
    "categoryKey": "EXT",
    "type": "Material",
    "confidence": "Verify",
    "reference": "Trade practice",
    "unit": "cum · loads",
    "example": "Debris volume = Σ (Element volume × Bulking factor)\n  Brick masonry rubble 1.6 – 1.8 · Concrete rubble 1.5 – 1.7\n  Tile + mortar 1.4 – 1.6 · Plaster 1.5\nLoads = ⌈Debris volume ÷ Load capacity⌉\nMini tipper ≈ 3 cum · Standard tipper ≈ 5 cum",
    "workedExample": "Renovation: remove 400 sqft tile flooring (25 mm bed) + demolish 150 sqft of 4.5 in wall\nTile + bed = 400 × 0.0929 × 0.04 = 1.49 cum → × 1.5 = 2.23 cum\nWall = 150 × 0.0929 × 0.115 = 1.60 cum → × 1.7 = 2.72 cum\nTotal = 4.95 cum → 2 mini loads\nVL rate ₹5,500 per mini load = ₹11,000",
    "note": "[Verify] Every demolition line in the rate card says \"disposal extra\". On a renovation, debris disposal routinely reaches 8–12% of the total bill and is the item clients dispute most, because nobody mentioned it at quotation stage. Put it in the quote as a named line with an assumed number of loads.",
    "tags": [
      "debris",
      "demolition",
      "disposal",
      "renovation",
      "bulking",
      "loads"
    ],
    "variables": [
      {
        "key": "V",
        "label": "In-situ element volume",
        "unit": "cum"
      },
      {
        "key": "f",
        "label": "Bulking factor",
        "unit": "—"
      }
    ],
    "calcInputs": [
      {
        "key": "tA",
        "label": "Tile removal area",
        "unit": "sqft",
        "defaultValue": 400
      },
      {
        "key": "tT",
        "label": "Tile + bed thickness",
        "unit": "mm",
        "defaultValue": 40
      },
      {
        "key": "wA",
        "label": "Wall demolition area",
        "unit": "sqft",
        "defaultValue": 150
      },
      {
        "key": "wT",
        "label": "Wall thickness",
        "unit": "mm",
        "defaultValue": 115
      },
      {
        "key": "f",
        "label": "Bulking factor",
        "unit": "—",
        "defaultValue": 1.6
      },
      {
        "key": "cap",
        "label": "Load capacity",
        "unit": "cum",
        "defaultValue": 3
      },
      {
        "key": "r",
        "label": "Rate per load",
        "unit": "INR",
        "defaultValue": 5500
      }
    ],
    "costCalculatorCategoryKey": null
  },
  {
    "formulaCode": "COST-07",
    "name": "Quantity to cost — material rate bridge",
    "categoryKey": "COST",
    "type": "Cost",
    "confidence": "Verify",
    "reference": "RateSync / Chennai May 2026",
    "unit": "INR",
    "example": "Line cost = Quantity × Unit rate\nSection cost = Σ line costs\n\nMaterial rate basis currently in the Cost Calculator (Chennai, May 2026):\n  Cement ₹390/bag · River sand ₹35/cft · M-sand ₹30/cft · 20 mm aggregate ₹34/cft\n  Solid brick ₹9 · Hollow brick ₹11 · AAC block ₹50 · Steel Fe500 ₹60/kg\n  Vitrified tile ₹55/sqft · Interior emulsion ₹210/l · Primer ₹120/l\n  Liquid waterproofing ₹180/kg · PVC 4 in pipe ₹280/m",
    "workedExample": "M20 concrete, 10 cum (from CONC-02 with 3% wastage)\nCement 84 bags × ₹390 = ₹32,760\nSand 152.8 cft × ₹30 = ₹4,584\nAggregate 305.5 cft × ₹34 = ₹10,387\nMaterial total = ₹47,731 → ₹4,773 per cum",
    "note": "⚠ [Verify] These rates are dated May 2026 and are hard-coded inside the Cost Calculator HTML. That is the wrong place for them. Rates belong in RateSync, pulled at BOQ generation time — which is exactly what your own BOQ Engine Spec §3.5 already says. A hard-coded rate silently ages; a RateSync rate carries a lastUpdated date and a stale-rate alert.",
    "tags": [
      "rates",
      "costing",
      "ratesync",
      "material",
      "bridge",
      "chennai"
    ],
    "variables": [
      {
        "key": "Q",
        "label": "Quantity",
        "unit": "unit"
      },
      {
        "key": "r",
        "label": "Unit rate",
        "unit": "INR/unit"
      }
    ],
    "calcInputs": [
      {
        "key": "cb",
        "label": "Cement",
        "unit": "bags",
        "defaultValue": 84
      },
      {
        "key": "sa",
        "label": "Sand",
        "unit": "cft",
        "defaultValue": 152.8
      },
      {
        "key": "ag",
        "label": "Aggregate",
        "unit": "cft",
        "defaultValue": 305.5
      },
      {
        "key": "st",
        "label": "Steel",
        "unit": "kg",
        "defaultValue": 0
      },
      {
        "key": "br",
        "label": "Bricks",
        "unit": "nos",
        "defaultValue": 0
      },
      {
        "key": "rc",
        "label": "Cement rate",
        "unit": "INR/bag",
        "defaultValue": 390
      },
      {
        "key": "rs",
        "label": "Sand rate",
        "unit": "INR/cft",
        "defaultValue": 30
      },
      {
        "key": "ra",
        "label": "Aggregate rate",
        "unit": "INR/cft",
        "defaultValue": 34
      },
      {
        "key": "rt",
        "label": "Steel rate",
        "unit": "INR/kg",
        "defaultValue": 60
      },
      {
        "key": "rb",
        "label": "Brick rate",
        "unit": "INR/no",
        "defaultValue": 9
      }
    ],
    "costCalculatorCategoryKey": null
  }
];