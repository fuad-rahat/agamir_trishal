import React, { useState } from 'react';
import { PROBLEM_CATEGORIES } from '../utils/constants';

const StatusBadge = ({ status }) => {
  if (!status || status === 'pending') return null;
  const map = {
    approved: { text: 'অনুমোদিত', cls: 'bg-green-100 text-green-800' },
    'in-progress': { text: 'চলমান', cls: 'bg-yellow-100 text-yellow-800' },
    resolved: { text: 'সমাধান হয়েছে', cls: 'bg-blue-100 text-blue-800' }
  };
  const info = map[status] || { text: status, cls: 'bg-gray-100 text-gray-800' };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${info.cls}`}>
      {info.text}
    </span>
  );
};

const truncate = (text, n = 120) => (text && text.length > n ? text.slice(0, n).trim() + '...' : text || '');

const ProblemCard = ({ problem }) => {
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const category = PROBLEM_CATEGORIES.find(c => c.value === problem.category);

  return (
    <div
      onClick={() => setExpanded(prev => !prev)}
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-500 cursor-pointer overflow-hidden ${expanded ? 'ring-2 ring-blue-200' : ''}`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">{problem.title}</h3>
            <p className="text-xs text-gray-500 mt-1">{new Date(problem.createdAt).toLocaleDateString('bn-BD')}</p>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={problem.status} />
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(prev => !prev); }}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full focus:outline-none"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              <i className={`fas fa-chevron-${expanded ? 'up' : 'down'}`}></i>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium inline-flex items-center">
            <i className={`fas ${category?.icon} mr-1`}></i>
            {category?.label}
          </span>
        </div>

        <div className={`mt-3 text-gray-600 text-sm ${expanded ? '' : 'line-clamp-3'}`}>
          {expanded ? (problem.description || 'বিস্তারিত নেই') : truncate(problem.description, 140)}
        </div>

        {problem.images && problem.images.length > 0 && (
          <div className={`mt-3 ${expanded ? 'grid grid-cols-2 gap-3' : 'grid grid-cols-3 gap-2'}`}>
            {problem.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Problem ${idx + 1}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(idx); setLightboxOpen(true); }}
                className={`w-full object-cover rounded ${expanded ? 'h-40' : 'h-20'} hover:opacity-90 transition`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 bg-gray-50 p-3 flex items-center justify-between">
        <div className="text-xs text-gray-600">ইউনিয়ন: {problem.unionName || 'অজ্ঞাত'}</div>
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-60" onClick={() => setLightboxOpen(false)}></div>
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-2 right-2 z-50 bg-white text-gray-800 rounded-full p-2 shadow-md"
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>

            <div className="relative bg-black rounded">
              <img src={problem.images[lightboxIndex]} alt={`Large ${lightboxIndex + 1}`} className="w-full h-[70vh] object-contain rounded" />

              {problem.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + problem.images.length) % problem.images.length); }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full"
                    aria-label="Previous"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>

                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % problem.images.length); }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full"
                    aria-label="Next"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;
