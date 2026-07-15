import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function ComparePanel() {
  const { compareList, products, toggleCompare, addToCart, getFormattedPrice } = useContext(ShopContext);

  if (compareList.length === 0) return null;

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  // Get unique attributes keys
  const attributeKeys = Array.from(
    new Set(comparedProducts.flatMap((p) => Object.keys(p.attributes || {})))
  );

  return (
    <div className="compare-deck open glass" style={{ borderTop: '3px solid var(--primary)', position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 999, padding: '24px', maxHeight: '450px', overflowY: 'auto' }}>
      
      {/* Panel Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚖️ Product Comparison Deck
            <span className="badge badge-primary">{compareList.length} / 3 selected</span>
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>Compare features and specifications side-by-side.</p>
        </div>
        <button onClick={() => compareList.forEach((id) => toggleCompare(id))} className="btn btn-secondary btn-sm" style={{ fontSize: '11px' }}>
          Clear All
        </button>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `150px repeat(${comparedProducts.length}, 1fr)`, gap: '16px' }}>
        
        {/* Left Column: Attribute labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', fontWeight: 600, fontSize: '13px', color: 'var(--text-muted)', paddingTop: '90px' }}>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Brand</div>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Price</div>
          <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>Rating</div>
          {attributeKeys.map((key) => (
            <div key={key} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', textTransform: 'capitalize' }}>
              {key}
            </div>
          ))}
        </div>

        {/* Product Columns */}
        {comparedProducts.map((p) => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', borderLeft: '1px solid var(--border)', paddingLeft: '16px' }}>
            
            {/* Remove Compare button */}
            <button onClick={() => toggleCompare(p.id)} style={{ position: 'absolute', top: 0, right: 0, color: 'var(--danger)', fontWeight: 'bold', fontSize: '16px' }} title="Remove">
              ×
            </button>

            {/* Product card info */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', height: '80px', textAlign: 'left' }}>
              <img src={p.images[0]} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} />
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', margin: 0, maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.title}
                </h4>
                <button onClick={() => addToCart(p, 1)} style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                  + Add to Cart
                </button>
              </div>
            </div>

            {/* Attribute Values */}
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', fontSize: '13px', color: 'var(--text-heading)', fontWeight: 500, textAlign: 'left' }}>
              {p.brand}
            </div>
            
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', fontSize: '13px', fontWeight: 700, color: 'var(--primary)', textAlign: 'left' }}>
              {getFormattedPrice(p.discountPrice || p.price)}
            </div>

            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', fontSize: '13px', color: 'var(--text-heading)', textAlign: 'left' }}>
              ⭐ {p.rating} ({p.reviewsCount})
            </div>

            {attributeKeys.map((key) => (
              <div key={key} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'left' }}>
                {p.attributes[key] || '—'}
              </div>
            ))}

          </div>
        ))}

      </div>

    </div>
  );
}
