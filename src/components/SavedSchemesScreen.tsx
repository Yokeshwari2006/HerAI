import React from 'react';
import { SupportedLanguage, GovernmentScheme, SavedSchemeItem } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { Bookmark, ArrowRight, Trash2, FileText, Sparkles } from 'lucide-react';

interface SavedSchemesScreenProps {
  language: SupportedLanguage;
  savedItems: SavedSchemeItem[];
  schemes: GovernmentScheme[];
  onRemoveSaved: (schemeId: string) => void;
  onContinueScheme: (scheme: GovernmentScheme) => void;
  onBrowseSchemes: () => void;
  isLargeText: boolean;
}

export const SavedSchemesScreen: React.FC<SavedSchemesScreenProps> = ({
  language,
  savedItems,
  schemes,
  onRemoveSaved,
  onContinueScheme,
  onBrowseSchemes,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const savedSchemesList = savedItems
    .map((item) => {
      const found = schemes.find((s) => s.id === item.schemeId);
      return found ? { ...found, savedAt: item.savedAt, notes: item.notes } : null;
    })
    .filter(Boolean) as (GovernmentScheme & { savedAt: number; notes?: string })[];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-3 py-1 rounded-full mb-2 inline-block">
          Saved in Your Account
        </span>
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          Saved Government Schemes
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1">
          Easily resume your applications or review requirements anytime.
        </p>
      </div>

      {savedSchemesList.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-3xl border border-[#FCE4EC] max-w-md mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FCE4EC] text-[#E95D8A] flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-[#542A46]">
            No saved schemes yet
          </h3>
          <p className="text-xs text-[#292326]/70 mt-1 max-w-xs mx-auto leading-normal">
            Bookmark government schemes while browsing to save them to your account.
          </p>
          <button
            onClick={onBrowseSchemes}
            className="mt-5 py-2.5 px-5 rounded-2xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-xs shadow-xs hover:opacity-95 transition-all"
          >
            Browse Verified Schemes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedSchemesList.map((scheme) => (
            <div
              key={scheme.id}
              className="p-5 rounded-3xl bg-white border border-[#FCE4EC] hover:border-[#E95D8A] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#E95D8A] bg-[#FCE4EC] px-2.5 py-0.5 rounded-lg">
                    {scheme.badgeEn}
                  </span>
                  <button
                    onClick={() => onRemoveSaved(scheme.id)}
                    className="p-1.5 text-[#292326]/40 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-extrabold text-[#542A46] text-base leading-snug">
                  {scheme.nameEn}
                </h3>

                <p className="text-xs font-black text-[#4E9F75] mt-1">
                  {scheme.benefitAmountEn}
                </p>

                <p className="text-xs text-[#292326]/70 mt-2 line-clamp-2 leading-relaxed">
                  {scheme.purposeEn}
                </p>

                <div className="mt-3 pt-3 border-t border-[#FCE4EC]/70 text-[11px] text-[#292326]/60 flex items-center justify-between">
                  <span>Saved on: {new Date(scheme.savedAt).toLocaleDateString()}</span>
                  <span className="text-[#4E9F75] font-semibold">Active</span>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center gap-2">
                <button
                  onClick={() => onContinueScheme(scheme)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-xs shadow-xs hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Continue Application</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
