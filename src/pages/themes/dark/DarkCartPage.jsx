import React from 'react';
import { useShop } from '../../../context/ShopContext';
import { formatPrice } from '../../../data/mockData';
import { ShoppingBag, Trash2, Plus, Minus, Tag, Check, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';

const D = {
  bg: '#0D0C0B', card: '#181614', cardBorder: 'rgba(197,160,89,0.15)',
  text: '#F4EFEA', muted: '#A89F91', accent: '#E6C280',
  accentBg: 'rgba(197,160,89,0.12)', border: 'rgba(197,160,89,0.2)',
};

export const DarkCartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, subtotal, appliedCoupon, couponInput, setCouponInput, couponError, applyDiscountCode, removeDiscountCode, discountAmount, navigateTo, t } = useShop();

  const handleApplyCoupon = (e) => { e.preventDefault(); applyDiscountCode(couponInput); };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: D.accentBg }}>
          <ShoppingBag className="w-10 h-10" style={{ color: D.accent }} />
        </div>
        <h2 className="font-serif text-3xl font-light" style={{ color: D.text }}>{t('emptyBag')}</h2>
        <p className="text-xs sm:text-sm max-w-md mx-auto" style={{ color: D.muted }}>{t('catalogDesc')}</p>
        <button onClick={() => navigateTo('catalog')} className="px-8 py-3.5 font-medium text-xs uppercase tracking-widest rounded-full" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
          {t('exploreCatalog')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6" style={{ borderBottom: `1px solid ${D.border}` }}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.accent }}>{t('shoppingBag')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: D.text }}>{t('reviewOrder')}</h1>
        </div>
        <button onClick={() => navigateTo('catalog')} className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ color: D.accent }}>
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('continueShopping')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
              <div onClick={() => navigateTo('product-detail', product.id)} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden cursor-pointer flex-shrink-0" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}` }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: D.accent }}>{product.category}</span>
                <h3 onClick={() => navigateTo('product-detail', product.id)} className="font-serif text-lg font-medium cursor-pointer line-clamp-1 transition-opacity hover:opacity-70" style={{ color: D.text }}>{product.name}</h3>
                <p className="text-xs font-light" style={{ color: D.muted }}>{t('material')}: {product.material}</p>
                <div className="text-sm font-semibold pt-1" style={{ color: D.accent }}>{formatPrice(product.price)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl p-1" style={{ border: `1px solid ${D.cardBorder}`, background: D.accentBg }}>
                  <button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center" style={{ color: D.text }}><Minus className="w-3 h-3" /></button>
                  <span className="w-8 text-center font-bold text-xs" style={{ color: D.accent }}>{quantity}</span>
                  <button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center" style={{ color: D.text }}><Plus className="w-3 h-3" /></button>
                </div>
                <span className="text-sm font-bold w-20 sm:w-24 text-right rtl:text-left" style={{ color: D.text }}>{formatPrice(product.price * quantity)}</span>
                <button onClick={() => removeFromCart(product.id)} className="p-2 transition-colors" style={{ color: D.muted }}><Trash2 className="w-4 h-4 hover:text-red-400" /></button>
              </div>
            </div>
          ))}

          <div className="p-4 rounded-xl flex items-center gap-3 text-xs" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}` }}>
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: D.accent }} />
            <span style={{ color: D.text }}>{t('giftNotice')}</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl space-y-6" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
            <h2 className="font-serif text-xl font-medium pb-4" style={{ color: D.text, borderBottom: `1px solid ${D.border}` }}>{t('reviewOrder')}</h2>

            <div className="flex justify-between items-center text-xs">
              <span style={{ color: D.muted }}>{t('itemsSubtotal')}</span>
              <span className="font-semibold" style={{ color: D.text }}>{formatPrice(subtotal)}</span>
            </div>

            <div className="space-y-3 pt-4" style={{ borderTop: `1px solid ${D.border}` }}>
              <label htmlFor="coupon-dark" className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: D.text }}>
                <Tag className="w-3.5 h-3.5" style={{ color: D.accent }} /> {t('discountCode')}
              </label>
              {appliedCoupon ? (
                <div className="p-3 rounded-xl flex items-center justify-between" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: '#34D399' }} />
                    <div>
                      <span className="text-xs font-bold font-mono block" style={{ color: '#34D399' }}>{appliedCoupon.code}</span>
                      <span className="text-[11px]" style={{ color: D.muted }}>{appliedCoupon.label} (-{formatPrice(discountAmount)})</span>
                    </div>
                  </div>
                  <button onClick={removeDiscountCode} className="text-xs font-semibold" style={{ color: '#f87171' }}>{t('remove')}</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input id="coupon-dark" type="text" placeholder="e.g. WELCOME10" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} className="flex-1 uppercase font-mono text-xs rounded-xl px-3.5 py-2.5 focus:outline-none" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}`, color: D.text }} />
                    <button type="submit" className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>{t('apply')}</button>
                  </div>
                  {couponError && <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#f87171' }}><AlertCircle className="w-3.5 h-3.5" /><span>{couponError}</span></div>}
                  <div className="text-[11px]" style={{ color: D.muted }}>
                    Try <button type="button" onClick={() => { setCouponInput('WELCOME10'); applyDiscountCode('WELCOME10'); }} className="underline font-semibold" style={{ color: D.accent }}>WELCOME10</button> (10% off) or <button type="button" onClick={() => { setCouponInput('ACCESS20'); applyDiscountCode('ACCESS20'); }} className="underline font-semibold" style={{ color: D.accent }}>ACCESS20</button> (20% off)
                  </div>
                </form>
              )}
            </div>

            {appliedCoupon && (
              <div className="flex justify-between items-center text-xs font-semibold" style={{ color: '#34D399' }}>
                <span>Discount ({appliedCoupon.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="pt-4 flex justify-between items-baseline" style={{ borderTop: `1px solid ${D.border}` }}>
              <span className="font-serif text-lg font-bold" style={{ color: D.text }}>{t('subtotalDue')}</span>
              <span className="text-2xl font-bold" style={{ color: D.accent }}>{formatPrice(subtotal - discountAmount)}</span>
            </div>

            <button onClick={() => navigateTo('delivery')} className="w-full py-4 font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 group" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
              <span>{t('proceedToDelivery')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
