import { ESGDimension, ESGDimensionShort, ESGScore } from '../types';

// Get color based on score and dimension
export const getColorByScore = (
  score: number,
  dimension: ESGDimension | ESGDimensionShort
): string => {
  // Normalize dimension string
  const dim = normalizeDimension(dimension);
  
  // Convert score (0-100) to color intensity (1-9)
  const intensity = Math.max(1, Math.min(9, Math.floor(score / 10)));
  
  // Return color based on dimension and intensity
  switch (dim) {
    case 'environmental':
      return `env-${intensity}00`;
    case 'social':
      return `soc-${intensity}00`;
    case 'governance':
      return `gov-${intensity}00`;
    default:
      return 'n/a';
  }
};

// Get color for specific dimension of ESG score
export const getScoreColor = (
  scores: ESGScore,
  dimension: ESGDimension | ESGDimensionShort
): string => {
  const dim = normalizeDimension(dimension);
  const score = scores[dim as ESGDimension];
  return getColorByScore(score, dim);
};

// Normalize dimension shorthand to full name
export const normalizeDimension = (
  dimension: ESGDimension | ESGDimensionShort
): ESGDimension => {
  switch (dimension) {
    case 'environmental':
      return 'environmental';
    case 'social':
      return 'social';
    case 'governance':
      return 'governance';
    default:
      return dimension as ESGDimension;
  }
};

// Get short name for dimension
export const getDimensionShort = (dimension: ESGDimension): ESGDimensionShort => {
  switch (dimension) {
    case 'environmental':
      return 'E';
    case 'social':
      return 'S';
    case 'governance':
      return 'G';
    default:
      return 'E';
  }
};

// Get full name for dimension short name
export const getDimensionFull = (short: ESGDimensionShort): ESGDimension => {
  switch (short) {
    case 'E':
      return 'environmental';
    case 'S':
      return 'social';
    case 'G':
      return 'governance';
    default:
      return 'environmental';
  }
};

// Get display name for dimension
export const getDimensionDisplayName = (
  dimension: ESGDimension | ESGDimensionShort
): string => {
  const dim = normalizeDimension(dimension);

  switch (dim) {
    case 'environmental':
      return 'Environmental';
    case 'social':
      return 'Social';
    case 'governance':
      return 'Governance';
    default:
      return 'Environmental';
  }
};

export const colorHexMap: Record<string, string> = {
  // Environmental
  'env-50': '#f0fdf4',
  'env-100': '#dcfce7',
  'env-200': '#bbf7d0',
  'env-300': '#86efac',
  'env-400': '#4ade80',
  'env-500': '#22c55e',
  'env-600': '#16a34a',
  'env-700': '#15803d',
  'env-800': '#166534',
  'env-900': '#14532d',
  'env-950': '#052e16',

  // Social
  'soc-50': '#eff6ff',
  'soc-100': '#dbeafe',
  'soc-200': '#bfdbfe',
  'soc-300': '#93c5fd',
  'soc-400': '#60a5fa',
  'soc-500': '#3b82f6',
  'soc-600': '#2563eb',
  'soc-700': '#1d4ed8',
  'soc-800': '#1e40af',
  'soc-900': '#1e3a8a',
  'soc-950': '#172554',

  // Governance
  'gov-50': '#fef2f2',
  'gov-100': '#fee2e2',
  'gov-200': '#fecaca',
  'gov-300': '#fca5a5',
  'gov-400': '#f87171',
  'gov-500': '#ef4444',
  'gov-600': '#dc2626',
  'gov-700': '#b91c1c',
  'gov-800': '#991b1b',
  'gov-900': '#7f1d1d',
  'gov-950': '#450a0a',
};