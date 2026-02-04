import React from 'react';
import { useNavigate } from 'react-router-dom';

const FamousFoodPage = () => {
  const navigate = useNavigate();

  const demoData = {
    title: 'ত্রিশালের বিখ্যাত খাবার',
    subtitle: 'স্থানীয় স্বাদ, গ্রামবাংলার ঘ্রাণ',
    description:
      'ত্রিশাল উপজেলার বিভিন্ন ইউনিয়নে ছড়িয়ে আছে অনেক ঐতিহ্যবাহী ও জনপ্রিয় খাবার। এখানে কিছু ডেমো আইটেম দেখানো হচ্ছে – আপনি পরে আসল দোকান ও খাবারের তথ্য দিয়ে আপডেট করবেন।',
    foods: [
      {
        id: 1,
        name: 'মঠবাড়ীর দুধ বরফি (ডেমো)',
        area: 'মঠবাড়ী বাজার',
        image:
          'https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg?auto=compress&cs=tinysrgb&w=600',
        highlight: 'খাঁটি গরুর দুধ ও ঘি দিয়ে বানানো নরম বরফি।',
      },
      {
        id: 2,
        name: 'ত্রিশাল সদরের হাঁড়ি কাবাব (ডেমো)',
        area: 'ত্রিশাল সদর',
        image:
          'https://images.pexels.com/photos/1117861/pexels-photo-1117861.jpeg?auto=compress&cs=tinysrgb&w=600',
        highlight: 'মশলাদার গরুর মাংস, ধোঁয়া ওঠা গরম ভাতের সাথে জম্পেশ।',
      },
      {
        id: 3,
        name: 'ধানীখোলার পাটিসাপটা (ডেমো)',
        area: 'ধানীখোলা',
        image:
          'https://images.pexels.com/photos/14386739/pexels-photo-14386739.jpeg?auto=compress&cs=tinysrgb&w=600',
        highlight: 'নারিকেল-খেজুরগুড় ভরা নরম পিঠা, সন্ধ্যার নাস্তায় বেশ জনপ্রিয়।',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-lime-50">
      <div className="bg-gradient-to-r from-amber-600 to-lime-600 text-white py-8 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 flex items-center text-white/90 hover:text-white transition"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            হোম পেজে ফিরুন
          </button>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center">
            <i className="fas fa-utensils mr-4"></i>
            {demoData.title}
          </h1>
          <p className="text-amber-100 mt-2 text-lg">{demoData.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-l-4 border-amber-500">
          <p className="text-gray-700 leading-relaxed text-lg">{demoData.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoData.foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 flex flex-col"
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800">{food.name}</h3>
                <p className="text-sm text-amber-700 mt-1 flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  {food.area}
                </p>
                <p className="text-sm text-gray-700 mt-3 leading-relaxed flex-1">{food.highlight}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>ডেমো ছবি ও লেখা ব্যবহার করা হয়েছে। আপনি পরে আসল দোকান, ছবি ও বর্ণনা যোগ করবেন।</p>
        </div>
      </div>
    </div>
  );
};

export default FamousFoodPage;

