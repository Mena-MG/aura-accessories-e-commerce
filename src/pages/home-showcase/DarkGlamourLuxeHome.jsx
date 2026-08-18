import React from 'react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../data/mockData';
import { ProductCard } from '../../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, Crown, Zap, Gift } from 'lucide-react';

export const DarkGlamourLuxeHome = () => {
  const { navigateTo, t, addToCart } = useShop();

  const luxuryProducts = PRODUCTS.filter(p => p.price >= 300);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen space-y-24 py-6 animate-fade-in font-sans">
      
      {/* DARK GLAMOUR HERO */}
      <section className="relative overflow-hidden pt-12 pb-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800/60">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-brand-500/30 text-brand-400 text-xs font-mono uppercase tracking-[0.3em] shadow-lg">
            <Crown className="w-3.5 h-3.5 text-brand-400" />
            <span>NIGHT BOUTIQUE COLLECTION — AURA GLAMOUR</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-extralight text-stone-100 tracking-tight leading-[1.05]">
            Pure Elegance in <br />
            <span className="italic font-normal gold-gradient-text">Every Shimmer</span>
          </h1>

          <p className="text-stone-400 text-sm sm:text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Step into the dark glamour of Aura Studios. Hand-selected royal sapphire crystals, iridescent pearl keychains, and 18K gold-plated starburst drops designed to captivate.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => navigateTo('catalog')}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-brand-500 to-amber-600 hover:from-brand-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-[0.25em] rounded-full shadow-luxe transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Explore Dark Glamour Vault</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('product-detail', 'prod-3')}
              className="w-full sm:w-auto px-8 py-4 bg-stone-900/80 hover:bg-stone-800 text-stone-200 font-semibold text-xs uppercase tracking-widest rounded-full border border-stone-700 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Discover Royal Sapphire</span>
            </button>
          </div>

          {/* Dark Glass Showcase Grid */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left rtl:text-right">
            
            <div className="p-6 rounded-3xl bg-stone-900/60 backdrop-blur-md border border-stone-800 hover:border-brand-500/40 transition-all group space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Crown className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-100">Bespoke Jewelry</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">Solid 925 sterling silver and hand-enameled ocean charms with rhodium plating.</p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900/60 backdrop-blur-md border border-stone-800 hover:border-brand-500/40 transition-all group space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Gift className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-100">Velvet Box Packaging</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">Every order arrives in custom branded velvet pouches and gold-embossed gift boxes.</p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900/60 backdrop-blur-md border border-stone-800 hover:border-brand-500/40 transition-all group space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-100">Express Cairo Delivery</h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">Same-day boutique pickup in Zamalek or express courier straight to your doorstep.</p>
            </div>

          </div>

        </div>
      </section>

      {/* CURATED GLAMOUR PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-stone-800 pb-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-brand-400">GLAMOUR VAULT</span>
            <h2 className="font-serif text-4xl font-light text-stone-100 mt-1">Featured Night Pieces</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-brand-400 hover:text-white">
            View All Catalog Products →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {luxuryProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden hover:border-brand-500/50 transition-all">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
