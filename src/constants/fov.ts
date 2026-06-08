/** FOV product semantic tokens — Storybook + session UI. */
export const FovColors = {
  ctaZone: '#1A1A1F',
  ctaZoneText: '#FFFFFF',
  goLive: '#34C759',
  goLivePressed: '#2AA84A',
  accent: '#3C87F7',
  warn: '#F5A623',
  danger: '#FF453A',
  ok: '#34C759',
  muted: '#9AA8BC',
  voteSelected: '#3C87F7',
  voteTrack: '#E0E1E6',
  voteTrackDark: '#2E3135',
} as const;

export type VoteValue = 1 | 2 | 3 | 4 | 5;

export const VOTE_VALUES: VoteValue[] = [1, 2, 3, 4, 5];
