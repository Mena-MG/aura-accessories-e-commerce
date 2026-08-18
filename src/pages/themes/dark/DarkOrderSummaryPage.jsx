import React, { useMemo, useState } from 'react';
import { useShop } from '../../../context/ShopContext';
import { formatPrice } from '../../../data/mockData';
import { MessageSquare, Copy, Check, Sparkles, User, Truck, Store, ArrowLeft, RefreshCcw, Settings } from 'lucide-react';

const D = {
  bg: '#0D0C0B', card: '#181614', cardBorder: 'rgba(197,160,89,0.15)',
  text: '#F4EFEA', muted: '#A89F91', accent: '#E6C280',
  accentBg: 'rgba(197,160,89,0.12)', border: 'rgba(197,160,89,0.2)',
  deep: '#111009',
};

export const DarkOrderSummaryPage = () => {
  const { cart, subtotal, appliedCoupon, discountAmount, deliveryMethod, deliveryDetails, selectedPickupLocation, deliveryFee, total, navigateTo, showToast, clearCart, storePhoneNumber, setSettingsOpen, t } = useShop();
  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => `AUR-${Math.floor(10000 + Math.random() * 90000)}`);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');

  const formattedOrderText = useMemo(() => {
    const itemsList = cart.map(item => `â€¢ ${item.quantity}x ${item.product.name} (${formatPrice(item.product.price)} ea)`).join('\n');
    const fulfillmentText = deliveryMethod === 'delivery'
      ? `ًںڑڑ *METHOD:* Courier Delivery\nًں“چ *Address:* ${deliveryDetails.address}, ${deliveryDetails.city}\nًں“‌ *Notes:* ${deliveryDetails.notes || 'None'}`
      : `ًںڈھ *METHOD:* Boutique Store Pickup\nًں“چ *Store:* ${selectedPickupLocation.name}\nًں“چ *Address:* ${selectedPickupLocation.address}`;
    const discountText = appliedCoupon ? `\nًںڈ·ï¸ڈ *Discount (${appliedCoupon.code}):* -${formatPrice(discountAmount)}` : '';
    const deliveryFeeText = deliveryFee > 0 ? `\nًںڑڑ *Delivery Fee:* ${formatPrice(deliveryFee)}` : `\nًںڑڑ *Delivery Fee:* FREE`;
    return `ًں›چï¸ڈ *NEW ORDER FROM AURA & CO. WEBSITE*\n----------------------------------------\nًں“‹ *Order ID:* #${orderId}\nًں‘¤ *Customer:* ${deliveryDetails.name || 'Valued Customer'}\nًں“‍ *Phone:* ${deliveryDetails.phone || 'N/A'}\n\n${fulfillmentText}\n\n----------------------------------------\nًں›’ *ORDER ITEMS:*\n${itemsList}\n\n----------------------------------------\nًں’µ *Subtotal:* ${formatPrice(subtotal)}${discountText}${deliveryFeeText}\nâœ¨ *TOTAL DUE:* ${formatPrice(total)}\n----------------------------------------\nThank you! Please confirm availability and delivery window.`;
  }, [cart, orderId, deliveryDetails, deliveryMethod, selectedPickupLocation, subtotal, appliedCoupon, discountAmount, deliveryFee, total]);

  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(formattedOrderText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedOrderText);
    setCopied(true);
    showToast('Order copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl text-center space-y-3" style={{ background: D.card, border: `1px solid ${D.cardBorder}`, boxShadow: '0 0 60px rgba(197,160,89,0.06)' }}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
          <Sparkles className="w-3.5 h-3.5" /> <span>{t('finalStep')}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light" style={{ color: D.text }}>{t('orderReady')}</h1>
        <p className="text-xs sm:text-sm max-w-xl mx-auto font-light" style={{ color: D.muted }}>
          {t('noPaymentNotice')} <code className="px-2 py-0.5 rounded font-mono font-bold" style={{ background: D.accentBg, color: D.accent, border: `1px solid ${D.cardBorder}` }}>{storePhoneNumber}</code>.
        </p>
        <button onClick={() => setSettingsOpen(true)} className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-70 transition-opacity" style={{ color: D.accent }}>
          <Settings className="w-3.5 h-3.5" /> <span>{t('changePhone')} ({storePhoneNumber})</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Order Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl space-y-6" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
            <div className="flex justify-between items-center pb-4" style={{ borderBottom: `1px solid ${D.border}` }}>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: D.accent }}>{t('orderRef')}</span>
                <span className="font-mono font-bold text-lg" style={{ color: D.text }}>#{orderId}</span>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399' }}>{t('pendingSend')}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('itemsOrdered')}</h3>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl" style={{ border: `1px solid ${D.cardBorder}` }} />
                    <div>
                      <span className="font-semibold block" style={{ color: D.text }}>{product.name}</span>
                      <span style={{ color: D.muted }}>Qty: {quantity} أ— {formatPrice(product.price)}</span>
                    </div>
                  </div>
                  <span className="font-bold" style={{ color: D.accent }}>{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3 text-xs" style={{ borderTop: `1px solid ${D.border}` }}>
              <h3 className="font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('fulfillmentDetails')}</h3>
              <div className="p-4 rounded-2xl space-y-2" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}` }}>
                <div className="flex items-center gap-2 font-semibold" style={{ color: D.text }}>
                  <User className="w-4 h-4" style={{ color: D.accent }} /> {deliveryDetails.name} ({deliveryDetails.phone})
                </div>
                {deliveryMethod === 'delivery' ? (
                  <div className="flex items-start gap-2" style={{ color: D.muted }}>
                    <Truck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: D.accent }} />
                    <div><strong style={{ color: D.text }}>Courier:</strong> {deliveryDetails.address}, {deliveryDetails.city}</div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2" style={{ color: D.muted }}>
                    <Store className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: D.accent }} />
                    <div><strong style={{ color: D.text }}>Store Pickup:</strong> {selectedPickupLocation.name}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 space-y-2 text-xs" style={{ borderTop: `1px solid ${D.border}` }}>
              <div className="flex justify-between" style={{ color: D.muted }}><span>Subtotal</span><span className="font-semibold" style={{ color: D.text }}>{formatPrice(subtotal)}</span></div>
              {appliedCoupon && <div className="flex justify-between font-semibold" style={{ color: '#34D399' }}><span>Discount ({appliedCoupon.code})</span><span>-{formatPrice(discountAmount)}</span></div>}
              <div className="flex justify-between" style={{ color: deliveryFee > 0 ? D.muted : '#34D399' }}><span>Delivery Fee</span><span className="font-semibold" style={{ color: deliveryFee > 0 ? D.text : '#34D399' }}>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'FREE'}</span></div>
              <div className="pt-3 flex justify-between items-baseline" style={{ borderTop: `1px solid ${D.border}` }}>
                <span className="font-serif text-xl font-bold" style={{ color: D.text }}>{t('totalPayable')}</span>
                <span className="text-2xl font-bold" style={{ color: D.accent }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl space-y-4" style={{ background: '#0A0908', border: `1px solid ${D.cardBorder}`, boxShadow: '0 0 40px rgba(197,160,89,0.08)' }}>
            <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${D.border}` }}>
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: D.accent }}>
                <MessageSquare className="w-4 h-4" /> {t('generatedWhatsAppText')}
              </span>
              <button onClick={handleCopy} className="text-[11px] font-semibold flex items-center gap-1" style={{ color: D.muted }}>
                {copied ? <Check className="w-3.5 h-3.5" style={{ color: '#34D399' }} /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 rounded-2xl text-[11px] font-mono leading-relaxed whitespace-pre-wrap select-all max-h-80 overflow-y-auto" style={{ background: '#050504', border: `1px solid ${D.cardBorder}`, color: '#A89F91' }}>
              {formattedOrderText}
            </div>

            <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => showToast(`Opening WhatsApp to ${storePhoneNumber}...`, 'success')} className="w-full py-4 font-bold text-xs uppercase tracking-wider sm:tracking-widest rounded-full transition-all flex items-center justify-center gap-2" style={{ background: '#15803d', color: '#fff' }}>
              <MessageSquare className="w-5 h-5" /> <span>{t('sendToWhatsApp')} ({storePhoneNumber})</span>
            </a>

            <button onClick={handleCopy} className="w-full py-3 font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-colors" style={{ background: D.accentBg, border: `1px solid ${D.cardBorder}`, color: D.accent }}>
              {copied ? <Check className="w-4 h-4" style={{ color: '#34D399' }} /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('copied') : t('copyOrderSummary')}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between items-center text-xs">
            <button onClick={() => navigateTo('delivery')} className="flex items-center gap-1 font-semibold transition-opacity hover:opacity-70" style={{ color: D.muted }}>
              <ArrowLeft className="w-3.5 h-3.5" /> <span>{t('editDeliveryInfo')}</span>
            </button>
            <button onClick={() => { clearCart(); navigateTo('home'); showToast('Order complete! Thank you!', 'success'); }} className="font-bold flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color: D.accent }}>
              <RefreshCcw className="w-3.5 h-3.5" /> <span>{t('startNewOrder')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
