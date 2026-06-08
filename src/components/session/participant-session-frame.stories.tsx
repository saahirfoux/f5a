import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  TOPIC_ALL_HANDS,
  TOPIC_PARTY,
} from '@/components/session/mock-data';
import { participantFrameDecorator } from '@/components/session/story-decorator';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { TopicHeader } from '@/components/session/topic-header';
import { VoteControl } from '@/components/session/vote-control';
import type { VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function ParticipantSessionFrame({ topic, anonymousMessage }: { topic: string; anonymousMessage?: string }) {
  const [vote, setVote] = useState<VoteValue | null>(null);

  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <TopicHeader topic={topic} />
        {anonymousMessage && (
          <RealtimeBanner variant="topic-change" message={anonymousMessage} />
        )}
      </View>
      <View style={styles.bottom}>
        <VoteControl layout="slider" selectedVote={vote} onVote={setVote} />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/ParticipantSessionFrame',
  component: ParticipantSessionFrame,
  decorators: [participantFrameDecorator],
} satisfies Meta<typeof ParticipantSessionFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryAParty: Story = {
  args: { topic: TOPIC_PARTY },
};

export const StoryCAllHands: Story = {
  args: {
    topic: TOPIC_ALL_HANDS,
    anonymousMessage: 'Your vote is anonymous to the room.',
  },
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
