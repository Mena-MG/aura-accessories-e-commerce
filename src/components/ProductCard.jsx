import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../data/mockData';
import { ShoppingBag, Heart, Star, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-brand-100/70 shadow-soft hover:shadow-luxe transition-all duration-300 flex flex-col h-full">
      {/* Product Image Box */}
      <div 
        onClick={() => navigateTo('product-detail', product.id)}
        className="relative aspect-square w-full bg-brand-50 overflow-hidden cursor-pointer"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Subtle overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-brand-200/50 shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-900">
              {product.badge}
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
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-500 shadow-sm' 
              : 'bg-white/80 text-noir-800 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add Button overlay on hover desktop */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-full bg-white/95 backdrop-blur-md hover:bg-noir-900 hover:text-white text-noir-900 font-medium text-xs tracking-wider uppercase py-2.5 rounded-xl shadow-md border border-brand-200/60 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-brand-500 group-hover/btn:text-white" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium tracking-widest text-brand-600 uppercase">
              {product.category}
            </span>
            {/* Rating */}
            <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 
            onClick={() => navigateTo('product-detail', product.id)}
            className="font-serif text-lg font-medium text-noir-900 line-clamp-1 hover:text-brand-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-noir-800/60 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-brand-100/70 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-noir-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            aria-label="Add to cart"
            className="sm:hidden w-8 h-8 rounded-full bg-brand-50 hover:bg-brand-500 hover:text-white text-brand-700 flex items-center justify-center transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
