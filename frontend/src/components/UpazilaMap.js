import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { unionsAPI, problemsAPI } from '../services/api';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const UpazilaMap = ({ onUnionClick, selectedUnion, zoom = 10 }) => {
  const [unions, setUnions] = useState([]);
  const [problems, setProblems] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [roadsGeoJson, setRoadsGeoJson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Try to fetch from API first, fallback to local GeoJSON
      let geoData = null;
      try {
        const response = await fetch('/trishal-complete-geojson.json');
        if (response.ok) {
          geoData = await response.json();
        }
      } catch (err) {
        console.warn('Could not load local GeoJSON:', err);
      }

      const unionsData = await unionsAPI.getAll().catch(() => ({ data: [] }));
      setUnions(unionsData.data || []);
      
      const problemsData = await problemsAPI.getAll({ status: 'approved' }).catch(() => ({ data: [] }));
      setProblems(problemsData.data || []);

      // Use loaded GeoJSON or create from API data
      if (geoData && geoData.features) {
        setGeoJsonData(geoData);
      } else if (unionsData.data && unionsData.data.length > 0) {
        const features = unionsData.data.map((union) => ({
          type: 'Feature',
          properties: {
            name: union.name,
            bengaliName: union.bengaliName,
            _id: union._id,
            problemCount: union.problemCount,
          },
          geometry: union.boundary,
        }));
        setGeoJsonData({ type: 'FeatureCollection', features });
      }

      // Compute bounding box from data to fetch roads
      try {
        const features = geoData?.features || unionsData.data || [];
        const allCoords = features.flatMap((f) => {
          const geom = f.geometry;
          if (!geom) return [];
          if (geom.type === 'Polygon') return geom.coordinates.flat();
          if (geom.type === 'MultiPolygon') return geom.coordinates.flat(2);
          return [];
        });

        if (allCoords.length) {
          const lats = allCoords.map((c) => c[1]);
          const lngs = allCoords.map((c) => c[0]);
          const south = Math.min(...lats);
          const north = Math.max(...lats);
          const west = Math.min(...lngs);
          const east = Math.max(...lngs);

          fetchRoads({ south, west, north, east });
        }
      } catch (err) {
        console.warn('Could not compute bbox for roads:', err);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoads = async (bbox) => {
    // Overpass API bbox is: south,west,north,east
    const bboxStr = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;
    const query = `[
out:json][timeout:25];
(way[highway](${bboxStr}););
out body geom;`;

    try {
      const url = 'https://overpass-api.de/api/interpreter';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ data: query }),
      });
      const data = await res.json();

      const features = data.elements
        .filter((el) => el.type === 'way' && Array.isArray(el.geometry))
        .map((el) => ({
          type: 'Feature',
          properties: { highway: el.tags && el.tags.highway, tags: el.tags || {} },
          geometry: {
            type: 'LineString',
            coordinates: el.geometry.map((g) => [g.lon, g.lat]),
          },
        }));

      setRoadsGeoJson({ type: 'FeatureCollection', features });
    } catch (err) {
      console.warn('Failed to fetch roads from Overpass:', err);
    }
  };

  const onEachFeature = (feature, layer) => {
    const { name, bengaliName, population, voters, villages, color } = feature.properties;
    
    layer.on('click', () => {
      onUnionClick(feature.properties);
    });

    layer.on('mouseover', () => {
      layer.setStyle({
        fillOpacity: 0.9,
        weight: 4,
        dashArray: '',
      });
      layer.bringToFront();
    });

    layer.on('mouseout', () => {
      layer.setStyle({
        fillOpacity: selectedUnion?._id === feature.properties._id ? 0.8 : 0.6,
        weight: selectedUnion?._id === feature.properties._id ? 3 : 2,
      });
    });

    const popup = L.popup({ className: 'union-popup' }).setContent(`
      <div class="p-3 text-sm font-sans">
        <p class="font-bold text-gray-900 text-base mb-2">${bengaliName}</p>
        <hr class="my-2" />
        <div class="space-y-1 text-gray-700">
          <p>👥 জনসংখ্যা: <strong>${population}</strong></p>
          <p>🗳️ ভোটার: <strong>${voters}</strong></p>
          <p>🏘️ গ্রাম: <strong>${villages}</strong></p>
        </div>
      </div>
    `);
    layer.bindPopup(popup);
  };

  const styleFeature = (feature) => {
    const isSelected = selectedUnion?._id === feature.properties._id;
    const color = feature.properties.color || '#3b82f6';
    
    return {
      fillColor: color,
      weight: isSelected ? 3 : 2,
      opacity: 1,
      color: isSelected ? '#1f2937' : '#6b7280',
      dashArray: isSelected ? '' : '0',
      fillOpacity: isSelected ? 0.8 : 0.6,
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">ম্যাপ লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[24.5826256, 90.3947568]}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      className="rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {geoJsonData && (
        <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} style={styleFeature} />
      )}

      {roadsGeoJson && (
        <GeoJSON
          data={roadsGeoJson}
          style={(feature) => ({
            color: feature.properties && feature.properties.tags && feature.properties.tags.highway && feature.properties.tags.highway.includes('motorway') ? '#b91c1c' : '#374151',
            weight: feature.properties && feature.properties.tags && (feature.properties.tags.highway === 'primary' || feature.properties.tags.highway === 'secondary') ? 3 : 1.5,
            opacity: 0.9,
          })}
        />
      )}

      {problems.map((problem) => {
        const icon = L.icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png`,
          shadowUrl: `https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        return (
          <Marker
            key={problem._id}
            position={[problem.location.coordinates[1], problem.location.coordinates[0]]}
            icon={icon}
          >
            <Popup>
              <div className="text-sm max-w-xs">
                <p className="font-bold text-gray-800">{problem.title}</p>
                <p className="text-gray-600 text-xs mt-1">{problem.description.substring(0, 100)}...</p>
                <p className="text-xs text-gray-500 mt-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{problem.category}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default UpazilaMap;
