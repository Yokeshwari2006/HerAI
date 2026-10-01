export type SupportedLanguage =
  | 'en'
  | 'ta'
  | 'hi'
  | 'te'
  | 'ml'
  | 'kn'
  | 'bn'
  | 'mr'
  | 'gu'
  | 'pa'
  | 'ur';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
];

export type SchemeCategory =
  | 'financial_support'
  | 'higher_education'
  | 'self_employment'
  | 'pensions'
  | 'maternal_health'
  | 'skill_development'
  | 'shg_livelihood';

export interface DocumentRequirement {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  sampleTips: string;
  sampleTipsEn: string;
  isMandatory: boolean;
  alternative?: string;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  actionLabel?: string;
  actionLabelEn?: string;
  actionType?: 'check_docs' | 'visit_centre' | 'online_portal' | 'biometric';
}

export interface EligibilityCriterion {
  id: string;
  question: string;
  questionEn: string;
  shortLabel: string;
  shortLabelEn: string;
  type: 'select' | 'number' | 'boolean';
  options?: { value: string; labelTa: string; labelEn: string }[];
  explanationIfMet: string;
  explanationIfMetEn: string;
  explanationIfNotMet: string;
  explanationIfNotMetEn: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameEn: string;
  badge: string;
  badgeEn: string;
  category: SchemeCategory;
  purpose: string;
  purposeEn: string;
  benefitAmount: string;
  benefitAmountEn: string;
  department: string;
  departmentEn: string;
  stateOrRegion: string;
  officialUrl: string;
  helpline: string;
  targetBeneficiary: string;
  targetBeneficiaryEn: string;
  eligibilityCriteria: EligibilityCriterion[];
  documents: DocumentRequirement[];
  steps: ApplicationStep[];
  faq: { qTa: string; qEn: string; aTa: string; aEn: string }[];
  sourceReference: string;
  lastVerifiedDate: string;
  isVerifiedOfficial: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferredLanguage: SupportedLanguage;
  voiceSpeed: number; // 0.8 to 1.2
  autoPlayVoice: boolean;
  isFirstTimeUserMode: boolean; // Zero-knowledge mode
  createdAt: number;
}

export type DocumentReadinessStatus = 'ready' | 'missing' | 'needs_attention';

export interface JourneyStage {
  id: string;
  stageNumber: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface ApplicationJourney {
  id: string;
  userId?: string;
  schemeId: string;
  currentStepIndex: number;
  totalSteps: number;
  progressPercent: number;
  answeredCriteria: Record<string, any>;
  eligibilityStatus?: {
    isLikelyEligible: boolean;
    reason: string;
    missingInfo?: string[];
  };
  documentStatus: Record<string, DocumentReadinessStatus>;
  uploadedDocuments: Array<{
    docId: string;
    detectedDocType: string;
    confidence: 'high' | 'medium' | 'low';
    uploadedAt: number;
    feedback: string;
  }>;
  completedStepNumbers: number[];
  createdAt: number;
  updatedAt: number;
}

export interface SavedSchemeItem {
  id: string;
  schemeId: string;
  userId?: string;
  savedAt: number;
  notes?: string;
}

export interface JourneyHistoryItem {
  id: string;
  userId?: string;
  title: string;
  schemeId: string;
  dateStr: string;
  status: 'completed' | 'in_progress';
  summary: string;
  timestamp: number;
}

export interface UserSessionData {
  language: SupportedLanguage;
  step: 'welcome' | 'home' | 'conversation' | 'eligibility' | 'documents' | 'guidance' | 'success';
  selectedSchemeId?: string;
  userAnswers: Record<string, any>;
  eligibilityVerdict?: {
    isLikelyEligible: boolean;
    reasonTa?: string;
    reasonEn?: string;
    missingInfo?: string[];
  };
  checkedDocuments: string[];
  uploadedDocs: Array<{
    docId: string;
    fileName: string;
    detectedDocType: string;
    confidence: 'high' | 'medium' | 'low';
    feedback: string;
  }>;
  conversationHistory: Array<{
    role: 'assistant' | 'user';
    text: string;
    timestamp: number;
    audioAutoPlay?: boolean;
    quickReplies?: string[];
  }>;
  lastUpdated: number;
}
