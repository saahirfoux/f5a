import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { TOPIC_PARTY } from '@/components/session/mock-data';
import { participantFrameDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';
import { VoteControl, type VoteControlLayout } from '@/components/session/vote-control';
import { ThemedText } from '@/components/themed-text';
import type { VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function LayoutCompareBlock({ layout, label }: { layout: VoteControlLayout; label: string }) {
  const [vote, setVote] = useState<VoteValue | null>(null);

  return (
    <View style={styles.block}>
      <ThemedText type="smallBold" themeColor="textSecondary">
        {label}
      </ThemedText>
      <VoteControl layout={layout} selectedVote={vote} onVote={setVote} handedness="right" />
    </View>
  );
}

function VoteLayoutCompareScreen() {
  return (
    <View style={styles.screen}>
      <TopicHeader topic={TOPIC_PARTY} />
      <ThemedText type="small" themeColor="textSecondary">
        Interactive compare — votes stay local to each block.
      </ThemedText>
      <LayoutCompareBlock layout="thumbArc" label="Thumb arc" />
      <LayoutCompareBlock layout="slider" label="Slider bar" />
    </View>
  );
}

const meta = {
  title: 'Session/VoteControl/LayoutCompare',
  component: VoteLayoutCompareScreen,
  decorators: [participantFrameDecorator],
} satisfies Meta<typeof VoteLayoutCompareScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ArcVsSlider: Story = {};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  block: {
    gap: Spacing.two,
  },
});
