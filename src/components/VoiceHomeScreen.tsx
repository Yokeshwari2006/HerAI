import React from 'react';
import { SupportedLanguage, GovernmentScheme } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import { VoiceOrb, VoiceOrbState } from './VoiceOrb';
import { Keyboard, ArrowRight, Sparkles, MessageCircle, HelpCircle } from 'lucide-react';

interface VoiceHomeScreenProps {
  language: SupportedLanguage;
  schemes: GovernmentScheme[];
  onSelectPrompt: (promptText: string, schemeId?: string) => void;
  onOpenTypeMode: () => void;
  voiceOrbState: VoiceOrbState;
  onToggleVoice: () => void;
  isLargeText: boolean;
  isFirstTimeUserMode: boolean;
  onToggleFirstTimeMode: () => void;
}

export const VoiceHomeScreen: React.FC<VoiceHomeScreenProps> = ({
  language,
  schemes,
  onSelectPrompt,
  onOpenTypeMode,
  voiceOrbState,
  onToggleVoice,
  isLargeText,
  isFirstTimeUserMode,
  onToggleFirstTimeMode,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const quickSuggestions = [
    {
      schemeId: 'kmut_scheme',
      prompt: language === 'ta' ? 'எனக்கு மகளிர் உரிமைத் தொகை ₹1,000 கிடைக்குமா?' : 'Check my eligibility for ₹1,000 monthly scheme',
      badge: language === 'ta' ? 'மாதம் ₹1,000' : 'Monthly ₹1,000',
      color: 'border-[#E95D8A]/30 bg-[#FCE4EC]/40',
    },
    {
      schemeId: 'free_sewing_machine',
      prompt: language === 'ta' ? 'பெண்களுக்கான இலவச தையல் இயந்திரம் எப்படி வாங்குவது?' : 'How can I get a free sewing machine for women?',
      badge: language === 'ta' ? 'இலவச தையல் மெஷின்' : 'Free Sewing Machine',
      color: 'border-pink-200 bg-pink-50/50',
    },
    {
      schemeId: 'pudhumai_penn',
      prompt: language === 'ta' ? 'கல்லூரி படிக்கும் மகளுக்கு புதுமைப் பெண் உதவி உண்டா?' : 'What documents do I need for my daughter’s college aid?',
      badge: language === 'ta' ? 'மாணவிகளுக்கு ₹1,000' : 'College Aid ₹1,000',
      color: 'border-purple-200 bg-purple-50/50',
    },
    {
      schemeId: 'destitute_widow_pension',
      prompt: language === 'ta' ? 'விதவை உதவித்தொகை மற்றும் ஓய்வூதியம் பெற என்ன செய்ய வேண்டும்?' : 'Tell me about widow pension assistance',
      badge: language === 'ta' ? 'ஓய்வூதியம் ₹1,200' : 'Pension ₹1,200',
      color: 'border-emerald-200 bg-emerald-50/50',
    },
    {
      schemeId: 'matru_vandana',
      prompt: language === 'ta' ? 'கர்ப்பிணி பெண்களுக்கு மகப்பேறு உதவித்தொகை எப்படி பெறுவது?' : 'How to apply for pregnant mother nutrition funds?',
      badge: language === 'ta' ? 'மகப்பேறு ₹5,000' : 'Maternity ₹5,000',
      color: 'border-amber-200 bg-amber-50/50',
    },
    {
      schemeId: 'pm_vishwakarma',
      prompt: language === 'ta' ? 'விஸ்வகர்மா தையல் கலைஞர் ₹15,000 கருவி மானியம் பெறுவது எப்படி?' : 'How to get ₹15,000 toolkit voucher for women artisans?',
      badge: language === 'ta' ? 'கருவி மானியம் ₹15,000' : 'Toolkit ₹15,000',
      color: 'border-blue-200 bg-blue-50/50',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* First-Time User Mode Banner */}
      <div className="w-full mb-4 p-3 bg-gradient-to-r from-[#FCE4EC] to-white rounded-2xl border border-[#E95D8A]/30 flex items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E95D8A]" />
          <span className="text-xs font-bold text-[#542A46]">
            {isFirstTimeUserMode ? t.firstTimeModeActive : t.firstTimeMode}
          </span>
        </div>
        <button
          onClick={onToggleFirstTimeMode}
          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all ${
            isFirstTimeUserMode
              ? 'bg-[#E95D8A] text-white shadow-xs'
              : 'bg-white text-[#542A46] border border-[#FCE4EC]'
          }`}
        >
          {isFirstTimeUserMode ? 'Active' : 'Turn On'}
        </button>
      </div>

      {/* Main Header Questions */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex justify-center mb-2">
          <HerAiLogo size="sm" showText={true} />
        </div>

        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {t.howCanIHelp}
        </h2>

        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1 max-w-md mx-auto">
          {t.assistantSubtitle}
        </p>
      </div>

      {/* Dominant Center Voice Orb */}
      <div className="my-2 sm:my-3">
        <VoiceOrb
          state={voiceOrbState}
          onToggleListen={onToggleVoice}
          lang={language}
          size="normal"
        />
      </div>

      {/* Voice / Type CTA Buttons */}
      <div className="w-full max-w-md flex items-center gap-3 mt-4 mb-6">
        <button
          onClick={onToggleVoice}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-base shadow-md shadow-[#E95D8A]/25 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>🎙️ {voiceOrbState === 'listening' ? t.stopVoice : t.speakNow}</span>
        </button>

        <button
          onClick={onOpenTypeMode}
          className="py-3.5 px-4 rounded-2xl bg-white border border-[#FCE4EC] text-[#542A46] font-bold text-sm shadow-xs hover:bg-[#FCE4EC]/30 active:scale-98 transition-all flex items-center gap-2"
        >
          <Keyboard className="w-4 h-4 text-[#E95D8A]" />
          <span>{t.typeInstead}</span>
        </button>
      </div>

      {/* Quick Suggestions Cards */}
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-2.5 px-1">
          <p className="text-xs font-bold text-[#542A46] uppercase tracking-wider">
            Quick Suggestions
          </p>
          <span className="text-[11px] text-[#292326]/60">Tap to ask directly</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {quickSuggestions.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectPrompt(item.prompt, item.schemeId)}
              className={`w-full text-left p-3.5 rounded-2xl bg-white border ${item.color} shadow-xs hover:shadow-md hover:border-[#E95D8A] active:scale-[0.99] transition-all flex items-center justify-between gap-3 group`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-[#E95D8A] shadow-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#FCE4EC]">
                  <MessageCircle className="w-4 h-4 text-[#E95D8A]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E95D8A] bg-[#FCE4EC] px-2 py-0.5 rounded-md inline-block mb-0.5">
                    {item.badge}
                  </span>
                  <p
                    className={`font-semibold text-[#292326] group-hover:text-[#542A46] transition-colors ${
                      isLargeText ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}
                  >
                    {item.prompt}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-[#FFF9F5] flex items-center justify-center shrink-0 text-[#E95D8A] group-hover:bg-[#E95D8A] group-hover:text-white transition-all">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
