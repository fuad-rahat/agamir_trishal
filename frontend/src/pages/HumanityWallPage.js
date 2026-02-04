import React from 'react';
import { useNavigate } from 'react-router-dom';

const HumanityWallPage = () => {
  const navigate = useNavigate();

  // Demo data - static content (admin will update manually)
  const demoData = {
    title: 'মানবতার দেওয়াল',
    subtitle: 'ত্রিশাল উপজেলার মানুষের প্রতি মানুষের ভালোবাসা',
    description: 'মানবতার দেওয়াল এমন একটি উদ্যোগ যেখানে সমাজের নিঃস্ব ও দুস্থ মানুষের পাশে দাঁড়ানো হয়। খাদ্য, বস্ত্র, চিকিৎসা ও শিক্ষা সহায়তা প্রদান করা হয়। আপনার সামান্য অবদানও কারো জীবনে বড় পরিবর্তন আনতে পারে।',
    stories: [
      {
        id: 1,
        title: 'খাদ্য সহায়তা',
        desc: 'ত্রিশাল সদরে ৫০টি পরিবারকে রমজান মাসে ইফতার ও সেহরির খাবার বিতরণ করা হয়েছে।',
        date: 'এপ্রিল ২০২৪',
        icon: 'fa-utensils'
      },
      {
        id: 2,
        title: 'শীতবস্ত্র বিতরণ',
        desc: 'শীতকালে ২০০টি কম্বল ও শীতবস্ত্র বিতরণ করা হয়েছে দুস্থ পরিবারগুলোর মাঝে।',
        date: 'জানুয়ারি ২০২৪',
        icon: 'fa-tshirt'
      },
      {
        id: 3,
        title: 'চিকিৎসা সহায়তা',
        desc: 'ক্যান্সার আক্রান্ত এক শিশুর চিকিৎসার জন্য ২ লক্ষ টাকা তহবিল সংগ্রহ করা হয়েছে।',
        date: 'মার্চ ২০২৪',
        icon: 'fa-heartbeat'
      },
      {
        id: 4,
        title: 'শিক্ষা সহায়তা',
        desc: '৫০ জন মেধাবী দরিদ্র শিক্ষার্থীকে বিনামূল্যে কোচিং ও বই প্রদান করা হয়েছে।',
        date: 'ফেব্রুয়ারি ২০২৪',
        icon: 'fa-book-reader'
      }
    ],
    quote: 'মানুষ মানুষের জন্য, জীবনের জন্য।',
    contact: {
      title: 'সহায়তা করতে চান?',
      desc: 'আপনার যেকোনো ধরনের সহায়তা (তহবিল, স্বেচ্ছাসেবী) এই উদ্যোগকে এগিয়ে নিতে সাহায্য করবে।',
      phone: '০১৭০০-০০০০০০',
      address: 'ত্রিশাল উপজেলা পরিষদ, ময়মনসিংহ'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-4xl font-bold flex items-center">
            <i className="fas fa-hands-helping mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-rose-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Intro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-rose-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        {/* Quote */}
        <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-8 mb-12 text-center">
          <i className="fas fa-quote-left text-rose-300 text-4xl mb-4"></i>
          <p className="text-2xl font-bold text-rose-800 italic">{demoData.quote}</p>
        </div>

        {/* Stories / Activities */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-heart text-rose-500 mr-3"></i>
          সাম্প্রতিক সহায়তা কার্যক্রম
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`fas ${story.icon} text-rose-600 text-2xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{story.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{story.desc}</p>
                    <p className="text-rose-600 text-sm font-medium mt-3">{story.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact / Help CTA */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-rose-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-hand-holding-heart text-rose-500 mr-3"></i>
            {demoData.contact.title}
          </h2>
          <p className="text-gray-600 mb-6">{demoData.contact.desc}</p>
          <div className="flex flex-wrap gap-6">
            <a
              href={`tel:${demoData.contact.phone.replace(/-/g, '')}`}
              className="inline-flex items-center px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition font-medium"
            >
              <i className="fas fa-phone mr-2"></i>
              {demoData.contact.phone}
            </a>
            <div className="inline-flex items-center px-6 py-3 bg-rose-50 text-rose-700 rounded-xl">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {demoData.contact.address}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>এই পৃষ্ঠার তথ্য অ্যাডমিন কর্তৃক ম্যানুয়ালি আপডেট করা হয়।</p>
        </div>
      </div>
    </div>
  );
};

export default HumanityWallPage;
