import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { VERIFIED_EMERGENCY_HELPLINES } from '../../shared/schemesData';
import { PhoneCall, Building2, MapPin, X, Users, HeartHandshake } from 'lucide-react';

interface HumanHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const HumanHelpModal: React.FC<HumanHelpModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-[#FCE4EC] relative max-h-[90vh] overflow-y-auto animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#292326]/60 hover:text-[#292326] rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#4E9F75] flex items-center justify-center mx-auto mb-3 shadow-inner">
          <HeartHandshake className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-[#542A46] text-center">
          {t.humanHelpTitle}
        </h3>

        <p className="text-xs sm:text-sm text-[#292326]/80 text-center mt-1 leading-relaxed max-w-sm mx-auto">
          {t.humanHelpDesc}
        </p>

        {/* Local In-Person Help Points */}
        <div className="mt-5 space-y-3">
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC] flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FCE4EC] text-[#E95D8A] flex items-center justify-center shrink-0 mt-0.5">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
                {t.nearbyESevai}
              </h4>
              <p className="text-xs text-[#292326]/75 mt-0.5 leading-normal">
                {t.nearbyESevaiDesc}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#E95D8A]">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {language === 'ta'
                    ? 'உங்கள் தாலுகா / கிராம பஞ்சாயத்து'
                    : 'Your Taluk / Village Panchayat'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Toll-Free Telephone Lines */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-[#542A46] uppercase tracking-wider mb-2.5">
            {language === 'ta' ? 'அரசு இலவச உதவி எண்கள் (Toll Free):' : 'Official Helplines:'}
          </h4>

          <div className="space-y-2.5">
            {VERIFIED_EMERGENCY_HELPLINES.map((hl) => {
              const name = language === 'ta' ? hl.nameTa : hl.name;
              const desc = language === 'ta' ? hl.descTa : hl.desc;

              return (
                <div
                  key={hl.number}
                  className="p-3 rounded-2xl bg-white border border-emerald-200/80 shadow-2xs flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#542A46]">
                        {hl.number}
                      </span>
                      <span className="text-xs font-bold text-[#4E9F75]">
                        {name}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#292326]/70 mt-0.5 line-clamp-1">
                      {desc}
                    </p>
                  </div>

                  <a
                    href={`tel:${hl.number}`}
                    className="py-2 px-3 rounded-xl bg-[#4E9F75] hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t.callNow}</span>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#292326] font-bold text-xs sm:text-sm transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
