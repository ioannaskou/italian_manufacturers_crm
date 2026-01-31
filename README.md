# Italian Manufacturers CRM

A full-stack Customer Relationship Management system for managing Italian clothing manufacturers and their customer relationships.

Coding Factory 8 - Final Project  
Athens University of Economics and Business

---

## Project Overview

This project demonstrates a complete full-stack application with:

- Domain-Driven Design with 6 domain models
- Layered architecture (Models, Services, Controllers, Routes)
- REST API with Express.js and TypeScript
- React frontend with TypeScript
- JWT Authentication and Role-Based Authorization
- Unit and Integration Testing with Jest
- Swagger API Documentation
- MongoDB with Mongoose ODM

---

## Technology Stack

Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose ODM
- JWT Authentication
- bcryptjs
- Swagger
- Jest and Supertest

Frontend
- React 18
- TypeScript
- React Router v6
- Axios
- Pico CSS

---

## Architecture

Domain-Driven Design with the following entities:

1. User
2. Customer
3. Manufacturer
4. ProductCategory
5. CustomerManufacturer
6. ManufacturerProductCategory

Layered Architecture:

Models  
Services  
Controllers  
Routes  
Middlewares  

---

## Installation and Setup

### Prerequisites

- Node.js v16 or higher
- MongoDB v6 or higher
- npm

---

## Backend Setup

All commands are executed from the project root directory.

Install dependencies:

```bash
npm install
Create a .env file in the project root:

PORT=3000
MONGO_URI=mongodb://localhost:27017/italian_manufacturers_crm
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
NODE_ENV=development
Create admin user:

node create-admin.js
Start backend:

npm run dev
Backend API:
http://localhost:3000

Swagger:
http://localhost:3000/api-docs

Frontend Setup
cd frontend
npm install
npm start
Frontend:
http://localhost:3001

Default Credentials
Email: admin@italiancrm.com
Password: password123

Testing
From the project root:

npm test
Results:

Test Suites: 3 passed
Tests: 21 passed

API Documentation
Swagger UI:
http://localhost:3000/api-docs

Main Endpoints
Authentication
POST /api/auth/login

Users (Admin only)

GET /api/users
POST /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

Manufacturers

GET /api/manufacturers
POST /api/manufacturers
GET /api/manufacturers/:id
PUT /api/manufacturers/:id
DELETE /api/manufacturers/:id

Customers

GET /api/customers
POST /api/customers
GET /api/customers/:id
PUT /api/customers/:id
DELETE /api/customers/:id

Product Categories

GET /api/product-categories
POST /api/product-categories
GET /api/product-categories/:id
PUT /api/product-categories/:id
DELETE /api/product-categories/:id

Relationships

GET /api/customer-manufacturers
POST /api/customer-manufacturers
PUT /api/customer-manufacturers/:id
DELETE /api/customer-manufacturers/:id

User Roles
Admin

Full access

User management

Full CRUD access

Sales

Read access to manufacturers

Full customer management

Relationship management

Build and Deployment
Backend build:

npm run build
npm start
Frontend build:

cd frontend
npm run build
The production frontend build is created in:

frontend/build
Author
Ioanna Skoura
Coding Factory 8
Athens University of Economics and Business
January 2026

