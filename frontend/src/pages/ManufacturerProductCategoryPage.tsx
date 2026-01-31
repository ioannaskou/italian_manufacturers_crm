import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { IManufacturerProductCategory, Manufacturer, IProductCategory } from '../types';
import Navbar from '../components/Navbar';

const ManufacturerProductCategoryPage: React.FC = () => {
  const [relations, setRelations] = useState<IManufacturerProductCategory[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [categories, setCategories] = useState<IProductCategory[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [rels, manufs, cats] = await Promise.all([
        api.get('/manufacturer-product-categories'),
        api.get('/manufacturers'),
        api.get('/product-categories'),
      ]);
      setRelations(rels.data);
      setManufacturers(manufs.data);
      setCategories(cats.data);
    } catch (err) {
      setError('Failed to fetch data.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddRelation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!selectedManufacturer || !selectedCategory) {
      setError('Please select both a manufacturer and a product category.');
      return;
    }
    try {
      await api.post('/manufacturer-product-categories', { manufacturer: selectedManufacturer, productCategory: selectedCategory });
      setSuccess('Relationship added successfully!');
      setSelectedManufacturer('');
      setSelectedCategory('');
      fetchData();
    } catch (err) {
      setError('Failed to add relationship.');
    }
  };

  const handleDeleteRelation = async (manufacturerId: string, productCategoryId: string) => {
  try {
    await api.delete(
      `/manufacturer-product-categories/${manufacturerId}/${productCategoryId}`
    );
    setSuccess('Relationship deleted successfully!');
    setError(null);
    fetchData();
  } catch (err) {
    setError('Failed to delete relationship.');
    setSuccess(null);
  }
};


  return (
    <main className="container">
      <Navbar />
      <h2>Manufacturer-Product Category Relations</h2>

      <article>
        <form onSubmit={handleAddRelation}>
          <h3>Add New Relationship</h3>
          <div className="grid">
            <label>
              Manufacturer
              <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)} required>
                <option value="">Select Manufacturer</option>
                {manufacturers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
            </label>
            <label>
              Product Category
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </label>
          </div>
          <button type="submit">Add Relationship</button>
        </form>
        {error && <p role="alert" style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
        {success && <p role="alert" style={{ color: 'var(--pico-color-green-500)' }}>{success}</p>}
      </article>

      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">Manufacturer</th>
              <th scope="col">Product Category</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {relations.length > 0 ? (
              relations.map((rel) => (
                <tr key={rel._id}>
                  <td>{rel.manufacturer.name}</td>
                  <td>{rel.productCategory.name}</td>
                  <td>
                    <button
  className="contrast"
  onClick={() =>
    handleDeleteRelation(rel.manufacturer._id, rel.productCategory._id)
  }
>
  Delete
</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No relationships found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>
    </main>
  );
};

export default ManufacturerProductCategoryPage;