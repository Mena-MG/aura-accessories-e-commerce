import React from 'react';
import { useShop } from '../context/ShopContext';
import { PICKUP_LOCATIONS } from '../data/mockData';
import { Truck, Store, MapPin, Clock, ArrowRight, ArrowLeft, CheckCircle2, User, Home } from 'lucide-react';

export const DeliveryPage = () => {
  const { 
    deliveryMethod, 
    setDeliveryMethod, 
    deliveryDetails, 
    setDeliveryDetails, 
    selectedPickupLocation, 
    setSelectedPickupLocation,
    navigateTo,
    t
  } = useShop();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    navigateTo('summary');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between border-b border-brand-200/60 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">{t('checkoutStep2')}</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-noir-900 mt-1">{t('fulfillmentMethod')}</h1>
        </div>
        <button
          onClick={() => navigateTo('cart')}
          className="text-xs font-bold uppercase tracking-wider text-brand-700 hover:text-noir-900 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('shoppingBag')}</span>
        </button>
      </div>

      {/* TOGGLE SWITCH: DELIVERY VS STORE PICKUP */}
      <div className="grid grid-cols-2 p-1.5 bg-brand-100/70 rounded-2xl border border-brand-200 max-w-lg mx-auto">
        <button
          onClick={() => setDeliveryMethod('delivery')}
          className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            deliveryMethod === 'delivery'
              ? 'bg-noir-900 text-white shadow-md'
              : 'text-noir-800 hover:text-brand-600'
          }`}
        >
          <Truck className="w-4 h-4 text-brand-500" />
          <span>{t('courierDelivery')}</span>
        </button>

        <button
          onClick={() => setDeliveryMethod('pickup')}
          className={`py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
            deliveryMethod === 'pickup'
              ? 'bg-noir-900 text-white shadow-md'
              : 'text-noir-800 hover:text-brand-600'
          }`}
        >
          <Store className="w-4 h-4 text-brand-500" />
          <span>{t('boutiquePickup')}</span>
        </button>
      </div>

      {/* TAB 1: COURIER DELIVERY ADDRESS FORM */}
      {deliveryMethod === 'delivery' && (
        <form onSubmit={handleContinue} className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-200/60 shadow-soft space-y-6 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-brand-100 pb-4">
            <Home className="w-5 h-5 text-brand-600" />
            <h2 className="font-serif text-xl font-medium text-noir-900">{t('enterShippingAddress')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="delivery-name" className="text-xs font-bold uppercase tracking-wider text-noir-900">{t('fullName')}</label>
              <input
                id="delivery-name"
                type="text"
                name="name"
                required
                value={deliveryDetails.name}
                onChange={handleInputChange}
                placeholder="e.g. Mariam Hassan"
                className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label htmlFor="delivery-phone" className="text-xs font-bold uppercase tracking-wider text-noir-900">{t('phoneNumber')}</label>
              <input
                id="delivery-phone"
                type="tel"
                name="phone"
                required
                value={deliveryDetails.phone}
                onChange={handleInputChange}
                placeholder="e.g. +20 100 234 5678"
                className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Street Address */}
            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="delivery-address" className="text-xs font-bold uppercase tracking-wider text-noir-900">{t('streetAddress')}</label>
              <input
                id="delivery-address"
                type="text"
                name="address"
                required
                value={deliveryDetails.address}
                onChange={handleInputChange}
                placeholder="e.g. 15 El-Bostan Street"
                className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* City / Region */}
            <div className="space-y-1.5">
              <label htmlFor="delivery-city" className="text-xs font-bold uppercase tracking-wider text-noir-900">{t('cityPostal')}</label>
              <input
                id="delivery-city"
                type="text"
                name="city"
                required
                value={deliveryDetails.city}
                onChange={handleInputChange}
                placeholder="e.g. Heliopolis, Cairo"
                className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Courier Notes */}
            <div className="space-y-1.5">
              <label htmlFor="delivery-notes" className="text-xs font-bold uppercase tracking-wider text-noir-900">{t('specialInstructions')}</label>
              <input
                id="delivery-notes"
                type="text"
                name="notes"
                value={deliveryDetails.notes}
                onChange={handleInputChange}
                placeholder="e.g. Call upon arrival"
                className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-brand-100 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-luxe flex items-center justify-center gap-2"
            >
              <span>{t('continueToRecap')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: STORE PICKUP LOCATION SELECTION CARDS */}
      {deliveryMethod === 'pickup' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-white p-6 rounded-3xl border border-brand-200/60 shadow-soft space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-100 pb-3">
              <Store className="w-5 h-5 text-brand-600" />
              <h2 className="font-serif text-xl font-medium text-noir-900">{t('selectBoutique')}</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {PICKUP_LOCATIONS.map((loc) => {
                const isSelected = selectedPickupLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedPickupLocation(loc)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 shadow-md'
                        : 'border-brand-100 bg-white hover:border-brand-300'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-semibold text-noir-900">{loc.name}</span>
                        {isSelected && (
                          <span className="bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {t('selected')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-noir-800/80">
                        <MapPin className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>{loc.address}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <Clock className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
                        <span>{loc.hours}</span>
                      </div>

                      <div className="text-[11px] font-semibold text-emerald-700 pt-1">
                        ✨ {loc.stockStatus}
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-brand-500 text-white'
                          : 'bg-brand-100 text-noir-900 hover:bg-brand-200'
                      }`}
                    >
                      {isSelected ? t('selected') : t('chooseStore')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Details for Pickup */}
          <div className="bg-white p-6 rounded-3xl border border-brand-200/60 shadow-soft space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              {t('pickupContactInfo')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="pickup-name" className="text-[11px] font-semibold text-zinc-500">{t('fullName')}</label>
                <input
                  id="pickup-name"
                  type="text"
                  name="name"
                  value={deliveryDetails.name}
                  onChange={handleInputChange}
                  placeholder="Mariam Hassan"
                  className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-3.5 py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="pickup-phone" className="text-[11px] font-semibold text-zinc-500">{t('phoneNumber')}</label>
                <input
                  id="pickup-phone"
                  type="tel"
                  name="phone"
                  value={deliveryDetails.phone}
                  onChange={handleInputChange}
                  placeholder="+20 100 234 5678"
                  className="w-full text-xs bg-brand-50 border border-brand-200 rounded-xl px-3.5 py-2.5"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigateTo('summary')}
              className="w-full sm:w-auto px-8 py-4 bg-noir-900 hover:bg-brand-600 text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-luxe flex items-center justify-center gap-2"
            >
              <span>{t('continueToRecap')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
