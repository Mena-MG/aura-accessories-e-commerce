import React, { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, UNIT_LABELS } from '../data/mockData';
import { 
  MessageSquare, Copy, Check, Sparkles, ShoppingBag, 
  MapPin, Phone, User, Tag, Truck, Store, ArrowLeft, RefreshCcw, Settings, Printer, CreditCard, CheckCircle2
} from 'lucide-react';

export const OrderSummaryPage = () => {
  const { 
    cart, 
    subtotal, 
    appliedCoupon, 
    discountAmount, 
    deliveryMethod, 
    deliveryDetails, 
    selectedPickupLocation, 
    deliveryFee, 
    total, 
    paymentMethod,
    instapayScreenshot,
    transactionRef,
    navigateTo, 
    showToast,
    clearCart,
    storePhoneNumber,
    language,
    t
  } = useShop();

  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => `AUR-KITCHEN-${Math.floor(10000 + Math.random() * 90000)}`);

  const cleanPhone = storePhoneNumber.replace(/[^0-9]/g, '');

  // Formatted WhatsApp message generator
  const formattedOrderText = useMemo(() => {
    const currency = isAr ? 'ج.م' : 'EGP';
    const fmt = (n) => n.toLocaleString('en-US');

    const header = isAr
      ? `╔═══════════════════════════════╗\n    🏠 أورا كيتشن ماركت\n       طلب توريد وتنفيذ جديد\n╚═══════════════════════════════╝`
      : `╔═══════════════════════════════╗\n    🏠 AURA KITCHEN MARKET\n       New Fit-Out & Material Order\n╚═══════════════════════════════╝`;

    const meta = isAr
      ? `\n📋 رقم المقايسة: #${orderId}\n📅 التاريخ: ${new Date().toLocaleDateString('ar-EG', { dateStyle: 'long' })}`
      : `\n📋 Order ID: #${orderId}\n📅 Date: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`;

    const customer = isAr
      ? `\n\n👤 بيانات العميل:\n━━━━━━━━━━━━━━━━━━\n• الاسم: ${deliveryDetails.name}\n• الموبايل: ${deliveryDetails.phone}`
      : `\n\n👤 Client Details:\n━━━━━━━━━━━━━━━━━━\n• Name: ${deliveryDetails.name}\n• Phone: ${deliveryDetails.phone}`;

    let fulfillment = '';
    if (deliveryMethod === 'delivery') {
      fulfillment = isAr
        ? `\n\n📦 طريقة التوريد: شحن لموقع المشروع\n📍 العنوان: ${deliveryDetails.address}, ${deliveryDetails.city}\n📝 ملاحظات: ${deliveryDetails.notes || 'لا يوجد'}`
        : `\n\n📦 Delivery Method: Site Freight Delivery\n📍 Address: ${deliveryDetails.address}, ${deliveryDetails.city}\n📝 Notes: ${deliveryDetails.notes || 'None'}`;
    } else {
      fulfillment = isAr
        ? `\n\n📦 طريقة التوريد: استلام ومعاينة بالمعرض\n📍 المعرض: ${selectedPickupLocation?.nameAr || selectedPickupLocation?.name}\n📍 العنوان: ${selectedPickupLocation?.addressAr || selectedPickupLocation?.address}`
        : `\n\n📦 Delivery Method: Showroom Pickup\n📍 Hub: ${selectedPickupLocation?.name}\n📍 Address: ${selectedPickupLocation?.address}`;
    }

    const itemsHeader = isAr ? `\n\n🛒 الخامات المطلوبة:\n━━━━━━━━━━━━━━━━━━` : `\n\n🛒 Selected Materials:\n━━━━━━━━━━━━━━━━━━`;
    
    const itemsList = cart.map((item, idx) => {
      const product = item.product;
      const name = isAr ? (product.nameAr || product.name) : product.name;
      const unit = product.unitType ? (UNIT_LABELS[product.unitType]?.[language] || '') : '';
      const custom = item.customNote ? `\n   ↳ [${item.customNote}]` : '';
      return `\n${idx + 1}️⃣ ${name}${custom}\n   • الكمية: ${item.quantity} ${unit} × ${fmt(product.price)} ${currency} = ${fmt(product.price * item.quantity)} ${currency}`;
    }).join('\n');

    const paymentLabel = {
      instapay: isAr ? 'تحويل إنستاباي الفوري (مرفق الإيصال ✅)' : 'Instapay Transfer (Receipt Attached ✅)',
      cod: isAr ? 'الدفع نقداً عند الاستلام والمعاينة' : 'Cash on Delivery / On Site Inspection',
      pickup: isAr ? 'السداد بالمعرض عند اعتماد العينات' : 'Pay at Showroom / Atelier',
    }[paymentMethod] || 'Instapay';

    const txRef = transactionRef ? `\n• رقم العملية: ${transactionRef}` : '';

    const summary = isAr
      ? `\n\n💰 ملخص الحساب:\n━━━━━━━━━━━━━━━━━━\n• إجمالي الخامات: ${fmt(subtotal)} ${currency}${discountAmount > 0 ? `\n• الخصم (${appliedCoupon?.code}): -${fmt(discountAmount)} ${currency}` : ''}\n• التوصيل والنقل: ${deliveryFee === 0 ? 'مجاناً ✨' : `${fmt(deliveryFee)} ${currency}`}\n─────────────────────\n💵 الإجمالي المستحق: ${fmt(total)} ${currency}\n\n💳 طريقة الدفع: ${paymentLabel}${txRef}`
      : `\n\n💰 Financial Summary:\n━━━━━━━━━━━━━━━━━━\n• Materials Subtotal: ${fmt(subtotal)} ${currency}${discountAmount > 0 ? `\n• Discount (${appliedCoupon?.code}): -${fmt(discountAmount)} ${currency}` : ''}\n• Freight / Delivery: ${deliveryFee === 0 ? 'FREE ✨' : `${fmt(deliveryFee)} ${currency}`}\n─────────────────────\n💵 Total Payable: ${fmt(total)} ${currency}\n\n💳 Payment: ${paymentLabel}${txRef}`;

    const footer = isAr
      ? `\n\n━━━━━━━━━━━━━━━━━━\nتم الإرسال عبر منصة أورا كيتشن ماركت 🏠`
      : `\n\n━━━━━━━━━━━━━━━━━━\nSent via Aura Kitchen Market 🏠`;

    return header + meta + customer + fulfillment + itemsHeader + itemsList + summary + footer;
  }, [cart, subtotal, discountAmount, appliedCoupon, deliveryMethod, deliveryDetails, selectedPickupLocation, deliveryFee, total, paymentMethod, transactionRef, orderId, isAr, language]);

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(formattedOrderText)}`;
    window.open(url, '_blank');
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(formattedOrderText);
    setCopied(true);
    showToast(t('summaryCopied'), 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{isAr ? 'المرحلة الثالثة: اعتماد الطلب' : 'Step 3: Order Confirmation'}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 mt-1">{t('orderSummary')}</h1>
          <p className="text-xs text-noir-600 font-mono mt-0.5">Reference #{orderId}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-100 hover:bg-brand-200 text-noir-800 text-xs font-bold transition-colors shadow-xs"
          >
            <Printer size={15} />
            <span>{t('printSummary')}</span>
          </button>

          <button
            onClick={() => navigateTo('delivery')}
            className="text-xs font-bold text-noir-700 hover:text-accent-gold px-3 py-2"
          >
            {t('editInfo')}
          </button>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-50 border border-brand-200 shadow-xl space-y-8">
        
        {/* Recipient & Fulfillment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-brand-100/40 border border-brand-200 text-xs">
          
          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <User size={14} />
              <span>{t('customerInfo')}</span>
            </h3>
            <p className="font-bold text-sm text-noir-900">{deliveryDetails.name}</p>
            <p className="text-noir-600 font-mono">{deliveryDetails.phone}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              {deliveryMethod === 'delivery' ? <Truck size={14} /> : <Store size={14} />}
              <span>{t('deliveryInfo')}</span>
            </h3>
            {deliveryMethod === 'delivery' ? (
              <div>
                <p className="font-bold text-noir-900">{deliveryDetails.address}</p>
                <p className="text-noir-600">{deliveryDetails.city}</p>
                {deliveryDetails.notes && <p className="text-[11px] text-noir-500 italic mt-1">{deliveryDetails.notes}</p>}
              </div>
            ) : (
              <div>
                <p className="font-bold text-noir-900">{isAr ? selectedPickupLocation?.nameAr : selectedPickupLocation?.name}</p>
                <p className="text-noir-600">{isAr ? selectedPickupLocation?.addressAr : selectedPickupLocation?.address}</p>
              </div>
            )}
          </div>

        </div>

        {/* Selected Materials List */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-base text-noir-900 border-b border-brand-200 pb-2">
            {t('orderItems')} ({cart.length})
          </h3>

          <div className="divide-y divide-brand-200">
            {cart.map((item, idx) => {
              const product = item.product;
              const unit = product.unitType ? (UNIT_LABELS[product.unitType]?.[language] || '') : '';
              return (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-brand-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-noir-900">{isAr ? (product.nameAr || product.name) : product.name}</h4>
                      <p className="text-[11px] text-noir-600">
                        {item.quantity} {unit} × {formatPrice(product.price, language)}
                      </p>
                      {item.customNote && (
                        <span className="text-[10px] text-accent-gold font-mono">{item.customNote}</span>
                      )}
                    </div>
                  </div>

                  <span className="font-mono font-bold text-xs sm:text-sm text-noir-900 whitespace-nowrap">
                    {formatPrice(product.price * item.quantity, language)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment & Receipt Preview Banner */}
        <div className="p-5 rounded-2xl bg-brand-100/60 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-accent-gold" />
              <span className="font-bold text-xs text-noir-900 uppercase">
                {paymentMethod === 'instapay' ? t('instapayOption') : (paymentMethod === 'cod' ? t('codOption') : t('pickupPayOption'))}
              </span>
            </div>
            {paymentMethod === 'instapay' && instapayScreenshot && (
              <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} />
                <span>{t('screenshotAttachedNote')}</span>
              </p>
            )}
          </div>

          {paymentMethod === 'instapay' && instapayScreenshot && (
            <div className="flex items-center gap-2">
              <img
                src={instapayScreenshot}
                alt="Instapay Proof"
                className="w-14 h-14 rounded-xl object-cover border border-emerald-400 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Financial Breakdown */}
        <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-2.5 text-xs">
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
              {deliveryFee === 0 ? t('freeDelivery') : formatPrice(deliveryFee, language)}
            </span>
          </div>

          <div className="pt-3 border-t-2 border-brand-300 flex justify-between items-baseline">
            <span className="font-serif font-bold text-sm text-noir-900">{t('total')}</span>
            <span className="text-2xl font-serif font-bold text-accent-gold font-mono">
              {formatPrice(total, language)}
            </span>
          </div>
        </div>

        {/* WhatsApp Dispatch Action Zone */}
        <div className="space-y-4 pt-2">
          
          <button
            onClick={handleSendWhatsApp}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-3 animate-pulse-subtle"
          >
            <MessageSquare size={20} />
            <span>{t('sendToWhatsApp')}</span>
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleCopySummary}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-100 hover:bg-brand-200 border border-brand-300 text-xs font-bold text-noir-800 transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? (isAr ? 'تم نسخ الطلب!' : 'Copied!') : t('copySummary')}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(isAr ? 'بدء طلب جديد وتفريغ السلة الحالية؟' : 'Clear current cart and start a new order?')) {
                  clearCart();
                  navigateTo('catalog');
                }
              }}
              className="text-xs text-noir-500 hover:text-noir-900 flex items-center gap-1"
            >
              <RefreshCcw size={13} />
              <span>{t('startNewOrder')}</span>
            </button>
          </div>

          <p className="text-[11px] text-noir-500 text-center leading-relaxed">
            {t('whatsAppInstruction')}
          </p>

        </div>

      </div>
    </div>
  );
};
