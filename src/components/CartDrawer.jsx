import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateCartQuantity, navigate, getFormattedPrice } = useContext(ShopContext);
  const [orderNotes, setOrderNotes] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutClick = () => {
    onClose();
    // Save order notes in local storage so Checkout can read it if needed
    localStorage.setItem('aura_order_notes', orderNotes);
    navigate('cart');
  };

  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px' }}>
        
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
          <button onClick={onClose} style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-muted)' }}>×</button>
        </div>

        {/* Drawer Cart Items */}
        <div style={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginBlock: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '48px' }}>🛒</span>
              <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
              <button className="btn btn-primary" onClick={() => { onClose(); navigate('shop'); }}>Start Shopping</button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                <img src={item.image} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', background: 'var(--bg-secondary)' }} />
                
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{item.title}</h4>
                  
                  {/* Variant info */}
                  {(item.color || item.size) && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.color} {item.size ? `/ ${item.size}` : ''}
                    </span>
                  )}
                  
                  {/* Quantity and Price */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px' }}>
                      <button onClick={() => updateCartQuantity(idx, item.quantity - 1)} style={{ paddingInline: '8px', fontWeight: 'bold' }}>-</button>
                      <span style={{ paddingInline: '8px', fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(idx, item.quantity + 1)} style={{ paddingInline: '8px', fontWeight: 'bold' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-heading)' }}>
                      {getFormattedPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button onClick={() => removeFromCart(idx)} style={{ color: 'var(--danger)', fontSize: '14px', height: 'fit-content' }} title="Remove Item">
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer info */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            {/* Order Note */}
            <div>
              <label className="form-label">Order Notes</label>
              <textarea
                className="form-control"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Special delivery instructions..."
                rows="2"
                style={{ fontSize: '12px', resize: 'none' }}
              />
            </div>

            {/* Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Estimated Subtotal</span>
              <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-heading)' }}>{getFormattedPrice(subtotal)}</span>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button onClick={handleCheckoutClick} className="btn btn-primary" style={{ width: '100%' }}>
                View Cart & Checkout
              </button>
              <button onClick={onClose} className="btn btn-secondary" style={{ width: '100%' }}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
