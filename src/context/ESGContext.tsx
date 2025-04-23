import React, { createContext, useContext, useState, useEffect } from 'react';
import { ESGDimension, Country, Company } from '../types';
import { getCompaniesByCountry } from '../data/mockData';
import { getExtensiveCountries, calculateScores } from '@/data/apiData';
import LoadingScreen from '@/components/LoadingScreen';

interface ESGContextType {
  // Data
  countries: any[];
  companies: any[];
  maxValues: any[];

  // Selected data
  selectedDimension: any;
  selectedCountry: any | null;
  selectedCompany: any | null;

  // Functions
  setSelectedDimension: (dimension: ESGDimension) => void;
  setSelectedCountry: (country: any | null) => void;
  setSelectedCompany: (company: any | null) => void;
  getCompaniesByCountry: (countryId: string) => Company[];
  getCompanyByName: (country: string) => Company;
}

const ESGContext = createContext<ESGContextType | undefined>(undefined);

export const ESGProvider: React.FC<{ children: any }> = ({ children }) => {
  const [selectedDimension, setSelectedDimension] = useState<ESGDimension>('environmental');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [maxValues, setMaxValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExtensiveCountries()
      .then((data: any) => {
        setCountries(data.countries);
        setCompanies(data.companies);
        setMaxValues(data.maxValues);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries and companies:", err);
        setLoading(false);
      });
  }, []);

  const getCompanyByName = (company: string) => {
    const companyData = companies.find((curr) => curr.name == company);

    const finalCompanyData = {
      name: company,
      stats: companyData,
      scores: calculateScores(companyData, maxValues)
    };

    return finalCompanyData;
  }

  const value: any = {
    // Data
    countries,
    companies,

    // Selected data
    selectedDimension,
    selectedCountry,
    selectedCompany,

    // Functions
    setSelectedDimension,
    setSelectedCountry,
    setSelectedCompany,
    getCompaniesByCountry,
    getCompanyByName
  };

  if (loading) return <LoadingScreen />;

  return (
    <ESGContext.Provider value={value}>
      {children}
    </ESGContext.Provider>
  );
};

export const useESG = (): ESGContextType => {
  const context = useContext(ESGContext);
  
  if (!context) {
    throw new Error('useESG must be used within an ESGProvider');
  }
  
  return context;
};