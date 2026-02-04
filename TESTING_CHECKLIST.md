# Problem Reporting System - Testing Checklist

## Pre-Setup Verification

- [ ] Node.js and npm are installed (`node -v` and `npm -v`)
- [ ] MongoDB server is running and accessible
- [ ] .env file in backend has valid MONGODB_URI
- [ ] Git is initialized (if version control is needed)

## Backend Setup

- [ ] Navigate to `backend` directory: `cd backend`
- [ ] Run `npm install` to install dependencies
- [ ] Create `.env` file with MONGODB_URI if not already done
- [ ] Run `npm run seed:unions` to seed the 12 unions
- [ ] Verify seed output shows all 12 unions created successfully
- [ ] Start backend with `npm run dev`
- [ ] Verify backend server is running on `http://localhost:5000`
- [ ] Test health check: `curl http://localhost:5000/api/health`

### Backend Output Indicators
✓ Should see: `MongoDB Connected`
✓ Should see: `✓ Seeded 12 unions successfully`
✓ Should see: `📍 Created Unions: 1. Dhankhola ... 12. Amirabari`
✓ Should see: `Server running on port 5000`

## Frontend Setup

- [ ] In new terminal, navigate to `frontend` directory: `cd frontend`
- [ ] Run `npm install` to install dependencies
- [ ] Create `.env` file with `REACT_APP_API_URL=http://localhost:5000/api`
- [ ] Start frontend with `npm start`
- [ ] Verify frontend is running on `http://localhost:3000`
- [ ] Verify no console errors in browser dev tools

### Frontend Loading Indicators
✓ Page should load without errors
✓ Should see "সমস্যা জানান" (Report Problem) in navigation
✓ Browser console should not have CORS errors
✓ Network tab should show API calls to `http://localhost:5000/api`

## Page Navigation Tests

- [ ] Visit `http://localhost:3000` - Home page loads
- [ ] Click "সমস্যা জানান" or navigate to `/report-problem`
- [ ] Verify ReportProblemPage displays correctly
- [ ] Click "সমস্যা দেখুন" or navigate to `/problems`
- [ ] Verify ProblemsPage displays correctly

## Union Selection Tests

### Visual Checks
- [ ] 12 union cards are displayed in ReportProblemPage
- [ ] Each union shows:
  - [ ] Union name in Bengali
  - [ ] Union name in English
  - [ ] Union serial number (१, २, etc.)
  - [ ] Colorful background (card styling)
- [ ] Cards are responsive (stack on mobile)

### Interaction Tests
- [ ] Click on "ধানীখোলা" (Dhankhola) card
- [ ] Selected state appears (color change, border highlight, etc.)
- [ ] Click on different union card
- [ ] Previous selection is updated to new union
- [ ] Selected union name appears in "নির্বাচিত:" section

## Form Validation Tests

### Category Selection
- [ ] All 6 categories are visible as radio buttons:
  - [ ] রাস্তা (Road)
  - [ ] স্কুল (School)
  - [ ] স্বাস্থ্য (Health)
  - [ ] পানি/নালা (Water/Drainage)
  - [ ] বিদ্যুৎ (Electricity)
  - [ ] অন্যান্য (Other)
- [ ] Only one category can be selected at a time

### Title Field
- [ ] Title field accepts input
- [ ] Character counter shows current count (e.g., "5/60")
- [ ] Character counter turns red when approaching limit
- [ ] Can't type more than 60 characters

### Description Field
- [ ] Description field accepts multi-line input
- [ ] Character counter shows current count (e.g., "0/500")
- [ ] Character counter turns red when approaching limit
- [ ] Can't type more than 500 characters

### Image Upload
- [ ] Click "ছবি যোগ করুন" (Add Images) button
- [ ] File picker opens
- [ ] Select one or more images
- [ ] Images appear as thumbnails in the preview area
- [ ] Can remove images by clicking X button

### Pre-Submission Checklist
- [ ] Before selecting union: all checkboxes appear unchecked
- [ ] After selecting union: ✓ Union checkbox becomes checked
- [ ] After selecting category: ✓ Category checkbox becomes checked
- [ ] After entering title (non-empty): ✓ Title checkbox becomes checked
- [ ] After entering description (non-empty): ✓ Description checkbox becomes checked
- [ ] When all items checked: Submit button becomes enabled and green

## Form Submission Tests

### Submit Button States
- [ ] When form incomplete: Submit button is gray and disabled
- [ ] When form complete: Submit button is green and enabled
- [ ] Submit button text: "সমস্যা জমা দিন" (Submit Problem)

### Submit Validation
- [ ] Try to submit without selecting union:
  - [ ] Error message appears: "সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন"
- [ ] Try to submit with empty title:
  - [ ] Error message appears
- [ ] Try to submit with empty description:
  - [ ] Error message appears
- [ ] Try to submit with empty category:
  - [ ] Error message appears

### Successful Submission
- [ ] Fill form completely:
  - [ ] Union: Dhankhola
  - [ ] Category: Road
  - [ ] Title: "পথে বড় গর্ত"
  - [ ] Description: "মেজর রোডে একটি বড় গর্ত আছে"
- [ ] Click submit button
- [ ] Button shows loading state (spinner or disabled)
- [ ] Success message appears: "সমস্যা সফলভাবে জমা দেওয়া হয়েছে!"
- [ ] After 2.5 seconds, automatically redirect to `/problems`
- [ ] Form resets to initial state

### Error Handling
- [ ] If backend is not running:
  - [ ] Error message appears: Network or connection error
  - [ ] Form data is not cleared
  - [ ] Submit button remains enabled to retry

## Problems Page Tests

### Initial Load
- [ ] Problems page loads with all problems
- [ ] Each problem shows as a card with:
  - [ ] Problem title
  - [ ] Union name
  - [ ] Category
  - [ ] Description excerpt
  - [ ] Status badge
  - [ ] Upvote count
  - [ ] "বিস্তারিত" (Details) button

### Filter by Union
- [ ] Union dropdown is populated with all 12 unions
- [ ] Select "ধানীখোলা" (Dhankhola) from dropdown
- [ ] Only problems from Dhankhola are displayed
- [ ] Count should match number of Dhankhola problems
- [ ] Select different union
- [ ] Problems list updates correctly
- [ ] Select "সকল" (All) or reset
- [ ] All problems are displayed again

### Filter by Category
- [ ] Category dropdown is populated with 6 categories
- [ ] Select "রাস্তা" (Road) from dropdown
- [ ] Only road-related problems are displayed
- [ ] Select different category
- [ ] Problems list updates correctly

### Combined Filtering
- [ ] Select union: Dhankhola
- [ ] Select category: Road
- [ ] Only problems from Dhankhola with Road category are shown
- [ ] Reset both filters
- [ ] All problems are displayed

### Upvoting
- [ ] Initial upvote count is displayed
- [ ] Click upvote button on a problem
- [ ] Upvote count increases by 1
- [ ] Can upvote multiple times
- [ ] Upvote persists after page refresh (if backend persistence is implemented)

### Problem Details
- [ ] Click "বিস্তারিত" (Details) button
- [ ] Modal or alert shows full problem details:
  - [ ] Full title
  - [ ] Full description
  - [ ] Union name
  - [ ] Category
  - [ ] Date submitted
  - [ ] Status

## Problem Status Tests

### New Problem Status
- [ ] Submit a new problem
- [ ] On Problems page, new problem might not immediately appear (if status is "pending")
- [ ] Admin approves problem (via admin dashboard or directly in MongoDB)
- [ ] Problem appears on Problems page after approval

### Problem Status Progression
- [ ] Verify a problem shows "pending" status (admin view)
- [ ] Admin approves it → Status changes to "approved"
- [ ] Problem becomes visible on public page
- [ ] Admin marks as "in-progress" → Status reflects the change
- [ ] Status badge color changes based on status

## Database Tests

### MongoDB Verification
- [ ] Open MongoDB Atlas or local MongoDB
- [ ] Connect to `trishal-civic` database
- [ ] Check `unions` collection:
  - [ ] 12 union documents exist
  - [ ] Each has _id, name, bengaliName, problemCount fields
- [ ] Check `problems` collection:
  - [ ] New problem document exists after submission
  - [ ] Problem has:
    - [ ] `_id`: ObjectId
    - [ ] `title`: string
    - [ ] `description`: string
    - [ ] `category`: enum value
    - [ ] `union`: ObjectId (references union)
    - [ ] `isAnonymous`: true
    - [ ] `status`: "pending"
    - [ ] `createdAt`: timestamp
    - [ ] `upvotes`: number (default 0)

### Union Problem Count
- [ ] Submit 2 problems to Dhankhola union
- [ ] Check MongoDB: `unions` → Dhankhola document
- [ ] `problemCount` should be 2
- [ ] Backend increments this automatically on each submission

## API Endpoint Tests

### Using curl or Postman

#### Test Problem Creation
```bash
curl -X POST http://localhost:5000/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Problem",
    "description": "Test Description",
    "category": "Road",
    "union": "660000000000000000000001",
    "coordinates": [90.3947568, 24.5826256],
    "images": [],
    "isAnonymous": true
  }'
```
- [ ] Returns 201 status
- [ ] Returns created problem object
- [ ] `union` references are populated with union details

#### Test Get All Problems
```bash
curl http://localhost:5000/api/problems
```
- [ ] Returns 200 status
- [ ] Returns array of problems
- [ ] Each problem has union populated with details

#### Test Get Problems by Union
```bash
curl http://localhost:5000/api/problems?union=660000000000000000000001
```
- [ ] Returns 200 status
- [ ] Only problems from that union are returned

#### Test Upvote
```bash
curl -X PUT http://localhost:5000/api/problems/{problemId}/upvote
```
- [ ] Returns 200 status
- [ ] `upvotes` count increases

## Performance Tests

- [ ] Page loads in under 3 seconds
- [ ] Form submission completes in under 5 seconds
- [ ] Filtering problems updates in under 2 seconds
- [ ] Image upload doesn't freeze the UI
- [ ] No memory leaks in browser (DevTools Memory profiler)

## Responsive Design Tests

### Desktop (1920x1080)
- [ ] All elements display correctly
- [ ] Union cards are in multi-column grid
- [ ] No horizontal scrolling

### Tablet (768x1024)
- [ ] Union cards stack appropriately
- [ ] Forms are readable and interactive
- [ ] Filters display correctly

### Mobile (375x667)
- [ ] Union cards stack in single column
- [ ] Forms are touch-friendly
- [ ] Buttons are large enough to click
- [ ] No horizontal scrolling

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## Internationalization Tests

### Bengali Text
- [ ] All Bengali text displays correctly
- [ ] No character encoding issues
- [ ] Bengali numerals display properly (१, २, etc.)

### RTL Support (if applicable)
- [ ] Text alignment is appropriate for Bengali
- [ ] Form fields support RTL input

## Security Tests

### Anonymous Submission
- [ ] Submitter's identity is not stored
- [ ] Problems list doesn't show submitter info
- [ ] Network requests don't contain user identification

### Input Validation
- [ ] XSS attempts in title are escaped
- [ ] XSS attempts in description are escaped
- [ ] Image uploads are validated (size, type)

### CORS
- [ ] Frontend can communicate with backend
- [ ] CORS headers are correctly set
- [ ] Cross-origin requests work as expected

## Edge Cases

### Empty State
- [ ] When no problems exist, display appropriate message
- [ ] When no problems match filter, show "কোন সমস্যা পাওয়া যায়নি"

### Large Data
- [ ] Form handles long titles (close to 60 char limit)
- [ ] Form handles long descriptions (close to 500 char limit)
- [ ] Form handles many images (10+ images)

### Special Characters
- [ ] Form accepts Bengali special characters
- [ ] Form accepts numbers and symbols
- [ ] Form accepts emojis (if supported)

### Network Issues
- [ ] Slow network doesn't break the app
- [ ] Offline mode shows appropriate message
- [ ] Can retry submission on network failure

## Accessibility Tests

- [ ] Form labels are properly associated with inputs
- [ ] Keyboard navigation works (Tab through form)
- [ ] Colors aren't the only way to convey status
- [ ] Error messages are clear and descriptive
- [ ] Screen reader can navigate the page (if applicable)

---

## Test Results Summary

### Date: ___________
### Tester Name: ___________
### Environment: Browser/OS ___________

### Overall Status: [ ] PASS [ ] FAIL

### Failed Tests
List any failed tests here:
1. _______________________________
2. _______________________________
3. _______________________________

### Notes
_____________________________________________________________________________
_____________________________________________________________________________

### Next Steps
- [ ] All tests passed - Ready for production
- [ ] Some tests failed - Fix required (see failed tests above)
- [ ] Needs more testing - Retest after fixes
