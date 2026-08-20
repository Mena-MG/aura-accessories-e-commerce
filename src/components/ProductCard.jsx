import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice, UNIT_LABELS } from '../data/mockData';
import { ShoppingBag, Heart, Star, Sparkles, Box, Edit2, Layers } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist, language, t, isAdmin, setAdminModalOpen } = useShop();
  const isWishlisted = wishlist.includes(product.id);
  const isAr = language === 'ar';

  const unitLabel = product.unitType ? (UNIT_LABELS[product.unitType]?.[language] || '') : '';

  return (
    <div className="group relative bg-brand-50 text-noir-900 rounded-3xl overflow-hidden border border-brand-200 shadow-sm hover:shadow-xl hover:border-accent-gold/50 transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image Box */}
      <div 
        onClick={() => navigateTo('product-detail', product.id)}
        className="relative aspect-4/3 sm:aspect-square w-full bg-brand-100/50 overflow-hidden cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-brand-50/95 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-brand-300 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-accent-gold" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-noir-900 font-sans">
              {isAr ? (product.badgeAr || product.badge) : product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 rtl:right-auto rtl:left-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-sm ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500' 
              : 'bg-brand-50/80 text-noir-700 hover:bg-brand-50 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Admin Quick Edit Button (if logged as Admin) */}
        {isAdmin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAdminModalOpen(true);
            }}
            className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 p-2 rounded-xl bg-accent-gold text-noir-950 shadow-md hover:scale-110 transition-transform text-xs font-bold"
            title="Admin Edit"
          >
            <Edit2 size={13} />
          </button>
        )}

        {/* Quick Add Button overlay on hover */}
        <div className="absolute bottom-3 left-3 right-3 rtl:right-3 rtl:left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-full bg-brand-50/95 backdrop-blur-md hover:bg-accent-gold hover:text-noir-950 text-noir-900 font-bold text-xs tracking-wider uppercase py-2.5 rounded-xl shadow-lg border border-brand-300 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {t('quickAdd')}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-brand-50">
        <div>
          {/* Category & Color Swatch */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold tracking-wider text-accent-gold uppercase line-clamp-1">
              {isAr ? (product.categoryAr || product.category) : product.category}
            </span>
            <div className="flex items-center gap-1.5">
              {product.colorHex && (
                <span 
                  className="w-2.5 h-2.5 rounded-full inline-block border border-noir-300 shrink-0 shadow-xs" 
                  style={{ backgroundColor: product.colorHex }}
                  title={product.color}
                />
              )}
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-serif text-sm sm:text-base font-bold text-noir-900 line-clamp-2 hover:text-accent-gold transition-colors cursor-pointer"
          >
            {isAr ? (product.nameAr || product.name) : product.name}
          </h3>

          {/* Specs Snippet */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.material && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-100 text-noir-700 font-medium">
                {isAr ? (product.materialAr || product.material) : product.material}
              </span>
            )}
            {product.thickness && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-brand-100 text-noir-600 font-mono">
                {product.thickness}
              </span>
            )}
          </div>
        </div>

        {/* Price & Mobile Add Button */}
        <div className="mt-4 pt-3 border-t border-brand-200 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-noir-900 font-mono">
                {formatPrice(product.price, language)}
              </span>
              {unitLabel && (
                <span className="text-[11px] text-noir-600 font-medium font-sans">
                  {unitLabel}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-[11px] text-noir-400 line-through font-mono">
                {formatPrice(product.originalPrice, language)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label="Add to cart"
            className="sm:hidden w-9 h-9 rounded-xl bg-accent-gold text-noir-950 flex items-center justify-center shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
