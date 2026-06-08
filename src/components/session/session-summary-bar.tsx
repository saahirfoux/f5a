import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors, type VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type SessionSummaryBarProps = {
  votedCount: number;
  expectedCount?: number;
  dominantScore?: VoteValue | null;
  compact?: boolean;
};

export function SessionSummaryBar({
  votedCount,
  expectedCount,
  dominantScore = null,
  compact = false,
}: SessionSummaryBarProps) {
  const turnoutLabel =
    expectedCount !== undefined ? `${votedCount} of ${expectedCount} voted` : `${votedCount} voted`;

  return (
    <ThemedView type="backgroundElement" style={[styles.container, compact && styles.containerCompact]}>
      <ThemedText type="smallBold" style={compact && styles.turnoutCompact}>
        {turnoutLabel}
      </ThemedText>
      {dominantScore !== null ? (
        <View style={styles.scorePill}>
          <ThemedText type="smallBold" style={styles.scorePillLabel}>
            Leaning {dominantScore}
          </ThemedText>
        </View>
      ) : (
        <ThemedText type="small" themeColor="textSecondary">
          Waiting for votes
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  containerCompact: {
    padding: Spacing.two,
  },
  turnoutCompact: {
    fontSize: 14,
  },
  scorePill: {
    backgroundColor: FovColors.ok,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  scorePillLabel: {
    color: '#FFFFFF',
  },
});
