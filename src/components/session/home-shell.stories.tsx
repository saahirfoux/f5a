import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { JoinLink } from '@/components/session/join-link';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function ProfileChip({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Open menu"
      onPress={onPress}
      style={styles.profileChip}>
      <View style={styles.avatar}>
        <ThemedText type="smallBold" style={styles.avatarLabel}>
          S
        </ThemedText>
      </View>
    </Pressable>
  );
}

function HomeShellScreen({ resumeActive }: { resumeActive?: boolean }) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <ThemedText type="smallBold">Fist of Five</ThemedText>
        <ProfileChip />
      </View>

      <ThemedView type="backgroundElement" style={styles.hero}>
        <ThemedText style={styles.heroEmoji}>✋</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.heroTagline}>
          Vote together. See the spread.
        </ThemedText>
      </ThemedView>

      <View style={styles.bottom}>
        <GoLiveCTA variant={resumeActive ? 'resume-active' : 'default'} activeSessionLabel="Pizza vote" />
        <JoinLink />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/HomeShell',
  component: HomeShellScreen,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof HomeShellScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ResumeActive: Story = {
  args: { resumeActive: true },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileChip: {
    padding: Spacing.half,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: FovColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    color: '#FFFFFF',
  },
  hero: {
    flex: 1,
    borderRadius: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    minHeight: 200,
  },
  heroEmoji: {
    fontSize: 64,
  },
  heroTagline: {
    textAlign: 'center',
  },
  bottom: {
    gap: Spacing.three,
    marginTop: 'auto',
  },
});
