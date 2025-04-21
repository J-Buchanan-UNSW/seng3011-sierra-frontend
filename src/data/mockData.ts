import { Country, Company, ESGScore } from '../types';

// Generate random ESG scores
const generateRandomESGScore = (min = 20, max = 100): ESGScore => {
  return {
    environmental: Math.floor(Math.random() * (max - min) + min),
    social: Math.floor(Math.random() * (max - min) + min),
    governance: Math.floor(Math.random() * (max - min) + min),
  };
};

// Generate random coordinates within a country (relative positioning)
const generateRandomCoordinates = (): [number, number] => {
  // Random numbers in the range [-1, 1] to position within country bounds
  return [Math.random() * 2 - 1, Math.random() * 2 - 1];
};

// Create mock country data
export const mockCountries: Country[] = [
  {
    id: '1',
    name: 'United States',
    code: 'USA',
    scores: generateRandomESGScore(60, 90),
    coordinates: [-98.35, 39.50],
    zoom: 2.5,
  },
  {
    id: '2',
    name: 'Canada',
    code: 'CAN',
    scores: generateRandomESGScore(70, 95),
    coordinates: [-106.35, 56.13],
    zoom: 2.2,
  },
  {
    id: '3',
    name: 'United Kingdom',
    code: 'GBR',
    scores: generateRandomESGScore(65, 90),
    coordinates: [-3.43, 55.38],
    zoom: 4,
  },
  {
    id: '4',
    name: 'Germany',
    code: 'DEU',
    scores: generateRandomESGScore(75, 95),
    coordinates: [10.45, 51.17],
    zoom: 4.2,
  },
  {
    id: '5',
    name: 'France',
    code: 'FRA',
    scores: generateRandomESGScore(70, 90),
    coordinates: [2.21, 46.23],
    zoom: 4,
  },
  {
    id: '6',
    name: 'Japan',
    code: 'JPN',
    scores: generateRandomESGScore(65, 85),
    coordinates: [138.25, 36.20],
    zoom: 4.2,
  },
  {
    id: '7',
    name: 'Australia',
    code: 'AUS',
    scores: generateRandomESGScore(60, 85),
    coordinates: [134.49, -25.73],
    zoom: 2.5,
  },
  {
    id: '8',
    name: 'China',
    code: 'CHN',
    scores: generateRandomESGScore(40, 75),
    coordinates: [104.19, 35.86],
    zoom: 2.7,
  },
  {
    id: '9',
    name: 'India',
    code: 'IND',
    scores: generateRandomESGScore(35, 70),
    coordinates: [78.96, 22.97],
    zoom: 3.2,
  },
  {
    id: '10',
    name: 'Brazil',
    code: 'BRA',
    scores: generateRandomESGScore(45, 80),
    coordinates: [-51.92, -10.81],
    zoom: 2.7,
  },
];

// Create company names and industries
const companyNames = [
  'GlobalTech Solutions', 'EcoSystems Inc.', 'Sustainable Energy Corp',
  'GreenFuture Technologies', 'Social Impact Group', 'Ethical Investments Ltd',
  'Governance Partners', 'Climate Action Industries', 'Community First Corp',
  'Transparency Technologies', 'ResponsibleTech Inc.', 'EcoInnovate',
  'GreenEnergy Solutions', 'SocialGood Enterprises', 'FairTrade Industries',
  'EthicalTech Group', 'SustainableFuture Corp', 'CommunityBuilders Inc.',
  'EcoFriendly Systems', 'HumanCapital Partners'
];

const industries = [
  'Technology', 'Energy', 'Finance', 'Healthcare', 'Manufacturing',
  'Consumer Goods', 'Transportation', 'Agriculture', 'Telecommunications',
  'Retail', 'Utilities', 'Construction', 'Education', 'Real Estate'
];

// Generate random companies for each country
export const generateMockCompanies = (): Company[] => {
  const companies: Company[] = [];
  
  mockCountries.forEach(country => {
    // Generate 3-7 companies per country
    const numCompanies = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < numCompanies; i++) {
      const companyName = companyNames[Math.floor(Math.random() * companyNames.length)];
      const industry = industries[Math.floor(Math.random() * industries.length)];
      
      companies.push({
        id: `${country.id}-company-${i + 1}`,
        name: `${companyName} ${country.code}`,
        industry,
        countryId: country.id,
        coordinates: generateRandomCoordinates(),
        scores: generateRandomESGScore(),
        description: `A leading ${industry.toLowerCase()} company based in ${country.name}, focused on sustainable business practices and social responsibility.`,
        foundedYear: Math.floor(Math.random() * 70) + 1950,
        employees: Math.floor(Math.random() * 50000) + 500,
        revenue: `$${(Math.floor(Math.random() * 990) + 10) / 10}B`,
      });
    }
  });
  
  return companies;
};

export const mockCompanies = generateMockCompanies();

// Function to get companies by country ID
export const getCompaniesByCountry = (countryId: string): Company[] => {
  return mockCompanies.filter(company => company.countryId === countryId);
};

// Function to get a company by ID
export const getCompanyById = (companyId: string): Company | undefined => {
  return mockCompanies.find(company => company.id === companyId);
};

// Function to get a country by ID
export const getCountryById = (countryId: string): Country | undefined => {
  return mockCountries.find(country => country.id === countryId);
};

// Function to get a country by country code
export const getCountryByCode = (countryCode: string): Country | undefined => {
  return mockCountries.find(country => country.code === countryCode);
};