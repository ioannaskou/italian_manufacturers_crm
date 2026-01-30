import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { IUser } from '../types';
import Navbar from '../components/Navbar';

const AddCustomerPage: React.FC = () => {
  const [type, setType] = useState<'company' | 'individual'>('company');
  const [name, setName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedSalesRep, setAssignedSalesRep] = useState('');
  const [salesReps, setSalesReps] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalesReps = async () => {
      try {
        const response = await api.get('/users');
        setSalesReps(response.data);
      } catch (err) {
        console.error('Failed to fetch sales reps');
      }
    };
    fetchSalesReps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const newCustomer: any = {
      type,
      name,
      vatNumber,
      email,
      phone,
      address: { street, city, postalCode, country },
      notes,
    };

    if (assignedSalesRep) {
      newCustomer.assignedSalesRep = assignedSalesRep;
    }

    try {
      await api.post('/customers', newCustomer);
      setSuccess('Customer created successfully! Redirecting...');
      setTimeout(() => navigate('/customers'), 2000);
    } catch (err) {
      setError('Failed to create customer. Please check your input and try again.');
    }
  };

  return (
    <main className="container">
      <Navbar />
      <h2>Add New Customer</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid">
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value as 'company' | 'individual')} required>
              <option value="company">Company</option>
              <option value="individual">Individual</option>
            </select>
          </label>
          <label>
            Name
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>

        <div className="grid">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            VAT Number
            <input type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
          </label>
        </div>

        <label>
          Street
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
        </label>

        <div className="grid">
          <label>
            City
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </label>
          <label>
            Postal Code
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          </label>
          <label>
            Country
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </label>
        </div>

        <label>
          Assigned Sales Rep (Optional)
          <select value={assignedSalesRep} onChange={(e) => setAssignedSalesRep(e.target.value)}>
            <option value="">None</option>
            {salesReps.map((rep) => (
              <option key={rep._id} value={rep._id}>
                {rep.email} ({rep.role})
              </option>
            ))}
          </select>
        </label>

        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>

        {error && <p role="alert" style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
        {success && <p role="alert" style={{ color: 'var(--pico-color-green-500)' }}>{success}</p>}

        <div className="grid">
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={() => navigate('/customers')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default AddCustomerPage;
