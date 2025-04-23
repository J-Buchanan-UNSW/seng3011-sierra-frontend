import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Company } from '../types';
import { getDimensionDisplayName } from '../utils/colorUtils';
import { getStatNames } from '@/data/apiData';
import { useESG } from '@/context/ESGContext';

interface CompanyDetailsProps {
  company: Company;
}

export const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {

  const { countries } = useESG();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const statCount = {
    "environmental": 0,
    "social": 0,
    "governance": 0
  }

  // Calculate average score
  const avgScore = Math.round(
    (company.scores.environmental + company.scores.social + company.scores.governance) / 3
  );
  const country = countries.find((country) => country.name == company.stats.country);
  const avgCountryScore = Math.round(
    (country.scores.environmental + country.scores.social + country.scores.governance) / 3
  );

  // Determine best and worst dimensions
  const scores = [
    { name: 'environmental', score: company.scores.environmental },
    { name: 'social', score: company.scores.social },
    { name: 'governance', score: company.scores.governance },
  ];

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const bestDimension = sortedScores[0].name;
  const worstDimension = sortedScores[2].name;

  const statDisplayNames: any = getStatNames();

  Object.keys(statDisplayNames).forEach((statKey) => {
    const stat = company.stats[statKey];
    if (!stat) return null;

    if (stat.pillar == 'E') statCount.environmental += 1;
    else if (stat.pillar == 'S') statCount.social += 1;
    else if (stat.pillar == 'G') statCount.governance += 1;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 sm:p-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>

        <div className="mt-4 sm:flex sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="mt-1 text-gray-500">{company.industry}</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              ESG Score: {avgScore}/100
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">Company Overview</h2>
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900">ESG Breakdown</h3>
                <div className="mt-4 space-y-4">
                  {['environmental', 'social', 'governance'].map((dimension) => {
                    const dim = dimension as keyof typeof company.scores;
                    const score = company.scores[dim];
                    let colorClass = '';

                    if (dimension === 'environmental') {
                      colorClass = 'bg-env-600';
                    } else if (dimension === 'social') {
                      colorClass = 'bg-soc-600';
                    } else {
                      colorClass = 'bg-gov-600';
                    }

                    return (
                      <div key={dimension}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${colorClass}`}></div>
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {getDimensionDisplayName(dimension as any)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{score}/100</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${colorClass} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          </div>

          <div className="p-4 sm:p-6 grid-rows-3">
            <h2 className="text-lg font-medium text-gray-900">Environmental Statistics</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statCount.environmental > 0 ? (
                Object.keys(statDisplayNames).map(statKey => {
                  const stat = company.stats[statKey];
                  if (!stat) return null;
                  if (stat.pillar != 'E') return null;

                  // Handle special case for AIRPOLLUTANTS_INDIRECT unit
                  const displayUnit = statKey === "AIRPOLLUTANTS_INDIRECT"
                    ? stat.metric_unit.split(" ")[0]
                    : stat.metric_unit;

                  return (
                    <div key={statKey} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-center w-full">{statDisplayNames[statKey].displayName}</span>
                      </div>
                      {!(stat.metric_unit.includes("Yes/No")) && (
                        <div className="mt-1 text-md text-gray-500 text-center">
                          {parseInt(stat.metric_value) + " " + displayUnit}
                        </div>
                      )}
                      {(stat.metric_unit.includes("Yes/No")) && (
                        <div className="text-lg text-center w-full">
                          {parseInt(stat.metric_value) == 1 ? "✅" : "❌"}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No environmental data available
                </div>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 grid-rows-3">
            <h2 className="text-lg font-medium text-gray-900">Social Statistics</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statCount.social > 0 ? (
                Object.keys(statDisplayNames).map(statKey => {
                  const stat = company.stats[statKey];
                  if (!stat) return null;
                  if (stat.pillar != 'S') return null;

                  const displayUnit = stat.metric_unit;

                  return (
                    <div key={statKey} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-center w-full">{statDisplayNames[statKey].displayName}</span>
                      </div>
                      {!(stat.metric_unit.includes("Yes/No")) && (
                        <div className="mt-1 text-md text-gray-500 text-center">
                          {parseInt(stat.metric_value) + " " + displayUnit}
                        </div>
                      )}
                      {(stat.metric_unit.includes("Yes/No")) && (
                        <div className="text-lg text-center w-full">
                          {parseInt(stat.metric_value) == 1 ? "✅" : "❌"}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No social data available
                </div>
              )}
            </div>
          </div>

          <div className="p-4 sm:p-6 grid-rows-3">
            <h2 className="text-lg font-medium text-gray-900">Governance Statistics</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {statCount.governance > 0 ? (
                Object.keys(statDisplayNames).map(statKey => {
                  const stat = company.stats[statKey];
                  if (!stat) return null;
                  if (stat.pillar != 'G') return null;

                  const displayUnit = stat.metric_unit;

                  return (
                    <div key={statKey} className="bg-white p-3 rounded-md shadow-sm">
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-center w-full">{statDisplayNames[statKey].displayName}</span>
                      </div>
                      {!(stat.metric_unit.includes("Yes/No")) && (
                        <div className="mt-1 text-md text-gray-500 text-center">
                          {parseInt(stat.metric_value) + " " + displayUnit}
                        </div>
                      )}
                      {(stat.metric_unit.includes("Yes/No")) && (
                        <div className="text-lg text-center w-full">
                          {parseInt(stat.metric_value) == 1 ? "✅" : "❌"}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No governance data available
                </div>
              )}
            </div>
          </div>
        </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900">ESG Insights</h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Overall ESG Rating</dt>
                    <dd className="mt-1">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                          avgScore >= 80 ? 'bg-green-100 text-green-800' :
                          avgScore >= 60 ? 'bg-blue-100 text-blue-800' :
                          avgScore >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {
                            avgScore >= 80 ? 'Excellent' :
                            avgScore >= 60 ? 'Good' :
                            avgScore >= 40 ? 'Average' :
                            'Poor'
                          }
                        </span>
                        <span className="ml-2 text-sm text-gray-500">({avgScore}/100)</span>
                      </div>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Best Performance</dt>
                    <dd className="mt-1 flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        bestDimension === 'environmental' ? 'bg-env-600' :
                        bestDimension === 'social' ? 'bg-soc-600' :
                        'bg-gov-600'
                      }`}></div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {getDimensionDisplayName(bestDimension as any)}
                        <span className="ml-1 text-gray-500">
                          ({company.scores[bestDimension as keyof typeof company.scores]}/100)
                        </span>
                      </span>
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">Needs Improvement</dt>
                    <dd className="mt-1 flex items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        worstDimension === 'environmental' ? 'bg-env-600' :
                        worstDimension === 'social' ? 'bg-soc-600' :
                        'bg-gov-600'
                      }`}></div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {getDimensionDisplayName(worstDimension as any)}
                        <span className="ml-1 text-gray-500">
                          ({company.scores[worstDimension as keyof typeof company.scores]}/100)
                        </span>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-md font-medium text-gray-900">Country Comparison</h3>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{country.name}</span>
                    <span className="font-medium text-gray-900">{avgCountryScore}/100</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-500 h-2 rounded-full"
                      style={{ width: `${avgCountryScore}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-sm mt-3">
                    <span className="text-gray-500">{company.name}</span>
                    <span className="font-medium text-gray-900">{avgScore}/100</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-500 h-2 rounded-full"
                      style={{ width: `${avgScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};