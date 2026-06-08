import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { mockSessionList, TOPIC_ALL_HANDS, TOPIC_PARTY, TOPIC_UNTITLED } from '@/components/session/mock-data';
import type { MockSessionListItem, SessionPresetId } from '@/components/session/types';

export type MockHostSession = {
  id: string;
  topic: string;
  untitledTopic: boolean;
  preset: SessionPresetId;
  showPublicResults: boolean;
  hostEntered: boolean;
  label: string;
  createdAt: string;
  voteCount: number;
};

type CreateSessionOptions = {
  preset?: SessionPresetId;
  topic?: string;
  untitledTopic?: boolean;
};

type MockSessionContextValue = {
  activeSessionId: string | null;
  getSession: (id: string) => MockHostSession | undefined;
  listEntries: MockSessionListItem[];
  createSession: (options?: CreateSessionOptions) => MockHostSession;
  markHostEntered: (id: string) => void;
  setActiveSessionId: (id: string | null) => void;
};

const MockSessionContext = createContext<MockSessionContextValue | null>(null);

function newSessionId(): string {
  return `session-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatCreatedAt(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function defaultTopicForPreset(preset: SessionPresetId): { topic: string; untitledTopic: boolean } {
  switch (preset) {
    case 'party':
      return { topic: TOPIC_UNTITLED, untitledTopic: true };
    case 'all-hands':
      return { topic: TOPIC_ALL_HANDS, untitledTopic: false };
    case 'team':
      return { topic: 'Daily standup vibe check', untitledTopic: false };
    case 'creator':
      return { topic: 'Weekly video — audience poll', untitledTopic: false };
    default:
      return { topic: TOPIC_PARTY, untitledTopic: false };
  }
}

function labelForSession(session: MockHostSession): string {
  return session.untitledTopic ? 'Untitled session' : session.topic;
}

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Record<string, MockHostSession>>({});
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const getSession = useCallback((id: string) => sessions[id], [sessions]);

  const createSession = useCallback((options?: CreateSessionOptions) => {
    const preset = options?.preset ?? 'party';
    const defaults = defaultTopicForPreset(preset);
    const topic = options?.topic ?? defaults.topic;
    const untitledTopic = options?.untitledTopic ?? defaults.untitledTopic;
    const now = new Date();

    const session: MockHostSession = {
      id: newSessionId(),
      topic,
      untitledTopic,
      preset,
      showPublicResults: preset === 'all-hands',
      hostEntered: false,
      label: untitledTopic ? 'Untitled session' : topic,
      createdAt: formatCreatedAt(now),
      voteCount: 0,
    };

    setSessions((prev) => ({ ...prev, [session.id]: session }));
    setActiveSessionId(session.id);
    return session;
  }, []);

  const markHostEntered = useCallback((id: string) => {
    setSessions((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      return { ...prev, [id]: { ...existing, hostEntered: true } };
    });
  }, []);

  const listEntries = useMemo(() => {
    const created: MockSessionListItem[] = Object.values(sessions).map((session) => ({
      id: session.id,
      title: labelForSession(session),
      createdAt: session.createdAt,
      voteCount: session.voteCount,
    }));

    const createdIds = new Set(created.map((entry) => entry.id));
    const seeded = mockSessionList.filter((entry) => !createdIds.has(entry.id));
    return [...created, ...seeded];
  }, [sessions]);

  const value = useMemo(
    () => ({
      activeSessionId,
      getSession,
      listEntries,
      createSession,
      markHostEntered,
      setActiveSessionId,
    }),
    [activeSessionId, getSession, listEntries, createSession, markHostEntered],
  );

  return <MockSessionContext.Provider value={value}>{children}</MockSessionContext.Provider>;
}

export function useMockSession() {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error('useMockSession must be used within MockSessionProvider');
  }
  return context;
}
