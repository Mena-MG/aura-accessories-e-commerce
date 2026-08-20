import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Calculator, Check, ArrowRight, Sparkles, Plus, Share2, Layers } from 'lucide-react';
import { formatPrice } from '../data/mockData';

export const KitchenCalculator = ({ isModal = false, onClose }) => {
  const { products, addToCart, language, t, storePhoneNumber, showToast, navigateTo } = useShop();
  const isAr = language === 'ar';

  // Materials separated by surface
  const countertops = products.filter(p => p.category === 'Countertops' || p.surfaceType === 'countertop');
  const cabinets = products.filter(p => p.category === 'Cabinets & Units' || p.surfaceType === 'cabinet');
  const tiles = products.filter(p => p.category === 'Tiles & Backsplash' || p.surfaceType === 'backsplash');

  // Calculator State
  const [kitchenArea, setKitchenArea] = useState(12); // m²
  const [countertopLength, setCountertopLength] = useState(4.0); // LM
  const [selectedCountertopId, setSelectedCountertopId] = useState(countertops[0]?.id || 'prod-1');
  
  const [cabinetLength, setCabinetLength] = useState(5.0); // LM
  const [selectedCabinetId, setSelectedCabinetId] = useState(cabinets[0]?.id || 'prod-4');
  
  const [backsplashArea, setBacksplashArea] = useState(3.5); // m²
  const [selectedTileId, setSelectedTileId] = useState(tiles[0]?.id || 'prod-7');
  
  const [installationTier, setInstallationTier] = useState('standard'); // 'none' (0%) | 'standard' (15%) | 'premium' (25%) | 'custom' (35%)

  // Selected Objects
  const selectedCountertop = products.find(p => p.id === selectedCountertopId) || countertops[0];
  const selectedCabinet = products.find(p => p.id === selectedCabinetId) || cabinets[0];
  const selectedTile = products.find(p => p.id === selectedTileId) || tiles[0];

  // Pricing Math
  // Countertop area = length × 0.65m standard depth
  const slabAreaSqm = Number((countertopLength * 0.65).toFixed(2));
  const countertopPrice = Math.round((selectedCountertop?.price || 1450) * slabAreaSqm);

  // Cabinets price = LM × price_per_LM
  const cabinetPrice = Math.round((selectedCabinet?.price || 3600) * cabinetLength);

  // Backsplash price = m² × price_per_sqm
  const tilePrice = Math.round((selectedTile?.price || 240) * backsplashArea);

  // Materials Total
  const materialsSubtotal = countertopPrice + cabinetPrice + tilePrice;

  // Installation Tier
  const installRates = {
    none: 0,
    standard: 0.15,
    premium: 0.25,
    custom: 0.35,
  };
  const installationRate = installRates[installationTier] || 0.15;
  const installationCost = Math.round(materialsSubtotal * installationRate);

  // Commission (10% on materials + installation)
  const commissionRate = 0.10;
  const commissionCost = Math.round((materialsSubtotal + installationCost) * commissionRate);

  // Grand Total
  const grandTotal = materialsSubtotal + installationCost + commissionCost;

  const handleAddAllToCart = () => {
    if (selectedCountertop) {
      addToCart(selectedCountertop, slabAreaSqm, `Kitchen Countertop (${countertopLength}m × 0.65m = ${slabAreaSqm} m²)`);
    }
    if (selectedCabinet) {
      addToCart(selectedCabinet, cabinetLength, `Kitchen Cabinetry (${cabinetLength} Linear Meters)`);
    }
    if (selectedTile) {
      addToCart(selectedTile, backsplashArea, `Kitchen Backsplash Wall (${backsplashArea} m²)`);
    }
    showToast(t('calcSuccessToast'), 'success');
    if (onClose) onClose();
    navigateTo('cart');
  };

  const handleSendWhatsAppEstimate = () => {
    const currency = isAr ? 'ج.م' : 'EGP';
    const fmt = (n) => n.toLocaleString('en-US');

    const msg = isAr 
      ? `╔═══════════════════════════════╗\n    🏠 مقايسة مطبخ ذكية - أورا\n╚═══════════════════════════════╝\n\n📐 مساحة المطبخ: ${kitchenArea} م²\n\n1️⃣ سطح المطبخ (${countertopLength} متر طولي / ${slabAreaSqm} م²):\n   • ${selectedCountertop?.nameAr || selectedCountertop?.name}\n   • التكلفة: ${fmt(countertopPrice)} ${currency}\n\n2️⃣ دواليب المطبخ (${cabinetLength} متر طولي):\n   • ${selectedCabinet?.nameAr || selectedCabinet?.name}\n   • التكلفة: ${fmt(cabinetPrice)} ${currency}\n\n3️⃣ سيراميك الحائط (${backsplashArea} م²):\n   • ${selectedTile?.nameAr || selectedTile?.name}\n   • التكلفة: ${fmt(tilePrice)} ${currency}\n\n💰 ملخص التكاليف:\n━━━━━━━━━━━━━━━━━━\n• إجمالي الخامات: ${fmt(materialsSubtotal)} ${currency}\n• التركيب والمصنعيات (${Math.round(installationRate * 100)}%): ${fmt(installationCost)} ${currency}\n• عمولة الإشراف والضمان (١٠%): ${fmt(commissionCost)} ${currency}\n─────────────────────\n💵 الإجمالي التقديري: ${fmt(grandTotal)} ${currency}\n\n━━━━━━━━━━━━━━━━━━\nتم الإنشاء عبر حاسبة أورا الذكية 🧮`
      : `╔═══════════════════════════════╗\n    🏠 AURA KITCHEN QUOTATION\n╚═══════════════════════════════╝\n\n📐 Kitchen Floor Area: ${kitchenArea} m²\n\n1️⃣ Countertop Slab (${countertopLength} LM / ${slabAreaSqm} m²):\n   • ${selectedCountertop?.name}\n   • Cost: ${fmt(countertopPrice)} ${currency}\n\n2️⃣ Cabinetry Units (${cabinetLength} LM):\n   • ${selectedCabinet?.name}\n   • Cost: ${fmt(cabinetPrice)} ${currency}\n\n3️⃣ Backsplash Wall (${backsplashArea} m²):\n   • ${selectedTile?.name}\n   • Cost: ${fmt(tilePrice)} ${currency}\n\n💰 Summary:\n━━━━━━━━━━━━━━━━━━\n• Materials Subtotal: ${fmt(materialsSubtotal)} ${currency}\n• Installation (${Math.round(installationRate * 100)}%): ${fmt(installationCost)} ${currency}\n• Quality Commission (10%): ${fmt(commissionCost)} ${currency}\n─────────────────────\n💵 Estimated Total: ${fmt(grandTotal)} ${currency}\n\n━━━━━━━━━━━━━━━━━━\nGenerated via Aura Kitchen Calculator 🧮`;

    const cleanPhone = storePhoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className={`bg-brand-50 text-noir-900 ${isModal ? 'p-0' : 'p-6 md:p-10 max-w-6xl mx-auto rounded-3xl border border-brand-200 shadow-xl'}`}>
      
      {/* Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/20 text-accent-gold text-xs font-bold uppercase tracking-wider mb-3">
          <Calculator size={14} />
          {isAr ? 'حاسبة التكاليف التفاعلية' : 'Smart Cost Estimator'}
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-noir-900">{t('calcTitle')}</h2>
        <p className="text-sm text-noir-600 mt-2">{t('calcSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Input Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Kitchen Area Slider */}
          <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-noir-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center text-xs">📐</span>
                {t('kitchenArea')}
              </label>
              <span className="font-bold font-mono text-accent-gold text-base bg-brand-50 px-3 py-1 rounded-xl border border-brand-200">
                {kitchenArea} m²
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="40"
              step="1"
              value={kitchenArea}
              onChange={(e) => setKitchenArea(Number(e.target.value))}
              className="w-full accent-accent-gold cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-noir-500 font-mono">
              <span>4 m² (Small Studio)</span>
              <span>20 m² (Standard)</span>
              <span>40 m² (Villa Luxury)</span>
            </div>
          </div>

          {/* 1. Countertop Selection */}
          <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-noir-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center text-xs">🪨</span>
                {t('countertopMaterial')}
              </label>
              <span className="text-xs font-mono font-bold text-noir-700">
                {countertopLength} LM ({slabAreaSqm} m²)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedCountertopId}
                onChange={(e) => setSelectedCountertopId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm font-medium focus:ring-2 focus:ring-accent-gold"
              >
                {countertops.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? (c.nameAr || c.name) : c.name} ({formatPrice(c.price, language)}/m²)
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <label className="text-xs text-noir-600 whitespace-nowrap">{isAr ? 'الطول:' : 'Length:'}</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.5"
                  value={countertopLength}
                  onChange={(e) => setCountertopLength(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm font-bold font-mono focus:ring-2 focus:ring-accent-gold"
                />
                <span className="text-xs text-noir-500 font-mono">LM</span>
              </div>
            </div>

            {selectedCountertop && (
              <div className="flex items-center justify-between text-xs text-noir-600 pt-1 border-t border-brand-200/60">
                <span>{selectedCountertop.material} • {selectedCountertop.thickness}</span>
                <span className="font-bold text-noir-900 font-mono">{formatPrice(countertopPrice, language)}</span>
              </div>
            )}
          </div>

          {/* 2. Cabinets Selection */}
          <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-noir-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center text-xs">🗄️</span>
                {t('cabinetMaterial')}
              </label>
              <span className="text-xs font-mono font-bold text-noir-700">
                {cabinetLength} LM
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedCabinetId}
                onChange={(e) => setSelectedCabinetId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm font-medium focus:ring-2 focus:ring-accent-gold"
              >
                {cabinets.map(c => (
                  <option key={c.id} value={c.id}>
                    {isAr ? (c.nameAr || c.name) : c.name} ({formatPrice(c.price, language)}/LM)
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <label className="text-xs text-noir-600 whitespace-nowrap">{isAr ? 'الأمتار:' : 'Meters:'}</label>
                <input
                  type="number"
                  min="2"
                  max="30"
                  step="0.5"
                  value={cabinetLength}
                  onChange={(e) => setCabinetLength(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm font-bold font-mono focus:ring-2 focus:ring-accent-gold"
                />
                <span className="text-xs text-noir-500 font-mono">LM</span>
              </div>
            </div>

            {selectedCabinet && (
              <div className="flex items-center justify-between text-xs text-noir-600 pt-1 border-t border-brand-200/60">
                <span>{selectedCabinet.material} • {selectedCabinet.finish}</span>
                <span className="font-bold text-noir-900 font-mono">{formatPrice(cabinetPrice, language)}</span>
              </div>
            )}
          </div>

          {/* 3. Backsplash Selection */}
          <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-noir-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center text-xs">🧱</span>
                {t('backsplashMaterial')}
              </label>
              <span className="text-xs font-mono font-bold text-noir-700">
                {backsplashArea} m²
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={selectedTileId}
                onChange={(e) => setSelectedTileId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm font-medium focus:ring-2 focus:ring-accent-gold"
              >
                {tiles.map(t => (
                  <option key={t.id} value={t.id}>
                    {isAr ? (t.nameAr || t.name) : t.name} ({formatPrice(t.price, language)}/m²)
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <label className="text-xs text-noir-600 whitespace-nowrap">{isAr ? 'المساحة:' : 'Area:'}</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="0.5"
                  value={backsplashArea}
                  onChange={(e) => setBacksplashArea(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm font-bold font-mono focus:ring-2 focus:ring-accent-gold"
                />
                <span className="text-xs text-noir-500 font-mono">m²</span>
              </div>
            </div>

            {selectedTile && (
              <div className="flex items-center justify-between text-xs text-noir-600 pt-1 border-t border-brand-200/60">
                <span>{selectedTile.material}</span>
                <span className="font-bold text-noir-900 font-mono">{formatPrice(tilePrice, language)}</span>
              </div>
            )}
          </div>

          {/* 4. Installation Level */}
          <div className="p-5 rounded-2xl bg-brand-100/40 border border-brand-200 space-y-3">
            <label className="text-sm font-bold text-noir-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-accent-gold/20 text-accent-gold flex items-center justify-center text-xs">🛠️</span>
              {t('installationTier')}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { key: 'none', label: t('installNone'), percent: '0%' },
                { key: 'standard', label: t('installStandard'), percent: '+15%' },
                { key: 'premium', label: t('installPremium'), percent: '+25%' },
                { key: 'custom', label: t('installCustom'), percent: '+35%' },
              ].map(tier => (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => setInstallationTier(tier.key)}
                  className={`p-3 rounded-xl border text-left rtl:text-right font-medium transition-all ${
                    installationTier === tier.key
                      ? 'bg-accent-gold/20 border-accent-gold text-noir-950 font-bold shadow-sm'
                      : 'bg-brand-50 border-brand-200 text-noir-700 hover:bg-brand-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{tier.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right / Live Quotation Summary Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 p-6 rounded-3xl bg-brand-100/70 border border-brand-300 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-brand-300/80 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-noir-900">{t('calculatedBreakdown')}</h3>
                <p className="text-xs text-noir-600">{kitchenArea} m² Kitchen Project</p>
              </div>
              <span className="text-xl">🧮</span>
            </div>

            {/* Line Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-noir-700">{isAr ? 'سطح المطبخ (الرخام)' : 'Countertop Slab'}</span>
                <span className="font-mono font-bold text-noir-900">{formatPrice(countertopPrice, language)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-noir-700">{isAr ? 'دواليب وخزائن المطبخ' : 'Cabinetry Units'}</span>
                <span className="font-mono font-bold text-noir-900">{formatPrice(cabinetPrice, language)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-noir-700">{isAr ? 'سيراميك وبلاط الحائط' : 'Backsplash Wall'}</span>
                <span className="font-mono font-bold text-noir-900">{formatPrice(tilePrice, language)}</span>
              </div>

              <div className="pt-2 border-t border-brand-200 flex justify-between items-center font-bold text-noir-800">
                <span>{t('materialsCost')}</span>
                <span className="font-mono">{formatPrice(materialsSubtotal, language)}</span>
              </div>

              <div className="flex justify-between items-center text-noir-700">
                <span>{t('installationCost')} ({Math.round(installationRate * 100)}%)</span>
                <span className="font-mono font-bold text-noir-900">+{formatPrice(installationCost, language)}</span>
              </div>

              <div className="flex justify-between items-center text-noir-700">
                <span>{t('commissionCost')}</span>
                <span className="font-mono font-bold text-noir-900">+{formatPrice(commissionCost, language)}</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t-2 border-brand-300">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-serif font-bold text-sm text-noir-900">{t('grandTotal')}</span>
                <span className="text-2xl font-serif font-bold text-accent-gold font-mono">
                  {formatPrice(grandTotal, language)}
                </span>
              </div>
              <p className="text-[11px] text-noir-500">
                {isAr ? 'يشمل كافة الخامات، التقطيع الهندسي، مصنعية التركيب، وضمان الجودة.' : 'Includes full materials, custom cutting, site labor, and warranty.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddAllToCart}
                className="w-full py-3.5 px-4 rounded-xl bg-accent-gold text-noir-950 font-bold text-sm shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                {t('addAllToCart')}
              </button>

              <button
                onClick={handleSendWhatsAppEstimate}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Share2 size={16} />
                {t('sendEstimateWhatsApp')}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
