import React, { createContext, useState, useEffect } from 'react';
import { initialProducts, initialCategories, initialBlogs, initialFAQs, initialBrands } from '../data/mockData';

export const ShopContext = createContext();

const CURRENCY_CONVERSION = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  BDT: { symbol: '৳', rate: 117.5 }
};

const TRANSLATIONS = {
  en: {
    home: 'Home',
    shop: 'Shop',
    blog: 'Blog',
    support: 'Support',
    terms: 'Terms & Policies',
    admin: 'Admin Panel',
    dashboard: 'Dashboard',
    cart: 'Shopping Cart',
    wishlist: 'Wishlist',
    login: 'Login',
    search: 'Search products...',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    checkout: 'Checkout',
    categories: 'Categories',
    brands: 'Brands',
    newArrivals: 'New Arrivals',
    bestSellers: 'Best Sellers',
    quickView: 'Quick View',
    compare: 'Compare',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    filterBy: 'Filter By',
    sortBy: 'Sort By',
    priceRange: 'Price Range',
    rating: 'Rating',
    points: 'Loyalty Points',
    orderHistory: 'Order History',
    profile: 'My Profile',
    logout: 'Logout'
  },
  es: {
    home: 'Inicio',
    shop: 'Tienda',
    blog: 'Blog',
    support: 'Soporte',
    terms: 'Términos',
    admin: 'Panel Admin',
    dashboard: 'Panel Usuario',
    cart: 'Carrito',
    wishlist: 'Favoritos',
    login: 'Iniciar Sesión',
    search: 'Buscar productos...',
    addToCart: 'Añadir al Carrito',
    buyNow: 'Comprar Ahora',
    checkout: 'Pagar',
    categories: 'Categorías',
    brands: 'Marcas',
    newArrivals: 'Novedades',
    bestSellers: 'Más Vendidos',
    quickView: 'Vista Rápida',
    compare: 'Comparar',
    outOfStock: 'Agotado',
    inStock: 'En Stock',
    filterBy: 'Filtrar por',
    sortBy: 'Ordenar por',
    priceRange: 'Rango de Precios',
    rating: 'Calificación',
    points: 'Puntos de Lealtad',
    orderHistory: 'Historial de Pedidos',
    profile: 'Mi Perfil',
    logout: 'Cerrar Sesión'
  },
  bn: {
    home: 'হোম',
    shop: 'শপ',
    blog: 'ব্লগ',
    support: 'সাপোর্ট',
    terms: 'শর্তাবলী',
    admin: 'অ্যাডমিন প্যানেল',
    dashboard: 'ড্যাশবোর্ড',
    cart: 'কার্ট',
    wishlist: 'উইশলিস্ট',
    login: 'লগইন',
    search: 'পণ্য খুঁজুন...',
    addToCart: 'কার্টে যোগ করুন',
    buyNow: 'এখনই কিনুন',
    checkout: 'চেকআউট',
    categories: 'ক্যাটাগরি',
    brands: 'ব্র্যান্ড',
    newArrivals: 'নতুন পণ্য',
    bestSellers: 'বেস্ট সেলার',
    quickView: 'কুইক ভিউ',
    compare: 'তুলনা করুন',
    outOfStock: 'স্টক নেই',
    inStock: 'স্টকে আছে',
    filterBy: 'ফিল্টার করুন',
    sortBy: 'ক্রমানুসারে সাজান',
    priceRange: 'মূল্যের পরিসীমা',
    rating: 'রেটিং',
    points: 'লয়্যালটি পয়েন্ট',
    orderHistory: 'অর্ডারের ইতিহাস',
    profile: 'প্রোফাইল',
    logout: 'লগআউট'
  }
};

export const ShopProvider = ({ children }) => {
  // Navigation / Routing
  const [currentView, setCurrentView] = useState('home'); // home, shop, product, cart, checkout, auth, dashboard, blog, blog-detail, support, terms, admin
  const [viewParams, setViewParams] = useState({});

  // Localization & Theme
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('light');

  // Database States (loaded from localStorage or defaults)
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [stockFilter, setStockFilter] = useState('all'); // all, instock, outofstock
  const [colorFilter, setColorFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest'); // price-low, price-high, rating, newest

  // Toast notification state
  const [toasts, setToasts] = useState([]);

  // Active Promo Code
  const [activeCoupon, setActiveCoupon] = useState(null); // { code, discountPercent, discountValue }

  // Search auto suggestions
  const [suggestions, setSuggestions] = useState([]);

  // Live support bot chat log
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Aura Helper. How can I assist you today? You can ask about "shipping", "refunds", "payment", or check your "orders".' }
  ]);

  // Load Database from LocalStorage
  useEffect(() => {
    const localProducts = localStorage.getItem('aura_products');
    if (localProducts) {
      setProducts(JSON.parse(localProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('aura_products', JSON.stringify(initialProducts));
    }

    const localBlogs = localStorage.getItem('aura_blogs');
    if (localBlogs) {
      setBlogs(JSON.parse(localBlogs));
    } else {
      setBlogs(initialBlogs);
      localStorage.setItem('aura_blogs', JSON.stringify(initialBlogs));
    }

    const localCart = localStorage.getItem('aura_cart');
    if (localCart) setCart(JSON.parse(localCart));

    const localWishlist = localStorage.getItem('aura_wishlist');
    if (localWishlist) setWishlist(JSON.parse(localWishlist));

    const localOrders = localStorage.getItem('aura_orders');
    if (localOrders) setOrders(JSON.parse(localOrders));

    const localTickets = localStorage.getItem('aura_tickets');
    if (localTickets) setTickets(JSON.parse(localTickets));

    const localUser = localStorage.getItem('aura_user');
    if (localUser) setUser(JSON.parse(localUser));

    // Theme setup
    const savedTheme = localStorage.getItem('aura_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Sync helpers
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('aura_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('aura_wishlist', JSON.stringify(newWishlist));
  };

  const saveOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('aura_orders', JSON.stringify(newOrders));
  };

  const saveProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem('aura_products', JSON.stringify(newProducts));
  };

  const saveBlogs = (newBlogs) => {
    setBlogs(newBlogs);
    localStorage.setItem('aura_blogs', JSON.stringify(newBlogs));
  };

  const saveTickets = (newTickets) => {
    setTickets(newTickets);
    localStorage.setItem('aura_tickets', JSON.stringify(newTickets));
  };

  const saveUserSession = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('aura_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('aura_user');
    }
  };

  // Toast Trigger
  const triggerToast = (text, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Helper Navigation with Scroll Top
  const navigate = (view, params = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('aura_theme', nextTheme);
    triggerToast(nextTheme === 'dark' ? 'Dark Mode Activated' : 'Light Mode Activated', 'info');
  };

  // Currency Converter & Price Text Getter
  const getFormattedPrice = (amount) => {
    const conf = CURRENCY_CONVERSION[currency];
    const converted = (amount * conf.rate).toFixed(2);
    return `${conf.symbol}${converted}`;
  };

  // Translations Translator Getter
  const t = (key) => {
    return TRANSLATIONS[language][key] || key;
  };

  // Auto Suggestion generator on search change
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSuggestions([]);
      return;
    }
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5);
    setSuggestions(filtered);
  }, [searchQuery, products]);

  // Cart operations
  const addToCart = (product, quantity = 1, color = '', size = '') => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    let newCart = [...cart];
    const itemPrice = product.discountPrice || product.price;

    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        id: product.id,
        title: product.title,
        image: product.images[0],
        price: itemPrice,
        color,
        size,
        quantity,
        sku: product.sku
      });
    }

    saveCart(newCart);
    triggerToast(`Added ${quantity} x ${product.title} to Cart`, 'success');
  };

  const removeFromCart = (index) => {
    const title = cart[index].title;
    const newCart = cart.filter((_, idx) => idx !== index);
    saveCart(newCart);
    triggerToast(`Removed ${title} from Cart`, 'warning');
  };

  const updateCartQuantity = (index, newQty) => {
    if (newQty < 1) return;
    let newCart = [...cart];
    newCart[index].quantity = newQty;
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    let newWishlist = [...wishlist];
    const index = newWishlist.indexOf(productId);
    if (index > -1) {
      newWishlist.splice(index, 1);
      triggerToast('Removed from Wishlist', 'warning');
    } else {
      newWishlist.push(productId);
      triggerToast('Added to Wishlist', 'success');
    }
    saveWishlist(newWishlist);
  };

  // Product Compare toggle
  const toggleCompare = (productId) => {
    let newCompare = [...compareList];
    const index = newCompare.indexOf(productId);
    if (index > -1) {
      newCompare.splice(index, 1);
      triggerToast('Removed from Compare Panel', 'warning');
    } else {
      if (newCompare.length >= 3) {
        triggerToast('You can compare a maximum of 3 products', 'warning');
        return;
      }
      newCompare.push(productId);
      triggerToast('Added to Compare Panel', 'success');
    }
    setCompareList(newCompare);
  };

  // Promo Code Coupons
  const applyCoupon = (code) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'AURA10') {
      setActiveCoupon({ code: 'AURA10', percent: 10, value: 0 });
      triggerToast('Promo code applied: 10% Discount!', 'success');
      return true;
    } else if (cleanCode === 'LOYALTY20') {
      if (!user || user.points < 2000) {
        triggerToast('Insufficient loyalty points (needs 2000 pts)', 'danger');
        return false;
      }
      setActiveCoupon({ code: 'LOYALTY20', percent: 0, value: 20.00 });
      triggerToast('Applied $20.00 Loyalty Credit Discount!', 'success');
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setActiveCoupon({ code: 'FREESHIP', percent: 0, value: 0, freeShipping: true });
      triggerToast('Free Shipping Code Applied!', 'success');
      return true;
    } else {
      triggerToast('Invalid Promo Code', 'danger');
      return false;
    }
  };

  // Checkout and Place Order
  const placeOrder = (shippingDetails, paymentMethod, cardDetails = null) => {
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Apply discount coupons
    let discount = 0;
    let freeShippingCode = false;
    if (activeCoupon) {
      if (activeCoupon.percent > 0) {
        discount = subtotal * (activeCoupon.percent / 100);
      } else if (activeCoupon.value > 0) {
        discount = activeCoupon.value;
      }
      if (activeCoupon.freeShipping) {
        freeShippingCode = true;
      }
    }

    const shippingCost = (subtotal >= 100 || freeShippingCode) ? 0 : 9.99;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shippingCost + tax;

    // Loyalty points calculation: 1$ spent = 5 points
    const earnedPoints = Math.round(total * 5);

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const trackingCode = 'TRK-' + Math.floor(100000000 + Math.random() * 900000000);

    const newOrder = {
      id: orderId,
      trackingCode,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      discount,
      shippingCost,
      tax,
      total,
      earnedPoints,
      shippingDetails,
      paymentMethod,
      cardDetails: cardDetails ? { last4: cardDetails.number.slice(-4) } : null,
      status: 'Processing', // Processing, Shipped, Delivered, Cancelled, Return Requested, Refunded
      returnRequest: null
    };

    // Update orders list
    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    // Update user session and profile loyalty points
    if (user) {
      let currentPoints = user.points || 0;
      // Deduct points if loyalty coupon used
      if (activeCoupon && activeCoupon.code === 'LOYALTY20') {
        currentPoints = Math.max(0, currentPoints - 2000);
      }
      const updatedUser = {
        ...user,
        points: currentPoints + earnedPoints,
        orders: [orderId, ...(user.orders || [])]
      };
      saveUserSession(updatedUser);
    }

    // Deduct stock levels from products
    const updatedProducts = products.map((prod) => {
      const cartItem = cart.find((item) => item.id === prod.id);
      if (cartItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartItem.quantity)
        };
      }
      return prod;
    });
    saveProducts(updatedProducts);

    // Clear cart and active coupons
    clearCart();
    setActiveCoupon(null);
    triggerToast(`Order Placed Successfully! Earned ${earnedPoints} loyalty points.`, 'success');
    
    return newOrder;
  };

  const cancelOrder = (orderId, reason) => {
    const updatedOrders = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: 'Cancelled', cancelReason: reason };
      }
      return ord;
    });
    saveOrders(updatedOrders);
    triggerToast(`Order ${orderId} Cancelled`, 'warning');
  };

  const requestReturn = (orderId, reason) => {
    const updatedOrders = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: 'Return Requested', returnRequest: { reason, status: 'Pending' } };
      }
      return ord;
    });
    saveOrders(updatedOrders);
    triggerToast(`Return request submitted for ${orderId}`, 'info');
  };

  // Add Product Review
  const addReview = (productId, reviewObj) => {
    const updatedProducts = products.map((prod) => {
      if (prod.id === productId) {
        const nextReviews = [
          {
            id: Date.now(),
            user: reviewObj.user,
            rating: parseInt(reviewObj.rating),
            date: new Date().toISOString().split('T')[0],
            comment: reviewObj.comment,
            verified: user ? true : false
          },
          ...(prod.reviews || [])
        ];
        
        // Calculate new rating
        const sum = nextReviews.reduce((acc, r) => acc + r.rating, 0);
        const newRating = parseFloat((sum / nextReviews.length).toFixed(1));

        return {
          ...prod,
          reviews: nextReviews,
          rating: newRating,
          reviewsCount: nextReviews.length
        };
      }
      return prod;
    });

    saveProducts(updatedProducts);
    triggerToast('Review submitted successfully!', 'success');
  };

  // Support Tickets management
  const addTicket = (subject, category, message) => {
    const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      id: ticketId,
      date: new Date().toISOString().split('T')[0],
      subject,
      category,
      message,
      status: 'Open',
      messages: [{ sender: 'user', text: message, date: new Date().toISOString() }]
    };
    const updatedTickets = [newTicket, ...tickets];
    saveTickets(updatedTickets);
    
    if (user) {
      const updatedUser = {
        ...user,
        tickets: [ticketId, ...(user.tickets || [])]
      };
      saveUserSession(updatedUser);
    }

    triggerToast(`Ticket ${ticketId} created successfully. We will respond soon!`, 'success');
    return ticketId;
  };

  // Customer Account Session Controls
  const loginUser = (email, password) => {
    // Check if account already seeded or exists
    const adminMail = 'admin@aura.com';
    const clientMail = 'user@aura.com';
    
    if (email === adminMail && password === 'admin123') {
      const sessionUser = {
        name: 'Alexander Admin',
        email: adminMail,
        role: 'admin',
        points: 5000,
        addresses: [],
        cards: [],
        orders: [],
        tickets: []
      };
      saveUserSession(sessionUser);
      triggerToast('Logged in as Administrator', 'success');
      navigate('admin');
      return true;
    }

    if (email === clientMail && password === 'user123') {
      const sessionUser = {
        name: 'Sarah Connor',
        email: clientMail,
        role: 'customer',
        points: 850,
        phone: '+1 (555) 123-4567',
        addresses: [
          { id: 1, name: 'Home Address', street: '128 Tech Avenue', city: 'San Francisco', zip: '94105', country: 'United States' }
        ],
        cards: [
          { id: 1, type: 'visa', holder: 'SARAH CONNOR', number: '•••• •••• •••• 4242', expiry: '12/28' }
        ],
        orders: orders.map(o => o.id),
        tickets: tickets.map(t => t.id)
      };
      saveUserSession(sessionUser);
      triggerToast('Welcome back, Sarah!', 'success');
      navigate('dashboard');
      return true;
    }

    // Dynamic login simulation
    const sessionUser = {
      name: email.split('@')[0].toUpperCase(),
      email: email,
      role: 'customer',
      points: 200,
      addresses: [],
      cards: [],
      orders: [],
      tickets: []
    };
    saveUserSession(sessionUser);
    triggerToast('Logged in successfully', 'success');
    navigate('dashboard');
    return true;
  };

  const registerUser = (name, email, password) => {
    const sessionUser = {
      name,
      email,
      role: 'customer',
      points: 100, // 100 registration bonus points
      addresses: [],
      cards: [],
      orders: [],
      tickets: []
    };
    saveUserSession(sessionUser);
    triggerToast('Account created successfully! Welcome to Aura.', 'success');
    navigate('dashboard');
  };

  const logoutUser = () => {
    saveUserSession(null);
    triggerToast('Logged out of session', 'info');
    navigate('home');
  };

  const updateUserProfile = (profileObj) => {
    if (!user) return;
    const updated = { ...user, ...profileObj };
    saveUserSession(updated);
    triggerToast('Profile information updated', 'success');
  };

  const updateUserAddresses = (addressArray) => {
    if (!user) return;
    const updated = { ...user, addresses: addressArray };
    saveUserSession(updated);
  };

  const updateUserCards = (cardsArray) => {
    if (!user) return;
    const updated = { ...user, cards: cardsArray };
    saveUserSession(updated);
  };

  // Support Chatbot Automator Simulator
  const sendChatMessage = (messageText) => {
    if (messageText.trim().length === 0) return;

    const newMsgs = [...chatMessages, { id: Date.now(), sender: 'user', text: messageText }];
    setChatMessages(newMsgs);

    setTimeout(() => {
      const query = messageText.toLowerCase();
      let responseText = "I'm not sure about that. Would you like me to open a Support Ticket for you?";

      if (query.includes('shipping') || query.includes('delivery')) {
        responseText = "Standard shipping takes 3-5 days. Express delivery takes 1-2 days. Shipping is free for orders over $100!";
      } else if (query.includes('refund') || query.includes('return')) {
        responseText = "We offer a 30-day money-back guarantee. You can request a return directly from your Dashboard under My Orders.";
      } else if (query.includes('payment') || query.includes('pay')) {
        responseText = "We support Stripe (Credit Cards), PayPal, Google Pay, Apple Pay, and Cash on Delivery at checkout.";
      } else if (query.includes('order')) {
        if (user) {
          responseText = `Hello ${user.name}, you have ${orders.length} orders on file. You can track them directly inside your Account Dashboard.`;
        } else {
          responseText = "Please log in to check your order details, or use the Contact Support page for quick order tracking.";
        }
      } else if (query.includes('discount') || query.includes('coupon') || query.includes('promo')) {
        responseText = "Try using the promo code AURA10 at checkout to save 10% off your purchase!";
      } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        responseText = "Hello there! How can I help you today? You can ask about shipping, coupons, or order status.";
      }

      setChatMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
    }, 800);
  };

  // ADMIN DASHBOARD ACTIONS
  const adminAddProduct = (productObj) => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const addedProduct = {
      id: newId,
      reviewsCount: 0,
      rating: 0.0,
      reviews: [],
      ...productObj,
      price: parseFloat(productObj.price),
      discountPrice: productObj.discountPrice ? parseFloat(productObj.discountPrice) : null,
      stock: parseInt(productObj.stock)
    };
    const nextProducts = [...products, addedProduct];
    saveProducts(nextProducts);
    triggerToast(`Added product: ${productObj.title}`, 'success');
  };

  const adminEditProduct = (productObj) => {
    const nextProducts = products.map((p) => {
      if (p.id === productObj.id) {
        return {
          ...p,
          ...productObj,
          price: parseFloat(productObj.price),
          discountPrice: productObj.discountPrice ? parseFloat(productObj.discountPrice) : null,
          stock: parseInt(productObj.stock)
        };
      }
      return p;
    });
    saveProducts(nextProducts);
    triggerToast(`Updated product details: ${productObj.title}`, 'success');
  };

  const adminDeleteProduct = (productId) => {
    const title = products.find(p => p.id === productId)?.title || 'Product';
    const nextProducts = products.filter((p) => p.id !== productId);
    saveProducts(nextProducts);
    triggerToast(`Deleted ${title}`, 'warning');
  };

  const adminUpdateOrderStatus = (orderId, nextStatus) => {
    const nextOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    saveOrders(nextOrders);
    triggerToast(`Order ${orderId} updated to ${nextStatus}`, 'success');
  };

  const adminApproveRefund = (orderId) => {
    const nextOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: 'Refunded', returnRequest: { ...o.returnRequest, status: 'Approved' } };
      }
      return o;
    });
    saveOrders(nextOrders);
    triggerToast(`Refund approved for Order ${orderId}`, 'success');
  };

  const adminAddBlog = (blogObj) => {
    const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
    const addedBlog = {
      id: newId,
      date: new Date().toISOString().split('T')[0],
      readTime: '4 min read',
      ...blogObj
    };
    const nextBlogs = [...blogs, addedBlog];
    saveBlogs(nextBlogs);
    triggerToast(`Blog post published!`, 'success');
  };

  const adminDeleteBlog = (blogId) => {
    const nextBlogs = blogs.filter(b => b.id !== blogId);
    saveBlogs(nextBlogs);
    triggerToast(`Blog post deleted`, 'warning');
  };

  return (
    <ShopContext.Provider
      value={{
        // Router Navigation
        currentView,
        viewParams,
        navigate,
        
        // Settings & Theme
        language,
        setLanguage,
        currency,
        setCurrency,
        theme,
        toggleTheme,
        t,
        getFormattedPrice,

        // Database states
        products,
        blogs,
        cart,
        wishlist,
        compareList,
        orders,
        tickets,
        user,
        toasts,
        suggestions,
        activeCoupon,

        // Filters State
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
        setSortOrder,

        // Core Actions
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        toggleCompare,
        applyCoupon,
        placeOrder,
        cancelOrder,
        requestReturn,
        addReview,
        addTicket,
        
        // Auth Actions
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        updateUserAddresses,
        updateUserCards,

        // Support Bot Messages
        chatMessages,
        sendChatMessage,

        // Admin Dash Actions
        adminAddProduct,
        adminEditProduct,
        adminDeleteProduct,
        adminUpdateOrderStatus,
        adminApproveRefund,
        adminAddBlog,
        adminDeleteBlog
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
