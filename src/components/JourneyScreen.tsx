import React, { useState, useRef } from 'react';
import {
  SupportedLanguage,
  GovernmentScheme,
  ApplicationJourney,
  DocumentReadinessStatus,
} from '../../shared/types';
import { TRANSLATIONS } from '../../shared/translations';
import { analyzeDocumentPhoto } from '../services/apiService';
import {
  Compass,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Camera,
  Upload,
  ExternalLink,
  Volume2,
  ShieldCheck,
  Building,
  ArrowRight,
  Loader2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface JourneyScreenProps {
  language: SupportedLanguage;
  journey: ApplicationJourney | null;
  scheme: GovernmentScheme;
  onOpenOfficialPortal: (url: string) => void;
  onOpenHumanHelp: () => void;
  onUpdateDocumentStatus: (docId: string, status: DocumentReadinessStatus) => void;
  onSpeakText: (text: string) => void;
  isLargeText: boolean;
  onContinueAssistant: () => void;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  language,
  journey,
  scheme,
  onOpenOfficialPortal,
  onOpenHumanHelp,
  onUpdateDocumentStatus,
  onSpeakText,
  isLargeText,
  onContinueAssistant,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisFeedback, setAnalysisFeedback] = useState<string | null>(null);

  const stages = [
    { num: 1, label: t.journeyStage1, status: 'completed' },
    { num: 2, label: t.journeyStage2, status: 'completed' },
    { num: 3, label: t.journeyStage3, status: journey?.eligibilityStatus ? 'completed' : 'current' },
    { num: 4, label: t.journeyStage4, status: journey?.eligibilityStatus ? 'current' : 'upcoming' },
    { num: 5, label: t.journeyStage5, status: 'upcoming' },
  ];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      setAnalysisFeedback(null);

      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await analyzeDocumentPhoto({
            imageBase64: base64Data,
            mimeType: file.type || 'image/jpeg',
            schemeId: scheme.id,
            language,
          });

          setAnalysisFeedback(res.feedback);

          if (res.matchedDocId) {
            onUpdateDocumentStatus(res.matchedDocId, 'ready');
          }

          if (res.voiceText) {
            onSpeakText(res.voiceText);
          }
        } catch {
          setAnalysisFeedback('Document recorded. Please carry your original card to the e-Sevai centre.');
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsAnalyzing(false);
    }
  };

  const currentProgress = journey?.progressPercent || 60;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 animate-fade-in">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-3 py-1 rounded-full mb-2 inline-block">
          AI Guided Application Roadmap
        </span>
        <h2
          className={`font-black text-[#542A46] tracking-tight ${
            isLargeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {t.journeyTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#292326]/75 mt-1">
          {scheme.nameEn}
        </p>
      </div>

      {/* Visual Journey Tracker Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-xs mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-extrabold text-[#542A46]">
            Application Progress: {currentProgress}%
          </span>
          <span className="text-xs font-extrabold text-[#E95D8A] bg-[#FCE4EC] px-2.5 py-0.5 rounded-full">
            Stage 3 of 5
          </span>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-[#FCE4EC] h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-[#E95D8A] to-[#F47B6C] transition-all duration-500 rounded-full"
            style={{ width: `${currentProgress}%` }}
          />
        </div>

        {/* 5 Stages Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stages.map((stg) => {
            const isCompleted = stg.status === 'completed';
            const isCurrent = stg.status === 'current';

            return (
              <div
                key={stg.num}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : isCurrent
                    ? 'bg-rose-50 border-[#E95D8A] ring-2 ring-[#FCE4EC] text-[#542A46]'
                    : 'bg-[#FFF9F5] border-[#FCE4EC]/60 text-[#292326]/40'
                }`}
              >
                <div className="flex items-center justify-center mb-1.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-[#4E9F75]" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-[#E95D8A] text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                      ●
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <span className="text-[10px] font-bold block mb-0.5">
                  Step {stg.num}
                </span>
                <p className="text-[11px] font-bold leading-tight line-clamp-2">
                  {stg.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Readiness Check Section */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#FCE4EC] shadow-xs mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#FCE4EC] mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-black text-[#542A46]">
              {t.docReadinessTitle}
            </h3>
            <p className="text-xs text-[#292326]/70 mt-0.5">
              {t.docReadinessSubtitle}
            </p>
          </div>
          <span className="text-xs font-bold text-[#E95D8A] bg-[#FCE4EC] px-2.5 py-1 rounded-xl">
            Checklist
          </span>
        </div>

        {/* Readiness Checklist */}
        <div className="space-y-3 mb-5">
          {scheme.documents.map((doc) => {
            const status: DocumentReadinessStatus =
              journey?.documentStatus?.[doc.id] ||
              (doc.isMandatory ? 'missing' : 'needs_attention');

            return (
              <div
                key={doc.id}
                className="p-3.5 rounded-2xl bg-[#FFF9F5] border border-[#FCE4EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#542A46]">
                      {doc.nameEn}
                    </span>
                    {doc.isMandatory && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#292326]/70 mt-0.5">
                    {doc.descriptionEn}
                  </p>
                </div>

                {/* Status Toggle Buttons (Ready, Missing, Needs Attention) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onUpdateDocumentStatus(doc.id, 'ready')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      status === 'ready'
                        ? 'bg-[#4E9F75] text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    ✓ Ready
                  </button>

                  <button
                    onClick={() => onUpdateDocumentStatus(doc.id, 'needs_attention')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      status === 'needs_attention'
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    ⚠ Attention
                  </button>

                  <button
                    onClick={() => onUpdateDocumentStatus(doc.id, 'missing')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      status === 'missing'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    ○ Missing
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Camera / Photo Upload for Document Inspection */}
        <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-dashed border-[#E95D8A]/40 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileUpload}
          />

          <p className="text-xs font-bold text-[#542A46] mb-3">
            Capture or Upload a Document to Auto-Inspect Type
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => cameraInputRef.current?.click()}
              disabled={isAnalyzing}
              className="py-2.5 px-4 rounded-xl bg-white border border-[#E95D8A]/30 text-[#542A46] font-bold text-xs hover:bg-[#FCE4EC]/50 shadow-2xs flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-[#E95D8A]" />
              <span>{t.cameraScan}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="py-2.5 px-4 rounded-xl bg-white border border-[#E95D8A]/30 text-[#542A46] font-bold text-xs hover:bg-[#FCE4EC]/50 shadow-2xs flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4 text-[#E95D8A]" />
              <span>{t.uploadDoc}</span>
            </button>
          </div>

          {isAnalyzing && (
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-[#542A46]">
              <Loader2 className="w-4 h-4 text-[#E95D8A] animate-spin" />
              <span>{t.analyzingDoc}</span>
            </div>
          )}

          {analysisFeedback && (
            <p className="mt-3 text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              {analysisFeedback}
            </p>
          )}

          <p className="mt-3 text-[10px] text-[#292326]/60">
            {t.docDisclaimer}
          </p>
        </div>
      </div>

      {/* Official Government Website & Source Lock */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#4E9F75]/40 shadow-sm mb-6">
        <div className="flex items-center justify-between gap-2 mb-2 text-[#4E9F75]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
              {t.verifiedOfficialBadge}
            </h4>
          </div>
          <span className="text-[11px] text-[#292326]/60">
            {t.lastVerified} {scheme.lastVerifiedDate}
          </span>
        </div>

        <p className="text-xs text-[#292326]/75 mb-4 leading-normal">
          {scheme.sourceReference}
        </p>

        <button
          onClick={() => onOpenOfficialPortal(scheme.officialUrl)}
          className="w-full py-4 px-5 rounded-2xl bg-[#542A46] hover:bg-[#292326] text-white font-extrabold text-sm sm:text-base shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>{t.openOfficialPortal}</span>
          <ExternalLink className="w-4 h-4 text-emerald-400" />
        </button>

        <p className="mt-2 text-[11px] text-center text-[#292326]/50">
          Official Domain: {scheme.officialUrl}
        </p>
      </div>

      {/* Human Help Escalation */}
      <div className="p-4 rounded-3xl bg-[#FFF9F5] border border-[#FCE4EC] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#4E9F75] flex items-center justify-center shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#542A46]">
              {t.humanHelp}
            </h4>
            <p className="text-xs text-[#292326]/75">
              {t.nearbyESevaiDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenHumanHelp}
          className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-white border border-emerald-300 text-[#4E9F75] font-bold text-xs shadow-xs hover:bg-emerald-50 transition-colors shrink-0"
        >
          View Centre Details
        </button>
      </div>
    </div>
  );
};
