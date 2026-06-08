import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { JoinLink } from '@/components/session/join-link';
import { mockSessionList } from '@/components/session/mock-data';
import { SessionListRow } from '@/components/session/session-list-row';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

type CreatorScreen = 'home' | 'sessions';

function ProfileChip() {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Open menu" style={styles.profileChip}>
      <View style={styles.avatar}>
        <ThemedText type="smallBold" style={styles.avatarLabel}>
          S
        </ThemedText>
      </View>
    </Pressable>
  );
}

function StoryDCreatorHome({ screen }: { screen: CreatorScreen }) {
  if (screen === 'sessions') {
    return (
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back">
            <ThemedText type="smallBold" style={styles.link}>
              ← Back
            </ThemedText>
          </Pressable>
          <ThemedText type="smallBold">My sessions</ThemedText>
          <View style={styles.topBarSpacer} />
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {mockSessionList.map((session) => (
            <SessionListRow
              key={session.id}
              title={session.title}
              subtitle={session.createdAt}
              voteCount={session.voteCount}
              unreadVotes={session.unreadVotes}
              variant={session.unreadVotes ? 'unread' : 'default'}
            />
          ))}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New session"
          style={({ pressed }) => [styles.newSession, pressed && styles.pressed]}>
          <ThemedText type="smallBold" style={styles.link}>
            + New session
          </ThemedText>
        </Pressable>
      </View>
    );
  }

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

      <Pressable accessibilityRole="button" accessibilityLabel="My sessions">
        <ThemedText type="smallBold" style={styles.sessionsLink}>
          My sessions
        </ThemedText>
      </Pressable>

      <View style={styles.bottom}>
        <GoLiveCTA />
        <JoinLink />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/Integration/StoryDCreatorHome',
  component: StoryDCreatorHome,
  decorators: [hostFrameDecorator],
  args: {
    screen: 'home' as CreatorScreen,
  },
  argTypes: {
    screen: { control: 'radio', options: ['home', 'sessions'] },
  },
} satisfies Meta<typeof StoryDCreatorHome>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { screen: 'home' },
};

export const SessionsList: Story = {
  args: { screen: 'sessions' },
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
  topBarSpacer: {
    width: 48,
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
    minHeight: 160,
  },
  heroEmoji: {
    fontSize: 64,
  },
  heroTagline: {
    textAlign: 'center',
  },
  sessionsLink: {
    color: FovColors.accent,
    textAlign: 'center',
  },
  bottom: {
    gap: Spacing.three,
    marginTop: 'auto',
  },
  link: {
    color: FovColors.accent,
  },
  list: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  newSession: {
    alignSelf: 'center',
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    marginTop: 'auto',
  },
  pressed: {
    opacity: 0.85,
  },
});
