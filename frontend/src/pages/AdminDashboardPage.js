import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [formTab, setFormTab] = useState('chairman');
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [imageModal, setImageModal] = useState({ open: false, src: '', images: [], currentIndex: 0 });

  const adminName = localStorage.getItem('adminName');
  const token = localStorage.getItem('adminToken');

  const fetchUnions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/unions');
      setUnions(response.data);
      // Update selectedUnion if it exists
      if (selectedUnion) {
        const updated = response.data.find(u => u._id === selectedUnion._id);
        if (updated) setSelectedUnion(updated);
      }
      setError('');
    } catch (err) {
      setError('ইউনিয়ন ডেটা লোড করতে ব্যর্থ');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedUnion]);

  useEffect(() => {
    const role = localStorage.getItem('adminRole');
    setAdminRole(role);
    fetchUnions();
  }, [fetchUnions]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminRole');
    navigate('/admin/login');
  };

  const handleSelectUnion = (union) => {
    setSelectedUnion(union);
    setFormData({});
    setFormTab('chairman');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultipleImageUpload = (e, fieldName) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setFormData(prev => ({ ...prev, [fieldName]: images }));
    });
  };

  const openImageModal = (src, images = [], currentIndex = 0) => {
    setImageModal({ open: true, src, images, currentIndex });
  };

  const navigateImage = (direction) => {
    const { images, currentIndex } = imageModal;
    if (!images || images.length === 0) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setImageModal(prev => ({
      ...prev,
      src: images[newIndex],
      currentIndex: newIndex
    }));
  };

  const closeImageModal = () => {
    setImageModal({ open: false, src: '', images: [], currentIndex: 0 });
  };

  const handleAddChairman = async (e) => {
    e.preventDefault();
    if (!selectedUnion || !formData.chairmanName) return;

    try {
      await api.post(
        `/unions/${selectedUnion._id}/chairman`,
        {
          name: formData.chairmanName,
          contactNumber: formData.contactNumber,
          images: formData.chairmanImages || [] // array of base64 data URLs from file input
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('চেয়ারম্যান তথ্য যোগ হয়েছে');
      setFormData({});
      fetchUnions();
    } catch (err) {
      alert(err.response?.data?.message || 'ত্রুটি ঘটেছে');
    }
  };

  const handleAddPlaceToVisit = async (e) => {
    e.preventDefault();
    if (!selectedUnion || !formData.placeName) return;

    try {
      await api.post(
        `/unions/${selectedUnion._id}/place-to-visit`,
        {
          name: formData.placeName,
          bengaliName: formData.placeBengaliName,
          description: formData.placeDescription,
          images: formData.placeImages || []
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('ভ্রমণ স্থান যোগ হয়েছে');
      setFormData({});
      fetchUnions();
    } catch (err) {
      alert(err.response?.data?.message || 'ত্রুটি ঘটেছে');
    }
  };

  const handleAddFamousPlace = async (e) => {
    e.preventDefault();
    if (!selectedUnion || !formData.famousPlaceName) return;

    try {
      await api.post(
        `/unions/${selectedUnion._id}/famous-place`,
        {
          name: formData.famousPlaceName,
          bengaliName: formData.famousPlaceBengaliName,
          description: formData.famousPlaceDescription,
          historicalSignificance: formData.historicalSignificance,
          images: formData.famousPlaceImages || [] // array of base64
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('বিখ্যাত স্থান যোগ হয়েছে');
      setFormData({});
      fetchUnions();
    } catch (err) {
      alert(err.response?.data?.message || 'ত্রুটি ঘটেছে');
    }
  };

  const handleAddCulture = async (e) => {
    e.preventDefault();
    if (!selectedUnion || !formData.cultureName) {
      alert('নাম অবশ্যই প্রয়োজন');
      return;
    }

    try {
      // Ensure images is a proper array
      let imagesArray = [];
      if (formData.cultureImages) {
        if (Array.isArray(formData.cultureImages)) {
          imagesArray = formData.cultureImages.filter(img => img && typeof img === 'string');
        } else if (typeof formData.cultureImages === 'string') {
          try {
            const parsed = JSON.parse(formData.cultureImages);
            imagesArray = Array.isArray(parsed) ? parsed.filter(img => img && typeof img === 'string') : [formData.cultureImages];
          } catch {
            imagesArray = [formData.cultureImages];
          }
        }
      }

      await api.post(
        `/unions/${selectedUnion._id}/culture`,
        {
          name: formData.cultureName,
          bengaliName: formData.cultureBengaliName || formData.cultureName,
          type: formData.cultureType || 'শিল্প রূপ',
          description: formData.cultureDescription || '',
          images: imagesArray
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('সংস্কৃতি তথ্য যোগ হয়েছে');
      setFormData({});
      await fetchUnions();
    } catch (err) {
      console.error('Culture upload error:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'ত্রুটি ঘটেছে';
      alert(`ত্রুটি: ${errorMsg}`);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!selectedUnion || !formData.foodName) return;

    try {
      const ingredients = formData.ingredients
        ? formData.ingredients.split(',').map(i => i.trim())
        : [];

      await api.post(
        `/unions/${selectedUnion._id}/food`,
        {
          name: formData.foodName,
          bengaliName: formData.foodBengaliName,
          description: formData.foodDescription,
          mainIngredients: ingredients,
          images: formData.foodImages || [] // array of base64
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('খাবার তথ্য যোগ হয়েছে');
      setFormData({});
      fetchUnions();
    } catch (err) {
      alert(err.response?.data?.message || 'ত্রুটি ঘটেছে');
    }
  };

  if (loading && !selectedUnion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">লোড করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              <i className="fas fa-tachometer-alt text-green-600 mr-3"></i>অ্যাডমিন ড্যাশবোর্ড
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              স্বাগতম, {adminName} ({adminRole === 'super_admin' ? 'সুপার অ্যাডমিন' : 'অ্যাডমিন'})
            </p>
          </div>
          <div className="flex items-center gap-3">
            {adminRole === 'super_admin' && (
              <button
                onClick={() => navigate('/admin/management')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center"
              >
                <i className="fas fa-users-cog mr-2"></i>অ্যাডমিন ম্যানেজ
              </button>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition flex items-center"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>লগআউট
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedUnion ? (
          // Unions List
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <i className="fas fa-list mr-3 text-green-600"></i>ইউনিয়ন তালিকা
              </h2>
              <p className="text-gray-600 mb-6">
                নিম্নের যেকোনো ইউনিয়ন নির্বাচন করে তার তথ্য যোগ করুন
              </p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unions.map(union => (
                <div
                  key={union._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer border-t-4 border-green-600"
                  onClick={() => handleSelectUnion(union)}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {union.bengaliName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{union.name}</p>

                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>
                        <i className="fas fa-users text-green-600 mr-2"></i>
                        জনসংখ্যা: {union.populationEstimate || 'N/A'}
                      </p>
                      <p>
                        <i className="fas fa-map text-green-600 mr-2"></i>
                        এলাকা: {union.areaSize || 'N/A'} km²
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap text-xs">
                      {union.chairman?.name && (
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          <i className="fas fa-check mr-1"></i>চেয়ারম্যান
                        </span>
                      )}
                      {union.placesToVisit?.length > 0 && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          <i className="fas fa-check mr-1"></i>স্থান ({union.placesToVisit.length})
                        </span>
                      )}
                      {union.literatureAndCulture?.length > 0 && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          <i className="fas fa-check mr-1"></i>সংস্কৃতি ({union.literatureAndCulture.length})
                        </span>
                      )}
                      {union.famousFood?.length > 0 && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          <i className="fas fa-check mr-1"></i>খাবার ({union.famousFood.length})
                        </span>
                      )}
                    </div>

                    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
                      এডিট করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Edit Union
          <div>
            <button
              onClick={() => setSelectedUnion(null)}
              className="mb-6 flex items-center text-green-600 hover:text-green-700 font-medium transition"
            >
              <i className="fas fa-arrow-left mr-2"></i>সব ইউনিয়ন দেখুন
            </button>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedUnion.bengaliName}
              </h2>
              <p className="text-gray-600 mb-4">{selectedUnion.name}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex flex-wrap border-b">
                {[
                  { id: 'chairman', label: 'চেয়ারম্যান', icon: 'fa-user-tie' },
                  { id: 'places', label: 'ভ্রমণ স্থান', icon: 'fa-location-dot' },
                  { id: 'culture', label: 'সংস্কৃতি', icon: 'fa-theater-masks' },
                  { id: 'food', label: 'খাবার', icon: 'fa-utensils' },
                  { id: 'introduction', label: 'সংখিপ্ত পরিচয়', icon: 'fa-info-circle' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFormTab(tab.id)}
                    className={`px-6 py-3 font-medium flex items-center transition ${
                      formTab === tab.id
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    <i className={`fas ${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <div className="p-6">
                {/* Chairman Form */}
                {formTab === 'chairman' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">চেয়ারম্যান তথ্য</h3>
                      {selectedUnion.chairman?.name && (
                        <button
                          onClick={() => {
                            setFormData({
                              chairmanName: selectedUnion.chairman.name,
                              contactNumber: selectedUnion.chairman.contactNumber || '',
                              chairmanImages: selectedUnion.chairman.images || []
                            });
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                        >
                          <i className="fas fa-edit mr-2"></i>সম্পাদনা করুন
                        </button>
                      )}
                    </div>
                    {selectedUnion.chairman?.name && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold text-gray-800">বর্তমান চেয়ারম্যান: {selectedUnion.chairman.name}</p>
                        {selectedUnion.chairman.contactNumber && (
                          <p className="text-sm text-gray-600">যোগাযোগ: {selectedUnion.chairman.contactNumber}</p>
                        )}
                        {selectedUnion.chairman.images && selectedUnion.chairman.images.length > 0 && (
                          <p className="text-sm text-gray-600">ছবি: {selectedUnion.chairman.images.length} টি</p>
                        )}
                      </div>
                    )}
                    <form onSubmit={handleAddChairman} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="chairmanName"
                          placeholder="চেয়ারম্যানের নাম"
                          value={formData.chairmanName || ''}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="tel"
                          name="contactNumber"
                          placeholder="যোগাযোগ নম্বর"
                          value={formData.contactNumber || ''}
                          onChange={handleInputChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">চেয়ারম্যানের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageUpload(e, 'chairmanImages')}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                        />
                        {formData.chairmanImages && formData.chairmanImages.length > 0 && (
                          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {formData.chairmanImages.map((src, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-green-500 transition"
                                  onClick={() => openImageModal(src, formData.chairmanImages, idx)}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      chairmanImages: prev.chairmanImages.filter((_, i) => i !== idx)
                                    }));
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        <i className="fas fa-save mr-2"></i>{selectedUnion.chairman?.name ? 'আপডেট করুন' : 'যোগ করুন'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Places Form */}
                {formTab === 'places' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">ভ্রমণ স্থান</h3>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        <i className="fas fa-plus mr-2"></i>নতুন যোগ করুন
                      </button>
                    </div>

                    {!editingItem ? (
                      <form onSubmit={handleAddPlaceToVisit} className="space-y-4">
                        <input
                          type="text"
                          name="placeName"
                          placeholder="স্থানের ইংরেজি নাম"
                          value={formData.placeName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="text"
                          name="placeBengaliName"
                          placeholder="স্থানের বাংলা নাম"
                          value={formData.placeBengaliName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                          name="placeDescription"
                          placeholder="বর্ণনা"
                          value={formData.placeDescription || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                        ></textarea>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">স্থানের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMultipleImageUpload(e, 'placeImages')}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                          />
                          {formData.placeImages && formData.placeImages.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.placeImages.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                  onClick={() => openImageModal(src, formData.placeImages)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                          <i className="fas fa-plus mr-2"></i>স্থান যোগ করুন
                        </button>
                      </form>
                    ) : (
                      <div>
                        <h4 className="text-md font-semibold text-gray-700 mb-4">স্থান সম্পাদনা করুন</h4>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            await api.put(
                              `/unions/${selectedUnion._id}/place-to-visit/${editingItem._id}`,
                              {
                                name: formData.placeName,
                                bengaliName: formData.placeBengaliName,
                                description: formData.placeDescription,
                                images: formData.placeImages || []
                              },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            alert('স্থান আপডেট হয়েছে');
                            setEditingItem(null);
                            setFormData({});
                            await fetchUnions();
                          } catch (err) {
                            alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                          }
                        }} className="space-y-4">
                          <input
                            type="text"
                            name="placeName"
                            placeholder="স্থানের ইংরেজি নাম"
                            value={formData.placeName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <input
                            type="text"
                            name="placeBengaliName"
                            placeholder="স্থানের বাংলা নাম"
                            value={formData.placeBengaliName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <textarea
                            name="placeDescription"
                            placeholder="বর্ণনা"
                            value={formData.placeDescription || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                          ></textarea>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">স্থানের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleMultipleImageUpload(e, 'placeImages')}
                              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                            />
                            {formData.placeImages && formData.placeImages.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {formData.placeImages.map((src, idx) => (
                                  <img
                                    key={idx}
                                    src={src}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                    onClick={() => openImageModal(src, formData.placeImages, idx)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                              <i className="fas fa-save mr-2"></i>সংরক্ষণ করুন
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(null);
                                setFormData({});
                              }}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                              <i className="fas fa-times mr-2"></i>বাতিল
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Existing Places List */}
                    {selectedUnion.placesToVisit && selectedUnion.placesToVisit.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-700 mb-4">বিদ্যমান স্থানসমূহ</h4>
                        <div className="space-y-4">
                          {selectedUnion.placesToVisit.map((place, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800">{place.bengaliName || place.name}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                                </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                const placeId = place._id || (place.id) || idx.toString();
                                setEditingItem({ ...place, _id: placeId });
                                setFormData({
                                  placeName: place.name,
                                  placeBengaliName: place.bengaliName,
                                  placeDescription: place.description,
                                  placeImages: place.images || []
                                });
                              }}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                                  onClick={async () => {
                                    if (window.confirm('আপনি কি এই স্থানটি মুছে ফেলতে চান?')) {
                                      try {
                                        const placeId = place._id || place.id || idx.toString();
                                        await api.delete(
                                          `/unions/${selectedUnion._id}/place-to-visit/${placeId}`,
                                          { headers: { Authorization: `Bearer ${token}` } }
                                        );
                                        alert('স্থান মুছে ফেলা হয়েছে');
                                        await fetchUnions();
                                      } catch (err) {
                                        alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                                      }
                                    }
                                  }}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Famous Places Form */}
                {formTab === 'famous' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">বিখ্যাত স্থান যোগ করুন</h3>
                    <form onSubmit={handleAddFamousPlace} className="space-y-4">
                      <input
                        type="text"
                        name="famousPlaceName"
                        placeholder="স্থানের ইংরেজি নাম"
                        value={formData.famousPlaceName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <input
                        type="text"
                        name="famousPlaceBengaliName"
                        placeholder="স্থানের বাংলা নাম"
                        value={formData.famousPlaceBengaliName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <textarea
                        name="famousPlaceDescription"
                        placeholder="বর্ণনা"
                        value={formData.famousPlaceDescription || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                      ></textarea>
                      <textarea
                        name="historicalSignificance"
                        placeholder="ঐতিহাসিক গুরুত্ব"
                        value={formData.historicalSignificance || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                      ></textarea>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">বিখ্যাত স্থানের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageUpload(e, 'famousPlaceImages')}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                        />
                        {formData.famousPlaceImages && formData.famousPlaceImages.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {formData.famousPlaceImages.map((src, idx) => (
                              <img
                                key={idx}
                                src={src}
                                alt={`Preview ${idx + 1}`}
                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                onClick={() => openImageModal(src, formData.famousPlaceImages, idx)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        <i className="fas fa-plus mr-2"></i>বিখ্যাত স্থান যোগ করুন
                      </button>
                    </form>
                  </div>
                )}

                {/* Culture Form */}
                {formTab === 'culture' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">সংস্কৃতি</h3>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        <i className="fas fa-plus mr-2"></i>নতুন যোগ করুন
                      </button>
                    </div>

                    {!editingItem ? (
                      <form onSubmit={handleAddCulture} className="space-y-4">
                        <input
                          type="text"
                          name="cultureName"
                          placeholder="নামের ইংরেজি রূপ"
                          value={formData.cultureName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="text"
                          name="cultureBengaliName"
                          placeholder="নামের বাংলা রূপ"
                          value={formData.cultureBengaliName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <select
                          name="cultureType"
                          value={formData.cultureType || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        >
                          <option value="">ধরন নির্বাচন করুন</option>
                          <option value="শিল্প রূপ">শিল্প রূপ</option>
                          <option value="ঐতিহ্যবাহী খেলা">ঐতিহ্যবাহী খেলা</option>
                          <option value="লোককাহিনী">লোককাহিনী</option>
                          <option value="কারুশিল্প">কারুশিল্প</option>
                          <option value="সঙ্গীত">সঙ্গীত</option>
                          <option value="নৃত্য">নৃত্য</option>
                        </select>
                        <textarea
                          name="cultureDescription"
                          placeholder="বর্ণনা"
                          value={formData.cultureDescription || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                        ></textarea>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">সংস্কৃতির ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMultipleImageUpload(e, 'cultureImages')}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                          />
                          {formData.cultureImages && formData.cultureImages.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.cultureImages.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                  onClick={() => openImageModal(src, formData.cultureImages, idx)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                          <i className="fas fa-plus mr-2"></i>সংস্কৃতি যোগ করুন
                        </button>
                      </form>
                    ) : (
                      <div>
                        <h4 className="text-md font-semibold text-gray-700 mb-4">সংস্কৃতি সম্পাদনা করুন</h4>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            await api.put(
                              `/unions/${selectedUnion._id}/culture/${editingItem._id}`,
                              {
                                name: formData.cultureName,
                                bengaliName: formData.cultureBengaliName,
                                type: formData.cultureType,
                                description: formData.cultureDescription,
                                images: formData.cultureImages || []
                              },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            alert('সংস্কৃতি তথ্য আপডেট হয়েছে');
                            setEditingItem(null);
                            setFormData({});
                            await fetchUnions();
                          } catch (err) {
                            alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                          }
                        }} className="space-y-4">
                          <input
                            type="text"
                            name="cultureName"
                            placeholder="নামের ইংরেজি রূপ"
                            value={formData.cultureName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <input
                            type="text"
                            name="cultureBengaliName"
                            placeholder="নামের বাংলা রূপ"
                            value={formData.cultureBengaliName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <select
                            name="cultureType"
                            value={formData.cultureType || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="">ধরন নির্বাচন করুন</option>
                            <option value="শিল্প রূপ">শিল্প রূপ</option>
                            <option value="ঐতিহ্যবাহী খেলা">ঐতিহ্যবাহী খেলা</option>
                            <option value="লোককাহিনী">লোককাহিনী</option>
                            <option value="কারুশিল্প">কারুশিল্প</option>
                            <option value="সঙ্গীত">সঙ্গীত</option>
                            <option value="নৃত্য">নৃত্য</option>
                          </select>
                          <textarea
                            name="cultureDescription"
                            placeholder="বর্ণনা"
                            value={formData.cultureDescription || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                          ></textarea>
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">সংস্কৃতির ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleMultipleImageUpload(e, 'cultureImages')}
                              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                            />
                            {formData.cultureImages && formData.cultureImages.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {formData.cultureImages.map((src, idx) => (
                                  <img
                                    key={idx}
                                    src={src}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                    onClick={() => openImageModal(src, formData.cultureImages, idx)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                              <i className="fas fa-save mr-2"></i>সংরক্ষণ করুন
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(null);
                                setFormData({});
                              }}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                              <i className="fas fa-times mr-2"></i>বাতিল
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Existing Culture List */}
                    {selectedUnion.literatureAndCulture && selectedUnion.literatureAndCulture.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-700 mb-4">বিদ্যমান সংস্কৃতি</h4>
                        <div className="space-y-4">
                          {selectedUnion.literatureAndCulture.map((culture, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800">{culture.bengaliName || culture.name}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{culture.description}</p>
                                  <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                    {culture.type}
                                  </span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      const cultureId = culture._id || culture.id || idx.toString();
                                      setEditingItem({ ...culture, _id: cultureId });
                                      setFormData({
                                        cultureName: culture.name,
                                        cultureBengaliName: culture.bengaliName,
                                        cultureType: culture.type,
                                        cultureDescription: culture.description,
                                        cultureImages: culture.images || []
                                      });
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (window.confirm('আপনি কি এই সংস্কৃতি তথ্য মুছে ফেলতে চান?')) {
                                        try {
                                          const cultureId = culture._id || culture.id || idx.toString();
                                          await api.delete(
                                            `/unions/${selectedUnion._id}/culture/${cultureId}`,
                                            { headers: { Authorization: `Bearer ${token}` } }
                                          );
                                          alert('সংস্কৃতি তথ্য মুছে ফেলা হয়েছে');
                                          await fetchUnions();
                                        } catch (err) {
                                          alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                                        }
                                      }
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Food Form */}
                {formTab === 'food' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-800">খাবার</h3>
                      <button
                        onClick={() => setEditingItem(null)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                      >
                        <i className="fas fa-plus mr-2"></i>নতুন যোগ করুন
                      </button>
                    </div>

                    {!editingItem ? (
                      <form onSubmit={handleAddFood} className="space-y-4">
                        <input
                          type="text"
                          name="foodName"
                          placeholder="খাবারের ইংরেজি নাম"
                          value={formData.foodName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="text"
                          name="foodBengaliName"
                          placeholder="খাবারের বাংলা নাম"
                          value={formData.foodBengaliName || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                          name="foodDescription"
                          placeholder="বর্ণনা"
                          value={formData.foodDescription || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                        ></textarea>
                        <input
                          type="text"
                          name="ingredients"
                          placeholder="প্রধান উপাদান (কমা দ্বারা আলাদা করুন)"
                          value={formData.ingredients || ''}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">খাবারের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleMultipleImageUpload(e, 'foodImages')}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                          />
                          {formData.foodImages && formData.foodImages.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {formData.foodImages.map((src, idx) => (
                                <img
                                  key={idx}
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                  onClick={() => openImageModal(src, formData.foodImages, idx)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                        >
                          <i className="fas fa-plus mr-2"></i>খাবার যোগ করুন
                        </button>
                      </form>
                    ) : (
                      <div>
                        <h4 className="text-md font-semibold text-gray-700 mb-4">খাবার সম্পাদনা করুন</h4>
                        <form onSubmit={async (e) => {
                          e.preventDefault();
                          try {
                            const ingredients = formData.ingredients
                              ? formData.ingredients.split(',').map(i => i.trim())
                              : [];
                            await api.put(
                              `/unions/${selectedUnion._id}/food/${editingItem._id}`,
                              {
                                name: formData.foodName,
                                bengaliName: formData.foodBengaliName,
                                description: formData.foodDescription,
                                mainIngredients: ingredients,
                                images: formData.foodImages || []
                              },
                              { headers: { Authorization: `Bearer ${token}` } }
                            );
                            alert('খাবার তথ্য আপডেট হয়েছে');
                            setEditingItem(null);
                            setFormData({});
                            await fetchUnions();
                          } catch (err) {
                            alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                          }
                        }} className="space-y-4">
                          <input
                            type="text"
                            name="foodName"
                            placeholder="খাবারের ইংরেজি নাম"
                            value={formData.foodName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <input
                            type="text"
                            name="foodBengaliName"
                            placeholder="খাবারের বাংলা নাম"
                            value={formData.foodBengaliName || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <textarea
                            name="foodDescription"
                            placeholder="বর্ণনা"
                            value={formData.foodDescription || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
                          ></textarea>
                          <input
                            type="text"
                            name="ingredients"
                            placeholder="প্রধান উপাদান (কমা দ্বারা আলাদা করুন)"
                            value={formData.ingredients || ''}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">খাবারের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleMultipleImageUpload(e, 'foodImages')}
                              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                            />
                            {formData.foodImages && formData.foodImages.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {formData.foodImages.map((src, idx) => (
                                  <img
                                    key={idx}
                                    src={src}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer"
                                    onClick={() => openImageModal(src, formData.foodImages, idx)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                              <i className="fas fa-save mr-2"></i>সংরক্ষণ করুন
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingItem(null);
                                setFormData({});
                              }}
                              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                            >
                              <i className="fas fa-times mr-2"></i>বাতিল
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Existing Food List */}
                    {selectedUnion.famousFood && selectedUnion.famousFood.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-700 mb-4">বিদ্যমান খাবার</h4>
                        <div className="space-y-4">
                          {selectedUnion.famousFood.map((food, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-gray-800">{food.bengaliName || food.name}</h5>
                                  <p className="text-sm text-gray-600 mt-1">{food.description}</p>
                                  {food.mainIngredients && food.mainIngredients.length > 0 && (
                                    <p className="text-sm text-gray-500 mt-1">
                                      উপাদান: {food.mainIngredients.join(', ')}
                                    </p>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      const foodId = food._id || food.id || idx.toString();
                                      setEditingItem({ ...food, _id: foodId });
                                      setFormData({
                                        foodName: food.name,
                                        foodBengaliName: food.bengaliName,
                                        foodDescription: food.description,
                                        ingredients: food.mainIngredients?.join(', ') || '',
                                        foodImages: food.images || []
                                      });
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button
                                    onClick={async () => {
                                      if (window.confirm('আপনি কি এই খাবার তথ্য মুছে ফেলতে চান?')) {
                                        try {
                                          const foodId = food._id || food.id || idx.toString();
                                          await api.delete(
                                            `/unions/${selectedUnion._id}/food/${foodId}`,
                                            { headers: { Authorization: `Bearer ${token}` } }
                                          );
                                          alert('খাবার তথ্য মুছে ফেলা হয়েছে');
                                          await fetchUnions();
                                        } catch (err) {
                                          alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                                        }
                                      }
                                    }}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Introduction Form */}
                {formTab === 'introduction' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4">সংক্ষিপ্ত পরিচয়</h3>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const introFields = formData.introductionFields !== undefined
                          ? formData.introductionFields
                          : (selectedUnion.introductionFields || []);
                        await api.put(
                          `/unions/${selectedUnion._id}/introduction`,
                          {
                            introduction: formData.introduction !== undefined ? formData.introduction : (selectedUnion.introduction || ''),
                            introductionImages: formData.introductionImages !== undefined ? formData.introductionImages : (selectedUnion.introductionImages || []),
                            introductionFields: Array.isArray(introFields) ? introFields : []
                          },
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        alert('সংক্ষিপ্ত পরিচয় আপডেট হয়েছে');
                        setFormData({});
                        await fetchUnions();
                      } catch (err) {
                        alert(err.response?.data?.error || 'ত্রুটি ঘটেছে');
                      }
                    }} className="space-y-4">
                      <textarea
                        name="introduction"
                        placeholder="ইউনিয়নের সংক্ষিপ্ত পরিচয় লিখুন..."
                        value={formData.introduction !== undefined ? formData.introduction : (selectedUnion.introduction || '')}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
                      ></textarea>
                      
                      {/* Key-Value Pairs */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <label className="block text-sm font-medium text-gray-700">অতিরিক্ত তথ্য (ফিল্ড এবং মান)</label>
                          <button
                            type="button"
                            onClick={() => {
                              const currentFields = formData.introductionFields || selectedUnion.introductionFields || [];
                              setFormData(prev => ({
                                ...prev,
                                introductionFields: [...currentFields, { key: '', value: '' }]
                              }));
                            }}
                            className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                          >
                            <i className="fas fa-plus mr-1"></i>নতুন ফিল্ড
                          </button>
                        </div>
                        {(() => {
                          const currentFields = formData.introductionFields !== undefined 
                            ? formData.introductionFields 
                            : (selectedUnion.introductionFields || []);
                          return currentFields.map((field, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 items-end">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">ফিল্ড নাম</label>
                                <input
                                  type="text"
                                  placeholder="যেমন: প্রতিষ্ঠা সাল"
                                  value={field?.key || ''}
                                  onChange={(e) => {
                                    const fields = formData.introductionFields !== undefined 
                                      ? formData.introductionFields 
                                      : (selectedUnion.introductionFields || []);
                                    const updated = [...fields];
                                    updated[idx] = { ...(updated[idx] || {}), key: e.target.value };
                                    setFormData(prev => ({ ...prev, introductionFields: updated }));
                                  }}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                />
                              </div>
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <label className="block text-xs text-gray-600 mb-1">মান</label>
                                  <input
                                    type="text"
                                    placeholder="যেমন: ১৯৭১"
                                    value={field?.value || ''}
                                    onChange={(e) => {
                                      const fields = formData.introductionFields !== undefined 
                                        ? formData.introductionFields 
                                        : (selectedUnion.introductionFields || []);
                                      const updated = [...fields];
                                      updated[idx] = { ...(updated[idx] || {}), value: e.target.value };
                                      setFormData(prev => ({ ...prev, introductionFields: updated }));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const fields = formData.introductionFields !== undefined 
                                      ? formData.introductionFields 
                                      : (selectedUnion.introductionFields || []);
                                    const updated = fields.filter((_, i) => i !== idx);
                                    setFormData(prev => ({ ...prev, introductionFields: updated }));
                                  }}
                                  className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ));
                        })()}
                        {(() => {
                          const currentFields = formData.introductionFields !== undefined 
                            ? formData.introductionFields 
                            : (selectedUnion.introductionFields || []);
                          return currentFields.length === 0 && (
                            <p className="text-sm text-gray-500 italic">কোন ফিল্ড যোগ করা হয়নি। "নতুন ফিল্ড" বাটন ক্লিক করুন।</p>
                          );
                        })()}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">সংক্ষিপ্ত পরিচয়ের ছবি (একাধিক ছবি নির্বাচন করুন)</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMultipleImageUpload(e, 'introductionImages')}
                          className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition cursor-pointer"
                        />
                        {(formData.introductionImages || selectedUnion.introductionImages || []).length > 0 && (
                          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {(formData.introductionImages || selectedUnion.introductionImages || []).map((src, idx) => (
                              <div key={idx} className="relative group">
                                <img
                                  src={src}
                                  alt={`Preview ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border-2 border-gray-300 cursor-pointer hover:border-green-500 transition"
                                  onClick={() => openImageModal(src, formData.introductionImages || selectedUnion.introductionImages || [], idx)}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImages = formData.introductionImages || selectedUnion.introductionImages || [];
                                    const updated = currentImages.filter((_, i) => i !== idx);
                                    setFormData(prev => ({ ...prev, introductionImages: updated }));
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        <i className="fas fa-save mr-2"></i>সংরক্ষণ করুন
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Existing Data Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedUnion.chairman?.name && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    <i className="fas fa-user-tie text-blue-600 mr-2"></i>চেয়ারম্যান
                  </h4>
                  <p className="text-gray-700 font-semibold">{selectedUnion.chairman.name}</p>
                  {selectedUnion.chairman.contactNumber && (
                    <p className="text-gray-600 text-sm">{selectedUnion.chairman.contactNumber}</p>
                  )}
                </div>
              )}

              {selectedUnion.placesToVisit?.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    <i className="fas fa-location-dot text-green-600 mr-2"></i>ভ্রমণ স্থান ({selectedUnion.placesToVisit.length})
                  </h4>
                  <ul className="space-y-2">
                    {selectedUnion.placesToVisit.slice(0, 3).map((place, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        • {place.bengaliName || place.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedUnion.literatureAndCulture?.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    <i className="fas fa-theater-masks text-purple-600 mr-2"></i>সংস্কৃতি ({selectedUnion.literatureAndCulture.length})
                  </h4>
                  <ul className="space-y-2">
                    {selectedUnion.literatureAndCulture.slice(0, 3).map((culture, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        • {culture.bengaliName || culture.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedUnion.famousFood?.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    <i className="fas fa-utensils text-orange-600 mr-2"></i>খাবার ({selectedUnion.famousFood.length})
                  </h4>
                  <ul className="space-y-2">
                    {selectedUnion.famousFood.slice(0, 3).map((food, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">
                        • {food.bengaliName || food.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Image Modal */}
        {imageModal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full p-4">
              <button
                onClick={closeImageModal}
                className="absolute top-2 right-2 text-white text-2xl hover:text-gray-300 z-10"
              >
                <i className="fas fa-times"></i>
              </button>

              {imageModal.images && imageModal.images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 z-10"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 z-10"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </>
              )}

              <img
                src={imageModal.src}
                alt="Modal"
                className="max-w-full max-h-full object-contain"
              />

              {imageModal.images && imageModal.images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm">
                  {imageModal.currentIndex + 1} / {imageModal.images.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminDashboardPage;