import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { ExternalLink, ShieldCheck, X, AlertTriangle } from 'lucide-react';

interface OfficialLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  schemeName: string;
  language: SupportedLanguage;
}

export const OfficialLinkModal: React.FC<OfficialLinkModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  schemeName,
  language,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const handleProceed = () => {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-emerald-200 relative animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#292326]/60 hover:text-[#292326] rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#4E9F75] flex items-center justify-center mx-auto mb-3 shadow-inner">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h3 className="text-lg sm:text-xl font-black text-[#542A46] text-center">
          {language === 'ta'
            ? 'அதிகாரப்பூர்வ அரசு இணையதளம்'
            : 'Verified Official Government Portal'}
        </h3>

        <p className="text-xs sm:text-sm text-[#292326]/80 text-center mt-2 leading-relaxed font-medium">
          {language === 'ta'
            ? `நீங்கள் இப்போது ${schemeName} திட்டத்திற்கான அதிகாரப்பூர்வ அரசு இணையதளத்திற்குச் செல்ல இருக்கிறீர்கள்.`
            : `You are navigating to the official verified government portal for ${schemeName}.`}
        </p>

        <div className="mt-4 p-3 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC] text-center">
          <span className="text-[11px] font-semibold text-[#292326]/60">
            {language === 'ta' ? 'இணையதள முகவரி:' : 'Official URL:'}
          </span>
          <p className="text-xs sm:text-sm font-extrabold text-[#542A46] break-all mt-0.5">
            {targetUrl}
          </p>
        </div>

        <div className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-950 leading-normal">
            {language === 'ta'
              ? 'அரசு இணையதளங்களில் கடவுச்சொல் மற்றும் விவரங்களை யாரிடமும் பகிர வேண்டாம்.'
              : 'Never share your application passwords or personal banking details with anyone.'}
          </p>
        </div>

        <div className="mt-6 space-y-2.5">
          <button
            onClick={handleProceed}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#4E9F75] hover:bg-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>{t.openOfficialPortal}</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#292326] font-semibold text-xs sm:text-sm transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
