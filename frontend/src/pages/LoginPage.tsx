import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!auth) {
      setError('Auth context is not available.');
      return;
    }
    try {
      await auth.login(email, password);
      navigate('/manufacturers');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <main className="container">
      <article>
        <hgroup>
          <h1>Sign in</h1>
          <h2>Italian Manufacturers CRM</h2>
        </hgroup>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            required
          />
          {error && <small style={{ color: 'var(--pico-color-red-500)' }}>{error}</small>}
          <button type="submit">Login</button>
        </form>
      </article>
    </main>
  );
};

export default LoginPage;
