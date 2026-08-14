import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Menu, X, Sparkles, Settings, Globe } from 'lucide-react';

export const Navbar = () => {
  const { activePage, navigateTo, cartItemCount, wishlist, setSettingsOpen, language, setLanguage, t } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home') },
    { id: 'catalog', label: t('catalog') },
    { id: 'cart', label: t('cart') },
    { id: 'delivery', label: t('delivery') },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-brand-200/50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-noir-900 text-white text-[11px] font-light py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-pulse-subtle" />
        <span>{t('announcement')} <strong className="text-brand-500 font-semibold">WELCOME10</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-noir-800 hover:text-brand-600 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer group flex flex-col items-center sm:items-start"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-noir-900 group-hover:text-brand-600 transition-colors">
              AURA <span className="text-brand-500 font-light">&</span> CO.
            </span>
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-brand-700/80 -mt-1 font-medium">
              {t('brandSub')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`text-xs font-semibold uppercase tracking-widest transition-all duration-200 py-1 relative ${
                  activePage === link.id
                    ? 'text-brand-600 font-bold'
                    : 'text-noir-800/80 hover:text-brand-600'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full animate-fade-in" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            
            {/* Language Switcher Pill */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-2.5 py-1 rounded-full bg-brand-100/80 hover:bg-brand-200 text-noir-900 text-xs font-bold transition-all border border-brand-200 flex items-center gap-1.5"
              title="Change Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-brand-700" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Settings Icon */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-noir-800 hover:text-brand-600 transition-colors rounded-full hover:bg-brand-100/60"
              title={t('settings')}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('catalog')}
              className="relative p-2 text-noir-800 hover:text-brand-600 transition-colors rounded-full hover:bg-brand-100/60"
              title={t('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Persistent Cart Icon */}
            <button
              onClick={() => navigateTo('cart')}
              className="relative bg-brand-50 hover:bg-brand-500 hover:text-white text-noir-900 px-3.5 py-2 rounded-full border border-brand-200/80 transition-all duration-300 flex items-center gap-2 group shadow-sm"
              title={t('cart')}
            >
              <ShoppingBag className="w-4 h-4 text-brand-600 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold font-sans">{t('cart')}</span>
              <span className="bg-brand-500 group-hover:bg-white group-hover:text-noir-900 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center transition-colors">
                {cartItemCount}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-brand-200 animate-slide-up px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigateTo(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left rtl:text-right py-2 text-sm font-semibold uppercase tracking-wider ${
                activePage === link.id ? 'text-brand-600' : 'text-noir-800'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-2 border-t border-brand-100 flex items-center justify-between">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm font-bold text-brand-700 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}</span>
            </button>

            <button
              onClick={() => {
                setSettingsOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-noir-800 hover:text-brand-600 p-2"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
