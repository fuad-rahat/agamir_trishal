import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import ImageModal from '../components/ImageModal';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminRole, setAdminRole] = useState('');

  const adminName = localStorage.getItem('adminName');

  const fetchUnions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/unions');
      setUnions(response.data);
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
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <i className="fas fa-list mr-3 text-green-600"></i>ইউনিয়ন তালিকা
              </h2>
              <p className="text-gray-600 mb-6">
                নিম্নের যেকোনো ইউনিয়ন নির্বাচন করে তথ্য দেখুন। ডেমো মোডে তথ্য যোগ/সম্পাদনা বন্ধ রাখা হয়েছে।
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
                  onClick={() => setSelectedUnion(union)}
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

                    <button className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium">
                      বিস্তারিত দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                ডেমো মোডে "সংক্ষিপ্ত পরিচয়", "চেয়ারম্যান", "ভ্রমণ স্থান", "সংস্কৃতি ও সাহিত্য", এবং "বিখ্যাত খাবার" যোগ/সম্পাদনা অপশন লুকানো হয়েছে।
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  <i className="fas fa-info-circle text-green-600 mr-2"></i>সংক্ষিপ্ত পরিচয়
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedUnion.introduction || 'এই ইউনিয়নের সংক্ষিপ্ত পরিচয় এখনো যোগ করা হয়নি।'}
                </p>
              </div>
            </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  <i className="fas fa-user-tie text-blue-600 mr-2"></i>চেয়ারম্যান
                </h4>
                {selectedUnion.chairman?.name ? (
                  <>
                    <p className="text-gray-800 font-semibold">{selectedUnion.chairman.name}</p>
                    {selectedUnion.chairman.contactNumber && (
                      <p className="text-gray-600 text-sm mt-1">{selectedUnion.chairman.contactNumber}</p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600 text-sm">চেয়ারম্যানের তথ্য যোগ করা হয়নি।</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  <i className="fas fa-location-dot text-green-600 mr-2"></i>ভ্রমণ স্থান
                </h4>
                {selectedUnion.placesToVisit?.length > 0 ? (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedUnion.placesToVisit.slice(0, 4).map((place, idx) => (
                      <li key={idx}>• {place.bengaliName || place.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">ভ্রমণ স্থানের তথ্য যোগ করা হয়নি।</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  <i className="fas fa-theater-masks text-purple-600 mr-2"></i>সংস্কৃতি ও সাহিত্য
                </h4>
                {selectedUnion.literatureAndCulture?.length > 0 ? (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedUnion.literatureAndCulture.slice(0, 4).map((culture, idx) => (
                      <li key={idx}>• {culture.bengaliName || culture.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">সংস্কৃতির তথ্য যোগ করা হয়নি।</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  <i className="fas fa-utensils text-orange-600 mr-2"></i>বিখ্যাত খাবার
                </h4>
                {selectedUnion.famousFood?.length > 0 ? (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedUnion.famousFood.slice(0, 6).map((food, idx) => (
                      <li key={idx}>• {food.bengaliName || food.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-sm">বিখ্যাত খাবারের তথ্য যোগ করা হয়নি।</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
