# Quick Start Guide - Italian Manufacturers CRM

Get the project running in 5 minutes!

---

##  Prerequisites Check

Before starting, make sure you have:
- [ ] Node.js v16+ installed (`node --version`)
- [ ] MongoDB installed and running
- [ ] npm installed (`npm --version`)
- [ ] Git installed (for cloning)

---

##  Step 1: Get the Code

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/italian-manufacturers-crm.git

# Navigate to project
cd italian-manufacturers-crm
```

---

##  Step 2: Backend Setup

```bash
# Go to backend folder
cd src

# Install dependencies
npm install

# Create .env file
echo "PORT=3000
MONGO_URI=mongodb://localhost:27017/italian_manufacturers_crm
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
NODE_ENV=development" > .env

# Create admin user
node create-admin.js

# Start backend server
npm run dev
```

**Backend should now be running at:** `http://localhost:3000`  
**Swagger docs at:** `http://localhost:3000/api-docs`

---

## Step 3: Frontend Setup

Open a **NEW terminal window** and:

```bash
# Go to frontend folder (from project root)
cd frontend

# Install dependencies
npm install

# Start frontend
npm start
```

**Frontend should now be running at:** `http://localhost:3001`

---

##  Step 4: Test It!

### Login
1. Open browser to `http://localhost:3001`
2. Login with:
   - Email: `admin@italiancrm.com`
   - Password: `password123`

### Run Tests
```bash
# In backend folder
npm test
```

Expected output:
```
Test Suites: 3 passed, 3 total
Tests:       21 passed, 21 total
```

---

## Common Issues & Solutions

### MongoDB not running
**Error:** `MongooseServerSelectionError`  
**Solution:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Start MongoDB service from Services panel
```

### Port 3000 already in use
**Error:** `EADDRINUSE: address already in use`  
**Solution:** Change PORT in `.env` to 3001 or kill the process using port 3000

### npm install fails
**Solution:** 
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## What's Next?

### Explore the API
- Open Swagger UI: `http://localhost:3000/api-docs`
- Try different endpoints
- Import Postman collection for easier testing

### Explore the Frontend
- Create manufacturers
- Add customers
- Create relationships
- Test different user roles (create new users via Swagger)

### Read the Docs
- See `README.md` for full documentation
- See `PROJECT_INFO_GR.md` for Greek documentation

---

## 🧪 Quick Testing

### Create a Manufacturer
```bash
curl -X POST http://localhost:3000/api/manufacturers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Milano Fashion House",
    "contactPersonName": "Giovanni Rossi",
    "contactEmail": "info@milano.it",
    "contactPhone": "+39 02 1234567",
    "address": {
      "street": "Via Roma 123",
      "city": "Milano",
      "postalCode": "20100",
      "country": "Italy"
    }
  }'
```

(Get YOUR_TOKEN from login response)

---

## 📦 Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Backend
```bash
cd src
npm run build
npm start
```

---

## Need Help?

1. Check `README.md` for detailed documentation
2. Check Swagger docs at `http://localhost:3000/api-docs`
3. Run tests to verify everything works: `npm test`
4. Check console for error messages

---

##  Success Checklist

- [ ] MongoDB is running
- [ ] Backend server started successfully (port 3000)
- [ ] Frontend started successfully (port 3001)
- [ ] Can login with admin credentials
- [ ] All tests passing (21/21)
- [ ] Can access Swagger docs

---

**You're all set!** 

The application is now running and ready for use/development.
