import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../data/mockData';
import { ProductCard } from '../../components/ProductCard';
import { Sparkles, ArrowRight, Award, Compass, Eye, Heart, Star, Bookmark } from 'lucide-react';

export const EditorialMagazineHome = () => {
  const { navigateTo, t, addToCart } = useShop();
  const [activeHotspot, setActiveHotspot] = useState(null);

  const editorialProducts = PRODUCTS.slice(0, 4);

  const hotspots = [
    { id: 'prod-2', x: '30%', y: '45%', title: 'Ocean Breeze Bangle', price: 450, img: '/assets/product-ocean-bangle.jpg' },
    { id: 'prod-3', x: '65%', y: '30%', title: 'Sapphire Clover Pendant', price: 520, img: '/assets/product-sapphire-clover.jpg' },
    { id: 'prod-1', x: '50%', y: '70%', title: 'Lemon Charm Keychain', price: 280, img: '/assets/product-yellow-keychain.jpg' },
  ];

  return (
    <div className="space-y-24 animate-fade-in font-sans">
      
      {/* EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] bg-stone-900 text-white overflow-hidden flex items-center">
        {/* Editorial Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/product-ocean-bangle.jpg" 
            alt="Editorial Background" 
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-8 text-left rtl:text-right">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-brand-300 text-xs font-mono uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>EDITORIAL ISSUE VOL. 04 — CAIRO / ZAMALEK</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl font-extralight tracking-tight leading-[1.08] text-white">
              The Art of <br />
              <span className="italic font-normal gold-gradient-text">Subtle Adornment</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-xl font-light max-w-xl leading-relaxed">
              Curated artisanal jewelry, ocean charm bangles, and sapphire crystal pendants designed for those who speak luxury in a whisper.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-5">
              <button
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-9 py-4 bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-luxe flex items-center justify-center gap-3 group"
              >
                <span>Shop Vol. 04 Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('product-detail', 'prod-3')}
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-xs uppercase tracking-widest rounded-full border border-white/30 transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-brand-400" />
                <span>View Sapphire Clover</span>
              </button>
            </div>
          </div>

          {/* Hero Side Editorial Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl space-y-4 text-white shadow-floating">
              <span className="text-[10px] font-mono tracking-widest text-brand-400 uppercase block">EDITOR’S PICK</span>
              <img src="/assets/product-sapphire-clover.jpg" alt="Sapphire Clover" className="w-full aspect-square object-cover rounded-2xl border border-white/10" />
              <div>
                <h4 className="font-serif text-xl font-medium">Royal Sapphire Clover</h4>
                <p className="text-xs text-stone-300 mt-1 font-light">925 Sterling Silver & Cobalt Crystal</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <span className="text-lg font-bold text-brand-300">{formatPrice(520)}</span>
                  <button 
                    onClick={() => navigateTo('product-detail', 'prod-3')}
                    className="text-xs font-semibold uppercase tracking-wider text-white underline hover:text-brand-400"
                  >
                    Details →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE LOOKBOOK HOTSPOT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-brand-600">INTERACTIVE LOOKBOOK</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-noir-900">Click to Explore Pieces</h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">Hover or tap on the pulsing glowing spots on the lookbook display to preview items instantly.</p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-floating border border-stone-200 bg-stone-900 max-w-4xl mx-auto aspect-[16/10]">
          <img 
            src="/assets/product-ocean-bangle.jpg" 
            alt="Lookbook Showcase" 
            className="w-full h-full object-cover opacity-80"
          />

          {/* Hotspot Pins */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ left: spot.x, top: spot.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
              onClick={() => navigateTo('product-detail', spot.id)}
              onMouseEnter={() => setActiveHotspot(spot.id)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              <span className="relative flex h-7 w-7">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-brand-500 border-2 border-white shadow-lg items-center justify-center text-stone-950 font-bold text-xs">
                  +
                </span>
              </span>

              {/* Hotspot Preview Popup Card */}
              {activeHotspot === spot.id && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 bg-white p-3 rounded-2xl shadow-floating border border-stone-200 text-stone-900 z-30 animate-fade-in text-center space-y-1">
                  <img src={spot.img} alt={spot.title} className="w-full h-24 object-cover rounded-xl" />
                  <span className="font-serif text-xs font-semibold block line-clamp-1">{spot.title}</span>
                  <span className="text-xs font-bold text-brand-700 block">{formatPrice(spot.price)}</span>
                </div>
              )}
            </div>
          ))}

          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between text-stone-900 text-xs">
            <span className="font-semibold">Spring / Summer Atelier Lookbook</span>
            <button onClick={() => navigateTo('catalog')} className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand-700 underline">
              Browse All Lookbook Items →
            </button>
          </div>
        </div>
      </section>

      {/* EDITORIAL GRID ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-200 pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-600">THE ATELIER JOURNAL</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-noir-900 mt-1">Curated Accessories Grid</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-brand-700 hover:text-noir-900">
            View Full Shop Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {editorialProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};
