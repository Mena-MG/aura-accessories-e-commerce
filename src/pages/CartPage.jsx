import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/mockData';
import { 
  ShoppingBag, Trash2, Plus, Minus, Tag, Check, 
  ArrowRight, ArrowLeft, Sparkles, AlertCircle 
} from 'lucide-react';

export const CartPage = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    subtotal, 
    appliedCoupon, 
    couponInput, 
    setCouponInput, 
    couponError, 
    applyDiscountCode, 
    removeDiscountCode, 
    discountAmount, 
    navigateTo,
    t 
  } = useShop();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyDiscountCode(couponInput);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto text-brand-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-light text-noir-900">{t('emptyBag')}</h2>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
          {t('catalogDesc')}
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="px-8 py-3.5 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-colors shadow-luxe"
        >
          {t('exploreCatalog')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-200/60 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">{t('shoppingBag')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-noir-900 mt-1">{t('reviewOrder')}</h1>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-brand-700 hover:text-noir-900 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('continueShopping')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          
          {cart.map(({ product, quantity }) => (
            <div 
              key={product.id}
              className="bg-white p-4 sm:p-6 rounded-2xl border border-brand-200/60 shadow-soft flex flex-col sm:flex-row items-center gap-6"
            >
              {/* Product Thumbnail */}
              <div 
                onClick={() => navigateTo('product-detail', product.id)}
                className="w-24 h-24 aspect-square bg-brand-50 rounded-xl overflow-hidden cursor-pointer flex-shrink-0 border border-brand-100"
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              {/* Product Info */}
              <div className="flex-1 text-center sm:text-left rtl:sm:text-right space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 block">
                  {product.category}
                </span>
                <h3 
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="font-serif text-lg font-medium text-noir-900 cursor-pointer hover:text-brand-600 transition-colors line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light">{t('material')}: {product.material}</p>
                <div className="text-sm font-semibold text-noir-900 pt-1">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-brand-200 rounded-xl bg-brand-50/50 p-1">
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity - 1)}
                    className="w-7 h-7 rounded-lg hover:bg-white text-noir-800 flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-bold text-xs text-noir-900">{quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(product.id, quantity + 1)}
                    className="w-7 h-7 rounded-lg hover:bg-white text-noir-800 flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Subtotal per item */}
                <span className="text-sm font-bold text-noir-900 w-24 text-right rtl:text-left">
                  {formatPrice(product.price * quantity)}
                </span>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"
                  aria-label="Remove product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          {/* Quick Info Box */}
          <div className="bg-brand-50/70 p-4 rounded-xl border border-brand-200/50 flex items-center gap-3 text-xs text-brand-900">
            <Sparkles className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>{t('giftNotice')}</span>
          </div>

        </div>

        {/* Right Column: Order Summary & Coupon Input */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-brand-200/60 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-medium text-noir-900 border-b border-brand-100 pb-4">
              {t('reviewOrder')}
            </h2>

            {/* Subtotal */}
            <div className="flex justify-between items-center text-xs">
              <span className="text-noir-800/70">{t('itemsSubtotal')}</span>
              <span className="font-semibold text-noir-900">{formatPrice(subtotal)}</span>
            </div>

            {/* Coupon Code Section */}
            <div className="space-y-3 pt-4 border-t border-brand-100">
              <label htmlFor="coupon-input" className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand-600" />
                {t('discountCode')}
              </label>

              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block font-mono">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-[11px] text-emerald-700">
                        {appliedCoupon.label} (-{formatPrice(discountAmount)})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    {t('remove')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      id="coupon-input"
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 uppercase font-mono text-xs bg-brand-50 border border-brand-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-noir-900 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      {t('apply')}
                    </button>
                  </div>

                  {couponError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{couponError}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-zinc-400">
                    Try <button type="button" onClick={() => { setCouponInput('WELCOME10'); applyDiscountCode('WELCOME10'); }} className="text-brand-600 underline font-semibold">WELCOME10</button> (10% off) or <button type="button" onClick={() => { setCouponInput('ACCESS20'); applyDiscountCode('ACCESS20'); }} className="text-brand-600 underline font-semibold">ACCESS20</button> (20% off)
                  </div>
                </form>
              )}
            </div>

            {/* Applied Discount Line */}
            {appliedCoupon && (
              <div className="flex justify-between items-center text-xs text-emerald-600 font-semibold">
                <span>Discount ({appliedCoupon.code})</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Estimated Total */}
            <div className="pt-4 border-t border-brand-100 flex justify-between items-baseline">
              <div>
                <span className="font-serif text-lg font-bold text-noir-900 block">{t('subtotalDue')}</span>
              </div>
              <span className="text-2xl font-bold text-noir-900">
                {formatPrice(subtotal - discountAmount)}
              </span>
            </div>

            {/* Proceed Button */}
            <button
              onClick={() => navigateTo('delivery')}
              className="w-full py-4 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-luxe flex items-center justify-center gap-2 group"
            >
              <span>{t('proceedToDelivery')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
