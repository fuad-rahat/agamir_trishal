import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Load statistics from GeoJSON
    fetch('/trishal-complete-geojson.json')
      .then(res => res.json())
      .then(data => {
        if (data.upazilaMeta) {
          setStats(data.upazilaMeta);
        }
      })
      .catch(err => console.error('Error loading stats:', err));
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const StatCard = ({ label, value, icon, color = 'blue' }) => {
    const bgColor = color === 'green' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300';
    const textColor = color === 'green' ? 'text-green-700' : 'text-blue-700';
    return (
      <div className={`${bgColor} border-l-4 p-6 rounded-lg shadow`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className={`text-2xl font-bold ${textColor} mt-2`}>{value}</p>
          </div>
          <div className={`text-4xl opacity-20 ${textColor}`}>{icon}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">ত্রিশাল উপজেলা - সাধারণ তথ্যাদি</h1>
          <p className="text-gray-600">Trishal Upazila Statistics & Information</p>
        </div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard label="জনসংখ্যা (Population)" value={`${stats.population} জন`} icon="👥" color="green" />
          <StatCard label="মোট ভোটার (Total Voters)" value={`${stats.totalVoters} জন`} icon="🗳️" color="blue" />
          <StatCard label="পুরুষ ভোটার (Male Voters)" value={`${stats.maleVoters} জন`} icon="👨" color="blue" />
          <StatCard label="মহিলা ভোটার (Female Voters)" value={`${stats.femaleVoters} জন`} icon="👩" color="blue" />
          <StatCard label="আয়তন (Area)" value={`${stats.area} বর্গ কিমি`} icon="📍" color="green" />
          <StatCard label="গ্রাম (Villages)" value={`${stats.villages} টি`} icon="🏘️" color="blue" />
          <StatCard label="মৌজা (Moujas)" value={`${stats.moujas} টি`} icon="📋" color="blue" />
          <StatCard label="ইউনিয়ন (Unions)" value={`${stats.totalUnions} টি`} icon="🏛️" color="green" />
          <StatCard label="মোট রাস্তা (Total Roads)" value={`${stats.totalRoads} কিমি`} icon="🛣️" color="blue" />
          <StatCard label="পাকা রাস্তা (Paved Roads)" value={`${stats.packedRoads} কিমি`} icon="✓" color="green" />
          <StatCard label="কাঁচা রাস্তা (Unpaved Roads)" value={`${stats.unpachedRoads} কিমি`} icon="🚧" color="blue" />
          <StatCard label="ব্রীজ/কালভার্ট (Bridges)" value={`${stats.bridges} টি`} icon="🌉" color="blue" />
          <StatCard label="নদী (Rivers)" value={`${stats.rivers} টি`} icon="🌊" color="green" />
          <StatCard label="হাট-বাজার (Markets)" value={`${stats.markets} টি`} icon="🏪" color="blue" />
        </div>

        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">বিস্তারিত তথ্য (Detailed Information)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Administrative */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="mr-2">🏛️</span> প্রশাসনিক বিভাজন
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>জেলা:</strong> {stats.district}</li>
                <li><strong>বিভাগ:</strong> {stats.division}</li>
                <li><strong>নির্বাচনী এলাকা:</strong> {stats.constituency}</li>
                <li><strong>ইউনিয়নের সংখ্যা:</strong> {stats.totalUnions} টি</li>
              </ul>
            </div>

            {/* Demographics */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="mr-2">👥</span> জনসংখ্যা তথ্য
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>মোট জনসংখ্যা:</strong> {stats.population} জন</li>
                <li><strong>মোট ভোটার:</strong> {stats.totalVoters} জন</li>
                <li><strong>পুরুষ ভোটার:</strong> {stats.maleVoters} জন</li>
                <li><strong>মহিলা ভোটার:</strong> {stats.femaleVoters} জন</li>
              </ul>
            </div>

            {/* Geography */}
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
                <span className="mr-2">📍</span> ভৌগোলিক তথ্য
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>আয়তন:</strong> {stats.area} বর্গ কিমি</li>
                <li><strong>গ্রাম:</strong> {stats.villages} টি</li>
                <li><strong>মৌজা:</strong> {stats.moujas} টি</li>
                <li><strong>নদী:</strong> {stats.rivers} টি</li>
              </ul>
            </div>

            {/* Infrastructure */}
            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center">
                <span className="mr-2">🛣️</span> অবকাঠামো
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>মোট রাস্তা:</strong> {stats.totalRoads} কিমি</li>
                <li><strong>পাকা রাস্তা:</strong> {stats.packedRoads} কিমি</li>
                <li><strong>কাঁচা রাস্তা:</strong> {stats.unpachedRoads} কিমি</li>
                <li><strong>ব্রীজ/কালভার্ট:</strong> {stats.bridges} টি</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Unions Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">১২টি ইউনিয়ন (12 Unions)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { bn: "ধানীখোলা", en: "Dhankhola" },
              { bn: "বৈলর", en: "Bailor" },
              { bn: "কাঁঠাল", en: "Kanthal" },
              { bn: "কানিহারী", en: "Kanihary" },
              { bn: "রামপুর", en: "Rampur" },
              { bn: "ত্রিশাল", en: "Trishal" },
              { bn: "হরিরামপুর", en: "Harirampur" },
              { bn: "সাখুয়া", en: "Sakhua" },
              { bn: "বালিপাড়া", en: "Balipara" },
              { bn: "মঠবাড়ী", en: "Mothbari" },
              { bn: "মোক্ষপুর", en: "Mokspur" },
              { bn: "আমিরাবাড়ী", en: "Amirabari" },
            ].map((union, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200 hover:shadow-md transition">
                <h3 className="font-semibold text-gray-900">{union.bn}</h3>
                <p className="text-sm text-gray-600 mt-1">{union.en}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StatisticsPage;
