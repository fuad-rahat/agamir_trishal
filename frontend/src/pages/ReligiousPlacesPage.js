import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReligiousPlacesPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'উপজেলার বড় মসজিদ সমূহ (ডেমো)',
    subtitle: 'ত্রিশালের উল্লেখযোগ্য জুমা ও ঈদগাহ মসজিদের লোকেশন',
    description:
      'এখানে ত্রিশাল উপজেলার উল্লেখযোগ্য বড় মসজিদগুলোর নাম, এলাকা ও লোকেশন লিঙ্ক থাকবে। এখন শুধু ডেমো হিসেবে কিছু উদাহরণ দেয়া আছে – আপনি পরে গুগল ম্যাপ লিঙ্ক ইত্যাদি যোগ করবেন।',
    mosques: [
      {
        id: 1,
        name: 'ত্রিশাল কেন্দ্রীয় জামে মসজিদ (ডেমো)',
        area: 'ত্রিশাল সদর',
        locationNote: 'বাজারের কেন্দ্রস্থলে, উপজেলা পরিষদ সংলগ্ন।',
        mapUrl: 'https://maps.google.com', // demo
      },
      {
        id: 2,
        name: 'ধানীখোলা বড় জামে মসজিদ (ডেমো)',
        area: 'ধানীখোলা',
        locationNote: 'ধানীখোলা বাজারের পাশে প্রধান সড়কের ধারে।',
        mapUrl: 'https://maps.google.com',
      },
      {
        id: 3,
        name: 'মঠবাড়ী ঈদগাহ মসজিদ (ডেমো)',
        area: 'মঠবাড়ী',
        locationNote: 'মঠবাড়ী স্কুলের পাশের মাঠসংলগ্ন।',
        mapUrl: 'https://maps.google.com',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      <div className="bg-gradient-to-r from-slate-700 to-sky-700 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-mosque mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-slate-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-slate-600">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoData.mosques.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800">{m.name}</h3>
              <p className="text-sm text-gray-600 mt-1 flex items-center">
                <i className="fas fa-map-marker-alt text-sky-600 mr-2"></i>
                {m.area}
              </p>
              <p className="text-sm text-gray-700 mt-3 leading-relaxed">{m.locationNote}</p>
              <a
                href={m.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition font-medium text-sm"
              >
                <i className="fas fa-map mr-2"></i>
                গুগল ম্যাপে দেখুন (ডেমো)
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>সব লোকেশন ও নাম এখানে ডেমো; আপনি পরে সঠিক মসজিদ ও গুগল ম্যাপ লিঙ্ক যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default ReligiousPlacesPage;

