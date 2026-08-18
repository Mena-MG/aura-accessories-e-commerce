// Rose Blush Theme — All 6 Page Variants
// Colors: bg #FDF6F6, card #fff, text #36121D, muted #825866, accent #D4889B

import React, { useState, useMemo } from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../../data/mockData';
import { PICKUP_LOCATIONS } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import {
  Sparkles, ArrowRight, ArrowLeft, Crown, ShoppingBag,
  Trash2, Plus, Minus, Tag, Check, AlertCircle,
  SlidersHorizontal, ArrowUpDown, X, RotateCcw,
  Heart, Star, CheckCircle2, MessageSquare, Share2,
  Truck, Store, MapPin, Clock, User, Home,
  Copy, RefreshCcw, Settings
} from 'lucide-react';

const R = {
  bg: '#FDF6F6',
  card: '#FFFFFF',
  cardBorder: 'rgba(212,136,155,0.25)',
  text: '#36121D',
  muted: '#825866',
  accent: '#D4889B',
  accentHover: '#B85F75',
  accentBg: 'rgba(212,136,155,0.1)',
  border: 'rgba(212,136,155,0.2)',
  btnPrimary: { background: 'linear-gradient(135deg, #B85F75, #D4889B)', color: '#fff' },
  inputBg: '#FDF0F2',
};

// ─────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────
export const RoseHomePage = () => {
  const { navigateTo, t } = useShop();
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);
  const heroProduct = PRODUCTS[1];
  const categories = [
    { name: t('bracelets'), count: 'Charm & Torque', image: '/assets/product-ocean-bangle.jpg' },
    { name: t('necklaces'), count: 'Sapphire & Crystal', image: '/assets/product-sapphire-clover.jpg' },
    { name: t('charms'), count: 'Pearl & Glass', image: '/assets/product-yellow-keychain.jpg' },
    { name: t('lanyards'), count: 'Beaded & ID Straps', image: '/assets/product-hawkins-lanyard.jpg' },
  ];

  return (
    <div className="space-y-20 animate-fade-in" style={{ background: R.bg, color: R.text }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24" style={{ background: 'linear-gradient(180deg, #F9EBED 0%, #FDF6F6 100%)', borderBottom: `1px solid ${R.border}` }}>
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #D4889B 0%, transparent 70%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}`, color: R.accent }}>
                <Sparkles className="w-3.5 h-3.5" /> {t('heroBadge')}
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl font-light leading-[1.15] tracking-tight" style={{ color: R.text }}>
                {t('heroTitle1')} <span className="italic font-normal" style={{ background: 'linear-gradient(135deg, #B85F75 0%, #D4889B 50%, #E8A8B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('heroTitle2')}</span>
              </h1>
              <p className="text-base sm:text-lg font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ color: R.muted }}>{t('heroDesc')}</p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => navigateTo('catalog')} className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group" style={R.btnPrimary}>
                  <span>{t('exploreCatalog')}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigateTo('product-detail', 'prod-2')} className="w-full sm:w-auto px-7 py-4 font-medium text-xs uppercase tracking-widest rounded-full border flex items-center justify-center gap-2 transition-all" style={{ background: '#fff', borderColor: R.cardBorder, color: R.accent }}>
                  <Crown className="w-4 h-4" /> <span>{t('viewFeatured')}</span>
                </button>
              </div>
              <div className="pt-6 grid grid-cols-3 gap-4" style={{ borderTop: `1px solid ${R.border}` }}>
                {[['100%', t('handmadeQuality')], ['WhatsApp', t('instantCheckout')], ['Same Day', t('sameDayPickup')]].map(([val, label]) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="text-xl font-serif font-bold" style={{ color: R.accent }}>{val}</div>
                    <div className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: R.muted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, rgba(212,136,155,0.4) 0%, transparent 70%)' }} />
                <div onClick={() => navigateTo('product-detail', heroProduct.id)} className="relative rounded-3xl overflow-hidden cursor-pointer group" style={{ border: '4px solid #fff', boxShadow: '0 20px 60px rgba(212,136,155,0.2)' }}>
                  <img src={heroProduct.image} alt={heroProduct.name} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white" style={{ background: 'linear-gradient(to top, rgba(54,18,29,0.85) 0%, rgba(54,18,29,0.3) 50%, transparent 100%)' }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F2B8C6' }}>{t('featuredSpotlight')}</span>
                    <h3 className="font-serif text-2xl font-medium mt-1">{heroProduct.name}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                      <span className="text-lg font-bold" style={{ color: '#F2B8C6' }}>{formatPrice(heroProduct.price)}</span>
                      <span className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(212,136,155,0.3)' }}>{t('shopNow')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('curatedCategories')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: R.text }}>{t('designedToInspire')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('catalog')} className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer" style={{ border: `1px solid ${R.cardBorder}`, boxShadow: '0 4px 20px rgba(212,136,155,0.1)' }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(to top, rgba(54,18,29,0.85) 0%, rgba(54,18,29,0.3) 60%, transparent 100%)' }}>
                <h3 className="font-serif text-lg sm:text-xl font-medium">{cat.name}</h3>
                <p className="text-[11px] font-light mt-0.5" style={{ color: '#F2B8C6' }}>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4" style={{ borderBottom: `1px solid ${R.border}` }}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('handpickedFavorites')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: R.text }}>{t('featuredBestSellers')}</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: R.accent }}>
            <span>{t('viewAllProducts')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #36121D 0%, #5C2233 100%)', boxShadow: '0 20px 60px rgba(54,18,29,0.2)' }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #D4889B 0%, transparent 70%)' }} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F2B8C6' }}>{t('exclusiveOffer')}</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">{t('promoTitle')}</h3>
              <p className="text-xs sm:text-sm font-light max-w-xl" style={{ color: 'rgba(255,255,255,0.7)' }}>
                Use <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'rgba(212,136,155,0.2)', color: '#F2B8C6' }}>WELCOME10</code> for 10% off or <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'rgba(212,136,155,0.2)', color: '#F2B8C6' }}>ACCESS20</code> for 20% off.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 font-medium text-xs uppercase tracking-widest rounded-full transition-all" style={R.btnPrimary}>{t('claimDiscount')}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────
// CATALOG PAGE
// ─────────────────────────────────────────
export const RoseCatalogPage = () => {
  const { t } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const materials = ['All', 'Pearls & Acrylic', 'Enamel & Silver Plated', 'Sterling Silver', 'Beaded Strap', 'Rose Gold & Mesh', 'Vegan Leather'];
  const colors = ['All', 'Yellow & Clear', 'Ocean Blue', 'Royal Blue', 'Crimson Red', 'Rose Gold', 'Cream Neutral'];

  const filteredProducts = useMemo(() => PRODUCTS.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchMaterial = selectedMaterial === 'All' || product.material.toLowerCase().includes(selectedMaterial.toLowerCase());
    const matchColor = selectedColor === 'All' || product.color.toLowerCase().includes(selectedColor.toLowerCase());
    return matchCategory && matchMaterial && matchColor && product.price <= maxPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0;
  }), [selectedCategory, selectedMaterial, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => { setSelectedCategory('All'); setSelectedMaterial('All'); setSelectedColor('All'); setMaxPrice(1500); setSortBy('featured'); };
  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedMaterial !== 'All' ? 1 : 0) + (selectedColor !== 'All' ? 1 : 0) + (maxPrice < 1500 ? 1 : 0);
  const activeBtn = { background: R.accentBg, color: R.accent, fontWeight: '600' };
  const inactiveBtn = { color: R.muted };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('fullCollection')}</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light" style={{ color: R.text }}>{t('catalogTitle')}</h1>
        <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: R.muted }}>{t('catalogDesc')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="hidden lg:block p-6 rounded-2xl sticky top-28 space-y-6" style={{ background: R.card, border: `1px solid ${R.cardBorder}`, boxShadow: '0 4px 20px rgba(212,136,155,0.08)' }}>
          <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${R.border}` }}>
            <div className="flex items-center gap-2 font-serif text-lg font-medium" style={{ color: R.text }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: R.accent }} /> <span>{t('filters')}</span>
              {activeFilterCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: R.accentBg, color: R.accent }}>{activeFilterCount}</span>}
            </div>
            {activeFilterCount > 0 && <button onClick={resetFilters} className="text-xs flex items-center gap-1 font-medium" style={{ color: R.accent }}><RotateCcw className="w-3 h-3" /> {t('reset')}</button>}
          </div>
          {[{ title: t('category'), items: categories, val: selectedCategory, set: setSelectedCategory }, { title: t('material'), items: materials, val: selectedMaterial, set: setSelectedMaterial }, { title: t('colorPalette'), items: colors, val: selectedColor, set: setSelectedColor }].map(({ title, items, val, set }, gi) => (
            <div key={gi} className={gi > 0 ? 'space-y-2.5 pt-4' : 'space-y-2.5'} style={gi > 0 ? { borderTop: `1px solid ${R.border}` } : {}}>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{title}</h4>
              <div className="space-y-1 text-xs">{items.map(item => <button key={item} onClick={() => set(item)} className="block w-full text-left rtl:text-right py-1.5 px-3 rounded-lg transition-colors" style={val === item ? activeBtn : inactiveBtn}>{item}</button>)}</div>
            </div>
          ))}
          <div className="space-y-2.5 pt-4" style={{ borderTop: `1px solid ${R.border}` }}>
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('maxPrice')}</h4>
              <span className="font-semibold" style={{ color: R.accent }}>{formatPrice(maxPrice)}</span>
            </div>
            <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: R.accent }} />
            <div className="flex justify-between text-[10px]" style={{ color: R.muted }}><span>200 EGP</span><span>1,500 EGP</span></div>
          </div>
        </aside>
        <div className="lg:col-span-3 space-y-6">
          <div className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4" style={{ background: R.card, border: `1px solid ${R.cardBorder}` }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors" style={{ background: R.accentBg, borderColor: R.cardBorder, color: R.accent }}>
                <SlidersHorizontal className="w-4 h-4" /> {t('filters')} ({activeFilterCount})
              </button>
              <span className="text-xs font-medium" style={{ color: R.muted }}>{t('showing')} <strong style={{ color: R.text }}>{filteredProducts.length}</strong> {t('productsCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 hidden sm:block" style={{ color: R.accent }} />
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}`, color: R.text }}>
                <option value="featured">{t('sortFeatured')}</option><option value="price-low">{t('sortPriceLow')}</option><option value="price-high">{t('sortPriceHigh')}</option><option value="rating">{t('sortRating')}</option><option value="newest">{t('sortNewest')}</option>
              </select>
            </div>
          </div>
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium" style={{ color: R.muted }}>{t('activeFilters')}</span>
              {selectedCategory !== 'All' && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: R.accentBg, color: R.accent }}>{selectedCategory} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedCategory('All')} /></span>}
              {selectedMaterial !== 'All' && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: R.accentBg, color: R.accent }}>{selectedMaterial} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedMaterial('All')} /></span>}
              {maxPrice < 1500 && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: R.accentBg, color: R.accent }}>{t('under')} {formatPrice(maxPrice)} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMaxPrice(1500)} /></span>}
            </div>
          )}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="p-12 rounded-2xl border text-center space-y-4" style={{ background: R.card, borderColor: R.cardBorder }}>
              <p className="text-base font-light" style={{ color: R.muted }}>{t('noProductsMatch')}</p>
              <button onClick={resetFilters} className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider" style={R.btnPrimary}>{t('clearAllFilters')}</button>
            </div>
          )}
        </div>
      </div>
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-end animate-fade-in lg:hidden" style={{ background: 'rgba(54,18,29,0.5)' }}>
          <div className="w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between" style={{ background: R.card }}>
            <div>
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${R.border}` }}>
                <h3 className="font-serif text-xl font-medium" style={{ color: R.text }}>{t('filters')}</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" style={{ color: R.text }} /></button>
              </div>
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('category')}</h4>
                {categories.map(c => <button key={c} onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); }} className="block w-full text-left py-1.5 text-xs" style={selectedCategory === c ? { color: R.accent, fontWeight: '700' } : { color: R.muted }}>{c}</button>)}
              </div>
            </div>
            <button onClick={() => setMobileFilterOpen(false)} className="w-full py-3 font-medium text-xs uppercase tracking-wider rounded-xl" style={R.btnPrimary}>Apply Filters ({filteredProducts.length})</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────
export const RoseProductDetailPage = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist, showToast, storePhoneNumber, t } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');
  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);

  const handleAddToCart = () => { addToCart(selectedProduct, quantity); setAddedAnimation(true); setTimeout(() => setAddedAnimation(false), 1500); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      <button onClick={() => navigateTo('catalog')} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors" style={{ color: R.muted }}>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('backToCatalog')}</span>
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden group" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}`, boxShadow: '0 20px 60px rgba(212,136,155,0.15)' }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto px-3.5 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: `1px solid ${R.cardBorder}` }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: R.accent }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: R.accent }}>{selectedProduct.badge}</span>
              </div>
            )}
            <button onClick={() => toggleWishlist(selectedProduct.id)} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all" style={{ background: isWishlisted ? 'rgba(212,136,155,0.2)' : 'rgba(255,255,255,0.8)', color: isWishlisted ? R.accent : R.muted }}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: R.accent }}>{selectedProduct.category}</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: R.accent }}>
              <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
              <span style={{ color: R.text }}>{selectedProduct.rating}</span>
              <span style={{ color: R.muted }}>({selectedProduct.reviewsCount} reviews)</span>
            </div>
          </div>
          <div className="space-y-2 pb-6" style={{ borderBottom: `1px solid ${R.border}` }}>
            <h1 className="font-serif text-3xl sm:text-4xl font-light leading-tight" style={{ color: R.text }}>{selectedProduct.name}</h1>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-semibold" style={{ color: R.accent }}>{formatPrice(selectedProduct.price)}</span>
              {selectedProduct.originalPrice && <span className="text-sm line-through" style={{ color: R.muted }}>{formatPrice(selectedProduct.originalPrice)}</span>}
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>{t('inStock')}</span>
            </div>
          </div>
          <p className="text-sm font-light leading-relaxed" style={{ color: R.muted }}>{selectedProduct.description}</p>
          <div className="grid grid-cols-2 gap-3 py-2 text-xs">
            {[{ label: t('material'), val: selectedProduct.material }, { label: t('colorPalette'), val: selectedProduct.color }].map(({ label, val }) => (
              <div key={label} className="p-3 rounded-xl" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
                <span className="text-[10px] uppercase font-bold block" style={{ color: R.muted }}>{label}</span>
                <span className="font-semibold" style={{ color: R.text }}>{val}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-4" style={{ borderTop: `1px solid ${R.border}` }}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('quantity')}</span>
              <div className="flex items-center rounded-xl p-1" style={{ border: `1px solid ${R.cardBorder}`, background: R.accentBg }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: R.text }}><Minus className="w-3.5 h-3.5" /></button>
                <span className="w-10 text-center font-bold text-xs" style={{ color: R.accent }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: R.text }}><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <button onClick={handleAddToCart} className="w-full py-4 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg" style={addedAnimation ? { background: '#059669', color: '#fff' } : R.btnPrimary}>
              {addedAnimation ? <><CheckCircle2 className="w-5 h-5 animate-bounce" /><span>{t('addedToCart')}</span></> : <><ShoppingBag className="w-4 h-4" /><span>{t('addToCart')} — {formatPrice(selectedProduct.price * quantity)}</span></>}
            </button>
            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi!%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(selectedProduct.name)}`} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                <MessageSquare className="w-4 h-4" /> <span>{t('inquireWhatsApp')}</span>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'info'); }} className="p-3 rounded-full border transition-colors" style={{ background: R.accentBg, borderColor: R.cardBorder, color: R.accent }}>
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="pt-6 space-y-3" style={{ borderTop: `1px solid ${R.border}` }}>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('handcraftingDetails')}</h4>
            <ul className="space-y-2 text-xs">
              {selectedProduct.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: R.accent }} />
                  <span style={{ color: R.muted }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <section className="pt-12 space-y-8" style={{ borderTop: `1px solid ${R.border}` }}>
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('complementaryPieces')}</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light" style={{ color: R.text }}>{t('youMayAlsoLove')}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </div>
  );
};

// ─────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────
export const RoseCartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, subtotal, appliedCoupon, couponInput, setCouponInput, couponError, applyDiscountCode, removeDiscountCode, discountAmount, navigateTo, t } = useShop();
  const handleApplyCoupon = (e) => { e.preventDefault(); applyDiscountCode(couponInput); };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: R.accentBg }}><ShoppingBag className="w-10 h-10" style={{ color: R.accent }} /></div>
        <h2 className="font-serif text-3xl font-light" style={{ color: R.text }}>{t('emptyBag')}</h2>
        <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: R.muted }}>{t('catalogDesc')}</p>
        <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 font-medium text-xs uppercase tracking-widest rounded-full" style={R.btnPrimary}>{t('exploreCatalog')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6" style={{ borderBottom: `1px solid ${R.border}` }}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('shoppingBag')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: R.text }}>{t('reviewOrder')}</h1>
        </div>
        <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ color: R.accent }}>
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('continueShopping')}</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6" style={{ background: R.card, border: `1px solid ${R.cardBorder}`, boxShadow: '0 4px 20px rgba(212,136,155,0.06)' }}>
              <div onClick={() => navigateTo('product-detail', product.id)} className="w-24 h-24 rounded-xl overflow-hidden cursor-pointer flex-shrink-0" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: R.accent }}>{product.category}</span>
                <h3 onClick={() => navigateTo('product-detail', product.id)} className="font-serif text-lg font-medium cursor-pointer line-clamp-1 transition-opacity hover:opacity-70" style={{ color: R.text }}>{product.name}</h3>
                <p className="text-xs font-light" style={{ color: R.muted }}>{t('material')}: {product.material}</p>
                <div className="text-sm font-semibold pt-1" style={{ color: R.accent }}>{formatPrice(product.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl p-1" style={{ border: `1px solid ${R.cardBorder}`, background: R.accentBg }}>
                  <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ color: R.text }}><Minus className="w-3 h-3" /></button>
                  <span className="w-8 text-center font-bold text-xs" style={{ color: R.accent }}>{quantity}</span>
                  <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ color: R.text }}><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-sm font-bold w-24 text-right rtl:text-left" style={{ color: R.text }}>{formatPrice(product.price * quantity)}</span>
                <button onClick={() => removeFromCart(product.id)} className="p-2 transition-colors" style={{ color: R.muted }}><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          <div className="p-4 rounded-xl flex items-center gap-3 text-xs" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: R.accent }} />
            <span style={{ color: R.text }}>{t('giftNotice')}</span>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl space-y-6" style={{ background: R.card, border: `1px solid ${R.cardBorder}`, boxShadow: '0 4px 20px rgba(212,136,155,0.08)' }}>
            <h2 className="font-serif text-xl font-medium pb-4" style={{ color: R.text, borderBottom: `1px solid ${R.border}` }}>{t('reviewOrder')}</h2>
            <div className="flex justify-between items-center text-xs"><span style={{ color: R.muted }}>{t('itemsSubtotal')}</span><span className="font-semibold" style={{ color: R.text }}>{formatPrice(subtotal)}</span></div>
            <div className="space-y-3 pt-4" style={{ borderTop: `1px solid ${R.border}` }}>
              <label htmlFor="coupon-rose" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: R.text }}>
                <Tag className="w-3.5 h-3.5" style={{ color: R.accent }} /> {t('discountCode')}
              </label>
              {appliedCoupon ? (
                <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div className="flex items-center gap-2"><Check className="w-4 h-4" style={{ color: '#059669' }} /><div><span className="text-xs font-bold font-mono block" style={{ color: '#059669' }}>{appliedCoupon.code}</span><span className="text-[11px]" style={{ color: R.muted }}>{appliedCoupon.label}</span></div></div>
                  <button onClick={removeDiscountCode} className="text-xs font-semibold" style={{ color: '#dc2626' }}>{t('remove')}</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input id="coupon-rose" type="text" placeholder="e.g. WELCOME10" value={couponInput} onChange={e => setCouponInput(e.target.value)} className="flex-1 uppercase font-mono text-xs rounded-xl px-3.5 py-2.5 focus:outline-none" style={{ background: R.inputBg, border: `1px solid ${R.cardBorder}`, color: R.text }} />
                    <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider" style={R.btnPrimary}>{t('apply')}</button>
                  </div>
                  {couponError && <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#dc2626' }}><AlertCircle className="w-3.5 h-3.5" /><span>{couponError}</span></div>}
                  <div className="text-[11px]" style={{ color: R.muted }}>Try <button type="button" onClick={() => { setCouponInput('WELCOME10'); applyDiscountCode('WELCOME10'); }} className="underline font-semibold" style={{ color: R.accent }}>WELCOME10</button> or <button type="button" onClick={() => { setCouponInput('ACCESS20'); applyDiscountCode('ACCESS20'); }} className="underline font-semibold" style={{ color: R.accent }}>ACCESS20</button></div>
                </form>
              )}
            </div>
            {appliedCoupon && <div className="flex justify-between items-center text-xs font-semibold" style={{ color: '#059669' }}><span>Discount ({appliedCoupon.code})</span><span>-{formatPrice(discountAmount)}</span></div>}
            <div className="pt-4 flex justify-between items-baseline" style={{ borderTop: `1px solid ${R.border}` }}>
              <span className="font-serif text-lg font-bold" style={{ color: R.text }}>{t('subtotalDue')}</span>
              <span className="text-2xl font-bold" style={{ color: R.accent }}>{formatPrice(subtotal - discountAmount)}</span>
            </div>
            <button onClick={() => navigateTo('delivery')} className="w-full py-4 font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group" style={R.btnPrimary}>
              <span>{t('proceedToDelivery')}</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// DELIVERY PAGE
// ─────────────────────────────────────────
export const RoseDeliveryPage = () => {
  const { deliveryMethod, setDeliveryMethod, deliveryDetails, setDeliveryDetails, selectedPickupLocation, setSelectedPickupLocation, navigateTo, t } = useShop();
  const handleInputChange = (e) => setDeliveryDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const inputStyle = { background: R.inputBg, border: `1px solid ${R.cardBorder}`, color: R.text };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between pb-6" style={{ borderBottom: `1px solid ${R.border}` }}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: R.accent }}>{t('checkoutStep2')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: R.text }}>{t('fulfillmentMethod')}</h1>
        </div>
        <button onClick={() => navigateTo('cart')} className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ color: R.accent }}>
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('shoppingBag')}</span>
        </button>
      </div>
      <div className="grid grid-cols-2 p-1.5 rounded-2xl max-w-lg mx-auto" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
        {[['delivery', t('courierDelivery'), Truck], ['pickup', t('boutiquePickup'), Store]].map(([method, label, Icon]) => (
          <button key={method} onClick={() => setDeliveryMethod(method)} className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2" style={deliveryMethod === method ? { ...R.btnPrimary, boxShadow: '0 4px 12px rgba(212,136,155,0.3)' } : { color: R.muted }}>
            <Icon className="w-4 h-4" /> <span>{label}</span>
          </button>
        ))}
      </div>
      {deliveryMethod === 'delivery' && (
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('summary'); }} className="p-6 sm:p-8 rounded-3xl space-y-6 animate-fade-in" style={{ background: R.card, border: `1px solid ${R.cardBorder}`, boxShadow: '0 8px 30px rgba(212,136,155,0.08)' }}>
          <div className="flex items-center gap-2 pb-4" style={{ borderBottom: `1px solid ${R.border}` }}>
            <Home className="w-5 h-5" style={{ color: R.accent }} />
            <h2 className="font-serif text-xl font-medium" style={{ color: R.text }}>{t('enterShippingAddress')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ id: 'name', label: t('fullName'), ph: 'e.g. Mariam Hassan', type: 'text', req: true }, { id: 'phone', label: t('phoneNumber'), ph: 'e.g. +20 100 234 5678', type: 'tel', req: true }].map(({ id, label, ph, type, req }) => (
              <div key={id} className="space-y-1.5">
                <label htmlFor={`rose-${id}`} className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{label}</label>
                <input id={`rose-${id}`} type={type} name={id} required={req} value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
              </div>
            ))}
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="rose-address" className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('streetAddress')}</label>
              <input id="rose-address" type="text" name="address" required value={deliveryDetails.address} onChange={handleInputChange} placeholder="e.g. 15 El-Bostan Street" className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
            </div>
            {[{ id: 'city', label: t('cityPostal'), ph: 'e.g. Heliopolis, Cairo', req: true }, { id: 'notes', label: t('specialInstructions'), ph: 'e.g. Call upon arrival', req: false }].map(({ id, label, ph, req }) => (
              <div key={id} className="space-y-1.5">
                <label htmlFor={`rose-${id}`} className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{label}</label>
                <input id={`rose-${id}`} type="text" name={id} required={req} value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
              </div>
            ))}
          </div>
          <div className="pt-4 flex justify-end" style={{ borderTop: `1px solid ${R.border}` }}>
            <button type="submit" className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2" style={R.btnPrimary}>
              <span>{t('continueToRecap')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </form>
      )}
      {deliveryMethod === 'pickup' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl space-y-4" style={{ background: R.card, border: `1px solid ${R.cardBorder}` }}>
            <div className="flex items-center gap-2 pb-3" style={{ borderBottom: `1px solid ${R.border}` }}>
              <Store className="w-5 h-5" style={{ color: R.accent }} />
              <h2 className="font-serif text-xl font-medium" style={{ color: R.text }}>{t('selectBoutique')}</h2>
            </div>
            {PICKUP_LOCATIONS.map(loc => {
              const isSelected = selectedPickupLocation.id === loc.id;
              return (
                <div key={loc.id} onClick={() => setSelectedPickupLocation(loc)} className="p-5 rounded-2xl cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all" style={{ border: `2px solid ${isSelected ? R.accent : R.cardBorder}`, background: isSelected ? R.accentBg : '#fff' }}>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-semibold" style={{ color: R.text }}>{loc.name}</span>
                      {isSelected && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: R.btnPrimary.background, color: '#fff' }}>{t('selected')}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: R.muted }}><MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: R.accent }} /><span>{loc.address}</span></div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: R.muted }}><Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: R.accent }} /><span>{loc.hours}</span></div>
                    <div className="text-[11px] font-semibold" style={{ color: '#059669' }}>✨ {loc.stockStatus}</div>
                  </div>
                  <button type="button" className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider" style={isSelected ? { background: R.btnPrimary.background, color: '#fff' } : { background: R.accentBg, color: R.accent }}>{isSelected ? t('selected') : t('chooseStore')}</button>
                </div>
              );
            })}
          </div>
          <div className="p-6 rounded-3xl space-y-4" style={{ background: R.card, border: `1px solid ${R.cardBorder}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: R.text }}><User className="w-4 h-4" style={{ color: R.accent }} /> {t('pickupContactInfo')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ id: 'name', label: t('fullName'), ph: 'Mariam Hassan' }, { id: 'phone', label: t('phoneNumber'), ph: '+20 100 234 5678' }].map(({ id, label, ph }) => (
                <div key={id} className="space-y-1"><label className="text-[11px] font-semibold" style={{ color: R.muted }}>{label}</label><input type="text" name={id} value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-xl px-3.5 py-2.5 focus:outline-none" style={inputStyle} /></div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => navigateTo('summary')} className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2" style={R.btnPrimary}>
              <span>{t('continueToRecap')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// ORDER SUMMARY PAGE
// ─────────────────────────────────────────
export const RoseOrderSummaryPage = () => {
  const { cart, subtotal, appliedCoupon, discountAmount, deliveryMethod, deliveryDetails, selectedPickupLocation, deliveryFee, total, navigateTo, showToast, clearCart, storePhoneNumber, setSettingsOpen, t } = useShop();
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => `AUR-${Math.floor(10000 + Math.random() * 90000)}`);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');

  const formattedOrderText = useMemo(() => {
    const itemsList = cart.map(item => `• ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)} ea)`).join('\n');
    const fulfillmentText = deliveryMethod === 'delivery' ? `🚚 *METHOD:* Courier Delivery\n📍 *Address:* ${deliveryDetails.address}, ${deliveryDetails.city}\n📝 *Notes:* ${deliveryDetails.notes || 'None'}` : `🏪 *METHOD:* Boutique Store Pickup\n📍 *Store:* ${selectedPickupLocation.name}\n📍 *Address:* ${selectedPickupLocation.address}`;
    const discountText = appliedCoupon ? `\n🏷️ *Discount (${appliedCoupon.code}):* -${formatPrice(discountAmount)}` : '';
    const deliveryFeeText = deliveryFee > 0 ? `\n🚚 *Delivery Fee:* ${formatPrice(deliveryFee)}` : `\n🚚 *Delivery Fee:* FREE`;
    return `🛍️ *NEW ORDER FROM AURA & CO. WEBSITE*\n----------------------------------------\n📋 *Order ID:* #${orderId}\n👤 *Customer:* ${deliveryDetails.name || 'Valued Customer'}\n📞 *Phone:* ${deliveryDetails.phone || 'N/A'}\n\n${fulfillmentText}\n\n----------------------------------------\n🛒 *ORDER ITEMS:*\n${itemsList}\n\n----------------------------------------\n💵 *Subtotal:* ${formatPrice(subtotal)}${discountText}${deliveryFeeText}\n✨ *TOTAL DUE:* ${formatPrice(total)}\n----------------------------------------\nThank you! Please confirm availability and delivery window.`;
  }, [cart, orderId, deliveryDetails, deliveryMethod, selectedPickupLocation, subtotal, appliedCoupon, discountAmount, deliveryFee, total]);

  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(formattedOrderText)}`;
  const handleCopy = () => { navigator.clipboard.writeText(formattedOrderText); setCopied(true); showToast('Order copied!', 'success'); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="p-6 rounded-3xl text-center space-y-3" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={R.btnPrimary}>
          <Sparkles className="w-3.5 h-3.5" /> <span>{t('finalStep')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: R.text }}>{t('orderReady')}</h1>
        <p className="text-xs sm:text-sm max-w-xl mx-auto font-light" style={{ color: R.muted }}>
          {t('noPaymentNotice')} <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: '#fff', color: R.accent, border: `1px solid ${R.cardBorder}` }}>{storePhoneNumber}</code>.
        </p>
        <button onClick={() => setSettingsOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: R.accent }}>
          <Settings className="w-3.5 h-3.5" /> <span>{t('changePhone')} ({storePhoneNumber})</span>
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl space-y-6" style={{ background: R.card, border: `1px solid ${R.cardBorder}`, boxShadow: '0 8px 30px rgba(212,136,155,0.08)' }}>
            <div className="flex justify-between items-center pb-4" style={{ borderBottom: `1px solid ${R.border}` }}>
              <div><span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: R.accent }}>{t('orderRef')}</span><span className="font-mono font-bold text-lg" style={{ color: R.text }}>#{orderId}</span></div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>{t('pendingSend')}</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('itemsOrdered')}</h3>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" style={{ border: `1px solid ${R.cardBorder}` }} />
                    <div><span className="font-semibold block" style={{ color: R.text }}>{product.name}</span><span style={{ color: R.muted }}>Qty: {quantity} × {formatPrice(product.price)}</span></div>
                  </div>
                  <span className="font-bold" style={{ color: R.accent }}>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 space-y-3 text-xs" style={{ borderTop: `1px solid ${R.border}` }}>
              <h3 className="font-bold uppercase tracking-wider" style={{ color: R.text }}>{t('fulfillmentDetails')}</h3>
              <div className="p-4 rounded-2xl space-y-2" style={{ background: R.accentBg, border: `1px solid ${R.cardBorder}` }}>
                <div className="flex items-center gap-2 font-semibold" style={{ color: R.text }}><User className="w-4 h-4" style={{ color: R.accent }} /> {deliveryDetails.name} ({deliveryDetails.phone})</div>
                {deliveryMethod === 'delivery' ? <div className="flex items-start gap-2" style={{ color: R.muted }}><Truck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: R.accent }} /><div><strong style={{ color: R.text }}>Courier:</strong> {deliveryDetails.address}, {deliveryDetails.city}</div></div>
                  : <div className="flex items-start gap-2" style={{ color: R.muted }}><Store className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: R.accent }} /><div><strong style={{ color: R.text }}>Store Pickup:</strong> {selectedPickupLocation.name}</div></div>}
              </div>
            </div>
            <div className="pt-4 space-y-2 text-xs" style={{ borderTop: `1px solid ${R.border}` }}>
              <div className="flex justify-between" style={{ color: R.muted }}><span>Subtotal</span><span className="font-semibold" style={{ color: R.text }}>{formatPrice(subtotal)}</span></div>
              {appliedCoupon && <div className="flex justify-between font-semibold" style={{ color: '#059669' }}><span>Discount ({appliedCoupon.code})</span><span>-{formatPrice(discountAmount)}</span></div>}
              <div className="flex justify-between" style={{ color: deliveryFee > 0 ? R.muted : '#059669' }}><span>Delivery Fee</span><span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'FREE'}</span></div>
              <div className="pt-3 flex justify-between items-baseline" style={{ borderTop: `1px solid ${R.border}` }}>
                <span className="font-serif text-xl font-bold" style={{ color: R.text }}>{t('totalPayable')}</span>
                <span className="text-2xl font-bold" style={{ color: R.accent }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl space-y-4" style={{ background: '#36121D', border: `1px solid rgba(212,136,155,0.25)` }}>
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: '1px solid rgba(212,136,155,0.2)' }}>
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: '#F2B8C6' }}><MessageSquare className="w-4 h-4" /> {t('generatedWhatsAppText')}</span>
              <button onClick={handleCopy} className="text-[11px] font-semibold flex items-center gap-1" style={{ color: 'rgba(242,184,198,0.7)' }}>{copied ? <Check className="w-3.5 h-3.5" style={{ color: '#34D399' }} /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <div className="p-4 rounded-2xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap select-all max-h-80 overflow-y-auto" style={{ background: '#26091080', border: '1px solid rgba(212,136,155,0.2)', color: 'rgba(242,184,198,0.8)' }}>{formattedOrderText}</div>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => showToast(`Opening WhatsApp to ${storePhoneNumber}...`, 'success')} className="w-full py-4 font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2" style={{ background: '#16a34a', color: '#fff' }}>
              <MessageSquare className="w-5 h-5" /> <span>{t('sendToWhatsApp')} ({storePhoneNumber})</span>
            </a>
            <button onClick={handleCopy} className="w-full py-3 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors" style={{ background: R.accentBg, border: `1px solid rgba(212,136,155,0.3)`, color: '#F2B8C6' }}>
              {copied ? <Check className="w-4 h-4" style={{ color: '#34D399' }} /> : <Copy className="w-4 h-4" />} <span>{copied ? t('copied') : t('copyOrderSummary')}</span>
            </button>
          </div>
          <div className="flex justify-between items-center text-xs">
            <button onClick={() => navigateTo('delivery')} className="flex items-center gap-1 font-semibold hover:opacity-70 transition-opacity" style={{ color: R.muted }}><ArrowLeft className="w-3.5 h-3.5" /> <span>{t('editDeliveryInfo')}</span></button>
            <button onClick={() => { clearCart(); navigateTo('home'); showToast('Order complete! Thank you!', 'success'); }} className="font-bold flex items-center gap-1 hover:opacity-70 transition-opacity" style={{ color: R.accent }}><RefreshCcw className="w-3.5 h-3.5" /> <span>{t('startNewOrder')}</span></button>
          </div>
        </div>
      </div>
    </div>
  );
};
