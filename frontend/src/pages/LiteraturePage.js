import React from 'react';
import { useNavigate } from 'react-router-dom';

const LiteraturePage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'কবিতা, ছোট গল্প ও সাহিত্য',
    subtitle: 'ত্রিশাল ও আশেপাশের মানুষের লেখা সৃজনশীল সাহিত্য',
    description:
      'এখানে ত্রিশাল উপজেলার কবিতা, ছোট গল্প ও অন্যান্য সাহিত্যকর্ম সাজিয়ে রাখা হবে। এখন শুধু ডেমো কনটেন্ট দেখানো হচ্ছে – আপনি পরে নিজে লেখা যোগ করে সাজিয়ে নেবেন।',
    topPoems: [
      {
        id: 1,
        type: 'কবিতা',
        title: 'মেঘের দেশে ফেরার ডাক',
        author: 'ডেমো লেখক ১',
        excerpt:
          'মেঘ ডাকে, বৃষ্টির সুরে / গ্রামবাংলার মাটির ঘ্রাণে / ফসল পাকে, নদী ডাকে / ভোরের আলো নরম গানে...',
      },
      {
        id: 2,
        type: 'কবিতা',
        title: 'ত্রিশালের সন্ধ্যা',
        author: 'ডেমো লেখক ২',
        excerpt:
          'সূর্য যখন ঢলে পড়ে ব্রহ্মপুত্রের তীরে / আজানের সুর ভেসে আসে নরম হাওয়ার নীড়ে...',
      },
    ],
    topStories: [
      {
        id: 1,
        type: 'ছোট গল্প',
        title: 'বটতলার বেঞ্চ',
        author: 'ডেমো লেখক ৩',
        excerpt:
          'ত্রিশাল বাজারের পুরনো বটতলার নিচে সেই বেঞ্চটা আজও আছে। রফিক আর মিলির প্রথম দেখা, প্রথম ঝগড়া, প্রথম হাত ধরা – সব স্মৃতি জমে আছে সেই বেঞ্চে...',
      },
      {
        id: 2,
        type: 'ছোট গল্প',
        title: 'মাটির ঘরের আলো',
        author: 'ডেমো লেখক ৪',
        excerpt:
          'ধানীখোলার সেই ছোট্ট মাটির ঘরে রাতের খাবারের পরও বাতি নিভে না। ছেলে-মেয়েরা পড়ে, মা বসে গল্প শোনায় – স্বপ্ন বোনে নতুন ভোরের...',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="bg-gradient-to-r from-indigo-600 to-sky-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-book-open mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-indigo-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
          <p className="mt-4 text-sm text-gray-500">
            নোট: আপাতত শুধু টপ ৫ কবিতা ও ছোট গল্পের জন্য ডেমো উদাহরণ দেখানো হচ্ছে। আপনি পরে পূর্ণ লিস্ট এবং ফিল্টার যোগ করবেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-feather-alt text-indigo-500 mr-3"></i>
              টপ কবিতা (ডেমো)
            </h2>
            <div className="space-y-4">
              {demoData.topPoems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/literature/poem/${item.id}`)}
                  className="w-full text-left bg-white rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-0.5 transition border border-gray-100"
                >
                  <p className="text-xs font-semibold text-indigo-600 mb-1">{item.type}</p>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">লেখক: {item.author}</p>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{item.excerpt}</p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600">
                    পূর্ণ লেখা দেখুন <i className="fas fa-arrow-right ml-1"></i>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-book-reader text-sky-500 mr-3"></i>
              টপ ছোট গল্প (ডেমো)
            </h2>
            <div className="space-y-4">
              {demoData.topStories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/literature/story/${item.id}`)}
                  className="w-full text-left bg-white rounded-xl shadow-md p-5 hover:shadow-lg hover:-translate-y-0.5 transition border border-gray-100"
                >
                  <p className="text-xs font-semibold text-sky-600 mb-1">{item.type}</p>
                  <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">লেখক: {item.author}</p>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">{item.excerpt}</p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-sky-600">
                    পূর্ণ লেখা দেখুন <i className="fas fa-arrow-right ml-1"></i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            কনটেন্ট সাজানোর প্রস্তাবিত ফরম্যাট (ডেমো)
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>প্রতিটি কবিতা / গল্পের জন্য শিরোনাম, লেখকের নাম, সংক্ষিপ্ত অংশ (excerpt) রাখুন।</li>
            <li>ট্যাগ বা ক্যাটাগরি (যেমন: দেশপ্রেম, গ্রামবাংলা, প্রেম, অনুপ্রেরণা) ব্যবহার করলে পাঠকের জন্য খুঁজে নেওয়া সহজ হবে।</li>
            <li>টপ ৫/টপ ১০ আলাদা সেকশনে দেখাতে পারেন – যেমন এখানে দেখানো হয়েছে।</li>
          </ul>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এগুলো শুধুই ডেমো লেখা; আপনি নিজে আপনার পছন্দের সাহিত্যকর্ম এখানে যোগ ও সাজিয়ে নেবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default LiteraturePage;

