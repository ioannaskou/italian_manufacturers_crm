import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import { Manufacturer } from '../types';

const EditManufacturerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const response = await api.get<Manufacturer>(`/manufacturers/${id}`);
        const m = response.data;
        setName(m.name);
        setVatNumber(m.vatNumber || '');
        setStreet(m.address.street);
        setCity(m.address.city);
        setPostalCode(m.address.postalCode);
        setCountry(m.address.country);
        setContactName(m.contactPersonName);
        setContactEmail(m.contactEmail);
        setContactPhone(m.contactPhone);
        setNotes(m.notes || '');
        setLoading(false);
      } catch (err) {
        setError('Failed to load manufacturer data.');
        setLoading(false);
      }
    };
    fetchManufacturer();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const updatedManufacturer = {
      name,
      vatNumber,
      address: { street, city, postalCode, country },
      contactPersonName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      notes,
    };

    try {
      await api.put(`/manufacturers/${id}`, updatedManufacturer);
      setSuccess('Manufacturer updated successfully! Redirecting...');
      setTimeout(() => navigate('/manufacturers'), 2000);
    } catch (err) {
      setError('Failed to update manufacturer. Please check your input and try again.');
    }
  };

  if (loading) {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <hgroup>
        <h2>Edit Manufacturer</h2>
        <h3>Update the manufacturer information.</h3>
      </hgroup>
      <form onSubmit={handleSubmit}>
        <div className="grid">
            <label>
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
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
         <div className="grid">
            <label>
              Contact Person Name
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
            </label>
            <label>
              Contact Email
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
            </label>
            <label>
              Contact Phone
              <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
            </label>
        </div>
        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        
        {error && <p role="alert" style={{ color: 'var(--pico-color-red-500)' }}>{error}</p>}
        {success && <p role="alert" style={{ color: 'var(--pico-color-green-500)' }}>{success}</p>}

        <div className="grid">
          <button type="submit">Update</button>
          <button type="button" className="secondary" onClick={() => navigate('/manufacturers')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default EditManufacturerPage;
