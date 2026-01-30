import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ManufacturersPage from './pages/ManufacturersPage';
import AddManufacturerPage from './pages/AddManufacturerPage';
import EditManufacturerPage from './pages/EditManufacturerPage';
import CustomersPage from './pages/CustomersPage';
import AddCustomerPage from './pages/AddCustomerPage';
import EditCustomerPage from './pages/EditCustomerPage';
import ProductCategoriesPage from './pages/ProductCategoriesPage';
import AddProductCategoryPage from './pages/AddProductCategoryPage';
import EditProductCategoryPage from './pages/EditProductCategoryPage';
import CustomerManufacturerPage from './pages/CustomerManufacturerPage';
import ManufacturerProductCategoryPage from './pages/ManufacturerProductCategoryPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/manufacturers" element={<ManufacturersPage />} />
            <Route path="/manufacturers/new" element={<AddManufacturerPage />} />
            <Route path="/manufacturers/edit/:id" element={<EditManufacturerPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<AddCustomerPage />} />
            <Route path="/customers/edit/:id" element={<EditCustomerPage />} />
            <Route path="/product-categories" element={<ProductCategoriesPage />} />
            <Route path="/product-categories/new" element={<AddProductCategoryPage />} />
            <Route path="/product-categories/edit/:id" element={<EditProductCategoryPage />} />
            <Route path="/customer-manufacturer-relations" element={<CustomerManufacturerPage />} />
            <Route path="/manufacturer-product-category-relations" element={<ManufacturerProductCategoryPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/manufacturers" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;