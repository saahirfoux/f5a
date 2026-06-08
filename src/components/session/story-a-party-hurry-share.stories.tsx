import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EnterSessionCTA } from '@/components/session/enter-session-cta';
import { HostShareCard } from '@/components/session/host-share-card';
import { MOCK_JOIN_URL } from '@/components/session/mock-data';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { TopicOptionalPlaceholder } from '@/components/session/topic-optional-placeholder';
import type { EnterSessionVariant } from '@/components/session/types';
import { Spacing } from '@/constants/theme';

function StoryAPartyHurryShare({ enterVariant }: { enterVariant?: EnterSessionVariant }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <TopicOptionalPlaceholder />
      <HostShareCard joinUrl={MOCK_JOIN_URL} />
      <View style={styles.bottom}>
        <EnterSessionCTA variant={enterVariant ?? 'default'} />
      </View>
    </ScrollView>
  );
}

const meta = {
  title: 'Session/Integration/StoryAPartyHurryShare',
  component: StoryAPartyHurryShare,
  decorators: [hostFrameDecorator],
  args: {
    enterVariant: 'default' as EnterSessionVariant,
  },
} satisfies Meta<typeof StoryAPartyHurryShare>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EnterLoading: Story = {
  args: { enterVariant: 'loading' },
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  bottom: {
    marginTop: 'auto',
  },
});
