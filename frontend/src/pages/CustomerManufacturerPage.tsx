import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { ICustomerManufacturer, ICustomer, Manufacturer } from '../types';
import Navbar from '../components/Navbar';

const CustomerManufacturerPage: React.FC = () => {
  const [relations, setRelations] = useState<ICustomerManufacturer[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [rels, custs, manufs] = await Promise.all([
        api.get('/customer-manufacturers'),
        api.get('/customers'),
        api.get('/manufacturers'),
      ]);
      setRelations(rels.data);
      setCustomers(custs.data);
      setManufacturers(manufs.data);
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
    if (!selectedCustomer || !selectedManufacturer) {
      setError('Please select both a customer and a manufacturer.');
      return;
    }
    try {
      await api.post('/customer-manufacturers', { 
        customer: selectedCustomer, 
        manufacturer: selectedManufacturer,
        relationshipStatus: 'active'
      });
      setSuccess('Relationship added successfully!');
      setSelectedCustomer('');
      setSelectedManufacturer('');
      fetchData();
    } catch (err) {
      setError('Failed to add relationship.');
    }
  };

  const handleDeleteRelation = async (id: string) => {
    try {
      await api.delete(`/customer-manufacturers/${id}`);
      setSuccess('Relationship deleted successfully!');
      fetchData();
    } catch (err) {
      setError('Failed to delete relationship.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <h2>Customer-Manufacturer Relations</h2>

      <article>
        <form onSubmit={handleAddRelation}>
          <h3>Add New Relationship</h3>
          <div className="grid">
            <label>
              Customer
              <select value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required>
                <option value="">Select Customer</option>
                {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </label>
            <label>
              Manufacturer
              <select value={selectedManufacturer} onChange={(e) => setSelectedManufacturer(e.target.value)} required>
                <option value="">Select Manufacturer</option>
                {manufacturers.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
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
              <th scope="col">Customer</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {relations.length > 0 ? (
              relations.map((rel) => (
                <tr key={rel._id}>
                  <td>{rel.customer.name}</td>
                  <td>{rel.manufacturer.name}</td>
                  <td>
                    <button className="contrast" onClick={() => handleDeleteRelation(rel._id)}>Delete</button>
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

export default CustomerManufacturerPage;