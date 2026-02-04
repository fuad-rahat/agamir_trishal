# API Documentation - Trishal Civic Map

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints except public ones require admin token in headers:
```
Authorization: Bearer <token>
```

---

## 1. Union Endpoints

### Get All Unions
```
GET /unions
```
**Response:**
```json
[
  {
    "_id": "...",
    "name": "Trishal Sadar",
    "bengaliName": "ত্রিশাল সদর",
    "boundary": { "type": "Polygon", "coordinates": [...] },
    "problemCount": 5,
    "populationEstimate": 50000,
    "areaSize": "12.5 km²"
  }
]
```

### Get Single Union
```
GET /unions/:id
```

### Create Union (Admin)
```
POST /unions
Content-Type: application/json

{
  "name": "Union Name",
  "bengaliName": "ইউনিয়ন নাম",
  "boundary": { "type": "Polygon", "coordinates": [...] },
  "populationEstimate": 50000,
  "areaSize": "12.5 km²"
}
```

### Update Union (Admin)
```
PUT /unions/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "problemCount": 10
}
```

---

## 2. Problem Endpoints

### Get All Problems
```
GET /problems?union=<unionId>&category=<category>&status=approved
```

### Get Problems by Union
```
GET /problems/union/:unionId
```

### Get Problem Statistics
```
GET /problems/stats/:unionId
```

### Create Problem (Public)
```
POST /problems
Content-Type: application/json

{
  "title": "Problem Title",
  "description": "Detailed description",
  "category": "Road",
  "union": "<unionId>",
  "coordinates": [90.1667, 24.2833],
  "images": ["base64_encoded_image_1", "base64_encoded_image_2"],
  "isElectionDay": false,
  "pollingStation": "<stationId>"
}
```

**Categories:**
- Road
- School
- Health
- Water/Drainage
- Electricity
- Other

**Status Values:**
- pending
- approved
- in-progress
- resolved
- hidden

### Update Problem Status (Admin)
```
PUT /problems/:id/status
Content-Type: application/json

{
  "status": "approved"
}
```

### Upvote Problem
```
PUT /problems/:id/upvote
```

---

## 3. Polling Station Endpoints

### Get All Polling Stations
```
GET /polling-stations
```

### Get Stations by Union
```
GET /polling-stations/union/:unionId
```

### Create Polling Station (Admin)
```
POST /polling-stations
Content-Type: application/json

{
  "name": "Station Name",
  "address": "Full Address",
  "union": "<unionId>",
  "coordinates": [90.1667, 24.2833],
  "booth": "Booth 1",
  "contactPerson": "Person Name",
  "contactPhone": "+880XXXXXXXXX",
  "accessibility": {
    "wheelchairAccessible": true,
    "voterAssistanceAvailable": true,
    "notes": "Additional notes"
  }
}
```

### Update Polling Station (Admin)
```
PUT /polling-stations/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "contactPhone": "+880XXXXXXXXX"
}
```

### Verify Polling Station (Admin)
```
PUT /polling-stations/:id/verify
```

### Delete Polling Station (Admin)
```
DELETE /polling-stations/:id
```

---

## 4. Infrastructure Endpoints

### Get All Infrastructure
```
GET /infrastructure?type=Road&union=<unionId>
```

### Get Infrastructure by Union
```
GET /infrastructure/union/:unionId
```

### Get Infrastructure Summary
```
GET /infrastructure/summary/:unionId
```
Returns count by type.

### Create Infrastructure (Admin)
```
POST /infrastructure
Content-Type: application/json

{
  "type": "Road",
  "name": "Main Road",
  "union": "<unionId>",
  "description": "Description",
  "coordinates": [90.1667, 24.2833],
  "address": "Location address",
  "condition": "Good",
  "images": ["base64_encoded_image"]
}
```

**Types:**
- Road
- School
- Health Center
- Water Supply
- Drainage
- Electricity

**Condition:**
- Excellent
- Good
- Fair
- Poor
- Critical

### Update Infrastructure (Admin)
```
PUT /infrastructure/:id
Content-Type: application/json

{
  "condition": "Fair"
}
```

### Delete Infrastructure (Admin)
```
DELETE /infrastructure/:id
```

---

## 5. Helpline Endpoints

### Get All Helplines
```
GET /helpline
```

### Get Helplines by Category
```
GET /helpline/category/:category
```

**Categories:**
- Election Commission
- Local Administration
- Emergency
- Support

### Create Helpline (Admin)
```
POST /helpline
Content-Type: application/json

{
  "name": "Election Commission",
  "category": "Election Commission",
  "number": "+880123456789",
  "description": "Main office",
  "availability": "9 AM - 5 PM (Weekdays)"
}
```

### Update Helpline (Admin)
```
PUT /helpline/:id
Content-Type: application/json

{
  "number": "+880987654321",
  "availability": "24/7"
}
```

### Delete Helpline (Admin)
```
DELETE /helpline/:id
```

---

## 6. Admin Endpoints

### Admin Login
```
POST /admin/login
Content-Type: application/json

{
  "email": "admin@trishal.local",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "admin": {
    "email": "admin@trishal.local",
    "role": "admin"
  }
}
```

### Get Dashboard Analytics
```
GET /admin/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "totalUnions": 6,
  "totalProblems": 45,
  "pendingProblems": 3,
  "resolvedProblems": 20,
  "pollingStations": 50,
  "infrastructure": 120,
  "problemsByCategory": [
    { "_id": "Road", "count": 20 },
    { "_id": "School", "count": 15 }
  ],
  "problemsByUnion": [
    { "unionName": "Trishal Sadar", "count": 15 },
    { "unionName": "Bhangaon", "count": 10 }
  ]
}
```

### Get Pending Problems
```
GET /admin/problems/pending
Authorization: Bearer <token>
```

### Approve Problem
```
PUT /admin/problems/:id/approve
Authorization: Bearer <token>
```

### Hide Problem
```
PUT /admin/problems/:id/hide
Authorization: Bearer <token>
```

### Initialize Admin
```
POST /admin/initialize
```
Creates default admin user if none exists.

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

---

## Example Usage with cURL

### Create a Problem Report
```bash
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Road has big pothole",
    "description": "Main road near market has dangerous pothole",
    "category": "Road",
    "union": "607f1f77bcf86cd799439011",
    "coordinates": [90.1667, 24.2833],
    "images": []
  }'
```

### Get All Approved Problems
```bash
curl http://localhost:5000/api/problems?status=approved
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@trishal.local",
    "password": "admin123"
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding for production:
- 100 requests per minute for public endpoints
- 1000 requests per minute for authenticated endpoints

---

## CORS

CORS is enabled for development:
```
Allowed Origins: http://localhost:3000
Allowed Methods: GET, POST, PUT, DELETE, OPTIONS
```

For production, update allowed origins in `server.js`.

---

## WebSocket Support (Future)

Real-time notifications for:
- New problem reports
- Problem status updates
- Admin notifications

---

Last Updated: 2026-02-01
