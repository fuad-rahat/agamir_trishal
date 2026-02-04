import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookVehiclesPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'যানবাহন বুকিং (ডেমো)',
    subtitle: 'ত্রিশাল উপজেলায় সিএনজি, মাইক্রোবাস, পিকআপ ইত্যাদির তথ্য এক জায়গায়',
    description:
      'এটি একটি ডেমো পেজ – এখানে বিভিন্ন ধরনের যানবাহনের মালিক/ড্রাইভারের বেসিক তথ্য দেখানো হচ্ছে। আপনি পরে নিজে নাম্বার, গাড়ির ধরন ও ভাড়ার তথ্য আপডেট করবেন।',
    categories: [
      {
        id: 1,
        type: 'CNG / অটোরিকশা',
        vehicles: [
          {
            id: 1,
            name: 'ডেমো সিএনজি-১',
            route: 'ত্রিশাল সদর ⇄ ময়মনসিংহ',
            contact: '০১৭১১-৪৪৪৪৪৪',
            note: 'সকাল ৬টা থেকে রাত ১০টা পর্যন্ত চলাচল।',
          },
          {
            id: 2,
            name: 'ডেমো সিএনজি-২',
            route: 'ত্রিশাল ⇄ ধানীখোলা',
            contact: '০১৮১৫-৫৫৫৫৫৫',
            note: 'নির্দিষ্ট বুকিং অনুযায়ী ছেড়ে দেয়।',
          },
        ],
      },
      {
        id: 2,
        type: 'মাইক্রোবাস / প্রাইভেট কার',
        vehicles: [
          {
            id: 3,
            name: 'ডেমো মাইক্রোবাস-১',
            route: 'ত্রিশাল ⇄ ঢাকা (ফ্যামিলি ট্রিপ)',
            contact: '০১৯১৯-৬৬৬৬৬৬',
            note: 'ডে-লং বা ফুল ট্যুর – দু’ভাবেই বুকিং সম্ভব।',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-car-side mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-teal-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-teal-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="space-y-8">
          {demoData.categories.map((cat) => (
            <section key={cat.id}>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <i className="fas fa-circle text-teal-500 text-xs mr-2"></i>
                {cat.type}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
                  >
                    <h3 className="text-lg font-bold text-gray-800">{v.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <i className="fas fa-route text-teal-500 w-5"></i> {v.route}
                    </p>
                    <p className="text-sm text-gray-700 mt-3 leading-relaxed">{v.note}</p>
                    <a
                      href={`tel:${v.contact.replace(/-/g, '')}`}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium"
                    >
                      <i className="fas fa-phone mr-2"></i>
                      {v.contact}
                    </a>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>এখানে দেখানো সব তথ্য ডেমো; আপনি বাস্তব গাড়ির তথ্য, রুট ও ভাড়া পরে নিজে সেট করে দেবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default BookVehiclesPage;

