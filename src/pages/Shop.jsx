import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { initialBrands, initialCategories } from '../data/mockData';

export default function Shop() {
  const {
    products,
    getFormattedPrice,
    t,
    // Filters States
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
    ratingFilter,
    setRatingFilter,
    stockFilter,
    setStockFilter,
    colorFilter,
    setColorFilter,
    sizeFilter,
    setSizeFilter,
    sortOrder,
    setSortOrder
  } = useContext(ShopContext);

  // Apply filters in memory
  let filteredProducts = products.filter((p) => {
    // Search query matching
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchTags = p.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchBrand && !matchTags) return false;
    }

    // Category matching
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }

    // Brand matching
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
      return false;
    }

    // Price range matching
    const actualPrice = p.discountPrice || p.price;
    if (actualPrice < priceRange[0] || actualPrice > priceRange[1]) {
      return false;
    }

    // Rating filter
    if (p.rating < ratingFilter) {
      return false;
    }

    // Stock availability filter
    if (stockFilter === 'instock' && p.stock === 0) return false;
    if (stockFilter === 'outofstock' && p.stock > 0) return false;

    // Color filter
    if (colorFilter !== 'all') {
      const hasColor = p.variants?.colors?.some(c => c.toLowerCase().includes(colorFilter.toLowerCase()));
      if (!hasColor) return false;
    }

    // Size filter
    if (sizeFilter !== 'all') {
      const hasSize = p.variants?.sizes?.some(s => s.toLowerCase().includes(sizeFilter.toLowerCase()));
      if (!hasSize) return false;
    }

    return true;
  });

  // Apply sorting
  filteredProducts.sort((a, b) => {
    const aPrice = a.discountPrice || a.price;
    const bPrice = b.discountPrice || b.price;

    if (sortOrder === 'price-low') return aPrice - bPrice;
    if (sortOrder === 'price-high') return bPrice - aPrice;
    if (sortOrder === 'rating') return b.rating - a.rating;
    
    // Default newest (by id desc)
    return b.id - a.id;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 500]);
    setRatingFilter(0);
    setStockFilter('all');
    setColorFilter('all');
    setSizeFilter('all');
    setSortOrder('newest');
  };

  const isFilterActive =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedBrand !== 'all' ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 500 ||
    ratingFilter !== 0 ||
    stockFilter !== 'all' ||
    colorFilter !== 'all' ||
    sizeFilter !== 'all';

  const allColors = ['black', 'cream', 'gray', 'silver', 'brown', 'gold', 'slate', 'olive'];
  const allSizes = ['tenkeyless', 'full size', 'standard', '35l', '45l', 'small', 'medium', 'large', 'x-large'];

  return (
    <div className="container page-fade-in" style={{ paddingBlock: '48px', display: 'flex', gap: '32px' }}>
      
      {/* Left Sidebar Filter Section */}
      <aside style={{ width: '280px', flexShrink: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Filter Title Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{t('filterBy')}</h3>
          {isFilterActive && (
            <button onClick={clearAllFilters} style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600 }}>
              Reset All
            </button>
          )}
        </div>

        {/* Search input inside sidebar */}
        <div className="form-group">
          <label className="form-label">Keyword Search</label>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type search terms..."
            style={{ fontSize: '13px' }}
          />
        </div>

        {/* Categories selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">{t('categories')}</h4>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{ padding: '8px 12px', borderRadius: '6px', textAlign: 'left', fontSize: '14px', background: selectedCategory === 'all' ? 'var(--primary-light)' : 'transparent', color: selectedCategory === 'all' ? 'var(--primary)' : 'inherit', fontWeight: selectedCategory === 'all' ? 700 : 500 }}
          >
            All Collections
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{ padding: '8px 12px', borderRadius: '6px', textAlign: 'left', fontSize: '14px', background: selectedCategory === cat.id ? 'var(--primary-light)' : 'transparent', color: selectedCategory === cat.id ? 'var(--primary)' : 'inherit', fontWeight: selectedCategory === cat.id ? 700 : 500 }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Brands selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">{t('brands')}</h4>
          <select
            className="form-control"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            style={{ fontSize: '13px' }}
          >
            <option value="all">All Brands</option>
            {initialBrands.map((br) => (
              <option key={br} value={br}>{br}</option>
            ))}
          </select>
        </div>

        {/* Price Slider filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 className="form-label">{t('priceRange')}</h4>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>Up to {getFormattedPrice(priceRange[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{ accentColor: 'var(--primary)', width: '100%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>

        {/* Ratings Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">{t('rating')}</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[4, 3, 2].map((stars) => (
              <label key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="rating-select"
                  checked={ratingFilter === stars}
                  onChange={() => setRatingFilter(stars)}
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span>⭐ {stars} & above</span>
              </label>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="rating-select"
                checked={ratingFilter === 0}
                onChange={() => setRatingFilter(0)}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>All Ratings</span>
            </label>
          </div>
        </div>

        {/* Availability Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">Availability</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="stock-select"
                checked={stockFilter === 'all'}
                onChange={() => setStockFilter('all')}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>Show All</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="stock-select"
                checked={stockFilter === 'instock'}
                onChange={() => setStockFilter('instock')}
                style={{ accentColor: 'var(--primary)' }}
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Color filter tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">Colors</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <button
              onClick={() => setColorFilter('all')}
              style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: colorFilter === 'all' ? 'var(--primary)' : 'transparent', color: colorFilter === 'all' ? 'white' : 'inherit' }}
            >
              All
            </button>
            {allColors.map((col) => (
              <button
                key={col}
                onClick={() => setColorFilter(col)}
                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: colorFilter === col ? 'var(--primary)' : 'transparent', color: colorFilter === col ? 'white' : 'inherit', textTransform: 'capitalize' }}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Size filter tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h4 className="form-label">Sizes / Variants</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <button
              onClick={() => setSizeFilter('all')}
              style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: sizeFilter === 'all' ? 'var(--primary)' : 'transparent', color: sizeFilter === 'all' ? 'white' : 'inherit' }}
            >
              All
            </button>
            {allSizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setSizeFilter(sz)}
                style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border)', background: sizeFilter === sz ? 'var(--primary)' : 'transparent', color: sizeFilter === sz ? 'white' : 'inherit', textTransform: 'capitalize' }}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

      </aside>

      {/* Main Shop Results Column */}
      <main style={{ flexGrow: 1 }}>
        
        {/* Top Controls Bar */}
        <div className="glass" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
              Showing {filteredProducts.length} Results
            </span>
            {searchQuery && (
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px' }}>
                for "{searchQuery}"
              </span>
            )}
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600 }}>{t('sortBy')}</span>
            <select
              className="form-control"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              style={{ width: '150px', fontSize: '13px', paddingBlock: '6px' }}
            >
              <option value="newest">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Results Grid list */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px', border: '1px dashed var(--border)', borderRadius: '12px', marginTop: '16px' }}>
            <span style={{ fontSize: '48px' }}>🔍</span>
            <h3 style={{ marginBlock: '16px 8px' }}>No products found matching filters</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 16px' }}>
              Try broadening your keyword queries, resetting price sliders, or removing brand constraints.
            </p>
            <button onClick={clearAllFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid-cols-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
