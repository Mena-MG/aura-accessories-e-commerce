// Artisanal Heritage Theme — All 6 Page Variants
// Aesthetic: Terracotta #C85A32, Parchment #F7F4EE, Craft Card #FFFDF8, Charcoal #2A2421
// Layout style: Industrial boxed borders, stamp badges, vintage typography mix, raw craft grid structure.

import React, { useState, useMemo } from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice, PICKUP_LOCATIONS } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import {
  Sparkles, ArrowRight, ArrowLeft, Hammer, ShoppingBag,
  Trash2, Plus, Minus, Tag, Check, AlertCircle,
  SlidersHorizontal, ArrowUpDown, X, RotateCcw,
  Heart, Star, CheckCircle2, MessageSquare, Share2,
  Truck, Store, MapPin, Clock, User, Home,
  Copy, RefreshCcw, Settings, Stamp
} from 'lucide-react';

const H = {
  bg: '#F7F4EE',
  card: '#FFFDF8',
  cardBorder: '#D9CEBE',
  text: '#2A2421',
  muted: '#73675E',
  accent: '#C85A32',
  accentHover: '#A44320',
  accentBg: 'rgba(200,90,50,0.08)',
  border: '#D9CEBE',
  btnPrimary: { background: '#C85A32', color: '#FFFDF8', border: '2px solid #2A2421' },
  inputBg: '#EFE9DE',
};

// ─────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────
export const HeritageHomePage = () => {
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
    <div className="space-y-8 sm:space-y-16 animate-fade-in font-mono" style={{ background: H.bg, color: H.text }}>
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b-2" style={{ borderColor: H.text, background: '#EFE9DE' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded border-2 text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider" style={{ borderColor: H.text, background: '#FFFDF8', color: H.accent }}>
                <Hammer className="w-3.5 h-3.5" />
                <span>HANDCRAFTED IN CAIRO • EST 2026</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl font-bold leading-tight" style={{ color: H.text }}>
                {t('heroTitle1')} <span className="italic underline underline-offset-8" style={{ color: H.accent }}>{t('heroTitle2')}</span>
              </h1>

              <p className="text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans" style={{ color: H.muted }}>
                {t('heroDesc')}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => navigateTo('catalog')} className="w-full sm:w-auto px-8 py-4 font-bold text-xs uppercase tracking-widest transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-3 shadow-[4px_4px_0px_#2A2421]" style={H.btnPrimary}>
                  <span>{t('exploreCatalog')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button onClick={() => navigateTo('product-detail', 'prod-2')} className="w-full sm:w-auto px-7 py-4 font-bold text-xs uppercase tracking-widest border-2 bg-white flex items-center justify-center gap-2" style={{ borderColor: H.text, color: H.text }}>
                  <Stamp className="w-4 h-4 text-amber-700" />
                  <span>{t('viewFeatured')}</span>
                </button>
              </div>

              <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t-2" style={{ borderColor: H.text }}>
                {[['100%', t('handmadeQuality')], ['WhatsApp', t('instantCheckout')], ['Same Day', t('sameDayPickup')]].map(([val, label]) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="text-base sm:text-xl font-bold" style={{ color: H.accent }}>{val}</div>
                    <div className="text-[9px] sm:text-[10px] uppercase font-mono mt-0.5" style={{ color: H.muted }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div onClick={() => navigateTo('product-detail', heroProduct.id)} className="relative border-2 overflow-hidden cursor-pointer group shadow-[4px_4px_0px_#2A2421] sm:shadow-[8px_8px_0px_#2A2421]" style={{ borderColor: H.text, background: H.card }}>
                  <img src={heroProduct.image} alt={heroProduct.name} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-4 border-t-2 bg-[#FFFDF8]" style={{ borderColor: H.text }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: H.accent }}>{t('featuredSpotlight')}</span>
                    <h3 className="font-serif text-xl font-bold mt-0.5" style={{ color: H.text }}>{heroProduct.name}</h3>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t" style={{ borderColor: H.border }}>
                      <span className="text-base font-bold" style={{ color: H.accent }}>{formatPrice(heroProduct.price)}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border" style={{ borderColor: H.text, background: H.inputBg }}>{t('shopNow')}</span>
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
        <div className="text-center max-w-xl mx-auto mb-10 space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: H.accent }}>{t('curatedCategories')}</span>
          <h2 className="font-serif text-3xl font-bold" style={{ color: H.text }}>{t('designedToInspire')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('catalog')} className="group relative aspect-[3/4] border-2 overflow-hidden cursor-pointer shadow-[2px_2px_0px_#2A2421] sm:shadow-[4px_4px_0px_#2A2421]" style={{ borderColor: H.text }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 p-3 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(to top, rgba(42,36,33,0.9) 0%, transparent 80%)' }}>
                <h3 className="font-serif text-base font-bold">{cat.name}</h3>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: '#EFE9DE' }}>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b-2" style={{ borderColor: H.text }}>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: H.accent }}>{t('handpickedFavorites')}</span>
            <h2 className="font-serif text-3xl font-bold mt-1" style={{ color: H.text }}>{t('featuredBestSellers')}</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:underline" style={{ color: H.accent }}>
            <span>{t('viewAllProducts')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="border-2 shadow-[4px_4px_0px_#2A2421]" style={{ borderColor: H.text, background: H.card }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="border-2 p-5 sm:p-8 md:p-10 shadow-[4px_4px_0px_#2A2421] sm:shadow-[8px_8px_0px_#2A2421]" style={{ background: '#2A2421', color: '#F7F4EE', borderColor: '#2A2421' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#EFE9DE' }}>{t('exclusiveOffer')}</span>
              <h3 className="font-serif text-3xl font-bold text-white">{t('promoTitle')}</h3>
              <p className="text-xs font-mono max-w-xl" style={{ color: '#D9CEBE' }}>
                Use voucher <code className="bg-[#1E1917] px-2 py-0.5 border border-[#D9CEBE] text-white">WELCOME10</code> for 10% off or <code className="bg-[#1E1917] px-2 py-0.5 border border-[#D9CEBE] text-white">ACCESS20</code> for 20% off.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button onClick={() => navigateTo('catalog')} className="w-full md:w-auto px-8 py-3.5 font-bold text-xs uppercase tracking-widest border-2 bg-white text-[#2A2421] hover:bg-[#C85A32] hover:text-white transition-colors" style={{ borderColor: '#F7F4EE' }}>
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
export const HeritageCatalogPage = () => {
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
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: H.accent }}>{t('fullCollection')}</span>
        <h1 className="font-serif text-4xl font-bold" style={{ color: H.text }}>{t('catalogTitle')}</h1>
        <p className="text-xs font-sans max-w-lg mx-auto" style={{ color: H.muted }}>{t('catalogDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block p-5 border-2 sticky top-28 space-y-5" style={{ background: H.card, borderColor: H.text }}>
          <div className="flex items-center justify-between pb-3 border-b-2" style={{ borderColor: H.text }}>
            <div className="flex items-center gap-2 font-serif text-base font-bold" style={{ color: H.text }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: H.accent }} /> <span>{t('filters')}</span>
              {activeFilterCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 border" style={{ background: H.accent, color: '#white', borderColor: H.text }}>{activeFilterCount}</span>}
            </div>
            {activeFilterCount > 0 && <button onClick={resetFilters} className="text-xs font-bold flex items-center gap-1" style={{ color: H.accent }}><RotateCcw className="w-3 h-3" /> {t('reset')}</button>}
          </div>
          {[{ title: t('category'), items: categories, val: selectedCategory, set: setSelectedCategory }, { title: t('material'), items: materials, val: selectedMaterial, set: setSelectedMaterial }, { title: t('colorPalette'), items: colors, val: selectedColor, set: setSelectedColor }].map(({ title, items, val, set }, gi) => (
            <div key={gi} className={gi > 0 ? 'space-y-2 pt-3 border-t-2' : 'space-y-2'} style={gi > 0 ? { borderColor: H.border } : {}}>
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: H.text }}>{title}</h4>
              <div className="space-y-1 text-xs">{items.map(item => <button key={item} onClick={() => set(item)} className="block w-full text-left rtl:text-right py-1 px-2.5 transition-colors border" style={val === item ? { background: H.accent, color: '#fff', borderColor: H.text, fontWeight: 'bold' } : { background: 'transparent', borderColor: 'transparent', color: H.muted }}>{item}</button>)}</div>
            </div>
          ))}
          <div className="space-y-2 pt-3 border-t-2" style={{ borderColor: H.border }}>
            <div className="flex justify-between items-center text-xs"><h4 className="font-bold uppercase tracking-wider" style={{ color: H.text }}>{t('maxPrice')}</h4><span className="font-bold" style={{ color: H.accent }}>{formatPrice(maxPrice)}</span></div>
            <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: H.accent }} />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-3 border-2 flex flex-wrap items-center justify-between gap-4" style={{ background: H.card, borderColor: H.text }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden px-3 py-1.5 border text-xs font-bold flex items-center gap-2" style={{ borderColor: H.text, background: H.accentBg, color: H.accent }}>
                <SlidersHorizontal className="w-4 h-4" /> {t('filters')} ({activeFilterCount})
              </button>
              <span className="text-xs font-mono">{t('showing')} <strong>{filteredProducts.length}</strong> {t('productsCount')}</span>
            </div>
            <div className="flex items-center gap-2">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-xs font-bold border px-3 py-1.5 cursor-pointer" style={{ background: H.card, borderColor: H.text, color: H.text }}>
                <option value="featured">{t('sortFeatured')}</option><option value="price-low">{t('sortPriceLow')}</option><option value="price-high">{t('sortPriceHigh')}</option><option value="rating">{t('sortRating')}</option><option value="newest">{t('sortNewest')}</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="border-2 shadow-[4px_4px_0px_#2A2421]" style={{ borderColor: H.text, background: H.card }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 border-2 text-center space-y-4" style={{ background: H.card, borderColor: H.text }}>
              <p className="text-base font-mono">{t('noProductsMatch')}</p>
              <button onClick={resetFilters} className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider" style={H.btnPrimary}>{t('clearAllFilters')}</button>
            </div>
          )}
        </div>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-end lg:hidden">
          <div className="w-full max-w-xs h-full p-6 space-y-6 flex flex-col justify-between" style={{ background: H.card }}>
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2" style={{ borderColor: H.text }}>
                <h3 className="font-serif text-xl font-bold" style={{ color: H.text }}>{t('filters')}</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" style={{ color: H.text }} /></button>
              </div>
              <div className="py-4 space-y-2">
                {categories.map(c => <button key={c} onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); }} className="block w-full text-left py-1 text-xs font-bold" style={selectedCategory === c ? { color: H.accent } : { color: H.muted }}>{c}</button>)}
              </div>
            </div>
            <button onClick={() => setMobileFilterOpen(false)} className="w-full py-3 font-bold text-xs uppercase" style={H.btnPrimary}>Apply ({filteredProducts.length})</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────
export const HeritageProductDetailPage = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist, showToast, storePhoneNumber, t } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');
  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);
  const handleAddToCart = () => { addToCart(selectedProduct, quantity); setAddedAnimation(true); setTimeout(() => setAddedAnimation(false), 1500); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in font-mono">
      <button onClick={() => navigateTo('catalog')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:underline" style={{ color: H.accent }}>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('backToCatalog')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6">
          <div className="relative aspect-square w-full border-2 overflow-hidden group shadow-[8px_8px_0px_#2A2421]" style={{ borderColor: H.text, background: H.card }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 px-3 py-1 border-2 font-bold text-xs uppercase tracking-wider" style={{ background: '#FFFDF8', borderColor: H.text, color: H.accent }}>
                {selectedProduct.badge}
              </div>
            )}
            <button onClick={() => toggleWishlist(selectedProduct.id)} className="absolute top-4 right-4 w-10 h-10 border-2 bg-white flex items-center justify-center" style={{ borderColor: H.text, color: isWishlisted ? H.accent : H.muted }}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: H.accent }}>{selectedProduct.category}</span>
            <div className="flex items-center gap-1 text-xs font-bold" style={{ color: H.accent }}>
              <Star className="w-4 h-4 fill-current" /> <span>{selectedProduct.rating} ({selectedProduct.reviewsCount})</span>
            </div>
          </div>

          <div className="space-y-1 pb-4 border-b-2" style={{ borderColor: H.text }}>
            <h1 className="font-serif text-3xl font-bold" style={{ color: H.text }}>{selectedProduct.name}</h1>
            <div className="text-2xl font-bold pt-2" style={{ color: H.accent }}>{formatPrice(selectedProduct.price)}</div>
          </div>

          <p className="text-xs font-sans leading-relaxed" style={{ color: H.muted }}>{selectedProduct.description}</p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 border-2" style={{ borderColor: H.text, background: H.inputBg }}><span className="text-[10px] font-bold block" style={{ color: H.muted }}>{t('material')}</span><span className="font-bold">{selectedProduct.material}</span></div>
            <div className="p-3 border-2" style={{ borderColor: H.text, background: H.inputBg }}><span className="text-[10px] font-bold block" style={{ color: H.muted }}>{t('colorPalette')}</span><span className="font-bold">{selectedProduct.color}</span></div>
          </div>

          <div className="space-y-4 pt-3 border-t-2" style={{ borderColor: H.text }}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase" style={{ color: H.text }}>{t('quantity')}</span>
              <div className="flex items-center border-2 p-0.5" style={{ borderColor: H.text, background: H.card }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 font-bold"><Minus className="w-3.5 h-3.5 mx-auto" /></button>
                <span className="w-8 text-center font-bold text-xs">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 font-bold"><Plus className="w-3.5 h-3.5 mx-auto" /></button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full py-4 font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0px_#2A2421] transition-transform hover:-translate-y-0.5" style={addedAnimation ? { background: '#15803d', color: '#fff', border: '2px solid #2A2421' } : H.btnPrimary}>
              {addedAnimation ? <span>{t('addedToCart')} ✓</span> : <span>{t('addToCart')} — {formatPrice(selectedProduct.price * quantity)}</span>}
            </button>

            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi!%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(selectedProduct.name)}`} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 border-2 font-bold text-xs flex items-center justify-center gap-2 bg-white" style={{ borderColor: H.text, color: H.text }}>
                <MessageSquare className="w-4 h-4 text-emerald-600" /> <span>{t('inquireWhatsApp')}</span>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Copied!', 'info'); }} className="p-3 border-2 bg-white" style={{ borderColor: H.text }}><Share2 className="w-4 h-4" /></button>
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
export const HeritageCartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, subtotal, appliedCoupon, couponInput, setCouponInput, couponError, applyDiscountCode, removeDiscountCode, discountAmount, navigateTo, t } = useShop();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in font-mono">
        <div className="w-16 h-16 border-2 flex items-center justify-center mx-auto" style={{ borderColor: H.text, background: H.card }}><ShoppingBag className="w-8 h-8" style={{ color: H.accent }} /></div>
        <h2 className="font-serif text-3xl font-bold" style={{ color: H.text }}>{t('emptyBag')}</h2>
        <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 font-bold text-xs uppercase tracking-wider" style={H.btnPrimary}>{t('exploreCatalog')}</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in font-mono">
      <div className="flex justify-between items-end pb-4 border-b-2" style={{ borderColor: H.text }}>
        <div><span className="text-xs font-bold uppercase" style={{ color: H.accent }}>{t('shoppingBag')}</span><h1 className="font-serif text-3xl font-bold" style={{ color: H.text }}>{t('reviewOrder')}</h1></div>
        <button onClick={() => navigateTo('catalog')} className="text-xs font-bold uppercase flex items-center gap-1 hover:underline" style={{ color: H.accent }}><ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('continueShopping')}</span></button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="p-4 border-2 flex flex-col sm:flex-row items-center gap-4 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
              <img src={product.image} alt={product.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover border-2" style={{ borderColor: H.text }} />
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right">
                <span className="text-[10px] font-bold uppercase block" style={{ color: H.accent }}>{product.category}</span>
                <h3 className="font-serif text-base font-bold">{product.name}</h3>
                <div className="text-xs font-bold mt-1" style={{ color: H.accent }}>{formatPrice(product.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border-2" style={{ borderColor: H.text }}>
                  <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="w-9 h-9 sm:w-7 sm:h-7 font-bold"><Minus className="w-3 h-3 mx-auto" /></button>
                  <span className="w-9 sm:w-7 text-center text-xs font-bold">{quantity}</span>
                  <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="w-9 h-9 sm:w-7 sm:h-7 font-bold"><Plus className="w-3 h-3 mx-auto" /></button>
                </div>
                <span className="text-xs font-bold w-16 sm:w-20 text-right">{formatPrice(product.price * quantity)}</span>
                <button onClick={() => removeFromCart(product.id)} className="p-1.5 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 border-2 space-y-5 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
            <h2 className="font-serif text-lg font-bold border-b-2 pb-2" style={{ borderColor: H.text }}>{t('reviewOrder')}</h2>
            <div className="flex justify-between text-xs font-bold"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {appliedCoupon && <div className="flex justify-between text-xs font-bold text-emerald-700"><span>Discount</span><span>-{formatPrice(discountAmount)}</span></div>}
            <div className="flex justify-between text-base font-bold border-t-2 pt-2" style={{ borderColor: H.text }}><span>Total</span><span style={{ color: H.accent }}>{formatPrice(subtotal - discountAmount)}</span></div>
            <button onClick={() => navigateTo('delivery')} className="w-full py-4 font-bold text-xs uppercase tracking-widest shadow-[4px_4px_0px_#2A2421]" style={H.btnPrimary}>{t('proceedToDelivery')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// DELIVERY PAGE
// ─────────────────────────────────────────
export const HeritageDeliveryPage = () => {
  const { deliveryMethod, setDeliveryMethod, deliveryDetails, setDeliveryDetails, selectedPickupLocation, setSelectedPickupLocation, navigateTo, t } = useShop();
  const handleInputChange = (e) => setDeliveryDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const inputStyle = { background: H.inputBg, border: '2px solid #2A2421', color: H.text };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-mono">
      <div className="flex justify-between items-center pb-4 border-b-2" style={{ borderColor: H.text }}>
        <div><span className="text-xs font-bold uppercase" style={{ color: H.accent }}>{t('checkoutStep2')}</span><h1 className="font-serif text-3xl font-bold">{t('fulfillmentMethod')}</h1></div>
        <button onClick={() => navigateTo('cart')} className="text-xs font-bold uppercase flex items-center gap-1 hover:underline" style={{ color: H.accent }}><ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('shoppingBag')}</span></button>
      </div>

      <div className="grid grid-cols-2 p-1 border-2 max-w-lg mx-auto bg-white" style={{ borderColor: H.text }}>
        {[['delivery', t('courierDelivery'), Truck], ['pickup', t('boutiquePickup'), Store]].map(([method, label, Icon]) => (
          <button key={method} onClick={() => setDeliveryMethod(method)} className="py-3 px-4 font-bold text-xs uppercase flex items-center justify-center gap-2" style={deliveryMethod === method ? { background: H.accent, color: '#fff' } : { color: H.muted }}>
            <Icon className="w-4 h-4" /> <span>{label}</span>
          </button>
        ))}
      </div>

      {deliveryMethod === 'delivery' && (
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('summary'); }} className="p-6 border-2 space-y-5 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
          <h2 className="font-serif text-xl font-bold border-b-2 pb-2" style={{ borderColor: H.text }}>{t('enterShippingAddress')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {[{ id: 'name', label: t('fullName'), ph: 'Mariam Hassan' }, { id: 'phone', label: t('phoneNumber'), ph: '+20 100 234 5678' }].map(({ id, label, ph }) => (
              <div key={id} className="space-y-1"><label className="font-bold">{label}</label><input type="text" name={id} required value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full p-2.5 focus:outline-none" style={inputStyle} /></div>
            ))}
            <div className="sm:col-span-2 space-y-1"><label className="font-bold">{t('streetAddress')}</label><input type="text" name="address" required value={deliveryDetails.address} onChange={handleInputChange} placeholder="15 El-Bostan Street" className="w-full p-2.5 focus:outline-none" style={inputStyle} /></div>
            {[{ id: 'city', label: t('cityPostal'), ph: 'Heliopolis, Cairo' }, { id: 'notes', label: t('specialInstructions'), ph: 'Call upon arrival' }].map(({ id, label, ph }) => (
              <div key={id} className="space-y-1"><label className="font-bold">{label}</label><input type="text" name={id} value={deliveryDetails[id]} onChange={handleInputChange} placeholder={ph} className="w-full p-2.5 focus:outline-none" style={inputStyle} /></div>
            ))}
          </div>
          <button type="submit" className="w-full py-4 font-bold text-xs uppercase shadow-[4px_4px_0px_#2A2421]" style={H.btnPrimary}>{t('continueToRecap')}</button>
        </form>
      )}

      {deliveryMethod === 'pickup' && (
        <div className="space-y-4">
          <div className="p-6 border-2 space-y-4 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
            <h2 className="font-serif text-xl font-bold border-b-2 pb-2" style={{ borderColor: H.text }}>{t('selectBoutique')}</h2>
            {PICKUP_LOCATIONS.map(loc => {
              const isSelected = selectedPickupLocation.id === loc.id;
              return (
                <div key={loc.id} onClick={() => setSelectedPickupLocation(loc)} className="p-4 border-2 cursor-pointer flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3" style={{ borderColor: H.text, background: isSelected ? H.accentBg : '#white' }}>
                  <div><div className="font-bold text-sm">{loc.name}</div><div className="text-xs text-stone-600">{loc.address}</div></div>
                  <button type="button" className="w-full sm:w-auto px-3 py-1 text-xs font-bold border-2" style={{ borderColor: H.text, background: isSelected ? H.accent : 'transparent', color: isSelected ? '#fff' : H.text }}>{isSelected ? t('selected') : t('chooseStore')}</button>
                </div>
              );
            })}
          </div>
          <button onClick={() => navigateTo('summary')} className="w-full py-4 font-bold text-xs uppercase shadow-[4px_4px_0px_#2A2421]" style={H.btnPrimary}>{t('continueToRecap')}</button>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────
// ORDER SUMMARY PAGE
// ─────────────────────────────────────────
export const HeritageOrderSummaryPage = () => {
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in font-mono">
      <div className="p-6 border-2 text-center space-y-2 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
        <h1 className="font-serif text-3xl font-bold">{t('orderReady')}</h1>
        <p className="text-xs">{t('noPaymentNotice')} <code className="bg-amber-100 px-2 py-0.5 border">{storePhoneNumber}</code></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 p-5 border-2 space-y-4 shadow-[4px_4px_0px_#2A2421]" style={{ background: H.card, borderColor: H.text }}>
          <div className="flex justify-between border-b-2 pb-2" style={{ borderColor: H.text }}><span className="font-bold">Order #{orderId}</span><span className="text-xs font-bold" style={{ color: H.accent }}>Pending</span></div>
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="flex flex-wrap justify-between gap-1 text-xs font-bold"><span>{quantity}x {product.name}</span><span>{formatPrice(product.price * quantity)}</span></div>
          ))}
          <div className="border-t-2 pt-2 flex justify-between font-bold text-base" style={{ borderColor: H.text }}><span>Total</span><span style={{ color: H.accent }}>{formatPrice(total)}</span></div>
        </div>

        <div className="lg:col-span-5 p-5 border-2 space-y-4 bg-[#2A2421] text-white shadow-[4px_4px_0px_#2A2421]">
          <div className="text-xs font-mono whitespace-pre-wrap p-3 bg-black/40 border border-stone-700 text-stone-300 max-h-60 overflow-y-auto">{formattedOrderText}</div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full py-4 font-bold text-xs uppercase block text-center bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-white">{t('sendToWhatsApp')}</a>
          <button onClick={handleCopy} className="w-full py-3 font-bold text-xs uppercase border-2 border-white bg-stone-800 text-white">{copied ? 'Copied!' : 'Copy Summary'}</button>
        </div>
      </div>
    </div>
  );
};
