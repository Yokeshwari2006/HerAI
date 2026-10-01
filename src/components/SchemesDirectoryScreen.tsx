import React, { useState } from 'react';
import { SupportedLanguage, GovernmentScheme, SchemeCategory } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import {
  Search,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Filter,
  FileText,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface SchemesDirectoryScreenProps {
  language: SupportedLanguage;
  schemes: GovernmentScheme[];
  savedSchemeIds: string[];
  onToggleSaveScheme: (schemeId: string) => void;
  onSelectScheme: (scheme: GovernmentScheme) => void;
  onCheckEligibility: (scheme: GovernmentScheme) => void;
  isLargeText: boolean;
}

export const SchemesDirectoryScreen: React.FC<SchemesDirectoryScreenProps> = ({
  language,
  schemes,
  savedSchemeIds,
  onToggleSaveScheme,
  onSelectScheme,
  onCheckEligibility,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'financial_support', label: 'Financial Support' },
    { id: 'higher_education', label: 'Higher Education' },
    { id: 'self_employment', label: 'Self-Employment' },
    { id: 'skill_development', label: 'Skill & Artisan' },
    { id: 'pensions', label: 'Pensions & Widow' },
    { id: 'maternal_health', label: 'Maternal Health' },
    { id: 'shg_livelihood', label: 'SHG Livelihood' },
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory =
      selectedCategory === 'all' || scheme.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      scheme.nameEn.toLowerCase().includes(q) ||
      scheme.name.toLowerCase().includes(q) ||
      scheme.purposeEn.toLowerCase().includes(q) ||
      scheme.benefitAmountEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-3 py-1 rounded-full mb-2 inline-block">
          Verified Government Directory
        </span>
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          Explore Government Welfare Schemes
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1 leading-normal">
          All schemes are verified against official government notifications and government portals.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="w-5 h-5 text-[#292326]/40 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by scheme name, benefits (e.g. ₹1000, sewing, widow, education)..."
          className="w-full bg-white border border-[#FCE4EC] rounded-2xl pl-12 pr-4 py-3.5 text-xs sm:text-sm text-[#292326] placeholder-[#292326]/40 focus:outline-none focus:border-[#E95D8A] focus:ring-2 focus:ring-[#FCE4EC] shadow-xs"
        />
      </div>

      {/* Filter Tabs (Interactive Segmented Control) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#542A46] text-white shadow-xs'
                : 'bg-white border border-[#FCE4EC] text-[#292326]/75 hover:bg-[#FCE4EC]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Count & Source Lock notice */}
      <div className="flex items-center justify-between text-xs text-[#292326]/60 mb-4 px-1">
        <span>Showing {filteredSchemes.length} verified schemes</span>
        <span className="flex items-center gap-1 text-[#4E9F75] font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Source Locked</span>
        </span>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => {
          const isSaved = savedSchemeIds.includes(scheme.id);

          return (
            <div
              key={scheme.id}
              className="p-5 rounded-3xl bg-white border border-[#FCE4EC] hover:border-[#E95D8A] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#E95D8A] bg-[#FCE4EC] px-2.5 py-0.5 rounded-lg">
                    {scheme.badgeEn}
                  </span>

                  <button
                    onClick={() => onToggleSaveScheme(scheme.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isSaved
                        ? 'bg-rose-50 border-rose-300 text-[#E95D8A]'
                        : 'bg-white border-[#FCE4EC] text-[#292326]/40 hover:text-[#E95D8A]'
                    }`}
                    title={isSaved ? 'Saved to account' : 'Save scheme'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <h3
                  className={`font-black text-[#542A46] leading-snug ${
                    isLargeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                  }`}
                >
                  {scheme.nameEn}
                </h3>

                <p className="text-xs font-black text-[#4E9F75] mt-1">
                  {scheme.benefitAmountEn}
                </p>

                <p className="text-xs text-[#292326]/75 mt-2 line-clamp-3 leading-relaxed">
                  {scheme.purposeEn}
                </p>

                <div className="mt-3 pt-3 border-t border-[#FCE4EC]/70 flex flex-wrap items-center justify-between text-[11px] text-[#292326]/60 gap-1">
                  <span>Dept: {scheme.departmentEn.split(',')[0]}</span>
                  <span>Verified: {scheme.lastVerifiedDate}</span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onCheckEligibility(scheme)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-xs shadow-xs hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onSelectScheme(scheme)}
                  className="py-2.5 px-3 rounded-xl bg-[#FFF9F5] border border-[#FCE4EC] text-[#542A46] font-bold text-xs hover:bg-[#FCE4EC]/50 transition-colors flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5 text-[#E95D8A]" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
