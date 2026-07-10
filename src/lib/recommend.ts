export type SoilType = 'Sandy' | 'Loamy' | 'Black' | 'Red' | 'Clayey';
export type CropType =
  | 'Maize'
  | 'Sugarcane'
  | 'Cotton'
  | 'Tobacco'
  | 'Paddy'
  | 'Barley'
  | 'Wheat'
  | 'Millets'
  | 'Oil seeds'
  | 'Pulses'
  | 'Ground Nuts';

export interface FertilizerInput {
  temperature: number;
  humidity: number;
  moisture: number;
  soilType: SoilType;
  cropType: CropType;
  nitrogen: number;
  potassium: number;
  phosphorous: number;
}

export interface FertilizerResult {
  name: string;
  shortName: string;
  category: 'Balanced NPK' | 'Nitrogen-rich' | 'Phosphorus-rich' | 'Potassium-rich' | 'Organic' | 'Micronutrient';
  npkRatio: string;
  confidence: number;
  applicationRate: string;
  timing: string;
  method: string;
  benefits: string[];
  precautions: string[];
  soilFit: string;
  cropFit: string;
  adjustments: string[];
}

const fertilizerLibrary: Record<string, Omit<FertilizerResult, 'confidence' | 'adjustments'>> = {
  urea: {
    name: 'Urea (46-0-0)',
    shortName: 'Urea',
    category: 'Nitrogen-rich',
    npkRatio: '46-0-0',
    applicationRate: '45–65 kg per hectare, split into 2–3 doses',
    timing: 'Apply 30% at sowing, 30% at tillering, 40% at pre-flowering',
    method: 'Broadcast or band placement 5–7 cm beside rows, followed by light irrigation',
    benefits: [
      'Highest nitrogen concentration (46%) for rapid vegetative growth',
      'Cost-effective and widely available',
      'Improves leaf size, chlorophyll and protein synthesis',
    ],
    precautions: [
      'Avoid surface application on Sandy soil without irrigation — nitrogen leaches fast',
      'Keep away from seeds to prevent toxicity',
      'Incorporate into soil within 24h to minimize volatilization losses',
    ],
    soilFit: 'Best on Loamy and Black soils; needs careful split dosing on Sandy soil.',
    cropFit: 'Ideal for nitrogen-hungry cereals like Maize, Wheat, Paddy and Sugarcane.',
  },
  dap: {
    name: 'Diammonium Phosphate (18-46-0)',
    shortName: 'DAP',
    category: 'Phosphorus-rich',
    npkRatio: '18-46-0',
    applicationRate: '50–125 kg per hectare as basal dose',
    timing: 'Apply entirely as a basal dose at sowing or before transplanting',
    method: 'Band placement 5 cm below and 3–5 cm beside the seed row',
    benefits: [
      'High phosphorus (46%) drives strong root development',
      '18% nitrogen gives early seedling vigor',
      'Excellent starter fertilizer for most crops',
    ],
    precautions: [
      'Do not place in direct contact with seed — ammonia can burn germination',
      'In acidic Red soils, phosphorus fixation reduces availability — apply with organic matter',
      'Store in dry conditions; it is hygroscopic',
    ],
    soilFit: 'Strong on Loamy and Black soils; pair with organic matter on Red and Sandy soils.',
    cropFit: 'Great basal fertilizer for Wheat, Maize, Paddy, Pulses and Oil seeds.',
  },
  mop: {
    name: 'Muriate of Potash (0-0-60)',
    shortName: 'MOP',
    category: 'Potassium-rich',
    npkRatio: '0-0-60',
    applicationRate: '25–80 kg per hectare, as basal or split dose',
    timing: 'Apply 50% as basal, 50% at the onset of flowering',
    method: 'Broadcast and incorporate into the root zone before sowing',
    benefits: [
      '60% potassium improves drought tolerance and disease resistance',
      'Enhances grain filling, fruit size and stalk strength',
      'Critical for high-moisture Clayey and Black soils',
    ],
    precautions: [
      'Avoid on Sandy soils with high leaching — use smaller split doses',
      'Chloride-sensitive crops (Tobacco, some fruits) prefer Sulphate of Potash instead',
      'Do not mix with Calcium Ammonium Nitrate in storage',
    ],
    soilFit: 'Essential on Clayey and Black soils; split lightly on Sandy soils.',
    cropFit: 'Best for Sugarcane, Cotton, Wheat and Paddy under potassium stress.',
  },
  npk101026: {
    name: 'NPK 10-10-26 Complex',
    shortName: 'NPK 10-10-26',
    category: 'Balanced NPK',
    npkRatio: '10-10-26',
    applicationRate: '75–150 kg per hectare as basal + top dressing',
    timing: '60% basal at sowing, 40% top dressing at 30–45 days',
    method: 'Broadcast uniformly and incorporate before sowing',
    benefits: [
      'Balanced N and P with elevated potassium for flowering crops',
      'Simplifies nutrition with a single application',
      'Improves yield quality and stress tolerance',
    ],
    precautions: [
      'Supplement nitrogen if crop demand is high (e.g. Maize, Sugarcane)',
      'Test soil potassium before applying to avoid over-application',
      'Keep dry to prevent caking',
    ],
    soilFit: 'Versatile across Loamy, Black and Clayey soils.',
    cropFit: 'Suited for Wheat, Millets, Paddy and Cotton.',
  },
  npk202020: {
    name: 'NPK 20-20-20 Complex',
    shortName: 'NPK 20-20-20',
    category: 'Balanced NPK',
    npkRatio: '20-20-20',
    applicationRate: '75–125 kg per hectare',
    timing: '50% basal, 50% split at 25–40 days after sowing',
    method: 'Broadcast and incorporate, or band placement beside rows',
    benefits: [
      'Fully balanced NPK for all-round nutrition',
      'Excellent for soils with broad-spectrum deficiencies',
      'Supports both vegetative and reproductive stages',
    ],
    precautions: [
      'May over-supply a nutrient if soil already has high levels — soil test first',
      'Split doses on Sandy soils to prevent leaching',
      'Not ideal as a sole source for high-nitrogen cereals',
    ],
    soilFit: 'Works well on Loamy and Red soils with balanced fertility.',
    cropFit: 'Good general-purpose feed for Wheat, Barley, Millets and Oil seeds.',
  },
  ssp: {
    name: 'Single Super Phosphate (0-16-0)',
    shortName: 'SSP',
    category: 'Phosphorus-rich',
    npkRatio: '0-16-0',
    applicationRate: '100–250 kg per hectare as basal dose',
    timing: 'Apply as a basal dose 7–10 days before sowing',
    method: 'Broadcast and incorporate into the top 7–10 cm of soil',
    benefits: [
      '16% phosphorus plus calcium and sulphur (11%) for soil conditioning',
      'Ideal for Sulphur-deficient soils',
      'Improves oil content in oilseed crops',
    ],
    precautions: [
      'Less concentrated than DAP — requires higher volume',
      'In high-pH Black soils, phosphorus availability drops — apply with organic matter',
      'Do not mix with alkaline fertilizers',
    ],
    soilFit: 'Good on Red and Loamy soils; needs organic matter on Black soils.',
    cropFit: 'Excellent for Oil seeds, Pulses and Ground Nuts for oil and protein.',
  },
  can: {
    name: 'Calcium Ammonium Nitrate (25.5-0-0)',
    shortName: 'CAN',
    category: 'Nitrogen-rich',
    npkRatio: '25.5-0-0',
    applicationRate: '60–100 kg per hectare, split into 2–3 doses',
    timing: 'First dose at tillering, subsequent at 30 and 45 days',
    method: 'Broadcast followed by irrigation; safe near seedlings',
    benefits: [
      'Nitrate + ammonium blend for steady nitrogen release',
      'Adds calcium to improve soil structure',
      'Safer for seedlings than Urea',
    ],
    precautions: [
      'Not ideal for flooded Paddy — nitrate is lost via denitrification',
      'Hygroscopic — store sealed',
      'Slightly acidifies soil over time',
    ],
    soilFit: 'Strong on Loamy and Clayey soils; avoid flooded Paddy fields.',
    cropFit: 'Great for Wheat, Barley, Maize and Vegetables.',
  },
  compost: {
    name: 'Organic Compost / FYM',
    shortName: 'Compost',
    category: 'Organic',
    npkRatio: '~0.5-0.5-0.5',
    applicationRate: '8–12 tonnes per hectare as basal incorporation',
    timing: 'Apply 2–3 weeks before sowing and incorporate thoroughly',
    method: 'Broadcast and plough into the top 15 cm of soil',
    benefits: [
      'Improves soil structure, water retention and microbial life',
      'Releases nutrients slowly over the full crop cycle',
      'Reduces dependency on synthetic fertilizers',
    ],
    precautions: [
      'Use well-decomposed compost to avoid weed seeds and pathogens',
      'Nutrient content is low — pair with targeted NPK',
      'Apply well in advance for nutrient release',
    ],
    soilFit: 'Especially valuable on Sandy and Red soils to build organic matter.',
    cropFit: 'Beneficial for all crops; key for Pulses, Ground Nuts and Oil seeds.',
  },
  gypsum: {
    name: 'Gypsum (Calcium Sulphate)',
    shortName: 'Gypsum',
    category: 'Micronutrient',
    npkRatio: 'Ca-23, S-18',
    applicationRate: '200–500 kg per hectare as soil amendment',
    timing: 'Apply 2–3 weeks before sowing and incorporate',
    method: 'Broadcast and incorporate into the topsoil',
    benefits: [
      'Reclaims sodic and high-salt Black/Clayey soils',
      'Supplies calcium and sulphur without shifting pH',
      'Improves infiltration and aeration in compacted soils',
    ],
    precautions: [
      'Not a primary nutrient source — use alongside NPK',
      'Requires adequate drainage to remove displaced sodium',
      'Test soil for gypsum requirement before applying',
    ],
    soilFit: 'Critical amendment for Black and Clayey sodic soils.',
    cropFit: 'Supports Ground Nuts (pegging), Pulses and Sugarcane on problem soils.',
  },
  zinc: {
    name: 'Zinc Sulphate (21%)',
    shortName: 'Zinc Sulphate',
    category: 'Micronutrient',
    npkRatio: 'Zn-21, S-10',
    applicationRate: '20–25 kg per hectare as basal, or 0.5% foliar spray',
    timing: 'Basal at sowing, or 2 foliar sprays at tillering and pre-flowering',
    method: 'Incorporate into soil or spray on foliage in early morning',
    benefits: [
      'Corrects zinc deficiency common in high-pH and Sandy soils',
      'Prevents khaira disease in Paddy and chlorosis in Maize',
      'Boosts grain weight and overall vigour',
    ],
    precautions: [
      'Do not over-apply — zinc toxicity can occur',
      'Apply once in 2–3 crop cycles, not every season',
      'Avoid mixing with phosphatic fertilizers in the same band',
    ],
    soilFit: 'Essential on Sandy, Red and high-pH Black soils.',
    cropFit: 'Critical for Paddy, Maize and Wheat in deficient soils.',
  },
};

type LibKey = keyof typeof fertilizerLibrary;

const soilCropMatrix: Record<SoilType, Partial<Record<CropType, LibKey>>> = {
  Sandy: {
    Maize: 'urea',
    Sugarcane: 'npk101026',
    Cotton: 'npk202020',
    Tobacco: 'can',
    Paddy: 'urea',
    Barley: 'can',
    Wheat: 'npk202020',
    Millets: 'npk202020',
    'Oil seeds': 'ssp',
    Pulses: 'ssp',
    'Ground Nuts': 'gypsum',
  },
  Loamy: {
    Maize: 'urea',
    Sugarcane: 'mop',
    Cotton: 'npk101026',
    Tobacco: 'can',
    Paddy: 'urea',
    Barley: 'can',
    Wheat: 'dap',
    Millets: 'npk202020',
    'Oil seeds': 'ssp',
    Pulses: 'ssp',
    'Ground Nuts': 'gypsum',
  },
  Black: {
    Maize: 'dap',
    Sugarcane: 'mop',
    Cotton: 'mop',
    Tobacco: 'can',
    Paddy: 'urea',
    Barley: 'dap',
    Wheat: 'dap',
    Millets: 'npk101026',
    'Oil seeds': 'ssp',
    Pulses: 'ssp',
    'Ground Nuts': 'gypsum',
  },
  Red: {
    Maize: 'urea',
    Sugarcane: 'mop',
    Cotton: 'npk101026',
    Tobacco: 'can',
    Paddy: 'urea',
    Barley: 'can',
    Wheat: 'dap',
    Millets: 'npk202020',
    'Oil seeds': 'ssp',
    Pulses: 'ssp',
    'Ground Nuts': 'gypsum',
  },
  Clayey: {
    Maize: 'urea',
    Sugarcane: 'mop',
    Cotton: 'mop',
    Tobacco: 'can',
    Paddy: 'urea',
    Barley: 'dap',
    Wheat: 'dap',
    Millets: 'npk101026',
    'Oil seeds': 'ssp',
    Pulses: 'ssp',
    'Ground Nuts': 'gypsum',
  },
};

function npkStatus(n: number, p: number, k: number) {
  const low = (v: number) => v < 25;
  const high = (v: number) => v > 75;
  return {
    nLow: low(n),
    nHigh: high(n),
    pLow: low(p),
    pHigh: high(p),
    kLow: low(k),
    kHigh: high(k),
  };
}

export function recommendFertilizer(input: FertilizerInput): FertilizerResult {
  const baseKey = soilCropMatrix[input.soilType][input.cropType] ?? 'npk202020';
  const s = npkStatus(input.nitrogen, input.phosphorous, input.potassium);

  let key: LibKey = baseKey;
  const adjustments: string[] = [];

  // Override based on severe nutrient imbalance
  if (s.nLow && !s.pLow && !s.kLow) {
    key = 'urea';
    adjustments.push('Nitrogen is low — prioritizing a nitrogen-rich fertilizer.');
  } else if (s.pLow && !s.nLow && !s.kLow) {
    key = s.pHigh ? baseKey : 'dap';
    adjustments.push('Phosphorus is low — boosting phosphorus supply.');
  } else if (s.kLow && !s.nLow && !s.pLow) {
    key = 'mop';
    adjustments.push('Potassium is low — applying a potassium-rich fertilizer.');
  } else if (s.nLow && s.pLow && s.kLow) {
    key = 'npk202020';
    adjustments.push('All three macronutrients are low — a balanced NPK is recommended.');
  }

  // Environmental adjustments
  if (input.soilType === 'Sandy' && input.moisture > 60) {
    adjustments.push('High moisture on Sandy soil increases leaching — split fertilizer into smaller, frequent doses.');
  }
  if (input.temperature > 35) {
    adjustments.push('High temperature accelerates nitrogen volatilization — apply Urea/CAN in the cool part of the day with irrigation.');
  }
  if (input.humidity < 30) {
    adjustments.push('Low humidity stresses the crop — consider foliar nutrition and maintain adequate soil moisture.');
  }
  if (input.soilType === 'Black' || input.soilType === 'Clayey') {
    if (input.moisture > 70) {
      adjustments.push('Heavy, wet Black/Clayey soil risks denitrification — delay nitrogen top-dressing until drainage improves.');
    }
  }
  if (s.nHigh) adjustments.push('Nitrogen is already high — reduce N dose to avoid lodging and excessive vegetative growth.');
  if (s.pHigh) adjustments.push('Phosphorus is high — skip phosphatic basal dose this cycle to avoid fixation build-up.');
  if (s.kHigh) adjustments.push('Potassium is high — omit potash this cycle and re-test soil next season.');

  // Micronutrient flags
  if ((input.soilType === 'Sandy' || input.soilType === 'Red') && (input.cropType === 'Paddy' || input.cropType === 'Maize' || input.cropType === 'Wheat')) {
    adjustments.push('Zinc deficiency is common on this soil-crop combination — add Zinc Sulphate as a basal or foliar supplement.');
  }
  if (input.cropType === 'Ground Nuts' && (input.soilType === 'Black' || input.soilType === 'Clayey')) {
    adjustments.push('Apply Gypsum at pegging stage to improve pod development on heavy soils.');
  }

  // Organic recommendation on very low overall fertility
  if (input.nitrogen < 15 && input.phosphorous < 15 && input.potassium < 15) {
    adjustments.push('Severely depleted nutrients — incorporate Organic Compost/FYM to rebuild long-term soil fertility.');
  }

  const base = fertilizerLibrary[key];

  // Confidence: starts high, reduced by extreme conditions
  let confidence = 92;
  if (s.nLow || s.pLow || s.kLow) confidence -= 6;
  if (input.temperature > 38 || input.temperature < 8) confidence -= 5;
  if (input.humidity < 20 || input.humidity > 90) confidence -= 4;
  if (input.moisture < 15 || input.moisture > 85) confidence -= 4;
  confidence = Math.max(72, Math.min(96, confidence));

  return {
    ...base,
    confidence,
    adjustments: adjustments.length ? adjustments : ['Soil and crop parameters are within an optimal range — apply the standard recommendation.'],
  };
}

export const soilTypes: SoilType[] = ['Sandy', 'Loamy', 'Black', 'Red', 'Clayey'];
export const cropTypes: CropType[] = [
  'Maize', 'Sugarcane', 'Cotton', 'Tobacco', 'Paddy', 'Barley',
  'Wheat', 'Millets', 'Oil seeds', 'Pulses', 'Ground Nuts',
];
