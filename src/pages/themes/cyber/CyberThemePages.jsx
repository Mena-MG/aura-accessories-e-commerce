// Cyber Luxury Theme — All 6 Page Variants
// Aesthetic: Pitch Black #060709, Dark Card #0D0F14, Electric Cyan #00F0FF, Neon Purple #A855F7
// Layout style: High-tech angled chamfered panels, glowing cyber borders, HUD status indicators, sci-fi typography.

import React, { useState, useMemo } from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice, PICKUP_LOCATIONS } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import {
  Sparkles, ArrowRight, ArrowLeft, Cpu, ShoppingBag,
  Trash2, Plus, Minus, Tag, Check, AlertCircle,
  SlidersHorizontal, ArrowUpDown, X, RotateCcw,
  Heart, Star, CheckCircle2, MessageSquare, Share2,
  Truck, Store, MapPin, Clock, User, Home,
  Copy, RefreshCcw, Settings, Terminal, Radio
} from 'lucide-react';

const C = {
  bg: '#060709',
  card: '#0D0F14',
  cardBorder: 'rgba(0,240,255,0.25)',
  text: '#E2E8F0',
  muted: '#94A3B8',
  accent: '#00F0FF',
  purple: '#A855F7',
  accentBg: 'rgba(0,240,255,0.1)',
  border: 'rgba(0,240,255,0.2)',
  btnPrimary: { background: 'linear-gradient(135deg, #00F0FF 0%, #A855F7 100%)', color: '#060709', fontWeight: 'bold' },
  inputBg: '#141720',
};

// ─────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────
export const CyberHomePage = () => {
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
    <div className="space-y-10 sm:space-y-20 animate-fade-in font-mono" style={{ background: C.bg, color: C.text }}>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-10 lg:pb-20" style={{ background: 'linear-gradient(180deg, #0A0D14 0%, #060709 100%)', borderBottom: `1px solid ${C.border}` }}>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider sm:tracking-widest" style={{ background: C.accentBg, border: `1px solid ${C.cardBorder}`, color: C.accent }}>
                <Terminal className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
                <span>SYSTEM ONLINE • CAIRO CYBER EDITION</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl font-light leading-tight" style={{ color: C.text }}>
                {t('heroTitle1')} <br />
                <span className="font-sans font-bold" style={{ background: 'linear-gradient(135deg, #00F0FF 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t('heroTitle2')}
                </span>
              </h1>

              <p className="text-sm sm:text-base font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ color: C.muted }}>
                {t('heroDesc')}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => navigateTo('catalog')} className="w-full sm:w-auto px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-md shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 flex items-center justify-center gap-3 group" style={C.btnPrimary}>
                  <span>{t('exploreCatalog')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigateTo('product-detail', 'prod-2')} className="w-full sm:w-auto px-7 py-4 font-bold text-xs uppercase tracking-widest rounded-md border flex items-center justify-center gap-2 transition-all" style={{ background: C.card, borderColor: C.cardBorder, color: C.accent }}>
                  <Radio className="w-4 h-4 text-purple-400" />
                  <span>{t('viewFeatured')}</span>
                </button>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t" style={{ borderColor: C.border }}>
                {[['100%', t('handmadeQuality')], ['WhatsApp', t('instantCheckout')], ['Same Day', t('sameDayPickup')]].map(([val, label]) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="text-base sm:text-xl font-bold font-mono" style={{ color: C.accent }}>{val}</div>
                    <div className="text-[9px] sm:text-[10px] uppercase font-mono mt-0.5" style={{ color: C.muted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div onClick={() => navigateTo('product-detail', heroProduct.id)} className="relative rounded-xl overflow-hidden cursor-pointer group border shadow-[0_0_30px_rgba(0,240,255,0.15)]" style={{ borderColor: C.cardBorder, background: C.card }}>
                  <img src={heroProduct.image} alt={heroProduct.name} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(to top, rgba(6,7,9,0.95) 0%, transparent 80%)' }}>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('featuredSpotlight')}</span>
                    <h3 className="font-serif text-2xl font-medium mt-1" style={{ color: C.text }}>{heroProduct.name}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
                      <span className="text-lg font-bold" style={{ color: C.accent }}>{formatPrice(heroProduct.price)}</span>
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>{t('shopNow')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('curatedCategories')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: C.text }}>{t('designedToInspire')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('catalog')} className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border shadow-[0_0_15px_rgba(0,240,255,0.08)]" style={{ borderColor: C.cardBorder }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(to top, rgba(6,7,9,0.9) 0%, transparent 80%)' }}>
                <h3 className="font-serif text-lg sm:text-xl font-medium" style={{ color: C.text }}>{cat.name}</h3>
                <p className="text-[11px] font-mono mt-0.5" style={{ color: C.accent }}>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b" style={{ borderColor: C.border }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('handpickedFavorites')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: C.text }}>{t('featuredBestSellers')}</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:opacity-70" style={{ color: C.accent }}>
            <span>{t('viewAllProducts')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="rounded-xl overflow-hidden border shadow-[0_0_15px_rgba(0,240,255,0.08)]" style={{ background: C.card, borderColor: C.cardBorder }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-2xl p-5 sm:p-8 md:p-12 overflow-hidden border shadow-[0_0_40px_rgba(0,240,255,0.15)]" style={{ background: 'linear-gradient(135deg, #0A0F1D 0%, #150A21 100%)', borderColor: C.cardBorder }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('exclusiveOffer')}</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-white">{t('promoTitle')}</h3>
              <p className="text-xs sm:text-sm font-mono max-w-xl" style={{ color: C.muted }}>
                Use protocol code <code className="px-2 py-0.5 rounded border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>WELCOME10</code> for 10% discount or <code className="px-2 py-0.5 rounded border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>ACCESS20</code> for 20%.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button onClick={() => navigateTo('catalog')} className="w-full sm:w-auto px-8 py-3.5 font-bold text-xs uppercase tracking-widest rounded-md" style={C.btnPrimary}>
                {t('claimDiscount')}
              </button>
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
export const CyberCatalogPage = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-mono" style={{ minHeight: '80vh' }}>
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('fullCollection')}</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light" style={{ color: C.text }}>{t('catalogTitle')}</h1>
        <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: C.muted }}>{t('catalogDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="hidden lg:block p-6 rounded-xl sticky top-28 space-y-6 border" style={{ background: C.card, borderColor: C.cardBorder }}>
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2 font-serif text-lg font-medium" style={{ color: C.text }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: C.accent }} /> <span>{t('filters')}</span>
              {activeFilterCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.cardBorder}` }}>{activeFilterCount}</span>}
            </div>
            {activeFilterCount > 0 && <button onClick={resetFilters} className="text-xs font-bold flex items-center gap-1 text-purple-400"><RotateCcw className="w-3 h-3" /> {t('reset')}</button>}
          </div>
          {[{ title: t('category'), items: categories, val: selectedCategory, set: setSelectedCategory }, { title: t('material'), items: materials, val: selectedMaterial, set: setSelectedMaterial }, { title: t('colorPalette'), items: colors, val: selectedColor, set: setSelectedColor }].map(({ title, items, val, set }, gi) => (
            <div key={gi} className={gi > 0 ? 'space-y-2.5 pt-4 border-t' : 'space-y-2.5'} style={gi > 0 ? { borderColor: C.border } : {}}>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: C.text }}>{title}</h4>
              <div className="space-y-1 text-xs">{items.map(item => <button key={item} onClick={() => set(item)} className="block w-full text-left rtl:text-right py-1.5 px-3 rounded transition-colors border" style={val === item ? { background: C.accentBg, borderColor: C.cardBorder, color: C.accent, fontWeight: 'bold' } : { background: 'transparent', borderColor: 'transparent', color: C.muted }}>{item}</button>)}</div>
            </div>
          ))}
          <div className="space-y-2.5 pt-4 border-t" style={{ borderColor: C.border }}>
            <div className="flex justify-between items-center text-xs"><h4 className="font-bold uppercase tracking-wider" style={{ color: C.text }}>{t('maxPrice')}</h4><span className="font-bold" style={{ color: C.accent }}>{formatPrice(maxPrice)}</span></div>
            <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: C.accent }} />
          </div>
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4" style={{ background: C.card, borderColor: C.cardBorder }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>
                <SlidersHorizontal className="w-4 h-4" /> {t('filters')} ({activeFilterCount})
              </button>
              <span className="text-xs font-mono">{t('showing')} <strong style={{ color: C.text }}>{filteredProducts.length}</strong> {t('productsCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs font-bold rounded-lg px-3 py-2 border cursor-pointer" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.text }}>
                <option value="featured">{t('sortFeatured')}</option><option value="price-low">{t('sortPriceLow')}</option><option value="price-high">{t('sortPriceHigh')}</option><option value="rating">{t('sortRating')}</option><option value="newest">{t('sortNewest')}</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="rounded-xl overflow-hidden border shadow-[0_0_15px_rgba(0,240,255,0.08)]" style={{ background: C.card, borderColor: C.cardBorder }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-xl border text-center space-y-4" style={{ background: C.card, borderColor: C.cardBorder }}>
              <p className="text-base font-mono" style={{ color: C.muted }}>{t('noProductsMatch')}</p>
              <button onClick={resetFilters} className="px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider" style={C.btnPrimary}>{t('clearAllFilters')}</button>
            </div>
          )}
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end lg:hidden">
          <div className="w-full max-w-xs h-full p-6 space-y-6 flex flex-col justify-between" style={{ background: C.card }}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: C.border }}>
                <h3 className="font-serif text-xl font-medium" style={{ color: C.text }}>{t('filters')}</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" style={{ color: C.text }} /></button>
              </div>
              <div className="py-4 space-y-2">
                {categories.map(c => <button key={c} onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); }} className="block w-full text-left py-1 text-xs font-bold" style={selectedCategory === c ? { color: C.accent } : { color: C.muted }}>{c}</button>)}
              </div>
            </div>
            <button onClick={() => setMobileFilterOpen(false)} className="w-full py-3 font-bold text-xs uppercase rounded" style={C.btnPrimary}>Apply ({filteredProducts.length})</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────
export const CyberProductDetailPage = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist, showToast, storePhoneNumber, t } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');
  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);
  const handleAddToCart = () => { addToCart(selectedProduct, quantity); setAddedAnimation(true); setTimeout(() => setAddedAnimation(false), 1500); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in font-mono">
      <button onClick={() => navigateTo('catalog')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: C.muted }}>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('backToCatalog')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border shadow-[0_0_30px_rgba(0,240,255,0.15)] group" style={{ background: C.card, borderColor: C.cardBorder }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90" />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded border text-xs font-bold uppercase tracking-wider" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>
                {selectedProduct.badge}
              </div>
            )}
            <button onClick={() => toggleWishlist(selectedProduct.id)} className="absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md border flex items-center justify-center" style={{ background: 'rgba(6,7,9,0.7)', borderColor: C.cardBorder, color: isWishlisted ? C.accent : C.muted }}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{selectedProduct.category}</span>
            <div className="flex items-center gap-1 text-xs font-bold" style={{ color: '#FBBF24' }}>
              <Star className="w-4 h-4 fill-current" /> <span>{selectedProduct.rating} ({selectedProduct.reviewsCount})</span>
            </div>
          </div>

          <div className="space-y-2 pb-6 border-b" style={{ borderColor: C.border }}>
            <h1 className="font-serif text-3xl sm:text-4xl font-light leading-tight" style={{ color: C.text }}>{selectedProduct.name}</h1>
            <div className="text-2xl sm:text-3xl font-bold pt-2" style={{ color: C.accent }}>{formatPrice(selectedProduct.price)}</div>
          </div>

          <p className="text-sm font-light leading-relaxed" style={{ color: C.muted }}>{selectedProduct.description}</p>

          <div className="grid grid-cols-2 gap-3 py-2 text-xs">
            <div className="p-3 rounded-lg border" style={{ background: C.accentBg, borderColor: C.cardBorder }}><span className="text-[10px] uppercase font-bold block" style={{ color: C.muted }}>{t('material')}</span><span className="font-semibold" style={{ color: C.text }}>{selectedProduct.material}</span></div>
            <div className="p-3 rounded-lg border" style={{ background: C.accentBg, borderColor: C.cardBorder }}><span className="text-[10px] uppercase font-bold block" style={{ color: C.muted }}>{t('colorPalette')}</span><span className="font-semibold" style={{ color: C.text }}>{selectedProduct.color}</span></div>
          </div>

          <div className="space-y-4 pt-4 border-t" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase" style={{ color: C.text }}>{t('quantity')}</span>
              <div className="flex items-center rounded-lg border p-1" style={{ borderColor: C.cardBorder, background: C.accentBg }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded flex items-center justify-center"><Minus className="w-3.5 h-3.5" /></button>
                <span className="w-10 text-center font-bold text-xs" style={{ color: C.accent }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded flex items-center justify-center"><Plus className="w-3.5 h-3.5" /></button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all" style={addedAnimation ? { background: '#059669', color: '#fff' } : C.btnPrimary}>
              {addedAnimation ? <span>{t('addedToCart')} ✓</span> : <span>{t('addToCart')} — {formatPrice(selectedProduct.price * quantity)}</span>}
            </button>

            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi!%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(selectedProduct.name)}`} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 rounded-md text-xs font-bold flex items-center justify-center gap-2 border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>
                <MessageSquare className="w-4 h-4 text-emerald-400" /> <span>{t('inquireWhatsApp')}</span>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Copied!', 'info'); }} className="p-3 rounded-md border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}><Share2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────
export const CyberCartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, subtotal, appliedCoupon, couponInput, setCouponInput, couponError, applyDiscountCode, removeDiscountCode, discountAmount, navigateTo, t } = useShop();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in font-mono">
        <div className="w-20 h-20 rounded-full border flex items-center justify-center mx-auto" style={{ background: C.accentBg, borderColor: C.cardBorder }}><ShoppingBag className="w-10 h-10" style={{ color: C.accent }} /></div>
        <h2 className="font-serif text-3xl font-light" style={{ color: C.text }}>{t('emptyBag')}</h2>
        <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-widest" style={C.btnPrimary}>{t('exploreCatalog')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-mono">
      <div className="flex justify-between items-end pb-6 border-b" style={{ borderColor: C.border }}>
        <div><span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('shoppingBag')}</span><h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: C.text }}>{t('reviewOrder')}</h1></div>
        <button onClick={() => navigateTo('catalog')} className="text-xs font-bold uppercase flex items-center gap-1 hover:opacity-70" style={{ color: C.accent }}><ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('continueShopping')}</span></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="p-4 rounded-xl border flex flex-col sm:flex-row items-center gap-6" style={{ background: C.card, borderColor: C.cardBorder }}>
              <img src={product.image} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border" style={{ borderColor: C.cardBorder }} />
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-1">
                <span className="text-[10px] font-bold uppercase block" style={{ color: C.accent }}>{product.category}</span>
                <h3 className="font-serif text-lg font-medium" style={{ color: C.text }}>{product.name}</h3>
                <div className="text-sm font-semibold" style={{ color: C.accent }}>{formatPrice(product.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border p-1" style={{ borderColor: C.cardBorder, background: C.accentBg }}>
                  <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                  <span className="w-9 sm:w-8 text-center font-bold text-xs" style={{ color: C.accent }}>{quantity}</span>
                  <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="w-9 h-9 sm:w-7 sm:h-7 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-sm font-bold w-20 sm:w-24 text-right" style={{ color: C.text }}>{formatPrice(product.price * quantity)}</span>
                <button onClick={() => removeFromCart(product.id)} className="p-2 text-slate-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-xl border space-y-6" style={{ background: C.card, borderColor: C.cardBorder }}>
            <h2 className="font-serif text-xl font-medium pb-4 border-b" style={{ color: C.text, borderColor: C.border }}>{t('reviewOrder')}</h2>
            <div className="flex justify-between text-xs"><span>Subtotal</span><span className="font-semibold" style={{ color: C.text }}>{formatPrice(subtotal)}</span></div>
            {appliedCoupon && <div className="flex justify-between text-xs font-semibold text-emerald-400"><span>Discount</span><span>-{formatPrice(discountAmount)}</span></div>}
            <div className="pt-4 border-t flex justify-between items-baseline" style={{ borderColor: C.border }}><span className="font-bold">{t('subtotalDue')}</span><span className="text-2xl font-bold" style={{ color: C.accent }}>{formatPrice(subtotal - discountAmount)}</span></div>
            <button onClick={() => navigateTo('delivery')} className="w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)]" style={C.btnPrimary}>{t('proceedToDelivery')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// DELIVERY PAGE
// ─────────────────────────────────────────
export const CyberDeliveryPage = () => {
  const { deliveryMethod, setDeliveryMethod, deliveryDetails, setDeliveryDetails, selectedPickupLocation, setSelectedPickupLocation, navigateTo, t } = useShop();
  const handleInputChange = (e) => setDeliveryDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const inputStyle = { background: C.inputBg, border: `1px solid ${C.cardBorder}`, color: C.text };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-mono">
      <div className="flex items-center justify-between pb-6 border-b" style={{ borderColor: C.border }}>
        <div><span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.accent }}>{t('checkoutStep2')}</span><h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: C.text }}>{t('fulfillmentMethod')}</h1></div>
        <button onClick={() => navigateTo('cart')} className="text-xs font-bold uppercase flex items-center gap-1.5 hover:opacity-70" style={{ color: C.accent }}><ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('shoppingBag')}</span></button>
      </div>

      <div className="grid grid-cols-2 p-1.5 rounded-xl border max-w-lg mx-auto" style={{ background: C.accentBg, borderColor: C.cardBorder }}>
        {[['delivery', t('courierDelivery'), Truck], ['pickup', t('boutiquePickup'), Store]].map(([method, label, Icon]) => (
          <button key={method} onClick={() => setDeliveryMethod(method)} className="py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2" style={deliveryMethod === method ? C.btnPrimary : { color: C.muted }}>
            <Icon className="w-4 h-4" /> <span>{label}</span>
          </button>
        ))}
      </div>

      {deliveryMethod === 'delivery' && (
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('summary'); }} className="p-6 sm:p-8 rounded-xl border space-y-6" style={{ background: C.card, borderColor: C.cardBorder }}>
          <h2 className="font-serif text-xl font-medium pb-4 border-b" style={{ color: C.text, borderColor: C.border }}>{t('enterShippingAddress')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            {[{ id: 'name', label: t('fullName'), ph: 'Mariam Hassan' }, { id: 'phone', label: t('phoneNumber'), ph: '+20 100 234 5678' }].map(({ id, label, ph }) => (
              <div key={id} className="space-y-1.5"><label className="font-bold uppercase tracking-wider">{label}</label><input type="text" name={id} required value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-lg px-4 py-3 focus:outline-none" style={inputStyle} /></div>
            ))}
            <div className="sm:col-span-2 space-y-1.5"><label className="font-bold uppercase tracking-wider">{t('streetAddress')}</label><input type="text" name="address" required value={deliveryDetails.address} onChange={handleInputChange} placeholder="15 El-Bostan Street" className="w-full text-xs rounded-lg px-4 py-3 focus:outline-none" style={inputStyle} /></div>
            {[{ id: 'city', label: t('cityPostal'), ph: 'Heliopolis, Cairo' }, { id: 'notes', label: t('specialInstructions'), ph: 'Call upon arrival' }].map(({ id, label, ph }) => (
              <div key={id} className="space-y-1.5"><label className="font-bold uppercase tracking-wider">{label}</label><input type="text" name={id} value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-lg px-4 py-3 focus:outline-none" style={inputStyle} /></div>
            ))}
          </div>
          <button type="submit" className="w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)]" style={C.btnPrimary}>{t('continueToRecap')}</button>
        </form>
      )}

      {deliveryMethod === 'pickup' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border space-y-4" style={{ background: C.card, borderColor: C.cardBorder }}>
            <h2 className="font-serif text-xl font-medium pb-3 border-b" style={{ color: C.text, borderColor: C.border }}>{t('selectBoutique')}</h2>
            {PICKUP_LOCATIONS.map(loc => {
              const isSelected = selectedPickupLocation.id === loc.id;
              return (
                <div key={loc.id} onClick={() => setSelectedPickupLocation(loc)} className="p-4 rounded-lg border cursor-pointer flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3" style={{ borderColor: isSelected ? C.accent : C.cardBorder, background: isSelected ? C.accentBg : C.inputBg }}>
                  <div><div className="font-bold text-sm" style={{ color: C.text }}>{loc.name}</div><div className="text-xs text-slate-400">{loc.address}</div></div>
                  <button type="button" className="w-full sm:w-auto px-3 py-1 text-xs font-bold rounded border" style={isSelected ? C.btnPrimary : { background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>{isSelected ? t('selected') : t('chooseStore')}</button>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigateTo('summary')} className="w-full py-4 rounded-md font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.3)]" style={C.btnPrimary}>{t('continueToRecap')}</button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// ORDER SUMMARY PAGE
// ─────────────────────────────────────────
export const CyberOrderSummaryPage = () => {
  const { cart, subtotal, appliedCoupon, discountAmount, deliveryMethod, deliveryDetails, selectedPickupLocation, deliveryFee, total, navigateTo, showToast, clearCart, storePhoneNumber, setSettingsOpen, t } = useShop();
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => `AUR-${Math.floor(10000 + Math.random() * 90000)}`);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');

  const formattedOrderText = useMemo(() => {
    const itemsList = cart.map(item => `• ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)} ea)`).join('\n');
    const fulfillmentText = deliveryMethod === 'delivery' ? `🚚 *METHOD:* Courier Delivery\n📍 *Address:* ${deliveryDetails.address}, ${deliveryDetails.city}` : `🏪 *METHOD:* Store Pickup\n📍 *Store:* ${selectedPickupLocation.name}`;
    return `🛍️ *NEW ORDER FROM AURA & CO.*\n----------------------------------------\n📋 *Order ID:* #${orderId}\n👤 *Customer:* ${deliveryDetails.name || 'Valued Customer'}\n📞 *Phone:* ${deliveryDetails.phone || 'N/A'}\n\n${fulfillmentText}\n\n🛒 *ITEMS:*\n${itemsList}\n\n✨ *TOTAL DUE:* ${formatPrice(total)}`;
  }, [cart, orderId, deliveryDetails, deliveryMethod, selectedPickupLocation, total]);

  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(formattedOrderText)}`;
  const handleCopy = () => { navigator.clipboard.writeText(formattedOrderText); setCopied(true); showToast('Copied!', 'success'); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-mono">
      <div className="p-6 rounded-xl border text-center space-y-3 shadow-[0_0_30px_rgba(0,240,255,0.1)]" style={{ background: C.card, borderColor: C.cardBorder }}>
        <h1 className="font-serif text-3xl font-light" style={{ color: C.text }}>{t('orderReady')}</h1>
        <p className="text-xs text-slate-400">{t('noPaymentNotice')} <code className="px-2 py-0.5 rounded border" style={{ background: C.accentBg, borderColor: C.cardBorder, color: C.accent }}>{storePhoneNumber}</code></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 p-6 rounded-xl border space-y-6" style={{ background: C.card, borderColor: C.cardBorder }}>
          <div className="flex justify-between border-b pb-3" style={{ borderColor: C.border }}><span className="font-bold">Order #{orderId}</span><span className="text-xs font-bold text-emerald-400">Pending Send</span></div>
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="flex flex-wrap justify-between gap-1 text-xs font-bold"><span>{quantity}x {product.name}</span><span style={{ color: C.accent }}>{formatPrice(product.price * quantity)}</span></div>
          ))}
          <div className="border-t pt-3 flex justify-between font-bold text-lg" style={{ borderColor: C.border }}><span>Total Payable</span><span style={{ color: C.accent }}>{formatPrice(total)}</span></div>
        </div>

        <div className="lg:col-span-5 p-6 rounded-xl border space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.15)]" style={{ background: '#090B10', borderColor: C.cardBorder }}>
          <div className="text-[11px] font-mono whitespace-pre-wrap p-3 rounded-lg border bg-black/60 text-slate-300 max-h-64 overflow-y-auto" style={{ borderColor: C.cardBorder }}>{formattedOrderText}</div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full py-4 font-bold text-xs uppercase rounded-md block text-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">{t('sendToWhatsApp')}</a>
          <button onClick={handleCopy} className="w-full py-3 font-bold text-xs uppercase rounded-md border text-cyan-400 bg-transparent hover:bg-cyan-950/40" style={{ borderColor: C.cardBorder }}>{copied ? 'Copied!' : 'Copy Summary'}</button>
        </div>
      </div>
    </div>
  );
};
