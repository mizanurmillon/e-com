import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Auth() {
  const { loginUser, registerUser, t } = useContext(ShopContext);

  const [mode, setMode] = useState('login'); // login, register, forgot
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors('');
    setForgotSuccess(false);

    if (mode === 'login') {
      if (!email.includes('@')) {
        setErrors('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setErrors('Password must be at least 6 characters.');
        return;
      }
      loginUser(email, password);
    } else if (mode === 'register') {
      if (!name.trim()) {
        setErrors('Please enter your full name.');
        return;
      }
      if (!email.includes('@')) {
        setErrors('Please enter a valid email.');
        return;
      }
      if (password.length < 6) {
        setErrors('Password must be at least 6 characters.');
        return;
      }
      if (!agreeTerms) {
        setErrors('You must accept the Terms and Conditions to proceed.');
        return;
      }
      registerUser(name, email, password);
    } else if (mode === 'forgot') {
      if (!email.includes('@')) {
        setErrors('Enter a valid email.');
        return;
      }
      setForgotSuccess(true);
    }
  };

  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@aura.com');
      setPassword('admin123');
    } else {
      setEmail('user@aura.com');
      setPassword('user123');
    }
  };

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '80px', display: 'flex', justifyContent: 'center' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '440px', padding: '40px', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'left' }}>
        
        {/* Toggle Headers */}
        {mode !== 'forgot' && (
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <button
              onClick={() => { setMode('login'); setErrors(''); }}
              style={{ flex: 1, textAlign: 'center', fontWeight: mode === 'login' ? 700 : 500, color: mode === 'login' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '16px', borderBottom: mode === 'login' ? '2px solid var(--primary)' : 'none', paddingBottom: '10px' }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrors(''); }}
              style={{ flex: 1, textAlign: 'center', fontWeight: mode === 'register' ? 700 : 500, color: mode === 'register' ? 'var(--primary)' : 'var(--text-muted)', fontSize: '16px', borderBottom: mode === 'register' ? '2px solid var(--primary)' : 'none', paddingBottom: '10px' }}
            >
              Create Account
            </button>
          </div>
        )}

        {mode === 'forgot' && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>Reset Password</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Enter your registered email below to receive a secure recovery code.</p>
          </div>
        )}

        {errors && (
          <div className="badge badge-danger" style={{ display: 'block', padding: '10px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', fontSize: '12px' }}>
            ⚠️ {errors}
          </div>
        )}

        {forgotSuccess && (
          <div className="badge badge-success" style={{ display: 'block', padding: '10px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', fontSize: '12px' }}>
            ✓ Recovery link dispatched to {email}.
          </div>
        )}

        {/* Input Forms */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {mode === 'register' && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Connor"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                {mode === 'login' && (
                  <button type="button" onClick={() => setMode('forgot')} style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600 }}>
                    Forgot Password?
                  </button>
                )}
              </div>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ marginTop: '3px', accentColor: 'var(--primary)' }}
              />
              <span>
                I agree to the Terms of Service and acknowledge the Privacy & Return policies of Aura Store.
              </span>
            </label>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', paddingBlock: '12px', fontSize: '14px', borderRadius: '8px', marginTop: '8px' }}>
            {mode === 'login' ? 'Sign In Securely' : mode === 'register' ? 'Register Account' : 'Dispatch Recovery Code'}
          </button>

          {mode === 'forgot' && (
            <button type="button" onClick={() => { setMode('login'); setErrors(''); }} className="btn btn-secondary" style={{ width: '100%', paddingBlock: '10px' }}>
              Return to Login
            </button>
          )}
        </form>

        {/* Demo Accounts Quick Autofill (Wow factor!) */}
        {mode === 'login' && (
          <div style={{ borderTop: '1px dashed var(--border)', marginTop: '24px', paddingTop: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
              Demo Testing Accounts
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => fillDemoCredentials('customer')}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, fontSize: '11px', paddingBlock: '8px' }}
              >
                👤 Customer Account
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1, fontSize: '11px', paddingBlock: '8px' }}
              >
                🛠️ Admin Portal
              </button>
            </div>
            <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>
              Password for both autofills: <code>admin123</code> / <code>user123</code>
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
