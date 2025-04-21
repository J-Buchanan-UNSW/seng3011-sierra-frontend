export type ESGDimension = 'environmental' | 'social' | 'governance';
export type ESGDimensionShort = 'E' | 'S' | 'G';

export interface ESGScore {
  environmental: number;
  social: number;
  governance: number;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  scores: ESGScore;
  coordinates: [number, number];
  zoom: number;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  countryId: string;
  coordinates: [number, number];
  scores: ESGScore;
  description: string;
  logo?: string;
  foundedYear: number;
  employees: number;
  revenue: string;
}

export interface MapGeography {
  type: string;
  rsmKey: string;
  id: string;
  properties: {
    name: string;
    ISO_A3: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}