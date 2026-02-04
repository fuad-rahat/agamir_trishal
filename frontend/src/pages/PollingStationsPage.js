import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { pollingStationsAPI, unionsAPI } from '../services/api';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PollingStationsPage = () => {
  const [stations, setStations] = useState([]);
  const [unions, setUnions] = useState([]);
  const [selectedUnion, setSelectedUnion] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUnion) {
      fetchStationsByUnion();
    } else {
      fetchAllStations();
    }
  }, [selectedUnion]);

  const fetchData = async () => {
    try {
      const [stationsRes, unionsRes] = await Promise.all([
        pollingStationsAPI.getAll(),
        unionsAPI.getAll()
      ]);
      setStations(stationsRes.data);
      setUnions(unionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStations = async () => {
    try {
      const response = await pollingStationsAPI.getAll();
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const fetchStationsByUnion = async () => {
    try {
      const response = await pollingStationsAPI.getByUnion(selectedUnion);
      setStations(response.data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    }
  };

  const pollIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            <i className="fas fa-voting-box text-purple-600 mr-2"></i>ভোট কেন্দ্রসমূহ
          </h1>
          <p className="text-gray-600">ত্রিশাল উপজেলার সকল ভোট কেন্দ্রের অবস্থান এবং বিবরণ</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                <i className="fas fa-filter mr-2"></i>ফিল্টার
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">ইউনিয়ন নির্বাচন করুন</label>
                <select
                  value={selectedUnion}
                  onChange={(e) => setSelectedUnion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">সকল ইউনিয়ন</option>
                  {unions.map(union => (
                    <option key={union._id} value={union._id}>
                      {union.bengaliName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stations List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                <h3 className="font-bold text-gray-800">ভোট কেন্দ্রসমূহ ({stations.length})</h3>
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                  </div>
                ) : stations.length > 0 ? (
                  stations.map((station) => (
                    <div key={station._id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition">
                      <p className="font-semibold text-gray-800 text-sm">{station.name}</p>
                      <p className="text-gray-600 text-xs mt-1">{station.address}</p>
                      {station.booth && (
                        <p className="text-gray-500 text-xs">বুথ: {station.booth}</p>
                      )}
                      {station.contactPhone && (
                        <p className="text-green-600 text-xs mt-2">
                          <i className="fas fa-phone mr-1"></i>{station.contactPhone}
                        </p>
                      )}
                      {station.accessibility?.wheelchairAccessible && (
                        <p className="text-blue-600 text-xs mt-1">
                          <i className="fas fa-wheelchair mr-1"></i>প্রবেশযোগ্য
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">কোনো ভোট কেন্দ্র পাওয়া যায়নি</p>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden" style={{ height: '600px' }}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">ম্যাপ লোড হচ্ছে...</p>
                  </div>
                </div>
              ) : (
                <MapContainer
                  center={[24.5826256, 90.3947568]}
                  zoom={11}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {stations.map((station) => (
                    <Marker
                      key={station._id}
                      position={[station.location.coordinates[1], station.location.coordinates[0]]}
                      icon={pollIcon}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-bold text-gray-800">{station.name}</p>
                          <p className="text-gray-600 text-xs mt-2">{station.address}</p>
                          {station.booth && (
                            <p className="text-gray-600 text-xs">বুথ: {station.booth}</p>
                          )}
                          {station.contactPhone && (
                            <p className="text-green-600 text-xs mt-2">
                              <i className="fas fa-phone mr-1"></i>{station.contactPhone}
                            </p>
                          )}
                          {station.accessibility?.wheelchairAccessible && (
                            <p className="text-blue-600 text-xs mt-2">
                              <i className="fas fa-wheelchair mr-1"></i>প্রবেশযোগ্য
                            </p>
                          )}
                          {station.accessibility?.voterAssistanceAvailable && (
                            <p className="text-blue-600 text-xs">
                              <i className="fas fa-hand-holding-heart mr-1"></i>ভোটার সহায়তা উপলব্ধ
                            </p>
                          )}
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6">
            <h3 className="font-bold text-green-900 mb-2">
              <i className="fas fa-map-marker-alt mr-2"></i>সঠিক অবস্থান
            </h3>
            <p className="text-green-800 text-sm">ম্যাপে আপনার নিকটবর্তী ভোট কেন্দ্র খুঁজে পান</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">
              <i className="fas fa-wheelchair mr-2"></i>অ্যাক্সেসিবিলিটি
            </h3>
            <p className="text-blue-800 text-sm">প্রতিবন্ধী ব্যক্তিদের জন্য বিশেষ সুবিধা চিহ্নিত করা হয়েছে</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6">
            <h3 className="font-bold text-purple-900 mb-2">
              <i className="fas fa-phone mr-2"></i>যোগাযোগ
            </h3>
            <p className="text-purple-800 text-sm">যেকোনো প্রশ্নের জন্য প্রদত্ত ফোন নম্বরে যোগাযোগ করুন</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollingStationsPage;
