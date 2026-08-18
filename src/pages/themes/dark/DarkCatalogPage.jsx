import React, { useState, useMemo } from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';

const D = {
  bg: '#0D0C0B',
  card: '#181614',
  cardBorder: 'rgba(197,160,89,0.15)',
  text: '#F4EFEA',
  muted: '#A89F91',
  accent: '#E6C280',
  accentBg: 'rgba(197,160,89,0.12)',
  border: 'rgba(197,160,89,0.2)',
};

export const DarkCatalogPage = () => {
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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchMaterial = selectedMaterial === 'All' || product.material.toLowerCase().includes(selectedMaterial.toLowerCase());
      const matchColor = selectedColor === 'All' || product.color.toLowerCase().includes(selectedColor.toLowerCase());
      const matchPrice = product.price <= maxPrice;
      return matchCategory && matchMaterial && matchColor && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [selectedCategory, selectedMaterial, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => { setSelectedCategory('All'); setSelectedMaterial('All'); setSelectedColor('All'); setMaxPrice(1500); setSortBy('featured'); };
  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + (selectedMaterial !== 'All' ? 1 : 0) + (selectedColor !== 'All' ? 1 : 0) + (maxPrice < 1500 ? 1 : 0);

  const btnActive = { background: D.accentBg, color: D.accent, fontWeight: '600' };
  const btnInactive = { color: D.muted };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" style={{ minHeight: '80vh' }}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.accent }}>{t('fullCollection')}</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light" style={{ color: D.text }}>{t('catalogTitle')}</h1>
        <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: D.muted }}>{t('catalogDesc')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* SIDEBAR */}
        <aside className="hidden lg:block p-6 rounded-2xl sticky top-28 space-y-6" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
          <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${D.border}` }}>
            <div className="flex items-center gap-2 font-serif text-lg font-medium" style={{ color: D.text }}>
              <SlidersHorizontal className="w-4 h-4" style={{ color: D.accent }} />
              <span>{t('filters')}</span>
              {activeFilterCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: D.accentBg, color: D.accent }}>{activeFilterCount}</span>}
            </div>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs flex items-center gap-1 font-medium" style={{ color: '#f87171' }}>
                <RotateCcw className="w-3 h-3" /> {t('reset')}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('category')}</h4>
            <div className="space-y-1 text-xs">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className="block w-full text-left rtl:text-right py-1.5 px-3 rounded-lg transition-colors" style={selectedCategory === cat ? btnActive : btnInactive}>{cat}</button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2.5 pt-4" style={{ borderTop: `1px solid ${D.border}` }}>
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('maxPrice')}</h4>
              <span className="font-semibold" style={{ color: D.accent }}>{formatPrice(maxPrice)}</span>
            </div>
            <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full cursor-pointer" style={{ accentColor: D.accent }} />
            <div className="flex justify-between text-[10px]" style={{ color: D.muted }}><span>200 EGP</span><span>1,500 EGP</span></div>
          </div>

          {/* Material */}
          <div className="space-y-2.5 pt-4" style={{ borderTop: `1px solid ${D.border}` }}>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('material')}</h4>
            <div className="space-y-1 text-xs">
              {materials.map(mat => (
                <button key={mat} onClick={() => setSelectedMaterial(mat)} className="block w-full text-left rtl:text-right py-1.5 px-3 rounded-lg transition-colors" style={selectedMaterial === mat ? btnActive : btnInactive}>{mat}</button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2.5 pt-4" style={{ borderTop: `1px solid ${D.border}` }}>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('colorPalette')}</h4>
            <div className="space-y-1 text-xs">
              {colors.map(col => (
                <button key={col} onClick={() => setSelectedColor(col)} className="block w-full text-left rtl:text-right py-1.5 px-3 rounded-lg transition-colors" style={selectedColor === col ? btnActive : btnInactive}>{col}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCT AREA */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls bar */}
          <div className="p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-colors" style={{ background: D.accentBg, borderColor: D.cardBorder, color: D.accent }}>
                <SlidersHorizontal className="w-4 h-4" /> {t('filters')} ({activeFilterCount})
              </button>
              <span className="text-xs font-medium" style={{ color: D.muted }}>
                {t('showing')} <strong style={{ color: D.text }}>{filteredProducts.length}</strong> {t('productsCount')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 hidden sm:block" style={{ color: D.accent }} />
              <label htmlFor="sort-select-dark" className="text-xs font-semibold uppercase tracking-wider hidden sm:block" style={{ color: D.muted }}>{t('sortBy')}</label>
              <select id="sort-select-dark" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-xs font-medium rounded-xl px-3 py-2 focus:outline-none cursor-pointer" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}`, color: D.text }}>
                <option value="featured">{t('sortFeatured')}</option>
                <option value="price-low">{t('sortPriceLow')}</option>
                <option value="price-high">{t('sortPriceHigh')}</option>
                <option value="rating">{t('sortRating')}</option>
                <option value="newest">{t('sortNewest')}</option>
              </select>
            </div>
          </div>

          {/* Active pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-medium" style={{ color: D.muted }}>{t('activeFilters')}</span>
              {selectedCategory !== 'All' && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: D.accentBg, color: D.accent }}>{selectedCategory} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedCategory('All')} /></span>}
              {selectedMaterial !== 'All' && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: D.accentBg, color: D.accent }}>{selectedMaterial} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedMaterial('All')} /></span>}
              {selectedColor !== 'All' && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: D.accentBg, color: D.accent }}>{selectedColor} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedColor('All')} /></span>}
              {maxPrice < 1500 && <span className="text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium" style={{ background: D.accentBg, color: D.accent }}>{t('under')} {formatPrice(maxPrice)} <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMaxPrice(1500)} /></span>}
            </div>
          )}

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl border text-center space-y-4" style={{ background: D.card, borderColor: D.cardBorder }}>
              <p className="text-base font-light" style={{ color: D.muted }}>{t('noProductsMatch')}</p>
              <button onClick={resetFilters} className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>{t('clearAllFilters')}</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-end animate-fade-in lg:hidden" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="w-full max-w-xs h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between" style={{ background: D.card }}>
            <div>
              <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${D.border}` }}>
                <h3 className="font-serif text-xl font-medium" style={{ color: D.text }}>{t('filters')}</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X className="w-6 h-6" style={{ color: D.text }} /></button>
              </div>
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('category')}</h4>
                <div className="space-y-1">
                  {categories.map(c => (
                    <button key={c} onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); }} className="block w-full text-left rtl:text-right py-1.5 text-xs" style={selectedCategory === c ? { color: D.accent, fontWeight: '700' } : { color: D.muted }}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="py-4 space-y-2" style={{ borderTop: `1px solid ${D.border}` }}>
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('maxPrice')} ({formatPrice(maxPrice)})</h4>
                <input type="range" min="200" max="1500" step="50" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" style={{ accentColor: D.accent }} />
              </div>
            </div>
            <button onClick={() => setMobileFilterOpen(false)} className="w-full py-3 font-medium text-xs uppercase tracking-wider rounded-xl" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
              Apply Filters ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
