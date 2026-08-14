import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS, PROMO_CODES, PICKUP_LOCATIONS, STORE_PHONE_NUMBER as DEFAULT_PHONE } from '../data/mockData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prod-1');
  const [cart, setCart] = useState([
    { product: PRODUCTS[1], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(['prod-3']);
  
  // Dynamic Store Phone Number for WhatsApp Checkout
  const [storePhoneNumber, setStorePhoneNumberState] = useState(() => {
    return localStorage.getItem('aura_store_phone') || DEFAULT_PHONE;
  });

  const setStorePhoneNumber = (newNumber) => {
    setStorePhoneNumberState(newNumber);
    localStorage.setItem('aura_store_phone', newNumber);
    showToast(`Store WhatsApp phone updated to ${newNumber}`, 'success');
  };

  // Settings Modal state
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Coupon & Checkout state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  
  // Delivery vs Pickup choice
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: 'Mariam Hassan',
    phone: '+20 100 234 5678',
    address: '15 El-Bostan Street',
    city: 'Heliopolis, Cairo',
    notes: 'Please call upon arrival.'
  });
  const [selectedPickupLocation, setSelectedPickupLocation] = useState(PICKUP_LOCATIONS[0]);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Auto-scroll to top when page changes
  const navigateTo = (page, productId = null) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
    showToast(`Added "${product.name}" to your cart ✨`);
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupon validation
  const applyDiscountCode = (codeToTest) => {
    const trimmed = (codeToTest || couponInput).trim().toUpperCase();
    if (!trimmed) {
      setCouponError('Please enter a discount code.');
      return false;
    }
    
    if (PROMO_CODES[trimmed]) {
      const promo = PROMO_CODES[trimmed];
      setAppliedCoupon(promo);
      setCouponError('');
      showToast(`Promo code "${trimmed}" applied! (${promo.discountPercent}% OFF)`, 'success');
      return true;
    } else {
      setCouponError('Invalid code. Try WELCOME10 (10% off) or ACCESS20 (20% off).');
      showToast('Invalid coupon code', 'error');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError('');
    showToast('Discount code removed', 'info');
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  // EGP Calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const discountAmount = appliedCoupon 
    ? (subtotal * (appliedCoupon.discountPercent / 100))
    : 0;

  // Free delivery over EGP 600, else EGP 50 delivery fee
  const deliveryFee = (deliveryMethod === 'delivery' && subtotal > 0)
    ? (subtotal >= 600 ? 0 : 50)
    : 0;

  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const selectedProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];

  return (
    <ShopContext.Provider value={{
      activePage,
      navigateTo,
      selectedProductId,
      selectedProduct,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      cartItemCount,
      subtotal,
      appliedCoupon,
      couponInput,
      setCouponInput,
      couponError,
      applyDiscountCode,
      removeDiscountCode,
      discountAmount,
      deliveryMethod,
      setDeliveryMethod,
      deliveryDetails,
      setDeliveryDetails,
      selectedPickupLocation,
      setSelectedPickupLocation,
      deliveryFee,
      total,
      toast,
      showToast,
      storePhoneNumber,
      setStorePhoneNumber,
      settingsOpen,
      setSettingsOpen
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
