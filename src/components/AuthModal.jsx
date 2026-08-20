import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Shield, Zap, Phone, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, user, loginUser, loginAsGuest, logoutUser, language, t } = useShop();
  const [activeTab, setActiveTab] = useState('customer'); // 'customer' | 'admin' | 'register'
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  if (!authModalOpen) return null;

  const isAr = language === 'ar';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!phone || !password) return;

    if (activeTab === 'admin') {
      loginUser(phone, password, 'admin', fullName || 'Store Admin');
    } else {
      loginUser(phone, password, 'customer', fullName || (isAr ? 'عميل موثق' : 'Verified Client'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-brand-50 text-noir-900 border border-brand-200 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-brand-200 bg-brand-100/50">
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-1.5 rounded-xl hover:bg-brand-200 text-noir-500 hover:text-noir-900 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/20 text-accent-gold flex items-center justify-center font-bold text-lg">
              ✨
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-noir-900">{t('authTitle')}</h2>
              <p className="text-xs text-noir-600 font-sans">{t('authSubtitle')}</p>
            </div>
          </div>

          {/* User Status if currently logged in */}
          {user && (
            <div className="mt-3 p-2.5 rounded-xl bg-brand-200/60 border border-brand-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600" />
                <span className="font-semibold text-noir-800">
                  {t('loggedInAs')}: <strong className="text-noir-950">{user.name}</strong> ({user.role === 'admin' ? t('adminBadge') : t('guestBadge')})
                </span>
              </div>
              <button
                onClick={logoutUser}
                className="text-red-600 font-bold hover:underline"
              >
                {t('logout')}
              </button>
            </div>
          )}
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-brand-200 bg-brand-100/20 text-xs font-bold">
          <button
            onClick={() => setActiveTab('customer')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'customer'
                ? 'border-accent-gold text-accent-gold bg-brand-50'
                : 'border-transparent text-noir-600 hover:text-noir-900'
            }`}
          >
            <User size={14} />
            {t('tabCustomer')}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'border-accent-gold text-accent-gold bg-brand-50'
                : 'border-transparent text-noir-600 hover:text-noir-900'
            }`}
          >
            <Shield size={14} />
            {t('tabAdmin')}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-center border-b-2 transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'border-accent-gold text-accent-gold bg-brand-50'
                : 'border-transparent text-noir-600 hover:text-noir-900'
            }`}
          >
            <Sparkles size={14} />
            {t('tabRegister')}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Quick Guest Accounts (Frictionless Test Access) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-accent-gold/10 via-brand-100/40 to-brand-100/10 border border-accent-gold/30 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-accent-gold uppercase tracking-wider">
              <Zap size={14} />
              {isAr ? 'دخول فوري بدون كلمة سر (للاختبار السريع)' : 'Instant Test Access (No Password Required)'}
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                type="button"
                onClick={() => loginAsGuest('customer')}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-50 hover:bg-brand-100 text-noir-900 border border-brand-300 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:border-accent-gold"
              >
                <User size={15} className="text-accent-gold" />
                {t('guestCustomerButton')}
              </button>

              <button
                type="button"
                onClick={() => loginAsGuest('admin')}
                className="w-full py-2.5 px-4 rounded-xl bg-accent-gold text-noir-950 text-xs font-bold hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Shield size={15} />
                {t('guestAdminButton')}
              </button>
            </div>
            
            <p className="text-[11px] text-noir-600 text-center">{t('guestNote')}</p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-brand-200"></div>
            <span className="flex-shrink mx-3 text-[11px] text-noir-500 uppercase tracking-widest font-semibold">
              {isAr ? 'أو سجل الدخول يدوياً' : 'Or Sign In with Phone'}
            </span>
            <div className="flex-grow border-t border-brand-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-3.5">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-noir-700 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-noir-700 mb-1">{t('phone')}</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-noir-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t('phonePlaceholder')}
                  className="w-full pl-10 pr-3.5 rtl:pr-10 rtl:pl-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-noir-700 mb-1">{t('password')}</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-3 text-noir-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  className="w-full pl-10 pr-3.5 rtl:pr-10 rtl:pl-3.5 py-2.5 rounded-xl border border-brand-200 bg-brand-50 text-sm focus:ring-2 focus:ring-accent-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-noir-900 text-brand-50 text-sm font-bold shadow-md hover:bg-noir-800 transition-colors"
            >
              {activeTab === 'register' ? t('registerButton') : t('loginButton')}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
