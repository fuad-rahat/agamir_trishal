import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = React.useState({ email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/admin/login', credentials);
      
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminEmail', response.data.admin.email);
      localStorage.setItem('adminName', response.data.admin.fullName);
      localStorage.setItem('adminRole', response.data.admin.role);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto-redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'লগইন বিফল। দয়া করে পুনরায় চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-green-700 to-green-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full p-4 inline-block mb-4 shadow-lg">
              <i className="fas fa-shield-alt text-white text-4xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">অ্যাডমিন প্যানেল</h1>
            <p className="text-gray-600 mt-2 text-sm">ত্রিশাল উপজেলা নাগরিক ম্যাপ</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg animate-shake">
              <div className="flex items-start">
                <i className="fas fa-exclamation-circle mr-3 mt-0.5 text-red-500"></i>
                <div>
                  <p className="font-semibold">লগইন ব্যর্থ</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-envelope text-green-600 mr-2"></i>ইমেল ঠিকানা
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="example@trishal.local"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <i className="fas fa-lock text-green-600 mr-2"></i>পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !credentials.email || !credentials.password}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>লগইন হচ্ছে...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>লগইন করুন
                </>
              )}
            </button>
          </form>

          {/* Info Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-xs text-gray-600 mb-4">
              প্রথমবার লগইন করছেন?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-900 mb-3">
                <i className="fas fa-info-circle mr-2"></i>তথ্য
              </p>
              <p className="text-xs text-blue-800 leading-relaxed">
                শুধুমাত্র অনুমোদিত অ্যাডমিনিস্ট্রেটররা এই পৃষ্ঠায় প্রবেশ করতে পারেন। আপনার পাসওয়ার্ড সুরক্ষিত এবং এনক্রিপ্টেড।
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-green-600 hover:text-green-700 font-medium text-sm transition"
              disabled={loading}
            >
              <i className="fas fa-arrow-left mr-2"></i>হোম পেজে ফিরুন
            </button>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm text-center animate-bounce">
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-4 inline-block mb-4 shadow-lg">
                <i className="fas fa-check text-white text-4xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">স্বাগতম!</h2>
              <p className="text-gray-600 mb-6">লগইন সফল। আপনি ড্যাশবোর্ডে পুনঃনির্দেশিত হচ্ছেন...</p>
              <div className="flex justify-center">
                <div className="animate-spin">
                  <i className="fas fa-spinner text-green-600 text-3xl"></i>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Info */}
        <div className="mt-6 text-center text-white text-sm">
          <p>
            <i className="fas fa-lock mr-2"></i>এই সাইটটি সুরক্ষিত এবং এনক্রিপ্টেড
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
        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-bounce {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;
