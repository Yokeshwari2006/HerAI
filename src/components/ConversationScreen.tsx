import React, { useState, useEffect, useRef } from 'react';
import { SupportedLanguage, GovernmentScheme } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { HerAiLogo } from './HerAiLogo';
import { VoiceOrbState } from './VoiceOrb';
import {
  Volume2,
  VolumeX,
  Send,
  Mic,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Info,
} from 'lucide-react';

export interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
  timestamp: number;
  audioAutoPlay?: boolean;
  quickReplies?: string[];
  isSecurityAlert?: boolean;
}

interface ConversationScreenProps {
  language: SupportedLanguage;
  messages: ChatMessage[];
  currentScheme?: GovernmentScheme | null;
  onSendMessage: (text: string) => void;
  voiceOrbState: VoiceOrbState;
  onToggleVoice: () => void;
  onReplayAudio: (text: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  isLargeText: boolean;
  onViewEligibility: () => void;
  isVerdictReady: boolean;
  onRestartConversation: () => void;
  isFirstTimeUserMode: boolean;
}

export const ConversationScreen: React.FC<ConversationScreenProps> = ({
  language,
  messages,
  currentScheme,
  onSendMessage,
  voiceOrbState,
  onToggleVoice,
  onReplayAudio,
  isSpeaking,
  onStopSpeaking,
  isLargeText,
  onViewEligibility,
  isVerdictReady,
  onRestartConversation,
  isFirstTimeUserMode,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-3 sm:py-6 flex flex-col min-h-[82vh]">
      {/* Active Scheme Header Banner */}
      {currentScheme && (
        <div className="mb-4 p-3.5 bg-white rounded-2xl border border-[#FCE4EC] shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FCE4EC] text-[#E95D8A] flex items-center justify-center font-bold text-xs shrink-0">
              Govt
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#542A46] line-clamp-1">
                {currentScheme.nameEn}
              </h4>
              <p className="text-[11px] text-[#4E9F75] font-semibold">
                {currentScheme.benefitAmountEn}
              </p>
            </div>
          </div>

          <button
            onClick={onRestartConversation}
            className="p-1.5 text-xs text-[#292326]/60 hover:text-[#542A46] rounded-xl hover:bg-[#FCE4EC]/50 transition-colors flex items-center gap-1 shrink-0"
            title="Start new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Start Fresh</span>
          </button>
        </div>
      )}

      {/* First-Time User Mode Banner if active */}
      {isFirstTimeUserMode && (
        <div className="mb-3 px-3.5 py-2 bg-gradient-to-r from-[#FCE4EC]/80 to-white border border-[#E95D8A]/30 rounded-xl flex items-center gap-2 text-xs font-bold text-[#542A46]">
          <Sparkles className="w-3.5 h-3.5 text-[#E95D8A]" />
          <span>First-Time User Mode: Asking one gentle question at a time.</span>
        </div>
      )}

      {/* Main Conversational Cards List */}
      <div className="flex-1 space-y-4 mb-4">
        {messages.map((msg, idx) => {
          const isAssistant = msg.role === 'assistant';
          const isLatestAssistant = isAssistant && idx === messages.length - 1;

          return (
            <div
              key={idx}
              className={`flex flex-col ${
                isAssistant ? 'items-start' : 'items-end'
              } animate-fade-in`}
            >
              {/* Speaker name label */}
              <div className="flex items-center gap-1.5 mb-1 px-1">
                {isAssistant && <HerAiLogo size="xs" showText={false} variant="icon-only" />}
                <span className="text-[11px] font-bold text-[#292326]/60">
                  {isAssistant ? 'HerAI Guide' : 'You'}
                </span>

                {isAssistant && isLatestAssistant && isSpeaking && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-[#4E9F75] bg-emerald-50 px-1.5 py-0.2 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E9F75] animate-ping" />
                    Speaking...
                  </span>
                )}
              </div>

              {/* Message Bubble Card */}
              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-3xl p-4 sm:p-5 shadow-xs transition-all ${
                  isAssistant
                    ? msg.isSecurityAlert
                      ? 'bg-amber-50 border-2 border-amber-300 text-amber-950 ring-2 ring-amber-100'
                      : 'bg-white border border-[#FCE4EC] text-[#292326]'
                    : 'bg-gradient-to-tr from-[#542A46] to-[#E95D8A] text-white'
                }`}
              >
                <p
                  className={`leading-relaxed font-medium whitespace-pre-wrap ${
                    isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  {msg.text}
                </p>

                {/* Assistant controls: Audio replay */}
                {isAssistant && (
                  <div className="mt-3 pt-2.5 border-t border-[#FCE4EC]/70 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onReplayAudio(msg.text)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#E95D8A] hover:text-[#542A46] bg-[#FCE4EC]/40 hover:bg-[#FCE4EC] px-3 py-1.5 rounded-xl transition-colors"
                      title={t.replayVoice}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t.replayVoice}</span>
                    </button>

                    <span className="text-[10px] text-[#292326]/40">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Quick Reply Chips if attached to latest assistant message */}
              {isAssistant && isLatestAssistant && msg.quickReplies && msg.quickReplies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2 max-w-[92%]">
                  {msg.quickReplies.map((replyText, rIdx) => (
                    <button
                      key={rIdx}
                      onClick={() => onSendMessage(replyText)}
                      className="py-2 px-3.5 rounded-xl bg-white border border-[#E95D8A]/30 text-[#542A46] font-bold text-xs sm:text-sm shadow-xs hover:bg-[#FCE4EC] hover:border-[#E95D8A] active:scale-95 transition-all"
                    >
                      <span>{replyText}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Prominent Next Action Banner when Verdict / Scheme is ready */}
      {isVerdictReady && (
        <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 animate-bounce-short">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4E9F75] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
              ✓
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Potential Eligibility Evaluated!
              </h4>
              <p className="text-xs text-emerald-800">
                Review scheme eligibility reasons and document checklist now.
              </p>
            </div>
          </div>

          <button
            onClick={onViewEligibility}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#4E9F75] hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>{t.viewDocumentsBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Persistent Bottom Voice & Text Interaction Bar */}
      <div className="sticky bottom-2 z-20 bg-[#FFF9F5]/95 backdrop-blur-md pt-2 border-t border-[#FCE4EC]">
        {/* Center Mic Orb Quick Control */}
        <div className="flex items-center justify-center mb-2">
          <button
            onClick={onToggleVoice}
            className={`py-3 px-6 rounded-2xl font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-md transition-all active:scale-95 ${
              voiceOrbState === 'listening'
                ? 'bg-[#E95D8A] text-white ring-4 ring-[#FCE4EC] animate-pulse'
                : 'bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white hover:opacity-95'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>
              {voiceOrbState === 'listening'
                ? t.listening
                : `🎙️ ${t.speakNow}`}
            </span>
          </button>
        </div>

        {/* Text Input Fallback Bar */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="flex-1 bg-white border border-[#FCE4EC] rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#292326] placeholder-[#292326]/40 focus:outline-none focus:border-[#E95D8A] focus:ring-2 focus:ring-[#FCE4EC] shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-[#542A46] text-white disabled:opacity-40 hover:bg-[#292326] active:scale-95 transition-all shadow-xs shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
