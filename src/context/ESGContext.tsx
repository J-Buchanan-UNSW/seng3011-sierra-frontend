import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ESGDimension, Country, Company } from '../types';
import { mockCountries, mockCompanies, getCompaniesByCountry } from '../data/mockData';

interface ESGContextType {
  // Data
  countries: Country[];
  companies: Company[];
  
  // Selected data
  selectedDimension: ESGDimension;
  selectedCountry: Country | null;
  selectedCompany: Company | null;
  
  // Functions
  setSelectedDimension: (dimension: ESGDimension) => void;
  setSelectedCountry: (country: Country | null) => void;
  setSelectedCompany: (company: Company | null) => void;
  getCompaniesByCountry: (countryId: string) => Company[];
}

const ESGContext = createContext<ESGContextType | undefined>(undefined);

export const ESGProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDimension, setSelectedDimension] = useState<ESGDimension>('environmental');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const value = {
    // Data
    countries: mockCountries,
    companies: mockCompanies,
    
    // Selected data
    selectedDimension,
    selectedCountry,
    selectedCompany,
    
    // Functions
    setSelectedDimension,
    setSelectedCountry,
    setSelectedCompany,
    getCompaniesByCountry,
  };

  return <ESGContext.Provider value={value}>{children}</ESGContext.Provider>;
};

export const useESG = (): ESGContextType => {
  const context = useContext(ESGContext);
  
  if (!context) {
    throw new Error('useESG must be used within an ESGProvider');
  }
  
  return context;
};