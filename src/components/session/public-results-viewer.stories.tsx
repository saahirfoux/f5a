import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { allHandsSpread, TOPIC_ALL_HANDS } from '@/components/session/mock-data';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { projectorFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function PublicResultsViewer({
  topic,
  votedCount,
  expectedCount,
  counts,
}: {
  topic: string;
  votedCount: number;
  expectedCount: number;
  counts: typeof allHandsSpread;
}) {
  return (
    <ThemedView type="backgroundElement" style={styles.viewer}>
      <View style={styles.liveRow}>
        <View style={styles.liveDot} />
        <ThemedText type="smallBold" style={styles.liveLabel}>
          Live
        </ThemedText>
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.sectionLabel}>
        Current topic
      </ThemedText>
      <ThemedText style={styles.topic}>{topic}</ThemedText>

      <SpreadSummaryBar
        counts={counts}
        votedCount={votedCount}
        expectedCount={expectedCount}
        highlightMajority
      />

      <ThemedText type="small" themeColor="textSecondary" style={styles.footer}>
        Anonymous aggregate · updates in realtime
      </ThemedText>
    </ThemedView>
  );
}

const meta = {
  title: 'Session/Slice3/PublicResultsViewer',
  component: PublicResultsViewer,
  decorators: [projectorFrameDecorator],
  args: {
    topic: TOPIC_ALL_HANDS,
    votedCount: 14,
    expectedCount: 40,
    counts: allHandsSpread,
  },
  argTypes: {
    counts: { control: false },
  },
} satisfies Meta<typeof PublicResultsViewer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryCAllHands: Story = {
  args: {
    topic: TOPIC_ALL_HANDS,
    votedCount: 14,
    expectedCount: 40,
    counts: allHandsSpread,
  },
};

export const LowTurnout: Story = {
  args: {
    topic: TOPIC_ALL_HANDS,
    votedCount: 6,
    expectedCount: 40,
    counts: { 1: 0, 2: 1, 3: 2, 4: 2, 5: 1 },
  },
};

const styles = StyleSheet.create({
  viewer: {
    borderRadius: Spacing.four,
    padding: Spacing.five,
    gap: Spacing.four,
    alignSelf: 'stretch',
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    alignSelf: 'flex-start',
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: FovColors.danger,
  },
  liveLabel: {
    color: FovColors.danger,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionLabel: {
    marginBottom: -Spacing.two,
  },
  topic: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  footer: {
    textAlign: 'center',
    marginTop: Spacing.two,
  },
});
