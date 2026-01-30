import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { IProductCategory } from '../types';
import Navbar from '../components/Navbar';

const EditProductCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductCategory = async () => {
      try {
        const response = await api.get<IProductCategory>(`/product-categories/${id}`);
        const category = response.data;
        setName(category.name);
        setDescription(category.description || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to load product category data.');
        setLoading(false);
      }
    };
    fetchProductCategory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const updatedCategory = {
      name,
      description,
    };

    try {
      await api.put(`/product-categories/${id}`, updatedCategory);
      setSuccess('Product category updated successfully! Redirecting...');
      setTimeout(() => navigate('/product-categories'), 2000);
    } catch (err) {
      setError('Failed to update product category. Please check your input and try again.');
    }
  };

  if (loading) {
    return (
      <main className="container">
        <Navbar />
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <Navbar />
      <hgroup>
        <h2>Edit Product Category</h2>
        <h3>Update the product category information.</h3>
      </hgroup>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        
        {error && <p role="alert" style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
        {success && <p role="alert" style={{ color: 'var(--pico-color-green-500)' }}>{success}</p>}

        <div className="grid">
          <button type="submit">Update</button>
          <button type="button" className="secondary" onClick={() => navigate('/product-categories')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default EditProductCategoryPage;