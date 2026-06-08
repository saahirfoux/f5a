import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { LiveVoteRoster } from '@/components/session/live-vote-roster';
import {
  partyRosterPartial,
  partySpreadMajority,
  standupRoster,
  standupSpread,
  TOPIC_PARTY,
  TOPIC_STANDUP,
} from '@/components/session/mock-data';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { TopicHeader } from '@/components/session/topic-header';
import { Spacing } from '@/constants/theme';

function HostLiveFrame({
  topic,
  story,
}: {
  topic: string;
  story: 'party' | 'standup';
}) {
  const isParty = story === 'party';

  return (
    <View style={styles.screen}>
      <TopicHeader topic={topic} />
      <RealtimeBanner
        variant="topic-change"
        message={isParty ? 'Votes coming in — partial turnout is OK' : 'Standup votes trickling in'}
      />
      <SpreadSummaryBar
        counts={isParty ? partySpreadMajority : standupSpread}
        votedCount={isParty ? 3 : 4}
        expectedCount={isParty ? 12 : 5}
      />
      <LiveVoteRoster entries={isParty ? partyRosterPartial : standupRoster} />
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/HostLiveFrame',
  component: HostLiveFrame,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof HostLiveFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryAParty: Story = {
  args: { topic: TOPIC_PARTY, story: 'party' },
};

export const StoryBStandup: Story = {
  args: { topic: TOPIC_STANDUP, story: 'standup' },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
});
