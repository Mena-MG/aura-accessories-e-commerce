import React, { useMemo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  MessageSquare, Copy, Check, Sparkles, ShoppingBag, 
  MapPin, Phone, User, Tag, Truck, Store, ArrowLeft, RefreshCcw, Settings 
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
    navigateTo, 
    showToast,
    clearCart,
    storePhoneNumber,
    setSettingsOpen
  } = useShop();

  const [copied, setCopied] = useState(false);
  const [orderId] = useState(() => `AUR-${Math.floor(10000 + Math.random() * 90000)}`);

  // Clean phone number for wa.me link (strip spaces/dashes if any)
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');

  // Generate formatted WhatsApp message text
  const formattedOrderText = useMemo(() => {
    const itemsList = cart.map(item => 
      `• ${item.quantity}x ${item.product.name} ($${item.product.price.toFixed(2)} ea)`
    ).join('\n');

    const fulfillmentText = deliveryMethod === 'delivery' 
      ? `🚚 *METHOD:* Courier Delivery\n📍 *Address:* ${deliveryDetails.address}, ${deliveryDetails.city}\n📝 *Notes:* ${deliveryDetails.notes || 'None'}`
      : `🏪 *METHOD:* Boutique Store Pickup\n📍 *Store:* ${selectedPickupLocation.name}\n📍 *Address:* ${selectedPickupLocation.address}`;

    const discountText = appliedCoupon 
      ? `\n🏷️ *Discount (${appliedCoupon.code}):* -$${discountAmount.toFixed(2)}`
      : '';

    const deliveryFeeText = deliveryFee > 0 ? `\n🚚 *Delivery Fee:* $${deliveryFee.toFixed(2)}` : '';

    return `🛍️ *NEW ORDER FROM AURA & CO. WEBSITE*
----------------------------------------
📋 *Order ID:* #${orderId}
👤 *Customer:* ${deliveryDetails.name || 'Valued Customer'}
📞 *Phone:* ${deliveryDetails.phone || 'N/A'}

${fulfillmentText}

----------------------------------------
🛒 *ORDER ITEMS:*
${itemsList}

----------------------------------------
💵 *Subtotal:* $${subtotal.toFixed(2)}${discountText}${deliveryFeeText}
✨ *TOTAL DUE:* $${total.toFixed(2)}
----------------------------------------
Thank you! Please confirm item availability and pickup/delivery window.`;
  }, [cart, orderId, deliveryDetails, deliveryMethod, selectedPickupLocation, subtotal, appliedCoupon, discountAmount, deliveryFee, total]);

  // Encoded URL for WhatsApp using storePhoneNumber
  const whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(formattedOrderText)}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(formattedOrderText);
    setCopied(true);
    showToast('Order summary text copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner Notice */}
      <div className="bg-brand-50 border border-brand-200/80 p-6 rounded-3xl text-center space-y-3 shadow-soft">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Final Step — Direct WhatsApp Checkout</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-noir-900">
          Your Order is Ready to Send!
        </h1>
        <p className="text-xs sm:text-sm text-noir-800/70 max-w-xl mx-auto font-light">
          No payment info required on site. Clicking <strong>"Send via WhatsApp"</strong> transmits this order directly to recipient phone <code className="bg-white px-2 py-0.5 rounded border border-brand-200 font-mono font-bold text-brand-900">{storePhoneNumber}</code>.
        </p>

        {/* Change Phone Trigger */}
        <div className="pt-1">
          <button
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs text-brand-700 hover:text-noir-900 font-semibold hover:underline"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Change target WhatsApp phone number ({storePhoneNumber})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full Order Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-brand-200/60 shadow-soft space-y-6">
            <div className="flex justify-between items-center border-b border-brand-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 block">Order Reference</span>
                <span className="font-mono font-bold text-lg text-noir-900">#{orderId}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Pending Send
              </span>
            </div>

            {/* Items Recap */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-noir-900">Items Ordered</h3>
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-xl border border-brand-100" />
                    <div>
                      <span className="font-semibold text-noir-900 block">{product.name}</span>
                      <span className="text-zinc-400">Qty: {quantity} × ${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <span className="font-bold text-noir-900">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Customer & Fulfillment Recap */}
            <div className="pt-4 border-t border-brand-100 space-y-3 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-noir-900">Fulfillment Details</h3>
              <div className="p-4 bg-brand-50/70 rounded-2xl space-y-2 border border-brand-100">
                <div className="flex items-center gap-2 text-noir-900 font-semibold">
                  <User className="w-4 h-4 text-brand-600" />
                  <span>{deliveryDetails.name} ({deliveryDetails.phone})</span>
                </div>

                {deliveryMethod === 'delivery' ? (
                  <div className="flex items-start gap-2 text-zinc-600">
                    <Truck className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-noir-900">Courier Delivery:</strong> {deliveryDetails.address}, {deliveryDetails.city}
                      {deliveryDetails.notes && <p className="italic text-[11px] text-zinc-500 mt-0.5">"{deliveryDetails.notes}"</p>}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-zinc-600">
                    <Store className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-noir-900">Store Pickup:</strong> {selectedPickupLocation.name}
                      <p className="text-[11px] text-zinc-500">{selectedPickupLocation.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Financial Recap */}
            <div className="pt-4 border-t border-brand-100 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Subtotal</span>
                <span className="font-semibold text-noir-900">${subtotal.toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {deliveryFee > 0 && (
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-noir-900">${deliveryFee.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-brand-100 flex justify-between items-baseline">
                <span className="font-serif text-xl font-bold text-noir-900">Total Payable</span>
                <span className="text-2xl font-bold text-noir-900">${total.toFixed(2)}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Generated Text Box & Primary WhatsApp Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-noir-900 text-white p-6 rounded-3xl shadow-floating space-y-4 border border-noir-800">
            <div className="flex items-center justify-between border-b border-noir-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                Generated WhatsApp Text
              </span>
              <button
                onClick={handleCopySummary}
                className="text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>

            {/* Generated Order Text Block */}
            <div className="bg-noir-950 p-4 rounded-2xl border border-noir-800 text-[11px] font-mono leading-relaxed text-zinc-300 whitespace-pre-wrap select-all max-h-80 overflow-y-auto">
              {formattedOrderText}
            </div>

            {/* Primary Action Button: Send via WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => showToast(`Opening WhatsApp to send to ${storePhoneNumber}...`, 'success')}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-luxe flex items-center justify-center gap-2 group"
            >
              <MessageSquare className="w-5 h-5 text-white" />
              <span>Send to WhatsApp ({storePhoneNumber})</span>
            </a>

            {/* Secondary Action: Copy Order Summary */}
            <button
              onClick={handleCopySummary}
              className="w-full py-3 bg-noir-800 hover:bg-noir-700 text-zinc-200 border border-noir-700 font-semibold text-xs uppercase tracking-wider rounded-full transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-brand-400" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Order Summary'}</span>
            </button>
          </div>

          {/* Navigation Back */}
          <div className="flex justify-between items-center text-xs">
            <button
              onClick={() => navigateTo('delivery')}
              className="text-zinc-500 hover:text-noir-900 transition-colors flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Delivery Info</span>
            </button>

            <button
              onClick={() => {
                clearCart();
                navigateTo('home');
                showToast('Order complete! Thank you for shopping.', 'success');
              }}
              className="text-brand-700 hover:text-brand-900 font-bold transition-colors flex items-center gap-1"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Start New Order</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
