import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Settings, Phone, Globe, MessageSquare } from 'lucide-react';

export const SettingsModal = () => {
  const { settingsOpen, setSettingsOpen, storePhoneNumber, setStorePhoneNumber, language, setLanguage, t } = useShop();
  const [phoneInput, setPhoneInput] = useState(storePhoneNumber);

  if (!settingsOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const cleaned = phoneInput.trim();
    if (!cleaned) return;
    setStorePhoneNumber(cleaned);
    setSettingsOpen(false);
  };

  const presetNumbers = [
    { label: 'Cairo Store (+20)', number: '+201005550192' },
    { label: 'International Format (+1 800)', number: '+18005550199' },
    { label: 'UK Test (+44)', number: '+447700900077' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-noir-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl border border-brand-200 shadow-floating overflow-hidden space-y-6">
        
        {/* Modal Header */}
        <div className="bg-noir-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium">{t('boutiqueSettings')}</h3>
              <p className="text-[11px] text-zinc-400">Language & WhatsApp Configuration</p>
            </div>
          </div>

          <button
            onClick={() => setSettingsOpen(false)}
            className="p-1.5 rounded-full hover:bg-noir-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-6 pt-0 space-y-5">
          
          {/* Language Selection Option */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand-600" />
              {t('languageSelect')}
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  language === 'en'
                    ? 'bg-noir-900 text-white border-noir-900 shadow-sm'
                    : 'bg-brand-50 text-noir-800 border-brand-200 hover:bg-brand-100'
                }`}
              >
                <span>🇬🇧 English</span>
              </button>

              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  language === 'ar'
                    ? 'bg-noir-900 text-white border-noir-900 shadow-sm'
                    : 'bg-brand-50 text-noir-800 border-brand-200 hover:bg-brand-100'
                }`}
              >
                <span>🇪🇬 العربية (RTL)</span>
              </button>
            </div>
          </div>

          {/* Store Phone Option */}
          <div className="space-y-2 pt-3 border-t border-brand-100">
            <label htmlFor="store-phone-input" className="text-xs font-bold uppercase tracking-wider text-noir-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              {t('storePhone')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 rtl:right-3.5 rtl:left-auto" />
              <input
                id="store-phone-input"
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+201005550192"
                className="w-full text-xs font-mono bg-brand-50 border border-brand-200 rounded-xl pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-2 pt-2 border-t border-brand-100">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block">Quick Presets</span>
            <div className="space-y-1.5">
              {presetNumbers.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhoneInput(preset.number)}
                  className="w-full text-left rtl:text-right p-2.5 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-100 text-xs flex items-center justify-between transition-colors"
                >
                  <span className="text-noir-800 font-medium">{preset.label}</span>
                  <code className="text-[11px] font-mono text-brand-700">{preset.number}</code>
                </button>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-brand-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-zinc-600 hover:text-noir-900"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-noir-900 hover:bg-brand-600 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              {t('saveSettings')}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
