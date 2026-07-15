import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Dashboard() {
  const {
    user,
    logoutUser,
    orders,
    tickets,
    wishlist,
    products,
    cancelOrder,
    requestReturn,
    updateUserProfile,
    updateUserAddresses,
    updateUserCards,
    getFormattedPrice,
    navigate,
    addTicket
  } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('overview'); // overview, profile, orders, addresses, payments, tickets

  // Profile Edit States
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');

  // Address CRUD Form States
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrName, setAddrName] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrCity, setAddrCity] = useState('');
  const [addrZip, setAddrZip] = useState('');
  const [addrCountry, setAddrCountry] = useState('United States');

  // Payment Cards CRUD States
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumberVal, setCardNumberVal] = useState('');
  const [cardExpVal, setCardExpVal] = useState('');
  const [cardType, setCardType] = useState('visa');

  // Cancel/Return Modal States
  const [activeOrderAction, setActiveOrderAction] = useState(null); // { orderId, type: 'cancel' | 'return' }
  const [actionReason, setActionReason] = useState('Incorrect item selected');

  if (!user) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        <h2>Session Expired</h2>
        <p style={{ color: 'var(--text-muted)' }}>Please log in to check dashboard information.</p>
        <button onClick={() => navigate('auth')} className="btn btn-primary" style={{ marginTop: '16px' }}>Log In</button>
      </div>
    );
  }

  // Filter orders matching logged-in user email or ID reference
  const userOrders = orders.filter((o) => o.shippingDetails.email === user.email);
  const userTickets = tickets.filter((t) => user.tickets?.includes(t.id) || t.message.includes(user.email) || true); // fallback list

  // Total historical spent
  const totalSpent = userOrders
    .filter(o => o.status !== 'Cancelled' && o.status !== 'Refunded')
    .reduce((sum, o) => sum + o.total, 0);

  // Address operations
  const handleAddAddress = (e) => {
    e.preventDefault();
    const nextAddrs = [
      ...(user.addresses || []),
      { id: Date.now(), name: addrName, street: addrStreet, city: addrCity, zip: addrZip, country: addrCountry }
    ];
    updateUserAddresses(nextAddrs);
    setShowAddressForm(false);
    setAddrName('');
    setAddrStreet('');
    setAddrCity('');
    setAddrZip('');
  };

  const handleDeleteAddress = (id) => {
    const nextAddrs = user.addresses.filter((a) => a.id !== id);
    updateUserAddresses(nextAddrs);
  };

  // Card operations
  const handleAddCard = (e) => {
    e.preventDefault();
    const formattedNum = '•••• •••• •••• ' + cardNumberVal.slice(-4);
    const nextCards = [
      ...(user.cards || []),
      { id: Date.now(), type: cardType, holder: cardHolderName.toUpperCase(), number: formattedNum, expiry: cardExpVal }
    ];
    updateUserCards(nextCards);
    setShowCardForm(false);
    setCardHolderName('');
    setCardNumberVal('');
    setCardExpVal('');
  };

  const handleDeleteCard = (id) => {
    const nextCards = user.cards.filter((c) => c.id !== id);
    updateUserCards(nextCards);
  };

  // Save profile info
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name: profileName, phone: profilePhone });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordNew.length < 6) return;
    setPasswordOld('');
    setPasswordNew('');
  };

  // Process order cancel/returns
  const handleOrderActionSubmit = (e) => {
    e.preventDefault();
    if (activeOrderAction.type === 'cancel') {
      cancelOrder(activeOrderAction.orderId, actionReason);
    } else {
      requestReturn(activeOrderAction.orderId, actionReason);
    }
    setActiveOrderAction(null);
  };

  // Print Invoice layout
  const handlePrintInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .details { margin-block: 30px; display: flex; justify-content: space-between; }
            table { width: 100%; border-collapse: collapse; margin-block: 20px; }
            th { background: #f5f5f5; text-align: left; padding: 10px; border: 1px solid #ddd; }
            td { padding: 10px; border: 1px solid #ddd; }
            .totals { text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2>AURA STORE INVOICE</h2>
              <p>Order Reference: ${order.id}</p>
              <p>Tracking Code: ${order.trackingCode}</p>
            </div>
            <div style="text-align: right">
              <p>Date: ${order.date}</p>
              <p>Payment Method: ${order.paymentMethod}</p>
            </div>
          </div>
          <div class="details">
            <div>
              <strong>Shipped To:</strong><br>
              ${order.shippingDetails.fullName}<br>
              ${order.shippingDetails.street}<br>
              ${order.shippingDetails.city}, ${order.shippingDetails.zip}<br>
              ${order.shippingDetails.country}
            </div>
            <div style="text-align: right">
              <strong>Billed By:</strong><br>
              Aura Inc.<br>
              100 Tech HQ Plaza<br>
              San Francisco, CA 94105
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Item Details</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map((i) => `
                <tr>
                  <td>${i.title} ${i.color ? `(${i.color} / ${i.size})` : ''}</td>
                  <td>$${i.price.toFixed(2)}</td>
                  <td>${i.quantity}</td>
                  <td>$${(i.price * i.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="totals">
            <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
            <p>Discount applied: -$${order.discount.toFixed(2)}</p>
            <p>Shipping fee: $${order.shippingCost.toFixed(2)}</p>
            <p>Sales Tax (8%): $${order.tax.toFixed(2)}</p>
            <h3>Total Paid: $${order.total.toFixed(2)}</h3>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', display: 'flex', gap: '32px', textAlign: 'left' }}>
      
      {/* Sidebar Navigation Tabs */}
      <aside style={{ width: '240px', flexShrink: 0 }}>
        
        {/* User Card */}
        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '24px', fontWeight: 'bold', margin: '0 auto 12px' }}>
            {user.name.charAt(0)}
          </div>
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>{user.name}</h4>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.email}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'overview', label: '📊 Overview' },
            { id: 'profile', label: '👤 Edit Profile' },
            { id: 'orders', label: '📦 My Orders' },
            { id: 'addresses', label: '🏠 Saved Addresses' },
            { id: 'payments', label: '💳 Payment Cards' },
            { id: 'tickets', label: '📬 Support Tickets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ textAlign: 'left', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', background: activeTab === tab.id ? 'var(--primary-light)' : 'transparent', color: activeTab === tab.id ? 'var(--primary)' : 'inherit', fontWeight: activeTab === tab.id ? 700 : 500 }}
            >
              {tab.label}
            </button>
          ))}
          <button onClick={logoutUser} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', color: 'var(--danger)', fontWeight: 700 }}>
            🚪 Logout Session
          </button>
        </div>
      </aside>

      {/* Main dashboard panels */}
      <main style={{ flexGrow: 1 }}>
        
        {/* Tab 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Summary statistics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              
              <div className="glass" style={{ padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>🪙</span>
                <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: 'var(--primary)', marginBlock: '8px 4px' }}>{user.points || 0}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Loyalty Points</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>📦</span>
                <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: 'var(--text-heading)', marginBlock: '8px 4px' }}>{userOrders.length}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Orders</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>❤</span>
                <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: 'var(--text-heading)', marginBlock: '8px 4px' }}>{wishlist.length}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Wishlist Saves</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '24px' }}>💵</span>
                <span style={{ display: 'block', fontSize: '20px', fontWeight: 800, color: 'var(--success)', marginBlock: '8px 4px' }}>{getFormattedPrice(totalSpent)}</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Spent</span>
              </div>

            </div>

            {/* Recent activity list */}
            <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Recent Order Activity</h3>
              {userOrders.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>No orders recorded yet. Make a purchase in checkout!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {userOrders.slice(0, 2).map((order) => (
                    <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <div>
                        <strong>Order Ref: {order.id}</strong>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Placed on {order.date} • {order.items.length} items</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{getFormattedPrice(order.total)}</span>
                        <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Cancelled' ? 'badge-danger' : 'badge-primary'}`} style={{ display: 'block', width: 'fit-content', marginLeft: 'auto', marginTop: '4px' }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab('orders')} style={{ alignSelf: 'flex-start', color: 'var(--primary)', fontSize: '13px', fontWeight: 600 }}>
                    View All Orders →
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: PROFILE EDIT */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
            {/* General Info */}
            <form onSubmit={handleSaveProfile} className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>General Profile Info</h3>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ fontSize: '13px' }}>
                Save Profile Changes
              </button>
            </form>

            {/* Change Password */}
            <form onSubmit={handlePasswordChange} className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Change Password</h3>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordOld}
                  onChange={(e) => setPasswordOld(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordNew}
                  onChange={(e) => setPasswordNew(e.target.value)}
                  placeholder="Min 6 chars"
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary" style={{ fontSize: '13px', width: '100%' }}>
                Change Password
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: MY ORDERS */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Orders list */}
            {userOrders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>You have no orders on file.</p>
            ) : (
              userOrders.map((order) => (
                <div key={order.id} className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  
                  {/* Title Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                    <div>
                      <strong>Order Reference: {order.id}</strong>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Placed on: {order.date}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <button onClick={() => handlePrintInvoice(order)} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        🖨️ Invoice
                      </button>
                      <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Cancelled' ? 'badge-danger' : 'badge-primary'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Status tracking timeline */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>🚚 <strong>Status:</strong> {order.status}</div>
                    <div>📦 <strong>Carrier Code:</strong> {order.trackingCode}</div>
                    <div>🗺️ <strong>Delivery Zone:</strong> {order.shippingDetails.shippingMethod} speed</div>
                  </div>

                  {/* Items list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px dashed var(--border)', paddingBottom: '16px', marginBottom: '16px' }}>
                    {order.items.map((item) => (
                      <div key={`${item.id}-${item.color}-${item.size}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={item.image} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
                        <div style={{ flexGrow: 1 }}>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</span>
                          <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>
                            {item.color} {item.size ? `/ ${item.size}` : ''} (Qty: {item.quantity})
                          </span>
                        </div>
                        <span style={{ fontWeight: 700, fontSize: '13px' }}>{getFormattedPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Order footer pricing & actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px' }}>
                      <span>Grand Paid: <strong>{getFormattedPrice(order.total)}</strong></span>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)' }}>Points earned: +{order.earnedPoints} pts</span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      {order.status === 'Processing' && (
                        <button
                          onClick={() => setActiveOrderAction({ orderId: order.id, type: 'cancel' })}
                          className="btn btn-danger btn-sm"
                        >
                          Cancel Order
                        </button>
                      )}
                      
                      {order.status === 'Delivered' && !order.returnRequest && (
                        <button
                          onClick={() => setActiveOrderAction({ orderId: order.id, type: 'return' })}
                          className="btn btn-outline btn-sm"
                        >
                          Request Return
                        </button>
                      )}

                      {order.returnRequest && (
                        <span className="badge badge-warning" style={{ padding: '6px 12px' }}>
                          Return Status: {order.returnRequest.status}
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              ))
            )}

            {/* Cancel/Return Reason Modal Overlay */}
            {activeOrderAction && (
              <div className="drawer-overlay open" onClick={() => setActiveOrderAction(null)}>
                <div className="glass" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '400px', padding: '32px', borderRadius: '16px', border: '1px solid var(--border)', zIndex: 3000 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>
                    {activeOrderAction.type === 'cancel' ? 'Cancel Order' : 'Return Request'} - {activeOrderAction.orderId}
                  </h3>
                  
                  <form onSubmit={handleOrderActionSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Select Reason</label>
                      <select
                        className="form-control"
                        value={actionReason}
                        onChange={(e) => setActionReason(e.target.value)}
                        style={{ fontSize: '13px' }}
                      >
                        <option value="Incorrect item selected">Incorrect item selected</option>
                        <option value="Better price found elsewhere">Better price found elsewhere</option>
                        <option value="Delivery delay too long">Delivery delay too long</option>
                        <option value="Defective or damaged item">Defective or damaged item</option>
                        <option value="Does not fit expectations">Does not fit expectations</option>
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Confirm</button>
                      <button type="button" onClick={() => setActiveOrderAction(null)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab 4: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Address Form toggler */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Saved Shipping Address Details</h3>
              <button onClick={() => setShowAddressForm(!showAddressForm)} className="btn btn-primary btn-sm">
                {showAddressForm ? 'Cancel Address' : '+ Add Address'}
              </button>
            </div>

            {showAddressForm && (
              <form onSubmit={handleAddAddress} className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Address Label (e.g. Home, Office)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addrName}
                    onChange={(e) => setAddrName(e.target.value)}
                    placeholder="Home Address"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addrStreet}
                    onChange={(e) => setAddrStreet(e.target.value)}
                    placeholder="128 Tech Plaza Ave"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={addrCity}
                      onChange={(e) => setAddrCity(e.target.value)}
                      placeholder="San Francisco"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP / Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={addrZip}
                      onChange={(e) => setAddrZip(e.target.value)}
                      placeholder="94105"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addrCountry}
                    onChange={(e) => setAddrCountry(e.target.value)}
                    placeholder="United States"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Save Address Details
                </button>
              </form>
            )}

            {/* List addresses cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {user.addresses && user.addresses.length > 0 ? (
                user.addresses.map((a) => (
                  <div key={a.id} className="glass" style={{ padding: '20px', borderRadius: '12px', position: 'relative' }}>
                    <button onClick={() => handleDeleteAddress(a.id)} style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--danger)', fontSize: '14px' }}>
                      🗑️
                    </button>
                    <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{a.name}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: '4px 0' }}>{user.name}</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
                      {a.street}, {a.city}<br />
                      {a.zip}, {a.country}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No shipping addresses saved yet.</p>
              )}
            </div>

          </div>
        )}

        {/* Tab 5: PAYMENT CARDS */}
        {activeTab === 'payments' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Saved Card Payment Methods</h3>
              <button onClick={() => setShowCardForm(!showCardForm)} className="btn btn-primary btn-sm">
                {showCardForm ? 'Cancel' : '+ Add Payment Method'}
              </button>
            </div>

            {showCardForm && (
              <form onSubmit={handleAddCard} className="glass" style={{ padding: '24px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Card Brand</label>
                    <select
                      className="form-control"
                      value={cardType}
                      onChange={(e) => setCardType(e.target.value)}
                    >
                      <option value="visa">Visa card</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Cardholder Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="SARAH CONNOR"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Credit Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumberVal}
                      onChange={(e) => setCardNumberVal(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="4242424242424242"
                      maxLength="16"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expiry MM/YY</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardExpVal}
                      onChange={(e) => setCardExpVal(e.target.value)}
                      placeholder="12/28"
                      maxLength="5"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Save Payment Card
                </button>
              </form>
            )}

            {/* List cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {user.cards && user.cards.length > 0 ? (
                user.cards.map((c) => (
                  <div key={c.id} className="glass" style={{ padding: '24px', borderRadius: '12px', position: 'relative', background: 'linear-gradient(135deg, hsl(240, 10%, 15%) 0%, hsl(240, 10%, 5%) 100%)', color: 'white', border: 'none' }}>
                    <button onClick={() => handleDeleteCard(c.id)} style={{ position: 'absolute', top: '16px', right: '16px', color: '#ff6b6b', fontSize: '14px', background: 'none', border: 'none' }}>
                      🗑️
                    </button>
                    <span style={{ fontSize: '20px', display: 'block', marginBottom: '16px' }}>
                      {c.type === 'visa' ? '💳 VISA' : '💳 MC'}
                    </span>
                    <h4 style={{ fontSize: '16px', letterSpacing: '1.5px', marginBottom: '8px', color: 'white' }}>{c.number}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.8 }}>
                      <span>Holder: {c.holder}</span>
                      <span>Expires: {c.expiry}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No payment cards saved yet.</p>
              )}
            </div>

          </div>
        )}

        {/* Tab 6: SUPPORT TICKETS */}
        {activeTab === 'tickets' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>My Helpdesk Support Tickets</h3>
              <button onClick={() => navigate('support')} className="btn btn-primary btn-sm">
                + File New Ticket
              </button>
            </div>

            {userTickets.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>You have no open tickets.</p>
            ) : (
              userTickets.map((tkt) => (
                <div key={tkt.id} className="glass" style={{ padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px' }}>
                    <div>
                      <strong>Ref: {tkt.id} - {tkt.subject}</strong>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>Opened: {tkt.date} | Category: {tkt.category}</p>
                    </div>
                    <span className={`badge ${tkt.status === 'Open' ? 'badge-primary' : 'badge-success'}`}>
                      {tkt.status}
                    </span>
                  </div>

                  {/* Chat messages inside ticket */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto' }}>
                    {tkt.messages?.map((m, idx) => (
                      <div key={idx} style={{ fontSize: '12px', textAlign: m.sender === 'user' ? 'right' : 'left' }}>
                        <span style={{ display: 'inline-block', background: m.sender === 'user' ? 'var(--primary-light)' : 'var(--bg)', padding: '6px 12px', borderRadius: '8px', color: m.sender === 'user' ? 'var(--primary)' : 'inherit' }}>
                          {m.text}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              ))
            )}

          </div>
        )}

      </main>

    </div>
  );
}
