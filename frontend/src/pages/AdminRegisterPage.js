import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

const AdminRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      setError('সকল ক্ষেত্র পূরণ করুন');
      return false;
    }

    if (formData.password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('পাসওয়ার্ড মিলছে না');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('বৈধ ইমেল ঠিকানা লিখুন');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });

      setSuccess(`✅ ${response.data.message}`);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'নিবন্ধন ব্যর্থ। দয়া করে পুনরায় চেষ্টা করুন।');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-4 inline-block mb-4 shadow-lg">
              <i className="fas fa-user-plus text-white text-4xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">নিবন্ধন করুন</h1>
            <p className="text-gray-600 mt-2 text-sm">অ্যাডমিন অ্যাকাউন্ট তৈরি করুন</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start">
                <i className="fas fa-check-circle mr-3 mt-0.5 text-green-500"></i>
                <div>
                  <p className="font-semibold">সফল!</p>
                  <p className="text-sm mt-1">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg animate-shake">
              <div className="flex items-start">
                <i className="fas fa-exclamation-circle mr-3 mt-0.5 text-red-500"></i>
                <div>
                  <p className="font-semibold">ত্রুটি</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-user text-blue-600 mr-2"></i>পূর্ণ নাম
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-envelope text-blue-600 mr-2"></i>ইমেল ঠিকানা
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@trishal.local"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-lock text-blue-600 mr-2"></i>পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 hover:text-gray-800 transition"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-lock-open text-blue-600 mr-2"></i>পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="পাসওয়ার্ড পুনরায় লিখুন"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3.5 text-gray-600 hover:text-gray-800 transition"
                >
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !formData.email || !formData.password || !formData.fullName}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>নিবন্ধন হচ্ছে...
                </>
              ) : (
                <>
                  <i className="fas fa-user-check mr-2"></i>নিবন্ধন করুন
                </>
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 mb-4">
              ইতিমধ্যে অ্যাকাউন্ট আছে?
            </p>
            <Link
              to="/admin/login"
              className="block text-center bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg transition"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>লগইন করুন
            </Link>
          </div>

          {/* Password Requirements */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-blue-900 mb-3">
              <i className="fas fa-info-circle mr-2"></i>পাসওয়ার্ড প্রয়োজনীয়তা
            </p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ কমপক্ষে ৬ অক্ষর</li>
              <li>✓ অক্ষর এবং সংখ্যা ব্যবহার করুন</li>
              <li>✓ শক্তিশালী পাসওয়ার্ড তৈরি করুন</li>
              <li>✓ পাসওয়ার্ড দ্বিমুখী যাচাই করুন</li>
            </ul>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              <i className="fas fa-lock mr-1"></i>এই সাইটটি সম্পূর্ণ সুরক্ষিত এবং এনক্রিপ্টেড
            </p>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-white text-sm">
          <p>
            <i className="fas fa-shield-alt mr-2"></i>প্রথম অ্যাডমিন স্বয়ংক্রিয়ভাবে সুপার অ্যাডমিন হবেন
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminRegisterPage;
