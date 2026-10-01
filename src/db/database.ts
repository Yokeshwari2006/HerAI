import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { UserProfile, ApplicationJourney, SavedSchemeItem, JourneyHistoryItem, GovernmentScheme } from '../../shared/types';
import { VERIFIED_SCHEMES } from '../../shared/schemesData';

interface DatabaseSchema {
  users: Array<UserProfile & { passwordHash: string }>;
  journeys: ApplicationJourney[];
  savedSchemes: SavedSchemeItem[];
  history: JourneyHistoryItem[];
}

// Local / serverless database paths
// Note for production scale on Vercel: Vercel serverless runs in read-only /var/task with ephemeral /tmp.
// For multi-region persistent production data across lambdas, connect a hosted database (e.g., PostgreSQL, Supabase, Neon)
// by setting DATABASE_URL. The architecture below provides a resilient in-memory + fallback store that never throws EROFS.
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'herai_db.json');
const TMP_DATA_DIR = path.resolve('/tmp', 'herai_data');
const TMP_DB_FILE = path.join(TMP_DATA_DIR, 'herai_db.json');

class DatabaseService {
  private data: DatabaseSchema = {
    users: [],
    journeys: [],
    savedSchemes: [],
    history: [],
  };

  constructor() {
    this.init();
  }

  private init() {
    try {
      // 1. Try reading from primary data directory
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        return;
      }

      // 2. Try reading from serverless /tmp fallback directory
      if (fs.existsSync(TMP_DB_FILE)) {
        const raw = fs.readFileSync(TMP_DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
        return;
      }

      // 3. Seed default demo user and initial journey in memory
      this.seedInitialData();
      this.save();
    } catch (err) {
      console.warn('Could not read persistent DB file, using memory store:', err);
      this.seedInitialData();
    }
  }

  private seedInitialData() {
    const demoPasswordHash = this.hashPassword('herai123');
    const demoUserId = 'user_demo_01';

    this.data.users = [
      {
        id: demoUserId,
        name: 'Ananya Devi',
        email: 'ananya@example.com',
        phone: '9876543210',
        preferredLanguage: 'en',
        voiceSpeed: 0.95,
        autoPlayVoice: true,
        isFirstTimeUserMode: false,
        createdAt: Date.now() - 86400000 * 3,
        passwordHash: demoPasswordHash,
      },
    ];

    this.data.journeys = [
      {
        id: 'journey_kmut_01',
        userId: demoUserId,
        schemeId: 'kmut_scheme',
        currentStepIndex: 2,
        totalSteps: 4,
        progressPercent: 65,
        answeredCriteria: {
          age: 34,
          family_head: true,
          annual_income: true,
          eb_consumption: true,
        },
        eligibilityStatus: {
          isLikelyEligible: true,
          reason: 'Meets age (34), family head, and income criteria under ₹2.5 Lakhs.',
        },
        documentStatus: {
          ration_card: 'ready',
          aadhaar_card: 'ready',
          bank_passbook: 'needs_attention',
          eb_receipt: 'missing',
        },
        uploadedDocuments: [],
        completedStepNumbers: [1, 2],
        createdAt: Date.now() - 86400000 * 2,
        updatedAt: Date.now() - 3600000 * 4,
      },
    ];

    this.data.savedSchemes = [
      {
        id: 'saved_01',
        userId: demoUserId,
        schemeId: 'kmut_scheme',
        savedAt: Date.now() - 86400000 * 2,
        notes: 'Monthly ₹1,000 for family head',
      },
      {
        id: 'saved_02',
        userId: demoUserId,
        schemeId: 'free_sewing_machine',
        savedAt: Date.now() - 86400000,
        notes: 'Free sewing machine for tailoring self-employment',
      },
    ];

    this.data.history = [
      {
        id: 'hist_01',
        userId: demoUserId,
        title: 'Kalaignar Magalir Urimai Thittam',
        schemeId: 'kmut_scheme',
        dateStr: 'Yesterday',
        status: 'in_progress',
        summary: 'Checked eligibility and prepared Aadhaar and Ration Card documents.',
        timestamp: Date.now() - 86400000,
      },
      {
        id: 'hist_02',
        userId: demoUserId,
        title: 'Free Sewing Machine Scheme',
        schemeId: 'free_sewing_machine',
        dateStr: '3 days ago',
        status: 'completed',
        summary: 'Viewed required tailoring certificates and DSWO application steps.',
        timestamp: Date.now() - 86400000 * 3,
      },
    ];
  }

  private save() {
    // 1. Try saving to standard local DATA_DIR
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
      return;
    } catch {
      // Ignored: Likely running in a serverless read-only environment like Vercel Lambda
    }

    // 2. Fallback to writable serverless /tmp
    try {
      if (!fs.existsSync(TMP_DATA_DIR)) {
        fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(TMP_DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch {
      // Memory state is maintained even if disk write fails
    }
  }

  public hashPassword(pwd: string): string {
    return crypto.createHash('sha256').update(pwd + 'HERAI_SALT_2026').digest('hex');
  }

  // User Auth Methods
  public findUserByEmail(email: string) {
    return this.data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: string) {
    return this.data.users.find((u) => u.id === id);
  }

  public createUser(userData: {
    name: string;
    email: string;
    password: string;
    preferredLanguage?: any;
  }) {
    const existing = this.findUserByEmail(userData.email);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: userData.name,
      email: userData.email.toLowerCase(),
      passwordHash: this.hashPassword(userData.password),
      preferredLanguage: userData.preferredLanguage || 'en',
      voiceSpeed: 0.95,
      autoPlayVoice: true,
      isFirstTimeUserMode: false,
      createdAt: Date.now(),
    };

    this.data.users.push(newUser);
    this.save();

    const { passwordHash, ...safeUser } = newUser;
    return safeUser;
  }

  public updateUserProfile(
    userId: string,
    updates: Partial<UserProfile>
  ): UserProfile | null {
    const userIndex = this.data.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) return null;

    this.data.users[userIndex] = {
      ...this.data.users[userIndex],
      ...updates,
    };
    this.save();

    const { passwordHash, ...safeUser } = this.data.users[userIndex];
    return safeUser;
  }

  // Journey Methods
  public getJourney(userId?: string): ApplicationJourney | null {
    if (userId) {
      const found = this.data.journeys.find((j) => j.userId === userId);
      if (found) return found;
    }
    // Return latest journey
    return this.data.journeys[0] || null;
  }

  public saveJourney(journey: ApplicationJourney): ApplicationJourney {
    const index = this.data.journeys.findIndex(
      (j) => j.id === journey.id || (journey.userId && j.userId === journey.userId)
    );

    if (index !== -1) {
      this.data.journeys[index] = {
        ...this.data.journeys[index],
        ...journey,
        updatedAt: Date.now(),
      };
    } else {
      this.data.journeys.unshift({
        ...journey,
        id: journey.id || 'jrn_' + Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    this.save();
    return journey;
  }

  // Saved Schemes Methods
  public getSavedSchemes(userId?: string): SavedSchemeItem[] {
    if (userId) {
      return this.data.savedSchemes.filter((s) => s.userId === userId || !s.userId);
    }
    return this.data.savedSchemes;
  }

  public addSavedScheme(item: { schemeId: string; userId?: string; notes?: string }): SavedSchemeItem {
    const existing = this.data.savedSchemes.find(
      (s) => s.schemeId === item.schemeId && (!item.userId || s.userId === item.userId)
    );
    if (existing) return existing;

    const newItem: SavedSchemeItem = {
      id: 'saved_' + Date.now(),
      schemeId: item.schemeId,
      userId: item.userId,
      savedAt: Date.now(),
      notes: item.notes,
    };
    this.data.savedSchemes.unshift(newItem);
    this.save();
    return newItem;
  }

  public removeSavedScheme(schemeId: string, userId?: string): boolean {
    const initLen = this.data.savedSchemes.length;
    this.data.savedSchemes = this.data.savedSchemes.filter(
      (s) => !(s.schemeId === schemeId && (!userId || s.userId === userId))
    );
    this.save();
    return this.data.savedSchemes.length < initLen;
  }

  // History Methods
  public getHistory(userId?: string): JourneyHistoryItem[] {
    if (userId) {
      return this.data.history.filter((h) => h.userId === userId || !h.userId);
    }
    return this.data.history;
  }

  public addHistoryItem(item: Omit<JourneyHistoryItem, 'id' | 'timestamp'>): JourneyHistoryItem {
    const newEntry: JourneyHistoryItem = {
      id: 'hist_' + Date.now(),
      ...item,
      timestamp: Date.now(),
    };
    this.data.history.unshift(newEntry);
    this.save();
    return newEntry;
  }
}

export const dbService = new DatabaseService();
