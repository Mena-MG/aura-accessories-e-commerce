import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, formatPrice } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, Heart, Star, Sparkles, CheckCircle2, 
  ShieldCheck, Truck, ArrowLeft, Plus, Minus, MessageSquare, Share2 
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { selectedProduct, addToCart, navigateTo, wishlist, toggleWishlist, showToast, storePhoneNumber } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const cleanPhone = storePhoneNumber.replace(/[^0-9+]/g, '');

  const relatedProducts = PRODUCTS.filter(
    p => p.id !== selectedProduct.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 animate-fade-in">
      
      {/* Back Button Breadcrumb */}
      <button
        onClick={() => navigateTo('catalog')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-noir-800/70 hover:text-brand-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop Catalog</span>
      </button>

      {/* Main Product Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Product Image Gallery / Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-brand-50 border border-brand-200/60 shadow-floating group">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {selectedProduct.badge && (
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-200 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-900">
                  {selectedProduct.badge}
                </span>
              </div>
            )}

            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                isWishlisted ? 'bg-rose-50 text-rose-500 shadow-sm' : 'bg-white/80 text-noir-800 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Column: Product Information & Buying Actions */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Category & Ratings */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
              {selectedProduct.category}
            </span>

            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-noir-900 ml-1">{selectedProduct.rating}</span>
              <span className="text-zinc-400 font-normal">({selectedProduct.reviewsCount} reviews)</span>
            </div>
          </div>

          {/* Title & Price */}
          <div className="space-y-2 border-b border-brand-100 pb-6">
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-noir-900 leading-tight">
              {selectedProduct.name}
            </h1>
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl sm:text-3xl font-semibold text-noir-900">
                {formatPrice(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(selectedProduct.originalPrice)}
                </span>
              )}
              <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                In Stock & Ready to Ship
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-sm text-noir-800/80 font-light leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Key Attribute Pills */}
          <div className="grid grid-cols-2 gap-3 py-2 text-xs">
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-100/80">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Material</span>
              <span className="font-semibold text-noir-900">{selectedProduct.material}</span>
            </div>
            <div className="p-3 bg-brand-50 rounded-xl border border-brand-100/80">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Color Palette</span>
              <span className="font-semibold text-noir-900">{selectedProduct.color}</span>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-brand-100">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-noir-900">Quantity:</span>
              
              {/* Stepper */}
              <div className="flex items-center border border-brand-200 rounded-xl bg-brand-50/50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-white text-noir-800 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-noir-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-white text-noir-800 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Primary Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                addedAnimation
                  ? 'bg-emerald-600 text-white scale-[0.99]'
                  : 'bg-noir-900 hover:bg-brand-600 text-white shadow-luxe'
              }`}
            >
              {addedAnimation ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                  <span>Added {quantity} to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-brand-500" />
                  <span>Add to Shopping Cart — {formatPrice(selectedProduct.price * quantity)}</span>
                </>
              )}
            </button>

            {/* Quick WhatsApp Inquiry */}
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${cleanPhone.replace('+', '')}?text=Hi!%20I%20am%20interested%20in%20ordering%20${encodeURIComponent(selectedProduct.name)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Inquire via WhatsApp ({storePhoneNumber})</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="p-3 bg-brand-50 hover:bg-brand-100 text-noir-800 rounded-full border border-brand-200 transition-colors"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Features bullet list */}
          <div className="pt-6 border-t border-brand-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-noir-900">Handcrafting & Details</h4>
            <ul className="space-y-2 text-xs text-noir-800/70">
              {selectedProduct.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS RECOMMENDATIONS */}
      <section className="pt-12 border-t border-brand-200/60 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Complementary Pieces</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-light text-noir-900">You May Also Love</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
};
