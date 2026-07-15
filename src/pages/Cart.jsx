import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getFormattedPrice,
    navigate,
    applyCoupon,
    activeCoupon,
    user
  } = useContext(ShopContext);

  const [couponCode, setCouponCode] = useState('');
  const [shippingRegion, setShippingRegion] = useState('US-Standard');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Discount calculation
  let discount = 0;
  let freeShippingCode = false;
  if (activeCoupon) {
    if (activeCoupon.percent > 0) {
      discount = subtotal * (activeCoupon.percent / 100);
    } else if (activeCoupon.value > 0) {
      discount = activeCoupon.value;
    }
    if (activeCoupon.freeShipping) {
      freeShippingCode = true;
    }
  }

  // Shipping cost calculation
  let shippingCost = 9.99;
  if (subtotal >= 100 || subtotal === 0 || freeShippingCode) {
    shippingCost = 0;
  } else if (shippingRegion === 'US-Express') {
    shippingCost = 19.99;
  } else if (shippingRegion === 'International') {
    shippingCost = 35.00;
  }

  // Tax calculation: 8%
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shippingCost + tax;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="container page-fade-in" style={{ paddingBlock: '80px', textAlign: 'center' }}>
        <span style={{ fontSize: '64px' }}>🛒</span>
        <h2 className="serif-title" style={{ fontSize: '28px', marginBlock: '24px 12px' }}>Your Shopping Bag is empty</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
          Explore our minimalist tech catalog to add mechanical keyboards, wallets, and lighting desk devices.
        </p>
        <button onClick={() => navigate('shop')} className="btn btn-primary">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', textAlign: 'left' }}>
      <h1 className="serif-title" style={{ fontSize: '32px', marginBottom: '32px', fontWeight: 700 }}>Your Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* Left Column: Cart items table */}
        <div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={`${item.id}-${item.color}-${item.size}`}>
                    <td>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img src={item.image} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '8px', background: 'var(--bg-secondary)' }} />
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{item.title}</h4>
                          {(item.color || item.size) && (
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                              {item.color} {item.size ? `/ ${item.size}` : ''}
                            </span>
                          )}
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>SKU: {item.sku}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{ fontWeight: 500 }}>{getFormattedPrice(item.price)}</td>
                    
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '6px', padding: '4px' }}>
                        <button onClick={() => updateCartQuantity(idx, item.quantity - 1)} style={{ paddingInline: '8px', fontWeight: 'bold' }}>-</button>
                        <span style={{ paddingInline: '12px', fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(idx, item.quantity + 1)} style={{ paddingInline: '8px', fontWeight: 'bold' }}>+</button>
                      </div>
                    </td>

                    <td style={{ fontWeight: 700, color: 'var(--text-heading)' }}>
                      {getFormattedPrice(item.price * item.quantity)}
                    </td>

                    <td>
                      <button onClick={() => removeFromCart(idx)} style={{ color: 'var(--danger)', fontSize: '16px' }} title="Delete">
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Region Shipping calculator & Coupon code form */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
            
            {/* Region picker */}
            <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Estimate Shipping</h4>
              <div className="form-group">
                <label className="form-label">Delivery Zone</label>
                <select
                  className="form-control"
                  value={shippingRegion}
                  onChange={(e) => setShippingRegion(e.target.value)}
                  style={{ fontSize: '13px' }}
                >
                  <option value="US-Standard">US Standard (3-5 Days) - $9.99 (Free over $100)</option>
                  <option value="US-Express">US Express (1-2 Days) - $19.99</option>
                  <option value="International">International Shipping - $35.00</option>
                </select>
              </div>
            </div>

            {/* Coupons input */}
            <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>Promo Coupon Code</h4>
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-control"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. AURA10, FREESHIP"
                  style={{ fontSize: '13px' }}
                />
                <button type="submit" className="btn btn-primary" style={{ fontSize: '13px', paddingBlock: '8px' }}>Apply</button>
              </form>
              <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--text-muted)' }}>
                {user && user.points >= 2000 && (
                  <p style={{ margin: 0, color: 'var(--success)' }}>💡 You have {user.points} pts. Type <strong>LOYALTY20</strong> to redeem $20 off!</p>
                )}
                <p style={{ margin: 0 }}>Hint: Use <strong>AURA10</strong> for 10% off details.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Order totals review */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '8px' }}>Order Summary</h3>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
            <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{getFormattedPrice(subtotal)}</span>
          </div>

          {activeCoupon && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--success)' }}>
              <span>Discount ({activeCoupon.code})</span>
              <span>-{getFormattedPrice(discount)}</span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Shipping Cost</span>
            <span>{shippingCost === 0 ? 'FREE' : getFormattedPrice(shippingCost)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Sales Tax (8%)</span>
            <span>{getFormattedPrice(tax)}</span>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '16px' }}>Total Amount</span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{getFormattedPrice(total)}</span>
          </div>

          {/* Reward Points disclaimer */}
          <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px', color: 'var(--text-muted)' }}>
            💰 Completing this purchase will earn you approximately <strong>{Math.round(total * 5)}</strong> Loyalty Points!
          </div>

          {/* Checkout checkout button */}
          <button
            onClick={() => navigate('checkout', { shippingZone: shippingRegion })}
            className="btn btn-primary"
            style={{ width: '100%', paddingBlock: '12px', borderRadius: '8px', fontSize: '15px' }}
          >
            Proceed to Checkout
          </button>
          
          <button onClick={() => navigate('shop')} className="btn btn-secondary" style={{ width: '100%' }}>
            Continue Shopping
          </button>
        </div>

      </div>

    </div>
  );
}
