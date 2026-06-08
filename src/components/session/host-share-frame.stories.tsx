import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { EnterSessionCTA } from '@/components/session/enter-session-cta';
import { HostShareCard } from '@/components/session/host-share-card';
import {
  MOCK_JOIN_URL,
  TOPIC_PARTY,
  TOPIC_STANDUP,
  TOPIC_UNTITLED,
} from '@/components/session/mock-data';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';
import { Spacing } from '@/constants/theme';

function HostShareFrame({
  topic,
  enterVariant,
}: {
  topic: string;
  enterVariant?: 'default' | 'loading' | 'entered';
}) {
  return (
    <View style={styles.screen}>
      <TopicHeader topic={topic} />
      <HostShareCard joinUrl={MOCK_JOIN_URL} />
      <View style={styles.bottom}>
        <EnterSessionCTA variant={enterVariant ?? 'default'} />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/HostShareFrame',
  component: HostShareFrame,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof HostShareFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StoryAPartyUntitled: Story = {
  args: { topic: TOPIC_UNTITLED },
};

export const StoryBStandup: Story = {
  args: { topic: TOPIC_STANDUP },
};

export const StoryAPizza: Story = {
  args: { topic: TOPIC_PARTY },
};

export const EnterLoading: Story = {
  args: { topic: TOPIC_STANDUP, enterVariant: 'loading' },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
  bottom: {
    marginTop: 'auto',
  },
});
