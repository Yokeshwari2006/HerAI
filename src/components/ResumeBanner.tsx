import React from 'react';
import { SupportedLanguage } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface ResumeBannerProps {
  language: SupportedLanguage;
  progressPercent: number;
  onResume: () => void;
  onDismiss: () => void;
  schemeName?: string;
}

export const ResumeBanner: React.FC<ResumeBannerProps> = ({
  language,
  progressPercent,
  onResume,
  onDismiss,
  schemeName,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'] || {};
  const noticeText = t.resumeNotice || t.resumeJourneyTitle || 'Continue your journey';
  const buttonText = t.resumeButton || t.resumeJourneyBtn || 'Continue';
  const startNewText = t.startNew || 'Start Fresh';

  return (
    <div className="bg-gradient-to-r from-[#542A46] via-[#E95D8A] to-[#F47B6C] text-white p-3.5 sm:p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold">
                {noticeText}
              </span>
              <span className="text-[11px] font-extrabold bg-white/20 px-2 py-0.5 rounded-full">
                {progressPercent}%
              </span>
            </div>
            {schemeName && (
              <p className="text-[11px] sm:text-xs text-white/90 line-clamp-1">
                {schemeName}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar and buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onResume}
            className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-white text-[#542A46] font-extrabold text-xs sm:text-sm shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onDismiss}
            className="py-2 px-3 rounded-xl bg-black/20 hover:bg-black/30 text-white font-semibold text-xs transition-colors"
            title={startNewText}
          >
            {startNewText}
          </button>
        </div>
      </div>
    </div>
  );
};
