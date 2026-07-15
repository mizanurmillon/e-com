import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, toggleCompare, addToCart, wishlist, compareList, getFormattedPrice, navigate } = useContext(ShopContext);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const priceToShow = product.discountPrice || product.price;

  return (
    <div className="product-card">
      {/* Product Badges */}
      <div className="card-badge">
        {product.stock <= 3 && product.stock > 0 && (
          <span className="badge badge-warning" style={{ marginRight: '4px' }}>Low Stock</span>
        )}
        {product.stock === 0 && (
          <span className="badge badge-danger" style={{ marginRight: '4px' }}>Out of Stock</span>
        )}
        {product.discountPrice && (
          <span className="badge badge-success">Sale</span>
        )}
      </div>

      {/* Wishlist toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
        className={`card-wishlist ${isWishlisted ? 'active' : ''}`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        ❤
      </button>

      {/* Product Image */}
      <div className="card-img-container" style={{ cursor: 'pointer' }} onClick={() => navigate('product', { productId: product.id })}>
        <img src={product.images[0]} alt={product.title} className="card-img" />
      </div>

      {/* Card Content */}
      <div className="card-content">
        <span className="card-brand">{product.brand}</span>
        <h3
          onClick={() => navigate('product', { productId: product.id })}
          className="card-title"
          style={{ cursor: 'pointer', fontSize: '15px', fontWeight: 600, marginBlock: '4px 8px' }}
        >
          {product.title}
        </h3>

        {/* Rating stars display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--warning)' }}>★</span>
          <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount})</span>
        </div>

        {/* Price Row */}
        <div className="card-price-row">
          <span className="price-current">{getFormattedPrice(priceToShow)}</span>
          {product.discountPrice && (
            <span className="price-old">{getFormattedPrice(product.price)}</span>
          )}
        </div>

        {/* Compare / Quick Add Actions */}
        <div className="card-footer-actions">
          <button
            onClick={() => toggleCompare(product.id)}
            className={`btn btn-secondary btn-sm ${isCompared ? 'btn-outline' : ''}`}
            style={{ flexGrow: 1, paddingBlock: '6px' }}
          >
            {isCompared ? '⚖️ Added' : '⚖️ Compare'}
          </button>
          
          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className="btn btn-primary btn-sm"
            style={{ paddingBlock: '6px' }}
            title="Add to Cart"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
