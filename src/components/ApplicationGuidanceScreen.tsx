import React from 'react';
import { SupportedLanguage, GovernmentScheme } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import {
  ExternalLink,
  Volume2,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Building,
  HelpCircle,
} from 'lucide-react';

interface ApplicationGuidanceScreenProps {
  language: SupportedLanguage;
  scheme: GovernmentScheme;
  onOpenOfficialPortal: (url: string) => void;
  onOpenHumanHelp: () => void;
  onFinishGuidance: () => void;
  onSpeakText: (text: string) => void;
  isLargeText: boolean;
}

export const ApplicationGuidanceScreen: React.FC<ApplicationGuidanceScreenProps> = ({
  language,
  scheme,
  onOpenOfficialPortal,
  onOpenHumanHelp,
  onFinishGuidance,
  onSpeakText,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const handleSpeakStep = (stepNumber: number, title: string, desc: string) => {
    const text =
      language === 'ta'
        ? `படி ${stepNumber}: ${title}. ${desc}`
        : `Step ${stepNumber}: ${title}. ${desc}`;
    onSpeakText(text);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 animate-fade-in">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-3 py-1 rounded-full mb-2 inline-block">
          {language === 'ta' ? 'விண்ணப்ப வழிகாட்டி' : 'Application Roadmap'}
        </span>
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {t.guidanceTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1 max-w-md mx-auto">
          {t.guidanceSubtitle}
        </p>
      </div>

      {/* Official Government Website Warning & Link Hero Banner */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#4E9F75]/40 shadow-md mb-6 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 text-[#4E9F75]">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட அரசு தளம்' : 'Verified Government Portal'}
          </h4>
        </div>

        <p className="text-xs text-[#292326]/80 mb-4 leading-normal">
          {t.officialPortalWarning}
        </p>

        {/* Large Prominent Official Link Button */}
        <button
          onClick={() => onOpenOfficialPortal(scheme.officialUrl)}
          className="w-full py-4 px-5 rounded-2xl bg-[#542A46] hover:bg-[#292326] text-white font-extrabold text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2.5"
        >
          <span>{t.openOfficialPortal}</span>
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </button>

        <p className="mt-2 text-[11px] text-center text-[#292326]/60">
          {scheme.officialUrl}
        </p>
      </div>

      {/* 4 Simple Step-by-Step Guidance Cards */}
      <div className="space-y-4 mb-6">
        {scheme.steps.map((step) => {
          const stepTitle = language === 'ta' ? step.title : step.titleEn;
          const stepDesc = language === 'ta' ? step.description : step.descriptionEn;

          return (
            <div
              key={step.stepNumber}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs relative"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#E95D8A] to-[#F47B6C] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
                    {step.stepNumber}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-[#E95D8A] uppercase tracking-wider">
                      {t.stepLabel} {step.stepNumber}
                    </span>
                    <h3
                      className={`font-black text-[#542A46] mt-0.5 leading-snug ${
                        isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}
                    >
                      {stepTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#292326]/80 mt-1 leading-relaxed">
                      {stepDesc}
                    </p>
                  </div>
                </div>

                {/* Voice audio speaker button for this specific step */}
                <button
                  onClick={() => handleSpeakStep(step.stepNumber, stepTitle, stepDesc)}
                  className="p-2 rounded-xl text-[#542A46] bg-[#FFF9F5] border border-[#FCE4EC] hover:bg-[#FCE4EC] shrink-0 transition-colors"
                  title="Listen to this step"
                >
                  <Volume2 className="w-4 h-4 text-[#E95D8A]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Offline / e-Sevai Option */}
      <div className="p-4 rounded-3xl bg-[#FFF9F5] border border-[#FCE4EC] shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#4E9F75] flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
              {language === 'ta'
                ? 'இணையம் வழியாக செய்ய தெரியவில்லையா?'
                : 'Need In-Person Support?'}
            </h4>
            <p className="text-xs text-[#292326]/75">
              {language === 'ta'
                ? 'உங்கள் கிராம அரசு இ-சேவை மையத்தில் கைரேகை பதிவு செய்து முடிக்கலாம்.'
                : 'Visit your nearest government e-Sevai centre with your documents.'}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenHumanHelp}
          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white border border-emerald-300 text-[#4E9F75] font-bold text-xs shadow-xs hover:bg-emerald-50 transition-colors shrink-0"
        >
          {t.findNearbyCentre}
        </button>
      </div>

      {/* Complete Guidance Button */}
      <div className="space-y-3">
        <button
          onClick={onFinishGuidance}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#E95D8A]/25 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2.5"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{t.finishJourney}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
