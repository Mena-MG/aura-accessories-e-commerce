import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, UNIT_LABELS, FREE_DELIVERY_THRESHOLD } from '../data/mockData';
import { 
  ShoppingBag, Trash2, Plus, Minus, Tag, Check, 
  ArrowRight, ArrowLeft, Sparkles, AlertCircle, Calculator
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
    language,
    t 
  } = useShop();

  const isAr = language === 'ar';

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyDiscountCode(couponInput);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-brand-100/80 rounded-3xl flex items-center justify-center mx-auto text-accent-gold shadow-sm border border-brand-200">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-noir-900">{t('emptyBag')}</h2>
        <p className="text-xs sm:text-sm text-noir-600 max-w-md mx-auto">
          {isAr ? 'لم تضف خامات مطبخ إلى سلتك بعد. تصفح أحدث ألواح الجرانيت، الكوارتز، والدواليب أو استخدم حاسبة التكاليف.' : 'Your project cart is empty. Explore certified granite slabs, quartz, and cabinetry.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('catalog')}
            className="px-8 py-3.5 bg-noir-900 hover:bg-accent-gold hover:text-noir-950 text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg"
          >
            {t('startShopping')}
          </button>
          <button
            onClick={() => navigateTo('calculator')}
            className="px-6 py-3.5 bg-brand-100 hover:bg-brand-200 text-noir-900 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all border border-brand-300 flex items-center gap-2"
          >
            <Calculator size={15} className="text-accent-gold" />
            <span>{t('calculator')}</span>
          </button>
        </div>
      </div>
    );
  }

  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{t('shoppingBag')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 mt-1">{t('reviewOrder')}</h1>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-3 sm:mt-0 text-xs font-bold uppercase tracking-wider text-noir-700 hover:text-accent-gold transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('continueShopping')}</span>
        </button>
      </div>

      {/* Free Delivery Threshold Alert */}
      <div className="p-4 rounded-2xl bg-brand-100/60 border border-brand-200 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-gold shrink-0" />
          {freeDeliveryRemaining === 0 ? (
            <span className="font-bold text-emerald-800">
              🎉 {isAr ? 'تهانينا! طلبيتك مؤهلة للشحن المجاني والمعاينة الهندسية.' : 'Congratulations! Your order qualifies for free site freight & delivery.'}
            </span>
          ) : (
            <span className="text-noir-700">
              {isAr ? `أضف خامات بقيمة ${formatPrice(freeDeliveryRemaining, language)} إضافية للحصول على شحن ومعاينة مجاناً!` : `Add ${formatPrice(freeDeliveryRemaining, language)} more to unlock free project delivery!`}
            </span>
          )}
        </div>
        <span className="font-mono font-bold text-noir-900 hidden sm:inline">
          {formatPrice(FREE_DELIVERY_THRESHOLD, language)} {isAr ? 'الحد الأدنى' : 'Goal'}
        </span>
      </div>

      {/* Main Grid: Cart Items (8 cols) + Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => {
            const product = item.product;
            const unitLabel = product.unitType ? (UNIT_LABELS[product.unitType]?.[language] || '') : '';
            const itemTotal = product.price * item.quantity;

            return (
              <div 
                key={`${product.id}-${idx}`}
                className="p-4 sm:p-5 rounded-3xl bg-brand-50 border border-brand-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-brand-200 shadow-xs shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-gold">
                      {isAr ? (product.categoryAr || product.category) : product.category}
                    </span>
                    <h3 
                      onClick={() => navigateTo('product-detail', product.id)}
                      className="font-serif text-sm sm:text-base font-bold text-noir-900 hover:text-accent-gold cursor-pointer transition-colors line-clamp-1"
                    >
                      {isAr ? (product.nameAr || product.name) : product.name}
                    </h3>
                    
                    {item.customNote && (
                      <p className="text-[11px] text-accent-gold font-medium bg-accent-gold/10 px-2 py-0.5 rounded-md inline-block">
                        {item.customNote}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-noir-600">
                      <span className="font-bold text-noir-900 font-mono">{formatPrice(product.price, language)}</span>
                      <span>{unitLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-200">
                  <div className="flex items-center border border-brand-300 rounded-xl bg-brand-100/50 p-1">
                    <button
                      onClick={() => updateCartQuantity(product.id, Math.max(0.5, item.quantity - 0.5))}
                      className="p-1 text-noir-600 hover:text-noir-950 rounded hover:bg-brand-200 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={item.quantity}
                      onChange={(e) => updateCartQuantity(product.id, Math.max(0.5, Number(e.target.value)))}
                      className="w-12 text-center font-bold text-xs bg-transparent focus:outline-none font-mono"
                    />
                    <button
                      onClick={() => updateCartQuantity(product.id, item.quantity + 0.5)}
                      className="p-1 text-noir-600 hover:text-noir-950 rounded hover:bg-brand-200 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif font-bold text-sm sm:text-base text-noir-900 font-mono">
                      {formatPrice(itemTotal, language)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1.5 text-noir-400 hover:text-red-600 transition-colors"
                      title={t('remove')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Financial Summary & Promo Code (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-brand-100/60 border border-brand-200 shadow-sm space-y-5">
            
            <h2 className="font-serif text-lg font-bold text-noir-900 border-b border-brand-200 pb-3">
              {t('orderSummary')}
            </h2>

            {/* Subtotal & Math */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center text-noir-700">
                <span>{t('subtotal')}</span>
                <span className="font-mono font-bold text-noir-900">{formatPrice(subtotal, language)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-700 font-bold">
                  <span>{t('discount')} ({appliedCoupon?.code})</span>
                  <span className="font-mono">-{formatPrice(discountAmount, language)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-noir-700">
                <span>{t('deliveryFee')}</span>
                <span className="font-mono font-bold text-noir-900">
                  {subtotal >= FREE_DELIVERY_THRESHOLD ? t('freeDelivery') : formatPrice(100, language)}
                </span>
              </div>

              <div className="pt-3 border-t-2 border-brand-300 flex justify-between items-baseline">
                <span className="font-serif font-bold text-sm text-noir-900">{t('total')}</span>
                <span className="text-2xl font-serif font-bold text-accent-gold font-mono">
                  {formatPrice(subtotal - discountAmount + (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 100), language)}
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-2 border-t border-brand-200">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-noir-700">
                {t('couponCode')}
              </label>

              {appliedCoupon ? (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-emerald-600" />
                    <span className="font-bold font-mono">{appliedCoupon.code}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeDiscountCode}
                    className="text-red-600 text-xs font-bold hover:underline"
                  >
                    {t('remove')}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. KITCHEN10"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-brand-300 bg-brand-50 text-xs font-mono uppercase focus:ring-2 focus:ring-accent-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-noir-900 hover:bg-accent-gold hover:text-noir-950 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                  >
                    {t('applyCoupon')}
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('delivery')}
              className="w-full py-4 px-6 rounded-2xl bg-accent-gold text-noir-950 font-bold text-xs uppercase tracking-widest shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <span>{t('proceedToDelivery')}</span>
              <ArrowRight size={16} className="rtl:rotate-180" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
