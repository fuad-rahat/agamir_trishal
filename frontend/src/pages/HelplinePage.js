import React, { useState, useEffect } from 'react';
import { helplineAPI } from '../services/api';
import { HELPLINE_CATEGORIES } from '../utils/constants';

const HelplinePage = () => {
  const [helplines, setHelplines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelplines();
  }, []);

  const fetchHelplines = async () => {
    try {
      const response = await helplineAPI.getAll();
      setHelplines(response.data);
    } catch (error) {
      console.error('Error fetching helplines:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Election Commission': 'blue',
      'Local Administration': 'green',
      'Emergency': 'red',
      'Support': 'purple',
    };
    return colorMap[category] || 'gray';
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Election Commission': 'fa-clipboard',
      'Local Administration': 'fa-building',
      'Emergency': 'fa-phone-volume',
      'Support': 'fa-headset',
    };
    return iconMap[category] || 'fa-info-circle';
  };

  const filteredHelplines = selectedCategory
    ? helplines.filter(h => h.category === selectedCategory)
    : helplines;

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            <i className="fas fa-phone text-red-600 mr-2"></i>সহায়তা হেল্পলাইন
          </h1>
          <p className="text-gray-600">প্রয়োজনীয় সেবার জন্য যোগাযোগ নম্বর এবং তথ্য</p>
        </div>

        {/* Categories Filter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-3 rounded-lg font-semibold transition text-center ${
              selectedCategory === ''
                ? 'bg-gray-800 text-white shadow-lg'
                : 'bg-white text-gray-800 border border-gray-300 hover:shadow-md'
            }`}
          >
            <i className="fas fa-list mr-2"></i>সকল
          </button>
          {HELPLINE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-3 rounded-lg font-semibold transition text-center ${
                selectedCategory === cat.value
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-800 border border-gray-300 hover:shadow-md'
              }`}
            >
              <i className={`fas ${getCategoryIcon(cat.value)} mr-1`}></i>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Helplines Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">হেল্পলাইন তথ্য লোড হচ্ছে...</p>
          </div>
        ) : filteredHelplines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHelplines.map((helpline) => {
              const color = getCategoryColor(helpline.category);
              const colorClasses = {
                blue: 'bg-blue-50 border-blue-500 text-blue-800',
                green: 'bg-green-50 border-green-500 text-green-800',
                red: 'bg-red-50 border-red-500 text-red-800',
                purple: 'bg-purple-50 border-purple-500 text-purple-800',
                gray: 'bg-gray-50 border-gray-500 text-gray-800',
              };
              const bgColor = colorClasses[color] || colorClasses.gray;

              return (
                <div
                  key={helpline._id}
                  className={`border-l-4 rounded-lg p-6 shadow-md hover:shadow-lg transition ${bgColor}`}
                >
                  {/* Category Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${
                    color === 'blue' ? 'bg-blue-200 text-blue-900' :
                    color === 'green' ? 'bg-green-200 text-green-900' :
                    color === 'red' ? 'bg-red-200 text-red-900' :
                    color === 'purple' ? 'bg-purple-200 text-purple-900' :
                    'bg-gray-200 text-gray-900'
                  }`}>
                    <i className={`fas ${getCategoryIcon(helpline.category)} mr-1`}></i>
                    {helpline.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{helpline.name}</h3>

                  {/* Phone Number */}
                  <div className="bg-white bg-opacity-60 rounded-lg p-4 mb-4">
                    <p className="text-xs font-semibold opacity-75 mb-1">টেলিফোন নম্বর</p>
                    <a
                      href={`tel:${helpline.number}`}
                      className="text-2xl font-bold text-green-600 hover:text-green-700 transition"
                    >
                      <i className="fas fa-phone mr-2"></i>{helpline.number}
                    </a>
                  </div>

                  {/* Description */}
                  {helpline.description && (
                    <p className="text-sm mb-3 opacity-90">{helpline.description}</p>
                  )}

                  {/* Availability */}
                  {helpline.availability && (
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                      <p className="font-semibold mb-1">
                        <i className="fas fa-clock mr-1"></i>সময়সূচী
                      </p>
                      <p className="opacity-90">{helpline.availability}</p>
                    </div>
                  )}

                  {/* Call Button */}
                  <a
                    href={`tel:${helpline.number}`}
                    className={`block mt-4 w-full py-3 rounded-lg font-bold text-center transition ${
                      color === 'blue' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                      color === 'green' ? 'bg-green-600 hover:bg-green-700 text-white' :
                      color === 'red' ? 'bg-red-600 hover:bg-red-700 text-white' :
                      color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                      'bg-gray-600 hover:bg-gray-700 text-white'
                    }`}
                  >
                    <i className="fas fa-phone mr-2"></i>এখনই কল করুন
                  </a>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4 text-gray-400">
              <i className="fas fa-inbox"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">কোনো হেল্পলাইন পাওয়া যায়নি</h3>
            <p className="text-gray-600">আপনার নির্বাচিত বিভাগে কোনো হেল্পলাইন নেই</p>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mt-8">
          <p className="text-yellow-900 font-bold mb-2">
            <i className="fas fa-exclamation-triangle mr-2"></i>জরুরি পরিস্থিতিতে
          </p>
          <p className="text-yellow-800 mb-3">যেকোনো জরুরি পরিস্থিতিতে সরাসরি জাতীয় জরুরি নম্বর ১০০ এ কল করুন অথবা স্থানীয় আইন প্রয়োগকারী কর্তৃপক্ষের সাথে যোগাযোগ করুন।</p>
          <a
            href="tel:100"
            className="inline-block px-4 py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition"
          >
            <i className="fas fa-phone mr-2"></i>১০০ কল করুন
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelplinePage;
