import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, blogs, navigate, getFormattedPrice, t } = useContext(ShopContext);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const trendingProducts = products.slice(0, 4);
  const hotDeals = products.filter(p => p.discountPrice !== null).slice(0, 3);
  const recentBlogs = blogs.slice(0, 3);

  return (
    <div className="page-fade-in" style={{ paddingBottom: '64px' }}>
      
      {/* Hero Section */}
      <section className="hero-gradient" style={{ paddingBlock: '80px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <span className="badge badge-primary" style={{ padding: '6px 16px', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>New Season Arrival</span>
          <h1 className="serif-title" style={{ fontSize: '56px', fontWeight: 800, margin: 0, color: 'var(--text-heading)', maxWidth: '800px', lineHeight: 1.15 }}>
            A new standard for premium desktop accessories.
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '18px', maxWidth: '600px', margin: 0 }}>
            Minimal design. High contrast. Seamless performance. Explore our collection of premium mechanical keyboards, leather goods, and office essentials.
          </p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button onClick={() => navigate('shop')} className="btn btn-primary" style={{ borderRadius: '24px', paddingInline: '28px' }}>
              Shop Catalog
            </button>
            <button onClick={() => navigate('blog')} className="btn btn-secondary" style={{ borderRadius: '24px', paddingInline: '28px' }}>
              Read Articles
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="container" style={{ paddingBlock: '48px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px' }}>🚚</span>
            <h4 style={{ marginBlock: '12px 6px', fontWeight: 700 }}>Free Express Delivery</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Complimentary shipping for all orders over $100.</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px' }}>🛡️</span>
            <h4 style={{ marginBlock: '12px 6px', fontWeight: 700 }}>Secure Checkout</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>PCI-DSS compliant payments encrypted via SSL.</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px' }}>🔄</span>
            <h4 style={{ marginBlock: '12px 6px', fontWeight: 700 }}>30-Day Returns</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Easy refunds with pre-paid domestic shipping labels.</p>
          </div>
          <div style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '32px' }}>🤝</span>
            <h4 style={{ marginBlock: '12px 6px', fontWeight: 700 }}>24/7 AI Support</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>Instant responses via our automated helper bot.</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container" style={{ paddingBlock: '64px' }}>
        <h2 className="serif-title" style={{ fontSize: '28px', marginBottom: '32px', textAlign: 'center' }}>Explore Collections</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          
          <div
            onClick={() => navigate('shop')}
            style={{ cursor: 'pointer', position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden' }}
          >
            <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', textAlign: 'left' }}>
              <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: '8px' }}>Essential</span>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Tech Accessories</h3>
            </div>
          </div>

          <div
            onClick={() => navigate('shop')}
            style={{ cursor: 'pointer', position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden' }}
          >
            <img src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', textAlign: 'left' }}>
              <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: '8px' }}>Handcrafted</span>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Leather Apparel</h3>
            </div>
          </div>

          <div
            onClick={() => navigate('shop')}
            style={{ cursor: 'pointer', position: 'relative', height: '240px', borderRadius: '16px', overflow: 'hidden' }}
          >
            <img src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', textAlign: 'left' }}>
              <span className="badge badge-primary" style={{ width: 'fit-content', marginBottom: '8px' }}>Minimalist</span>
              <h3 style={{ color: 'white', margin: 0, fontSize: '20px' }}>Home & Office</h3>
            </div>
          </div>

        </div>
      </section>

      {/* Flash Sale Promo Banner */}
      <section className="container" style={{ marginBottom: '64px' }}>
        <div className="glass" style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center', padding: '40px', borderRadius: '20px', border: '1px solid var(--primary)' }}>
          <div style={{ flex: '1 1 350px', textAlign: 'left' }}>
            <span className="badge badge-danger" style={{ marginBottom: '12px' }}>Flash Promotion</span>
            <h2 className="serif-title" style={{ fontSize: '32px', margin: 0, fontWeight: 700, color: 'var(--text-heading)' }}>Limited Daily Deals</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>
              Act fast! Save up to 20% on selected design peripherals. Use coupon <code style={{ color: 'var(--primary)' }}>AURA10</code> for an extra 10% off your purchase.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Offers Expire In</span>
            <div style={{ display: 'flex', gap: '12px', fontSize: '28px', fontWeight: '800', fontFamily: 'monospace', color: 'var(--danger)', background: 'var(--bg-secondary)', padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              {formatTime(timeLeft)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexGrow: 1, justifyContent: 'flex-end' }}>
            <button onClick={() => navigate('shop')} className="btn btn-primary">
              View Flash Sales
            </button>
          </div>
        </div>
      </section>

      {/* Trending Products Grid */}
      <section className="container" style={{ marginBottom: '64px' }}>
        <div className="flex-between" style={{ marginBottom: '32px' }}>
          <h2 className="serif-title" style={{ fontSize: '28px', margin: 0 }}>Trending Hardware</h2>
          <button onClick={() => navigate('shop')} style={{ fontWeight: 600, color: 'var(--primary)' }}>
            Browse All Products →
          </button>
        </div>
        
        <div className="grid-cols-4">
          {trendingProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Featured Blogs */}
      <section className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: '64px' }}>
        <h2 className="serif-title" style={{ fontSize: '28px', marginBottom: '32px', textAlign: 'center' }}>From The Blog</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {recentBlogs.map((b) => (
            <div key={b.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => navigate('blog-detail', { blogId: b.id })}>
              <img src={b.image} alt="" style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  <span>{b.category}</span>
                  <span>•</span>
                  <span>{b.readTime}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBlock: '0 8px', color: 'var(--text-heading)' }}>{b.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{b.excerpt}</p>
                <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 700, marginTop: 'auto', paddingTop: '12px' }}>Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
