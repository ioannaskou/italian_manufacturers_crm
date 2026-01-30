import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

const AddProductCategoryPage: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await api.post('/product-categories', { name, description });
      setSuccess('Product category created successfully! Redirecting...');
      setTimeout(() => navigate('/product-categories'), 2000);
    } catch (err) {
      setError('Failed to create product category. Please check your input.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <h2>Add New Product Category</h2>
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
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={() => navigate('/product-categories')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default AddProductCategoryPage;
