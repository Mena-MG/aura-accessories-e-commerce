import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-slate-600 flex-shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up max-w-sm w-full">
      <div className="bg-white/95 backdrop-blur-md border border-brand-200/80 shadow-floating rounded-2xl p-4 flex items-center gap-3">
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium text-noir-900 flex-1">{toast.message}</p>
      </div>
    </div>
  );
};
