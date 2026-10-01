import React, { useState } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  UserProfile,
  JourneyHistoryItem,
} from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import {
  User,
  ShieldCheck,
  Globe,
  Volume2,
  Clock,
  Sparkles,
  Lock,
  LogOut,
  LogIn,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface ProfileScreenProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  user: UserProfile | null;
  history: JourneyHistoryItem[];
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  onOpenSafetyCenter: () => void;
  isFirstTimeUserMode: boolean;
  onToggleFirstTimeMode: () => void;
  voiceSpeed: number;
  onChangeVoiceSpeed: (speed: number) => void;
  autoPlayVoice: boolean;
  onToggleAutoPlayVoice: () => void;
  isLargeText: boolean;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  language,
  onLanguageChange,
  user,
  history,
  onOpenAuthModal,
  onSignOut,
  onOpenSafetyCenter,
  isFirstTimeUserMode,
  onToggleFirstTimeMode,
  voiceSpeed,
  onChangeVoiceSpeed,
  autoPlayVoice,
  onToggleAutoPlayVoice,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const isGuest = !user || user.email === 'guest@herai.app';

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {t.navProfile} & Settings
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1">
          Manage your communication preferences, voice speed, and account.
        </p>
      </div>

      {/* Account Card (Guest vs Signed-In) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E95D8A] via-[#F47B6C] to-[#FCE4EC] text-white flex items-center justify-center font-black text-xl shadow-xs">
              {isGuest ? 'G' : user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-[#542A46] text-base sm:text-lg">
                  {isGuest ? t.guestUser : user.name}
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FCE4EC] text-[#E95D8A]">
                  {isGuest ? 'No Login Required' : 'Active Account'}
                </span>
              </div>
              <p className="text-xs text-[#292326]/60 mt-0.5">
                {isGuest ? 'Using HerAI without sign-in' : user.email}
              </p>
            </div>
          </div>

          <div>
            {isGuest ? (
              <button
                onClick={onOpenAuthModal}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-xs shadow-xs hover:opacity-95 active:scale-95 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{t.signInCreateAccount}</span>
              </button>
            ) : (
              <button
                onClick={onSignOut}
                className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#292326] font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.signOut}</span>
              </button>
            )}
          </div>
        </div>

        {isGuest && (
          <p className="mt-4 pt-3 border-t border-[#FCE4EC]/70 text-xs text-[#292326]/75">
            💡 {t.saveAccountBenefit}
          </p>
        )}
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-xs mb-6 space-y-5">
        <h3 className="text-sm font-black text-[#542A46] uppercase tracking-wider">
          Preferences & Voice
        </h3>

        {/* Language Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#FCE4EC]">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
              {t.languagePreference}
            </h4>
            <p className="text-xs text-[#292326]/70">
              Select which regional language HerAI speaks and responds in.
            </p>
          </div>

          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-[#FFF9F5] border border-[#FCE4EC] rounded-xl px-3 py-2 text-xs font-bold text-[#542A46] focus:outline-none focus:ring-2 focus:ring-[#E95D8A]/30 cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* First-Time User Mode Toggle */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#FCE4EC]">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#E95D8A]" />
              <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
                {t.firstTimeMode}
              </h4>
            </div>
            <p className="text-xs text-[#292326]/70 mt-0.5">
              {t.firstTimeModeDesc}
            </p>
          </div>

          <button
            onClick={onToggleFirstTimeMode}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              isFirstTimeUserMode ? 'bg-[#E95D8A]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                isFirstTimeUserMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Auto-Play Toggle */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#FCE4EC]">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
              {t.autoPlayAudio}
            </h4>
            <p className="text-xs text-[#292326]/70 mt-0.5">
              Automatically speaks out AI guidance responses when received.
            </p>
          </div>

          <button
            onClick={onToggleAutoPlayVoice}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              autoPlayVoice ? 'bg-[#4E9F75]' : 'bg-slate-200'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform transform ${
                autoPlayVoice ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Voice Speed Slider */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
              {t.voiceSpeed}: {voiceSpeed}x
            </h4>
            <p className="text-xs text-[#292326]/70">
              Slower pace is recommended for elderly and first-time users.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#292326]/60">0.8x</span>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={voiceSpeed}
              onChange={(e) => onChangeVoiceSpeed(parseFloat(e.target.value))}
              className="accent-[#E95D8A] cursor-pointer"
            />
            <span className="text-[11px] font-bold text-[#292326]/60">1.2x</span>
          </div>
        </div>
      </div>

      {/* Journey History Timeline */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-xs mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[#E95D8A]" />
          <h3 className="text-sm sm:text-base font-black text-[#542A46]">
            {t.journeyHistory}
          </h3>
        </div>

        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC] flex items-start gap-3"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-100 text-[#4E9F75] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#292326]/50">
                    {item.dateStr}
                  </span>
                </div>
                <p className="text-xs text-[#292326]/75 mt-0.5 leading-normal">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety & Privacy Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Safety Center Card */}
        <div
          onClick={onOpenSafetyCenter}
          className="p-5 rounded-3xl bg-amber-50/80 border border-amber-200 cursor-pointer hover:bg-amber-100/70 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-amber-950">
              {t.safetyCenter}
            </h4>
            <p className="text-xs text-amber-900/80 mt-1 leading-normal">
              Learn how to avoid digital fraud, phone scams, and fake government agents.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-800">
            <span>Open Safety Center</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Privacy Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#FCE4EC] flex flex-col justify-between shadow-xs">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-[#FCE4EC] text-[#E95D8A] flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-[#542A46]">
              {t.privacyTitle}
            </h4>
            <p className="text-xs text-[#292326]/75 mt-1 leading-normal">
              {t.privacyDesc}
            </p>
          </div>
          <div className="mt-4 text-[11px] font-semibold text-[#4E9F75]">
            ✓ Zero Sensitive Identity Storage
          </div>
        </div>
      </div>

      {/* Official HerAI Branding Display */}
      <div className="mt-8 p-6 bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-white rounded-3xl border border-[#FCE4EC] flex flex-col items-center text-center shadow-xs">
        <HerAiLogo size="md" showText={true} />
        <p className="text-xs font-semibold text-[#542A46] mt-2.5">
          {t.tagline}
        </p>
        <p className="text-[11px] text-[#292326]/60 mt-1 max-w-sm">
          HerAI Multilingual Digital Assistant for Women. Designed for zero-barrier voice navigation.
        </p>
      </div>
    </div>
  );
};
