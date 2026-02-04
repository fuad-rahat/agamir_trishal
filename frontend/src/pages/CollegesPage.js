import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollegesPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'বড় কলেজ (ডেমো)',
    subtitle: 'ত্রিশাল উপজেলার উল্লেখযোগ্য কলেজ সমূহ',
    description:
      'এই পৃষ্ঠায় ত্রিশাল উপজেলার বড় বড় কলেজগুলোর নাম, এলাকা ও সংক্ষিপ্ত পরিচিতি দেখানো হবে। সব ডাটা এখন ডেমো – আপনি পরে আসল কলেজের তথ্য দিয়ে আপডেট করবেন।',
    colleges: [
      {
        id: 1,
        name: 'ত্রিশাল ডিগ্রি কলেজ (ডেমো)',
        area: 'ত্রিশাল সদর',
        note: 'এইচএসসি, ডিগ্রি ও অনার্স কোর্স সহ সাধারণ শিক্ষা প্রতিষ্ঠান।',
      },
      {
        id: 2,
        name: 'ডেমো মহিলা কলেজ, ত্রিশাল',
        area: 'ত্রিশাল পৌর এলাকা',
        note: 'মেয়েদের জন্য পৃথক কলেজ – ডেমো তথ্য।',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/institutions')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            বড় শিক্ষা প্রতিষ্ঠানের মূল তালিকায় ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-university mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-violet-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-violet-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.colleges.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">{c.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>
                {c.area}
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{c.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে দেখানো সব কলেজ ডেমো; আপনি পরে বাস্তব নাম, ঠিকানা ও ম্যাপ লিঙ্ক যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default CollegesPage;

