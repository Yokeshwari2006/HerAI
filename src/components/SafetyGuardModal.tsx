import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { ShieldAlert, X, Check, Lock, AlertTriangle, PhoneOff } from 'lucide-react';

interface SafetyGuardModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const SafetyGuardModal: React.FC<SafetyGuardModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-amber-300 relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#292326]/60 hover:text-[#292326] rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-[#542A46] text-center">
          {t.safetyTitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#292326]/80 text-center mt-2 leading-relaxed font-medium">
          {t.safetyDesc}
        </p>

        {/* 3 Golden Safety Rules */}
        <div className="mt-4 space-y-2.5 text-left">
          <div className="flex items-start gap-3 p-3 rounded-2xl bg-red-50 border border-red-200">
            <PhoneOff className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-red-950 leading-snug">
              {t.safetyRule1}
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber-950 leading-snug">
              {t.safetyRule2}
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-emerald-950 leading-snug">
              {t.safetyRule3}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#542A46] hover:bg-[#292326] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{t.safetyButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
