import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, StyleSheet, Switch, View } from 'react-native';
import { useState } from 'react';

import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function SettingsPushPrefs({ notificationsEnabled = true }: { notificationsEnabled?: boolean }) {
  const [notifyEachVote, setNotifyEachVote] = useState(notificationsEnabled);
  const [batchNotifications, setBatchNotifications] = useState(false);

  return (
    <View style={styles.screen}>
      <ThemedText type="subtitle" style={styles.headline}>
        Notifications
      </ThemedText>

      <ThemedView type="backgroundElement" style={styles.section}>
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <ThemedText type="smallBold">Notify on each vote</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Push when someone casts a vote
            </ThemedText>
          </View>
          <Switch
            accessibilityLabel="Notify on each vote"
            value={notifyEachVote}
            onValueChange={setNotifyEachVote}
            trackColor={{ false: FovColors.voteTrack, true: FovColors.accent }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <ThemedText type="smallBold">Batch notifications</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Group updates every 30 seconds
            </ThemedText>
          </View>
          <Switch
            accessibilityLabel="Batch notifications every 30 seconds"
            value={batchNotifications}
            onValueChange={setBatchNotifications}
            trackColor={{ false: FovColors.voteTrack, true: FovColors.accent }}
          />
        </View>
      </ThemedView>

      <ThemedText type="smallBold" style={styles.previewLabel}>
        Deep link preview
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.deepLinkCard}>
        <ThemedText type="small" themeColor="textSecondary">
          Active session
        </ThemedText>
        <ThemedText type="smallBold">Pizza vote</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.deepLinkHint}>
          Tap a vote notification to open this session
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open active session"
          style={({ pressed }) => [styles.openButton, pressed && styles.pressed]}>
          <ThemedText style={styles.openButtonLabel}>Open session</ThemedText>
        </Pressable>
      </ThemedView>
    </View>
  );
}

const meta = {
  title: 'Session/Slice3/SettingsPushPrefs',
  component: SettingsPushPrefs,
  decorators: [hostFrameDecorator],
  args: {
    notificationsEnabled: true,
  },
} satisfies Meta<typeof SettingsPushPrefs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotificationsOff: Story = {
  args: { notificationsEnabled: false },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
  headline: {
    textAlign: 'center',
  },
  section: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  toggleLabel: {
    flex: 1,
    gap: Spacing.half,
  },
  divider: {
    height: 1,
    backgroundColor: FovColors.voteTrack,
  },
  previewLabel: {
    marginTop: Spacing.two,
  },
  deepLinkCard: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  deepLinkHint: {
    marginTop: Spacing.half,
  },
  openButton: {
    marginTop: Spacing.two,
    backgroundColor: FovColors.accent,
    borderRadius: Spacing.two,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButtonLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
