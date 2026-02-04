import React from 'react';

const UnionCard = ({ union, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition transform hover:scale-105 ${
        isSelected
          ? 'bg-green-600 text-white shadow-lg'
          : 'bg-white text-gray-800 border border-gray-200 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg">{union.bengaliName}</h3>
          <p className={`text-sm ${isSelected ? 'text-green-100' : 'text-gray-600'}`}>
            {union.name}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
          isSelected ? 'bg-green-700' : 'bg-blue-100 text-blue-800'
        }`}>
          {union.problemCount || 0} সমস্যা
        </div>
      </div>
      
      {union.populationEstimate && (
        <p className={`text-xs mt-3 ${isSelected ? 'text-green-100' : 'text-gray-500'}`}>
          <i className="fas fa-users mr-1"></i>জনসংখ্যা: {union.populationEstimate.toLocaleString('bn-BD')}
        </p>
      )}
      
      {union.areaSize && (
        <p className={`text-xs ${isSelected ? 'text-green-100' : 'text-gray-500'}`}>
          <i className="fas fa-expand mr-1"></i>আয়তন: {union.areaSize}
        </p>
      )}
    </div>
  );
};

export default UnionCard;
