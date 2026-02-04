import React from 'react';

const UnionDetailModal = ({ union, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 sticky top-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">{union.bengaliName}</h2>
              <p className="text-green-100 mt-1">{union.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Description */}
          {union.description && (
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                <i className="fas fa-align-left text-blue-600 mr-2"></i>বর্ণনা
              </h3>
              <p className="text-gray-700">{union.description}</p>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{union.problemCount || 0}</p>
              <p className="text-sm text-gray-600">সমস্যা রিপোর্ট</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {union.populationEstimate?.toLocaleString('bn-BD') || '-'}
              </p>
              <p className="text-sm text-gray-600">জনসংখ্যা</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{union.areaSize || '-'}</p>
              <p className="text-sm text-gray-600">আয়তন</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <a
              href="/report-problem"
              className="flex-1 px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-center"
            >
              <i className="fas fa-plus-circle mr-2"></i>সমস্যা রিপোর্ট করুন
            </a>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition"
            >
              <i className="fas fa-times mr-2"></i>বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnionDetailModal;
