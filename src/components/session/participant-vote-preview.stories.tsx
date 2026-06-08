import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import {
  TOPIC_ALL_HANDS,
  TOPIC_STANDUP,
} from '@/components/session/mock-data';
import { participantFrameDecorator } from '@/components/session/story-decorator';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { TopicHeader } from '@/components/session/topic-header';
import { VoteControl } from '@/components/session/vote-control';
import { Spacing } from '@/constants/theme';

function ParticipantVotePreviewScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <TopicHeader topic={TOPIC_ALL_HANDS} />
        <RealtimeBanner variant="topic-change" message="Your vote is anonymous to the room." />
      </View>
      <View style={styles.bottom}>
        <VoteControl selectedVote={null} layout="slider" />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/FirstSlice/ParticipantVotePreview',
  component: ParticipantVotePreviewScreen,
  decorators: [participantFrameDecorator],
} satisfies Meta<typeof ParticipantVotePreviewScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SliderLayout: Story = {};

export const LeftHandedArc: Story = {
  render: () => (
    <View style={styles.screen}>
      <View style={styles.top}>
        <TopicHeader topic={TOPIC_STANDUP} />
      </View>
      <View style={styles.bottom}>
        <VoteControl selectedVote={4} handedness="left" layout="thumbArc" />
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  top: {
    gap: Spacing.three,
  },
  bottom: {
    marginTop: 'auto',
  },
});
