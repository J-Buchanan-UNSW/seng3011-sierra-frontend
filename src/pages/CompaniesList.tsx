import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { useESG } from '../context/ESGContext';
import { ESGDimension } from '../types';
import { getDimensionDisplayName } from '../utils/colorUtils';

export const CompaniesList: React.FC = () => {
  const { companies, selectedDimension } = useESG();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'industry' | 'score'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Get unique industries
  const industries = Array.from(
    new Set(companies.map(company => company.industry))
  ).sort();
  
  // Filter and sort companies
  const filteredCompanies = companies
    .filter(company => {
      // Filter by search query
      const matchesSearch = 
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by industry
      const matchesIndustry = !filterIndustry || company.industry === filterIndustry;
      
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'industry') {
        return sortOrder === 'asc'
          ? a.industry.localeCompare(b.industry)
          : b.industry.localeCompare(a.industry);
      } else {
        return sortOrder === 'asc'
          ? a.scores[selectedDimension] - b.scores[selectedDimension]
          : b.scores[selectedDimension] - a.scores[selectedDimension];
      }
    });
  
  const handleSort = (field: 'name' | 'industry' | 'score') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
      <p className="mt-1 text-gray-600">
        Browse and analyze company ESG data
      </p>
      
      <div className="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
              >
                <option value="">All Industries</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <button
                className={`inline-flex items-center px-3 py-1 border ${
                  sortBy === 'name' 
                    ? 'border-indigo-500 text-indigo-500' 
                    : 'border-gray-300 text-gray-700'
                } bg-white text-sm font-medium rounded-md hover:bg-gray-50`}
                onClick={() => handleSort('name')}
              >
                Name
                {sortBy === 'name' && (
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                )}
              </button>
              <button
                className={`inline-flex items-center px-3 py-1 border ${
                  sortBy === 'industry' 
                    ? 'border-indigo-500 text-indigo-500' 
                    : 'border-gray-300 text-gray-700'
                } bg-white text-sm font-medium rounded-md hover:bg-gray-50`}
                onClick={() => handleSort('industry')}
              >
                Industry
                {sortBy === 'industry' && (
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                )}
              </button>
              <button
                className={`inline-flex items-center px-3 py-1 border ${
                  sortBy === 'score' 
                    ? 'border-indigo-500 text-indigo-500' 
                    : 'border-gray-300 text-gray-700'
                } bg-white text-sm font-medium rounded-md hover:bg-gray-50`}
                onClick={() => handleSort('score')}
              >
                {getDimensionDisplayName(selectedDimension)} Score
                {sortBy === 'score' && (
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Company
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Industry
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Environmental
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Social
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Governance
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Average
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => {
                const avgScore = Math.round(
                  (company.scores.environmental + company.scores.social + company.scores.governance) / 3
                );
                
                return (
                  <tr key={company.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{company.industry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-env-600" 
                            style={{ width: `${company.scores.environmental}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{company.scores.environmental}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-soc-600" 
                            style={{ width: `${company.scores.social}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{company.scores.social}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gov-600" 
                            style={{ width: `${company.scores.governance}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{company.scores.governance}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {avgScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/company/${company.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredCompanies.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No companies found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};