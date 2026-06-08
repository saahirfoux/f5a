import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { LiveVoteRoster } from '@/components/session/live-vote-roster';
import { partyRosterPartial, partySpreadMajority, TOPIC_PARTY } from '@/components/session/mock-data';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { sessionStoryDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';
import { Spacing } from '@/constants/theme';

/** Composed preview of the agreed first Storybook slice for host Stories A/B. */
function HostLiveFirstSlicePreview() {
  return (
    <View style={{ flex: 1, gap: Spacing.three }}>
      <TopicHeader topic={TOPIC_PARTY} />
      <RealtimeBanner variant="topic-change" message="Topic: Order more pizza?" />
      <SpreadSummaryBar counts={partySpreadMajority} votedCount={3} expectedCount={12} />
      <LiveVoteRoster entries={partyRosterPartial} />
      <View style={{ marginTop: 'auto' }}>
        <GoLiveCTA variant="resume-active" activeSessionLabel="Pizza vote" />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/FirstSlice/HostLivePreview',
  component: HostLiveFirstSlicePreview,
  decorators: [sessionStoryDecorator],
} satisfies Meta<typeof HostLiveFirstSlicePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PartyHurry: Story = {};
