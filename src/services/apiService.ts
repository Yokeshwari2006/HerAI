import {
  GovernmentScheme,
  SupportedLanguage,
  UserProfile,
  ApplicationJourney,
  SavedSchemeItem,
  JourneyHistoryItem,
} from '../../shared/types';

export interface ChatResponse {
  success: boolean;
  reply: string;
  voiceText?: string;
  matchedSchemeId?: string | null;
  isVerdictReady?: boolean;
  verdict?: {
    isLikelyEligible: boolean;
    reason: string;
  };
  nextQuestion?: string | null;
  quickReplies?: string[];
  isSecurityAlert?: boolean;
  error?: string;
}

export interface DocumentAnalysisResponse {
  success: boolean;
  detectedDocType: string;
  matchedDocId?: string | null;
  confidence: 'high' | 'medium' | 'low';
  isMatch: boolean;
  feedback: string;
  voiceText?: string;
  tips?: string;
  error?: string;
}

export async function fetchSchemes(category?: string): Promise<{
  schemes: GovernmentScheme[];
  helplines: Array<{ number: string; name: string; nameTa: string; desc: string; descTa: string }>;
}> {
  try {
    const url = category ? `/api/schemes?category=${category}` : '/api/schemes';
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return {
      schemes: data.schemes || [],
      helplines: data.helplines || [],
    };
  } catch (err) {
    console.warn('Failed to fetch from /api/schemes, falling back to verified dataset:', err);
    const { VERIFIED_SCHEMES, VERIFIED_EMERGENCY_HELPLINES } = await import('../../shared/schemesData');
    return {
      schemes: VERIFIED_SCHEMES,
      helplines: VERIFIED_EMERGENCY_HELPLINES,
    };
  }
}

export async function sendChatMessage(params: {
  userMessage: string;
  history: Array<{ role: 'assistant' | 'user'; text: string }>;
  currentSchemeId?: string;
  language: SupportedLanguage;
  userAnswers: Record<string, any>;
  isFirstTimeUserMode?: boolean;
}): Promise<ChatResponse> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.statusText}`);
  }

  return await res.json();
}

export async function analyzeDocumentPhoto(params: {
  imageBase64: string;
  mimeType?: string;
  schemeId?: string;
  language: SupportedLanguage;
}): Promise<DocumentAnalysisResponse> {
  const res = await fetch('/api/analyze-document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error(`Failed to analyze document: ${res.statusText}`);
  }

  return await res.json();
}

export async function checkEligibility(schemeId: string, userAnswers: Record<string, any>) {
  const res = await fetch('/api/eligibility/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schemeId, userAnswers }),
  });
  return await res.json();
}

// User Auth APIs
export async function registerUser(data: { name: string; email: string; password: string; preferredLanguage?: string }) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function fetchCurrentUser(token?: string) {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch('/api/auth/me', { headers });
  return await res.json();
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const res = await fetch('/api/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, updates }),
  });
  return await res.json();
}

// Journey & Saved Schemes APIs
export async function fetchJourney(userId?: string): Promise<ApplicationJourney | null> {
  try {
    const url = userId ? `/api/journey?userId=${userId}` : '/api/journey';
    const res = await fetch(url);
    const data = await res.json();
    return data.journey || null;
  } catch {
    return null;
  }
}

export async function saveJourneyApi(journey: ApplicationJourney): Promise<boolean> {
  try {
    const res = await fetch('/api/journey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(journey),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchSavedSchemes(userId?: string): Promise<SavedSchemeItem[]> {
  try {
    const url = userId ? `/api/saved-schemes?userId=${userId}` : '/api/saved-schemes';
    const res = await fetch(url);
    const data = await res.json();
    return data.savedSchemes || [];
  } catch {
    return [];
  }
}

export async function toggleSaveSchemeApi(schemeId: string, isSaved: boolean, userId?: string) {
  if (isSaved) {
    const res = await fetch(`/api/saved-schemes/${schemeId}?userId=${userId || ''}`, {
      method: 'DELETE',
    });
    return await res.json();
  } else {
    const res = await fetch('/api/saved-schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeId, userId }),
    });
    return await res.json();
  }
}

export async function fetchHistory(userId?: string): Promise<JourneyHistoryItem[]> {
  try {
    const url = userId ? `/api/history?userId=${userId}` : '/api/history';
    const res = await fetch(url);
    const data = await res.json();
    return data.history || [];
  } catch {
    return [];
  }
}
