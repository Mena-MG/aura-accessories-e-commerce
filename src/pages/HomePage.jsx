import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, formatPrice } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Star, Award, Compass } from 'lucide-react';

export const HomePage = () => {
  const { navigateTo } = useShop();

  const featuredProducts = PRODUCTS.filter(p => p.isFeatured);
  const heroProduct = PRODUCTS[1]; // Ocean Breeze Bangle

  const categories = [
    { name: 'Bracelets', count: 'Charm & Torque', image: '/assets/product-ocean-bangle.jpg' },
    { name: 'Necklaces', count: 'Sapphire & Crystal', image: '/assets/product-sapphire-clover.jpg' },
    { name: 'Charms & Keychains', count: 'Pearl & Glass', image: '/assets/product-yellow-keychain.jpg' },
    { name: 'Lanyards & Holders', count: 'Beaded & ID Straps', image: '/assets/product-hawkins-lanyard.jpg' },
  ];

  return (
    <div className="space-y-20 animate-fade-in">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-brand-100/50 via-brand-50 to-white border-b border-brand-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-medium uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                Handcrafted Boutique Collection Cairo 2026
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-light text-noir-900 leading-[1.15] tracking-tight">
                Artisanal Adornments for <span className="italic font-normal gold-gradient-text">Everyday Elegance</span>
              </h1>

              <p className="text-base sm:text-lg text-noir-800/70 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover bespoke charm bracelets, royal sapphire clover pendants, hand-strung pearl keychains, and luxury accessories curated for individuals who value distinctive detail.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="w-full sm:w-auto px-8 py-4 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full shadow-lg hover:shadow-luxe transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <span>Explore Shop Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('product-detail', 'prod-2')}
                  className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-brand-100 text-noir-900 font-medium text-xs uppercase tracking-widest rounded-full border border-brand-200 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4 text-brand-500" />
                  <span>View Featured Bangle</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-brand-200/60 text-center lg:text-left">
                <div>
                  <div className="text-xl font-serif font-bold text-noir-900">100%</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Handmade Quality</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-noir-900">WhatsApp</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Instant Checkout</div>
                </div>
                <div>
                  <div className="text-xl font-serif font-bold text-noir-900">Same Day</div>
                  <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Boutique Pickup</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-brand-300/40 to-brand-500/20 rounded-3xl blur-2xl opacity-70" />

                <div 
                  onClick={() => navigateTo('product-detail', heroProduct.id)}
                  className="relative rounded-3xl overflow-hidden shadow-floating border-4 border-white cursor-pointer group"
                >
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">Featured Spotlight</span>
                    <h3 className="font-serif text-2xl font-medium mt-1">{heroProduct.name}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                      <span className="text-lg font-bold text-white">{formatPrice(heroProduct.price)}</span>
                      <span className="text-xs font-medium uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORY HIGHLIGHT CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Curated Categories</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-noir-900">Designed to Inspire</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo('catalog')}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-soft border border-brand-100"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/80 via-noir-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                <h3 className="font-serif text-lg sm:text-xl font-medium">{cat.name}</h3>
                <p className="text-[11px] text-brand-200 font-light mt-0.5">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BEST-SELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-200/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Handpicked Favorites</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-noir-900 mt-1">Featured Best Sellers</h2>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-brand-700 hover:text-noir-900 transition-colors flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* PROMO / CODE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-noir-900 text-white p-8 sm:p-12 overflow-hidden border border-noir-800 shadow-floating">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-400">Exclusive Offer</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light">Enjoy 10% or 20% Off Your First Order</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
                Use promo code <code className="bg-noir-800 text-brand-400 px-2 py-0.5 rounded font-mono font-bold">WELCOME10</code> at checkout for 10% off, or <code className="bg-noir-800 text-brand-400 px-2 py-0.5 rounded font-mono font-bold">ACCESS20</code> for 20% off on qualifying orders.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button
                onClick={() => navigateTo('catalog')}
                className="px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-colors shadow-luxe"
              >
                Claim Discount
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
