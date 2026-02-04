import React from 'react';
import { useNavigate } from 'react-router-dom';

const MadrasasPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'বড় মাদ্রাসা (ডেমো)',
    subtitle: 'উপজেলার উল্লেখযোগ্য মাদ্রাসা সমূহ',
    description:
      'এই পৃষ্ঠায় ত্রিশাল উপজেলার বড় মাদ্রাসাগুলোর ডেমো তালিকা দেখানো হয়েছে। আপনি পরে আলিম, ফাজিল ইত্যাদি স্তরের আসল মাদ্রাসার তথ্য দেবেন।',
    madrasas: [
      {
        id: 1,
        name: 'ত্রিশাল ফাজিল মাদ্রাসা (ডেমো)',
        area: 'ত্রিশাল',
        note: 'আলিম ও ফাজিল পর্যায় পর্যন্ত শিক্ষা – ডেমো বর্ণনা।',
      },
      {
        id: 2,
        name: 'ডেমো কামিল মাদ্রাসা, মঠবাড়ী',
        area: 'মঠবাড়ী',
        note: 'উচ্চতর ইসলামিক শিক্ষার একটি ডেমো উদাহরণ।',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/institutions')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            বড় শিক্ষা প্রতিষ্ঠানের মূল তালিকায় ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-book-quran mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-teal-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-teal-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.madrasas.map((m) => (
            <div key={m.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">{m.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <i className="fas fa-map-marker-alt text-teal-500 mr-1"></i>
                {m.area}
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{m.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে দেখানো সব মাদ্রাসা ডেমো; আপনি পরে বাস্তব নাম, ঠিকানা ও ম্যাপ লিঙ্ক যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default MadrasasPage;

