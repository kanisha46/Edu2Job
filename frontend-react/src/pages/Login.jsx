import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost, apiGet } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await apiPost('/auth/login', { email, password });
      if (res.token) {
        localStorage.setItem('edu2job_token', res.token);
        localStorage.setItem('edu2job_user', JSON.stringify(res.user));

        try {
          const profile = await apiGet('/profile/me');
          if (profile && profile.user) {
            localStorage.setItem('edu2job_user', JSON.stringify(profile.user));
          }
        } catch (err) {
          console.warn('Could not fetch full profile:', err);
        }

        try {
          const predRes = await apiGet('/profile/predictions');
          if (predRes && predRes.predictions) {
            localStorage.setItem('edu2job_predictions', JSON.stringify(predRes.predictions));
          }
        } catch (err) {
          console.warn('Could not fetch predictions:', err);
        }

        navigate('/dashboard');
      } else {
        setError(res.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Network error');
    }
  };

  return (
    <div style={{ margin: 0 }}>
      {/* Background Animation */}
      <div className="animated-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="glass-auth-page">
        <div className="glass-auth-card">
          <div className="glass-form-section">
            <h2 className="glass-auth-title">Welcome Back</h2>
            <p className="glass-auth-subtitle">Sign in to your account to continue</p>

            {error && <div className="toast toast-error" style={{ position: 'relative', top: 0, left: 0, right: 0, transform: 'none', marginBottom: '16px' }}>{error}</div>}
            
            <form onSubmit={handleLogin} noValidate>
              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">mail</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="glass-input" placeholder="Email Address" required />
                </div>
              </div>

              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">lock</span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="glass-input" placeholder="Password" required />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-600)', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember me
                </label>
                <Link to="#" style={{ color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</Link>
              </div>

              <button type="submit" className="glass-btn">Sign In</button>
            </form>

            <div className="glass-link">
              Don't have an account? <Link to="/signup">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
