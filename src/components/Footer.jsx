import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Footer() {
  const { navigate, t } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)', paddingBlock: '64px 32px', marginTop: 'auto', textAlign: 'left' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr', gap: '48px' }}>
        {/* Bio column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="serif-title" style={{ fontSize: '22px', color: 'var(--primary)', fontWeight: 800 }}>AURA</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Designed for those who appreciate visual excellence, minimalism, and premium performance. We craft digital commerce with zero compromises.
          </p>
          <div style={{ display: 'flex', gap: '12px', fontSize: '18px', marginTop: '8px' }}>
            <span style={{ cursor: 'pointer' }}>𝕏</span>
            <span style={{ cursor: 'pointer' }}>📸</span>
            <span style={{ cursor: 'pointer' }}>🌐</span>
            <span style={{ cursor: 'pointer' }}>🐙</span>
          </div>
        </div>

        {/* Shop column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shop</h4>
          <button onClick={() => navigate('shop')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>All Products</button>
          <button onClick={() => navigate('shop')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>New Arrivals</button>
          <button onClick={() => navigate('shop')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>Offers & Deals</button>
          <button onClick={() => navigate('blog')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>Latest News</button>
        </div>

        {/* Support column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Support</h4>
          <button onClick={() => navigate('support')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>Contact Helpdesk</button>
          <button onClick={() => navigate('support')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>FAQs</button>
          <button onClick={() => navigate('policies')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>Refund Policy</button>
          <button onClick={() => navigate('policies')} style={{ textAlign: 'left', fontSize: '14px', color: 'var(--text-muted)' }}>Terms of Service</button>
        </div>

        {/* Newsletter column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Newsletter</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Subscribe to receive flash sale notifications, daily deals, and product launches.
          </p>
          
          {subscribed ? (
            <div className="badge badge-success" style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '12px', justifyContent: 'center' }}>
              ✓ Subscribed successfully! Check email.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
                style={{ fontSize: '13px', borderRadius: '8px' }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', borderRadius: '8px' }}>Join</button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom info */}
      <div className="container" style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          © 2026 Aura Inc. All rights reserved. Designed with premium HSL aesthetic parameters.
        </p>
        
        {/* Payment logos mock */}
        <div style={{ display: 'flex', gap: '12px', fontSize: '24px', opacity: 0.6 }}>
          <span title="Stripe">💳</span>
          <span title="PayPal">🅿️</span>
          <span title="Apple Pay">🍎</span>
          <span title="Google Pay">🇬</span>
          <span title="SSLCommerz">🔒</span>
        </div>
      </div>
    </footer>
  );
}
