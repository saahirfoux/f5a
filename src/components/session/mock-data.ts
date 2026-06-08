import type {
  LiveVoteRosterEntry,
  MockSessionListItem,
  SessionPreset,
  SpreadCounts,
} from '@/components/session/types';

export const standupRoster: LiveVoteRosterEntry[] = [
  { id: '1', name: 'Alex', vote: 5, status: 'cast' },
  { id: '2', name: 'Sam', vote: 5, status: 'cast' },
  { id: '3', name: 'John', vote: 3, status: 'cast' },
  { id: '4', name: 'Priya', vote: 4, status: 'cast' },
  { id: '5', name: 'Jordan', status: 'pending' },
];

export const partyRosterPartial: LiveVoteRosterEntry[] = [
  { id: '1', name: 'Guest 1', vote: 5, status: 'cast' },
  { id: '2', name: 'Guest 2', vote: 5, status: 'cast' },
  { id: '3', name: 'Guest 3', vote: 4, status: 'cast' },
  { id: '4', name: 'Guest 4', status: 'pending' },
  { id: '5', name: 'Guest 5', status: 'pending' },
];

export const standupSpread: SpreadCounts = { 1: 0, 2: 0, 3: 1, 4: 1, 5: 2 };

export const partySpreadMajority: SpreadCounts = { 1: 0, 2: 0, 3: 0, 4: 1, 5: 2 };

export const MOCK_SESSION_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
export const MOCK_JOIN_URL = `https://app.fistoffive.co/session/${MOCK_SESSION_ID}`;

export const TOPIC_PARTY = 'Order more pizza?';
export const TOPIC_STANDUP = 'Daily standup vibe check';
export const TOPIC_ALL_HANDS = 'Move taco Tuesday to Thursday?';
export const TOPIC_UNTITLED = 'Untitled';

export const MOCK_PUBLIC_RESULTS_TOKEN = 'pub_7f3a9c2e1b4d8f6a';
export const MOCK_PUBLIC_RESULTS_URL = `https://app.fistoffive.co/results/${MOCK_PUBLIC_RESULTS_TOKEN}`;

export const allHandsSpread: SpreadCounts = { 1: 0, 2: 1, 3: 2, 4: 8, 5: 3 };

export const mockSessionList: MockSessionListItem[] = [
  {
    id: 's1',
    title: 'Weekly video #47 — Best pizza toppings?',
    createdAt: 'Jun 2, 2026',
    voteCount: 12,
    unreadVotes: 3,
  },
  {
    id: 's2',
    title: 'Weekly video #46 — React vs Vue',
    createdAt: 'May 26, 2026',
    voteCount: 8,
  },
  {
    id: 's3',
    title: 'Weekly video #45 — Remote work tips',
    createdAt: 'May 19, 2026',
    voteCount: 0,
  },
  {
    id: 's4',
    title: 'Daily standup — Jun 7',
    createdAt: 'Jun 7, 2026',
    voteCount: 5,
    unreadVotes: 1,
  },
  {
    id: 's5',
    title: 'Party pizza vote',
    createdAt: 'May 30, 2026',
    voteCount: 18,
  },
];

export const SESSION_PRESETS: SessionPreset[] = [
  {
    id: 'team',
    label: 'Team',
    emoji: '👥',
    description: 'Identified roster — great for standups and 1:1 follow-ups',
  },
  {
    id: 'party',
    label: 'Party',
    emoji: '🎉',
    description: 'Partial turnout is OK — skip the formal topic if you are in a hurry',
  },
  {
    id: 'all-hands',
    label: 'All-hands',
    emoji: '🏢',
    description: 'Anonymous to the room with a public results link for the projector',
  },
  {
    id: 'creator',
    label: 'Creator',
    emoji: '📹',
    description: 'Async-friendly — share links across social and track sessions in your list',
  },
];
