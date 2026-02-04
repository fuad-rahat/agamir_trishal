import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstitutionsPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'উপজেলার বড় শিক্ষা প্রতিষ্ঠানসমূহ',
    subtitle: 'বড় কলেজ, বড় স্কুল, বড় মাদ্রাসা ও বিশ্ববিদ্যালয়',
    description:
      'ত্রিশাল উপজেলার গুরুত্বপূর্ণ শিক্ষা প্রতিষ্ঠানগুলোকে আলাদা আলাদা ক্যাটাগরিতে সাজিয়ে দেখানো হবে। নিচের যে কোনো ক্যাটাগরিতে ক্লিক করলে সেই ধরনের প্রতিষ্ঠানের বিস্তারিত ডেমো তালিকা খুলবে।',
    categories: [
      {
        id: 'colleges',
        title: 'বড় কলেজ',
        icon: 'fas fa-university',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        desc: 'উপজেলার উল্লেখযোগ্য কলেজ সমূহের তালিকা।',
        target: '/institutions/colleges',
      },
      {
        id: 'schools',
        title: 'বড় স্কুল',
        icon: 'fas fa-school',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        desc: 'মাধ্যমিক ও উচ্চ বিদ্যালয়ের ডেমো তালিকা।',
        target: '/institutions/schools',
      },
      {
        id: 'madrasas',
        title: 'বড় মাদ্রাসা',
        icon: 'fas fa-book-quran',
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        desc: 'আলিম, ফাজিল ইত্যাদি মাদ্রাসার ডেমো তালিকা।',
        target: '/institutions/madrasas',
      },
      {
        id: 'universities',
        title: 'বিশ্ববিদ্যালয়',
        icon: 'fas fa-graduation-cap',
        color: 'text-rose-600',
        bg: 'bg-rose-50',
        desc: 'উপজেলা ও আশেপাশের বিশ্ববিদ্যালয়ের ডেমো তালিকা।',
        target: '/institutions/universities',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-landmark mr-4"></i>
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
          {demoData.categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(cat.target)}
              className={`text-left bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition flex flex-col ${cat.bg}`}
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/80 flex items-center justify-center mr-3">
                  <i className={`${cat.icon} ${cat.color} text-xl`}></i>
                </div>
                <h2 className="text-lg font-bold text-gray-800">{cat.title}</h2>
              </div>
              <p className="text-sm text-gray-700 flex-1">{cat.desc}</p>
              <span className="mt-4 text-sm font-semibold text-violet-700 inline-flex items-center">
                বিস্তারিত দেখুন <i className="fas fa-arrow-right ml-2 text-xs"></i>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>সব কিছু এখন ডেমো; আপনি পরে প্রতিটি ক্যাটাগরির আলাদা পেজে বাস্তব প্রতিষ্ঠান ও লোকেশন যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionsPage;

