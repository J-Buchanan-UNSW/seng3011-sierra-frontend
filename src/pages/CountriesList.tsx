import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown } from 'lucide-react';
import { useESG } from '../context/ESGContext';
import { ScoreCard } from '../components/ScoreCard';
import { Country } from '../types';

export const CountriesList: React.FC = () => {
  const navigate = useNavigate();
  const { countries, selectedDimension, setSelectedCountry } = useESG();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'score'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter and sort countries
  const filteredCountries = countries
    .filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === 'asc'
          ? a.scores[selectedDimension] - b.scores[selectedDimension]
          : b.scores[selectedDimension] - a.scores[selectedDimension];
      }
    });
  
  const handleSort = (field: 'name' | 'score') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    navigate('/');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">Countries</h1>
      <p className="mt-1 text-gray-600">
        View and compare ESG performance across countries
      </p>
      
      <div className="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                  sortBy === 'score' 
                    ? 'border-indigo-500 text-indigo-500' 
                    : 'border-gray-300 text-gray-700'
                } bg-white text-sm font-medium rounded-md hover:bg-gray-50`}
                onClick={() => handleSort('score')}
              >
                Score
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
                  Country
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Code
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
              {filteredCountries.map((country) => {
                const avgScore = Math.round(
                  (country.scores.environmental + country.scores.social + country.scores.governance) / 3
                );
                
                return (
                  <tr key={country.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleCountrySelect(country)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{country.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{country.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-env-600" 
                            style={{ width: `${country.scores.environmental}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{country.scores.environmental}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-soc-600" 
                            style={{ width: `${country.scores.social}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{country.scores.social}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-12 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gov-600" 
                            style={{ width: `${country.scores.governance}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-900">{country.scores.governance}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {avgScore}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCountrySelect(country);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};