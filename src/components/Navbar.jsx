import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Settings } from 'lucide-react';

export const Navbar = () => {
  const { activePage, navigateTo, cartItemCount, wishlist, setSettingsOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'catalog', label: 'Shop Catalog' },
    { id: 'cart', label: 'My Cart' },
    { id: 'delivery', label: 'Delivery / Pickup' },
  ];

  return (
    <header className="sticky top-0 z-40 glass-header border-b border-brand-200/50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-noir-900 text-white text-[11px] font-light py-2 px-4 text-center tracking-widest uppercase flex items-center justify-center gap-2">
        <Sparkles className="w-3 h-3 text-brand-500 animate-pulse-subtle" />
        <span>Complimentary Gift Packaging on Orders Over $50 — Use Code <strong className="text-brand-500 font-semibold">WELCOME10</strong> for 10% Off</span>
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
              Artisanal Accessories
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Settings Icon */}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-noir-800 hover:text-brand-600 transition-colors rounded-full hover:bg-brand-100/60"
              title="Store Settings (Change WhatsApp Phone)"
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('catalog')}
              className="relative p-2 text-noir-800 hover:text-brand-600 transition-colors rounded-full hover:bg-brand-100/60"
              title="Wishlist"
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
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-brand-600 group-hover:text-white transition-colors" />
              <span className="text-xs font-bold font-sans">Cart</span>
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
              className={`block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider ${
                activePage === link.id ? 'text-brand-600' : 'text-noir-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setSettingsOpen(true);
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold uppercase tracking-wider text-brand-600 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings</span>
          </button>
        </div>
      )}
    </header>
  );
};
