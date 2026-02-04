import React, { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../services/api';

const AdminManagementPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'admin'
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check if user is super_admin
  const userRole = localStorage.getItem('adminRole');
  const token = localStorage.getItem('adminToken');

  const fetchAdmins = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await adminAPI.getAll();
      setAdmins(response.data);
    } catch (err) {
      console.error('Error fetching admins:', err);
      const errorMsg = err.response?.data?.message || err.message || 'অ্যাডমিন তালিকা লোড বিফল';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userRole !== 'super_admin') {
      setError('শুধুমাত্র সুপার অ্যাডমিন এই পৃষ্ঠায় প্রবেশ করতে পারেন');
      setLoading(false);
      return;
    }

    if (!token) {
      setError('টোকেন পাওয়া যায়নি। অনুগ্রহ করে পুনরায় লগইন করুন');
      setLoading(false);
      return;
    }

    fetchAdmins();
  }, [userRole, token, fetchAdmins]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await adminAPI.register(formData);

      setSuccessMessage(response.data.message);
      setFormData({ fullName: '', email: '', password: '', role: 'admin' });
      setShowForm(false);

      // Refresh admin list
      setTimeout(() => fetchAdmins(), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'অ্যাডমিন যোগ করা বিফল');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (adminId, adminEmail) => {
    if (!window.confirm(`${adminEmail} কে মুছতে চান?`)) {
      return;
    }

    try {
      const response = await adminAPI.delete(adminId);

      setSuccessMessage(response.data.message);
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data?.message || 'অ্যাডমিন মুছা বিফল');
    }
  };

  if (userRole !== 'super_admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <i className="fas fa-lock text-red-600 text-5xl mb-4 block"></i>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">অনুমতি নেই</h1>
          <p className="text-gray-600">শুধুমাত্র সুপার অ্যাডমিন এই পৃষ্ঠায় প্রবেশ করতে পারেন।</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <i className="fas fa-users-cog text-green-600 mr-3"></i>অ্যাডমিন ম্যানেজমেন্ট
          </h1>
          <p className="text-gray-600">সমস্ত অ্যাডমিনকে দেখুন এবং পরিচালনা করুন</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-r-lg">
            <i className="fas fa-check-circle mr-2"></i>{successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
            <i className="fas fa-exclamation-circle mr-2"></i>
            <div>
              <p className="font-semibold">ত্রুটি</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Add Admin Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <i className="fas fa-user-plus text-green-600 mr-2"></i>নতুন অ্যাডমিন যোগ করুন
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              {showForm ? 'বাতিল করুন' : 'ফর্ম খুলুন'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="পূর্ণ নাম"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="ইমেল"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  name="password"
                  placeholder="পাসওয়ার্ড"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="admin">অ্যাডমিন</option>
                  <option value="super_admin">সুপার অ্যাডমিন</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>যোগ করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus mr-2"></i>অ্যাডমিন যোগ করুন
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Admins List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              <i className="fas fa-list text-green-600 mr-2"></i>সমস্ত অ্যাডমিনস ({admins.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <i className="fas fa-spinner fa-spin text-green-600 text-4xl"></i>
              <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
            </div>
          ) : admins.length === 0 ? (
            <div className="p-8 text-center text-gray-600">
              <i className="fas fa-inbox text-4xl mb-4 opacity-50 block"></i>
              <p>কোন অ্যাডমিন পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">নাম</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ইমেল</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ভূমিকা</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">তৈরির তারিখ</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin._id} className="border-b hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{admin.fullName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{admin.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            admin.role === 'super_admin'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {admin.role === 'super_admin' ? 'সুপার অ্যাডমিন' : 'অ্যাডমিন'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(admin.createdAt).toLocaleDateString('bn-BD')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDeleteAdmin(admin._id, admin.email)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                        >
                          <i className="fas fa-trash mr-1"></i>মুছুন
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage;
