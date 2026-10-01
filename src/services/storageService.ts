import { UserSessionData } from '../../shared/types';

const STORAGE_KEY = 'herai_user_session_v1';

export function saveUserSession(session: Partial<UserSessionData>): void {
  try {
    const existing = loadUserSession();
    const updated: UserSessionData = {
      language: session.language || existing?.language || 'ta',
      step: session.step || existing?.step || 'welcome',
      selectedSchemeId: session.selectedSchemeId !== undefined ? session.selectedSchemeId : existing?.selectedSchemeId,
      userAnswers: session.userAnswers || existing?.userAnswers || {},
      eligibilityVerdict: session.eligibilityVerdict || existing?.eligibilityVerdict,
      checkedDocuments: session.checkedDocuments || existing?.checkedDocuments || [],
      uploadedDocs: session.uploadedDocs || existing?.uploadedDocs || [],
      conversationHistory: session.conversationHistory || existing?.conversationHistory || [],
      lastUpdated: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save session to localStorage', e);
  }
}

export function loadUserSession(): UserSessionData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load session from localStorage', e);
    return null;
  }
}

export function clearUserSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
}

export function calculateJourneyProgress(session: UserSessionData | null): number {
  if (!session) return 0;
  switch (session.step) {
    case 'welcome':
      return 10;
    case 'home':
      return 25;
    case 'conversation':
      return 45;
    case 'eligibility':
      return 65;
    case 'documents':
      return 85;
    case 'guidance':
      return 95;
    case 'success':
      return 100;
    default:
      return 10;
  }
}
