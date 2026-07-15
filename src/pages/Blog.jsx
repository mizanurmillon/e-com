import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Blog() {
  const { blogs, currentView, viewParams, navigate } = useContext(ShopContext);

  // If viewing detail page
  if (currentView === 'blog-detail') {
    const blogId = viewParams.blogId;
    const article = blogs.find((b) => b.id === blogId);

    if (!article) {
      return (
        <div className="container" style={{ padding: '64px', textAlign: 'center' }}>
          <h2>Article not found</h2>
          <button onClick={() => navigate('blog')} className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Blog</button>
        </div>
      );
    }

    const otherBlogs = blogs.filter((b) => b.id !== article.id).slice(0, 2);

    return (
      <div className="container page-fade-in" style={{ paddingBlock: '48px', maxWidth: '800px', textAlign: 'left' }}>
        
        {/* Back link */}
        <button onClick={() => navigate('blog')} style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← Back to Blog list
        </button>

        {/* Article Meta */}
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '8px' }}>
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="serif-title" style={{ fontSize: '40px', fontWeight: 800, color: 'var(--text-heading)', marginBlock: '4px 16px', lineHeight: 1.2 }}>
          {article.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>
            {article.author.charAt(0)}
          </div>
          <div>
            <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)', display: 'block' }}>{article.author}</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Staff Tech Journalist</span>
          </div>
        </div>

        {/* Feature Image */}
        <img
          src={article.image}
          alt=""
          style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '32px' }}
        />

        {/* Article Content formatted */}
        <article style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
          {article.content}
        </article>

        {/* Related articles deck */}
        {otherBlogs.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '64px', paddingTop: '32px' }}>
            <h3 className="serif-title" style={{ fontSize: '22px', marginBottom: '24px' }}>Recommended Reading</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {otherBlogs.map((b) => (
                <div key={b.id} className="product-card" style={{ cursor: 'pointer' }} onClick={() => navigate('blog-detail', { blogId: b.id })}>
                  <img src={b.image} alt="" style={{ height: '160px', width: '100%', objectFit: 'cover' }} />
                  <div style={{ padding: '16px', textAlign: 'left' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>{b.category} • {b.readTime}</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', margin: 0 }}>{b.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    );
  }

  // Blog list view
  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', textAlign: 'left' }}>
      
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '8px' }}>AURA JOURNAL</span>
        <h1 className="serif-title" style={{ fontSize: '40px', fontWeight: 800, margin: 0 }}>Articles & Desk Inspiration</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', maxWidth: '500px', margin: '8px auto 0' }}>
          Read design insights, mechanical keyboard switch theories, and tips on optimizing desk spaces.
        </p>
      </div>

      {/* Grid of article cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
        {blogs.map((b) => (
          <div key={b.id} className="product-card" style={{ cursor: 'pointer', height: '100%' }} onClick={() => navigate('blog-detail', { blogId: b.id })}>
            
            <img src={b.image} alt="" style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: 600 }}>
                <span>{b.category}</span>
                <span>•</span>
                <span>{b.readTime}</span>
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', marginBlock: '0 12px', lineHeight: 1.35 }}>
                {b.title}
              </h3>
              
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                {b.excerpt}
              </p>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                <span style={{ fontWeight: 600 }}>By {b.author}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Read Article →</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
