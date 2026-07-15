import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ProductDetail() {
  const { viewParams, products, addToCart, toggleWishlist, wishlist, addReview, getFormattedPrice, navigate } = useContext(ShopContext);
  const productId = viewParams.productId;

  const product = products.find((p) => p.id === productId);

  // If product not found, fallback or show message
  if (!product) {
    return (
      <div className="container" style={{ padding: '64px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button onClick={() => navigate('shop')} className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Shop</button>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors ? product.variants.colors[0] : '');
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes ? product.variants.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // desc, specs

  // Review Form States
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Update active image when product changes
  useEffect(() => {
    setActiveImage(product.images[0]);
    if (product.variants?.colors) setSelectedColor(product.variants.colors[0]);
    if (product.variants?.sizes) setSelectedSize(product.variants.sizes[0]);
    setQuantity(1);
  }, [product]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addReview(product.id, {
      user: reviewName,
      rating: reviewRating,
      comment: reviewComment
    });
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
  };

  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Frequently Bought Together (simulated recommendation)
  const bundleProduct = products.find((p) => p.id !== product.id && p.category === product.category);

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', textAlign: 'left' }}>
      
      {/* Back Button */}
      <button onClick={() => navigate('shop')} style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
        ← Back to Shop Catalog
      </button>

      {/* Main product layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px', marginBottom: '64px' }}>
        
        {/* Left Column: Image switcher */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Main Display Image */}
          <div className="glass" style={{ width: '100%', paddingTop: '80%', position: 'relative', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
            <img
              src={activeImage}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnail list */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                style={{ width: '80px', height: '80px', border: activeImage === img ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', padding: 0 }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: Spec details and actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>{product.brand}</span>
            <h1 className="serif-title" style={{ fontSize: '32px', marginBlock: '4px 8px', fontWeight: 700 }}>{product.title}</h1>
            
            {/* Review anchor status */}
            <a href="#reviews-anchor" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
              <span>⭐ {product.rating}</span>
              <span>•</span>
              <span style={{ textDecoration: 'underline' }}>{product.reviewsCount} customer reviews</span>
            </a>
          </div>

          {/* Pricing Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-heading)' }}>
              {getFormattedPrice(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '18px' }}>
                {getFormattedPrice(product.price)}
              </span>
            )}
          </div>

          <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: 1.6 }}>{product.description}</p>

          {/* SKU / Barcode display */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: 'var(--text-muted)', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
            <span><strong>SKU:</strong> {product.sku}</span>
            <span><strong>Barcode:</strong> {product.barcode}</span>
            <span>
              <strong>Availability:</strong>{' '}
              <span style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </span>
          </div>

          {/* Colors variant picker */}
          {product.variants?.colors && (
            <div>
              <span className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Color variant</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.variants.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="btn btn-secondary btn-sm"
                    style={{ border: selectedColor === c ? '2px solid var(--primary)' : '1px solid var(--border)', textTransform: 'capitalize', paddingInline: '16px' }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes variant picker */}
          {product.variants?.sizes && (
            <div>
              <span className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Size option</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.variants.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className="btn btn-secondary btn-sm"
                    style={{ border: selectedSize === s ? '2px solid var(--primary)' : '1px solid var(--border)', textTransform: 'capitalize', paddingInline: '16px' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector and actions */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '12px' }}>
            {/* Quantity box */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ paddingInline: '12px', fontWeight: 'bold' }}>-</button>
              <span style={{ paddingInline: '16px', fontWeight: 600 }}>{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} style={{ paddingInline: '12px', fontWeight: 'bold' }}>+</button>
            </div>

            <button
              onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
              disabled={product.stock === 0}
              className="btn btn-primary"
              style={{ flexGrow: 1, borderRadius: '8px' }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="btn btn-secondary"
              style={{ width: '48px', height: '48px', padding: 0, borderRadius: '8px', color: wishlist.includes(product.id) ? 'var(--danger)' : 'inherit' }}
            >
              ❤
            </button>
          </div>

        </div>
      </div>

      {/* Tabs description and specifications */}
      <section style={{ marginBottom: '64px' }}>
        <div className="tabs-header">
          <button onClick={() => setActiveTab('desc')} className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`}>Product Info</button>
          <button onClick={() => setActiveTab('specs')} className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}>Detailed Specifications</button>
        </div>
        
        {activeTab === 'desc' ? (
          <div className="glass" style={{ padding: '24px', borderRadius: '12px', lineHeight: 1.7 }}>
            <h4 style={{ marginBottom: '8px' }}>Features Overview</h4>
            <p>{product.description}</p>
            <ul style={{ marginTop: '12px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Premium grade raw materials utilized for maximum longevity and wear resistance.</li>
              <li>Minimal design footprint eliminates clutter, fits elegantly into any modern office or desk setup.</li>
              <li>Engineered with accessibility and ergonomics to optimize user comfort.</li>
            </ul>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <tbody>
                {Object.entries(product.attributes).map(([key, val]) => (
                  <tr key={key}>
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)', width: '250px' }}>{key}</td>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Frequently Bought Together Bundle */}
      {bundleProduct && (
        <section className="glass" style={{ padding: '32px', borderRadius: '20px', marginBottom: '64px', border: '1px solid var(--primary-light)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>🛍️ Frequently Bought Together</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' }}>
            {/* Product 1 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={product.images[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{product.title}</span>
                <p style={{ fontSize: '12px', color: 'var(--primary)', margin: 0 }}>{getFormattedPrice(product.discountPrice || product.price)}</p>
              </div>
            </div>
            
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-muted)' }}>+</span>

            {/* Product 2 */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <img src={bundleProduct.images[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
              <div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{bundleProduct.title}</span>
                <p style={{ fontSize: '12px', color: 'var(--primary)', margin: 0 }}>{getFormattedPrice(bundleProduct.discountPrice || bundleProduct.price)}</p>
              </div>
            </div>

            {/* Total Summary */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Total Price</span>
                <h4 style={{ fontSize: '18px', fontWeight: 800 }}>
                  {getFormattedPrice((product.discountPrice || product.price) + (bundleProduct.discountPrice || bundleProduct.price))}
                </h4>
              </div>
              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToCart(bundleProduct, 1);
                }}
                className="btn btn-primary btn-sm"
              >
                Add Both To Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section style={{ marginBottom: '64px' }}>
          <h3 className="serif-title" style={{ fontSize: '22px', marginBottom: '24px' }}>AI Recommended Products</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {relatedProducts.map((p) => (
              <div key={p.id} className="product-card" style={{ padding: '12px', cursor: 'pointer' }} onClick={() => navigate('product', { productId: p.id })}>
                <img src={p.images[0]} alt="" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBlock: '8px 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</h4>
                <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '14px' }}>{getFormattedPrice(p.discountPrice || p.price)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews Anchor Section */}
      <section id="reviews-anchor" style={{ borderTop: '1px solid var(--border)', paddingTop: '48px' }}>
        <h3 className="serif-title" style={{ fontSize: '24px', marginBottom: '24px' }}>Customer Reviews & Ratings</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '48px', alignItems: 'flex-start' }}>
          
          {/* Reviews List and input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Reviews Form */}
            <form onSubmit={handleReviewSubmit} className="glass" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Write a Review</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Review Stars</label>
                  <select
                    className="form-control"
                    value={reviewRating}
                    onChange={(e) => setReviewRating(e.target.value)}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Star)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Star)</option>
                    <option value={3}>⭐⭐⭐ (3 Star)</option>
                    <option value={2}>⭐⭐ (2 Star)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Comments</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Detail your product experience..."
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Submit Review
              </button>
            </form>

            {/* List entries */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((rev) => (
                  <div key={rev.id} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{rev.user}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rev.date}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBlock: '4px' }}>
                      <span style={{ color: 'var(--warning)' }}>{'★'.repeat(rev.rating)}</span>
                      {rev.verified && (
                        <span className="badge badge-success" style={{ fontSize: '9px', padding: '1px 6px' }}>Verified Buyer</span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--text)', margin: 0 }}>{rev.comment}</p>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No reviews yet. Be the first to review this product!</p>
              )}
            </div>

          </div>

          {/* Rating stats panel summary */}
          <div className="glass" style={{ padding: '32px', borderRadius: '16px' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '16px' }}>Rating Breakdown</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--text-heading)' }}>{product.rating}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <span style={{ color: 'var(--warning)' }}>{'★'.repeat(Math.round(product.rating))}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Based on {product.reviewsCount} customer opinions</span>
              </div>
            </div>

            {/* Simulated bar charts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = product.reviews ? product.reviews.filter((r) => r.rating === stars).length : 0;
                const total = product.reviews ? product.reviews.length : 1;
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px' }}>
                    <span style={{ width: '40px', textAlign: 'left' }}>{stars} star</span>
                    <div style={{ flexGrow: 1, height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--primary)' }}></div>
                    </div>
                    <span style={{ width: '30px', textAlign: 'right' }}>{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
