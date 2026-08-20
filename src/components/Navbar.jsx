import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, Sparkles, Settings, Globe, Shield, User, Calculator, Box, Search, Layers, LogIn } from 'lucide-react';

export const Navbar = () => {
  const { 
    activePage, 
    navigateTo, 
    cartItemCount, 
    wishlist, 
    setSettingsOpen, 
    language, 
    setLanguage, 
    theme, 
    t, 
    user, 
    isAdmin, 
    setAuthModalOpen, 
    setAdminModalOpen,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = language === 'ar';

  const navLinks = [
    { id: 'home', label: t('home'), icon: '🏠' },
    { id: 'catalog', label: t('catalog'), icon: '📦' },
    { id: 'calculator', label: t('calculator'), icon: '🧮' },
    { id: 'studio3d', label: t('studio3d'), icon: '✨' },
    { id: 'cart', label: t('cart'), icon: '🛒' },
    { id: 'delivery', label: t('delivery'), icon: '💳' },
  ];

  const getHeaderStyles = () => {
    switch (theme) {
      case 'dark-glamour':
        return {
          wrapper: "sticky top-0 z-40 bg-[#0D0C0B]/95 backdrop-blur-xl border-b border-[#E6C280]/20 shadow-2xl",
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
          wrapper: "sticky top-0 z-40 bg-[#FDF6F6]/95 backdrop-blur-lg border-b border-[#D4889B]/30",
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
          wrapper: "sticky top-0 z-40 bg-[#EDF5F9]/95 backdrop-blur-lg border-b border-[#00A896]/25 shadow-sm",
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
          wrapper: "sticky top-0 z-40 glass-header border-b border-brand-200/60 shadow-sm",
          announcement: "bg-noir-900 text-white text-[11px] font-light py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2",
          logoText: "text-noir-900 group-hover:text-accent-gold",
          subText: "text-accent-gold",
          linkActive: "text-accent-gold font-bold",
          linkInactive: "text-noir-700 hover:text-accent-gold",
          badgeBg: "bg-accent-gold text-noir-950",
          cartBtn: "bg-brand-50 hover:bg-accent-gold hover:text-noir-950 text-noir-900 border border-brand-200 shadow-sm",
          iconColor: "text-accent-gold",
        };
    }
  };

  const style = getHeaderStyles();

  return (
    <header className={style.wrapper}>
      {/* Top Announcement Bar */}
      <div className={style.announcement}>
        <Sparkles className={`w-3.5 h-3.5 ${style.iconColor} animate-pulse shrink-0`} />
        <span>{t('announcement')}</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center font-serif font-bold text-xl text-accent-gold group-hover:scale-105 transition-transform shadow-sm">
              ✨
            </div>
            <div>
              <span className={`text-xl md:text-2xl font-serif font-bold tracking-tight transition-colors ${style.logoText}`}>
                AURA
              </span>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold block -mt-1 text-accent-gold">
                {isAr ? 'سوق خامات المطابخ الفاخرة' : 'Kitchen Market & Studio'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-xs uppercase tracking-wider font-semibold transition-all py-1.5 relative flex items-center gap-1.5 ${
                  activePage === link.id ? style.linkActive : style.linkInactive
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Search Bar Input (Desktop) */}
          <div className="hidden lg:flex items-center relative w-56 xl:w-64">
            <Search size={15} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 text-noir-400 pointer-events-none" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'catalog') navigateTo('catalog');
              }}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 rounded-xl bg-brand-100/50 border border-brand-200 text-xs focus:ring-2 focus:ring-accent-gold focus:outline-none placeholder:text-noir-400"
            />
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin Management Trigger (Visible if admin or testing) */}
            {isAdmin && (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-xs font-bold hover:bg-accent-gold hover:text-noir-950 transition-all shadow-sm"
                title={t('adminPortal')}
              >
                <Shield size={14} />
                <span>{t('adminPortal')}</span>
              </button>
            )}

            {/* Auth / Guest Role Indicator */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-100/60 border border-brand-200 text-xs font-semibold text-noir-800 hover:border-accent-gold transition-all"
              title={t('login')}
            >
              <User size={14} className="text-accent-gold" />
              <span className="hidden sm:inline font-sans line-clamp-1 max-w-[100px]">
                {user?.name || t('guestBadge')}
              </span>
              {isAdmin && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent-gold text-noir-950 font-bold uppercase">
                  {t('adminBadge')}
                </span>
              )}
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-brand-100/60 border border-brand-200 text-xs font-bold font-sans text-noir-800 hover:text-accent-gold hover:border-accent-gold transition-all"
              title="Toggle Arabic / English"
            >
              {language === 'en' ? 'عربي' : 'EN'}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => navigateTo('catalog')}
              className="relative p-2 rounded-xl text-noir-700 hover:text-accent-gold hover:bg-brand-100/60 transition-colors"
              title={t('wishlist')}
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${style.badgeBg}`}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Project Cart Button */}
            <button
              onClick={() => navigateTo('cart')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${style.cartBtn}`}
            >
              <ShoppingBag size={16} />
              <span className="hidden md:inline">{t('cart')}</span>
              {cartItemCount > 0 && (
                <span className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${style.badgeBg}`}>
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Global Settings & Theme Modal Button */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 rounded-xl text-noir-700 hover:text-accent-gold hover:bg-brand-100/60 transition-colors"
              title={t('settings')}
            >
              <Settings size={18} />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-noir-800 hover:bg-brand-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-50 border-b border-brand-200 px-4 pt-3 pb-6 space-y-3 animate-slide-up shadow-xl">
          
          {/* Mobile Search */}
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-2.5 text-noir-400" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activePage !== 'catalog') navigateTo('catalog');
              }}
              className="w-full pl-9 pr-3 rtl:pr-9 rtl:pl-3 py-2 rounded-xl bg-brand-100/60 border border-brand-200 text-xs focus:ring-2 focus:ring-accent-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigateTo(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-3 rounded-xl text-xs font-bold text-left rtl:text-right flex items-center gap-2 transition-all ${
                  activePage === link.id
                    ? 'bg-accent-gold text-noir-950 shadow-sm'
                    : 'bg-brand-100/60 text-noir-800 hover:bg-brand-200'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={() => {
                setAdminModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-accent-gold/20 text-accent-gold border border-accent-gold/40 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              <span>{t('adminPortal')}</span>
            </button>
          )}

          <div className="pt-2 flex items-center justify-between border-t border-brand-200 text-xs">
            <button
              onClick={() => {
                setAuthModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-accent-gold font-bold flex items-center gap-1.5"
            >
              <User size={15} />
              <span>{user?.name || t('login')}</span>
            </button>

            <button
              onClick={() => {
                setLanguage(language === 'en' ? 'ar' : 'en');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1 rounded-lg bg-brand-200 font-bold"
            >
              {language === 'en' ? 'عربي (RTL)' : 'English (LTR)'}
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
