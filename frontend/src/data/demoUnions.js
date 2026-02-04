const demoImageBase = 'https://images.unsplash.com';

const images = {
  river: `${demoImageBase}/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80`,
  market: `${demoImageBase}/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80`,
  culture: `${demoImageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80`,
  food: `${demoImageBase}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`,
  mosque: `${demoImageBase}/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80`,
  chair: `${demoImageBase}/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80`,
  landscape: `${demoImageBase}/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80`,
  lake: `${demoImageBase}/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80`,
};

const buildUnion = ({ id, name, bengaliName, populationEstimate, areaSize, villages, voters }) => ({
  id,
  name,
  bengaliName,
  populationEstimate,
  areaSize,
  villages,
  voters,
  problemCount: Math.floor(Number(villages || 10) / 2),
  introduction: `${bengaliName} ইউনিয়ন ত্রিশাল উপজেলার একটি ঐতিহ্যবাহী অঞ্চল। এখানে কৃষি, শিক্ষা ও স্থানীয় ব্যবসা মিলিয়ে বৈচিত্র্যময় জীবনধারা গড়ে উঠেছে।`,
  introductionFields: [
    { key: 'প্রতিষ্ঠা সাল', value: '১৯৭৪' },
    { key: 'শিক্ষা প্রতিষ্ঠান', value: '৫ টি' },
    { key: 'হাট-বাজার', value: '২ টি' },
    { key: 'উল্লেখযোগ্য নদী', value: '১ টি' },
  ],
  introductionImages: [images.landscape, images.river, images.market],
  chairman: {
    name: 'মোঃ হাসান উদ্দিন',
    contactNumber: '+8801XXXXXXXXX',
    images: [images.chair, images.mosque],
  },
  placesToVisit: [
    {
      name: 'Union Riverside Park',
      bengaliName: 'নদীর পাড়ের উদ্যান',
      description: 'সন্ধ্যায় হাঁটার জন্য শান্ত পরিবেশ ও নদীর সৌন্দর্য উপভোগ করার স্থান।',
      images: [images.river, images.lake, images.landscape],
    },
    {
      name: 'Heritage Market',
      bengaliName: 'ঐতিহ্যবাহী বাজার',
      description: 'স্থানীয় কৃষিপণ্য ও হস্তশিল্পের জন্য পরিচিত ঐতিহাসিক বাজার।',
      images: [images.market, images.culture],
    },
  ],
  literatureAndCulture: [
    {
      name: 'Folk Song Festival',
      bengaliName: 'লোকগানের উৎসব',
      type: 'সঙ্গীত',
      description: 'শীতের মৌসুমে আয়োজিত লোকগানের উৎসব, যেখানে স্থানীয় শিল্পীরা অংশ নেন।',
      images: [images.culture, images.landscape],
    },
    {
      name: 'Handicraft Tradition',
      bengaliName: 'হস্তশিল্প ঐতিহ্য',
      type: 'কারুশিল্প',
      description: 'বাঁশ ও বেতের তৈরি সামগ্রী এখানে বহুল জনপ্রিয়।',
      images: [images.market],
    },
  ],
  famousFood: [
    {
      name: 'Bhapa Pitha',
      bengaliName: 'ভাপা পিঠা',
      description: 'চালের গুঁড়ো ও নারকেলের তৈরি ঐতিহ্যবাহী ভাপা পিঠা।',
      mainIngredients: ['চালের গুঁড়ো', 'নারকেল', 'খেজুরের গুড়'],
      images: [images.food, images.market],
    },
    {
      name: 'Chitoi with Bhorta',
      bengaliName: 'চিতই ও ভর্তা',
      description: 'সকালের নাস্তার জনপ্রিয় ঐতিহ্যবাহী খাবার।',
      mainIngredients: ['চালের গুঁড়ো', 'ভর্তা', 'সরিষার তেল'],
      images: [images.food, images.lake],
    },
  ],
});

export const demoUnions = [
  buildUnion({ id: 1, name: 'Mothbari', bengaliName: 'মঠবাড়ী', populationEstimate: 36120, areaSize: 29.2, villages: 13, voters: 21360 }),
  buildUnion({ id: 2, name: 'Trishal', bengaliName: 'ত্রিশাল', populationEstimate: 45120, areaSize: 36.4, villages: 20, voters: 26720 }),
  buildUnion({ id: 3, name: 'Kanthal', bengaliName: 'কাঁঠাল', populationEstimate: 38920, areaSize: 31.5, villages: 16, voters: 23040 }),
  buildUnion({ id: 4, name: 'Dhankhola', bengaliName: 'ধানীখোলা', populationEstimate: 36320, areaSize: 28.5, villages: 14, voters: 21480 }),
  buildUnion({ id: 5, name: 'Kanihary', bengaliName: 'কানিহারী', populationEstimate: 31200, areaSize: 25.2, villages: 11, voters: 18480 }),
  buildUnion({ id: 6, name: 'Bailor', bengaliName: 'বৈলর', populationEstimate: 32560, areaSize: 26.3, villages: 12, voters: 19280 }),
  buildUnion({ id: 7, name: 'Harirampur', bengaliName: 'হরিরামপুর', populationEstimate: 39680, areaSize: 32.0, villages: 15, voters: 23480 }),
  buildUnion({ id: 8, name: 'Rampur', bengaliName: 'রামপুর', populationEstimate: 41840, areaSize: 33.8, villages: 18, voters: 24750 }),
  buildUnion({ id: 9, name: 'Balipara', bengaliName: 'বালিপাড়া', populationEstimate: 37280, areaSize: 30.1, villages: 14, voters: 22080 }),
  buildUnion({ id: 10, name: 'Mokspur', bengaliName: 'মোক্ষপুর', populationEstimate: 38440, areaSize: 31.0, villages: 15, voters: 22750 }),
  buildUnion({ id: 11, name: 'Amirabari', bengaliName: 'আমিরাবাড়ী', populationEstimate: 39263, areaSize: 31.7, villages: 16, voters: 23212 }),
  buildUnion({ id: 12, name: 'Sakhua', bengaliName: 'সাখুয়া', populationEstimate: 35440, areaSize: 28.6, villages: 13, voters: 20960 }),
];

export const demoUnionLookup = demoUnions.reduce((acc, union) => {
  acc[String(union.id)] = union;
  return acc;
}, {});

export const demoProblems = [
  {
    _id: 'demo-1',
    title: 'রাস্তায় পানি জমে থাকে',
    description: 'বৃষ্টির পরে প্রধান সড়কে জলাবদ্ধতা তৈরি হয়।',
    category: 'ইনফ্রাস্ট্রাকচার',
    location: { coordinates: [90.402, 24.585] },
  },
  {
    _id: 'demo-2',
    title: 'স্ট্রিট লাইট কাজ করছে না',
    description: 'বাজার এলাকার লাইটগুলো অনেকদিন ধরে নষ্ট।',
    category: 'বিদ্যুৎ',
    location: { coordinates: [90.389, 24.579] },
  },
];

export const demoImageFallback = images.landscape;
