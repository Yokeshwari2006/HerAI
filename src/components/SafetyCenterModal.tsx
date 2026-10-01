import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { VERIFIED_EMERGENCY_HELPLINES } from '../../shared/schemesData';
import {
  ShieldAlert,
  X,
  PhoneOff,
  AlertTriangle,
  Lock,
  PhoneCall,
  CheckCircle2,
  Building2,
  HeartHandshake,
} from 'lucide-react';

interface SafetyCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const SafetyCenterModal: React.FC<SafetyCenterModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border-2 border-amber-300 relative max-h-[90vh] overflow-y-auto animate-scale-up">
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
          {t.safetyHeroTitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#292326]/80 text-center mt-2 leading-relaxed font-medium">
          {t.safetyHeroDesc}
        </p>

        {/* 3 Golden Safety Rules */}
        <div className="mt-4 space-y-2.5 text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-red-50 border border-red-200">
            <PhoneOff className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-red-950">
                Rule 1: Never Share Banking PIN or OTP
              </h4>
              <p className="text-xs text-red-900 mt-0.5 leading-snug">
                {t.safetyRule1}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-amber-950">
                Rule 2: Zero Fees for Government Schemes
              </h4>
              <p className="text-xs text-amber-900 mt-0.5 leading-snug">
                {t.safetyRule2}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-emerald-950">
                Rule 3: Use Only Authorized Centres
              </h4>
              <p className="text-xs text-emerald-900 mt-0.5 leading-snug">
                {t.safetyRule3}
              </p>
            </div>
          </div>
        </div>

        {/* Verified Toll-Free Helpline Numbers for Immediate Help */}
        <div className="mt-5 text-left">
          <h4 className="text-xs font-bold text-[#542A46] uppercase tracking-wider mb-2.5">
            Verified Official Helplines (24/7 Toll-Free):
          </h4>

          <div className="space-y-2">
            {VERIFIED_EMERGENCY_HELPLINES.map((hl) => (
              <div
                key={hl.number}
                className="p-3 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC] flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#542A46]">
                      {hl.number}
                    </span>
                    <span className="text-xs font-bold text-[#4E9F75]">
                      {hl.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#292326]/70 mt-0.5 line-clamp-1">
                    {hl.desc}
                  </p>
                </div>

                <a
                  href={`tel:${hl.number}`}
                  className="py-1.5 px-3 rounded-xl bg-[#4E9F75] hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 transition-colors shrink-0 shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-[#542A46] hover:bg-[#292326] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
          >
            I Understand & Will Stay Safe
          </button>
        </div>
      </div>
    </div>
  );
};
