import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

export default function Navbar({ onOpenCart }) {
  const {
    currentView,
    navigate,
    language,
    setLanguage,
    currency,
    setCurrency,
    theme,
    toggleTheme,
    user,
    logoutUser,
    wishlist,
    compareList,
    cart,
    searchQuery,
    setSearchQuery,
    suggestions,
    t
  } = useContext(ShopContext);

  const [searchFocused, setSearchFocused] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSuggestionClick = (pId) => {
    setSearchQuery('');
    setSearchFocused(false);
    navigate('product', { productId: pId });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchFocused(false);
    navigate('shop');
  };

  const notificationList = [
    { id: 1, text: '🎉 Coupon code AURA10 active: Save 10%!', date: 'Recent' },
    { id: 2, text: '🚚 Free shipping applied automatically on orders over $100', date: 'Recent' }
  ];

  return (
    <header className="glass" style={{ sticky: 'top', top: 0, zIndex: 100, borderBottom: '1px solid var(--border)', position: 'sticky' }}>
      {/* Top Banner Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 24px', fontSize: '12px', borderBottom: '1px solid var(--border)', background: 'var(--bg-secondary)', fontWeight: 500 }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>🚀 {t('points')}: {user ? user.points : 0} pts</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('policies')}>{t('terms')}</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Language Selector */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowLangMenu(!showLangMenu); setShowCurrMenu(false); }} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              🌐 {language.toUpperCase()} ▾
            </button>
            {showLangMenu && (
              <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 110, display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', minWidth: '100px', marginTop: '4px' }}>
                <button onClick={() => { setLanguage('en'); setShowLangMenu(false); }} style={{ padding: '6px', textAlign: 'left', borderRadius: '4px' }}>English</button>
                <button onClick={() => { setLanguage('es'); setShowLangMenu(false); }} style={{ padding: '6px', textAlign: 'left', borderRadius: '4px' }}>Español</button>
                <button onClick={() => { setLanguage('bn'); setShowLangMenu(false); }} style={{ padding: '6px', textAlign: 'left', borderRadius: '4px' }}>বাংলা</button>
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setShowCurrMenu(!showCurrMenu); setShowLangMenu(false); }} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              💰 {currency} ▾
            </button>
            {showCurrMenu && (
              <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 110, display: 'flex', flexDirection: 'column', gap: '4px', padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', minWidth: '80px', marginTop: '4px' }}>
                <button onClick={() => { setCurrency('USD'); setShowCurrMenu(false); }} style={{ padding: '6px', textAlign: 'left' }}>USD ($)</button>
                <button onClick={() => { setCurrency('EUR'); setShowCurrMenu(false); }} style={{ padding: '6px', textAlign: 'left' }}>EUR (€)</button>
                <button onClick={() => { setCurrency('BDT'); setShowCurrMenu(false); }} style={{ padding: '6px', textAlign: 'left' }}>BDT (৳)</button>
              </div>
            )}
          </div>

          {/* Theme Toggler */}
          <button className="theme-switch" onClick={toggleTheme} style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', background: 'none' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: '14px', gap: '16px' }}>
        {/* Brand Logo */}
        <div onClick={() => navigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="serif-title" style={{ fontSize: '24px', letterSpacing: '-0.5px', color: 'var(--primary)', fontWeight: 800 }}>AURA</span>
          <span className="badge badge-primary" style={{ fontSize: '9px' }}>PRO</span>
        </div>

        {/* Global Smart Search Bar */}
        <form onSubmit={handleSearchSubmit} className="header-search-container" style={{ flexGrow: 1, maxWidth: '400px', display: 'flex', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder={t('search')}
            style={{ borderRadius: '24px', paddingLeft: '40px' }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>🔍</span>
          
          {/* Autocomplete Suggestions */}
          {searchFocused && suggestions.length > 0 && (
            <div className="suggestions-box">
              {suggestions.map((p) => (
                <div key={p.id} onMouseDown={() => handleSuggestionClick(p.id)} className="suggestion-item">
                  <img src={p.images[0]} alt="" style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)' }}>{p.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--primary)' }}>{p.brand} - {p.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button onClick={() => navigate('home')} style={{ fontWeight: currentView === 'home' ? '700' : '500', color: currentView === 'home' ? 'var(--primary)' : 'inherit' }}>{t('home')}</button>
          <button onClick={() => navigate('shop')} style={{ fontWeight: currentView === 'shop' ? '700' : '500', color: currentView === 'shop' ? 'var(--primary)' : 'inherit' }}>{t('shop')}</button>
          <button onClick={() => navigate('blog')} style={{ fontWeight: currentView === 'blog' ? '700' : '500', color: currentView === 'blog' ? 'var(--primary)' : 'inherit' }}>{t('blog')}</button>
          <button onClick={() => navigate('support')} style={{ fontWeight: currentView === 'support' ? '700' : '500', color: currentView === 'support' ? 'var(--primary)' : 'inherit' }}>{t('support')}</button>
        </nav>

        {/* Icons Bar */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Compare counter */}
          {compareList.length > 0 && (
            <button onClick={() => navigate('shop')} style={{ position: 'relative' }} title="Compare List">
              ⚖️
              <span className="badge badge-primary" style={{ position: 'absolute', top: '-8px', right: '-8px', fontSize: '9px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justify: 'center' }}>{compareList.length}</span>
            </button>
          )}

          {/* Wishlist */}
          <button onClick={() => navigate(user ? 'dashboard' : 'auth')} style={{ position: 'relative' }} title={t('wishlist')}>
            ♡
            {wishlist.length > 0 && (
              <span className="badge badge-danger" style={{ position: 'absolute', top: '-8px', right: '-8px', fontSize: '9px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justify: 'center' }}>{wishlist.length}</span>
            )}
          </button>

          {/* Notifications Trigger */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ fontSize: '18px' }} title="Notifications">
              🔔
              <span className="badge badge-primary" style={{ position: 'absolute', top: '-4px', right: '-4px', width: '6px', height: '6px', padding: 0 }}></span>
            </button>
            {showNotifications && (
              <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, zIndex: 110, width: '280px', padding: '12px', border: '1px solid var(--border)', borderRadius: '8px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '13px', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px' }}>Notifications</h4>
                {notificationList.map((n) => (
                  <div key={n.id} style={{ fontSize: '11px', lineHeight: 1.4, borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                    <p style={{ margin: 0 }}>{n.text}</p>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{n.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Bag */}
          <button onClick={onOpenCart} style={{ position: 'relative', background: 'var(--primary-light)', padding: '6px 12px', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', border: '1px solid hsl(var(--primary-hsl), 0.1)' }} className="glow-hover">
            <span>🛒</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary)' }}>{cart.reduce((sum, i) => sum + i.quantity, 0)}</span>
          </button>

          {/* User Portal Link */}
          {user ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => navigate(user.role === 'admin' ? 'admin' : 'dashboard')}
                className="btn btn-secondary btn-sm"
                style={{ borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                👤 <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name.split(' ')[0]}</span>
              </button>
            </div>
          ) : (
            <button onClick={() => navigate('auth')} className="btn btn-primary btn-sm" style={{ borderRadius: '20px' }}>
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
