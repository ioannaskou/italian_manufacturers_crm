# Italian Manufacturers CRM

A full-stack CRM system for managing Italian clothing manufacturers and their customer relationships.

Coding Factory 8 - Final Project  
Athens University of Economics and Business

---

## Project Overview

Full-stack application demonstrating:
- Domain-Driven Design with 6 domain models
- Layered architecture
- REST API with TypeScript
- React frontend
- JWT Authentication & Authorization
- Jest testing (21 tests passing)
- Swagger documentation

---

## Technology Stack

Backend: Node.js, Express, TypeScript, MongoDB, JWT, Jest  
Frontend: React 18, TypeScript, React Router, Axios, Pico CSS

---

## Quick Start

### Backend (from project root)

```bash
npm install
# Create .env file (see below)
node create-admin.js
npm run dev

### Frontend
```bash
cd frontend
npm install
npm start
```

### Environment Variables (.env)
Create `backend/.env`:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/italian_manufacturers_crm
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
NODE_ENV=development
```

### Default Login
- Email: `admin@italiancrm.com`
- Password: `password123`

---

## Testing

```bash
cd src
npm test
```

**Results:**
```
Test Suites: 3 passed, 3 total
Tests:       21 passed, 21 total
```

---

##  API Documentation

Swagger UI: `http://localhost:3000/api-docs`

### Main Endpoints

**Auth:**
- `POST /api/auth/login`

**Manufacturers:**
- `GET /api/manufacturers`
- `POST /api/manufacturers` (Admin)
- `PUT /api/manufacturers/:id` (Admin)
- `DELETE /api/manufacturers/:id` (Admin)

**Customers:**
- `GET /api/customers`
- `POST /api/customers` (Admin, Sales)
- `PUT /api/customers/:id` (Admin, Sales)
- `DELETE /api/customers/:id` (Admin, Sales)

**Product Categories:**
- `GET /api/product-categories`
- `POST /api/product-categories` (Admin)

**Relationships:**
- `GET /api/customer-manufacturers`
- `POST /api/customer-manufacturers`

---

##  Architecture

### Domain Models (6 entities)
1. User
2. Customer
3. Manufacturer
4. ProductCategory
5. CustomerManufacturer
6. ManufacturerProductCategory

### Layers
```
Models → Services → Controllers → Routes
```

---

## User Roles

- **Admin** - Full access
- **Sales** - Customer & relationship management
- **Viewer** - Read-only

---

## Project Structure

```
italian_manufacturers_crm/
├── src/
│   ├── models/
│   ├── services/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── tests/
│   └── server.ts
├── frontend/
│   └── ...
├── postman/
│   └── Italian Manufacturers CRM.postman_collection.json
├── create-admin.js
├── jest.config.cjs
├── package.json
├── tsconfig.json
└── README.md

```

---

## Requirements Checklist

- Domain Model με DDD (6 models)  
- Model-First Approach  
- Layered Architecture  
- REST API με Express + TypeScript  
- React Frontend με TypeScript  
- Authentication με JWT  
- Authorization με Roles  
- Unit & Integration Tests (Jest)  
- Swagger API Documentation  
- Complete README  
- Postman Collection  
- .gitignore  

---

## Author

**Ioanna Skoura**  
Coding Factory 8  
Athens University of Economics and Business  
January 2026

---

## Support

For issues or questions about this project, please refer to the documentation or contact the instructor.
