import React from 'react';
import { BarChart, Globe, TrendingUp, Users } from 'lucide-react';
import { useESG } from '../context/ESGContext';
import { WorldMap } from '../components/WorldMap';
import { CountryView } from '../components/CountryView';
import { ScoreCard } from '../components/ScoreCard';
import { getDimensionDisplayName } from '../utils/colorUtils';

export const Dashboard: React.FC = () => {
  const {
    countries,
    companies,
    selectedDimension,
    selectedCountry
  } = useESG();

  // Calculate average scores
  const calculateAverageScores = () => {

    let totalScores: any = {
      "environmental": 0,
      "social": 0,
      "governance": 0
    }

    let contributors: any = {
      "environmental": 0,
      "social": 0,
      "governance": 0
    }

    Object.values(countries).forEach((val) => {
      totalScores["environmental"] += val["scores"].environmental;
      if (val["scores"].environmental) {
        contributors["environmental"] += 1;
      }
      totalScores["social"] += val["scores"].social;
      if (val["scores"].social) {
        contributors["social"] += 1;
      }
      totalScores["governance"] += val["scores"].governance;
      if (val["scores"].governance) {
        contributors["governance"] += 1;
      }
    });

    return {
      environmental: Math.round(totalScores.environmental / Math.max(contributors["environmental"], 1)),
      social: Math.round(totalScores.social / Math.max(contributors["social"], 1)),
      governance: Math.round(totalScores.governance / Math.max(contributors["governance"], 1)),
    };
  };

  const averageScores: any = calculateAverageScores();

  // Find top performing countries by dimension
  const topCountries = countries
    .sort((a, b) => b.scores[selectedDimension] - a.scores[selectedDimension])
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-semibold text-gray-900">ESG Dashboard</h1>
      <p className="mt-1 text-gray-600">
        Viewing {getDimensionDisplayName(selectedDimension)} performance data
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Countries</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{countries.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Companies</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{companies.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <BarChart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Average {getDimensionDisplayName(selectedDimension)}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {averageScores[selectedDimension]}/100
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Top Performer</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {topCountries[0]?.name || 'N/A'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Global ESG Map</h2>
          <p className="mt-1 text-sm text-gray-500">
            Click on a country to view detailed data and companies
          </p>
        </div>
        <div className="h-96 bg-gray-100 border-t border-gray-200">
          <WorldMap />
        </div>
      </div>

      {selectedCountry && <CountryView />}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Top {getDimensionDisplayName(selectedDimension)} Performers
            </h2>
            <div className="mt-4 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {topCountries.map((country) => (
                  <li key={country.name} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {country.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {country.code}
                        </p>
                      </div>
                      <div>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {country.scores[selectedDimension]}/100
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <ScoreCard
            title="Global Average ESG Scores"
            scores={averageScores}
          />
        </div>
      </div>
    </div>
  );
};