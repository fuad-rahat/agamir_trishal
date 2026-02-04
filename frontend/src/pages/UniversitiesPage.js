import React from 'react';
import { useNavigate } from 'react-router-dom';

const UniversitiesPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'বিশ্ববিদ্যালয় (ডেমো)',
    subtitle: 'উপজেলা ও আশেপাশের বড় বিশ্ববিদ্যালয়ের তথ্য',
    description:
      'এটি শুধু একটি ডেমো পেজ – আপনি পরে আসল বিশ্ববিদ্যালয়ের নাম, ঠিকানা, বিভাগ ও অন্যান্য তথ্য দিয়ে সাজিয়ে নেবেন।',
    universities: [
      {
        id: 1,
        name: 'ডেমো ইউনিভার্সিটি অব ত্রিশাল',
        area: 'ডেমো লোকেশন',
        note: 'এখানে সংক্ষিপ্ত পরিচিতি, বিভাগ, যোগাযোগ ইত্যাদি লেখা থাকবে।',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      <div className="bg-gradient-to-r from-rose-600 to-violet-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/institutions')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            বড় শিক্ষা প্রতিষ্ঠানের মূল তালিকায় ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-graduation-cap mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-rose-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-rose-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.universities.map((u) => (
            <div key={u.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">{u.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <i className="fas fa-map-marker-alt text-rose-500 mr-1"></i>
                {u.area}
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{u.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে দেখানো সব তথ্য ডেমো; আপনি পরে বাস্তব বিশ্ববিদ্যালয়ের তথ্য দিয়ে আপডেট করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default UniversitiesPage;

