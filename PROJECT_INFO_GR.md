# Italian Manufacturers CRM - Πληροφορίες Έργου

## Τελική Εργασία - Coding Factory 8
**Πανεπιστήμιο Οικονομικών & Επιχειρηματικών Επιστημών Αθηνών**

---

## 📋 Περιγραφή

Σύστημα Διαχείρισης Πελατειακών Σχέσεων (CRM) για τη διαχείριση Ιταλών κατασκευαστών ενδυμάτων, πελατών και των επιχειρηματικών τους σχέσεων.

---

## ✅ Απαιτήσεις Εργασίας (Checklist)

### Domain Model με Domain-Driven Design ✅
- **User** - Χρήστες συστήματος με ρόλους (Admin, Sales, Viewer)
- **Customer** - Πελάτες (εταιρείες ή ιδιώτες)
- **Manufacturer** - Ιταλοί κατασκευαστές ενδυμάτων
- **ProductCategory** - Κατηγορίες προϊόντων
- **CustomerManufacturer** - Σχέση πελάτη-κατασκευαστή
- **ManufacturerProductCategory** - Σχέση κατασκευαστή-κατηγορίας

### Model-First Approach ✅
Η βάση δεδομένων δημιουργείται από τα Mongoose models (schemas)

### Layered Architecture ✅
```
Models (Domain Layer)
   ↓
Services (Business Logic)
   ↓
Controllers (API Handlers)
   ↓
Routes (Routing Layer)
```

### REST API ✅
- Express.js με TypeScript
- Πλήρης CRUD λειτουργικότητα
- JWT Authentication
- Role-Based Authorization
- Swagger documentation

### Frontend με React ή Angular ✅
- React 18 με TypeScript
- React Router v6
- Protected routes με authentication
- Pico CSS για styling

### Authentication & Authorization ✅
**Backend:**
- JWT tokens
- bcryptjs για password hashing
- protect middleware
- authorize middleware για roles

**Frontend:**
- AuthContext
- Protected routes
- Token storage
- Auto-logout

### Testing ✅
```
Test Suites: 3 passed, 3 total
Tests:       21 passed, 21 total
```

Τεστ για:
- Customer CRUD operations
- Manufacturer CRUD operations
- ProductCategory CRUD operations

### API Documentation ✅
Swagger UI διαθέσιμο στο: `http://localhost:3000/api-docs`

---

## 🗃️ Δομή Βάσης Δεδομένων

### MongoDB Collections

#### users
- email (unique)
- passwordHash
- role (Admin/Sales/Viewer)
- firstName
- lastName
- status (active/inactive)

#### manufacturers
- name
- vatNumber
- address (street, city, postalCode, country)
- contactPersonName
- contactEmail
- contactPhone
- notes

#### customers
- type (company/individual)
- name
- vatNumber
- email
- phone
- address (street, city, postalCode, country)
- notes
- assignedSalesRep (reference σε User)

#### product_categories
- name (unique)
- description

#### customer_manufacturers (Σχέσεις)
- customer (reference)
- manufacturer (reference)
- relationshipStatus (lead/active/inactive)
- notes

#### manufacturer_product_categories (Σχέσεις)
- manufacturer (reference)
- productCategory (reference)

---

## 🛠️ Τεχνολογίες

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Γλώσσα:** TypeScript
- **Database:** MongoDB + Mongoose ODM
- **Auth:** JSON Web Tokens (JWT)
- **Password:** bcryptjs
- **Testing:** Jest + Supertest
- **Docs:** Swagger

### Frontend
- **Framework:** React 18
- **Γλώσσα:** TypeScript
- **Routing:** React Router v6
- **HTTP:** Axios
- **Styling:** Pico CSS

---

## 📦 Εγκατάσταση & Εκτέλεση

### Προαπαιτούμενα
- Node.js v16+
- MongoDB v6+
- npm

### Backend

1. Εγκατάσταση dependencies:
```bash
cd src
npm install
```

2. Δημιουργία .env αρχείου:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/italian_manufacturers_crm
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
NODE_ENV=development
```

3. Δημιουργία admin χρήστη:
```bash
node create-admin.js
```

4. Εκκίνηση server:
```bash
npm run dev
```

### Frontend

1. Εγκατάσταση dependencies:
```bash
cd frontend
npm install
```

2. Εκκίνηση:
```bash
npm start
```

### Πρόσβαση
- Backend API: `http://localhost:3000`
- Frontend: `http://localhost:3001`
- Swagger Docs: `http://localhost:3000/api-docs`

### Default Login
- Email: `admin@italiancrm.com`
- Password: `password123`

---

## 🧪 Εκτέλεση Tests

```bash
cd src
npm test
```

**Αποτελέσματα:**
- 3 test suites (customer, manufacturer, productCategory)
- 21 tests συνολικά
- Όλα περνούν επιτυχώς ✅

---

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/login         - Σύνδεση χρήστη
```

### Users (Admin only)
```
GET    /api/users              - Λήψη όλων των χρηστών
POST   /api/users              - Δημιουργία χρήστη
GET    /api/users/:id          - Λήψη χρήστη
PUT    /api/users/:id          - Ενημέρωση χρήστη
DELETE /api/users/:id          - Διαγραφή χρήστη
```

### Manufacturers
```
GET    /api/manufacturers      - Λήψη όλων (Admin, Sales)
POST   /api/manufacturers      - Δημιουργία (Admin)
GET    /api/manufacturers/:id  - Λήψη (όλοι)
PUT    /api/manufacturers/:id  - Ενημέρωση (Admin)
DELETE /api/manufacturers/:id  - Διαγραφή (Admin)
```

### Customers
```
GET    /api/customers          - Λήψη όλων (Admin, Sales)
POST   /api/customers          - Δημιουργία (Admin, Sales)
GET    /api/customers/:id      - Λήψη (όλοι)
PUT    /api/customers/:id      - Ενημέρωση (Admin, Sales)
DELETE /api/customers/:id      - Διαγραφή (Admin, Sales)
```

### Product Categories
```
GET    /api/product-categories     - Λήψη όλων
POST   /api/product-categories     - Δημιουργία (Admin)
GET    /api/product-categories/:id - Λήψη
PUT    /api/product-categories/:id - Ενημέρωση (Admin)
DELETE /api/product-categories/:id - Διαγραφή (Admin)
```

### Relationships
```
GET    /api/customer-manufacturers        - Λήψη σχέσεων
POST   /api/customer-manufacturers        - Δημιουργία σχέσης
PUT    /api/customer-manufacturers/:id    - Ενημέρωση σχέσης
DELETE /api/customer-manufacturers/:id    - Διαγραφή σχέσης
```

---

## 🔒 Ρόλοι & Δικαιώματα

### Admin
- Πλήρης πρόσβαση σε όλες τις λειτουργίες
- Δημιουργία/επεξεργασία/διαγραφή users
- Δημιουργία/επεξεργασία/διαγραφή manufacturers
- Διαχείριση όλων των πόρων

### Sales
- Προβολή manufacturers
- Δημιουργία/επεξεργασία customers
- Διαχείριση customer-manufacturer σχέσεων

### Viewer
- Μόνο ανάγνωση (read-only)

---

## 📁 Δομή Project

```
italian-manufacturers-crm/
│   ├── src/
│   │   ├── config/           # Swagger config
│   │   ├── controllers/      # API handlers
│   │   ├── middlewares/      # Auth/Authorization
│   │   ├── models/           # Mongoose models (6)
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── tests/            # Jest tests
│   │   └── server.ts         # Entry point
│   ├── .env                  # Περιβαλλοντικές μεταβλητές
│   ├── jest.config.cjs       # Jest configuration
│   ├── package.json
│   ├── tsconfig.json
│   └── create-admin.js       # Admin creation script
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # Navbar, ProtectedRoute
│   │   ├── context/          # AuthContext
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client
│   │   ├── types/            # TypeScript types
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── README.md
├── PROJECT_INFO_GR.md        # Αυτό το αρχείο
└── Italian_Manufacturers_CRM.postman_collection.json
```

---

## 🚀 Build για Production

### Backend
```bash
cd src
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Το build θα δημιουργηθεί στο `frontend/build/`

---

## 📝 Postman Collection

Το αρχείο `Italian_Manufacturers_CRM.postman_collection.json` περιέχει:
- Όλα τα endpoints
- Pre-configured requests
- Auto-save JWT token μετά το login
- Organized σε folders

---

## ✅ Checklist Παράδοσης

✅ GitHub repository με πλήρη κώδικα  
✅ README.md με οδηγίες εγκατάστασης  
✅ Domain Model με DDD (6 entities)  
✅ Layered Architecture (Models/Services/Controllers/Routes)  
✅ REST API με TypeScript  
✅ React Frontend με TypeScript  
✅ Authentication με JWT  
✅ Authorization με Roles (3 ρόλοι)  
✅ Tests με Jest (21 tests passing)  
✅ Swagger Documentation  
✅ Postman Collection  
✅ .env.example  
✅ .gitignore  

---

## 👨‍💻 Στοιχεία Φοιτήτριας

**Ονοματεπώνυμο:** Ιωάννα Σκουραδάκη  
**Πρόγραμμα:** Coding Factory 8  
**Ίδρυμα:** AUEB  
**Ημερομηνία Υποβολής:** 18 Ιανουαρίου 2026

---

## 📧 Επικοινωνία

Για ερωτήσεις σχετικά με το project, επικοινωνήστε μέσω της πλατφόρμας του μαθήματος.

---

**Σημείωση:** Το project αυτό επιδεικνύει κατανόηση των εξής:
- Full-stack development
- Domain-Driven Design αρχές
- Layered Architecture
- RESTful API σχεδιασμός
- Authentication & Authorization
- Database σχεδιασμός με MongoDB
- Testing με Jest
- Modern frontend development με React
- TypeScript best practices
