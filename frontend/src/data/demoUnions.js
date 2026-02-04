const demoImageBase = 'https://images.unsplash.com';

const imageSets = [
  {
    landscape: `${demoImageBase}/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80`,
    river: `${demoImageBase}/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80`,
    market: `${demoImageBase}/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80`,
    culture: `${demoImageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80`,
    food: `${demoImageBase}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`,
    mosque: `${demoImageBase}/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80`,
    chair: `${demoImageBase}/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80`,
    lake: `${demoImageBase}/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80`,
  },
  {
    landscape: `${demoImageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80`,
    river: `${demoImageBase}/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=900&q=80`,
    market: `${demoImageBase}/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80`,
    culture: `${demoImageBase}/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80`,
    food: `${demoImageBase}/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80`,
    mosque: `${demoImageBase}/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80`,
    chair: `${demoImageBase}/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80`,
    lake: `${demoImageBase}/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80`,
  },
  {
    landscape: `${demoImageBase}/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80`,
    river: `${demoImageBase}/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=900&q=80`,
    market: `${demoImageBase}/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80`,
    culture: `${demoImageBase}/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=900&q=80`,
    food: `${demoImageBase}/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=900&q=80`,
    mosque: `${demoImageBase}/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80`,
    chair: `${demoImageBase}/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80`,
    lake: `${demoImageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80`,
  },
  {
    landscape: `${demoImageBase}/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=900&q=80`,
    river: `${demoImageBase}/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=900&q=80`,
    market: `${demoImageBase}/photo-1458642849426-cfb724f15ef7?auto=format&fit=crop&w=900&q=80`,
    culture: `${demoImageBase}/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80`,
    food: `${demoImageBase}/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80`,
    mosque: `${demoImageBase}/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80`,
    chair: `${demoImageBase}/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80`,
    lake: `${demoImageBase}/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=900&q=80`,
  },
];

const chairmanNames = [
  'মোঃ হাসান উদ্দিন',
  'মোঃ রফিকুল ইসলাম',
  'মোঃ শাহজাহান মিয়া',
  'মোঃ আনোয়ার হোসেন',
  'মোঃ ফরিদ আহমেদ',
  'মোঃ জালাল উদ্দিন',
  'মোঃ হাবিবুর রহমান',
  'মোঃ নুরুল ইসলাম',
  'মোঃ কামাল উদ্দিন',
  'মোঃ আব্দুল হালিম',
  'মোঃ সাইফুল ইসলাম',
  'মোঃ ফারুক হোসেন',
];

const unionIntroductions = [
  'এই ইউনিয়নটি নদী ও খাল ঘেরা একটি শান্তিপূর্ণ অঞ্চল। কৃষি ও নৌপরিবহন এখানকার প্রধান ভরসা।',
  'শিক্ষা ও বাজার কেন্দ্রিক অর্থনীতি এই ইউনিয়নের বিশেষ পরিচয়।',
  'কৃষি ও হস্তশিল্পের ঐতিহ্য এখানে সমৃদ্ধ, বিশেষ করে মৌসুমি ফল চাষে সুনাম আছে।',
  'প্রধান সড়ক সংলগ্ন হওয়ায় ব্যবসা ও যাতায়াত সুবিধা এখানে বেশি।',
  'এই ইউনিয়নটি প্রাকৃতিক সৌন্দর্য ও জলাশয়ের জন্য পরিচিত।',
  'স্থানীয় বাজার, মসজিদ ও বিদ্যালয় কেন্দ্রিক সামাজিক কাঠামো গড়ে উঠেছে।',
  'কৃষি, মাছ চাষ ও ছোট ব্যবসা এখানকার প্রধান আয়ের উৎস।',
  'উৎসব ও লোকসংগীতের মাধ্যমে এখানকার সংস্কৃতি আরও সমৃদ্ধ হয়েছে।',
  'চাষাবাদ ও নৌপথের পাশাপাশি গ্রামীণ পর্যটনের সম্ভাবনা রয়েছে।',
  'এখানে ঐতিহাসিক মসজিদ ও পুরনো বাজার রয়েছে যা মানুষকে আকর্ষণ করে।',
  'কৃষিভিত্তিক এই অঞ্চলে ধান ও সবজির উৎপাদন বেশি।',
  'ইতিহাস ও সংস্কৃতিতে সমৃদ্ধ এই ইউনিয়ন পর্যটনের জন্য উপযোগী।',
];

const buildUnion = ({ id, name, bengaliName, populationEstimate, areaSize, villages, voters }) => {
  const imageSet = imageSets[(id - 1) % imageSets.length];
  const chairmanName = chairmanNames[(id - 1) % chairmanNames.length];
  const introCopy = unionIntroductions[(id - 1) % unionIntroductions.length];

  return {
    id,
    name,
    bengaliName,
    populationEstimate,
    areaSize,
    villages,
    voters,
    problemCount: Math.floor(Number(villages || 10) / 2),
    introduction: `${bengaliName} ইউনিয়ন ত্রিশাল উপজেলার একটি ঐতিহ্যবাহী অঞ্চল। ${introCopy}`,
    introductionFields: [
      { key: 'প্রতিষ্ঠা সাল', value: `১৯${70 + id}` },
      { key: 'শিক্ষা প্রতিষ্ঠান', value: `${4 + (id % 3)} টি` },
      { key: 'হাট-বাজার', value: `${1 + (id % 2)} টি` },
      { key: 'উল্লেখযোগ্য নদী', value: `${1 + (id % 3)} টি` },
    ],
    introductionImages: [imageSet.landscape, imageSet.river, imageSet.market],
    chairman: {
      name: chairmanName,
      contactNumber: `+8801${id}XXXXXXX`,
      images: [imageSet.chair, imageSet.mosque],
    },
    placesToVisit: [
      {
        name: 'Union Riverside Park',
        bengaliName: 'নদীর পাড়ের উদ্যান',
        description: 'সন্ধ্যায় হাঁটার জন্য শান্ত পরিবেশ ও নদীর সৌন্দর্য উপভোগ করার স্থান।',
        images: [imageSet.river, imageSet.lake, imageSet.landscape],
      },
      {
        name: 'Heritage Market',
        bengaliName: 'ঐতিহ্যবাহী বাজার',
        description: 'স্থানীয় কৃষিপণ্য ও হস্তশিল্পের জন্য পরিচিত ঐতিহাসিক বাজার।',
        images: [imageSet.market, imageSet.culture],
      },
    ],
    literatureAndCulture: [
      {
        name: 'Folk Song Festival',
        bengaliName: 'লোকগানের উৎসব',
        type: 'সঙ্গীত',
        description: 'শীতের মৌসুমে আয়োজিত লোকগানের উৎসব, যেখানে স্থানীয় শিল্পীরা অংশ নেন।',
        images: [imageSet.culture, imageSet.landscape],
      },
      {
        name: 'Handicraft Tradition',
        bengaliName: 'হস্তশিল্প ঐতিহ্য',
        type: 'কারুশিল্প',
        description: 'বাঁশ ও বেতের তৈরি সামগ্রী এখানে বহুল জনপ্রিয়।',
        images: [imageSet.market],
      },
    ],
    famousFood: [
      {
        name: 'Bhapa Pitha',
        bengaliName: 'ভাপা পিঠা',
        description: 'চালের গুঁড়ো ও নারকেলের তৈরি ঐতিহ্যবাহী ভাপা পিঠা।',
        mainIngredients: ['চালের গুঁড়ো', 'নারকেল', 'খেজুরের গুড়'],
        images: [imageSet.food, imageSet.market],
      },
      {
        name: 'Chitoi with Bhorta',
        bengaliName: 'চিতই ও ভর্তা',
        description: 'সকালের নাস্তার জনপ্রিয় ঐতিহ্যবাহী খাবার।',
        mainIngredients: ['চালের গুঁড়ো', 'ভর্তা', 'সরিষার তেল'],
        images: [imageSet.food, imageSet.lake],
      },
    ],
  };
};

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

export const demoImageFallback = imageSets[0].landscape;
