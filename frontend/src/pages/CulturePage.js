import React from 'react';
import { useNavigate } from 'react-router-dom';

const CulturePage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'সংস্কৃতি ও ঐতিহ্য',
    subtitle: 'ত্রিশালের লোকসংস্কৃতি, উৎসব ও শিল্প',
    description:
      'ত্রিশাল উপজেলার মানুষের জীবনযাত্রা, গান, নাচ, নাটক, মেলা ও অন্যান্য সাংস্কৃতিক আয়োজনকে ঘিরে একটি ডেমো পেজ। আপনি পরে আপনার এলাকার বাস্তব তথ্য ও ছবি দিয়ে আপডেট করবেন।',
    sections: [
      {
        id: 1,
        title: 'লোকসংগীত ও পালাগান (ডেমো)',
        icon: 'fa-music',
        details:
          'বাউল গান, জারি-সারি, পালাগান ইত্যাদি ত্রিশালের গ্রামগুলোতে এখনও নানা অনুষ্ঠানে গাওয়া হয় – বিশেষ করে পয়লা বৈশাখ, গ্রামীণ মেলা ও বিবাহ অনুষ্ঠানে।',
      },
      {
        id: 2,
        title: 'বার্ষিক মেলা ও উৎসব (ডেমো)',
        icon: 'fa-festival',
        details:
          'ত্রিশালের বিভিন্ন ইউনিয়নে বাৎসরিক ওরস, গাজীর মেলা, গ্রামীণ কৃষি মেলা ইত্যাদি আয়োজন হয়ে থাকে – যেখানে স্থানীয় খাবার, খেলাধুলা ও সাংস্কৃতিক অনুষ্ঠান হয়।',
      },
      {
        id: 3,
        title: 'যুব সমাজের সাংস্কৃতিক ক্লাব (ডেমো)',
        icon: 'fa-theater-masks',
        details:
          'স্কুল-কলেজের শিক্ষার্থীদের উদ্যোগে নাট্যচর্চা, বিতর্ক, কুইজ প্রতিযোগিতা ও সংগীতানুষ্ঠানের আয়োজন করা হয় – যা তরুণদের নেতৃত্ব ও আত্মবিশ্বাস বাড়ায়।',
      },
    ],
  };

  const iconMap = {
    'fa-music': 'fas fa-music',
    'fa-festival': 'fas fa-star',
    'fa-theater-masks': 'fas fa-theater-masks',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50">
      <div className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-theater-masks mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-emerald-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoData.sections.map((sec) => (
            <div
              key={sec.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <i className={`${iconMap[sec.icon]} text-emerald-600 text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{sec.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{sec.details}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে প্রদত্ত তথ্য সম্পূর্ণ ডেমো – বাস্তব সাংস্কৃতিক তথ্য, তারিখ ও ছবিগুলো আপনি নিজে যোগ করে সাজিয়ে নেবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default CulturePage;

