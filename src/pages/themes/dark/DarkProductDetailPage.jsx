import React, { useState } from 'react';
import { useShop } from '../../../context/ShopContext';
import { PRODUCTS, formatPrice } from '../../../data/mockData';
import { ProductCard } from '../../../components/ProductCard';
import { ShoppingBag, Heart, Star, Sparkles, CheckCircle2, ArrowLeft, Plus, Minus, MessageSquare, Share2 } from 'lucide-react';

const D = {
  bg: '#0D0C0B', card: '#181614', cardBorder: 'rgba(197,160,89,0.15)',
  text: '#F4EFEA', muted: '#A89F91', accent: '#E6C280',
  accentBg: 'rgba(197,160,89,0.12)', border: 'rgba(197,160,89,0.2)',
};

export const DarkProductDetailPage = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist, showToast, storePhoneNumber, t } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');
  const relatedProducts = PRODUCTS.filter(p => p.id !== selectedProduct.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      <button onClick={() => navigateTo('catalog')} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors" style={{ color: D.muted }}>
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('backToCatalog')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden group" style={{ background: D.card, border: `1px solid ${D.cardBorder}`, boxShadow: '0 0 60px rgba(197,160,89,0.08)' }}>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 rtl:right-4 rtl:left-auto backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(197,160,89,0.15)', border: `1px solid ${D.cardBorder}` }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: D.accent }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: D.accent }}>{selectedProduct.badge}</span>
              </div>
            )}
            <button onClick={() => toggleWishlist(selectedProduct.id)} className="absolute top-4 right-4 rtl:left-4 rtl:right-auto w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all" style={{ background: isWishlisted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)', color: isWishlisted ? '#f87171' : D.muted }}>
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: D.accent }}>{selectedProduct.category}</span>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#FBBF24' }}>
              <div className="flex items-center">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}</div>
              <span style={{ color: D.text }}>{selectedProduct.rating}</span>
              <span style={{ color: D.muted }}>({selectedProduct.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="space-y-2 pb-6" style={{ borderBottom: `1px solid ${D.border}` }}>
            <h1 className="font-serif text-3xl sm:text-4xl font-light leading-tight" style={{ color: D.text }}>{selectedProduct.name}</h1>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-semibold" style={{ color: D.accent }}>{formatPrice(selectedProduct.price)}</span>
              {selectedProduct.originalPrice && <span className="text-sm line-through" style={{ color: D.muted }}>{formatPrice(selectedProduct.originalPrice)}</span>}
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399' }}>{t('inStock')}</span>
            </div>
          </div>

          <p className="text-sm font-light leading-relaxed" style={{ color: D.muted }}>{selectedProduct.description}</p>

          <div className="grid grid-cols-2 gap-3 py-2 text-xs">
            <div className="p-3 rounded-xl" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}` }}>
              <span className="text-[10px] uppercase font-bold block" style={{ color: D.muted }}>{t('material')}</span>
              <span className="font-semibold" style={{ color: D.text }}>{selectedProduct.material}</span>
            </div>
            <div className="p-3 rounded-xl" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}` }}>
              <span className="text-[10px] uppercase font-bold block" style={{ color: D.muted }}>{t('colorPalette')}</span>
              <span className="font-semibold" style={{ color: D.text }}>{selectedProduct.color}</span>
            </div>
          </div>

          <div className="space-y-4 pt-4" style={{ borderTop: `1px solid ${D.border}` }}>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('quantity')}</span>
              <div className="flex items-center rounded-xl p-1" style={{ border: `1px solid ${D.cardBorder}`, background: D.accentBg }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: D.text }}>
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-xs" style={{ color: D.accent }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: D.text }}>
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full py-4 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg" style={addedAnimation ? { background: '#059669', color: '#fff' } : { background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
              {addedAnimation ? <><CheckCircle2 className="w-5 h-5 animate-bounce" /><span>{t('addedToCart')}</span></> : <><ShoppingBag className="w-4 h-4" /><span>{t('addToCart')} â€” {formatPrice(selectedProduct.price * quantity)}</span></>}
            </button>

            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi!%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(selectedProduct.name)}`} target="_blank" rel="noreferrer" className="flex-1 py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors" style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', border: '1px solid rgba(16,185,129,0.25)' }}>
                <MessageSquare className="w-4 h-4" /> <span>{t('inquireWhatsApp')}</span>
              </a>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link copied!', 'info'); }} className="p-3 rounded-full border transition-colors" style={{ background: D.accentBg, borderColor: D.cardBorder, color: D.accent }}>
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-6 space-y-3" style={{ borderTop: `1px solid ${D.border}` }}>
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('handcraftingDetails')}</h4>
            <ul className="space-y-2 text-xs">
              {selectedProduct.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: D.accent }} />
                  <span style={{ color: D.muted }}>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="pt-12 space-y-8" style={{ borderTop: `1px solid ${D.border}` }}>
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.accent }}>{t('complementaryPieces')}</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light" style={{ color: D.text }}>{t('youMayAlsoLove')}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map(product => (
            <div key={product.id} className="rounded-2xl overflow-hidden" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
