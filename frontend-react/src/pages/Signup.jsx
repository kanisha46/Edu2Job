import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiPost } from '../utils/api';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!fullName || !email || !password) {
      setError('All fields are required');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      const res = await apiPost('/auth/signup', { full_name: fullName, email, password });
      if (res.user_id) {
        navigate('/login');
      } else {
        setError(res.error || 'Signup failed');
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
            <h2 className="glass-auth-title">Create Account</h2>
            <p className="glass-auth-subtitle">Join Edu2Job and discover your path</p>
            
            {error && <div className="toast toast-error" style={{ position: 'relative', top: 0, left: 0, right: 0, transform: 'none', marginBottom: '16px' }}>{error}</div>}

            <form onSubmit={handleSignup} noValidate>
              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">person</span>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="glass-input" placeholder="Full Name" required />
                </div>
              </div>

              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">mail</span>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="glass-input" placeholder="Email Address" required />
                </div>
              </div>

              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">lock</span>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="glass-input" placeholder="Password" required minLength="6" />
                </div>
              </div>

              <div className="glass-form-group">
                <div className="glass-input-icon">
                  <span className="material-symbols-outlined">lock_reset</span>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="glass-input" placeholder="Confirm Password" required />
                </div>
              </div>

              <button type="submit" className="glass-btn" style={{ marginTop: '24px' }}>Sign Up</button>
            </form>

            <div className="glass-link">
              Already have an account? <Link to="/login">Log in instead</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
