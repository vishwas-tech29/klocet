import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import './AdminLogin.css';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, adminAuth } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to dashboard
  React.useEffect(() => {
    if (adminAuth) {
      navigate('/admin/dashboard');
    }
  }, [adminAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <h1 className="login-logo">KLOCET</h1>
        <h2>ADMIN ACCESS</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </form>

        <p className="demo-hint">Demo password: <code>admin123</code></p>
      </div>
    </div>
  );
};
