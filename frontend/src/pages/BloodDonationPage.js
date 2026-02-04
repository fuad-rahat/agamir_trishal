import React from 'react';
import { useNavigate } from 'react-router-dom';

const BloodDonationPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'ব্লাড ডোনেশন',
    subtitle: 'ত্রিশাল উপজেলায় রক্তদাতা ও রক্তগ্রহীতার সংযোগ প্ল্যাটফর্ম',
    description:
      'জরুরি সময়ে সহজে রক্তদাতা খুঁজে পাওয়া এবং নিয়মিত স্বেচ্ছায় রক্তদানের সংস্কৃতি গড়ে তোলার একটি ছোট প্রচেষ্টা। নিচের তালিকাটি সম্পূর্ণ ডেমো, আপনি নিজে তথ্য পরিবর্তন করবেন।',
    groups: [
      {
        id: 1,
        name: 'ত্রিশাল স্বেচ্ছায় রক্তদাতা পরিবার',
        bloodGroups: 'A+, B+, O+',
        area: 'ত্রিশাল সদর ও আশেপাশের এলাকা',
        contact: '০১৭০০-১১১১১১',
        note: 'হোয়াটসঅ্যাপ ও কল – দুইভাবেই যোগাযোগ করা যাবে।',
      },
      {
        id: 2,
        name: 'মঠবাড়ী রক্ত সেবা',
        bloodGroups: 'O-, A-, AB+',
        area: 'মঠবাড়ী, মোক্ষপুর, আমিরাবাড়ী',
        contact: '০১৮১২-২২২২২২',
        note: 'রাত ১০টার পর আগেই মেসেজ করে যোগাযোগ করবেন।',
      },
      {
        id: 3,
        name: 'ধনীখোলা ব্লাড ভলান্টিয়ার',
        bloodGroups: 'সব গ্রুপ (রেজিস্টার্ড ডোনার)',
        area: 'ধানীখোলা ইউনিয়ন',
        contact: '০১৯২৩-৩৩৩৩৩৩',
        note: 'শুধু জরুরি অপারেশন ও দুর্ঘটনার ক্ষেত্রে অগ্রাধিকার।',
      },
    ],
    tips: [
      'রক্তদানের অন্তত ৩ মাস আগে কোনো বড় অপারেশন করা থাকলে ডাক্তারের পরামর্শ নিন।',
      'ডোনার ও রিসিপিয়েন্ট – দুই পক্ষেরই অবশ্যই ডাক্তারের পরামর্শ ও ব্লাড গ্রুপ যাচাই করা জরুরি।',
      'এখানে প্রদত্ত সমস্ত তথ্য শুধুই ডেমো; বাস্তবে ব্যবহার করার আগে অবশ্যই নিজে যাচাই করে নিন।',
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-4xl font-bold flex items-center">
            <i className="fas fa-tint mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-red-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-red-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <i className="fas fa-users text-red-500 mr-3"></i>
          ডেমো রক্তদাতা গ্রুপ / টিমসমূহ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demoData.groups.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800">{g.name}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt text-red-500 w-5"></i> {g.area}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <i className="fas fa-tint text-red-500 w-5"></i> ব্লাড গ্রুপ: {g.bloodGroups}
                </p>
                <p className="mt-3 text-sm text-gray-700">{g.note}</p>
                <a
                  href={`tel:${g.contact.replace(/-/g, '')}`}
                  className="mt-4 inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
                >
                  <i className="fas fa-phone mr-2"></i>
                  {g.contact}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-red-50 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">
            <i className="fas fa-info-circle mr-2"></i>
            গুরুত্বপূর্ণ নির্দেশনা (ডেমো)
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {demoData.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এই পৃষ্ঠার সব তথ্য ডেমো হিসাবে দেওয়া হয়েছে। আপনি বাস্তব ডাটা দিয়ে পরে আপডেট করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default BloodDonationPage;

