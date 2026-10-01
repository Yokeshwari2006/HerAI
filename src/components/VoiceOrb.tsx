import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { Mic, MicOff, Loader2, Volume2 } from 'lucide-react';

export type VoiceOrbState = 'idle' | 'listening' | 'processing' | 'speaking';

interface VoiceOrbProps {
  state: VoiceOrbState;
  onToggleListen: () => void;
  lang: SupportedLanguage;
  size?: 'normal' | 'compact';
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state,
  onToggleListen,
  lang,
  size = 'normal',
}) => {
  const isListening = state === 'listening';
  const isProcessing = state === 'processing';
  const isSpeaking = state === 'speaking';

  const orbSizeClass = size === 'compact' ? 'w-20 h-20' : 'w-32 h-32 sm:w-36 sm:h-36';
  const iconSizeClass = size === 'compact' ? 'w-8 h-8' : 'w-12 h-12 sm:w-14 sm:h-14';

  const statusLabel = {
    idle: lang === 'ta' ? 'பேச தொடங்குங்கள்' : lang === 'hi' ? 'बोलना शुरू करें' : 'Tap to speak',
    listening: lang === 'ta' ? 'உங்கள் குரலைக் கேட்கிறது...' : lang === 'hi' ? 'आपकी आवाज़ सुन रहे हैं...' : 'Listening to your voice...',
    processing: lang === 'ta' ? 'HerAI சிந்திக்கிறது...' : lang === 'hi' ? 'HerAI सोच रहा है...' : 'Thinking...',
    speaking: lang === 'ta' ? 'HerAI பேசுகிறது...' : lang === 'hi' ? 'HerAI बोल रहा है...' : 'HerAI speaking...',
  }[state];

  return (
    <div className="flex flex-col items-center justify-center select-none py-2">
      <div className="relative flex items-center justify-center">
        {/* Radiating soundwave rings when listening */}
        {isListening && (
          <>
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#E95D8A] opacity-25 animate-ping duration-1000" />
            <span className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-[#E95D8A]/40 animate-pulse duration-700" />
            <span className="absolute -inset-8 sm:-inset-12 rounded-full border border-[#F47B6C]/30 animate-pulse delay-150 duration-1000" />
          </>
        )}

        {/* Ambient halo when speaking */}
        {isSpeaking && (
          <span className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-[#E95D8A]/20 via-[#F47B6C]/20 to-[#4E9F75]/20 animate-pulse blur-xl" />
        )}

        {/* Main Interactive Button Orb */}
        <button
          onClick={onToggleListen}
          disabled={isProcessing}
          aria-label={statusLabel}
          className={`${orbSizeClass} rounded-full relative z-10 flex items-center justify-center text-white transition-all transform active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#E95D8A]/40 shadow-xl ${
            isListening
              ? 'bg-gradient-to-tr from-[#E95D8A] to-[#F47B6C] scale-105 shadow-[#E95D8A]/40 ring-4 ring-[#FCE4EC]'
              : isSpeaking
              ? 'bg-gradient-to-tr from-[#542A46] via-[#E95D8A] to-[#F47B6C] shadow-[#542A46]/30 ring-4 ring-emerald-100'
              : isProcessing
              ? 'bg-gradient-to-tr from-[#542A46] to-[#E95D8A] shadow-md opacity-90'
              : 'bg-gradient-to-tr from-[#E95D8A] via-[#F47B6C] to-[#E95D8A] hover:scale-102 hover:shadow-2xl shadow-[#E95D8A]/30 ring-4 ring-white'
          }`}
        >
          {isProcessing ? (
            <Loader2 className={`${iconSizeClass} animate-spin`} />
          ) : isSpeaking ? (
            <Volume2 className={`${iconSizeClass} animate-bounce`} />
          ) : isListening ? (
            <div className="flex flex-col items-center">
              <Mic className={`${iconSizeClass} animate-pulse`} />
            </div>
          ) : (
            <Mic className={iconSizeClass} />
          )}
        </button>
      </div>

      {/* Spoken State Pill / Text */}
      <div className="mt-4 text-center">
        <p
          className={`text-sm sm:text-base font-semibold tracking-wide transition-colors ${
            isListening
              ? 'text-[#E95D8A]'
              : isSpeaking
              ? 'text-[#4E9F75]'
              : isProcessing
              ? 'text-[#542A46]'
              : 'text-[#292326]'
          }`}
        >
          {statusLabel}
        </p>
        <p className="text-xs text-[#292326]/60 mt-0.5">
          {isListening
            ? lang === 'ta'
              ? 'முடிந்ததும் மீண்டும் தொடவும்'
              : 'Tap again when done speaking'
            : lang === 'ta'
            ? 'இயல்பான தமிழில் பேசுங்கள்'
            : 'Speak naturally in simple words'}
        </p>
      </div>
    </div>
  );
};
