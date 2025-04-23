import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CompanyDetails } from '../components/CompanyDetails';
import { useESG } from '../context/ESGContext';

export const CompanyProfile: React.FC = () => {
  const {
      getCompanyByName
    } = useESG();
  const [searchParams] = useSearchParams();
  const companyName: any = searchParams.get('name');
  const [company, setCompany] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false);

  // Get company data
  useEffect(() => {
    if (companyName) {
      const timer = setTimeout(() => {
        setLoading(false);
        setTimeoutReached(true);
      }, 10000); // 10 seconds timeout

      setCompany(getCompanyByName(companyName));

      return () => clearTimeout(timer); // Clean up the timeout on component unmount
    }
  }, [companyName]);

  if (!company && loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-6 h-6 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!company && timeoutReached) {
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