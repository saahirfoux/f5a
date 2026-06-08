import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { partySpreadMajority, TOPIC_PARTY } from '@/components/session/mock-data';
import { SessionSummaryBar } from '@/components/session/session-summary-bar';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { TopicHeader } from '@/components/session/topic-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

function HostResumeFrame() {
  return (
    <View style={styles.screen}>
      <ThemedText type="small" themeColor="textSecondary">
        Reopened from push notification
      </ThemedText>
      <TopicHeader topic={TOPIC_PARTY} compact />
      <SessionSummaryBar votedCount={8} expectedCount={12} dominantScore={5} />
      <SpreadSummaryBar counts={partySpreadMajority} votedCount={8} expectedCount={12} />
    </View>
  );
}

const meta = {
  title: 'Session/Slice3/HostResumeFrame',
  component: HostResumeFrame,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof HostResumeFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryAPartyResume: Story = {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
});
