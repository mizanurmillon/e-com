import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { initialBrands, initialCategories } from '../data/mockData';

export default function AdminPanel() {
  const {
    products,
    orders,
    blogs,
    adminAddProduct,
    adminEditProduct,
    adminDeleteProduct,
    adminUpdateOrderStatus,
    adminApproveRefund,
    adminAddBlog,
    adminDeleteBlog,
    getFormattedPrice,
    navigate
  } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, products, orders, blog, settings

  // Product CRUD Form states
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDiscount, setProdDiscount] = useState('');
  const [prodCategory, setProdCategory] = useState('tech');
  const [prodBrand, setProdBrand] = useState('Aura');
  const [prodStock, setProdStock] = useState('10');
  const [prodDescription, setProdDescription] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodBarcode, setProdBarcode] = useState('');
  const [prodImgUrl, setProdImgUrl] = useState('https://images.unsplash.com/photo-1618384887929-16ec33faf9c1?w=800&auto=format&fit=crop&q=60');

  // Blog Form state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState('Lifestyle');
  const [blogContent, setBlogContent] = useState('');
  const [blogImg, setBlogImg] = useState('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=60');

  // Settings mock states
  const [storeTax, setStoreTax] = useState(8);
  const [smsGateway, setSmsGateway] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Analytics Math
  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled' && o.status !== 'Refunded')
    .reduce((sum, o) => sum + o.total, 0);

  const totalSalesCount = orders.filter((o) => o.status !== 'Cancelled').length;

  const handleProductSubmit = (e) => {
    e.preventDefault();
    const productPayload = {
      title: prodTitle,
      price: prodPrice,
      discountPrice: prodDiscount ? prodDiscount : null,
      category: prodCategory,
      brand: prodBrand,
      stock: prodStock,
      sku: prodSku || 'SKU-' + Date.now(),
      barcode: prodBarcode || 'BAR-' + Date.now(),
      images: [prodImgUrl],
      description: prodDescription,
      attributes: { Weight: '500g', Warranty: '1 Year' },
      variants: { colors: ['Standard'], sizes: ['Standard'] }
    };

    if (editProductId) {
      adminEditProduct({ id: editProductId, ...productPayload });
    } else {
      adminAddProduct(productPayload);
    }

    // Reset Form
    setShowProductForm(false);
    setEditProductId(null);
    setProdTitle('');
    setProdPrice('');
    setProdDiscount('');
    setProdDescription('');
    setProdSku('');
    setProdBarcode('');
  };

  const handleEditClick = (p) => {
    setEditProductId(p.id);
    setProdTitle(p.title);
    setProdPrice(p.price);
    setProdDiscount(p.discountPrice || '');
    setProdCategory(p.category);
    setProdBrand(p.brand);
    setProdStock(p.stock);
    setProdDescription(p.description);
    setProdSku(p.sku);
    setProdBarcode(p.barcode);
    setProdImgUrl(p.images[0]);
    setShowProductForm(true);
  };

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    adminAddBlog({
      title: blogTitle,
      excerpt: blogExcerpt,
      category: blogCategory,
      content: blogContent,
      image: blogImg,
      author: 'Alexander Admin'
    });
    setShowBlogForm(false);
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
  };

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', display: 'flex', gap: '32px', textAlign: 'left' }}>
      
      {/* Sidebar Panel Router */}
      <aside style={{ width: '240px', flexShrink: 0 }}>
        
        <div className="glass" style={{ padding: '20px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center', border: '1px solid var(--primary)' }}>
          <span style={{ fontSize: '24px' }}>🛠️</span>
          <h4 style={{ fontSize: '14px', fontWeight: 700, marginBlock: '8px 2px', color: 'var(--primary)' }}>ADMIN CONTROL</h4>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Store Console Pro</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { id: 'analytics', label: '📊 Sales Analytics' },
            { id: 'products', label: '📦 Product Inventory' },
            { id: 'orders', label: '🚚 Orders Shipment' },
            { id: 'blog', label: '📝 CMS Blog Posts' },
            { id: 'settings', label: '⚙️ Store Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ textAlign: 'left', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', background: activeTab === tab.id ? 'var(--primary-light)' : 'transparent', color: activeTab === tab.id ? 'var(--primary)' : 'inherit', fontWeight: activeTab === tab.id ? 700 : 500 }}
            >
              {tab.label}
            </button>
          ))}
          
          <button onClick={() => navigate('home')} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', color: 'var(--primary)', fontWeight: 700, marginTop: '20px' }}>
            🏪 Return to Storefront
          </button>
        </div>

      </aside>

      {/* Main admin panels */}
      <main style={{ flexGrow: 1 }}>
        
        {/* Tab 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              
              <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>GROSS SALES</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--success)', marginBlock: '8px 0' }}>{getFormattedPrice(totalRevenue)}</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+14% since yesterday</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>SALES COMPLETED</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-heading)', marginBlock: '8px 0' }}>{totalSalesCount}</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>100% processing rate</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>TOTAL CUSTOMERS</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBlock: '8px 0' }}>42</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>2 registrations today</span>
              </div>

              <div className="glass" style={{ padding: '20px', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>CONVERSION RATE</span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--warning)', marginBlock: '8px 0' }}>3.8%</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Average cart funnel rates</span>
              </div>

            </div>

            {/* Custom chart mockups */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              
              {/* Monthly Revenue chart */}
              <div className="glass" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Monthly Revenue Overview</h3>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', borderBottom: '1px solid var(--border)', paddingInline: '10px' }}>
                  {[
                    { month: 'Jan', val: '40%' },
                    { month: 'Feb', val: '55%' },
                    { month: 'Mar', val: '35%' },
                    { month: 'Apr', val: '75%' },
                    { month: 'May', val: '90%' },
                    { month: 'Jun', val: '65%' },
                    { month: 'Jul', val: '80%' }
                  ].map((d) => (
                    <div key={d.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '40px' }}>
                      <div style={{ width: '100%', height: d.val, background: 'var(--primary)', borderRadius: '4px 4px 0 0' }}></div>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category distribution */}
              <div className="glass" style={{ padding: '24px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justify: 'space-between' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px' }}>Inventory By Category</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', justify: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span>Tech Accessories</span>
                      <strong>50%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                      <div style={{ width: '50%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justify: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span>Apparel & Bags</span>
                      <strong>30%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                      <div style={{ width: '30%', height: '100%', background: 'var(--success)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justify: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                      <span>Home & Living</span>
                      <strong>20%</strong>
                    </div>
                    <div style={{ height: '6px', background: 'var(--border)', borderRadius: '3px' }}>
                      <div style={{ width: '20%', height: '100%', background: 'var(--warning)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: PRODUCTS CRUD */}
        {activeTab === 'products' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Inventory Database</h3>
              <button
                onClick={() => {
                  setEditProductId(null);
                  setProdTitle('');
                  setProdPrice('');
                  setProdDiscount('');
                  setProdDescription('');
                  setProdSku('');
                  setProdBarcode('');
                  setShowProductForm(!showProductForm);
                }}
                className="btn btn-primary btn-sm"
              >
                {showProductForm ? 'Close Editor' : '+ Create Product'}
              </button>
            </div>

            {showProductForm && (
              <form onSubmit={handleProductSubmit} className="glass" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontWeight: 700, fontSize: '14px' }}>{editProductId ? 'Edit Product' : 'Create Product Entry'}</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" value={prodTitle} onChange={(e) => setProdTitle(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Retail Price ($)</label>
                    <input type="number" step="0.01" className="form-control" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Discount Price ($)</label>
                    <input type="number" step="0.01" className="form-control" value={prodDiscount} onChange={(e) => setProdDiscount(e.target.value)} placeholder="Optional" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-control" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}>
                      <option value="tech">Tech</option>
                      <option value="apparel">Apparel</option>
                      <option value="home">Home & Living</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Brand</label>
                    <select className="form-control" value={prodBrand} onChange={(e) => setProdBrand(e.target.value)}>
                      {initialBrands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock Inventory</label>
                    <input type="number" className="form-control" value={prodStock} onChange={(e) => setProdStock(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SKU Code</label>
                    <input type="text" className="form-control" value={prodSku} onChange={(e) => setProdSku(e.target.value)} placeholder="Optional" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" value={prodImgUrl} onChange={(e) => setProdImgUrl(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Barcode Code</label>
                    <input type="text" className="form-control" value={prodBarcode} onChange={(e) => setProdBarcode(e.target.value)} placeholder="Optional" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Description specs</label>
                  <textarea className="form-control" rows="3" value={prodDescription} onChange={(e) => setProdDescription(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  {editProductId ? 'Save Product Details' : 'Publish Product Catalog'}
                </button>
              </form>
            )}

            {/* Products Table list */}
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Product details</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div>
                            <strong>{p.title}</strong>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>SKU: {p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-primary">{p.category.toUpperCase()}</span></td>
                      <td><strong>{getFormattedPrice(p.discountPrice || p.price)}</strong></td>
                      <td>
                        <span style={{ color: p.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                          {p.stock} units
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleEditClick(p)} className="btn btn-secondary btn-sm" title="Edit">✏️</button>
                          <button onClick={() => adminDeleteProduct(p.id)} className="btn btn-danger btn-sm" title="Delete">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 3: ORDERS SHIPMENT */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Fulfillment Order Queue</h3>
            
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No client orders placed yet.</p>
            ) : (
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Order ID / Date</th>
                      <th>Customer Details</th>
                      <th>Total paid</th>
                      <th>Shipment Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id}>
                        <td>
                          <strong>{ord.id}</strong>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{ord.date}</p>
                        </td>
                        <td>
                          <span>{ord.shippingDetails.fullName}</span>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{ord.shippingDetails.email}</p>
                        </td>
                        <td><strong>{getFormattedPrice(ord.total)}</strong></td>
                        <td>
                          <span className={`badge ${ord.status === 'Delivered' ? 'badge-success' : ord.status === 'Cancelled' ? 'badge-danger' : 'badge-primary'}`}>
                            {ord.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select
                              value={ord.status}
                              onChange={(e) => adminUpdateOrderStatus(ord.id, e.target.value)}
                              className="form-control"
                              style={{ fontSize: '12px', padding: '4px 8px', width: '110px' }}
                            >
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            {ord.status === 'Return Requested' && (
                              <button onClick={() => adminApproveRefund(ord.id)} className="btn btn-primary btn-sm" style={{ fontSize: '11px' }}>
                                Approve Refund
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: CMS BLOG */}
        {activeTab === 'blog' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>CMS Blog Articles</h3>
              <button onClick={() => setShowBlogForm(!showBlogForm)} className="btn btn-primary btn-sm">
                {showBlogForm ? 'Close Form' : '+ Write Article'}
              </button>
            </div>

            {showBlogForm && (
              <form onSubmit={handleBlogSubmit} className="glass" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Article Title</label>
                  <input type="text" className="form-control" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-control" value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)}>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Technology">Technology</option>
                      <option value="Sustainability">Sustainability</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Blog Image URL</label>
                    <input type="text" className="form-control" value={blogImg} onChange={(e) => setBlogImg(e.target.value)} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Excerpt Outline</label>
                  <input type="text" className="form-control" value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Article Content</label>
                  <textarea className="form-control" rows="5" value={blogContent} onChange={(e) => setBlogContent(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Publish Blog Article
                </button>
              </form>
            )}

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Article details</th>
                    <th>Category</th>
                    <th>Publish Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.title}</strong></td>
                      <td><span className="badge badge-primary">{b.category}</span></td>
                      <td>{b.date}</td>
                      <td>
                        <button onClick={() => adminDeleteBlog(b.id)} className="btn btn-danger btn-sm">🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* Tab 5: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="glass" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>System Configuration Settings</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              
              <div className="form-group">
                <label className="form-label">Sales Tax Rate (%)</label>
                <input
                  type="number"
                  className="form-control"
                  value={storeTax}
                  onChange={(e) => setStoreTax(parseInt(e.target.value))}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <span className="form-label">API Gateways</span>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={smsGateway}
                    onChange={(e) => setSmsGateway(e.target.checked)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Enable Twilio SMS Notifications Gateway</span>
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>Enforce Two-Factor Authentication (2FA)</span>
                </label>
              </div>

            </div>

            <button onClick={() => alert('Settings Saved (Mocked)')} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Save Settings
            </button>
          </div>
        )}

      </main>

    </div>
  );
}
