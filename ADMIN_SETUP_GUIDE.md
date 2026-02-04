# QUICK START GUIDE - Admin & Union Management

## 🎯 What's New?

### For Regular Users
- **Click on any union in the map** → Opens beautiful detail page
- **5 Information Sections**: Chairman, Places, Culture, Food, Famous Sites
- **Fully responsive design** for all devices

### For Admins
- **Login System** with email & password
- **Manage union information** through admin dashboard
- **Role-based permissions** (Super Admin can create admins)

---

## 🚀 QUICK START

### 1. Start Backend
```bash
cd backend
npm start
```
Server runs on `http://localhost:5000`

### 2. Start Frontend
```bash
cd frontend
npm start
```
App runs on `http://localhost:3000`

---

## 👨‍💼 Admin Setup

### Create First Admin
First, you need to create the super admin. Use the database or API:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trishal.local",
    "password": "Admin@123",
    "fullName": "Super Admin"
  }'
```

The first admin will automatically be assigned `super_admin` role.

### Login as Admin
1. Go to `http://localhost:3000/admin/login`
2. Enter email and password
3. Click "লগইন করুন" (Login)
4. Access dashboard at `/admin/dashboard`

---

## 📋 Admin Dashboard Features

### View Unions
- Grid view of all 12 unions
- Status indicators showing which info is added
- Click any union to edit

### Add Information
Select a union and use tabs to add:

#### 1️⃣ চেয়ারম্যান (Chairman)
- Name, Contact Number, Photo URL
- Button: "চেয়ারম্যান যোগ করুন"

#### 2️⃣ ভ্রমণ স্থান (Places to Visit)
- English & Bengali Names
- Description (multiple places supported)
- Photo URL

#### 3️⃣ বিখ্যাত স্থান (Famous Places)
- Names, Description, Historical Significance
- Photo URL
- Multiple entries allowed

#### 4️⃣ সংস্কৃতি (Culture & Literature)
- Type Selector:
  - শিল্প রূপ (Art Form)
  - ঐতিহ্যবাহী খেলা (Traditional Sport)
  - লোককাহিনী (Folk Tale)
  - কারুশিল্প (Crafts)
  - সঙ্গীত (Music)
  - নৃত্য (Dance)
- Description, Photo URL

#### 5️⃣ খাবার (Famous Food)
- English & Bengali Names
- Description
- Main Ingredients (comma-separated)
- Photo URL

---

## 🔐 User Roles

### Super Admin
✅ Create new admin accounts
✅ Manage all union information
✅ View admin dashboard
✅ Full system access

### Admin
✅ Manage union information (add/edit)
✅ View admin dashboard
❌ Cannot create other admins

---

## 🗺️ Union Map Features

### For Users
1. **Hover** on any union → Color changes, stroke increases
2. **Click** on union → Navigates to detail page
3. **Back button** → Returns to map

### Union Detail Page
- **Tab Navigation**: 5 main sections
- **Overview Tab**: Population, Area, Problem count, Villages
- **Chairman Tab**: Photo, Name, Contact Number
- **Places Tab**: Beautiful cards with images
- **Culture Tab**: Different cultural items with types
- **Food Tab**: Ingredients, descriptions with photos

---

## 📱 Responsive Design

✅ **Mobile** (< 768px)
- Single column layout
- Touch-friendly buttons
- Optimized images

✅ **Tablet** (768px - 1024px)
- 2-column grid
- Medium sized cards

✅ **Desktop** (> 1024px)
- 3-column grid
- Full features visible
- Optimal spacing

---

## 🛡️ Security Features

- **Password Hashing**: bcryptjs encryption
- **JWT Tokens**: 7-day expiration
- **Protected Routes**: Admin-only endpoints
- **Role Verification**: Permission checks on server
- **CORS Enabled**: Safe cross-origin requests

---

## 🐛 Troubleshooting

### Admin Login Not Working
1. Ensure backend is running (`http://localhost:5000`)
2. Check MongoDB connection
3. Verify admin credentials in database

### Union Detail Page Not Loading
1. Check if union ID is correct
2. Ensure backend API is running
3. Check browser console for errors

### Forms Not Submitting
1. Verify all required fields are filled
2. Check if token is still valid (7 days)
3. Logout and login again if needed

### Images Not Loading
1. Ensure image URLs are valid and publicly accessible
2. Check browser console for CORS errors
3. Verify image format (jpg, png, gif)

---

## 📧 Contact & Support

For issues or questions:
1. Check MongoDB connection
2. Verify .env file has correct MongoDB URI
3. Check browser console for detailed errors
4. Ensure Node.js and npm are up to date

---

## ✅ Testing Checklist

### User Flow
- [ ] Click union on map
- [ ] View detail page
- [ ] Navigate through all 5 tabs
- [ ] Check responsive design on mobile

### Admin Flow
- [ ] Login to admin panel
- [ ] Select union to manage
- [ ] Add chairman information
- [ ] Add places to visit
- [ ] Add famous places
- [ ] Add culture items
- [ ] Add famous foods
- [ ] Verify data appears in user view

### Data Validation
- [ ] Required fields show errors
- [ ] Images display correctly
- [ ] Bengali text renders properly
- [ ] Links and phone numbers work

---

## 🎉 You're All Set!

The system is now ready for:
✅ Users to explore union information
✅ Admins to manage and update data
✅ Full bilingual support (English & Bengali)
✅ Mobile-friendly experience

Happy exploring! 🌍

