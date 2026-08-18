import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, Sparkles, Settings, Globe, Shield, Terminal } from 'lucide-react';

export const Navbar = () => {
  const { activePage, navigateTo, cartItemCount, wishlist, setSettingsOpen, language, setLanguage, theme, t } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'catalog', label: t('catalog') },
    { id: 'cart', label: t('cart') },
    { id: 'delivery', label: t('delivery') },
  ];

  // Theme-specific navbar styles & container layout classes
  const getHeaderStyles = () => {
    switch (theme) {
      case 'dark-glamour':
        return {
          wrapper: "sticky top-0 z-40 bg-[#0D0C0B]/90 backdrop-blur-xl border-b border-[#E6C280]/20 shadow-2xl",
          announcement: "bg-[#181614] text-[#E6C280] text-[11px] border-b border-[#E6C280]/15 py-1.5 px-4 text-center font-mono uppercase tracking-widest flex items-center justify-center gap-2",
          logoText: "text-[#F4EFEA] group-hover:text-[#E6C280]",
          subText: "text-[#E6C280]/80",
          linkActive: "text-[#E6C280] font-bold",
          linkInactive: "text-[#A89F91] hover:text-[#E6C280]",
          badgeBg: "bg-[#E6C280] text-[#0D0C0B]",
          cartBtn: "bg-[#181614] hover:bg-[#E6C280] hover:text-[#0D0C0B] text-[#F4EFEA] border border-[#E6C280]/30 shadow-[0_0_15px_rgba(230,194,128,0.1)]",
          iconColor: "text-[#E6C280]",
        };
      case 'rose-blush':
        return {
          wrapper: "sticky top-0 z-40 bg-[#FDF6F6]/90 backdrop-blur-lg border-b border-[#D4889B]/30",
          announcement: "bg-[#36121D] text-[#FDF6F6] text-[11px] py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2 font-serif",
          logoText: "text-[#36121D] group-hover:text-[#D4889B]",
          subText: "text-[#825866]",
          linkActive: "text-[#D4889B] font-bold",
          linkInactive: "text-[#825866] hover:text-[#D4889B]",
          badgeBg: "bg-[#D4889B] text-white",
          cartBtn: "bg-white hover:bg-[#D4889B] hover:text-white text-[#36121D] border border-[#D4889B]/40 shadow-soft rounded-full",
          iconColor: "text-[#D4889B]",
        };
      case 'ocean-coastal':
        return {
          wrapper: "sticky top-0 z-40 bg-[#EDF5F9]/90 backdrop-blur-lg border-b border-[#00A896]/25 shadow-sm",
          announcement: "bg-[#0B2545] text-[#7FDED7] text-[11px] py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2",
          logoText: "text-[#0B2545] group-hover:text-[#00A896]",
          subText: "text-[#00A896]",
          linkActive: "text-[#00A896] font-bold",
          linkInactive: "text-[#4F6D7A] hover:text-[#00A896]",
          badgeBg: "bg-[#00A896] text-white",
          cartBtn: "bg-white hover:bg-[#00A896] hover:text-white text-[#0B2545] border border-[#00A896]/30 shadow-sm",
          iconColor: "text-[#00A896]",
        };
      case 'artisanal-heritage':
        return {
          wrapper: "sticky top-0 z-40 bg-[#F7F4EE] border-b-2 border-[#2A2421]",
          announcement: "bg-[#2A2421] text-[#F7F4EE] text-[11px] font-mono py-1.5 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2",
          logoText: "text-[#2A2421] group-hover:text-[#C85A32]",
          subText: "text-[#C85A32] font-mono",
          linkActive: "text-[#C85A32] font-bold underline underline-offset-4",
          linkInactive: "text-[#73675E] hover:text-[#C85A32]",
          badgeBg: "bg-[#C85A32] text-white",
          cartBtn: "bg-[#FFFDF8] hover:bg-[#C85A32] hover:text-white text-[#2A2421] border-2 border-[#2A2421]",
          iconColor: "text-[#C85A32]",
        };
      case 'cyber-luxe':
        return {
          wrapper: "sticky top-0 z-40 bg-[#060709]/95 backdrop-blur-xl border-b border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]",
          announcement: "bg-[#0D0F14] text-[#00F0FF] text-[10px] font-mono py-1 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2 border-b border-[#00F0FF]/20",
          logoText: "text-white group-hover:text-[#00F0FF]",
          subText: "text-[#00F0FF] font-mono",
          linkActive: "text-[#00F0FF] font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]",
          linkInactive: "text-[#94A3B8] hover:text-[#00F0FF]",
          badgeBg: "bg-[#00F0FF] text-[#060709]",
          cartBtn: "bg-[#0D0F14] hover:bg-[#00F0FF] hover:text-[#060709] text-white border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.2)]",
          iconColor: "text-[#00F0FF]",
        };
      default: // classic
        return {
          wrapper: "sticky top-0 z-40 glass-header border-b border-brand-200/50",
          announcement: "bg-noir-900 text-white text-[11px] font-light py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2",
          logoText: "text-noir-900 group-hover:text-brand-600",
          subText: "text-brand-700/80",
          linkActive: "text-brand-600 font-bold",
          linkInactive: "text-noir-800/80 hover:text-brand-600",
          badgeBg: "bg-brand-500 text-white",
          cartBtn: "bg-brand-50 hover:bg-brand-500 hover:text-white text-noir-900 border border-brand-200/80 shadow-sm",
          iconColor: "text-brand-600",
        };
    }
  };

  const style = getHeaderStyles();

  return (
    <header className={style.wrapper}>
      {/* Top Announcement Bar */}
      <div className={style.announcement}>
        <Sparkles className={`w-3.5 h-3.5 ${style.iconColor} animate-pulse`} />
        <span>{t('announcement')} <strong>WELCOME10</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2.5 transition-colors ${style.linkInactive}`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer group flex flex-col items-center sm:items-start"
          >
            <span className={`font-serif text-2xl sm:text-3xl font-semibold tracking-wider transition-colors ${style.logoText}`}>
              AURA <span className={`font-light ${style.iconColor}`}>&</span> CO.
            </span>
            <span className={`text-[9px] tracking-[0.3em] uppercase -mt-1 font-medium ${style.subText}`}>
              {t('brandSub')}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-xs font-semibold uppercase tracking-widest transition-all duration-200 py-1 relative ${
                  activePage === link.id ? style.linkActive : style.linkInactive
                }`}
              >
                {link.label}
                {activePage === link.id && theme !== 'artisanal-heritage' && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full animate-fade-in ${style.badgeBg}`} />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all border flex items-center gap-1.5 ${style.cartBtn}`}
              title="Change Language / تغيير اللغة"
            >
              <Globe className={`w-3.5 h-3.5 ${style.iconColor}`} />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={() => setSettingsOpen(true)}
              className={`p-2 transition-colors rounded-full ${style.linkInactive}`}
              title={t('settings')}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => navigateTo('catalog')}
              className={`relative p-2 transition-colors rounded-full ${style.linkInactive}`}
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className={`absolute top-1 right-1 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${style.badgeBg}`}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Persistent Cart Icon */}
            <button
              onClick={() => navigateTo('cart')}
              className={`px-3.5 py-2 rounded-full transition-all duration-300 flex items-center gap-2 group ${style.cartBtn}`}
              title={t('cart')}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold"><span className="hidden sm:inline">{t('cart')}</span></span>
              <span className={`text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center transition-colors ${style.badgeBg}`}>
                {cartItemCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden backdrop-blur-lg border-b px-4 py-5 space-y-3 animate-slide-up bg-inherit">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left rtl:text-right py-3 text-sm font-semibold uppercase tracking-wider ${
                activePage === link.id ? style.linkActive : style.linkInactive
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-gray-500/20 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className={`text-sm font-bold flex items-center gap-2 ${style.linkActive}`}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}</span>
            </button>

            <button
              onClick={() => {
                setSettingsOpen(true);
                setMobileMenuOpen(false);
              }}
              className={`p-2 ${style.linkInactive}`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
