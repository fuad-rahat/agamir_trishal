import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BestOffersPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'বেস্ট অফার (ডেমো)',
    subtitle: 'ত্রিশালের দোকান, রেস্টুরেন্ট ও গ্রোসারি শপের সেরা অফার',
    description:
      'এখানে বিভিন্ন ক্যাটাগরির (গ্রোসারি, খাবার, রেস্টুরেন্ট ইত্যাদি) দোকানের অফার দেখানো হবে। এখন কিছু ডেমো উদাহরণ দেয়া আছে – আপনি পরে আসল দোকান, অফার ও সময়সীমা সেট করবেন।',
    filtersInfo:
      'আপনি টপ ৫ বা টপ ১০ অফার দেখাতে পারবেন এবং গ্রোসারি / ফুড / রেস্টুরেন্ট / মেডিসিন ইত্যাদি ক্যাটাগরি অনুযায়ী ফিল্টার করতে পারবেন। নিচে ডেমো হিসেবে কয়েকটি অফার দেখানো হয়েছে।',
    offers: [
      {
        id: 1,
        rankKey: 'top5',
        rankLabel: 'Top 5 (ডেমো)',
        categoryKey: 'groceries',
        categoryLabel: 'গ্রোসারি',
        shopName: 'ত্রিশাল সুপার শপ (ডেমো)',
        imageUrl:
          'https://images.pexels.com/photos/3735159/pexels-photo-3735159.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'ত্রিশাল বাজার',
        title: 'মাসিক বাজার সেভ প্যাকেজ',
        description: 'চাল, ডাল, তেল, নিত্যপ্রয়োজনীয় ১৫টি পণ্য একসাথে কিনলে সর্বোচ্চ ১৫% পর্যন্ত ছাড়।',
        duration: '১ মার্চ ২০২৪ – ৩১ মার্চ ২০২৪',
      },
      {
        id: 2,
        rankKey: 'top5',
        rankLabel: 'Top 5 (ডেমো)',
        categoryKey: 'restaurant',
        categoryLabel: 'রেস্টুরেন্ট',
        shopName: 'মেঘডুবি রেস্টুরেন্ট (ডেমো)',
        imageUrl:
          'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'ত্রিশাল বাসস্ট্যান্ড সংলগ্ন',
        title: 'ফ্যামিলি ডিনার প্যাকেজ',
        description: '৪ জনের কম্বো মিল – বিরিয়ানি, কাবাব, ডেজার্টসহ স্পেশাল অফার।',
        duration: 'শুক্র–শনিবার, সন্ধ্যা ৬টা – রাত ১০টা',
      },
      {
        id: 3,
        rankKey: 'top10',
        rankLabel: 'Top 10 (ডেমো)',
        categoryKey: 'food',
        categoryLabel: 'ফুড',
        shopName: 'ধানীখোলা মিষ্টি ভাণ্ডার (ডেমো)',
        imageUrl:
          'https://images.pexels.com/photos/4669233/pexels-photo-4669233.jpeg?auto=compress&cs=tinysrgb&w=600',
        location: 'ধানীখোলা চৌরাস্তা',
        title: 'অনলাইন অর্ডারে ডিসকাউন্ট',
        description: 'ফোনে অর্ডার করলে ৫০০ টাকার উপর সব আইটেমে ১০% ডিসকাউন্ট।',
        duration: 'প্রতিদিন বিকাল ৪টা – রাত ৯টা',
      },
    ],
  };

  const [rankFilter, setRankFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredOffers = demoData.offers.filter((offer) => {
    const matchRank = rankFilter === 'all' || offer.rankKey === rankFilter;
    const matchCategory = categoryFilter === 'all' || offer.categoryKey === categoryFilter;
    return matchRank && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-tags mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-yellow-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-l-4 border-yellow-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-yellow-800 mb-2 flex items-center">
            <i className="fas fa-sliders-h mr-2"></i>
            ফিল্টার করে অফার বাছাই করুন (ডেমো)
          </h2>
          <p className="text-sm text-gray-700 mb-4">{demoData.filtersInfo}</p>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-gray-600 mr-1 mt-1">Top লিস্ট:</span>
              <button
                type="button"
                onClick={() => setRankFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  rankFilter === 'all'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                সব
              </button>
              <button
                type="button"
                onClick={() => setRankFilter('top5')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  rankFilter === 'top5'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Top 5
              </button>
              <button
                type="button"
                onClick={() => setRankFilter('top10')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  rankFilter === 'top10'
                    ? 'bg-yellow-500 text-white border-yellow-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                Top 10
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-gray-600 mr-1 mt-1">ক্যাটাগরি:</span>
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  categoryFilter === 'all'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                সব
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('groceries')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  categoryFilter === 'groceries'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                গ্রোসারি
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('food')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  categoryFilter === 'food'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                ফুড
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('restaurant')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  categoryFilter === 'restaurant'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                রেস্টুরেন্ট
              </button>
              <button
                type="button"
                onClick={() => setCategoryFilter('medicine')}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  categoryFilter === 'medicine'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white text-gray-700 border-gray-200'
                }`}
              >
                মেডিসিন
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 flex flex-col"
            >
              <div className="h-36 w-full overflow-hidden">
                <img
                  src={offer.imageUrl}
                  alt={offer.shopName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs font-semibold text-amber-600 mb-1">
                  {offer.rankLabel} · {offer.categoryLabel}
                </p>
                <h3 className="text-sm font-bold text-gray-800">{offer.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{offer.shopName}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <i className="fas fa-map-marker-alt mr-1"></i>
                  {offer.location}
                </p>
                <p className="text-xs text-gray-700 mt-2 leading-relaxed flex-1">{offer.description}</p>
                <p className="text-xs text-amber-700 mt-2 font-semibold">
                  <i className="far fa-clock mr-1"></i>
                  {offer.duration}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredOffers.length === 0 && (
          <div className="mt-4 text-center text-gray-500 text-sm">
            <p>নির্বাচিত ফিল্টারের জন্য কোনো ডেমো অফার পাওয়া যায়নি।</p>
          </div>
        )}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>উপরের সব অফার ডেমো; আপনি পরে বাস্তব দোকান, ইমেজ URL, লোকেশন, অফার নাম ও সময়সীমা দিয়ে সাজাবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default BestOffersPage;

