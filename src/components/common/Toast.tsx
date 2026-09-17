import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-700 shadow-emerald-950/30'
              : toast.type === 'warning'
              ? 'bg-amber-900/90 text-white border-amber-700 shadow-amber-950/30'
              : 'bg-slate-900/90 text-white border-slate-700 shadow-slate-950/30'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
          <div className="text-xs font-medium leading-relaxed">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
