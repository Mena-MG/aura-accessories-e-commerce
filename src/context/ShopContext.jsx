import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  PROMO_CODES, 
  PICKUP_LOCATIONS, 
  STORE_PHONE_NUMBER as DEFAULT_PHONE,
  CATEGORIES,
  FREE_DELIVERY_THRESHOLD,
  DEFAULT_DELIVERY_FEE,
  INSTAPAY_CONFIG
} from '../data/mockData';
import { translations } from '../data/translations';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // ── 1. Active Page / Routing ──
  const [activePage, setActivePage] = useState('home'); // 'home' | 'catalog' | 'product-detail' | 'calculator' | 'studio3d' | 'cart' | 'delivery' | 'summary' | 'admin'
  const [selectedProductId, setSelectedProductId] = useState('prod-1');
  const [searchQuery, setSearchQuery] = useState('');

  // ── 2. Kitchen Products Data with Admin CRUD & Persistence ──
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_kitchen_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Sync products changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_kitchen_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to localStorage:', e);
    }
  }, [products]);

  // Admin CRUD Functions
  const addProduct = (newProductData) => {
    const id = `prod-${Date.now()}`;
    const product = {
      id,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      isFeatured: false,
      isBestSeller: false,
      ...newProductData,
    };
    setProducts(prev => [product, ...prev]);
    showToast(translations[language]?.materialAddedSuccess || 'New material added to catalog!', 'success');
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast(translations[language]?.materialUpdatedSuccess || 'Material updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // Remove from cart if present
    setCart(prev => prev.filter(item => item.product.id !== id));
    showToast(translations[language]?.materialDeletedSuccess || 'Material removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('aura_kitchen_products');
    showToast(translations[language]?.materialsResetSuccess || 'Catalog reset to original mock data', 'success');
  };

  // ── 3. Authentication & User State (Customer / Admin / Guest) ──
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading user:', e);
    }
    // Default to Guest Customer for immediate friction-free usage
    return {
      id: 'guest-cust-1',
      name: 'Guest Client',
      phone: '01012345678',
      role: 'customer', // 'customer' | 'admin'
      isGuest: true
    };
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('aura_user', JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user:', e);
    }
  }, [user]);

  const loginAsGuest = (role = 'customer') => {
    const guestUser = {
      id: role === 'admin' ? 'guest-admin-test' : 'guest-cust-test',
      name: role === 'admin' ? 'Guest Store Admin' : 'Guest Client',
      phone: role === 'admin' ? '01099999999' : '01012345678',
      role: role,
      isGuest: true,
    };
    setUser(guestUser);
    setAuthModalOpen(false);
    showToast(
      role === 'admin' 
        ? '🛡️ Logged in as Guest Admin (Testing Mode)' 
        : '⚡ Browsing as Guest Customer', 
      'success'
    );
  };

  const loginUser = (phone, password, role = 'customer', name = '') => {
    const loggedUser = {
      id: `user-${Date.now()}`,
      name: name || (role === 'admin' ? 'Store Manager' : 'Verified Client'),
      phone: phone || '01012345678',
      role: role,
      isGuest: false,
    };
    setUser(loggedUser);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${loggedUser.name}!`, 'success');
  };

  const logoutUser = () => {
    const defaultGuest = {
      id: 'guest-cust-1',
      name: 'Guest Client',
      phone: '01012345678',
      role: 'customer',
      isGuest: true
    };
    setUser(defaultGuest);
    showToast('Signed out. Switched to Guest Customer.', 'info');
  };

  const isAdmin = user?.role === 'admin';

  // ── 4. Cart & Project Configuration ──
  const [cart, setCart] = useState([
    { 
      product: INITIAL_PRODUCTS[0], 
      quantity: 3.5, // e.g. 3.5 m² of granite
      customNote: 'Kitchen Island Countertop (3.5 m²)' 
    }
  ]);
  const [wishlist, setWishlist] = useState(['prod-2', 'prod-7']);
  
  // ── 5. Theme State ──
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('aura_theme') || 'classic';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('aura_theme', newTheme);
    showToast(`Applied ${newTheme.replace('-', ' ')} theme ✨`, 'success');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ── 6. Language & i18n ('en' | 'ar') ──
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('aura_language') || 'ar'; // Default Arabic-first as requested
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('aura_language', lang);
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    return translations[language]?.[key] || translations.en?.[key] || key;
  };

  // ── 7. Store WhatsApp Phone Number ──
  const [storePhoneNumber, setStorePhoneNumberState] = useState(() => {
    return localStorage.getItem('aura_store_phone') || DEFAULT_PHONE;
  });

  const setStorePhoneNumber = (newNumber) => {
    setStorePhoneNumberState(newNumber);
    localStorage.setItem('aura_store_phone', newNumber);
    showToast(`Store WhatsApp phone set to ${newNumber}`, 'success');
  };

  // ── 8. Modals & UI States ──
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  // ── 9. Checkout, Coupons & Instapay ──
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: 'Ahmed Mahmoud',
    phone: '+20 101 234 5678',
    address: '15 El-Tahrir St., Tower 3',
    city: 'Dokki, Giza',
    notes: 'Please coordinate slab delivery with site engineer.'
  });
  const [selectedPickupLocation, setSelectedPickupLocation] = useState(PICKUP_LOCATIONS[0]);

  // Payment Options
  const [paymentMethod, setPaymentMethod] = useState('instapay'); // 'instapay' | 'cod' | 'pickup'
  const [instapayScreenshot, setInstapayScreenshot] = useState(null); // base64 or URL
  const [transactionRef, setTransactionRef] = useState('');

  // ── 10. 3D Studio State ──
  const [activeSurfaces, setActiveSurfaces] = useState({
    countertop: 'prod-1',  // Black Galaxy Granite
    cabinet: 'prod-4',     // Glossy White PVC
    backsplash: 'prod-7',  // Metro Subway Tile
  });

  const setSurfaceMaterial = (surfaceType, productId) => {
    setActiveSurfaces(prev => ({ ...prev, [surfaceType]: productId }));
    showToast(`Applied material to 3D ${surfaceType} view!`, 'success');
  };

  // ── 11. Toast System ──
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // ── 12. Navigation Helper ──
  const navigateTo = (page, productId = null) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── 13. Cart Operations ──
  const addToCart = (product, quantity = 1, customNote = '') => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += Number(quantity);
        if (customNote) updated[existingIndex].customNote = customNote;
        return updated;
      } else {
        return [...prevCart, { product, quantity: Number(quantity), customNote }];
      }
    });
    const unitLabel = product.unitType ? (language === 'ar' ? product.unitType : product.unitType) : '';
    showToast(`Added ${quantity} of "${language === 'ar' ? (product.nameAr || product.name) : product.name}" to cart ✨`);
  };

  const updateCartQuantity = (productId, newQty) => {
    const qty = Number(newQty);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    showToast('Material removed from project cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // ── 14. Coupon Validation ──
  const applyDiscountCode = (codeToTest) => {
    const trimmed = (codeToTest || couponInput).trim().toUpperCase();
    if (!trimmed) {
      setCouponError('Please enter a promotional code.');
      return false;
    }
    
    if (PROMO_CODES[trimmed]) {
      const promo = PROMO_CODES[trimmed];
      setAppliedCoupon(promo);
      setCouponError('');
      showToast(`Promo code "${trimmed}" applied successfully!`, 'success');
      return true;
    } else {
      setCouponError('Invalid code. Try KITCHEN10 (10% off) or SAVE500 (500 EGP off).');
      showToast('Invalid coupon code', 'error');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    showToast('Promo code removed', 'info');
  };

  // ── 15. Wishlist ──
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved items', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your project favorites ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  // ── 16. Financial Math (EGP) ──
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity > 0 ? 1 : 0), 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const discountAmount = appliedCoupon 
    ? (appliedCoupon.discountPercent 
        ? Math.round(subtotal * (appliedCoupon.discountPercent / 100))
        : (appliedCoupon.fixedDiscount || 0))
    : 0;

  const deliveryFee = (deliveryMethod === 'delivery' && subtotal > 0)
    ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DEFAULT_DELIVERY_FEE)
    : 0;

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0] || INITIAL_PRODUCTS[0];

  return (
    <ShopContext.Provider value={{
      // Navigation & Search
      activePage,
      navigateTo,
      selectedProductId,
      selectedProduct,
      searchQuery,
      setSearchQuery,
      
      // Products & Admin CRUD
      products,
      categories: CATEGORIES,
      addProduct,
      updateProduct,
      deleteProduct,
      resetProductsToDefault,
      isAdmin,
      
      // Auth
      user,
      loginUser,
      loginAsGuest,
      logoutUser,
      authModalOpen,
      setAuthModalOpen,
      adminModalOpen,
      setAdminModalOpen,

      // Cart & Wishlist
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      cartItemCount,
      subtotal,
      
      // Coupons & Discounts
      appliedCoupon,
      couponInput,
      setCouponInput,
      couponError,
      applyDiscountCode,
      removeDiscountCode,
      discountAmount,
      
      // Delivery & Instapay Payment
      deliveryMethod,
      setDeliveryMethod,
      deliveryDetails,
      setDeliveryDetails,
      selectedPickupLocation,
      setSelectedPickupLocation,
      deliveryFee,
      total,
      paymentMethod,
      setPaymentMethod,
      instapayScreenshot,
      setInstapayScreenshot,
      transactionRef,
      setTransactionRef,
      instapayConfig: INSTAPAY_CONFIG,
      
      // 3D Studio & Calculator
      activeSurfaces,
      setSurfaceMaterial,
      calcModalOpen,
      setCalcModalOpen,
      chatbotOpen,
      setChatbotOpen,
      
      // Toast & Settings
      toast,
      showToast,
      storePhoneNumber,
      setStorePhoneNumber,
      settingsOpen,
      setSettingsOpen,
      language,
      setLanguage,
      theme,
      setTheme,
      t
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
