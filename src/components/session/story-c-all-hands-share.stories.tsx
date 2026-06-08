import type { Meta, StoryObj } from '@storybook/react-native';
import { ScrollView, StyleSheet, View } from 'react-native';

import { EnterSessionCTA } from '@/components/session/enter-session-cta';
import { HostShareCard } from '@/components/session/host-share-card';
import { MOCK_JOIN_URL, MOCK_PUBLIC_RESULTS_URL, TOPIC_ALL_HANDS } from '@/components/session/mock-data';
import { PublicResultsLinkCard } from '@/components/session/public-results-link-card';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { TopicHeader } from '@/components/session/topic-header';
import type { PublicResultsExpiry } from '@/components/session/types';
import { Spacing } from '@/constants/theme';

function StoryCAllHandsShare({ expiry }: { expiry?: PublicResultsExpiry }) {
  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <TopicHeader topic={TOPIC_ALL_HANDS} />
      <HostShareCard joinUrl={MOCK_JOIN_URL} />
      <PublicResultsLinkCard resultsUrl={MOCK_PUBLIC_RESULTS_URL} expiry={expiry ?? 'default'} />
      <View style={styles.bottom}>
        <EnterSessionCTA />
      </View>
    </ScrollView>
  );
}

const meta = {
  title: 'Session/Integration/StoryCAllHandsShare',
  component: StoryCAllHandsShare,
  decorators: [hostFrameDecorator],
  args: {
    expiry: 'default' as PublicResultsExpiry,
  },
} satisfies Meta<typeof StoryCAllHandsShare>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ExpiryHour: Story = {
  args: { expiry: 'hour' },
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
