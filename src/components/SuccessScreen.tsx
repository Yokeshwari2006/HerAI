import React from 'react';
import { SupportedLanguage, GovernmentScheme } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import {
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  RotateCcw,
  Sparkles,
  Share2,
  Download,
  Building,
} from 'lucide-react';

interface SuccessScreenProps {
  language: SupportedLanguage;
  scheme: GovernmentScheme;
  onStartAnother: () => void;
  onOpenOfficialPortal: (url: string) => void;
  onOpenHumanHelp: () => void;
  isLargeText: boolean;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  language,
  scheme,
  onStartAnother,
  onOpenOfficialPortal,
  onOpenHumanHelp,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const schemeName = language === 'ta' ? scheme.name : scheme.nameEn;
  const benefitText = language === 'ta' ? scheme.benefitAmount : scheme.benefitAmountEn;

  const handleShareSummary = () => {
    const textToShare = `${schemeName} - ${benefitText}\nஅதிகாரப்பூர்வ தளம்: ${scheme.officialUrl}\nஉதவி எண்: ${scheme.helpline}`;
    if (navigator.share) {
      navigator.share({
        title: schemeName,
        text: textToShare,
        url: scheme.officialUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(textToShare);
      alert(language === 'ta' ? 'விவரங்கள் நகலெடுக்கப்பட்டன!' : 'Details copied to clipboard!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 animate-fade-in text-center">
      {/* Big Success Tick Circle */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-100 text-[#4E9F75] mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4 animate-scale-up">
        <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.5]" />
      </div>

      <h2
        className={`font-black text-[#542A46] tracking-tight leading-tight ${
          isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
        }`}
      >
        {t.successTitle}
      </h2>

      <p className="text-xs sm:text-sm text-[#292326]/75 mt-2 max-w-md mx-auto">
        {t.successSubtitle}
      </p>

      {/* Summary Card */}
      <div className="mt-6 text-left bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#FCE4EC]">
          <span className="text-xs font-bold text-[#E95D8A] uppercase tracking-wider">
            {t.summaryHeading}
          </span>
          <span className="text-[11px] font-semibold text-[#4E9F75] bg-emerald-50 px-2 py-0.5 rounded-full">
            தயாராக உள்ளது ✓
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-extrabold text-[#542A46] text-base sm:text-lg">
            {schemeName}
          </h3>
          <p className="text-xs sm:text-sm font-bold text-[#4E9F75] mt-1">
            {benefitText}
          </p>
        </div>

        {/* Steps recap */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-[#4E9F75]" />
            <span>{language === 'ta' ? 'தகுதி சரிபார்க்கப்பட்டது' : 'Eligibility verified'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-[#4E9F75]" />
            <span>
              {language === 'ta'
                ? 'ஆவணங்களின் பட்டியல் சரிபார்க்கப்பட்டது'
                : 'Document checklist reviewed'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#542A46]">
            <Building className="w-4 h-4 text-[#E95D8A]" />
            <span>
              {language === 'ta'
                ? 'அரசு தளம் அல்லது இ-சேவை மையம் செல்ல தயாராக உள்ளது'
                : 'Ready for official application online or at e-Sevai'}
            </span>
          </div>
        </div>

        {/* Helpline */}
        <div className="mt-5 p-3.5 bg-[#FFF9F5] rounded-2xl border border-[#FCE4EC] flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-[#292326]/70 font-semibold">
              {t.helplineContact}
            </p>
            <p className="text-base font-extrabold text-[#542A46]">
              {scheme.helpline}
            </p>
          </div>
          <a
            href={`tel:${scheme.helpline}`}
            className="py-2 px-3.5 rounded-xl bg-emerald-50 text-[#4E9F75] font-bold text-xs hover:bg-emerald-100 flex items-center gap-1.5 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'அழைக்க' : 'Call'}</span>
          </a>
        </div>
      </div>

      {/* Share / Save */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={handleShareSummary}
          className="py-2.5 px-4 rounded-xl bg-white border border-[#FCE4EC] text-[#542A46] font-bold text-xs hover:bg-[#FCE4EC]/50 flex items-center gap-2 transition-all shadow-2xs"
        >
          <Share2 className="w-3.5 h-3.5 text-[#E95D8A]" />
          <span>{t.saveOrPrint}</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => onOpenOfficialPortal(scheme.officialUrl)}
          className="w-full py-4 px-6 rounded-2xl bg-[#542A46] text-white font-extrabold text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5"
        >
          <span>{t.openOfficialPortal}</span>
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </button>

        <button
          onClick={onStartAnother}
          className="w-full py-3.5 px-4 rounded-2xl bg-white border border-[#FCE4EC] text-[#542A46] font-bold text-xs sm:text-sm hover:bg-[#FCE4EC]/40 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-[#E95D8A]" />
          <span>{t.startAnotherJourney}</span>
        </button>
      </div>
    </div>
  );
};
