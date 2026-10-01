import React from 'react';
import { SupportedLanguage, GovernmentScheme } from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { CheckCircle2, AlertCircle, ArrowRight, Volume2, ShieldCheck, FileText, Building2, HelpCircle } from 'lucide-react';

interface EligibilityScreenProps {
  language: SupportedLanguage;
  scheme: GovernmentScheme;
  userAnswers: Record<string, any>;
  onProceedToDocuments: () => void;
  onSelectAnotherScheme: () => void;
  onSpeakText: (text: string) => void;
  isLargeText: boolean;
}

export const EligibilityScreen: React.FC<EligibilityScreenProps> = ({
  language,
  scheme,
  userAnswers,
  onProceedToDocuments,
  onSelectAnotherScheme,
  onSpeakText,
  isLargeText,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const schemeName = language === 'ta' ? scheme.name : scheme.nameEn;
  const schemePurpose = language === 'ta' ? scheme.purpose : scheme.purposeEn;
  const benefitText = language === 'ta' ? scheme.benefitAmount : scheme.benefitAmountEn;
  const deptText = language === 'ta' ? scheme.department : scheme.departmentEn;

  // Build conversational summary for spoken playback
  const spokenSummary =
    language === 'ta'
      ? `அம்மா, உங்களுக்கு ${scheme.name} திட்டம் முழுமையாக பொருந்துகிறது. இதன் மூலம் ${scheme.benefitAmount} அரசு உதவி உங்களுக்கு நேரடியாக வங்கிக் கணக்கில் கிடைக்கும். நீங்கள் குடும்பத் தலைவியாகவும், தகுதி விதிகளுக்கு உட்பட்டும் இருப்பதால் இதற்கு தகுதியுடையவர். அடுத்ததாக இதற்குத் தேவையான ஆவணங்களை பார்க்கலாம்.`
      : `Madam, you qualify for ${scheme.nameEn}. This scheme provides ${scheme.benefitAmountEn} directly to your bank account. Let us check the required documents next.`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-6 animate-fade-in">
      {/* Title Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4E9F75] bg-emerald-50 px-3 py-1 rounded-full mb-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-[#4E9F75]" />
          {language === 'ta' ? 'தகுதி கண்டறியப்பட்டது' : 'Eligibility Matched'}
        </span>
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {t.eligibilityTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/70 mt-1 max-w-md mx-auto">
          {t.eligibilitySubtitle}
        </p>
      </div>

      {/* Main Matched Scheme Hero Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E95D8A]/30 shadow-lg shadow-[#E95D8A]/10 mb-6 relative overflow-hidden">
        {/* Soft background gradient accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FCE4EC] to-transparent rounded-bl-full -z-0 opacity-70" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-2.5 py-1 rounded-lg">
              {language === 'ta' ? scheme.badge : scheme.badgeEn}
            </span>
            <button
              onClick={() => onSpeakText(spokenSummary)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#542A46] bg-[#FFF9F5] border border-[#FCE4EC] hover:bg-[#FCE4EC] px-3 py-1.5 rounded-xl transition-colors shadow-xs"
              title={t.replayAudio}
            >
              <Volume2 className="w-4 h-4 text-[#E95D8A]" />
              <span>{language === 'ta' ? 'குரலில் கேட்க' : 'Listen'}</span>
            </button>
          </div>

          <h3
            className={`font-black text-[#542A46] leading-tight ${
              isLargeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
            }`}
          >
            {schemeName}
          </h3>

          <div className="mt-3 p-3.5 bg-[#FFF9F5] rounded-2xl border border-[#FCE4EC] flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-semibold text-[#292326]/60">
                {language === 'ta' ? 'அரசு உதவித் தொகை:' : 'Government Benefit:'}
              </span>
              <p className="text-base sm:text-lg font-black text-[#4E9F75]">
                {benefitText}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-[#292326]/60">
                {language === 'ta' ? 'அரசு துறை:' : 'Department:'}
              </span>
              <p className="text-xs font-bold text-[#542A46] line-clamp-1 max-w-[160px]">
                {deptText}
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#292326]/85 leading-relaxed font-medium">
            {schemePurpose}
          </p>
        </div>
      </div>

      {/* Why You Qualify Section */}
      <div className="bg-white rounded-3xl p-5 border border-[#FCE4EC] shadow-xs mb-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-[#4E9F75]" />
          <h4 className="text-sm sm:text-base font-bold text-[#542A46]">
            {t.whyYouQualify}
          </h4>
        </div>

        <div className="space-y-2.5">
          {scheme.eligibilityCriteria.map((crit, idx) => {
            const isMet = true; // Checked through conversation
            const explanation = language === 'ta' ? crit.explanationIfMet : crit.explanationIfMetEn;
            const label = language === 'ta' ? crit.shortLabel : crit.shortLabelEn;

            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC]/60"
              >
                <div className="p-1 rounded-full bg-emerald-100 text-[#4E9F75] mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#542A46]">{label}</p>
                  <p className="text-xs text-[#292326]/75 mt-0.5 leading-normal">
                    {explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onProceedToDocuments}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-[#E95D8A]/25 hover:opacity-95 active:scale-98 transition-all flex items-center justify-center gap-2.5"
        >
          <FileText className="w-5 h-5" />
          <span>{t.eligibleAction}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={onSelectAnotherScheme}
          className="w-full py-3 px-4 rounded-2xl bg-white border border-[#FCE4EC] text-[#542A46] font-bold text-xs sm:text-sm hover:bg-[#FCE4EC]/30 transition-colors"
        >
          {t.otherSchemes}
        </button>
      </div>
    </div>
  );
};
