import React from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, UserProfile } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import {
  ShieldCheck,
  PhoneCall,
  Volume2,
  Type,
  User,
  Sparkles,
  HelpCircle,
  Menu,
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile';
  onSelectTab: (tab: 'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile') => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenSafety: () => void;
  onOpenHumanHelp: () => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  user: UserProfile | null;
  isFirstTimeUserMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onLanguageChange,
  onOpenSafety,
  onOpenHumanHelp,
  isLargeText,
  onToggleLargeText,
  isSpeaking,
  onStopSpeaking,
  user,
  isFirstTimeUserMode,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#FCE4EC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Official HerAI Logo & Brand */}
        <button
          onClick={() => onSelectTab('home')}
          className="inline-flex flex-row items-center shrink-0 flex-nowrap whitespace-nowrap gap-2.5 text-left focus-visible:outline-[#E95D8A] rounded-xl p-1 -ml-1 transition-opacity hover:opacity-90 cursor-pointer"
          title="HerAI Home"
        >
          <HerAiLogo size="md" showText={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FCE4EC]/50 p-1.5 rounded-2xl border border-[#FCE4EC]/70">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'home'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/75 hover:text-[#542A46]'
            }`}
          >
            {t.navHome}
          </button>

          <button
            onClick={() => onSelectTab('assistant')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'assistant'
                ? 'bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white shadow-xs'
                : 'text-[#292326]/75 hover:text-[#542A46]'
            }`}
          >
            <span>🎙️</span>
            <span>{t.navAssistant}</span>
          </button>

          <button
            onClick={() => onSelectTab('schemes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'schemes'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/75 hover:text-[#542A46]'
            }`}
          >
            {t.navSchemes}
          </button>

          <button
            onClick={() => onSelectTab('journey')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'journey'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/75 hover:text-[#542A46]'
            }`}
          >
            {t.navJourney}
          </button>

          <button
            onClick={() => onSelectTab('saved')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentTab === 'saved'
                ? 'bg-white text-[#542A46] shadow-xs'
                : 'text-[#292326]/75 hover:text-[#542A46]'
            }`}
          >
            {t.navSaved}
          </button>
        </nav>

        {/* Global Controls & Accessibility */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Speaking Indicator */}
          {isSpeaking && (
            <button
              onClick={onStopSpeaking}
              className="flex items-center gap-1 text-xs font-bold text-white bg-[#E95D8A] px-2.5 py-1.5 rounded-full animate-pulse shadow-xs"
              title="Stop voice playback"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.stopVoice}</span>
            </button>
          )}

          {/* First-Time User Mode indicator */}
          {isFirstTimeUserMode && (
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-[#E95D8A] bg-[#FCE4EC] px-2 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple Mode</span>
            </span>
          )}

          {/* Large Text Accessibility Toggle */}
          <button
            onClick={onToggleLargeText}
            className={`p-2 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1 ${
              isLargeText
                ? 'bg-[#542A46] text-white shadow-xs'
                : 'bg-[#FCE4EC]/60 text-[#542A46] hover:bg-[#FCE4EC]'
            }`}
            title="Toggle Large Text for readability"
            aria-label="Toggle text size"
          >
            <Type className="w-4 h-4" />
            <span className="text-[10px]">{isLargeText ? 'A+' : 'A'}</span>
          </button>

          {/* Safety Center button */}
          <button
            onClick={onOpenSafety}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#542A46] bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-colors shadow-2xs"
            title={t.safetyCenter}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span className="hidden xl:inline">{t.safetyCenter}</span>
          </button>

          {/* Human Help Call button */}
          <button
            onClick={onOpenHumanHelp}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#4E9F75] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors shadow-2xs"
            title={t.humanHelp}
          >
            <PhoneCall className="w-4 h-4 text-[#4E9F75]" />
            <span className="hidden sm:inline">{t.humanHelp}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Communication language"
              className="bg-white border border-[#FCE4EC] rounded-xl px-2.5 py-1.5 text-xs font-extrabold text-[#542A46] shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#E95D8A]/30 cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {/* Profile / Account Button */}
          <button
            onClick={() => onSelectTab('profile')}
            className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'profile'
                ? 'bg-[#542A46] text-white shadow-xs'
                : 'bg-white border border-[#FCE4EC] text-[#542A46] hover:bg-[#FCE4EC]/50 shadow-2xs'
            }`}
            title="Profile & Settings"
            aria-label="Profile and Settings"
          >
            <User className="w-4 h-4 text-[#E95D8A]" />
            <span className="hidden lg:inline text-xs font-bold">
              {user && user.email !== 'guest@herai.app' ? user.name.split(' ')[0] : 'Account'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
