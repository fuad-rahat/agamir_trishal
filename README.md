# Trishal Civic Map & Election Help System

একটি আধুনিক web-based civic platform যা ত্রিশাল উপজেলার নাগরিকদের জন্য অবকাঠামোগত সমস্যা রিপোর্ট করতে এবং নির্বাচন সংক্রান্ত তথ্য পেতে সাহায্য করে।

## 🚀 প্রধান বৈশিষ্ট্য

- 🗺️ **ইন্টারেক্টিভ ম্যাপ**: ত্রিশাল উপজেলার সম্পূর্ণ ম্যাপ সহ সকল ইউনিয়নের সীমানা
- 📍 **সমস্যা রিপোর্টিং**: গোপনীয় এবং স্বচ্ছ সমস্যা রিপোর্টিং সিস্টেম
- 🗳️ **ভোট কেন্দ্র লোকেটর**: সকল ভোট কেন্দ্রের অবস্থান এবং বিস্তারিত তথ্য
- 🆘 **হেল্পলাইন ডিরেক্টরি**: জরুরি এবং সহায়তা সেবার যোগাযোগ নম্বর
- 👨‍💼 **অ্যাডমিন প্যানেল**: রিপোর্ট পর্যালোচনা এবং ড্যাশবোর্ড অ্যানালিটিক্স
- 📱 **মোবাইল বান্ধব**: সম্পূর্ণভাবে রেসপন্সিভ ডিজাইন

## 🛠️ প্রযুক্তি স্ট্যাক

### Frontend
- React.js 18
- Tailwind CSS
- React Router DOM
- Leaflet.js (Map rendering)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas Free Tier)
- Mongoose ODM

### Map Data
- OpenStreetMap tiles
- GeoJSON for boundaries

## 📋 প্রয়োজনীয়তা

- Node.js v14 বা তার উপরে
- npm বা yarn
- MongoDB Atlas account
- আধুনিক ওয়েব ব্রাউজার

## 🔧 ইনস্টলেশন

### 1. প্রকল্প ক্লোন করুন

```bash
cd d:\trishal
```

### 2. Backend সেটআপ

```bash
cd backend
npm install
```

`.env` ফাইল তৈরি করুন এবং নিম্নলিখিত যোগ করুন:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/trishal-civic?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
ADMIN_EMAIL=admin@trishal.local
ADMIN_PASSWORD=admin123
```

Backend চালু করুন:

```bash
npm start
```

বা ডেভেলপমেন্ট মোডে:

```bash
npm run dev
```

### 3. Frontend সেটআপ

নতুন টার্মিনালে:

```bash
cd frontend
npm install
```

`.env` ফাইল তৈরি করুন:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Frontend চালু করুন:

```bash
npm start
```

এটি স্বয়ংক্রিয়ভাবে `http://localhost:3000` এ খুলবে।

## 📱 ব্যবহারকারীর নির্দেশনা

### সাধারণ ব্যবহারকারী

1. **হোম পেজ**: ত্রিশাল উপজেলার মানচিত্র দেখুন
2. **ইউনিয়ন নির্বাচন**: ম্যাপে ক্লিক করে বা সাইডবার থেকে ইউনিয়ন নির্বাচন করুন
3. **সমস্যা রিপোর্ট করুন**: শিরোনাম, বিভাগ, বর্ণনা এবং ছবি প্রদান করুন
4. **ভোট কেন্দ্র খুঁজুন**: পোলিং স্টেশন পেজে আপনার নিকটবর্তী ভোটকেন্দ্র খুঁজুন
5. **হেল্পলাইন**: জরুরি যোগাযোগ নম্বর পান

### প্রশাসক

1. অ্যাডমিন লগইন পেজে যান: `/admin/login`
2. ডেমো শংসাপত্র ব্যবহার করুন:
   - ইমেল: `admin@trishal.local`
   - পাসওয়ার্ড: `admin123`
3. ড্যাশবোর্ডে অপেক্ষমান সমস্যা অনুমোদন বা অস্বীকার করুন
4. বিভিন্ন অ্যানালিটিক্স এবং পরিসংখ্যান দেখুন

## 🎯 API এন্ডপয়েন্ট

### ইউনিয়ন
- `GET /api/unions` - সকল ইউনিয়ন পান
- `GET /api/unions/:id` - নির্দিষ্ট ইউনিয়ন পান
- `POST /api/unions` - নতুন ইউনিয়ন তৈরি করুন (Admin)

### সমস্যা
- `GET /api/problems` - সকল সমস্যা পান
- `GET /api/problems/union/:unionId` - ইউনিয়ন অনুযায়ী সমস্যা পান
- `POST /api/problems` - নতুন সমস্যা রিপোর্ট করুন
- `PUT /api/problems/:id/status` - সমস্যার স্ট্যাটাস আপডেট করুন
- `PUT /api/problems/:id/upvote` - সমস্যায় আপভোট করুন

### ভোট কেন্দ্র
- `GET /api/polling-stations` - সকল ভোটকেন্দ্র পান
- `GET /api/polling-stations/union/:unionId` - ইউনিয়ন অনুযায়ী ভোটকেন্দ্র
- `POST /api/polling-stations` - নতুন ভোটকেন্দ্র যোগ করুন (Admin)

### অবকাঠামো
- `GET /api/infrastructure` - সকল অবকাঠামো পান
- `GET /api/infrastructure/union/:unionId` - ইউনিয়ন অনুযায়ী অবকাঠামো
- `POST /api/infrastructure` - নতুন অবকাঠামো তথ্য যোগ করুন (Admin)

### হেল্পলাইন
- `GET /api/helpline` - সকল হেল্পলাইন পান
- `GET /api/helpline/category/:category` - বিভাগ অনুযায়ী হেল্পলাইন
- `POST /api/helpline` - নতুন হেল্পলাইন যোগ করুন (Admin)

## 📁 ফোল্ডার কাঠামো

```
d:\trishal\
├── backend/
│   ├── models/
│   │   ├── Union.js
│   │   ├── Problem.js
│   │   ├── PollingStation.js
│   │   ├── Infrastructure.js
│   │   ├── Helpline.js
│   │   └── Admin.js
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── data/
│   │   └── trishal-geojson.json
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── UpazilaMap.js
    │   │   ├── UnionCard.js
    │   │   ├── ProblemCard.js
    │   │   ├── UnionDetailModal.js
    │   │   └── Footer.js
    │   ├── pages/
    │   │   ├── HomePage.js
    │   │   ├── ProblemsPage.js
    │   │   ├── ReportProblemPage.js
    │   │   ├── PollingStationsPage.js
    │   │   ├── HelplinePage.js
    │   │   ├── AdminLoginPage.js
    │   │   └── AdminDashboardPage.js
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   └── hooks.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🎨 ডিজাইন বৈশিষ্ট্য

- সবুজ এবং নীল রঙের স্কিম
- নরম ছায়া এবং মসৃণ রূপান্তর
- আধুনিক এবং পরিষ্কার টাইপোগ্রাফি
- সম্পূর্ণ বাংলা ভাষা সমর্থন
- ডার্ক মোড রেডি (কাস্টমাইজেশন সম্ভব)

## 🔐 নিরাপত্তা

- গোপনীয় সমস্যা রিপোর্ট (কোনো ব্যক্তিগত তথ্য সংরক্ষণ নেই)
- JWT ভিত্তিক প্রশাসক প্রমাণীকরণ
- CORS সুরক্ষা সক্ষম
- ডেটা যাচাইকরণ এবং স্যানিটাইজেশন
- পাসওয়ার্ড হ্যাশিং (bcryptjs)

## 📊 ডেটাবেস স্কিমা

### Union
- name, bengaliName, boundary (GeoJSON)
- description, populationEstimate, areaSize
- problemCount

### Problem
- title, description, category (Road, School, Health, etc.)
- union (ref), location (Point GeoJSON)
- images, status (pending, approved, in-progress, resolved, hidden)
- isAnonymous, isElectionDay, upvotes

### PollingStation
- name, address, union (ref), location (Point)
- booth, contactPerson, contactPhone
- accessibility, verified

### Infrastructure
- type, name, union (ref), location (Point)
- description, address, condition

### Helpline
- name, category, number, description, availability

## 🚀 ডিপ্লয়মেন্ট

### Heroku তে Backend ডিপ্লয়মেন্ট

1. Heroku CLI ইনস্টল করুন
2. `heroku login` চালান
3. Backend ফোল্ডারে `Procfile` তৈরি করুন: `web: node server.js`
4. `heroku create your-app-name` চালান
5. পরিবেশ ভেরিয়েবল সেট করুন
6. `git push heroku main` করুন

### Vercel/Netlify তে Frontend ডিপ্লয়মেন্ট

1. GitHub এ রেপোজিটরি পুশ করুন
2. Vercel বা Netlify এ কানেক্ট করুন
3. বিল্ড কমান্ড: `npm run build`
4. স্বয়ংক্রিয় ডিপ্লয়মেন্ট শুরু হবে

## 🐛 ট্রাবলশুটিং

### MongoDB সংযোগ ত্রুটি
- সঠিক সংযোগ স্ট্রিং চেক করুন
- IP হোয়াইটলিস্ট যাচাই করুন
- MongoDB Atlas ক্লাস্টার চলছে কিনা তা নিশ্চিত করুন

### CORS ত্রুটি
- Backend CORS সক্ষম করা আছে কিনা তা চেক করুন
- সঠিক পোর্ট ব্যবহার করছেন কিনা তা নিশ্চিত করুন

### ম্যাপ লোড না হওয়া
- Leaflet লাইব্রেরি ইনস্টল করা আছে কিনা চেক করুন
- ইন্টারনেট সংযোগ যাচাই করুন
- ব্রাউজার কনসোল ত্রুটি চেক করুন

## 📝 লাইসেন্স

এই প্রকল্পটি MIT লাইসেন্সের অধীন।

## 🤝 অবদান

অবদান স্বাগত জানাই! দয়া করে এই প্রক্রিয়া অনুসরণ করুন:

1. এই রেপোজিটরি ফর্ক করুন
2. নতুন ব্র্যাঞ্চ তৈরি করুন (`git checkout -b feature/AmazingFeature`)
3. আপনার পরিবর্তন কমিট করুন (`git commit -m 'Add some AmazingFeature'`)
4. ব্র্যাঞ্চে পুশ করুন (`git push origin feature/AmazingFeature`)
5. Pull Request খুলুন

## 📧 যোগাযোগ

প্রশ্ন বা পরামর্শের জন্য: info@trishal.local

## 🙏 কৃতজ্ঞতা

- OpenStreetMap সম্প্রদায়
- Leaflet.js ডেভেলপাররা
- Tailwind CSS টিম
- React এবং Node.js সম্প্রদায়

---

**নোট**: এটি একটি নন-পার্টিসান, সম্প্রদায়-কেন্দ্রিক প্ল্যাটফর্ম যা ত্রিশাল উপজেলার সকল নাগরিকদের সেবা করে।
#   a g a m i r _ t r i s h a l  
 