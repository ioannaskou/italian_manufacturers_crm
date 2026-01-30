import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AddManufacturerPage: React.FC = () => {
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
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const newManufacturer = {
      name,
      vatNumber,
      address: { street, city, postalCode, country },
      contactPersonName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone,
      notes,
    };

    try {
      await api.post('/manufacturers', newManufacturer);
      setSuccess('Manufacturer created successfully! Redirecting...');
      setTimeout(() => navigate('/manufacturers'), 2000);
    } catch (err) {
      setError('Failed to create manufacturer. Please check your input and try again.');
    }
  };

  return (
    <main className="container">
      <hgroup>
        <h2>Add New Manufacturer</h2>
        <h3>Fill out the form to add a new manufacturer to the CRM.</h3>
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
          <button type="submit">Save</button>
          <button type="button" className="secondary" onClick={() => navigate('/manufacturers')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default AddManufacturerPage;
