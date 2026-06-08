import { StyleSheet, View } from 'react-native';

import type { SpreadCounts } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors, VOTE_VALUES, type VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type SpreadSummaryBarProps = {
  counts: SpreadCounts;
  votedCount: number;
  expectedCount?: number;
  highlightMajority?: boolean;
};

function dominantScore(counts: SpreadCounts): VoteValue | null {
  let best: VoteValue | null = null;
  let bestCount = 0;
  for (const value of VOTE_VALUES) {
    if (counts[value] > bestCount) {
      best = value;
      bestCount = counts[value];
    }
  }
  return bestCount > 0 ? best : null;
}

export function SpreadSummaryBar({
  counts,
  votedCount,
  expectedCount,
  highlightMajority = true,
}: SpreadSummaryBarProps) {
  const totalVotes = VOTE_VALUES.reduce((sum, value) => sum + counts[value], 0);
  const dominant = dominantScore(counts);
  const turnoutLabel =
    expectedCount !== undefined ? `${votedCount} of ${expectedCount} voted` : `${votedCount} voted`;

  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="smallBold">Spread</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {turnoutLabel}
          {totalVotes > 0 && votedCount < (expectedCount ?? votedCount) ? ' · majority enough' : ''}
        </ThemedText>
      </View>
      <View style={styles.barRow}>
        {VOTE_VALUES.map((value) => {
          const count = counts[value];
          const fillHeight = totalVotes > 0 ? Math.round((count / totalVotes) * 64) : 0;
          const isDominant = highlightMajority && dominant === value && count > 0;
          return (
            <View key={value} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: fillHeight },
                    isDominant ? styles.barFillDominant : styles.barFillDefault,
                  ]}
                />
              </View>
              <ThemedText type="smallBold">{value}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {count}
              </ThemedText>
            </View>
          );
        })}
      </View>
      {dominant !== null && highlightMajority && (
        <ThemedText type="small" style={styles.majorityHint}>
          Room leaning <ThemedText type="smallBold">{dominant}</ThemedText>
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: Spacing.two,
    minHeight: 88,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
  },
  barTrack: {
    width: '100%',
    height: 64,
    borderRadius: Spacing.two,
    backgroundColor: FovColors.voteTrack,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: Spacing.two,
  },
  barFillDefault: {
    backgroundColor: FovColors.accent,
    opacity: 0.55,
  },
  barFillDominant: {
    backgroundColor: FovColors.ok,
  },
  majorityHint: {
    textAlign: 'center',
  },
});
