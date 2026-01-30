import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { IProductCategory } from '../types';
import Navbar from '../components/Navbar';

const ProductCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await api.get('/product-categories');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch product categories.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/product-categories/${id}`);
      setDeleteConfirm(null);
      fetchCategories();
    } catch (err) {
      setError('Failed to delete product category.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Product Categories</h2>
        <button onClick={() => navigate('/product-categories/new')}>Add Category</button>
      </div>
      {error && <p style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat.name}</td>
                  <td>{cat.description || ''}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/product-categories/edit/${cat._id}`)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="secondary"
                      onClick={() => setDeleteConfirm(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No product categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>

      {deleteConfirm && (
        <dialog open>
          <article>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product category?</p>
            <footer>
              <button className="secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </footer>
          </article>
        </dialog>
      )}
    </main>
  );
};

export default ProductCategoriesPage;