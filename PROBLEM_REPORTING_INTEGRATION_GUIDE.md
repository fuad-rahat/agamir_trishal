# Problem Reporting System - Integration Guide

## Overview
This guide explains how to properly integrate the enhanced Problem Reporting System with 12 Trishal unions and anonymous submission capabilities.

## Architecture

### Frontend (React)
- **Union Selection**: Hardcoded 12 unions with string IDs ('1' - '12')
- **Mapping Layer**: `frontend/src/utils/unionMapping.js` converts string IDs to MongoDB ObjectIds before submission
- **Form Submission**: Multi-step friendly interface with validation

### Backend (Express + MongoDB)
- **Union Model**: MongoDB Union collection with ObjectId references
- **Problem Model**: References Union via ObjectId
- **Seeding**: `backend/scripts/seedUnions.js` creates 12 union documents

### Union Data Mapping
```
Frontend String ID ↔ Backend MongoDB ObjectId
'1' ↔ 660000000000000000000001 (Dhankhola)
'2' ↔ 660000000000000000000002 (Bailor)
'3' ↔ 660000000000000000000003 (Kanthal)
'4' ↔ 660000000000000000000004 (Kanihary)
'5' ↔ 660000000000000000000005 (Rampur)
'6' ↔ 660000000000000000000006 (Trishal)
'7' ↔ 660000000000000000000007 (Harirampur)
'8' ↔ 660000000000000000000008 (Sakhua)
'9' ↔ 660000000000000000000009 (Balipara)
'10' ↔ 660000000000000000000010 (Mothbari)
'11' ↔ 660000000000000000000011 (Mokspur)
'12' ↔ 660000000000000000000012 (Amirabari)
```

## Setup Instructions

### Step 1: Backend Setup

#### 1.1 Install Dependencies (if not already done)
```bash
cd backend
npm install
```

#### 1.2 Configure Environment Variables
Ensure your `.env` file has:
```
MONGODB_URI=mongodb+srv://trishal_user:trishal123@cluster0.mongodb.net/trishal-civic?retryWrites=true&w=majority
PORT=5000
```

#### 1.3 Seed the Union Data
Run the seed script to create 12 union documents in MongoDB:
```bash
npm run seed:unions
```

Expected output:
```
✓ MongoDB Connected
✓ Cleared existing unions
✓ Seeded 12 unions successfully

📍 Created Unions:
  1. Dhankhola (ধানীখোলা) - ID: 660000000000000000000001
  2. Bailor (বৈলর) - ID: 660000000000000000000002
  ... (continuing for all 12 unions)

✓ Database connection closed
```

#### 1.4 Start the Backend Server
```bash
npm run dev
# or for production:
npm start
```

The server should be running on `http://localhost:5000`

### Step 2: Frontend Setup

#### 2.1 Install Dependencies (if not already done)
```bash
cd frontend
npm install
```

#### 2.2 Verify Environment
Ensure `.env` file (or `.env.local`) has:
```
REACT_APP_API_URL=http://localhost:5000/api
```

#### 2.3 Start the Frontend Development Server
```bash
npm start
```

The frontend should be running on `http://localhost:3000`

### Step 3: Test the Integration

#### 3.1 Navigate to Report Problem Page
- Go to `http://localhost:3000/report-problem`
- You should see 12 colorful union cards

#### 3.2 Submit a Test Problem
1. Click on a union card (e.g., "Dhankhola")
2. Select a problem category (e.g., "রাস্তা" - Road)
3. Enter problem title (max 60 chars)
4. Enter problem description (max 500 chars)
5. Optionally upload images
6. Review the pre-submission checklist
7. Click "সমস্যা জমা দিন" (Submit Problem)

#### 3.3 Verify Problem Creation
- You should see a success message
- You'll be redirected to `/problems`
- The submitted problem should appear in the list

#### 3.4 Filter Problems by Union
- On the Problems page, select a union from the dropdown
- Problems should be filtered by that union

## Key Files

### Frontend
- **`frontend/src/pages/ReportProblemPage.js`**: Main problem submission form
  - Hardcoded TRISHAL_UNIONS array
  - Multi-step form with validation
  - Uses getObjectId() to convert string IDs to ObjectIds

- **`frontend/src/utils/unionMapping.js`**: Union ID mapping layer
  - Maps string IDs ('1'-'12') to MongoDB ObjectIds
  - Export: getObjectId(stringId)

- **`frontend/src/services/api.js`**: API client
  - problemsAPI.create(data): Submit problem
  - problemsAPI.getAll(params): Fetch all problems with optional filters

- **`frontend/src/pages/ProblemsPage.js`**: Problem display and filtering
  - Fetches problems from backend
  - Filters by union and category
  - Allows upvoting

### Backend
- **`backend/models/Union.js`**: Union schema
  - Fields: name, bengaliName, description, boundary, problemCount, populationEstimate, areaSize

- **`backend/models/Problem.js`**: Problem schema
  - Fields: title, description, category, union (ObjectId ref), location (GeoJSON), images, isAnonymous, status, etc.

- **`backend/controllers/problemController.js`**: Problem creation and retrieval
  - createProblem(): Creates new problem and increments union.problemCount
  - getAllProblems(): Returns problems with optional filters
  - getProblemsByUnion(): Returns problems for specific union

- **`backend/scripts/seedUnions.js`**: Union seeding script
  - Creates 12 union documents with fixed MongoDB ObjectIds
  - Run with: `npm run seed:unions`

## Problem Categories

The system supports 6 problem categories:

1. **রাস্তা** (Road) - Roads, pavements, potholes
2. **স্কুল** (School) - School-related issues
3. **স্বাস্থ্য** (Health) - Health centers, medical issues
4. **পানি/নালা** (Water/Drainage) - Water supply, drainage, sewage
5. **বিদ্যুৎ** (Electricity) - Power issues
6. **অন্যান্য** (Other) - Miscellaneous issues

Categories are defined in: `frontend/src/utils/constants.js`

## Anonymous Submission

All problems are submitted anonymously:
- Frontend automatically sets `isAnonymous: true` before submission
- Backend stores this flag in the Problem document
- Problems page doesn't display submitter information

## Problem Status Workflow

Problems go through the following statuses:
1. **pending**: Newly submitted problem awaiting admin review
2. **approved**: Problem verified by admin and visible to public
3. **in-progress**: Admin is working on resolving the issue
4. **resolved**: Issue has been resolved

Only "approved" and "in-progress" problems are visible on the public Problems page.

## Admin Dashboard

Admins can:
1. View pending problems
2. Approve/reject problems
3. Change problem status
4. View problem statistics

Access via: `/admin` (requires authentication)

## Troubleshooting

### Issue: "Union not found" error when submitting
**Solution**: Run `npm run seed:unions` in the backend directory to create the union documents

### Issue: Problems not appearing on the Problems page
**Possible causes**:
1. Problem status is "pending" (not "approved")
2. Union not found in database (run seed script)
3. API connection issue (check REACT_APP_API_URL)

**Solution**: Check the problem status in MongoDB directly or via the admin dashboard

### Issue: Union dropdown empty on ProblemsPage
**Cause**: Union seed data not created

**Solution**: Run backend seed script: `npm run seed:unions`

### Issue: Frontend can't connect to backend
**Check**:
1. Backend is running on `http://localhost:5000`
2. CORS is enabled in backend (it is by default)
3. REACT_APP_API_URL is correctly set to `http://localhost:5000/api`

## API Endpoints

### Problem Endpoints

**Create Problem**
```
POST /api/problems
Content-Type: application/json

{
  "title": "পথে বড় গর্ত",
  "description": "দুয়েরা গাঁওয়ের সড়কে বড় গর্ত আছে যা ভ্রমণ বিপজ্জনক করে তুলেছে।",
  "category": "Road",
  "union": "660000000000000000000001",
  "coordinates": [90.3947568, 24.5826256],
  "images": ["data:image/jpeg;base64,..."],
  "isAnonymous": true
}

Response: 201 Created
{
  "_id": "...",
  "title": "পথে বড় গর্ত",
  "union": {
    "_id": "660000000000000000000001",
    "name": "Dhankhola",
    "bengaliName": "ধানীখোলা"
  },
  "status": "pending",
  "createdAt": "2025-02-01T10:30:00Z"
}
```

**Get All Problems**
```
GET /api/problems?status=approved&category=Road&union=660000000000000000000001

Response: 200 OK
[
  { problem_object },
  { problem_object },
  ...
]
```

**Get Problems by Union**
```
GET /api/problems/union/660000000000000000000001

Response: 200 OK
[
  { problem_object },
  ...
]
```

**Upvote Problem**
```
PUT /api/problems/{problemId}/upvote

Response: 200 OK
{
  "_id": "...",
  "upvotes": 5,
  ...
}
```

### Union Endpoints

**Get All Unions**
```
GET /api/unions

Response: 200 OK
[
  {
    "_id": "660000000000000000000001",
    "name": "Dhankhola",
    "bengaliName": "ধানীখোলা",
    "problemCount": 3,
    "populationEstimate": 25000,
    "areaSize": "12.5 sq km"
  },
  ...
]
```

## Future Enhancements

1. **Image Storage**: Currently images are stored as base64 strings in MongoDB. Consider integrating cloud storage (AWS S3, Azure Blob)
2. **Geolocation**: Add automatic location detection from user's device
3. **Notifications**: Email/SMS notifications when problem status changes
4. **Analytics**: Problem statistics dashboard by category and union
5. **Mobile App**: Native mobile app for easier reporting on the field

## Support

For issues or questions, refer to:
- Backend logs: Check terminal where `npm run dev` is running
- Frontend console: Check browser developer console (F12)
- MongoDB logs: Check MongoDB connection and data directly

---

**Last Updated**: February 1, 2025
**Version**: 1.0.0
