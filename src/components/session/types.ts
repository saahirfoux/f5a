import type { VoteValue } from '@/constants/fov';

export type GoLiveVariant = 'default' | 'loading' | 'resume-active';

export type EnterSessionVariant = 'default' | 'loading' | 'entered';

export type RealtimeBannerVariant = 'takeover' | 'topic-change' | 'disconnect' | 'session-end';

export type SessionStateVariant = 'scheduled' | 'session-over';

export type RosterEntryStatus = 'pending' | 'cast';

export type LiveVoteRosterEntry = {
  id: string;
  name?: string;
  vote?: VoteValue;
  status: RosterEntryStatus;
};

export type SpreadCounts = Record<VoteValue, number>;

export type PublicResultsExpiry = 'default' | 'hour' | 'day' | 'days';

export type SessionListRowVariant = 'default' | 'unread' | 'editing';

export type SessionPresetId = 'team' | 'party' | 'all-hands' | 'creator';

export type MenuAuthState = 'signed-in' | 'login' | 'loading' | 'error';

export type MockSessionListItem = {
  id: string;
  title: string;
  createdAt: string;
  voteCount: number;
  unreadVotes?: number;
};

export type SessionPreset = {
  id: SessionPresetId;
  label: string;
  emoji: string;
  description: string;
};
