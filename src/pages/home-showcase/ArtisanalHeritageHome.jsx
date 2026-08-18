import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../data/mockData';
import { ProductCard } from '../../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Layers, Gem, Hammer, Feather } from 'lucide-react';

export const ArtisanalHeritageHome = () => {
  const { navigateTo, t } = useShop();
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('All');

  const materialsList = [
    { id: 'All', label: 'All Artisanal Pieces' },
    { id: 'Pearls', label: 'Freshwater Pearls' },
    { id: 'Silver', label: '925 Sterling Silver' },
    { id: 'Enamel', label: 'Hand-Enamel' },
    { id: 'Beaded', label: 'Faceted Glass Beads' },
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedMaterialFilter === 'All') return true;
    return p.material.toLowerCase().includes(selectedMaterialFilter.toLowerCase());
  });

  return (
    <div className="space-y-24 py-8 animate-fade-in font-sans bg-brand-50/40">
      
      {/* HERITAGE HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-brand-100/60 rounded-3xl border border-brand-200/80 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left rtl:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-200 text-brand-900 text-xs font-semibold uppercase tracking-widest">
              <Feather className="w-3.5 h-3.5 text-brand-600" />
              <span>HANDMADE HERITAGE ATELIER</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-light text-noir-900 leading-tight">
              Crafted by Hand. <br />
              <span className="italic font-normal gold-gradient-text">Treasured for a Lifetime.</span>
            </h1>

            <p className="text-noir-800/70 text-base sm:text-lg font-light leading-relaxed max-w-xl">
              Every charm keychain, sapphire pendant, and beaded lanyard in our studio is individually hand-strung using genuine crystals, lustrous pearls, and tarnish-resistant metals.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('catalog')}
                className="px-8 py-4 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all shadow-luxe flex items-center gap-2"
              >
                <span>Shop Heritage Collection</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <img src="/assets/product-yellow-keychain.jpg" alt="Yellow Keychain" className="w-full aspect-[3/4] object-cover rounded-2xl border border-brand-200 shadow-soft" />
            <img src="/assets/product-hawkins-lanyard.jpg" alt="Hawkins Lanyard" className="w-full aspect-[3/4] object-cover rounded-2xl border border-brand-200 shadow-soft mt-8" />
          </div>

        </div>
      </section>

      {/* MATERIAL CRAFTSMANSHIP FILTER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Material Spotlight</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-noir-900">Explore by Craft Material</h2>
        </div>

        {/* Material Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {materialsList.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMaterialFilter(m.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                selectedMaterialFilter === m.id
                  ? 'bg-brand-500 text-white border-brand-500 shadow-md'
                  : 'bg-white text-noir-800 border-brand-200 hover:bg-brand-50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};
