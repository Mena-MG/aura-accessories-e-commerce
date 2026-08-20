import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ShieldCheck, Truck, MessageSquare, Phone, MapPin, Clock, Award } from 'lucide-react';
import { PICKUP_LOCATIONS } from '../data/mockData';

export const Footer = () => {
  const { navigateTo, t, storePhoneNumber, theme, language } = useShop();
  const isAr = language === 'ar';

  const getFooterStyles = () => {
    switch (theme) {
      case 'dark-glamour':
        return {
          wrapper: "bg-[#0D0C0B] text-[#F4EFEA] border-t border-[#E6C280]/20 mt-10 sm:mt-20",
          topBar: "border-b border-[#E6C280]/15 bg-[#181614] py-6 sm:py-10",
          iconColor: "text-[#E6C280]",
          titleColor: "text-[#E6C280]",
          textColor: "text-[#A89F91]",
          socialBadge: "bg-[#181614] text-[#E6C280] border border-[#E6C280]/20",
          bottomBar: "border-t border-[#E6C280]/15 text-[#A89F91]",
        };
      case 'rose-blush':
        return {
          wrapper: "bg-[#36121D] text-[#FDF6F6] border-t border-[#D4889B]/30 mt-10 sm:mt-20",
          topBar: "border-b border-[#D4889B]/20 bg-[#260A14] py-6 sm:py-10",
          iconColor: "text-[#D4889B]",
          titleColor: "text-[#D4889B]",
          textColor: "text-[#E8C5CE]",
          socialBadge: "bg-[#260A14] text-[#D4889B] border border-[#D4889B]/20",
          bottomBar: "border-t border-[#D4889B]/20 text-[#E8C5CE]",
        };
      case 'ocean-coastal':
        return {
          wrapper: "bg-[#0B2545] text-[#EDF5F9] border-t border-[#00A896]/30 mt-10 sm:mt-20",
          topBar: "border-b border-[#00A896]/20 bg-[#06172E] py-6 sm:py-10",
          iconColor: "text-[#00A896]",
          titleColor: "text-[#00A896]",
          textColor: "text-[#8CA8BE]",
          socialBadge: "bg-[#06172E] text-[#00A896] border border-[#00A896]/20",
          bottomBar: "border-t border-[#00A896]/20 text-[#8CA8BE]",
        };
      case 'artisanal-heritage':
        return {
          wrapper: "bg-[#2A2421] text-[#F7F4EE] border-t-2 border-[#C85A32] mt-10 sm:mt-20 font-mono",
          topBar: "border-b border-[#C85A32]/30 bg-[#1E1917] py-6 sm:py-10",
          iconColor: "text-[#C85A32]",
          titleColor: "text-[#C85A32]",
          textColor: "text-[#B8ACA3]",
          socialBadge: "bg-[#1E1917] text-[#C85A32] border border-[#C85A32]/30",
          bottomBar: "border-t border-[#C85A32]/30 text-[#B8ACA3]",
        };
      case 'cyber-luxe':
        return {
          wrapper: "bg-[#060709] text-[#E2E8F0] border-t border-[#00F0FF]/30 mt-10 sm:mt-20 shadow-[0_-10px_30px_rgba(0,240,255,0.08)]",
          topBar: "border-b border-[#00F0FF]/20 bg-[#0D0F14] py-6 sm:py-10",
          iconColor: "text-[#00F0FF]",
          titleColor: "text-[#00F0FF]",
          textColor: "text-[#94A3B8]",
          socialBadge: "bg-[#0D0F14] text-[#00F0FF] border border-[#00F0FF]/30",
          bottomBar: "border-t border-[#00F0FF]/20 text-[#94A3B8]",
        };
      default: // classic
        return {
          wrapper: "bg-noir-950 text-white border-t border-brand-200/20 mt-10 sm:mt-20",
          topBar: "border-b border-white/10 bg-noir-900 py-6 sm:py-10",
          iconColor: "text-accent-gold",
          titleColor: "text-accent-gold",
          textColor: "text-noir-300",
          socialBadge: "bg-white/5 text-accent-gold border border-white/10",
          bottomBar: "border-t border-white/10 text-noir-400",
        };
    }
  };

  const style = getFooterStyles();

  return (
    <footer className={style.wrapper}>
      {/* 3 Pillars Top Bar */}
      <div className={style.topBar}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-white/5 shrink-0 ${style.iconColor}`}>
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`font-serif text-sm font-bold ${style.titleColor}`}>
                  {isAr ? 'خامات معتمدة وضمان ٢٥ عاماً' : 'Certified Stone & 25-Yr Warranty'}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${style.textColor}`}>
                  {isAr 
                    ? 'جرانيت طبيعي، كوارتز أسباني نقي، ودواليب بمفصلات ألمانية أصلية.' 
                    : '100% genuine granite slabs, non-porous quartz, and Blum soft-close mechanics.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-white/5 shrink-0 ${style.iconColor}`}>
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`font-serif text-sm font-bold ${style.titleColor}`}>
                  {isAr ? 'شحن ومعاينة موقع هندسية' : 'Turnkey Site Delivery & Fit-out'}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${style.textColor}`}>
                  {isAr
                    ? 'توصيل محمي للألواح والرخام مع فنيين متخصصين لرفع المقاسات والتركيب.'
                    : 'Specialized freight trucks for heavy slabs with certified master fitters.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-white/5 shrink-0 ${style.iconColor}`}>
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h4 className={`font-serif text-sm font-bold ${style.titleColor}`}>
                  {isAr ? 'تأكيد فوري عبر الواتساب وإنستاباي' : 'Instant WhatsApp & Instapay Checkout'}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${style.textColor}`}>
                  {isAr
                    ? 'إرسال طلبك منسقاً مع إيصال إنستاباي لخدمة عملاء أورا بلمسة واحدة.'
                    : 'Dispatch formatted order with Instapay screenshot directly to concierge.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <span className="font-serif text-xl font-bold tracking-wider">AURA</span>
            </div>
            <p className={`text-xs leading-relaxed ${style.textColor}`}>
              {t('footerBrandDesc')}
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${storePhoneNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md"
              >
                <MessageSquare size={15} />
                {t('contactConsultant')}
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className={`font-serif text-sm font-bold mb-4 ${style.titleColor}`}>
              {t('quickLinks')}
            </h4>
            <ul className={`space-y-2.5 text-xs ${style.textColor}`}>
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-accent-gold transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-accent-gold transition-colors">
                  {t('catalog')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('calculator')} className="hover:text-accent-gold transition-colors">
                  {t('calculator')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('studio3d')} className="hover:text-accent-gold transition-colors">
                  {t('studio3d')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('cart')} className="hover:text-accent-gold transition-colors">
                  {t('cart')}
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`font-serif text-sm font-bold mb-4 ${style.titleColor}`}>
              {t('curatedCategories')}
            </h4>
            <ul className={`space-y-2.5 text-xs ${style.textColor}`}>
              <li>{t('countertops')}</li>
              <li>{t('cabinets')}</li>
              <li>{t('tiles')}</li>
              <li>{t('sinks')}</li>
              <li>{t('hardware')}</li>
              <li>{t('appliances')}</li>
            </ul>
          </div>

          {/* Showroom Hubs */}
          <div>
            <h4 className={`font-serif text-sm font-bold mb-4 ${style.titleColor}`}>
              {isAr ? 'معارضنا بالقاهرة والجيزة' : 'Flagship Boutiques & Ateliers'}
            </h4>
            <div className={`space-y-3 text-xs ${style.textColor}`}>
              {PICKUP_LOCATIONS.map(loc => (
                <div key={loc.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <p className="font-bold text-white line-clamp-1">{isAr ? loc.nameAr : loc.name}</p>
                  <p className="text-[11px] text-white/70">{isAr ? loc.addressAr : loc.address}</p>
                  <p className="text-[10px] text-accent-gold">{isAr ? loc.hoursAr : loc.hours}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className={`mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${style.bottomBar}`}>
          <p>© {new Date().getFullYear()} Aura Kitchen Market. {t('allRightsReserved')}</p>
          <p className="font-mono text-[11px]">WhatsApp Concierge: {storePhoneNumber}</p>
        </div>
      </div>
    </footer>
  );
};
