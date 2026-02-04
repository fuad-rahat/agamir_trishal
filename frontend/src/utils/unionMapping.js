// Mapping between frontend string IDs and backend MongoDB ObjectIds
// These must match the IDs used in the backend seed script

export const UNION_ID_MAP = {
  '1': '660000000000000000000001', // Dhankhola
  '2': '660000000000000000000002', // Bailor
  '3': '660000000000000000000003', // Kanthal
  '4': '660000000000000000000004', // Kanihary
  '5': '660000000000000000000005', // Rampur
  '6': '660000000000000000000006', // Trishal
  '7': '660000000000000000000007', // Harirampur
  '8': '660000000000000000000008', // Sakhua
  '9': '660000000000000000000009', // Balipara
  '10': '660000000000000000000010', // Mothbari
  '11': '660000000000000000000011', // Mokspur
  '12': '660000000000000000000012', // Amirabari
};

export const getObjectId = (stringId) => UNION_ID_MAP[stringId] || stringId;
