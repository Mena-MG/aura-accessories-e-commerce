import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShieldCheck, Truck, MessageSquare } from 'lucide-react';
import { STORE_PHONE_NUMBER } from '../data/mockData';

export const Footer = () => {
  const { navigateTo, t, storePhoneNumber } = useShop();

  return (
    <footer className="bg-noir-900 text-brand-100 border-t border-noir-800 mt-20">
      {/* Ethos / Value Props Bar */}
      <div className="border-b border-noir-800/80 bg-noir-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('artisanQuality')}</h4>
              <p className="text-[11px] text-zinc-400">{t('artisanDesc')}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-brand-500" />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('expressCourier')}</h4>
              <p className="text-[11px] text-zinc-400">{t('expressDesc')}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MessageSquare className="w-5 h-5 text-brand-500" />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('directWhatsApp')}</h4>
              <p className="text-[11px] text-zinc-400">{t('directDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <span className="font-serif text-2xl font-semibold tracking-wider text-white">
            AURA <span className="text-brand-500 font-light">&</span> CO.
          </span>
          <p className="text-xs text-zinc-400 font-light leading-relaxed">
            {t('heroDesc')}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">IG</span>
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">FB</span>
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">PIN</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">{t('curatedCategories')}</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('charms')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('bracelets')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('necklaces')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('lanyards')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('watches')}</button></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">{t('delivery')}</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li><button onClick={() => navigateTo('delivery')} className="hover:text-white transition-colors">{t('delivery')}</button></li>
            <li><button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">WELCOME10 (10% OFF)</button></li>
            <li><a href={`https://wa.me/${storePhoneNumber.replace(/[^0-9+]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Concierge ({storePhoneNumber})</a></li>
          </ul>
        </div>

        {/* Col 4: Store Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">Zamalek Boutique</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong>Mon – Sat:</strong> 10:00 AM – 10:00 PM<br />
            <strong>Sunday:</strong> 12:00 PM – 8:00 PM<br />
            <strong>Location:</strong> 26 26th of July St, Zamalek, Cairo
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-noir-800 py-6 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} AURA STUDIOS. {t('allRightsReserved')}</p>
      </div>
    </footer>
  );
};
