import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PICKUP_LOCATIONS, INSTAPAY_CONFIG, formatPrice } from '../data/mockData';
import { 
  Truck, Store, MapPin, Clock, ArrowRight, ArrowLeft, CheckCircle2, 
  User, Home, CreditCard, Copy, Check, UploadCloud, X, Smartphone, ShieldCheck
} from 'lucide-react';

export const DeliveryPage = () => {
  const { 
    deliveryMethod, 
    setDeliveryMethod, 
    deliveryDetails, 
    setDeliveryDetails, 
    selectedPickupLocation, 
    setSelectedPickupLocation,
    paymentMethod,
    setPaymentMethod,
    instapayScreenshot,
    setInstapayScreenshot,
    transactionRef,
    setTransactionRef,
    navigateTo,
    language,
    showToast,
    total,
    t
  } = useShop();

  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyInstapay = () => {
    navigator.clipboard.writeText(INSTAPAY_CONFIG.walletNumber);
    setCopied(true);
    showToast(t('numberCopied'), 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast(isAr ? 'حجم الصورة كبير جداً (أقصى حد 5 ميجابايت)' : 'Image too large (max 5MB)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setInstapayScreenshot(reader.result);
      showToast(t('screenshotUploaded'), 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!deliveryDetails.name || !deliveryDetails.phone) {
      showToast(isAr ? 'برجاء إدخال الاسم ورقم الموبايل للتواصل' : 'Please provide recipient name and phone number', 'error');
      return;
    }
    navigateTo('summary');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-accent-gold">{isAr ? 'المرحلة الثانية: التوصيل والدفع' : 'Step 2: Delivery & Settlement'}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-noir-900 mt-1">{t('fulfillmentMethod')}</h1>
        </div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-bold uppercase tracking-wider text-noir-700 hover:text-accent-gold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('shoppingBag')}</span>
        </button>
      </div>

      {/* ── 1. TOGGLE SWITCH: DELIVERY VS STORE PICKUP ── */}
      <div className="grid grid-cols-2 p-1.5 bg-brand-100/70 rounded-2xl border border-brand-200 max-w-lg mx-auto shadow-sm">
        <button
          type="button"
          onClick={() => setDeliveryMethod('delivery')}
          className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            deliveryMethod === 'delivery'
              ? 'bg-noir-900 text-white shadow-md'
              : 'text-noir-700 hover:text-noir-950'
          }`}
        >
          <Truck className="w-4 h-4 text-accent-gold" />
          <span>{t('courierDelivery')}</span>
        </button>

        <button
          type="button"
          onClick={() => setDeliveryMethod('pickup')}
          className={`py-3 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            deliveryMethod === 'pickup'
              ? 'bg-noir-900 text-white shadow-md'
              : 'text-noir-700 hover:text-noir-950'
          }`}
        >
          <Store className="w-4 h-4 text-accent-gold" />
          <span>{t('storePickup')}</span>
        </button>
      </div>

      <form onSubmit={handleContinue} className="space-y-8">
        
        {/* ── 2. DESTINATION / CONTACT FORM ── */}
        {deliveryMethod === 'delivery' ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-50 border border-brand-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-200 pb-3">
              <MapPin size={18} className="text-accent-gold" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-noir-900">{t('deliveryDetails')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('customerName')} *</label>
                <input
                  type="text"
                  required
                  name="name"
                  value={deliveryDetails.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Ahmed Mahmoud"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('phoneContact')} *</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 01012345678"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs font-mono focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('streetAddress')} *</label>
                <input
                  type="text"
                  required
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                  placeholder="e.g. 15 El-Tahrir Street, Tower B, 4th Floor"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('cityDistrict')} *</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Dokki / New Cairo / Sheikh Zayed"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('courierNotes')}</label>
                <input
                  type="text"
                  name="notes"
                  value={deliveryDetails.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Elevator available, coordinate with contractor"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-300 bg-brand-50 text-xs focus:ring-2 focus:ring-accent-gold"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-3xl bg-brand-50 border border-brand-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-200 pb-3">
              <Store size={18} className="text-accent-gold" />
              <h2 className="font-serif text-base sm:text-lg font-bold text-noir-900">{t('pickupLocation')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PICKUP_LOCATIONS.map(loc => {
                const isSelected = selectedPickupLocation?.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedPickupLocation(loc)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-accent-gold/20 border-accent-gold shadow-md'
                        : 'bg-brand-100/40 border-brand-200 hover:bg-brand-100'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-xs text-noir-900">{isAr ? loc.nameAr : loc.name}</h4>
                        {isSelected && <CheckCircle2 size={16} className="text-accent-gold shrink-0" />}
                      </div>
                      <p className="text-[11px] text-noir-600 leading-relaxed">{isAr ? loc.addressAr : loc.address}</p>
                    </div>
                    <div className="pt-2 border-t border-brand-200/60 text-[10px] text-accent-gold font-bold">
                      {isAr ? loc.stockStatusAr : loc.stockStatus}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── 3. PAYMENT METHOD SELECTION (INSTAPAY / COD / PICKUP) ── */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-50 border border-brand-200 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-brand-200 pb-3">
            <CreditCard size={18} className="text-accent-gold" />
            <h2 className="font-serif text-base sm:text-lg font-bold text-noir-900">{t('paymentMethodTitle')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'instapay', title: t('instapayOption'), desc: t('instapayDesc'), icon: '📱' },
              { id: 'cod', title: t('codOption'), desc: t('codDesc'), icon: '💵' },
              { id: 'pickup', title: t('pickupPayOption'), desc: t('pickupPayDesc'), icon: '🏛️' },
            ].map(method => (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 flex flex-col justify-between ${
                  paymentMethod === method.id
                    ? 'bg-accent-gold/20 border-accent-gold shadow-md'
                    : 'bg-brand-100/30 border-brand-200 hover:bg-brand-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{method.icon}</span>
                    {paymentMethod === method.id && <CheckCircle2 size={16} className="text-accent-gold" />}
                  </div>
                  <h4 className="font-bold text-xs text-noir-900">{method.title}</h4>
                </div>
                <p className="text-[11px] text-noir-600 leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Instapay Transfer Details & Receipt Screenshot Upload Box ── */}
          {paymentMethod === 'instapay' && (
            <div className="p-5 rounded-2xl bg-brand-100/60 border border-accent-gold/40 space-y-5 animate-fade-in">
              
              {/* Instapay Wallet Number Card */}
              <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent-gold block">
                    {t('instapayNumberLabel')}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-noir-950 tracking-wider">
                      {INSTAPAY_CONFIG.walletNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyInstapay}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-gold text-noir-950 font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : t('copyNumber')}</span>
                    </button>
                  </div>
                  <p className="text-xs text-noir-600">
                    {isAr ? INSTAPAY_CONFIG.accountNameAr : INSTAPAY_CONFIG.accountName} • {INSTAPAY_CONFIG.bankName}
                  </p>
                </div>

                <div className="text-right rtl:text-left font-mono shrink-0">
                  <span className="text-[11px] text-noir-500 block uppercase">{isAr ? 'المبلغ المطلوب تحويله' : 'Amount to Transfer'}</span>
                  <span className="text-xl font-bold text-noir-900">{formatPrice(total, language)}</span>
                </div>
              </div>

              {/* Upload Screenshot Dropzone */}
              <div>
                <label className="block text-xs font-bold text-noir-800 mb-2">
                  {t('uploadScreenshotLabel')} *
                </label>

                {instapayScreenshot ? (
                  <div className="relative p-3 rounded-2xl bg-brand-50 border border-emerald-400 shadow-sm flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={instapayScreenshot}
                        alt="Instapay Receipt"
                        className="w-14 h-14 rounded-xl object-cover border border-brand-200 shadow-xs shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                          <CheckCircle2 size={14} />
                          <span>{t('screenshotUploaded')}</span>
                        </div>
                        <p className="text-[11px] text-noir-500 font-mono">
                          {isAr ? 'جاهزة للإرسال في ملخص الطلب' : 'Ready to attach to WhatsApp summary'}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setInstapayScreenshot(null)}
                      className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      title={t('removeScreenshot')}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-brand-300 hover:border-accent-gold rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-brand-50/70 hover:bg-brand-50 transition-all text-center">
                    <UploadCloud size={28} className="text-accent-gold" />
                    <span className="text-xs font-bold text-noir-800">{t('dragDropScreenshot')}</span>
                    <span className="text-[11px] text-noir-500 font-mono">JPG, PNG (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Optional Reference Number */}
              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('transactionRef')}</label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder={t('transactionRefPlaceholder')}
                  className="w-full px-4 py-2 rounded-xl border border-brand-300 bg-brand-50 text-xs font-mono focus:ring-2 focus:ring-accent-gold"
                />
              </div>

            </div>
          )}
        </div>

        {/* Continue Button */}
        <div className="flex items-center justify-between pt-4 border-t border-brand-200">
          <button
            type="button"
            onClick={() => navigateTo('cart')}
            className="px-5 py-3 rounded-2xl border border-brand-300 text-noir-800 hover:bg-brand-200 text-xs font-bold transition-colors"
          >
            ← {t('shoppingBag')}
          </button>

          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-accent-gold text-noir-950 text-xs font-bold uppercase tracking-widest shadow-xl hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <span>{t('proceedToSummary')}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </button>
        </div>

      </form>
    </div>
  );
};
