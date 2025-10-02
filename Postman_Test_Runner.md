# 🚀 JainConnect Postman Collection & Test Runner Guide

## 📁 Files Created:
1. `JainConnect_Postman_Collection.json` - Complete API collection
2. `JainConnect_Environment.json` - Environment variables
3. `Postman_Test_Runner.md` - This guide

## 🔧 Setup Instructions:

### 1. Import Collection in Postman:
1. Open Postman
2. Click "Import" button
3. Select `JainConnect_Postman_Collection.json`
4. Collection will be imported with all APIs

### 2. Import Environment:
1. Click on "Environments" tab in Postman
2. Click "Import" 
3. Select `JainConnect_Environment.json`
4. Set this environment as active

### 3. Update Base URL:
- In environment variables, change `baseUrl` from `http://localhost:5000` to your server URL if different

## 🎯 Automated Testing Features:

### ✅ Auto Variable Management:
- **User ID**: Automatically captured after user registration
- **User Email**: Automatically set and used across requests
- **Event ID**: Auto-captured after event creation
- **Tithi ID**: Auto-captured after tithi creation  
- **Maharaj ID**: Auto-captured after maharaj creation

### ✅ Built-in Test Scripts:
- Response time validation (< 2000ms)
- Status code validation
- Response structure validation
- Content-type validation
- Data integrity checks

### ✅ Smart Request Flow:
1. **Register User** → Stores `userId` and `userEmail`
2. **Login User** → Uses stored `userEmail`
3. **Get User by ID** → Uses stored `userId`
4. **Update Profile** → Uses stored `userEmail`
5. Similar flow for Events, Tithis, and Maharajs

## 🏃‍♂️ How to Run Tests:

### Option 1: Manual Testing
1. Select "JainConnect API Collection"
2. Run requests one by one
3. Check test results in "Test Results" tab

### Option 2: Automated Collection Run
1. Click on collection name
2. Click "Run collection" button
3. Select all requests or specific folder
4. Click "Run JainConnect API Collection"
5. View detailed test report

### Option 3: Command Line (Newman)
```bash
# Install Newman
npm install -g newman

# Run collection
newman run JainConnect_Postman_Collection.json -e JainConnect_Environment.json

# Run with detailed report
newman run JainConnect_Postman_Collection.json -e JainConnect_Environment.json --reporters html --reporter-html-export report.html
```

## 📊 Test Scenarios Covered:

### 👤 User APIs:
- ✅ User Registration with validation
- ✅ User Login with email
- ✅ Get all users
- ✅ Get user by ID (auto-uses registered user ID)
- ✅ Get user by email (auto-uses registered email)
- ✅ Update user profile
- ✅ Delete user

### 🎉 Event APIs:
- ✅ Create event with validation
- ✅ Get all events
- ✅ Update event (auto-uses created event ID)
- ✅ Delete event (auto-uses created event ID)

### 📅 Tithi APIs:
- ✅ Create tithi with validation
- ✅ Get all tithis
- ✅ Update tithi (auto-uses created tithi ID)
- ✅ Delete tithi (auto-uses created tithi ID)

### 🙏 Maharaj APIs:
- ✅ Create maharaj with validation
- ✅ Get all maharajs
- ✅ Get maharaj by ID (auto-uses created maharaj ID)
- ✅ Update maharaj (auto-uses created maharaj ID)
- ✅ Delete maharaj (auto-uses created maharaj ID)

## 🔍 Test Validations:

### Global Tests (Run on every request):
- Response time < 2000ms
- Content-Type is application/json
- Status code validation

### Specific Tests:
- **Registration**: Validates user object structure, stores user data
- **Login**: Validates login success message
- **CRUD Operations**: Validates data integrity and proper responses
- **Error Handling**: Validates proper error messages

## 📝 Sample Test Data:

### User Data:
```json
{
  "name": "Test User",
  "email": "test@jainconnect.com",
  "phone": "+919876543210",
  "location": "Mumbai",
  "dob": "1990-01-01",
  "gender": "Male"
}
```

### Event Data:
```json
{
  "title": "Jain Festival 2024",
  "city": "Mumbai", 
  "date": "2024-12-25",
  "time": "10:00 AM",
  "description": "Annual Jain community celebration"
}
```

### Tithi Data:
```json
{
  "tithi": "Ekadashi",
  "date": "2024-12-15",
  "description": "Fasting day for spiritual purification",
  "city": "Mumbai"
}
```

### Maharaj Data:
```json
{
  "name": "Acharya Shri Hemchandracharya",
  "title": "Acharya",
  "city": "Mumbai",
  "date": "2024-12-20",
  "contactInfo": "+919876543210"
}
```

## 🎯 Pro Tips:

### 1. Sequential Testing:
Run requests in this order for best results:
1. Health Check
2. Register User
3. Login User  
4. Create Event/Tithi/Maharaj
5. Get All operations
6. Update operations
7. Delete operations

### 2. Environment Switching:
- Create separate environments for:
  - Development (`http://localhost:5000`)
  - Staging (`https://staging.jainconnect.com`)
  - Production (`https://api.jainconnect.com`)

### 3. Batch Testing:
- Use "Run collection" to test all APIs at once
- Check the test report for any failures
- Fix issues and re-run

### 4. Custom Variables:
You can add more variables in environment:
- `adminEmail` for admin operations
- `testImageUrl` for image upload tests
- `mongoUri` for database connection tests

## 🚨 Troubleshooting:

### Common Issues:
1. **Server not running**: Make sure your server is running on port 5000
2. **MongoDB not connected**: Check your MongoDB connection
3. **Variables not set**: Check if environment is selected
4. **Test failures**: Check server logs for detailed errors

### Debug Steps:
1. Check Postman Console for detailed logs
2. Verify environment variables are set correctly
3. Check server logs for API errors
4. Validate request body format

## 🎉 Success Indicators:

When everything works correctly, you should see:
- ✅ All tests passing (green checkmarks)
- 📊 Response times under 2000ms
- 🔄 Variables automatically populated
- 📝 Proper test reports generated

Happy Testing! 🚀
