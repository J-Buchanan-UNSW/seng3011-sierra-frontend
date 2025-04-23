import React from 'react';
import { ESGScore, ESGDimension } from '../types';
import { getDimensionDisplayName } from '../utils/colorUtils';

interface ScoreCardProps {
  title: string;
  scores: ESGScore;
  showDetails?: boolean;
}

const ScoreBar: React.FC<{ score: number; dimension: ESGDimension }> = ({ score, dimension }) => {
  const getColorClass = () => {
    switch (dimension) {
      case 'environmental':
        return 'bg-env-600';
      case 'social':
        return 'bg-soc-600';
      case 'governance':
        return 'bg-gov-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="mt-1">
      <div className="flex items-center">
        <span className="text-sm font-medium text-gray-700 w-24">
          {getDimensionDisplayName(dimension)}
        </span>
        <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`${getColorClass()} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className="ml-2 text-sm font-medium text-gray-700">{score}</span>
      </div>
    </div>
  );
};

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, scores, showDetails = true }) => {
  // Calculate average score
  const avgScore = Math.round(
    (scores.environmental + scores.social + scores.governance) / 3
  );

  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <div className="bg-indigo-100 text-indigo-800 text-lg font-semibold rounded-full w-10 h-10 flex items-center justify-center">
          {avgScore}
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 space-y-3">
          <ScoreBar score={scores.environmental} dimension="environmental" />
          <ScoreBar score={scores.social} dimension="social" />
          <ScoreBar score={scores.governance} dimension="governance" />
        </div>
      )}
    </div>
  );
};