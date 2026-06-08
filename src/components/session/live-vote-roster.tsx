import { StyleSheet, View } from 'react-native';

import type { LiveVoteRosterEntry } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type LiveVoteRosterProps = {
  entries: LiveVoteRosterEntry[];
  /** Hide names; show aggregate vote counts only (Story C presenter mode). */
  anonymousMode?: boolean;
};

function VoteBadge({ vote, status }: { vote?: LiveVoteRosterEntry['vote']; status: LiveVoteRosterEntry['status'] }) {
  if (status === 'pending') {
    return (
      <View style={[styles.badge, styles.badgePending]}>
        <ThemedText type="smallBold" style={styles.badgePendingText}>
          …
        </ThemedText>
      </View>
    );
  }

  const isLow = vote !== undefined && vote <= 3;
  return (
    <View style={[styles.badge, isLow ? styles.badgeLow : styles.badgeCast]}>
      <ThemedText type="smallBold" style={styles.badgeCastText}>
        {vote}
      </ThemedText>
    </View>
  );
}

export function LiveVoteRoster({ entries, anonymousMode = false }: LiveVoteRosterProps) {
  if (anonymousMode) {
    const cast = entries.filter((entry) => entry.status === 'cast' && entry.vote !== undefined);
    const pending = entries.filter((entry) => entry.status === 'pending').length;
    const totals = cast.reduce<Record<number, number>>((acc, entry) => {
      const vote = entry.vote!;
      acc[vote] = (acc[vote] ?? 0) + 1;
      return acc;
    }, {});

    return (
      <ThemedView type="backgroundElement" style={styles.panel}>
        <ThemedText type="smallBold">Live votes (anonymous)</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {cast.length} cast · {pending} deciding
        </ThemedText>
        <View style={styles.anonymousRow}>
          {[5, 4, 3, 2, 1].map((score) => (
            <View key={score} style={styles.anonymousCell}>
              <ThemedText type="smallBold">{score}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {totals[score] ?? 0}
              </ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView type="backgroundElement" style={styles.panel}>
      <View style={styles.headerRow}>
        <ThemedText type="smallBold">Who voted</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {entries.filter((e) => e.status === 'cast').length} of {entries.length}
        </ThemedText>
      </View>
      <View style={styles.list}>
        {entries.map((entry) => (
          <View key={entry.id} style={styles.row}>
            <ThemedText style={styles.name}>{entry.name ?? 'Guest'}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.status}>
              {entry.status === 'pending' ? 'Deciding…' : 'Voted'}
            </ThemedText>
            <VoteBadge vote={entry.vote} status={entry.status} />
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  name: {
    flex: 1,
    fontWeight: '600',
  },
  status: {
    width: 72,
  },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgePending: {
    backgroundColor: FovColors.voteTrack,
  },
  badgePendingText: {
    color: FovColors.muted,
  },
  badgeCast: {
    backgroundColor: FovColors.ok,
  },
  badgeLow: {
    backgroundColor: FovColors.warn,
  },
  badgeCastText: {
    color: '#FFFFFF',
  },
  anonymousRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.two,
  },
  anonymousCell: {
    alignItems: 'center',
    gap: Spacing.half,
    minWidth: 44,
  },
});
