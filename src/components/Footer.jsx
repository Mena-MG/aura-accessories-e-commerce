import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShieldCheck, Truck, MessageSquare } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, t, storePhoneNumber, theme } = useShop();

  const getFooterStyles = () => {
    switch (theme) {
      case 'dark-glamour':
        return {
          wrapper: "bg-[#0D0C0B] text-[#F4EFEA] border-t border-[#E6C280]/20 mt-20",
          topBar: "border-b border-[#E6C280]/15 bg-[#181614] py-8",
          iconColor: "text-[#E6C280]",
          titleColor: "text-[#E6C280]",
          textColor: "text-[#A89F91]",
          socialBadge: "bg-[#181614] text-[#E6C280] border border-[#E6C280]/20",
          bottomBar: "border-t border-[#E6C280]/15 text-[#A89F91]",
        };
      case 'rose-blush':
        return {
          wrapper: "bg-[#36121D] text-[#FDF6F6] border-t border-[#D4889B]/30 mt-20",
          topBar: "border-b border-[#D4889B]/20 bg-[#260A14] py-8",
          iconColor: "text-[#D4889B]",
          titleColor: "text-[#D4889B]",
          textColor: "text-[#E8C5CE]",
          socialBadge: "bg-[#260A14] text-[#D4889B] border border-[#D4889B]/20",
          bottomBar: "border-t border-[#D4889B]/20 text-[#E8C5CE]",
        };
      case 'ocean-coastal':
        return {
          wrapper: "bg-[#0B2545] text-[#EDF5F9] border-t border-[#00A896]/30 mt-20",
          topBar: "border-b border-[#00A896]/20 bg-[#06172E] py-8",
          iconColor: "text-[#00A896]",
          titleColor: "text-[#00A896]",
          textColor: "text-[#8CA8BE]",
          socialBadge: "bg-[#06172E] text-[#00A896] border border-[#00A896]/20",
          bottomBar: "border-t border-[#00A896]/20 text-[#8CA8BE]",
        };
      case 'artisanal-heritage':
        return {
          wrapper: "bg-[#2A2421] text-[#F7F4EE] border-t-2 border-[#C85A32] mt-20 font-mono",
          topBar: "border-b border-[#C85A32]/30 bg-[#1E1917] py-8",
          iconColor: "text-[#C85A32]",
          titleColor: "text-[#C85A32]",
          textColor: "text-[#B8ACA3]",
          socialBadge: "bg-[#1E1917] text-[#C85A32] border border-[#C85A32]/30",
          bottomBar: "border-t border-[#C85A32]/30 text-[#B8ACA3]",
        };
      case 'cyber-luxe':
        return {
          wrapper: "bg-[#060709] text-[#E2E8F0] border-t border-[#00F0FF]/30 mt-20 shadow-[0_-10px_30px_rgba(0,240,255,0.08)]",
          topBar: "border-b border-[#00F0FF]/20 bg-[#0D0F14] py-8",
          iconColor: "text-[#00F0FF]",
          titleColor: "text-[#00F0FF]",
          textColor: "text-[#94A3B8]",
          socialBadge: "bg-[#0D0F14] text-[#00F0FF] border border-[#00F0FF]/30",
          bottomBar: "border-t border-[#00F0FF]/20 text-[#94A3B8]",
        };
      default: // classic
        return {
          wrapper: "bg-noir-900 text-brand-100 border-t border-noir-800 mt-20",
          topBar: "border-b border-noir-800/80 bg-noir-950 py-8",
          iconColor: "text-brand-500",
          titleColor: "text-brand-500",
          textColor: "text-zinc-400",
          socialBadge: "bg-noir-800 text-brand-500 border border-noir-700",
          bottomBar: "border-t border-noir-800 text-zinc-500",
        };
    }
  };

  const style = getFooterStyles();

  return (
    <footer className={style.wrapper}>
      {/* Ethos / Value Props Bar */}
      <div className={style.topBar}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className={`w-5 h-5 ${style.iconColor}`} />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('artisanQuality')}</h4>
              <p className={`text-[11px] ${style.textColor}`}>{t('artisanDesc')}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Truck className={`w-5 h-5 ${style.iconColor}`} />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('expressCourier')}</h4>
              <p className={`text-[11px] ${style.textColor}`}>{t('expressDesc')}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MessageSquare className={`w-5 h-5 ${style.iconColor}`} />
            <div className="text-left rtl:text-right">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">{t('directWhatsApp')}</h4>
              <p className={`text-[11px] ${style.textColor}`}>{t('directDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <span className="font-serif text-2xl font-semibold tracking-wider text-white">
            AURA <span className={`font-light ${style.iconColor}`}>&</span> CO.
          </span>
          <p className={`text-xs font-light leading-relaxed ${style.textColor}`}>
            {t('heroDesc')}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${style.socialBadge}`}>IG</span>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${style.socialBadge}`}>FB</span>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${style.socialBadge}`}>PIN</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-widest ${style.titleColor}`}>{t('curatedCategories')}</h4>
          <ul className={`space-y-2 text-xs ${style.textColor}`}>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('charms')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('bracelets')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('necklaces')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('lanyards')}</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">{t('watches')}</button></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-widest ${style.titleColor}`}>{t('delivery')}</h4>
          <ul className={`space-y-2 text-xs ${style.textColor}`}>
            <li><button onClick={() => navigateTo('delivery')} className="hover:text-white transition-colors">{t('delivery')}</button></li>
            <li><button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">WELCOME10 (10% OFF)</button></li>
            <li><a href={`https://wa.me/${storePhoneNumber.replace(/[^0-9+]/g, '')}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Concierge ({storePhoneNumber})</a></li>
          </ul>
        </div>

        {/* Col 4: Store Hours */}
        <div className="space-y-3">
          <h4 className={`text-xs font-bold uppercase tracking-widest ${style.titleColor}`}>Zamalek Boutique</h4>
          <p className={`text-xs leading-relaxed ${style.textColor}`}>
            <strong className="text-white">Mon – Sat:</strong> 10:00 AM – 10:00 PM<br />
            <strong className="text-white">Sunday:</strong> 12:00 PM – 8:00 PM<br />
            <strong className="text-white">Location:</strong> 26 26th of July St, Zamalek, Cairo
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className={`py-6 text-center text-xs ${style.bottomBar}`}>
        <p>© {new Date().getFullYear()} AURA STUDIOS. {t('allRightsReserved')}</p>
      </div>
    </footer>
  );
};
