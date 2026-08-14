import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';

export const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique categories, materials, and colors
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];
  const materials = ['All', 'Pearls & Acrylic', 'Enamel & Silver Plated', 'Sterling Silver', 'Beaded Strap', 'Rose Gold & Mesh', 'Vegan Leather'];
  const colors = ['All', 'Yellow & Clear', 'Ocean Blue', 'Royal Blue', 'Crimson Red', 'Rose Gold', 'Cream Neutral'];

  // Filtering and Sorting logic
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
      return 0; // featured default order
    });
  }, [selectedCategory, selectedMaterial, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedColor('All');
    setMaxPrice(100);
    setSortBy('featured');
  };

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedMaterial !== 'All' ? 1 : 0) +
    (selectedColor !== 'All' ? 1 : 0) +
    (maxPrice < 100 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">The Full Collection</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-noir-900">Boutique Shop Catalog</h1>
        <p className="text-xs sm:text-sm text-noir-800/60 font-light leading-relaxed">
          Filter our handcrafted jewelry, charm bangles, and artisanal accessories by category, price, material, or color palette.
        </p>
      </div>

      {/* Main Layout: Sidebar Filters + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block bg-white p-6 rounded-2xl border border-brand-200/60 shadow-soft sticky top-28 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-brand-100">
            <div className="flex items-center gap-2 font-serif text-lg font-medium text-noir-900">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-rose-500 hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Filter 1: Category */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Category</h4>
            <div className="space-y-1 text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? 'bg-brand-100 font-semibold text-brand-900'
                      : 'text-noir-800/70 hover:bg-brand-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 2: Price Range */}
          <div className="space-y-2.5 pt-4 border-t border-brand-100">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold uppercase tracking-wider text-noir-900">Max Price</h4>
              <span className="font-semibold text-brand-600">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>$20</span>
              <span>$100</span>
            </div>
          </div>

          {/* Filter 3: Material */}
          <div className="space-y-2.5 pt-4 border-t border-brand-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Material</h4>
            <div className="space-y-1 text-xs">
              {materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`block w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                    selectedMaterial === mat
                      ? 'bg-brand-100 font-semibold text-brand-900'
                      : 'text-noir-800/70 hover:bg-brand-50'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter 4: Color */}
          <div className="space-y-2.5 pt-4 border-t border-brand-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Color Palette</h4>
            <div className="space-y-1 text-xs">
              {colors.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`block w-full text-left py-1.5 px-3 rounded-lg transition-colors ${
                    selectedColor === col
                      ? 'bg-brand-100 font-semibold text-brand-900'
                      : 'text-noir-800/70 hover:bg-brand-50'
                  }`}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN PRODUCT LISTING AREA */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-brand-200/60 shadow-soft flex flex-wrap items-center justify-between gap-4">
            
            {/* Results Count & Mobile Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 bg-brand-50 hover:bg-brand-100 text-noir-900 rounded-xl text-xs font-semibold flex items-center gap-2 border border-brand-200"
              >
                <SlidersHorizontal className="w-4 h-4 text-brand-600" />
                <span>Filters ({activeFilterCount})</span>
              </button>

              <span className="text-xs text-noir-800/70 font-medium">
                Showing <strong className="text-noir-900">{filteredProducts.length}</strong> products
              </span>
            </div>

            {/* Sort Control Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-brand-600 hidden sm:block" />
              <label htmlFor="sort-select" className="text-xs font-semibold uppercase tracking-wider text-noir-800 hidden sm:block">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-50 border border-brand-200 text-noir-900 text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                <option value="featured">Featured / Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

          </div>

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-zinc-400 font-medium">Active filters:</span>
              {selectedCategory !== 'All' && (
                <span className="bg-brand-100 text-brand-900 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Cat: {selectedCategory}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedCategory('All')} />
                </span>
              )}
              {selectedMaterial !== 'All' && (
                <span className="bg-brand-100 text-brand-900 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Material: {selectedMaterial}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedMaterial('All')} />
                </span>
              )}
              {selectedColor !== 'All' && (
                <span className="bg-brand-100 text-brand-900 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Color: {selectedColor}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setSelectedColor('All')} />
                </span>
              )}
              {maxPrice < 100 && (
                <span className="bg-brand-100 text-brand-900 text-xs px-3 py-1 rounded-full flex items-center gap-1.5 font-medium">
                  Under ${maxPrice}
                  <X className="w-3.5 h-3.5 cursor-pointer" onClick={() => setMaxPrice(100)} />
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-brand-200 text-center space-y-4">
              <p className="text-base text-zinc-500 font-light">No products matched your selected filters.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-noir-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-noir-950/60 backdrop-blur-sm flex justify-end animate-fade-in lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-brand-100">
                <h3 className="font-serif text-xl font-medium">Filter Catalog</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-6 h-6 text-noir-800" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider">Category</h4>
                <div className="space-y-1">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); }}
                      className={`block w-full text-left py-1.5 text-xs ${selectedCategory === c ? 'font-bold text-brand-600' : 'text-zinc-600'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="py-4 border-t border-brand-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider">Max Price (${maxPrice})</h4>
                <input
                  type="range" min="20" max="100" step="5" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-noir-900 text-white font-medium text-xs uppercase tracking-wider rounded-xl"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
