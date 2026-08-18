import React from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import { Sparkles, ArrowRight, Crown, Gift, Zap } from 'lucide-react';

export const DarkHomePage = () => {
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
    <div className="space-y-20 animate-fade-in" style={{ background: '#0D0C0B', color: '#F4EFEA' }}>

      {/* DARK HERO */}
      <section className="relative overflow-hidden pt-8 pb-20 lg:py-28" style={{ background: 'linear-gradient(180deg, #111009 0%, #0D0C0B 100%)' }}>
        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.10) 0%, transparent 70%)' }} />
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(230,194,128,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.3)', color: '#E6C280' }}>
                <Crown className="w-3.5 h-3.5" />
                {t('heroBadge')}
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-extralight leading-[1.1] tracking-tight" style={{ color: '#F4EFEA' }}>
                {t('heroTitle1')} <br />
                <span className="italic font-normal" style={{ background: 'linear-gradient(135deg, #AB843E 0%, #E6C280 50%, #F0DBA0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t('heroTitle2')}
                </span>
              </h1>

              <p className="text-base sm:text-lg font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed" style={{ color: '#A89F91' }}>
                {t('heroDesc')}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => navigateTo('catalog')} className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
                  <span>{t('exploreCatalog')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>
                <button onClick={() => navigateTo('product-detail', 'prod-2')} className="w-full sm:w-auto px-7 py-4 font-medium text-xs uppercase tracking-widest rounded-full border transition-all flex items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(197,160,89,0.3)', color: '#E6C280', backdropFilter: 'blur(8px)' }}>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('viewFeatured')}</span>
                </button>
              </div>

              {/* Stats */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t" style={{ borderColor: 'rgba(197,160,89,0.2)' }}>
                {[['100%', t('handmadeQuality')], ['WhatsApp', t('instantCheckout')], ['Same Day', t('sameDayPickup')]].map(([val, label]) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="text-xl font-serif font-bold" style={{ color: '#E6C280' }}>{val}</div>
                    <div className="text-[11px] uppercase tracking-wider mt-0.5" style={{ color: '#A89F91' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-40" style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.3) 0%, transparent 70%)' }} />
                <div onClick={() => navigateTo('product-detail', heroProduct.id)} className="relative rounded-3xl overflow-hidden cursor-pointer group" style={{ border: '1px solid rgba(197,160,89,0.2)', boxShadow: '0 0 60px rgba(197,160,89,0.1)' }}>
                  <img src={heroProduct.image} alt={heroProduct.name} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white" style={{ background: 'linear-gradient(to top, rgba(13,12,11,0.95) 0%, rgba(13,12,11,0.4) 50%, transparent 100%)' }}>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E6C280' }}>{t('featuredSpotlight')}</span>
                    <h3 className="font-serif text-2xl font-medium mt-1" style={{ color: '#F4EFEA' }}>{heroProduct.name}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: '1px solid rgba(197,160,89,0.2)' }}>
                      <span className="text-lg font-bold" style={{ color: '#E6C280' }}>{formatPrice(heroProduct.price)}</span>
                      <span className="text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: 'rgba(197,160,89,0.15)', color: '#E6C280', backdropFilter: 'blur(8px)' }}>{t('shopNow')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* DARK CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E6C280' }}>{t('curatedCategories')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: '#F4EFEA' }}>{t('designedToInspire')}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} onClick={() => navigateTo('catalog')} className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer" style={{ border: '1px solid rgba(197,160,89,0.15)' }}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end text-white" style={{ background: 'linear-gradient(to top, rgba(13,12,11,0.9) 0%, rgba(13,12,11,0.3) 60%, transparent 100%)' }}>
                <h3 className="font-serif text-lg sm:text-xl font-medium" style={{ color: '#F4EFEA' }}>{cat.name}</h3>
                <p className="text-[11px] font-light mt-0.5" style={{ color: '#E6C280' }}>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4" style={{ borderBottom: '1px solid rgba(197,160,89,0.2)' }}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E6C280' }}>{t('handpickedFavorites')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: '#F4EFEA' }}>{t('featuredBestSellers')}</h2>
          </div>
          <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: '#E6C280' }}>
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-2xl overflow-hidden" style={{ background: '#181614', border: '1px solid rgba(197,160,89,0.15)' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* DARK PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1611 0%, #0D0C0B 100%)', border: '1px solid rgba(197,160,89,0.25)', boxShadow: '0 0 80px rgba(197,160,89,0.05)' }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)' }} />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#E6C280' }}>{t('exclusiveOffer')}</span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: '#F4EFEA' }}>{t('promoTitle')}</h3>
              <p className="text-xs sm:text-sm font-light max-w-xl" style={{ color: '#A89F91' }}>
                Use promo code <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'rgba(197,160,89,0.15)', color: '#E6C280' }}>WELCOME10</code> for 10% off, or <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: 'rgba(197,160,89,0.15)', color: '#E6C280' }}>ACCESS20</code> for 20% off.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 font-medium text-xs uppercase tracking-widest rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
                {t('claimDiscount')}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
