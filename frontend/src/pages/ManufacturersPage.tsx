import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Manufacturer } from '../types';
import Navbar from '../components/Navbar';

const ManufacturersPage: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchManufacturers = async () => {
    try {
      const response = await api.get('/manufacturers');
      setManufacturers(response.data);
    } catch (err) {
      setError('Failed to fetch manufacturers.');
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/manufacturers/${id}`);
      setDeleteConfirm(null);
      fetchManufacturers();
    } catch (err) {
      setError('Failed to delete manufacturer.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Manufacturers</h2>
        <button onClick={() => navigate('/manufacturers/new')}>Add Manufacturer</button>
      </div>
      {error && <p style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
      <figure>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">City</th>
              <th scope="col">Contact Person</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.length > 0 ? (
              manufacturers.map((m) => (
                <tr key={m._id}>
                  <td>{m.name || 'N/A'}</td>
                  <td>{m.address?.city || 'N/A'}</td>
                  <td>{m.contactPersonName || 'N/A'}</td>
                  <td>{m.contactEmail || 'N/A'}</td>
                  <td>{m.contactPhone || 'N/A'}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/manufacturers/edit/${m._id}`)}
                      style={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      className="secondary"
                      onClick={() => setDeleteConfirm(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No manufacturers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>

      {deleteConfirm && (
        <dialog open>
          <article>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this manufacturer?</p>
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

export default ManufacturersPage;
