import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Settings, Menu, X } from 'lucide-react';
import { useESG } from '../context/ESGContext';
import { ESGDimension } from '../types';

export const Navbar: React.FC = () => {
  const { selectedDimension, setSelectedDimension } = useESG();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleDimensionChange = (dimension: ESGDimension) => {
    setSelectedDimension(dimension);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Globe className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Sierra Impact</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="px-1 pt-1 text-sm font-medium">
                <Link to="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                  Dashboard
                </Link>
                <Link to="/countries" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                  Countries
                </Link>
                <Link to="/companies" className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md">
                  Companies
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center">
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => handleDimensionChange('environmental')}
                className={`px-3 py-1 text-sm font-medium ${
                  selectedDimension === 'environmental' 
                    ? 'bg-env-100 text-env-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Environmental
              </button>
              <button
                onClick={() => handleDimensionChange('social')}
                className={`px-3 py-1 text-sm font-medium ${
                  selectedDimension === 'social' 
                    ? 'bg-soc-100 text-soc-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Social
              </button>
              <button
                onClick={() => handleDimensionChange('governance')}
                className={`px-3 py-1 text-sm font-medium ${
                  selectedDimension === 'governance' 
                    ? 'bg-gov-100 text-gov-800' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                Governance
              </button>
            </div>
            <div className="ml-4 flex items-center">
              <button className="bg-gray-100 p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {menuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/countries"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              Countries
            </Link>
            <Link
              to="/companies"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setMenuOpen(false)}
            >
              Companies
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-3 space-y-2">
              <p className="text-sm font-medium text-gray-500">View by dimension:</p>
              <button
                onClick={() => handleDimensionChange('environmental')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  selectedDimension === 'environmental' 
                    ? 'bg-env-100 text-env-800' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Environmental
              </button>
              <button
                onClick={() => handleDimensionChange('social')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  selectedDimension === 'social' 
                    ? 'bg-soc-100 text-soc-800' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Social
              </button>
              <button
                onClick={() => handleDimensionChange('governance')}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md ${
                  selectedDimension === 'governance' 
                    ? 'bg-gov-100 text-gov-800' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Governance
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};