import React, { useState, useEffect } from 'react';
import {
  SupportedLanguage,
  GovernmentScheme,
  UserProfile,
  ApplicationJourney,
  SavedSchemeItem,
  JourneyHistoryItem,
  DocumentReadinessStatus,
} from '../shared/types';
import { VERIFIED_SCHEMES } from '../shared/schemesData';
import { TRANSLATIONS } from '../shared/translations';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { VoiceHomeScreen } from './components/VoiceHomeScreen';
import { ConversationScreen, ChatMessage } from './components/ConversationScreen';
import { SchemesDirectoryScreen } from './components/SchemesDirectoryScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { SavedSchemesScreen } from './components/SavedSchemesScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SafetyCenterModal } from './components/SafetyCenterModal';
import { HumanHelpModal } from './components/HumanHelpModal';
import { OfficialLinkModal } from './components/OfficialLinkModal';
import { AuthModal } from './components/AuthModal';
import { ResumeBanner } from './components/ResumeBanner';
import { VoiceOrbState } from './components/VoiceOrb';
import { speechService } from './services/speechService';
import {
  fetchSchemes,
  sendChatMessage,
  fetchCurrentUser,
  loginUser,
  registerUser,
  fetchJourney,
  saveJourneyApi,
  fetchSavedSchemes,
  toggleSaveSchemeApi,
  fetchHistory,
} from './services/apiService';

export default function App() {
  // Navigation & View Tab
  const [currentTab, setCurrentTab] = useState<
    'home' | 'assistant' | 'schemes' | 'journey' | 'saved' | 'profile'
  >('home');

  // Sub-view within assistant (landing vs active chat)
  const [assistantView, setAssistantView] = useState<'orb' | 'chat'>('orb');

  // Language & Accessibility
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isFirstTimeUserMode, setIsFirstTimeUserMode] = useState<boolean>(false);

  // User & Auth State
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Schemes & Active Selection
  const [schemes, setSchemes] = useState<GovernmentScheme[]>(VERIFIED_SCHEMES);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('kmut_scheme');
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(['kmut_scheme']);

  // Journey & History
  const [activeJourney, setActiveJourney] = useState<ApplicationJourney | null>(null);
  const [historyItems, setHistoryItems] = useState<JourneyHistoryItem[]>([]);
  const [showResumeBanner, setShowResumeBanner] = useState<boolean>(false);

  // Conversational Assistant State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isVerdictReady, setIsVerdictReady] = useState<boolean>(false);

  // Voice Interaction State
  const [voiceOrbState, setVoiceOrbState] = useState<VoiceOrbState>('idle');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.95);
  const [autoPlayVoice, setAutoPlayVoice] = useState<boolean>(true);

  // Modals
  const [isSafetyOpen, setIsSafetyOpen] = useState<boolean>(false);
  const [isHumanHelpOpen, setIsHumanHelpOpen] = useState<boolean>(false);
  const [officialModalUrl, setOfficialModalUrl] = useState<string | null>(null);

  const selectedScheme =
    schemes.find((s) => s.id === selectedSchemeId) || schemes[0] || VERIFIED_SCHEMES[0];

  // 1. Initial Load & Backend Sync
  useEffect(() => {
    // Fetch live schemes
    fetchSchemes().then((data) => {
      if (data.schemes && data.schemes.length > 0) {
        setSchemes(data.schemes);
      }
    });

    // Check stored user session token
    const storedToken = localStorage.getItem('herai_auth_token');
    if (storedToken) {
      setAuthToken(storedToken);
      fetchCurrentUser(storedToken).then((res) => {
        if (res.user) {
          setUser(res.user);
          if (res.user.preferredLanguage) {
            setLanguage(res.user.preferredLanguage);
          }
          if (res.user.isFirstTimeUserMode !== undefined) {
            setIsFirstTimeUserMode(res.user.isFirstTimeUserMode);
          }
        }
      });
    } else {
      // Guest initialization
      fetchCurrentUser().then((res) => {
        if (res.user) setUser(res.user);
      });
    }

    // Load active journey
    fetchJourney().then((j) => {
      if (j) {
        setActiveJourney(j);
        setSelectedSchemeId(j.schemeId);
        setUserAnswers(j.answeredCriteria || {});
        if (j.progressPercent > 20 && j.progressPercent < 100) {
          setShowResumeBanner(true);
        }
      }
    });

    // Load saved schemes
    fetchSavedSchemes().then((items) => {
      setSavedSchemeIds(items.map((i) => i.schemeId));
    });

    // Load history
    fetchHistory().then((hist) => {
      setHistoryItems(hist);
    });
  }, []);

  // 2. Voice Playback Helper
  const speakText = (text: string, onDone?: () => void) => {
    speechService.stopSpeaking();
    setIsSpeaking(true);
    setVoiceOrbState('speaking');

    speechService.speak(
      text,
      language,
      () => {
        setIsSpeaking(true);
        setVoiceOrbState('speaking');
      },
      () => {
        setIsSpeaking(false);
        setVoiceOrbState('idle');
        if (onDone) onDone();
      }
    );
  };

  const stopSpeaking = () => {
    speechService.stopSpeaking();
    setIsSpeaking(false);
    if (voiceOrbState === 'speaking') {
      setVoiceOrbState('idle');
    }
  };

  // 3. Toggle Speech Recognition
  const handleToggleVoice = () => {
    if (voiceOrbState === 'listening') {
      speechService.stopListening();
      setVoiceOrbState('idle');
      return;
    }

    stopSpeaking();
    setVoiceOrbState('listening');

    const started = speechService.startListening(
      language,
      (transcript, isFinal) => {
        if (isFinal && transcript.trim()) {
          setVoiceOrbState('processing');
          handleUserSendMessage(transcript.trim());
        }
      },
      (err) => {
        console.warn('Speech recognition warning:', err);
        setVoiceOrbState('idle');
      },
      () => {
        setVoiceOrbState((curr) => (curr === 'listening' ? 'idle' : curr));
      }
    );

    if (!started) {
      setVoiceOrbState('idle');
    }
  };

  // 4. Send Chat Message (Voice or Typed)
  const handleUserSendMessage = async (text: string) => {
    stopSpeaking();
    setVoiceOrbState('processing');

    const newUserMsg: ChatMessage = {
      role: 'user',
      text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);

    // Switch to active chat conversation view if not already there
    setCurrentTab('assistant');
    setAssistantView('chat');

    try {
      const response = await sendChatMessage({
        userMessage: text,
        history: updatedMessages.map((m) => ({ role: m.role, text: m.text })),
        currentSchemeId: selectedSchemeId,
        language,
        userAnswers,
        isFirstTimeUserMode,
      });

      if (response.matchedSchemeId) {
        setSelectedSchemeId(response.matchedSchemeId);
      }

      if (response.isVerdictReady) {
        setIsVerdictReady(true);
      }

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        text: response.reply,
        timestamp: Date.now(),
        quickReplies: response.quickReplies,
        isSecurityAlert: response.isSecurityAlert,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setVoiceOrbState('idle');

      // Auto-play voice if setting is enabled
      if (autoPlayVoice) {
        const toSpeak = response.voiceText || response.reply;
        speakText(toSpeak);
      }
    } catch (err) {
      console.warn('Chat API error, using safe assistant response:', err);
      setVoiceOrbState('idle');

      const fallbackReply =
        language === 'ta'
          ? 'வணக்கம் அம்மா! கலைஞர் மகளிர் உரிமைத் திட்டம் மூலம் மாதம் ₹1,000 உரிமைத் தொகை பெறலாம். குடும்ப அட்டையில் உங்கள் பெயர் குடும்பத் தலைவியாக உள்ளதா?'
          : 'Under the Magalir Urimai Scheme, eligible women receive ₹1,000 monthly. Are you designated as the woman head on your Smart Ration Card?';

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        text: fallbackReply,
        timestamp: Date.now(),
        quickReplies: language === 'ta' ? ['ஆம் 👍', 'இல்லை 👎'] : ['Yes 👍', 'No 👎'],
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (autoPlayVoice) speakText(fallbackReply);
    }
  };

  // 5. Auth Handlers
  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await loginUser(data);
    if (res.success && res.user) {
      setUser(res.user);
      setAuthToken(res.token);
      localStorage.setItem('herai_auth_token', res.token);
      if (res.user.preferredLanguage) setLanguage(res.user.preferredLanguage);
    } else {
      throw new Error(res.error || 'Login failed');
    }
  };

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    const res = await registerUser({ ...data, preferredLanguage: language });
    if (res.success && res.user) {
      setUser(res.user);
      setAuthToken(res.token);
      localStorage.setItem('herai_auth_token', res.token);
    } else {
      throw new Error(res.error || 'Registration failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('herai_auth_token');
    setAuthToken(null);
    setUser({
      id: 'guest_user',
      name: 'Guest User',
      email: 'guest@herai.app',
      preferredLanguage: language,
      voiceSpeed: 0.95,
      autoPlayVoice: true,
      isFirstTimeUserMode: false,
      createdAt: Date.now(),
    });
  };

  // 6. Save Scheme Handler
  const handleToggleSaveScheme = async (schemeId: string) => {
    const isCurrentlySaved = savedSchemeIds.includes(schemeId);
    const newSaved = isCurrentlySaved
      ? savedSchemeIds.filter((id) => id !== schemeId)
      : [...savedSchemeIds, schemeId];

    setSavedSchemeIds(newSaved);
    await toggleSaveSchemeApi(schemeId, isCurrentlySaved, user?.id);
  };

  // 7. Update Document Status in Journey
  const handleUpdateDocumentStatus = (docId: string, status: DocumentReadinessStatus) => {
    if (!activeJourney) return;
    const updatedJourney = {
      ...activeJourney,
      documentStatus: {
        ...(activeJourney.documentStatus || {}),
        [docId]: status,
      },
    };
    setActiveJourney(updatedJourney);
    saveJourneyApi(updatedJourney);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-all pb-16 md:pb-0 ${
        isLargeText ? 'text-lg' : 'text-base'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          stopSpeaking();
          setCurrentTab(tab);
        }}
        language={language}
        onLanguageChange={(newLang) => {
          setLanguage(newLang);
          stopSpeaking();
        }}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenHumanHelp={() => setIsHumanHelpOpen(true)}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        isSpeaking={isSpeaking}
        onStopSpeaking={stopSpeaking}
        user={user}
        isFirstTimeUserMode={isFirstTimeUserMode}
      />

      {/* Resume Journey Banner */}
      {showResumeBanner && activeJourney && (
        <ResumeBanner
          language={language}
          progressPercent={activeJourney.progressPercent}
          onResume={() => {
            stopSpeaking();
            setCurrentTab('journey');
            setShowResumeBanner(false);
          }}
          onDismiss={() => setShowResumeBanner(false)}
          schemeName={selectedScheme.nameEn}
        />
      )}

      {/* Main Views */}
      <main className="flex-1">
        {/* 1. HOME SCREEN */}
        {currentTab === 'home' && (
          <WelcomeScreen
            language={language}
            onLanguageChange={setLanguage}
            onStartVoice={() => {
              stopSpeaking();
              setCurrentTab('assistant');
              setAssistantView('orb');
              const welcomeVoice =
                language === 'ta'
                  ? 'வணக்கம் அம்மா! HerAI-க்கு நல்வரவு. உங்களுக்கு என்ன அரசு உதவி வேண்டும் என்று பேசுங்கள்.'
                  : 'Welcome to HerAI! Speak naturally in any language you are comfortable with.';
              speakText(welcomeVoice);
            }}
            onStartType={() => {
              stopSpeaking();
              setCurrentTab('assistant');
              setAssistantView('chat');
              if (messages.length === 0) {
                setMessages([
                  {
                    role: 'assistant',
                    text:
                      language === 'ta'
                        ? 'வணக்கம்! உங்களுக்கு எந்த அரசு திட்டம் பற்றி அறிய வேண்டும்?'
                        : 'Hello! Which government welfare scheme would you like to explore today?',
                    timestamp: Date.now(),
                    quickReplies:
                      language === 'ta'
                        ? ['மகளிர் உரிமைத் தொகை', 'இலவச தையல் இயந்திரம்', 'புதுமைப் பெண் திட்டம்']
                        : ['Magalir Urimai ₹1,000', 'Free Sewing Machine', 'Widow Pension'],
                  },
                ]);
              }
            }}
            onSelectScheme={(sch) => {
              stopSpeaking();
              setSelectedSchemeId(sch.id);
              setCurrentTab('journey');
            }}
            schemes={schemes}
            isLargeText={isLargeText}
            isFirstTimeUserMode={isFirstTimeUserMode}
            onToggleFirstTimeMode={() => setIsFirstTimeUserMode(!isFirstTimeUserMode)}
          />
        )}

        {/* 2. AI ASSISTANT (Voice Orb Home vs Chat Conversation) */}
        {currentTab === 'assistant' && (
          <>
            {assistantView === 'orb' ? (
              <VoiceHomeScreen
                language={language}
                schemes={schemes}
                onSelectPrompt={(promptText, schemeId) => {
                  stopSpeaking();
                  if (schemeId) setSelectedSchemeId(schemeId);
                  handleUserSendMessage(promptText);
                }}
                onOpenTypeMode={() => {
                  stopSpeaking();
                  setAssistantView('chat');
                  if (messages.length === 0) {
                    setMessages([
                      {
                        role: 'assistant',
                        text:
                          language === 'ta'
                            ? 'வணக்கம்! உங்களுக்கு எந்த அரசு திட்டம் பற்றி அறிய வேண்டும்?'
                            : 'Hello! What government assistance can I guide you with today?',
                        timestamp: Date.now(),
                        quickReplies: ['Magalir Urimai ₹1,000', 'Free Sewing Machine', 'Widow Pension'],
                      },
                    ]);
                  }
                }}
                voiceOrbState={voiceOrbState}
                onToggleVoice={handleToggleVoice}
                isLargeText={isLargeText}
                isFirstTimeUserMode={isFirstTimeUserMode}
                onToggleFirstTimeMode={() => setIsFirstTimeUserMode(!isFirstTimeUserMode)}
              />
            ) : (
              <ConversationScreen
                language={language}
                messages={messages}
                currentScheme={selectedScheme}
                onSendMessage={handleUserSendMessage}
                voiceOrbState={voiceOrbState}
                onToggleVoice={handleToggleVoice}
                onReplayAudio={(text) => speakText(text)}
                isSpeaking={isSpeaking}
                onStopSpeaking={stopSpeaking}
                isLargeText={isLargeText}
                onViewEligibility={() => {
                  stopSpeaking();
                  setCurrentTab('journey');
                }}
                isVerdictReady={isVerdictReady}
                onRestartConversation={() => {
                  setMessages([]);
                  setAssistantView('orb');
                }}
                isFirstTimeUserMode={isFirstTimeUserMode}
              />
            )}
          </>
        )}

        {/* 3. SCHEMES DIRECTORY */}
        {currentTab === 'schemes' && (
          <SchemesDirectoryScreen
            language={language}
            schemes={schemes}
            savedSchemeIds={savedSchemeIds}
            onToggleSaveScheme={handleToggleSaveScheme}
            onSelectScheme={(sch) => {
              stopSpeaking();
              setSelectedSchemeId(sch.id);
              setCurrentTab('journey');
            }}
            onCheckEligibility={(sch) => {
              stopSpeaking();
              setSelectedSchemeId(sch.id);
              setCurrentTab('assistant');
              setAssistantView('chat');
              handleUserSendMessage(
                language === 'ta'
                  ? `${sch.name} திட்டத்திற்கு எனது தகுதியை சரிபார்க்கவும்.`
                  : `Please check my eligibility for ${sch.nameEn}.`
              );
            }}
            isLargeText={isLargeText}
          />
        )}

        {/* 4. VISUAL JOURNEY & DOCUMENT READINESS CHECK */}
        {currentTab === 'journey' && (
          <JourneyScreen
            language={language}
            journey={activeJourney}
            scheme={selectedScheme}
            onOpenOfficialPortal={(url) => setOfficialModalUrl(url)}
            onOpenHumanHelp={() => setIsHumanHelpOpen(true)}
            onUpdateDocumentStatus={handleUpdateDocumentStatus}
            onSpeakText={(text) => speakText(text)}
            isLargeText={isLargeText}
            onContinueAssistant={() => {
              setCurrentTab('assistant');
              setAssistantView('chat');
            }}
          />
        )}

        {/* 5. SAVED SCHEMES */}
        {currentTab === 'saved' && (
          <SavedSchemesScreen
            language={language}
            savedItems={savedSchemeIds.map((id) => ({
              id: 'saved_' + id,
              schemeId: id,
              savedAt: Date.now(),
            }))}
            schemes={schemes}
            onRemoveSaved={handleToggleSaveScheme}
            onContinueScheme={(sch) => {
              stopSpeaking();
              setSelectedSchemeId(sch.id);
              setCurrentTab('journey');
            }}
            onBrowseSchemes={() => setCurrentTab('schemes')}
            isLargeText={isLargeText}
          />
        )}

        {/* 6. PROFILE & SETTINGS */}
        {currentTab === 'profile' && (
          <ProfileScreen
            language={language}
            onLanguageChange={setLanguage}
            user={user}
            history={historyItems}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSignOut={handleSignOut}
            onOpenSafetyCenter={() => setIsSafetyOpen(true)}
            isFirstTimeUserMode={isFirstTimeUserMode}
            onToggleFirstTimeMode={() => setIsFirstTimeUserMode(!isFirstTimeUserMode)}
            voiceSpeed={voiceSpeed}
            onChangeVoiceSpeed={setVoiceSpeed}
            autoPlayVoice={autoPlayVoice}
            onToggleAutoPlayVoice={() => setAutoPlayVoice(!autoPlayVoice)}
            isLargeText={isLargeText}
          />
        )}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          stopSpeaking();
          setCurrentTab(tab);
        }}
        language={language}
      />

      {/* Safety Center Modal */}
      <SafetyCenterModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
        language={language}
      />

      {/* Human Help & e-Sevai Modal */}
      <HumanHelpModal
        isOpen={isHumanHelpOpen}
        onClose={() => setIsHumanHelpOpen(false)}
        language={language}
      />

      {/* Official Government Website Modal */}
      <OfficialLinkModal
        isOpen={!!officialModalUrl}
        onClose={() => setOfficialModalUrl(null)}
        targetUrl={officialModalUrl || ''}
        schemeName={selectedScheme.nameEn}
        language={language}
      />

      {/* Sign In / Create Account Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        language={language}
      />
    </div>
  );
}
