import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { formatPrice, UNIT_LABELS } from '../data/mockData';
import { 
  ShoppingBag, Heart, Star, Sparkles, CheckCircle2, 
  ArrowLeft, Plus, Minus, MessageSquare, Share2, Box, ShieldCheck, Ruler, Layers, Globe
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { 
    selectedProduct, 
    products, 
    addToCart, 
    navigateTo, 
    wishlist, 
    toggleWishlist, 
    showToast, 
    storePhoneNumber, 
    t, 
    language,
    setSurfaceMaterial 
  } = useShop();

  const isAr = language === 'ar';
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9]/g, '');

  const relatedProducts = products.filter(
    p => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.surfaceType === selectedProduct.surfaceType)
  ).slice(0, 3);

  const unitLabel = selectedProduct.unitType ? (UNIT_LABELS[selectedProduct.unitType]?.[language] || '') : '';

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleLaunchIn3D = () => {
    const surface = selectedProduct.surfaceType || 'countertop';
    setSurfaceMaterial(surface, selectedProduct.id);
    navigateTo('studio3d');
  };

  const handleWhatsAppInquiry = () => {
    const currency = isAr ? 'ج.م' : 'EGP';
    const msg = isAr
      ? `مرحباً أورا للمطابخ! 🏠 أرغب في الاستفسار عن تفاصيل وأسعار خامة: ${selectedProduct.nameAr || selectedProduct.name} (${selectedProduct.price} ${currency} ${unitLabel}).`
      : `Hello Aura Kitchen Market! 🏠 I would like to inquire about: ${selectedProduct.name} (${selectedProduct.price} ${currency} ${unitLabel}).`;
    
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16 animate-fade-in">
      
      {/* Back Button Breadcrumb */}
      <button
        onClick={() => navigateTo('catalog')}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-noir-700 hover:text-accent-gold transition-colors"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{t('backToCatalog')}</span>
      </button>

      {/* Main Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-brand-100/50 border border-brand-300 shadow-2xl group">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto bg-brand-50/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-300 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-noir-900 font-sans">
                  {isAr ? (selectedProduct.badgeAr || selectedProduct.badge) : selectedProduct.badge}
                </span>
              </div>
            )}

            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              aria-label="Add to wishlist"
              className={`absolute top-4 right-4 rtl:left-4 rtl:right-auto w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-md ${
                isWishlisted 
                  ? 'bg-rose-50 text-rose-500' 
                  : 'bg-brand-50/90 text-noir-800 hover:bg-brand-50 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* 3D Launch Action Banner */}
          {selectedProduct.surfaceType && selectedProduct.surfaceType !== 'none' && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-noir-950 via-noir-900 to-noir-950 text-white border border-noir-800 shadow-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-gold/20 text-accent-gold flex items-center justify-center font-bold">
                  <Box size={20} />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold">{isAr ? 'معاينة الخامة في استوديو 3D' : 'Preview Material in 3D Studio'}</h4>
                  <p className="text-[11px] text-zinc-400">{isAr ? 'شاهد الخامة مطبقة على أسطح المطبخ ثلاثية الأبعاد' : 'Render this material onto interactive 3D surfaces'}</p>
                </div>
              </div>
              <button
                onClick={handleLaunchIn3D}
                className="px-4 py-2 rounded-xl bg-accent-gold text-noir-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-md whitespace-nowrap"
              >
                {t('viewIn3D')}
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Details, Specifications, Pricing & Cart Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                {isAr ? (selectedProduct.categoryAr || selectedProduct.category) : selectedProduct.category}
              </span>
              
              <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold bg-brand-100 px-2.5 py-1 rounded-full border border-brand-200">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{selectedProduct.rating}</span>
                <span className="text-noir-500 font-normal">({selectedProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-noir-900 leading-tight">
              {isAr ? (selectedProduct.nameAr || selectedProduct.name) : selectedProduct.name}
            </h1>

            <p className="text-xs text-emerald-700 font-bold mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              {t('inStock')}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-brand-100/50 border border-brand-200 flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-noir-900 font-mono">
                {formatPrice(selectedProduct.price, language)}
              </span>
              {unitLabel && (
                <span className="text-sm font-bold text-noir-600 font-sans">
                  {unitLabel}
                </span>
              )}
              {selectedProduct.originalPrice && (
                <span className="text-sm text-noir-400 line-through font-mono ml-2">
                  {formatPrice(selectedProduct.originalPrice, language)}
                </span>
              )}
            </div>

            <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">
              {isAr ? 'شامل التقطيع والتجهيز' : 'Fabrication Ready'}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-noir-700 leading-relaxed font-normal">
            {isAr ? (selectedProduct.descriptionAr || selectedProduct.description) : selectedProduct.description}
          </p>

          {/* Technical Specs Table */}
          <div className="grid grid-cols-2 gap-2 text-xs border-y border-brand-200 py-4">
            <div className="flex items-center gap-2 text-noir-700">
              <Ruler size={14} className="text-accent-gold" />
              <span className="font-bold">{t('specThickness')}:</span>
              <span className="font-mono text-noir-900">{selectedProduct.thickness || '2.0 cm'}</span>
            </div>

            <div className="flex items-center gap-2 text-noir-700">
              <Layers size={14} className="text-accent-gold" />
              <span className="font-bold">{t('specFinish')}:</span>
              <span className="text-noir-900">{isAr ? (selectedProduct.finishAr || selectedProduct.finish) : selectedProduct.finish}</span>
            </div>

            <div className="flex items-center gap-2 text-noir-700">
              <Globe size={14} className="text-accent-gold" />
              <span className="font-bold">{t('specOrigin')}:</span>
              <span className="text-noir-900">{isAr ? (selectedProduct.originCountryAr || selectedProduct.originCountry) : selectedProduct.originCountry}</span>
            </div>

            <div className="flex items-center gap-2 text-noir-700">
              <ShieldCheck size={14} className="text-accent-gold" />
              <span className="font-bold">{t('specComposition')}:</span>
              <span className="text-noir-900 line-clamp-1">{isAr ? (selectedProduct.materialAr || selectedProduct.material) : selectedProduct.material}</span>
            </div>
          </div>

          {/* Quantity Stepper & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-noir-700">{t('quantity')}</span>
              
              <div className="flex items-center border border-brand-300 rounded-xl bg-brand-50 p-1">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="p-1.5 text-noir-600 hover:text-noir-950 rounded-lg hover:bg-brand-200 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0.5, Number(e.target.value)))}
                  className="w-14 text-center font-bold text-sm bg-transparent focus:outline-none font-mono"
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="p-1.5 text-noir-600 hover:text-noir-950 rounded-lg hover:bg-brand-200 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {unitLabel && (
                <span className="text-xs font-mono font-bold text-noir-600">
                  {unitLabel} ({formatPrice(selectedProduct.price * quantity, language)})
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-noir-900 hover:bg-accent-gold hover:text-noir-950 text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>{t('addedToCart')}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>{t('addToCart')}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppInquiry}
                className="py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={16} />
                <span>{t('inquireWhatsApp')}</span>
              </button>
            </div>
          </div>

          {/* Key Bullet Features */}
          {selectedProduct.features && (
            <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3 mt-6">
              <h3 className="font-serif font-bold text-xs uppercase tracking-wider text-noir-900 flex items-center gap-2">
                <Sparkles size={14} className="text-accent-gold" />
                {t('handcraftingDetails')}
              </h3>
              <ul className="space-y-2 text-xs text-noir-700">
                {(isAr && selectedProduct.featuresAr ? selectedProduct.featuresAr : selectedProduct.features).map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-accent-gold shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Complementary & Related Materials */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-brand-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-noir-900">{t('youMayAlsoLove')}</h2>
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-bold text-accent-gold hover:underline"
            >
              {t('viewAllProducts')} →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
