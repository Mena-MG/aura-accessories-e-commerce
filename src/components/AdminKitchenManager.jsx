import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Edit2, Trash2, RotateCcw, Image, Check, AlertTriangle, Sparkles, Tag, Layers, DollarSign } from 'lucide-react';
import { formatPrice } from '../data/mockData';

const PRESET_IMAGES = [
  { label: 'Black Granite', url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Calacatta Marble', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000' },
  { label: 'White Corian', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000' },
  { label: 'White PVC Cabinet', url: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Grey Matte Cabinet', url: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Oak Wood Cabinet', url: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Subway Tiles', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Emerald Zellige', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Stainless Double Sink', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Pull-out Faucet', url: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80&w=1000' },
  { label: 'Black Handles', url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=1000' },
  { label: 'LED Under-Cabinet', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000' },
];

export const AdminKitchenManager = () => {
  const { 
    adminModalOpen, 
    setAdminModalOpen, 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    language,
    t
  } = useShop();

  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'form'
  const [editingId, setEditingId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const initialForm = {
    name: '',
    nameAr: '',
    price: 1500,
    originalPrice: 1800,
    unitType: 'per_sqm',
    category: 'Countertops',
    categoryAr: 'أسطح المطبخ (رخام وجرانيت)',
    material: 'Natural Stone',
    materialAr: 'حجر طبيعي',
    finish: 'Polished',
    finishAr: 'تلميع عالي',
    color: 'Obsidian Black',
    colorAr: 'أسود ملكي',
    colorHex: '#1a1a1a',
    thickness: '3.0 cm',
    originCountry: 'Egypt',
    originCountryAr: 'مصر',
    image: PRESET_IMAGES[0].url,
    badge: 'New Arrival',
    badgeAr: 'جديد بالكتالوج',
    shortDescription: 'Premium architectural kitchen material with exceptional durability and refined finish.',
    shortDescriptionAr: 'خامة مطبخ معمارية فاخرة تتميز بالمتانة العالية والمظهر العصري الجذاب.',
    description: 'Bespoke culinary surface tailored for high-end kitchen installations. Impervious to daily wear and easy to maintain.',
    descriptionAr: 'خامة مصممة للمطابخ الراقية، تتحمل الاستخدام اليومي المكثف وتضفي لمسة فخامة للمنزل.',
    features: [
      'Resistant to thermal shocks and daily kitchen moisture',
      'Engineered for seamless installation with micro-beveled edging',
      'Easy to wipe clean with standard pH-neutral cleaners',
      '10-Year manufacturer warranty'
    ],
    featuresAr: [
      'مقاومة ممتازة للحرارة والرطوبة اليومية',
      'مصممة لتركيب سلس ودقيق مع حواف مشطوفة هندسياً',
      'سهلة التنظيف والمسح بمنظفات عادية',
      'ضمان شامل ١٠ سنوات'
    ],
    inStock: true,
    surfaceType: 'countertop'
  };

  const [form, setForm] = useState(initialForm);

  if (!adminModalOpen) return null;

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setForm({
      ...initialForm,
      ...product
    });
    setActiveTab('form');
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setForm(initialForm);
    setActiveTab('form');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    if (editingId) {
      updateProduct(editingId, form);
    } else {
      addProduct(form);
    }
    setActiveTab('list');
    setEditingId(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch = !searchTerm || 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(searchTerm)) ||
      (p.material && p.material.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-brand-50 text-noir-900 border border-brand-200 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-200 bg-brand-100/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/20 text-accent-gold flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-noir-900 flex items-center gap-2">
                {t('adminTitle')}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-gold/20 text-accent-gold font-sans font-semibold">
                  {products.length} {t('productsCount')}
                </span>
              </h2>
              <p className="text-xs text-noir-600 font-sans">{t('adminSubtitle')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'list' ? (
              <button
                onClick={handleAddNewClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-gold text-noir-950 font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
              >
                <Plus size={16} />
                {t('addNewMaterial')}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('list')}
                className="px-4 py-2 rounded-xl bg-brand-200 text-noir-800 font-semibold text-sm hover:bg-brand-300 transition-colors"
              >
                ← {isAr ? 'العودة للقائمة' : 'Back to Catalog List'}
              </button>
            )}

            <button
              onClick={() => setAdminModalOpen(false)}
              className="p-2 rounded-xl hover:bg-brand-200 text-noir-500 hover:text-noir-900 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {activeTab === 'list' && (
            <>
              {/* Search & Filter Toolbar */}
              <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-brand-100/30 p-4 rounded-xl border border-brand-200">
                <div className="w-full md:w-80">
                  <input
                    type="text"
                    placeholder={t('searchMaterials')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  >
                    <option value="all">{t('allCategories')}</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {isAr ? cat.nameAr : cat.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      if (window.confirm(isAr ? 'هل تريد حقاً استعادة البيانات الأصلية لكتالوج المطابخ؟' : 'Reset catalog to default kitchen mock items?')) {
                        resetProductsToDefault();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 text-xs font-semibold whitespace-nowrap transition-colors"
                  >
                    <RotateCcw size={14} />
                    {t('resetDefaults')}
                  </button>
                </div>
              </div>

              {/* Materials Table / Grid */}
              <div className="border border-brand-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-brand-200/60 text-noir-700 font-semibold border-b border-brand-200">
                      <tr>
                        <th className="p-3.5">{isAr ? 'الخامة' : 'Material'}</th>
                        <th className="p-3.5">{isAr ? 'القسم' : 'Category'}</th>
                        <th className="p-3.5">{isAr ? 'السعر' : 'Unit Price'}</th>
                        <th className="p-3.5">{isAr ? 'الوحدة' : 'Unit'}</th>
                        <th className="p-3.5">{isAr ? 'الحالة' : 'Stock'}</th>
                        <th className="p-3.5 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-200">
                      {filteredProducts.map(p => (
                        <tr key={p.id} className="hover:bg-brand-100/40 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 rounded-lg object-cover border border-brand-200 shadow-sm shrink-0"
                            />
                            <div>
                              <p className="font-bold text-noir-900 line-clamp-1">{isAr ? (p.nameAr || p.name) : p.name}</p>
                              <div className="flex items-center gap-2 text-xs text-noir-600">
                                <span>{p.material}</span>
                                {p.colorHex && (
                                  <span 
                                    className="w-3 h-3 rounded-full inline-block border border-noir-400 shrink-0"
                                    style={{ backgroundColor: p.colorHex }}
                                  />
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-xs font-medium text-noir-700">
                            {isAr ? (p.categoryAr || p.category) : p.category}
                          </td>
                          <td className="p-3.5 font-bold text-noir-900 whitespace-nowrap">
                            {formatPrice(p.price, language)}
                          </td>
                          <td className="p-3.5 text-xs text-noir-600">
                            <span className="px-2 py-0.5 rounded-md bg-brand-200/80 font-mono">
                              {p.unitType ? p.unitType.replace('_', ' ') : 'm²'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {p.inStock ? (isAr ? 'متوفر' : 'In Stock') : (isAr ? 'نفذ' : 'Out of Stock')}
                            </span>
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleEditClick(p)}
                                className="p-2 rounded-lg bg-brand-200 text-noir-800 hover:bg-accent-gold hover:text-noir-950 transition-colors"
                                title={t('editMaterial')}
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(isAr ? `حذف "${p.nameAr || p.name}" من الكتالوج؟` : `Delete "${p.name}"?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                                title={t('deleteMaterial')}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Names (EN + AR) */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('materialNameEn')} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Imperial White Granite Slab"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('materialNameAr')} *</label>
                  <input
                    type="text"
                    required
                    value={form.nameAr}
                    onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                    placeholder="مثال: رخام إمبريال وايت أسباني فاخر"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                {/* Price & Unit Type */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('priceUnit')} *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('unitType')} *</label>
                  <select
                    value={form.unitType}
                    onChange={(e) => setForm({ ...form, unitType: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  >
                    <option value="per_sqm">{t('perSqm')}</option>
                    <option value="per_linear_meter">{t('perLM')}</option>
                    <option value="per_piece">{t('perPiece')}</option>
                    <option value="per_set">{t('perSet')}</option>
                  </select>
                </div>

                {/* Category & 3D Surface Type */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('materialCategory')}</label>
                  <select
                    value={form.category}
                    onChange={(e) => {
                      const selected = categories.find(c => c.name === e.target.value);
                      setForm({
                        ...form,
                        category: e.target.value,
                        categoryAr: selected ? selected.nameAr : form.categoryAr
                      });
                    }}
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name} ({c.nameAr})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">
                    {isAr ? 'نوع السطح المعماري للـ 3D Studio' : '3D Studio Surface Binding'}
                  </label>
                  <select
                    value={form.surfaceType || 'countertop'}
                    onChange={(e) => setForm({ ...form, surfaceType: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold font-medium"
                  >
                    <option value="countertop">{t('surfaceCountertop')}</option>
                    <option value="cabinet">{t('surfaceCabinet')}</option>
                    <option value="backsplash">{t('surfaceBacksplash')}</option>
                    <option value="none">{isAr ? 'إكسسوار / جهاز (غير معروض في الـ 3D)' : 'Accessory / Appliance (No 3D Surface)'}</option>
                  </select>
                </div>

                {/* Material & Finish */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('materialType')}</label>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    placeholder="e.g. Natural Granite, Quartz, Acrylic"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('finishType')}</label>
                  <input
                    type="text"
                    value={form.finish}
                    onChange={(e) => setForm({ ...form, finish: e.target.value })}
                    placeholder="e.g. Mirror Polished, Velvet Matte, Brushed"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                {/* Color Name & Color Hex Swatch */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('colorName')}</label>
                  <input
                    type="text"
                    value={form.color}
                    onChange={(e) => setForm({ ...form, color: e.target.value })}
                    placeholder="e.g. Obsidian Black with Golden Veins"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-noir-700 mb-1">{t('colorHex')}</label>
                    <input
                      type="text"
                      value={form.colorHex}
                      onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                      placeholder="#121217"
                      className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold font-mono"
                    />
                  </div>
                  <div className="pt-5">
                    <input
                      type="color"
                      value={form.colorHex || '#121217'}
                      onChange={(e) => setForm({ ...form, colorHex: e.target.value })}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-brand-200 p-0.5 bg-brand-50"
                    />
                  </div>
                </div>

                {/* Thickness & Origin */}
                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('thickness')}</label>
                  <input
                    type="text"
                    value={form.thickness}
                    onChange={(e) => setForm({ ...form, thickness: e.target.value })}
                    placeholder="e.g. 3.0 cm, 18 mm"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-noir-700 mb-1">{t('originCountry')}</label>
                  <input
                    type="text"
                    value={form.originCountry}
                    onChange={(e) => setForm({ ...form, originCountry: e.target.value })}
                    placeholder="e.g. Spain, Germany, Egypt, India"
                    className="w-full px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('imageUrl')} *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                  />
                  {form.image && (
                    <img 
                      src={form.image} 
                      alt="Preview" 
                      className="w-10 h-10 rounded-xl object-cover border border-brand-200 shrink-0" 
                    />
                  )}
                </div>

                {/* Quick Presets */}
                <div className="mt-2">
                  <p className="text-xs text-noir-500 mb-1.5">{t('imagePreset')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setForm({ ...form, image: preset.url })}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          form.image === preset.url 
                            ? 'bg-accent-gold text-noir-950 border-accent-gold font-bold shadow-sm' 
                            : 'bg-brand-100 text-noir-700 border-brand-200 hover:bg-brand-200'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stock Status Checkbox */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-brand-100/40 border border-brand-200">
                <input
                  type="checkbox"
                  id="inStockCheckbox"
                  checked={form.inStock}
                  onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                  className="w-5 h-5 accent-accent-gold rounded cursor-pointer"
                />
                <label htmlFor="inStockCheckbox" className="text-sm font-bold text-noir-900 cursor-pointer">
                  {t('inStockStatus')}
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-5 py-2.5 rounded-xl border border-brand-300 text-noir-700 hover:bg-brand-200 text-sm font-semibold transition-colors"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-gold text-noir-950 text-sm font-bold shadow-lg hover:opacity-90 transition-opacity"
                >
                  <Check size={18} />
                  {t('saveChanges')}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
