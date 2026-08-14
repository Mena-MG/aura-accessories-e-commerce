import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Heart, ShieldCheck, Truck, RefreshCw, MessageSquare } from 'lucide-react';
import { STORE_PHONE_NUMBER } from '../data/mockData';

export const Footer = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-noir-900 text-brand-100 border-t border-noir-800 mt-20">
      {/* Ethos / Value Props Bar */}
      <div className="border-b border-noir-800/80 bg-noir-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-500" />
            <div className="text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Artisan Quality</h4>
              <p className="text-[11px] text-zinc-400">Handcrafted with premium materials</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-brand-500" />
            <div className="text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Express Courier</h4>
              <p className="text-[11px] text-zinc-400">Fast delivery or store pickup</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MessageSquare className="w-5 h-5 text-brand-500" />
            <div className="text-left">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Direct WhatsApp Checkout</h4>
              <p className="text-[11px] text-zinc-400">Instant order confirmation with store</p>
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
            Curated artisanal jewelry, ocean charm bangles, sapphire crystal pendants, and bespoke everyday accessories crafted for effortless luxury.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">IG</span>
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">FB</span>
            <span className="w-8 h-8 rounded-full bg-noir-800 flex items-center justify-center text-xs text-brand-500 border border-noir-700">PIN</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">Explore Collections</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Charms & Keychains</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Charm Bracelets</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Crystal Necklaces</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Lanyards & Card Holders</button></li>
            <li><button onClick={() => navigateTo('catalog')} className="hover:text-white transition-colors">Luxury Watches & Bags</button></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">Customer Support</h4>
          <ul className="space-y-2 text-xs text-zinc-400">
            <li><button onClick={() => navigateTo('delivery')} className="hover:text-white transition-colors">Delivery & Store Pickup</button></li>
            <li><button onClick={() => navigateTo('cart')} className="hover:text-white transition-colors">Discount Codes (WELCOME10)</button></li>
            <li><a href={`https://wa.me/${STORE_PHONE_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Concierge</a></li>
            <li className="text-zinc-500">FAQ & Returns</li>
          </ul>
        </div>

        {/* Col 4: Store Hours */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-500">Boutique Hours</h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            <strong>Mon – Sat:</strong> 10:00 AM – 8:00 PM<br />
            <strong>Sunday:</strong> 11:00 AM – 6:00 PM<br />
            <strong>Location:</strong> 428 Grand Avenue, Suite 102
          </p>
          <div className="pt-2 text-[11px] text-brand-500">
            ✨ Client Prototype Demo Mode
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-noir-800 py-6 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} AURA STUDIOS. All rights reserved. Made with elegance.</p>
      </div>
    </footer>
  );
};
