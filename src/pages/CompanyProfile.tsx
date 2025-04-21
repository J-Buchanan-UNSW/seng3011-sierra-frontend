import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompanyById } from '../data/mockData';
import { CompanyDetails } from '../components/CompanyDetails';

export const CompanyProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get company data
  const company = id ? getCompanyById(id) : undefined;
  
  // If invalid ID, redirect to dashboard
  useEffect(() => {
    if (!company && id) {
      navigate('/');
    }
  }, [company, id, navigate]);
  
  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-500">Company not found.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <CompanyDetails company={company} />
    </div>
  );
};