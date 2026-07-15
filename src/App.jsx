import React, { useContext, useState } from 'react';
import './App.css';
import { ShopProvider, ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ComparePanel from './components/ComparePanel';
import SupportWidget from './components/SupportWidget';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import Support from './pages/Support';
import Policies from './pages/Policies';
import AdminPanel from './pages/AdminPanel';

function MainApp() {
  const { currentView, toasts, navigate } = useContext(ShopContext);
  const [cartOpen, setCartOpen] = useState(false);

  // Simple, ultra-reliable View Router Switcher
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'auth':
        return <Auth />;
      case 'dashboard':
        return <Dashboard />;
      case 'blog':
      case 'blog-detail':
        return <Blog />;
      case 'support':
        return <Support />;
      case 'policies':
        return <Policies />;
      case 'admin':
        return <AdminPanel />;
      default:
        // Premium 404 View
        return (
          <div className="container" style={{ paddingBlock: '120px', textAlign: 'center' }}>
            <span style={{ fontSize: '72px' }}>⚠️</span>
            <h1 className="serif-title" style={{ fontSize: '40px', fontWeight: 800, marginBlock: '24px 12px' }}>404 - Page Not Found</h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 24px' }}>
              The premium layout or section you requested does not exist or has been shifted.
            </p>
            <button onClick={() => navigate('home')} className="btn btn-primary" style={{ borderRadius: '24px' }}>
              Return to Homepage
            </button>
          </div>
        );
    }
  };

  return (
    <>
      {/* Floating Toast Notification Box */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-msg ${toast.type}`}>
            <span>
              {toast.type === 'success' ? '✓' : toast.type === 'warning' ? '🗑️' : toast.type === 'danger' ? '⚠️' : '💡'}
            </span>
            <span>{toast.text}</span>
          </div>
        ))}
      </div>

      {/* Main Core Layout Structure */}
      <Navbar onOpenCart={() => setCartOpen(true)} />
      
      <div style={{ flexGrow: 1 }} className="page-fade-in">
        {renderView()}
      </div>

      <Footer />

      {/* Side Sliding Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Bottom Side-by-side Compare panel */}
      <ComparePanel />

      {/* support robot helper bot bubble & dialog window */}
      <SupportWidget />
    </>
  );
}

function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}

export default App;
