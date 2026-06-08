import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { TOPIC_ALL_HANDS } from '@/components/session/mock-data';
import { participantFrameDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';
import { VoteControl } from '@/components/session/vote-control';
import { ThemedText } from '@/components/themed-text';
import type { VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function AppClipCompactFrame() {
  const [vote, setVote] = useState<VoteValue | null>(null);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ThemedText type="smallBold">Fist of Five</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          App Clip
        </ThemedText>
      </View>
      <TopicHeader topic={TOPIC_ALL_HANDS} compact />
      <View style={styles.voteZone}>
        <VoteControl layout="slider" selectedVote={vote} onVote={setVote} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Get full app"
        style={styles.getApp}>
        <ThemedText type="linkPrimary">Get full app</ThemedText>
      </Pressable>
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/AppClipCompact',
  component: AppClipCompactFrame,
  decorators: [participantFrameDecorator],
} satisfies Meta<typeof AppClipCompactFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteZone: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  getApp: {
    alignSelf: 'center',
    paddingVertical: Spacing.two,
    minHeight: 44,
    justifyContent: 'center',
  },
});
