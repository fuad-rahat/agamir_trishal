import React from 'react';
import { useNavigate } from 'react-router-dom';

const FindTutorPage = () => {
  const navigate = useNavigate();

  // Demo data - static content (admin will update manually)
  const demoData = {
    title: 'ফাইন্ড টিউটর',
    subtitle: 'ত্রিশাল উপজেলায় আপনার সন্তানের জন্য যোগ্য শিক্ষক খুঁজুন',
    description: 'এই প্ল্যাটফর্মে ত্রিশাল উপজেলার বিভিন্ন বিষয়ের অভিজ্ঞ এবং যোগ্য শিক্ষকদের তালিকা রয়েছে। আপনার প্রয়োজন অনুযায়ী শিক্ষক নির্বাচন করে সরাসরি যোগাযোগ করতে পারেন।',
    tutors: [
      {
        id: 1,
        name: 'মোঃ করিম উদ্দিন',
        subject: 'গণিত ও পদার্থবিজ্ঞান',
        qualification: 'এম.এসসি (গণিত), বিএড',
        experience: '১২ বছর',
        area: 'ত্রিশাল সদর',
        contact: '০১৭১২-৩৪৫৬৭৮'
      },
      {
        id: 2,
        name: 'মিসেস ফাতেমা বেগম',
        subject: 'ইংরেজি ও বাংলা',
        qualification: 'এম.এ (ইংরেজি), বিএড',
        experience: '৮ বছর',
        area: 'মঠবাড়ী',
        contact: '০১৮১৯-৮৭৬৫৪৩'
      },
      {
        id: 3,
        name: 'মোঃ রফিকুল ইসলাম',
        subject: 'কেমিস্ট্রি ও বায়োলজি',
        qualification: 'এম.এসসি (রসায়ন)',
        experience: '১০ বছর',
        area: 'রামপুর',
        contact: '০১৯২৩-৪৫৬৭৮৯'
      },
      {
        id: 4,
        name: 'মিসেস নাজমুন নাহার',
        subject: 'প্রাথমিক শিক্ষা',
        qualification: 'বিএড, সি-ইন-এড',
        experience: '১৫ বছর',
        area: 'ধানীখোলা',
        contact: '০১৭৮৯-১২৩৪৫৬'
      }
    ],
    howItWorks: [
      { step: 1, title: 'শিক্ষক নির্বাচন করুন', desc: 'বিষয় এবং এলাকা অনুযায়ী শিক্ষক বেছে নিন' },
      { step: 2, title: 'যোগাযোগ করুন', desc: 'প্রদত্ত নম্বরে কল করে বিস্তারিত জানুন' },
      { step: 3, title: 'ক্লাস শুরু করুন', desc: 'সময় ও ফি নিয়ে সম্মত হয়ে পড়াশোনা শুরু করুন' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-4xl font-bold flex items-center">
            <i className="fas fa-chalkboard-teacher mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-amber-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-amber-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <i className="fas fa-route text-amber-500 mr-3"></i>
            কিভাবে ব্যবহার করবেন
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoData.howItWorks.map((item) => (
              <div key={item.step} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tutor List */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-user-graduate text-amber-500 mr-3"></i>
          শিক্ষক তালিকা
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.tutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-user text-amber-600 text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
                    <p className="text-amber-600 font-semibold mt-1">{tutor.subject}</p>
                    <div className="mt-3 space-y-1 text-sm text-gray-600">
                      <p><i className="fas fa-graduation-cap text-amber-500 w-5"></i> {tutor.qualification}</p>
                      <p><i className="fas fa-briefcase text-amber-500 w-5"></i> অভিজ্ঞতা: {tutor.experience}</p>
                      <p><i className="fas fa-map-marker-alt text-amber-500 w-5"></i> {tutor.area}</p>
                    </div>
                    <a
                      href={`tel:${tutor.contact.replace(/-/g, '')}`}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-medium"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      {tutor.contact}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>আরও শিক্ষক যোগ করতে বা তথ্য আপডেট করতে অ্যাডমিনের সাথে যোগাযোগ করুন।</p>
        </div>
      </div>
    </div>
  );
};

export default FindTutorPage;
