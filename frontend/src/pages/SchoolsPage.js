import React from 'react';
import { useNavigate } from 'react-router-dom';

const SchoolsPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'বড় স্কুল (ডেমো)',
    subtitle: 'উপজেলার উল্লেখযোগ্য মাধ্যমিক ও উচ্চ বিদ্যালয়',
    description:
      'এখানে ত্রিশাল উপজেলার বড় ও পরিচিত স্কুলগুলোর একটি ডেমো তালিকা দেখানো হয়েছে। আপনি পরে আপনার এলাকার বাস্তব স্কুলের তথ্য দেবেন।',
    schools: [
      {
        id: 1,
        name: 'ত্রিশাল সরকারি বালিকা উচ্চ বিদ্যালয় (ডেমো)',
        area: 'ত্রিশাল',
        note: 'শহরের প্রাচীন ও সুনামধন্য বালিকা বিদ্যালয় – ডেমো বর্ণনা।',
      },
      {
        id: 2,
        name: 'ডেমো হাই স্কুল, ধানীখোলা',
        area: 'ধানীখোলা',
        note: 'গ্রামাঞ্চলের একটি বড় বিদ্যালয়ের উদাহরণ হিসেবে ডেমো তথ্য।',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/institutions')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            বড় শিক্ষা প্রতিষ্ঠানের মূল তালিকায় ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-school mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-emerald-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.schools.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">{s.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <i className="fas fa-map-marker-alt text-emerald-500 mr-1"></i>
                {s.area}
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে দেখানো সব স্কুল ডেমো; আপনি পরে বাস্তব নাম, ঠিকানা ও ম্যাপ লিঙ্ক যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default SchoolsPage;

