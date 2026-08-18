import React from 'react';
import { useShop } from '../../../context/ShopContext';
import { PICKUP_LOCATIONS } from '../../../data/mockData';
import { Truck, Store, MapPin, Clock, ArrowRight, ArrowLeft, CheckCircle2, User, Home } from 'lucide-react';

const D = {
  bg: '#0D0C0B', card: '#181614', cardBorder: 'rgba(197,160,89,0.15)',
  text: '#F4EFEA', muted: '#A89F91', accent: '#E6C280',
  accentBg: 'rgba(197,160,89,0.12)', border: 'rgba(197,160,89,0.2)',
  input: '#111009',
};

const inputStyle = { background: D.input, border: `1px solid ${D.cardBorder}`, color: D.text };

export const DarkDeliveryPage = () => {
  const { deliveryMethod, setDeliveryMethod, deliveryDetails, setDeliveryDetails, selectedPickupLocation, setSelectedPickupLocation, navigateTo, t } = useShop();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between pb-6" style={{ borderBottom: `1px solid ${D.border}` }}>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: D.accent }}>{t('checkoutStep2')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light mt-1" style={{ color: D.text }}>{t('fulfillmentMethod')}</h1>
        </div>
        <button onClick={() => navigateTo('cart')} className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-opacity hover:opacity-70" style={{ color: D.accent }}>
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> <span>{t('shoppingBag')}</span>
        </button>
      </div>

      {/* Method Toggle */}
      <div className="grid grid-cols-2 p-1.5 rounded-2xl max-w-lg mx-auto" style={{ background: '#111009', border: `1px solid ${D.cardBorder}` }}>
        {[['delivery', t('courierDelivery'), Truck], ['pickup', t('boutiquePickup'), Store]].map(([method, label, Icon]) => (
          <button key={method} onClick={() => setDeliveryMethod(method)} className="py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2" style={deliveryMethod === method ? { background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' } : { color: D.muted }}>
            <Icon className="w-4 h-4" /> <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Delivery Form */}
      {deliveryMethod === 'delivery' && (
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('summary'); }} className="p-6 sm:p-8 rounded-3xl space-y-6 animate-fade-in" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
          <div className="flex items-center gap-2 pb-4" style={{ borderBottom: `1px solid ${D.border}` }}>
            <Home className="w-5 h-5" style={{ color: D.accent }} />
            <h2 className="font-serif text-xl font-medium" style={{ color: D.text }}>{t('enterShippingAddress')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { id: 'name', name: 'name', label: t('fullName'), placeholder: 'e.g. Mariam Hassan', type: 'text', required: true },
              { id: 'phone', name: 'phone', label: t('phoneNumber'), placeholder: 'e.g. +20 100 234 5678', type: 'tel', required: true },
            ].map(({ id, name, label, placeholder, type, required }) => (
              <div key={id} className="space-y-1.5">
                <label htmlFor={`dark-${id}`} className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{label}</label>
                <input id={`dark-${id}`} type={type} name={name} required={required} value={deliveryDetails[name]} onChange={handleInputChange} placeholder={placeholder} className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
              </div>
            ))}
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="dark-address" className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{t('streetAddress')}</label>
              <input id="dark-address" type="text" name="address" required value={deliveryDetails.address} onChange={handleInputChange} placeholder="e.g. 15 El-Bostan Street" className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
            </div>
            {[
              { id: 'city', name: 'city', label: t('cityPostal'), placeholder: 'e.g. Heliopolis, Cairo', required: true },
              { id: 'notes', name: 'notes', label: t('specialInstructions'), placeholder: 'e.g. Call upon arrival', required: false },
            ].map(({ id, name, label, placeholder, required }) => (
              <div key={id} className="space-y-1.5">
                <label htmlFor={`dark-${id}`} className="text-xs font-bold uppercase tracking-wider" style={{ color: D.text }}>{label}</label>
                <input id={`dark-${id}`} type="text" name={name} required={required} value={deliveryDetails[name]} onChange={handleInputChange} placeholder={placeholder} className="w-full text-xs rounded-xl px-4 py-3 focus:outline-none" style={inputStyle} />
              </div>
            ))}
          </div>
          <div className="pt-4 flex justify-end" style={{ borderTop: `1px solid ${D.border}` }}>
            <button type="submit" className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
              <span>{t('continueToRecap')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </form>
      )}

      {/* Pickup */}
      {deliveryMethod === 'pickup' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 rounded-3xl space-y-4" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
            <div className="flex items-center gap-2 pb-3" style={{ borderBottom: `1px solid ${D.border}` }}>
              <Store className="w-5 h-5" style={{ color: D.accent }} />
              <h2 className="font-serif text-xl font-medium" style={{ color: D.text }}>{t('selectBoutique')}</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-2">
              {PICKUP_LOCATIONS.map((loc) => {
                const isSelected = selectedPickupLocation.id === loc.id;
                return (
                  <div key={loc.id} onClick={() => setSelectedPickupLocation(loc)} className="p-5 rounded-2xl cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all" style={{ border: `2px solid ${isSelected ? D.accent : D.cardBorder}`, background: isSelected ? D.accentBg : D.input }}>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-semibold" style={{ color: D.text }}>{loc.name}</span>
                        {isSelected && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: D.accent, color: '#0D0C0B' }}><CheckCircle2 className="w-3 h-3" /> {t('selected')}</span>}
                      </div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: D.muted }}><MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: D.accent }} /><span>{loc.address}</span></div>
                      <div className="flex items-center gap-2 text-xs" style={{ color: D.muted }}><Clock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: D.accent }} /><span>{loc.hours}</span></div>
                      <div className="text-[11px] font-semibold" style={{ color: '#34D399' }}>âœ¨ {loc.stockStatus}</div>
                    </div>
                    <button type="button" className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider" style={isSelected ? { background: D.accent, color: '#0D0C0B' } : { background: D.accentBg, color: D.accent }}>
                      {isSelected ? t('selected') : t('chooseStore')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 rounded-3xl space-y-4" style={{ background: D.card, border: `1px solid ${D.cardBorder}` }}>
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: D.text }}>
              <User className="w-4 h-4" style={{ color: D.accent }} /> {t('pickupContactInfo')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ id: 'pickup-name', name: 'name', label: t('fullName'), ph: 'Mariam Hassan' }, { id: 'pickup-phone', name: 'phone', label: t('phoneNumber'), ph: '+20 100 234 5678' }].map(({ id, name, label, ph }) => (
                <div key={id} className="space-y-1">
                  <label htmlFor={`dark-${id}`} className="text-[11px] font-semibold" style={{ color: D.muted }}>{label}</label>
                  <input id={`dark-${id}`} type="text" name={name} value={deliveryDetails[name]} onChange={handleInputChange} placeholder={ph} className="w-full text-xs rounded-xl px-3.5 py-2.5 focus:outline-none" style={inputStyle} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button onClick={() => navigateTo('summary')} className="w-full sm:w-auto px-8 py-4 font-medium text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #C5A059, #E6C280)', color: '#0D0C0B' }}>
              <span>{t('continueToRecap')}</span> <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
