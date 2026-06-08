import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { LiveVoteRoster } from '@/components/session/live-vote-roster';
import { partyRosterPartial, partySpreadMajority, TOPIC_PARTY } from '@/components/session/mock-data';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { SessionSummaryBar } from '@/components/session/session-summary-bar';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { TopicHeader } from '@/components/session/topic-header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

function StoryAHostLiveResume() {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <ThemedText type="small" themeColor="textSecondary">
        Reopened from push notification
      </ThemedText>
      <TopicHeader topic={TOPIC_PARTY} compact />
      <SessionSummaryBar votedCount={8} expectedCount={12} dominantScore={5} />
      <RealtimeBanner variant="topic-change" message="Votes coming in — partial turnout is OK" />
      <SpreadSummaryBar counts={partySpreadMajority} votedCount={8} expectedCount={12} />
      <LiveVoteRoster entries={partyRosterPartial} />
    </ScrollView>
  );
}

const meta = {
  title: 'Session/Integration/StoryAHostLiveResume',
  component: StoryAHostLiveResume,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof StoryAHostLiveResume>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryAPartyResume: Story = {};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
});
