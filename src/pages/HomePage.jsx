import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../data/mockData';
import { Sparkles, ArrowRight, Award, Calculator, Box, CheckCircle2, ShieldCheck, Flame, Compass, ChevronRight } from 'lucide-react';

export const HomePage = () => {
  const { navigateTo, t, products, categories, language } = useShop();
  const isAr = language === 'ar';

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const heroProduct = products[0] || products[0]; // Black Galaxy Granite

  const categoryCards = [
    { 
      name: t('countertops'), 
      tag: isAr ? 'جرانيت وكوارتز وكوريان' : 'Granite, Quartz & Corian', 
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=800',
      categoryKey: 'Countertops'
    },
    { 
      name: t('cabinets'), 
      tag: isAr ? 'بي في سي وأكريليك و HPL' : 'PVC, Acrylic & HPL Units', 
      image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&q=80&w=800',
      categoryKey: 'Cabinets & Units'
    },
    { 
      name: t('tiles'), 
      tag: isAr ? 'مترو وزليج وسيراميك' : 'Metro, Zellige & Mosaic', 
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800',
      categoryKey: 'Tiles & Backsplash'
    },
    { 
      name: t('sinks'), 
      tag: isAr ? 'فرانكي وجروهي ألماني' : 'German Franke & Grohe', 
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
      categoryKey: 'Sinks & Faucets'
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 animate-fade-in pb-12">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-brand-100/60 via-brand-50 to-brand-50 border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left rtl:lg:text-right">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-gold/15 border border-accent-gold/30 text-noir-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                {t('heroBadge')}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-noir-900 leading-[1.15] tracking-tight">
                {t('heroTitle1')} <span className="italic font-normal gold-gradient-text block mt-1">{t('heroTitle2')}</span>
              </h1>

              <p className="text-sm sm:text-base text-noir-700 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroDesc')}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center lg:justify-start rtl:lg:justify-start gap-3.5">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="w-full sm:w-auto px-7 py-4 bg-noir-900 hover:bg-accent-gold hover:text-noir-950 text-white font-bold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 group"
                >
                  <span>{t('exploreCatalog')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('calculator')}
                  className="w-full sm:w-auto px-6 py-4 bg-brand-50 hover:bg-brand-200 text-noir-900 font-bold text-xs uppercase tracking-widest rounded-2xl border border-brand-300 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-accent-gold" />
                  <span>{t('tryCalculator')}</span>
                </button>

                <button
                  onClick={() => navigateTo('studio3d')}
                  className="w-full sm:w-auto px-6 py-4 bg-accent-gold/20 hover:bg-accent-gold hover:text-noir-950 text-noir-900 font-bold text-xs uppercase tracking-widest rounded-2xl border border-accent-gold/40 shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Box className="w-4 h-4 text-accent-gold" />
                  <span>{t('view3DStudio')}</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-brand-200 text-center lg:text-left rtl:lg:text-right">
                <div className="space-y-0.5">
                  <div className="text-base sm:text-xl font-serif font-bold text-noir-900">25 Years</div>
                  <div className="text-[10px] sm:text-[11px] text-noir-600 font-bold uppercase tracking-wider">{t('naturalStone')}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-base sm:text-xl font-serif font-bold text-noir-900">WhatsApp</div>
                  <div className="text-[10px] sm:text-[11px] text-noir-600 font-bold uppercase tracking-wider">{t('instantWhatsApp')}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-base sm:text-xl font-serif font-bold text-noir-900">Turnkey</div>
                  <div className="text-[10px] sm:text-[11px] text-noir-600 font-bold uppercase tracking-wider">{t('expertInstallation')}</div>
                </div>
              </div>
            </div>

            {/* Hero Image / Spotlight Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent-gold/20 to-brand-300/30 rounded-3xl blur-2xl opacity-70" />

                <div 
                  onClick={() => navigateTo('product-detail', heroProduct.id)}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-50 cursor-pointer group bg-noir-950"
                >
                  <img
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('featuredSpotlight')}</span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1 leading-snug">
                      {isAr ? (heroProduct.nameAr || heroProduct.name) : heroProduct.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-1 line-clamp-1">
                      {heroProduct.material} • {heroProduct.thickness}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                      <span className="text-lg font-bold text-accent-gold font-mono">
                        {formatPrice(heroProduct.price, language)}/m²
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider bg-accent-gold text-noir-950 px-3.5 py-1.5 rounded-xl shadow-md">
                        {t('shopNow')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3D STUDIO & CALCULATOR INTERACTIVE TEASER BANNERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 3D Visualizer Teaser */}
          <div 
            onClick={() => navigateTo('studio3d')}
            className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-noir-950 via-noir-900 to-noir-950 text-white border border-noir-800 shadow-xl overflow-hidden cursor-pointer hover:border-accent-gold/50 transition-all"
          >
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider">
                <Box size={14} />
                <span>3D Visualizer</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {isAr ? 'استوديو المعاينة التفاعلية 3D' : 'Interactive 3D Material Studio'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
                {isAr 
                  ? 'جرّب تبديل خامات الرخام والجرانيت وألوان الدواليب والبلاط ثلاثي الأبعاد في مشهد مطبخ حقيقي قبل الشراء.'
                  : 'Swap granite slabs, quartz surfaces, and cabinet textures in real-time 3D simulation.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-accent-gold font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <span>{t('view3DStudio')}</span>
                <ChevronRight size={16} />
              </div>
            </div>
            <div className="absolute top-0 right-0 rtl:right-auto rtl:left-0 w-48 h-48 bg-accent-gold/10 rounded-full blur-3xl" />
          </div>

          {/* Smart Calculator Teaser */}
          <div 
            onClick={() => navigateTo('calculator')}
            className="group relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-100 via-brand-200/50 to-brand-100 text-noir-900 border border-brand-300 shadow-xl overflow-hidden cursor-pointer hover:border-accent-gold/50 transition-all"
          >
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold text-noir-950 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Calculator size={14} />
                <span>Smart Math</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                {t('calcTitle')}
              </h3>
              <p className="text-xs sm:text-sm text-noir-700 max-w-sm leading-relaxed">
                {isAr
                  ? 'احسب تكلفة مطبخك بالكامل في ثوانٍ: الأمتار × أسعار الخامات + مصنعية التركيب + عمولة الإشراف وضمان الجودة.'
                  : 'Calculate accurate kitchen estimates: Area + Material costs + Installation + Quality commission.'}
              </p>
              <div className="pt-2 flex items-center gap-2 text-noir-900 font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                <span>{t('tryCalculator')}</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CURATED CATEGORIES GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('curatedCategories')}</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900">{t('designedToInspire')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categoryCards.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo('catalog')}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-md border border-brand-200 bg-noir-950"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950/90 via-noir-950/30 to-transparent p-5 flex flex-col justify-end text-white">
                <h3 className="font-serif text-base sm:text-xl font-bold">{cat.name}</h3>
                <p className="text-[11px] text-accent-gold font-medium mt-0.5">{cat.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED BEST-SELLERS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-brand-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('handpickedFavorites')}</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 mt-1">{t('featuredBestSellers')}</h2>
          </div>
          <button
            onClick={() => navigateTo('catalog')}
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-noir-900 hover:text-accent-gold transition-colors flex items-center gap-1.5"
          >
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-noir-950 text-white p-6 sm:p-10 md:p-12 overflow-hidden border border-noir-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('exclusiveOffer')}</span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold">
                {isAr ? 'وفر ١٠٪ أو ٥٠٠ ج.م على تشطيب مطبخك' : 'Save 10% or 500 EGP on Your Kitchen Fit-Out'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
                {isAr
                  ? 'استخدم كود KITCHEN10 للحصول على خصم ١٠٪، أو كود SAVE500 للخصم الفوري عند إرسال طلبك عبر الواتساب.'
                  : 'Use promo code KITCHEN10 for 10% off, or SAVE500 for an instant discount at checkout.'}
              </p>
            </div>
            <div className="md:col-span-4 flex justify-start md:justify-end">
              <button
                onClick={() => navigateTo('catalog')}
                className="w-full sm:w-auto px-8 py-3.5 bg-accent-gold text-noir-950 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:opacity-90"
              >
                {t('claimDiscount')}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
