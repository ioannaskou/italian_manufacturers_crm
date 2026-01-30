import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ICustomer } from '../types';
import Navbar from '../components/Navbar';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to fetch customers.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/customers/${id}`);
      setDeleteConfirm(null);
      fetchCustomers();
    } catch (err) {
      setError('Failed to delete customer.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Customers</h2>
        <button onClick={() => navigate('/customers/new')}>Add Customer</button>
      </div>
      {error && <p style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Assigned Sales Rep</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                  <td>{c.email}</td>
                  <td>{c.address.city}</td>
                  <td>{c.assignedSalesRep?.email || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/customers/edit/${c._id}`)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="secondary"
                      onClick={() => setDeleteConfirm(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>

      {deleteConfirm && (
        <dialog open>
          <article>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this customer?</p>
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

export default CustomersPage;