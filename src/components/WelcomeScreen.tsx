import React from 'react';
import { SupportedLanguage, GovernmentScheme, SUPPORTED_LANGUAGES } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import {
  Mic,
  Keyboard,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ExternalLink,
  Globe,
} from 'lucide-react';

interface WelcomeScreenProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onStartVoice: () => void;
  onStartType: () => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  schemes: GovernmentScheme[];
  isLargeText: boolean;
  isFirstTimeUserMode: boolean;
  onToggleFirstTimeMode: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  language,
  onLanguageChange,
  onStartVoice,
  onStartType,
  onSelectScheme,
  schemes,
  isLargeText,
  isFirstTimeUserMode,
  onToggleFirstTimeMode,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 animate-fade-in">
      {/* Hero Brand Section */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        {/* Official HerAI Logo */}
        <div className="mb-4 transform hover:scale-[1.02] transition-transform duration-300">
          <HerAiLogo size="xl" variant="full" />
        </div>

        {/* Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE4EC] border border-[#E95D8A]/20 shadow-xs mb-3">
          <Sparkles className="w-4 h-4 text-[#E95D8A]" />
          <span className="text-xs sm:text-sm font-extrabold text-[#542A46] tracking-wide">
            {t.tagline}
          </span>
        </div>

        {/* Core Application Description */}
        <p
          className={`font-semibold text-[#292326] max-w-xl mx-auto leading-relaxed mt-2 ${
            isLargeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
          }`}
        >
          {t.heroDescription}
        </p>

        {/* Supporting statement */}
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-3 max-w-md mx-auto leading-normal">
          {t.supportingStatement}
        </p>

        {/* Core Principle Quote */}
        <div className="mt-5 px-5 py-3 bg-white border border-[#FCE4EC] rounded-2xl shadow-xs max-w-md">
          <p className="text-xs sm:text-sm font-bold text-[#542A46] italic">
            &ldquo;{t.corePrinciple}&rdquo;
          </p>
        </div>

        {/* First-Time User Mode Toggle Banner */}
        <div className="mt-6 w-full max-w-md p-3.5 bg-gradient-to-r from-[#FCE4EC]/70 to-[#FFF9F5] rounded-2xl border border-[#E95D8A]/30 flex items-center justify-between gap-3 text-left">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white text-[#E95D8A] shadow-2xs flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#542A46]">
                {t.firstTimeMode} (Zero-Learning)
              </h4>
              <p className="text-[11px] text-[#292326]/75 leading-tight mt-0.5">
                {t.firstTimeModeDesc}
              </p>
            </div>
          </div>

          <button
            onClick={onToggleFirstTimeMode}
            className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
              isFirstTimeUserMode
                ? 'bg-[#E95D8A] text-white shadow-xs'
                : 'bg-white border border-[#E95D8A]/30 text-[#542A46]'
            }`}
          >
            {isFirstTimeUserMode ? 'Active ✓' : 'Enable'}
          </button>
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="mt-6 w-full max-w-md flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onStartVoice}
            className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#E95D8A]/30 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2.5"
          >
            <Mic className="w-6 h-6 animate-pulse" />
            <span>{t.startWithVoice}</span>
          </button>

          <button
            onClick={onStartType}
            className="w-full sm:flex-initial py-4 px-6 rounded-2xl bg-white border border-[#FCE4EC] text-[#542A46] font-extrabold text-sm sm:text-base shadow-xs hover:bg-[#FCE4EC]/30 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <Keyboard className="w-5 h-5 text-[#E95D8A]" />
            <span>{t.typeYourQuestion}</span>
          </button>
        </div>

        {/* Small Language Indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs text-[#292326]/70">
          <span>Communication Language:</span>
          <span className="font-extrabold text-[#E95D8A] bg-[#FCE4EC] px-2 py-0.5 rounded-md">
            {language.toUpperCase()}
          </span>
          <span>(Multilingual AI understands any language)</span>
        </div>
      </div>

      {/* 3 Pillar Features */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#FCE4EC] text-[#E95D8A] flex items-center justify-center mb-3">
            <Mic className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#542A46]">
            Voice-First Guidance
          </h3>
          <p className="text-xs text-[#292326]/75 mt-1 leading-relaxed">
            No typing or reading complicated forms. Speak naturally in your native language, and HerAI explains every step aloud.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#4E9F75] flex items-center justify-center mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#542A46]">
            Verified Scheme Database
          </h3>
          <p className="text-xs text-[#292326]/75 mt-1 leading-relaxed">
            All eligibility rules, documents, and benefits are grounded in official government orders. Zero AI hallucination.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#FCE4EC] shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-[#542A46]">
            Digital Safety Guard
          </h3>
          <p className="text-xs text-[#292326]/75 mt-1 leading-relaxed">
            Strict protection against digital scams. HerAI never asks for OTP, UPI PIN, or passwords, and warns against fake agents.
          </p>
        </div>
      </div>

      {/* Featured Verified Government Schemes Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#542A46]">
              Verified Essential Schemes
            </h3>
            <p className="text-xs text-[#292326]/70 mt-0.5">
              Direct benefit transfers, enterprise equipment, and pensions for women
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.slice(0, 6).map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => onSelectScheme(scheme)}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-[#FCE4EC] hover:border-[#E95D8A] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold text-[#E95D8A] bg-[#FCE4EC] px-2 py-0.5 rounded-lg inline-block mb-2">
                  {scheme.badgeEn}
                </span>

                <h4 className="text-sm font-bold text-[#542A46] group-hover:text-[#E95D8A] transition-colors leading-snug">
                  {scheme.nameEn}
                </h4>

                <p className="text-xs font-extrabold text-[#4E9F75] mt-1">
                  {scheme.benefitAmountEn}
                </p>

                <p className="text-xs text-[#292326]/70 mt-2 line-clamp-2 leading-relaxed">
                  {scheme.purposeEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#FCE4EC]/70 flex items-center justify-between text-xs font-bold text-[#542A46]">
                <span>Check Eligibility</span>
                <div className="w-7 h-7 rounded-full bg-[#FFF9F5] flex items-center justify-center text-[#E95D8A] group-hover:bg-[#E95D8A] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
