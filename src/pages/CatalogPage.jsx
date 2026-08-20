import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../data/mockData';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw, Search, Plus, Shield } from 'lucide-react';

export const CatalogPage = () => {
  const { products, categories, t, language, isAdmin, setAdminModalOpen, searchQuery, setSearchQuery } = useShop();
  const isAr = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const materials = [
    'All',
    'Natural Granite',
    'Engineered Quartz',
    'Acrylic Solid Surface',
    'Thermal PVC',
    'Acrylic',
    'HPL',
    'Ceramic',
    'Stainless Steel',
    'Brass'
  ];

  const finishes = [
    'All',
    'Polished',
    'Matte',
    'Brushed',
    'Glazed'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchMaterial = selectedMaterial === 'All' || 
        (product.material && product.material.toLowerCase().includes(selectedMaterial.toLowerCase()));
      const matchFinish = selectedFinish === 'All' || 
        (product.finish && product.finish.toLowerCase().includes(selectedFinish.toLowerCase()));
      const matchPrice = product.price <= maxPrice;
      const matchSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.nameAr && product.nameAr.includes(searchQuery)) ||
        (product.material && product.material.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchMaterial && matchFinish && matchPrice && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0;
    });
  }, [products, selectedCategory, selectedMaterial, selectedFinish, maxPrice, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedFinish('All');
    setMaxPrice(15000);
    setSortBy('featured');
    setSearchQuery('');
  };

  const activeFilterCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (selectedFinish !== 'All' ? 1 : 0) +
    (maxPrice < 15000 ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('fullCollection')}</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-noir-900">{t('catalogTitle')}</h1>
        <p className="text-xs sm:text-sm text-noir-600 font-normal leading-relaxed">
          {t('catalogDesc')}
        </p>
      </div>

      {/* Admin Action Banner */}
      {isAdmin && (
        <div className="mb-6 p-4 rounded-2xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-noir-900">
            <Shield size={16} className="text-accent-gold" />
            <span>{isAr ? 'لوحة تحكم المشرف: يمكنك إضافة أو تعديل خامات المطبخ فورياً' : 'Admin Control: Add or modify live kitchen materials'}</span>
          </div>
          <button
            onClick={() => setAdminModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-gold text-noir-950 text-xs font-bold shadow-md hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus size={15} />
            <span>{t('addNewMaterial')}</span>
          </button>
        </div>
      )}

      {/* Toolbar (Search, Filter Button, Sort Dropdown) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-200">
        
        {/* Search Bar Input */}
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-noir-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-3 text-noir-400 hover:text-noir-900"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs font-bold text-noir-900 shadow-sm"
          >
            <SlidersHorizontal size={15} />
            <span>{t('filters')}</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-accent-gold text-noir-950 text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-noir-600 hidden sm:inline">{t('sortBy')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-xs font-bold text-noir-900 focus:ring-2 focus:ring-accent-gold"
            >
              <option value="featured">{t('sortFeatured')}</option>
              <option value="price-low">{t('sortPriceLow')}</option>
              <option value="price-high">{t('sortPriceHigh')}</option>
              <option value="rating">{t('sortRating')}</option>
              <option value="newest">{t('sortNewest')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filter Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-brand-100/40 p-6 rounded-3xl border border-brand-200">
          <div className="flex items-center justify-between border-b border-brand-200 pb-3">
            <h3 className="font-serif font-bold text-sm text-noir-900 flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-accent-gold" />
              {t('filters')}
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
              >
                <RotateCcw size={12} />
                {t('reset')}
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-noir-700">{t('category')}</label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left rtl:text-right px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-accent-gold text-noir-950 font-bold shadow-xs'
                    : 'text-noir-700 hover:bg-brand-200/60'
                }`}
              >
                {t('allCategories')} ({products.length})
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.name).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left rtl:text-right px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? 'bg-accent-gold text-noir-950 font-bold shadow-xs'
                        : 'text-noir-700 hover:bg-brand-200/60'
                    }`}
                  >
                    <span>{cat.icon} {isAr ? cat.nameAr : cat.name}</span>
                    <span className="text-[10px] opacity-70 font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Materials Filter */}
          <div className="space-y-2 pt-3 border-t border-brand-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-noir-700">{t('material')}</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-xs font-medium focus:ring-2 focus:ring-accent-gold"
            >
              {materials.map((m, idx) => (
                <option key={idx} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Finish Filter */}
          <div className="space-y-2 pt-3 border-t border-brand-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-noir-700">{t('finish')}</label>
            <select
              value={selectedFinish}
              onChange={(e) => setSelectedFinish(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-xs font-medium focus:ring-2 focus:ring-accent-gold"
            >
              {finishes.map((f, idx) => (
                <option key={idx} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-3 border-t border-brand-200">
            <div className="flex justify-between items-center text-xs font-bold text-noir-800">
              <span>{t('maxPrice')}</span>
              <span className="font-mono text-accent-gold">{formatPrice(maxPrice, language)}</span>
            </div>
            <input
              type="range"
              min="200"
              max="15000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-accent-gold cursor-pointer"
            />
          </div>
        </aside>

        {/* Products Grid Area (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Pills Bar */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-2xl bg-brand-100/50 border border-brand-200 text-xs">
              <span className="text-noir-600 font-semibold">{t('activeFilters')}</span>
              
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-300 font-bold text-noir-900">
                  {selectedCategory}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}

              {selectedMaterial !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-300 font-bold text-noir-900">
                  {selectedMaterial}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedMaterial('All')} />
                </span>
              )}

              {selectedFinish !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-300 font-bold text-noir-900">
                  {selectedFinish}
                  <X size={12} className="cursor-pointer" onClick={() => setSelectedFinish('All')} />
                </span>
              )}

              {maxPrice < 15000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-300 font-bold text-noir-900">
                  ≤ {formatPrice(maxPrice, language)}
                  <X size={12} className="cursor-pointer" onClick={() => setMaxPrice(15000)} />
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-300 font-bold text-noir-900">
                  "{searchQuery}"
                  <X size={12} className="cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-accent-gold font-bold hover:underline ml-auto rtl:ml-0 rtl:mr-auto"
              >
                {t('clearAllFilters')}
              </button>
            </div>
          )}

          {/* Results Counter */}
          <div className="flex items-center justify-between text-xs text-noir-600">
            <span>
              {t('showing')} <strong className="text-noir-950 font-bold">{filteredProducts.length}</strong> {t('productsCount')}
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 rounded-3xl bg-brand-100/30 border border-brand-200 space-y-4">
              <span className="text-4xl block">🔍</span>
              <h3 className="font-serif text-lg font-bold text-noir-900">{t('noProductsMatch')}</h3>
              <p className="text-xs text-noir-600 max-w-sm mx-auto">
                {isAr ? 'جرب تقليل الفلاتر أو البحث بكلمة مختلفة مثل جرانيت أو دواليب.' : 'Try clearing active filters or searching for terms like granite or cabinets.'}
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-accent-gold text-noir-950 text-xs font-bold shadow-md hover:opacity-90 transition-opacity"
              >
                {t('clearAllFilters')}
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
