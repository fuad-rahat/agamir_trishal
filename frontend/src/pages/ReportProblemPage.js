import React, { useState } from 'react';
import { problemsAPI } from '../services/api';
import { PROBLEM_CATEGORIES } from '../utils/constants';
import { getObjectId } from '../utils/unionMapping';

// Hardcoded 12 Unions with Bengali names (original serial order)
const TRISHAL_UNIONS = [
  { id: '1', name: 'Dhankhola', bengaliName: 'ধানীখোলা', number: '১' },
  { id: '2', name: 'Bailor', bengaliName: 'বৈলর', number: '২' },
  { id: '3', name: 'Kanthal', bengaliName: 'কাঁঠাল', number: '৩' },
  { id: '4', name: 'Kanihary', bengaliName: 'কানিহারী', number: '৪' },
  { id: '5', name: 'Rampur', bengaliName: 'রামপুর', number: '৫' },
  { id: '6', name: 'Trishal', bengaliName: 'ত্রিশাল', number: '৬' },
  { id: '7', name: 'Harirampur', bengaliName: 'হরিরামপুর', number: '৭' },
  { id: '8', name: 'Sakhua', bengaliName: 'সাখুয়া', number: '৮' },
  { id: '9', name: 'Balipara', bengaliName: 'বালিপাড়া', number: '৯' },
  { id: '10', name: 'Mothbari', bengaliName: 'মঠবাড়ী', number: '১০' },
  { id: '11', name: 'Mokspur', bengaliName: 'মোক্ষপুর', number: '১১' },
  { id: '12', name: 'Amirabari', bengaliName: 'আমিরাবাড়ী', number: '১২' }
];

const ReportProblemPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    union: '',
    coordinates: [90.3947568, 24.5826256],
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUnionSelect = (unionId) => {
    setFormData(prev => ({
      ...prev,
      union: unionId
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!formData.title || !formData.description || !formData.category || !formData.union) {
        throw new Error('সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন');
      }

      // Convert string union ID to MongoDB ObjectId
      const unionObjectId = getObjectId(formData.union);

      await problemsAPI.create({
        ...formData,
        union: unionObjectId,
        isAnonymous: true,
      });

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: '',
        union: '',
        coordinates: [90.3947568, 24.5826256],
        images: [],
      });

      setTimeout(() => {
        setSuccess(false);
        window.location.href = '/problems';
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 min-h-screen py-6 md:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            <i className="fas fa-exclamation-circle text-red-600 mr-3"></i>সমস্যা রিপোর্ট করুন
          </h1>
          <p className="text-xl text-gray-700 mb-2">আপনার এলাকার যেকোনো সমস্যা আমাদের কাছে জানান</p>
          <p className="text-gray-600 flex items-center justify-center">
            <i className="fas fa-shield-alt text-green-600 mr-2"></i>
            আপনার তথ্য সম্পূর্ণ গোপনীয় এবং সুরক্ষিত থাকবে
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-xl mb-8 shadow-lg animate-pulse">
            <p className="text-xl font-bold"><i className="fas fa-check-circle mr-2"></i>অসাধারণ! আপনার সমস্যা রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে</p>
            <p className="text-sm mt-2">আমাদের দল এটি পর্যালোচনা করবে এবং দ্রুত সমাধানের চেষ্টা করবে।</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-6 rounded-xl mb-8 shadow-lg">
            <p className="font-bold"><i className="fas fa-exclamation-triangle mr-2"></i>ত্রুটি: {error}</p>
          </div>
        )}

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">

            {/* Step 1: Union Selection - PROMINENT */}
            <div className="border-4 border-blue-200 rounded-xl p-6 bg-blue-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                <i className="fas fa-location-dot text-blue-600 mr-2"></i>ধাপ ১: আপনার ইউনিয়ন বেছে নিন
              </h2>
              <p className="text-gray-600 mb-6">ত্রিশাল উপজেলার ১২টি ইউনিয়নের মধ্য থেকে নির্বাচন করুন:</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {TRISHAL_UNIONS.map(union => (
                  <button
                    key={union.id}
                    type="button"
                    onClick={() => handleUnionSelect(union.id)}
                    className={`p-4 rounded-lg font-bold text-center transition-all duration-200 border-2 ${
                      formData.union === union.id
                        ? 'bg-blue-600 text-white border-blue-600 scale-105 shadow-lg'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-blue-400 hover:shadow-md'
                    }`}
                  >
                    <div className="text-lg mb-1">{union.number}.</div>
                    <div className="text-sm">{union.bengaliName}</div>
                  </button>
                ))}
              </div>
              
              {formData.union && (
                <div className="mt-4 p-3 bg-green-100 border-l-4 border-green-600 text-green-800 rounded">
                  <i className="fas fa-check-circle mr-2"></i>
                  <strong>নির্বাচিত:</strong> {TRISHAL_UNIONS.find(u => u.id === formData.union)?.bengaliName}
                </div>
              )}
            </div>

            {/* Step 2: Problem Category */}
            <div className="border-4 border-green-200 rounded-xl p-6 bg-green-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                <i className="fas fa-list text-green-600 mr-2"></i>ধাপ ২: সমস্যার ধরন নির্বাচন করুন
              </h2>
              <p className="text-gray-600 mb-4">কোন ধরনের সমস্যা আপনি রিপোর্ট করছেন?</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROBLEM_CATEGORIES.map(cat => (
                  <label key={cat.value} className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.category === cat.value
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white border-gray-300 hover:border-green-400 text-gray-900'
                  }`}>
                    <input
                      type="radio"
                      name="category"
                      value={cat.value}
                      checked={formData.category === cat.value}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="font-semibold">{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Problem Details */}
            <div className="border-4 border-orange-200 rounded-xl p-6 bg-orange-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-pen text-orange-600 mr-2"></i>ধাপ ৩: সমস্যার বিবরণ দিন
              </h2>
              
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-800 mb-2">সমস্যার শিরোনাম (সংক্ষিপ্ত) *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="উদাহরণ: মোড়ে বড় গর্ত, পানি ঘেরা পথ, বিদ্যুৎ নেই"
                  maxLength="60"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">{formData.title.length}/60</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">বিস্তারিত বর্ণনা *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="সমস্যাটি কেন গুরুত্বপূর্ণ? এটি কতদিন থেকে আছে? এটি কীভাবে সমাধান করা যায় বলে আপনি মনে করেন?"
                  maxLength="500"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent h-32 resize-none"
                  required
                />
                <p className="text-xs text-gray-600 mt-1">{formData.description.length}/500</p>
              </div>
            </div>

            {/* Step 4: Optional Images */}
            <div className="border-4 border-purple-200 rounded-xl p-6 bg-purple-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <i className="fas fa-image text-purple-600 mr-2"></i>ধাপ ৪: ছবি যোগ করুন (ঐচ্ছিক)
              </h2>
              <p className="text-gray-700 mb-4">সমস্যার ছবি থাকলে এটি আরও বিশ্বাসযোগ্য হয়</p>
              
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 border-2 border-dashed border-purple-400 rounded-lg hover:border-purple-600 hover:bg-purple-100 transition cursor-pointer"
              />
              
              {formData.images.length > 0 && (
                <div className="mt-6">
                  <p className="font-bold text-gray-800 mb-3">{formData.images.length} টি ছবি যুক্ত করা হয়েছে:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt={`Preview ${idx}`} className="w-full h-24 object-cover rounded-lg border-2 border-gray-300" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx)
                          }))}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 shadow-lg opacity-0 group-hover:opacity-100 transition"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Final Checklist */}
            <div className="bg-gray-100 rounded-xl p-6 border-2 border-gray-300">
              <p className="font-bold text-gray-900 mb-3">জমা দেওয়ার আগে নিশ্চিত করুন:</p>
              <ul className="space-y-2 text-sm text-gray-800">
                <li className={formData.union ? 'text-green-600' : ''}><i className={`fas ${formData.union ? 'fa-check' : 'fa-times'} mr-2`}></i>ইউনিয়ন নির্বাচিত</li>
                <li className={formData.category ? 'text-green-600' : ''}><i className={`fas ${formData.category ? 'fa-check' : 'fa-times'} mr-2`}></i>সমস্যার ধরন নির্বাচিত</li>
                <li className={formData.title ? 'text-green-600' : ''}><i className={`fas ${formData.title ? 'fa-check' : 'fa-times'} mr-2`}></i>শিরোনাম লেখা আছে</li>
                <li className={formData.description ? 'text-green-600' : ''}><i className={`fas ${formData.description ? 'fa-check' : 'fa-times'} mr-2`}></i>বিবরণ লেখা আছে</li>
              </ul>
            </div>

            {/* Submit Button - LARGE AND PROMINENT */}
            <button
              type="submit"
              disabled={loading || !formData.union || !formData.category || !formData.title || !formData.description}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                loading || !formData.union || !formData.category || !formData.title || !formData.description
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>জমা দিচ্ছি, অনুগ্রহ করে অপেক্ষা করুন...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane mr-2"></i>আমার সমস্যা জমা দিন
                </>
              )}
            </button>
          </form>
        </div>

        {/* Privacy Info Footer */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center">
          <p className="text-gray-800 font-semibold mb-3">
            <i className="fas fa-lock text-blue-600 mr-2"></i>আপনার গোপনীয়তা আমাদের কাছে সবচেয়ে গুরুত্বপূর্ণ
          </p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ সম্পূর্ণ নাম গোপন</li>
            <li>✓ ইমেইল বা ফোন নম্বর নেওয়া হয় না</li>
            <li>✓ আপনার প্রকৃত পরিচয় কখনও প্রকাশ করা হয় না</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportProblemPage;
