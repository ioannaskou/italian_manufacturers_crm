# Quick Start Guide - Italian Manufacturers CRM

Prerequisites

- Node.js v16+
- MongoDB running
- npm

---

Clone the repository

```bash
git clone https://github.com/ioannaskou/italian_manufacturers_crm.git
cd italian_manufacturers_crm
Backend

npm install
Create .env in project root:

PORT=3000
MONGO_URI=mongodb://localhost:27017/italian_manufacturers_crm
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
NODE_ENV=development
Create admin user:

node create-admin.js
Start backend:

npm run dev
Backend:
http://localhost:3000

Swagger:
http://localhost:3000/api-docs

Frontend

Open a new terminal:

cd frontend
npm install
npm start
Frontend:
http://localhost:3001

Login

Email: admin@italiancrm.com
Password: password123

Run tests

From project root:

npm test
Expected:

Test Suites: 3 passed
Tests: 21 passed

Production build

Backend:

npm run build
npm start
Frontend:

cd frontend
npm run build