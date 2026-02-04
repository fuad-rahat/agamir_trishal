import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { demoUnionLookup, demoImageFallback } from '../data/demoUnions';

const UnionDetailPage = () => {
  const { unionId } = useParams();
  const navigate = useNavigate();
  const [union, setUnion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [imageModal, setImageModal] = useState({ isOpen: false, images: [], currentIndex: 0 });

  useEffect(() => {
    const loadUnionDetails = () => {
      setLoading(true);
      setImageModal({ open: false, src: '', images: [], currentIndex: 0 });
      const match = demoUnionLookup[String(unionId)];
      if (match) {
        setUnion(match);
        setError('');
      } else {
        setUnion(null);
        setError('ডেমো ডাটায় এই ইউনিয়ন পাওয়া যায়নি');
      }
      setLoading(false);
    };

    loadUnionDetails();
  }, [unionId]);

  const openImageModal = (src, images = [], currentIndex = 0) => {
    const imgList = Array.isArray(images) ? images.filter(Boolean) : (src ? [src] : []);
    const safeList = imgList.length > 0 ? imgList : [demoImageFallback];
    const safeIndex = Math.max(0, Math.min(currentIndex, safeList.length - 1));
    setImageModal({ open: true, src: safeList[safeIndex], images: safeList, currentIndex: safeIndex });
  };

  const handleImageError = (event) => {
    event.currentTarget.src = demoImageFallback;
  };

  const navigateImage = (direction) => {
    const { images, currentIndex } = imageModal;
    if (!images || images.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setImageModal(prev => ({
      ...prev,
      currentIndex: newIndex
    }));
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, images: [], currentIndex: 0 });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (error || !union) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button
            onClick={() => navigate('/')}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            হোম পেজে ফিরুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-8 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white hover:text-green-100 transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            ফিরে যান
          </button>
          <h1 className="text-4xl font-bold">{union.bengaliName}</h1>
          <p className="text-green-100 mt-2">{union.name}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-20 z-30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap overflow-x-auto">
            {[
              { id: 'overview', label: 'সংক্ষিপ্ত পরিচয়', icon: 'fa-info-circle' },
              { id: 'chairman', label: 'চেয়ারম্যান', icon: 'fa-user-tie' },
              { id: 'places', label: 'ভ্রমণ স্থান', icon: 'fa-location-dot' },
              { id: 'culture', label: 'সংস্কৃতি ও সাহিত্য', icon: 'fa-theater-masks' },
              { id: 'food', label: 'বিখ্যাত খাবার', icon: 'fa-utensils' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium flex items-center whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-4 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-green-600 text-3xl mb-2">
                  <i className="fas fa-users"></i>
                </div>
                <p className="text-gray-600 text-sm">জনসংখ্যা</p>
                <p className="text-2xl font-bold text-gray-800">
                  {union.populationEstimate?.toLocaleString('bn-BD') || 'N/A'}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-blue-600 text-3xl mb-2">
                  <i className="fas fa-map"></i>
                </div>
                <p className="text-gray-600 text-sm">এলাকা</p>
                <p className="text-2xl font-bold text-gray-800">
                  {union.areaSize || 'N/A'} km²
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-purple-600 text-3xl mb-2">
                  <i className="fas fa-exclamation-circle"></i>
                </div>
                <p className="text-gray-600 text-sm">রিপোর্ট সংখ্যা</p>
                <p className="text-2xl font-bold text-gray-800">
                  {union.problemCount || 0}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-orange-600 text-3xl mb-2">
                  <i className="fas fa-road"></i>
                </div>
                <p className="text-gray-600 text-sm">গ্রাম সংখ্যা</p>
                <p className="text-2xl font-bold text-gray-800">
                  {union.villages || 'N/A'}
                </p>
              </div>
            </div>

            {(union.introduction || union.description || (union.introductionFields && union.introductionFields.length > 0)) && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">সংক্ষিপ্ত পরিচয়</h3>
                {union.introduction && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {union.introduction}
                  </p>
                )}
                {union.introductionFields && Array.isArray(union.introductionFields) && union.introductionFields.length > 0 && (
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {union.introductionFields.map((field, idx) => {
                      if (!field || !field.key) return null;
                      const cardStyles = [
                        { icon: 'fa-info-circle', color: 'text-green-600' },
                        { icon: 'fa-map', color: 'text-blue-600' },
                        { icon: 'fa-exclamation-circle', color: 'text-purple-600' },
                        { icon: 'fa-road', color: 'text-orange-600' },
                        { icon: 'fa-calendar-alt', color: 'text-teal-600' },
                        { icon: 'fa-landmark', color: 'text-indigo-600' }
                      ];
                      const style = cardStyles[idx % cardStyles.length];
                      return (
                        <div
                          key={idx}
                          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center"
                        >
                          <div className={`${style.color} text-3xl mb-2`}>
                            <i className={`fas ${style.icon}`}></i>
                          </div>
                          <p className="text-gray-600 text-sm">{field.key}</p>
                          <p className="text-2xl font-bold text-gray-800 mt-1">
                            {field.value || 'N/A'}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                {union.introductionImages && union.introductionImages.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">ছবি</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {union.introductionImages.map((img, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={img}
                            alt={`Introduction ${idx + 1}`}
                            className="w-full h-40 sm:h-48 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-green-500 transition-all hover:scale-105"
                            onClick={() => openImageModal(img, union.introductionImages, idx)}
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                            <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 text-2xl"></i>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {union.description && !union.introduction && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">বিস্তারিত বিবরণ</h3>
                <p className="text-gray-700 leading-relaxed">{union.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Chairman Tab */}
        {activeTab === 'chairman' && (
          <div className="space-y-6">
            {union.chairman && union.chairman.name ? (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Chairman Images */}
                  <div className="flex flex-col items-center">
                    {union.chairman.images && union.chairman.images.length > 0 ? (
                      <div className="w-full">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">ছবি</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {union.chairman.images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img
                                src={img}
                                alt={`${union.chairman.name} ${idx + 1}`}
                                className="w-full h-40 sm:h-48 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-green-500 transition-all hover:scale-105"
                                onClick={() => openImageModal(img, union.chairman.images, idx)}
                                onError={handleImageError}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                                <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100 text-2xl"></i>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                        <i className="fas fa-user text-gray-600 text-6xl"></i>
                      </div>
                    )}
                  </div>

                  {/* Chairman Info */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">
                      {union.chairman.name}
                    </h3>
                    <p className="text-lg text-green-600 font-semibold mb-6">
                      {union.bengaliName} ইউনিয়ন চেয়ারম্যান
                    </p>

                    {union.chairman.contactNumber && (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <i className="fas fa-phone text-green-600 mr-4 text-xl"></i>
                          <a
                            href={`tel:${union.chairman.contactNumber}`}
                            className="text-gray-700 hover:text-green-600 font-medium"
                          >
                            {union.chairman.contactNumber}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600">চেয়ারম্যানের তথ্য এখনও যোগ করা হয়নি।</p>
              </div>
            )}
          </div>
        )}

        {/* Places to Visit Tab */}
        {activeTab === 'places' && (
          <div className="space-y-8">
            {union.placesToVisit && union.placesToVisit.length > 0 ? (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-map-marker-alt text-green-600 mr-2"></i>
                    ভ্রমণের জন্য আদর্শ স্থান
                  </h3>
                  <p className="text-gray-600">এই ইউনিয়নের প্রাকৃতিক সৌন্দর্য এবং ঐতিহাসিক স্থানগুলো ঘুরে দেখুন</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {union.placesToVisit.map((place, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {place.images && place.images.length > 0 ? (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={place.images[0]}
                            alt={place.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                            onClick={() => openImageModal(place.images[0], place.images, 0)}
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-xl font-bold text-white mb-1">
                              {place.bengaliName || place.name}
                            </h4>
                            {place.name !== place.bengaliName && (
                              <p className="text-sm text-white/90">{place.name}</p>
                            )}
                            {place.images.length > 1 && (
                              <p className="text-sm text-green-200">+{place.images.length - 1} ছবি</p>
                            )}
                          </div>
                        </div>
                      ) : place.image ? (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={place.image}
                            alt={place.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                            onClick={() => openImageModal(place.image, [place.image], 0)}
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-xl font-bold text-white mb-1">
                              {place.bengaliName || place.name}
                            </h4>
                            {place.name !== place.bengaliName && (
                              <p className="text-sm text-white/90">{place.name}</p>
                            )}
                          </div>
                        </div>
                      ) : null}
                      <div className="p-6">
                        {(!place.images || place.images.length === 0) && !place.image && (
                          <h4 className="text-xl font-bold text-gray-800 mb-3">
                            {place.bengaliName || place.name}
                          </h4>
                        )}
                        {place.description && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {place.description}
                          </p>
                        )}
                        {place.images && place.images.length > 1 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">অতিরিক্ত ছবি</h5>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {place.images.slice(1).map((img, idx) => (
                                <div key={idx + 1} className="relative group">
                                  <img
                                    src={img}
                                    alt={`${place.name} ${idx + 2}`}
                                    className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-green-500 transition-all hover:scale-105"
                                    onClick={() => openImageModal(img, place.images, idx + 1)}
                                    onError={handleImageError}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                                    <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100"></i>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-green-600">
                          <i className="fas fa-compass mr-2"></i>
                          <span className="text-sm font-medium">ঘুরে দেখার জন্য উপযুক্ত</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-12 rounded-xl text-center border-2 border-dashed border-green-300">
                <i className="fas fa-map-pin text-green-400 text-6xl mb-6"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">ভ্রমণ স্থান খুঁজে পাওয়া যায়নি</h3>
                <p className="text-gray-600">এই ইউনিয়নের সুন্দর স্থানগুলোর তথ্য এখনও যোগ করা হয়নি।</p>
              </div>
            )}
          </div>
        )}

        {/* Culture & Literature Tab */}
        {activeTab === 'culture' && (
          <div className="space-y-8">
            {union.literatureAndCulture && union.literatureAndCulture.length > 0 ? (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-palette text-purple-600 mr-2"></i>
                    সাংস্কৃতিক ঐতিহ্য এবং সাহিত্য
                  </h3>
                  <p className="text-gray-600">এই ইউনিয়নের সমৃদ্ধ সাংস্কৃতিক ঐতিহ্য এবং সাহিত্যিক সম্পদ</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {union.literatureAndCulture.map((culture, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {culture.images && culture.images.length > 0 && (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={culture.images[0]}
                            alt={culture.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                            onClick={() => openImageModal(culture.images[0], culture.images, 0)}
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-xl font-bold text-white mb-1">
                              {culture.bengaliName || culture.name}
                            </h4>
                            {culture.type && (
                              <p className="text-sm text-purple-200 font-medium">{culture.type}</p>
                            )}
                            {culture.images.length > 1 && (
                              <p className="text-sm text-purple-200">+{culture.images.length - 1} ছবি</p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        {!culture.images || culture.images.length === 0 ? (
                          <>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">
                              {culture.bengaliName || culture.name}
                            </h4>
                            {culture.type && (
                              <p className="text-sm text-purple-600 font-semibold mb-3">
                                <i className="fas fa-tag mr-1"></i>{culture.type}
                              </p>
                            )}
                          </>
                        ) : null}
                        {culture.description && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {culture.description}
                          </p>
                        )}
                        {culture.images && culture.images.length > 1 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">অতিরিক্ত ছবি</h5>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {culture.images.slice(1).map((img, idx) => (
                                <div key={idx + 1} className="relative group">
                                  <img
                                    src={img}
                                    alt={`${culture.name} ${idx + 2}`}
                                    className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-purple-500 transition-all hover:scale-105"
                                    onClick={() => openImageModal(img, culture.images, idx + 1)}
                                    onError={handleImageError}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                                    <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100"></i>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-purple-600">
                          <i className="fas fa-heart mr-2"></i>
                          <span className="text-sm font-medium">সাংস্কৃতিক ঐতিহ্য</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-12 rounded-xl text-center border-2 border-dashed border-purple-300">
                <i className="fas fa-theater-masks text-purple-400 text-6xl mb-6"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">সাংস্কৃতিক তথ্য খুঁজে পাওয়া যায়নি</h3>
                <p className="text-gray-600">এই ইউনিয়নের সাংস্কৃতিক ঐতিহ্য এবং সাহিত্যের তথ্য এখনও যোগ করা হয়নি।</p>
              </div>
            )}
          </div>
        )}

        {/* Famous Food Tab */}
        {activeTab === 'food' && (
          <div className="space-y-8">
            {union.famousFood && union.famousFood.length > 0 ? (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    <i className="fas fa-utensils text-orange-600 mr-2"></i>
                    স্বাদু স্থানীয় খাবার
                  </h3>
                  <p className="text-gray-600">এই ইউনিয়নের ঐতিহ্যবাহী এবং সুস্বাদু খাবারগুলোর সাথে পরিচিত হোন</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {union.famousFood.map((food, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {food.images && food.images.length > 0 && (
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={food.images[0]}
                            alt={food.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                            onClick={() => openImageModal(food.images[0], food.images, 0)}
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-xl font-bold text-white mb-1">
                              {food.bengaliName || food.name}
                            </h4>
                            {food.name !== food.bengaliName && (
                              <p className="text-sm text-orange-200">{food.name}</p>
                            )}
                            {food.images.length > 1 && (
                              <p className="text-sm text-orange-200">+{food.images.length - 1} ছবি</p>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        {(!food.images || food.images.length === 0) && (
                          <h4 className="text-xl font-bold text-gray-800 mb-3">
                            {food.bengaliName || food.name}
                          </h4>
                        )}
                        {food.description && (
                          <p className="text-gray-700 leading-relaxed mb-4">
                            {food.description}
                          </p>
                        )}
                        {food.images && food.images.length > 1 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-semibold text-gray-600 mb-2">অতিরিক্ত ছবি</h5>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {food.images.slice(1).map((img, idx) => (
                                <div key={idx + 1} className="relative group">
                                  <img
                                    src={img}
                                    alt={`${food.name} ${idx + 2}`}
                                    className="w-full h-20 sm:h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-orange-500 transition-all hover:scale-105"
                                    onClick={() => openImageModal(img, food.images, idx + 1)}
                                    onError={handleImageError}
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition rounded-lg flex items-center justify-center">
                                    <i className="fas fa-search-plus text-white opacity-0 group-hover:opacity-100"></i>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {food.mainIngredients && food.mainIngredients.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-600 mb-2">
                              <i className="fas fa-leaf mr-1 text-green-600"></i>প্রধান উপাদান:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {food.mainIngredients.map((ingredient, idx) => (
                                <span
                                  key={idx}
                                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center text-orange-600">
                          <i className="fas fa-star mr-2"></i>
                          <span className="text-sm font-medium">স্থানীয় স্বাদ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-12 rounded-xl text-center border-2 border-dashed border-orange-300">
                <i className="fas fa-utensils text-orange-400 text-6xl mb-6"></i>
                <h3 className="text-xl font-bold text-gray-800 mb-2">খাবারের তথ্য খুঁজে পাওয়া যায়নি</h3>
                <p className="text-gray-600">এই ইউনিয়নের বিখ্যাত খাবারগুলোর তথ্য এখনও যোগ করা হয়নি।</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal - rendered in portal so it's always on top and clickable */}
      {imageModal.open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeImageModal}
              className="absolute -top-2 -right-2 md:top-4 md:right-4 text-white text-3xl hover:text-gray-300 z-20 bg-black bg-opacity-60 rounded-full w-12 h-12 flex items-center justify-center transition shadow-lg"
              aria-label="বন্ধ করুন"
            >
              <i className="fas fa-times"></i>
            </button>

            {imageModal.images && imageModal.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigateImage(-1); }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-gray-300 z-20 bg-black bg-opacity-60 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition shadow-lg"
                  aria-label="আগের ছবি"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigateImage(1); }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white text-2xl md:text-3xl hover:text-gray-300 z-20 bg-black bg-opacity-60 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition shadow-lg"
                  aria-label="পরের ছবি"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}

            <img
              src={imageModal.src || demoImageFallback}
              alt="বড় দেখুন"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
              onError={(e) => {
                e.currentTarget.src = demoImageFallback;
              }}
            />

            {(imageModal.images && imageModal.images.length > 0) && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-base md:text-lg bg-black bg-opacity-60 px-4 py-2 rounded-full">
                {imageModal.currentIndex + 1} / {imageModal.images.length}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default UnionDetailPage;
