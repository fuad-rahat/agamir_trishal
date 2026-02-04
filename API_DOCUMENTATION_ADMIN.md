# API DOCUMENTATION - Admin & Union Management

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. Admin Registration
**POST** `/auth/register`

Create a new admin account. The first admin will be created as `super_admin`.

**Request Body:**
```json
{
  "email": "admin@trishal.local",
  "password": "SecurePassword123",
  "fullName": "Admin Name"
}
```

**Response (201):**
```json
{
  "message": "অ্যাডমিন সফলভাবে তৈরি হয়েছে",
  "admin": {
    "email": "admin@trishal.local",
    "fullName": "Admin Name",
    "role": "super_admin"
  }
}
```

**Errors:**
- `403`: If not super admin trying to create admin
- `500`: Server error

---

### 2. Admin Login
**POST** `/auth/login`

Authenticate an admin and get JWT token.

**Request Body:**
```json
{
  "email": "admin@trishal.local",
  "password": "SecurePassword123"
}
```

**Response (200):**
```json
{
  "message": "লগইন সফল",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@trishal.local",
    "fullName": "Admin Name",
    "role": "super_admin"
  }
}
```

**Headers for Subsequent Requests:**
```
Authorization: Bearer <token>
```

---

## Union Information Endpoints

All union information endpoints require:
- **Authentication**: Bearer Token in header
- **Permission**: 'add_union_info'

### 3. Get All Unions
**GET** `/unions`

Retrieve all unions with their information.

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Trishal",
    "bengaliName": "ত্রিশাল",
    "description": "...",
    "chairman": { "name": "...", "contactNumber": "...", "image": "..." },
    "placesToVisit": [...],
    "famousPlaces": [...],
    "literatureAndCulture": [...],
    "famousFood": [...],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T12:30:00Z"
  }
]
```

---

### 4. Get Union by ID
**GET** `/unions/:unionId`

Retrieve detailed information for a specific union.

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Trishal",
  "bengaliName": "ত্রিশাল",
  "description": "ত্রিশাল উপজেলা...",
  "populationEstimate": 45120,
  "areaSize": "36.4",
  "chairman": {
    "name": "মোহাম্মদ করিম সাহেব",
    "contactNumber": "+880-1234-567890",
    "image": "https://example.com/image.jpg"
  },
  "placesToVisit": [
    {
      "name": "Trishal College",
      "bengaliName": "ত্রিশাল কলেজ",
      "description": "একটি বিখ্যাত শিক্ষা প্রতিষ্ঠান",
      "image": "https://example.com/college.jpg"
    }
  ],
  "famousPlaces": [
    {
      "name": "Old Mosque",
      "bengaliName": "পুরানো মসজিদ",
      "description": "১৫০ বছরের পুরাতন মসজিদ",
      "historicalSignificance": "এটি স্থানীয় ঐতিহ্যের প্রতীক",
      "image": "https://example.com/mosque.jpg"
    }
  ],
  "literatureAndCulture": [
    {
      "name": "Baul Music",
      "bengaliName": "বাউল সঙ্গীত",
      "type": "সঙ্গীত",
      "description": "ঐতিহ্যবাহী বাউল সঙ্গীত",
      "image": "https://example.com/baul.jpg"
    }
  ],
  "famousFood": [
    {
      "name": "Trishal Pitha",
      "bengaliName": "ত্রিশাল পিঠা",
      "description": "ঐতিহ্যবাহী খাবার",
      "mainIngredients": ["ধান", "গুড়", "নারকেল"],
      "image": "https://example.com/pitha.jpg"
    }
  ]
}
```

**Errors:**
- `404`: Union not found

---

### 5. Add/Update Chairman
**POST** `/unions/:unionId/chairman`

Add or update chairman information.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "মোহাম্মদ করিম সাহেব",
  "contactNumber": "+880-1234-567890",
  "image": "https://example.com/chairman.jpg"
}
```

**Response (200):**
```json
{
  "message": "চেয়ারম্যান তথ্য যোগ হয়েছে",
  "union": { ... }
}
```

---

### 6. Add Place to Visit
**POST** `/unions/:unionId/place-to-visit`

Add a new place to visit.

**Request Body:**
```json
{
  "name": "Trishal College",
  "bengaliName": "ত্রিশাল কলেজ",
  "description": "একটি বিখ্যাত শিক্ষা প্রতিষ্ঠান",
  "image": "https://example.com/college.jpg"
}
```

**Response (200):**
```json
{
  "message": "ভ্রমণ স্থান যোগ হয়েছে",
  "union": { ... }
}
```

---

### 7. Add Famous Place
**POST** `/unions/:unionId/famous-place`

Add a famous historical or notable place.

**Request Body:**
```json
{
  "name": "Old Mosque",
  "bengaliName": "পুরানো মসজিদ",
  "description": "১৫০ বছরের পুরাতন মসজিদ",
  "historicalSignificance": "এটি স্থানীয় ঐতিহ্যের প্রতীক",
  "image": "https://example.com/mosque.jpg"
}
```

**Response (200):**
```json
{
  "message": "বিখ্যাত স্থান যোগ হয়েছে",
  "union": { ... }
}
```

---

### 8. Add Culture/Literature Item
**POST** `/unions/:unionId/culture`

Add a cultural or literary item.

**Request Body:**
```json
{
  "name": "Baul Music",
  "bengaliName": "বাউল সঙ্গীত",
  "type": "সঙ্গীত",
  "description": "ঐতিহ্যবাহী বাউল সঙ্গীত",
  "image": "https://example.com/baul.jpg"
}
```

**Valid Types:**
- শিল্প রূপ (Art Form)
- ঐতিহ্যবাহী খেলা (Traditional Sport)
- লোককাহিনী (Folk Tale)
- কারুশিল্প (Crafts)
- সঙ্গীত (Music)
- নৃত্য (Dance)

**Response (200):**
```json
{
  "message": "সংস্কৃতি তথ্য যোগ হয়েছে",
  "union": { ... }
}
```

---

### 9. Add Famous Food
**POST** `/unions/:unionId/food`

Add a famous food item.

**Request Body:**
```json
{
  "name": "Trishal Pitha",
  "bengaliName": "ত্রিশাল পিঠা",
  "description": "ঐতিহ্যবাহী খাবার",
  "mainIngredients": ["ধান", "গুড়", "নারকেল"],
  "image": "https://example.com/pitha.jpg"
}
```

**Response (200):**
```json
{
  "message": "খাবার তথ্য যোগ হয়েছে",
  "union": { ... }
}
```

---

### 10. Update All Union Info
**PUT** `/unions/:unionId/info`

Update all information fields at once.

**Request Body:**
```json
{
  "chairman": { ... },
  "placesToVisit": [ ... ],
  "famousPlaces": [ ... ],
  "literatureAndCulture": [ ... ],
  "famousFood": [ ... ]
}
```

**Response (200):**
```json
{
  "message": "ইউনিয়ন তথ্য সফলভাবে আপডেট হয়েছে",
  "union": { ... }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "অবৈধ বা মেয়াদোত্তীর্ণ টোকেন"
}
```

### 403 Forbidden
```json
{
  "message": "এই কাজের অনুমতি নেই"
}
```

### 404 Not Found
```json
{
  "error": "ইউনিয়ন পাওয়া যায়নি"
}
```

### 500 Server Error
```json
{
  "error": "Server error message"
}
```

---

## Example Usage with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trishal.local",
    "password": "SecurePassword123"
  }'
```

### Get Token Response & Extract Token
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@trishal.local","password":"SecurePassword123"}' | \
  grep -o '"token":"[^"]*' | cut -d'"' -f4)
```

### Add Chairman with Token
```bash
curl -X POST http://localhost:5000/api/unions/507f1f77bcf86cd799439011/chairman \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "চেয়ারম্যান নাম",
    "contactNumber": "+880-1234-567890",
    "image": "https://example.com/image.jpg"
  }'
```

---

## Rate Limiting
Currently no rate limiting. Consider implementing in production.

## Versioning
Current API Version: v1

## Authentication Type
JWT (JSON Web Token) with Bearer scheme

## Token Expiration
7 days from issue date

---

**Last Updated**: February 2026
**Status**: Production Ready
