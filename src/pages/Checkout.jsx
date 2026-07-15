import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Checkout() {
  const { cart, activeCoupon, getFormattedPrice, placeOrder, user, navigate } = useContext(ShopContext);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Form States - Shipping Address
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingMethod, setShippingMethod] = useState('Standard'); // Standard, Express

  // Form States - Payment Card Details
  const [paymentMethod, setPaymentMethod] = useState('Stripe'); // Stripe, PayPal, COD
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentErrors, setPaymentErrors] = useState('');

  // Prefill shipping fields if logged-in user profile has addresses
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFullName(user.name);
      if (user.addresses && user.addresses.length > 0) {
        const addr = user.addresses[0];
        setStreet(addr.street);
        setCity(addr.city);
        setZip(addr.zip);
        setCountry(addr.country);
      }
    }
  }, [user]);

  // Pricing math calculation
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
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

  const shippingCost = (subtotal >= 100 || freeShippingCode) ? 0 : (shippingMethod === 'Express' ? 19.99 : 9.99);
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shippingCost + tax;

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = val.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(val);
    }
  };

  // Format Card Expiry MM/YY
  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/gi, '');
    if (val.length >= 2) {
      setCardExpiry(val.substring(0, 2) + '/' + val.substring(2, 4));
    } else {
      setCardExpiry(val);
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !street || !city || !zip) return;
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setPaymentErrors('');

    if (paymentMethod === 'Stripe') {
      const cleanNum = cardNumber.replace(/\s/g, '');
      if (cleanNum.length !== 16) {
        setPaymentErrors('Credit Card Number must be 16 digits.');
        return;
      }
      if (!cardExpiry.includes('/') || cardExpiry.length !== 5) {
        setPaymentErrors('Expiry date format MM/YY is invalid.');
        return;
      }
      if (cardCvv.length !== 3) {
        setPaymentErrors('CVV must be 3 digits.');
        return;
      }
    }

    // Process placeOrder
    const shippingDetails = { fullName, email, street, city, zip, country, shippingMethod };
    const cardDetails = paymentMethod === 'Stripe' ? { holder: cardHolder, number: cardNumber } : null;
    
    const placedOrder = placeOrder(shippingDetails, paymentMethod, cardDetails);
    if (placedOrder) {
      setPlacedOrderDetails(placedOrder);
      setStep(3);
    }
  };

  if (step === 3 && placedOrderDetails) {
    return (
      <div className="container page-fade-in" style={{ paddingBlock: '64px', maxWidth: '650px', textAlign: 'center' }}>
        
        {/* Celebration Tick Icon */}
        <div style={{ fontSize: '72px', color: 'var(--success)', animation: 'pulse 1.5s infinite' }}>🎉</div>
        
        <h2 className="serif-title" style={{ fontSize: '32px', marginBlock: '16px 8px', fontWeight: 800 }}>Thank you for your order!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>
          Your payment was processed successfully. We have dispatched a confirmation email detailing delivery timelines.
        </p>

        {/* Receipt Details Card */}
        <div className="glass" style={{ marginBlock: '32px', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)', textAlign: 'left' }}>
          <h3 style={{ fontSize: '15px', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px', fontWeight: 700 }}>
            Order details: {placedOrderDetails.id}
          </h3>
          
          {/* Tracking detail */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
            <span>Tracking Number:</span>
            <strong style={{ color: 'var(--primary)' }}>{placedOrderDetails.trackingCode}</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
            <span>Shipping Destination:</span>
            <span>{placedOrderDetails.shippingDetails.street}, {placedOrderDetails.shippingDetails.city}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '16px', borderBottom: '1px dashed var(--border)', paddingBottom: '12px' }}>
            <span>Estimated Arrival:</span>
            <span>{placedOrderDetails.shippingDetails.shippingMethod === 'Express' ? '1-2 Business Days' : '3-5 Business Days'}</span>
          </div>

          {/* Items checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', borderBottom: '1px dashed var(--border)', paddingBottom: '12px' }}>
            {placedOrderDetails.items.map((i) => (
              <div key={`${i.id}-${i.color}-${i.size}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>{i.title} (x{i.quantity})</span>
                <span>{getFormattedPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Grand Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', color: 'var(--text-heading)' }}>
            <span>Paid via {placedOrderDetails.paymentMethod}</span>
            <span style={{ fontSize: '20px', color: 'var(--primary)' }}>{getFormattedPrice(placedOrderDetails.total)}</span>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button onClick={() => navigate('dashboard')} className="btn btn-primary" style={{ borderRadius: '24px' }}>
            Track in Dashboard
          </button>
          <button onClick={() => navigate('shop')} className="btn btn-secondary" style={{ borderRadius: '24px' }}>
            Continue Shopping
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', textAlign: 'left' }}>
      
      {/* Step Checkout Timeline */}
      <div className="timeline" style={{ maxWidth: '600px', margin: '0 auto 32px' }}>
        <div className={`timeline-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="timeline-dot">1</div>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Shipping</span>
        </div>
        <div className={`timeline-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="timeline-dot">2</div>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Payment</span>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">3</div>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Confirmation</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* Left Column: Flow Details */}
        <div>
          {step === 1 ? (
            <form onSubmit={handleShippingSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>Shipping Address & Delivery</h2>
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Design Lane"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ZIP / Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="10001"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  required
                />
              </div>

              {/* Shipping Speed Picker */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <label className="form-label">Shipping Method</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="shipping-speed"
                    checked={shippingMethod === 'Standard'}
                    onChange={() => setShippingMethod('Standard')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Standard Shipping (3-5 Days)</span>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>US Delivery Zone (Complimentary on orders over $100)</p>
                  </div>
                  <strong style={{ marginLeft: 'auto', fontSize: '14px' }}>$9.99</strong>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="shipping-speed"
                    checked={shippingMethod === 'Express'}
                    onChange={() => setShippingMethod('Express')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>Express Delivery (1-2 Days)</span>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Expedited air delivery courier services</p>
                  </div>
                  <strong style={{ marginLeft: 'auto', fontSize: '14px' }}>$19.99</strong>
                </label>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px' }}>
                Continue To Payment
              </button>

            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>Secure Card Payment</h2>
                <button type="button" onClick={() => setStep(1)} style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                  Edit Shipping
                </button>
              </div>

              {paymentErrors && (
                <div className="badge badge-danger" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                  ⚠️ {paymentErrors}
                </div>
              )}

              {/* Payment Gateways Selectors */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                {['Stripe', 'PayPal', 'Cash on Delivery'].map((gateway) => (
                  <label key={gateway} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', cursor: 'pointer', background: paymentMethod === gateway ? 'var(--primary-light)' : 'transparent', borderColors: paymentMethod === gateway ? 'var(--primary)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="gateway-picker"
                      checked={paymentMethod === gateway}
                      onChange={() => setPaymentMethod(gateway)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{gateway}</span>
                  </label>
                ))}
              </div>

              {paymentMethod === 'Stripe' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="SARAH CONNOR"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Credit Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4242 4242 4242 4242"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date</label>
                      <input
                        type="text"
                        className="form-control"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV Code</label>
                      <input
                        type="password"
                        className="form-control"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="•••"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🔒 256-bit SSL Cryptographic encryption active. Your CVV will never be saved.</span>
                  </div>

                </div>
              )}

              {paymentMethod === 'PayPal' && (
                <div style={{ padding: '32px', textAlign: 'center', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px' }}>🅿️</span>
                  <p style={{ fontSize: '14px', marginBlock: '12px 8px' }}>Log in to process payments with your PayPal Wallet.</p>
                  <span className="badge badge-primary">PayPal Express Simulation Active</span>
                </div>
              )}

              {paymentMethod === 'Cash on Delivery' && (
                <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', marginBottom: '16px' }}>
                  <p style={{ fontSize: '14px', margin: 0 }}>
                    💸 Pay cash directly upon delivery package arrival. Note: A nominal shipping service processing fee may apply.
                  </p>
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px', paddingBlock: '12px' }}>
                {paymentMethod === 'Cash on Delivery' ? 'Confirm Delivery Order' : 'Complete Secured Checkout'}
              </button>

            </form>
          )}
        </div>

        {/* Right Column: Order Review Summary */}
        <div className="glass" style={{ padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '8px' }}>
            Shopping Summary
          </h3>
          
          {/* Scroll items review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto' }}>
            {cart.map((i) => (
              <div key={`${i.id}-${i.color}-${i.size}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={i.image} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {i.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Qty: {i.quantity} {i.color ? `| ${i.color}` : ''}</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{getFormattedPrice(i.price * i.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div style={{ borderTop: '1px dashed var(--border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>{getFormattedPrice(subtotal)}</span>
            </div>
            
            {activeCoupon && (
              <div style={{ display: 'flex', justify: 'space-between', color: 'var(--success)' }}>
                <span>Discount ({activeCoupon.code})</span>
                <span>-{getFormattedPrice(discount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping Cost</span>
              <span>{shippingCost === 0 ? 'FREE' : getFormattedPrice(shippingCost)}</span>
            </div>

            <div style={{ display: 'flex', justify: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Taxes (8%)</span>
              <span>{getFormattedPrice(tax)}</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', justify: 'space-between', fontWeight: 800, fontSize: '15px' }}>
              <span>Grand Total</span>
              <span style={{ fontSize: '18px', color: 'var(--primary)' }}>{getFormattedPrice(total)}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
