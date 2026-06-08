import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { mockSessionList } from '@/components/session/mock-data';
import { SessionListRow } from '@/components/session/session-list-row';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function SessionListFrame({ showUnreadOnly }: { showUnreadOnly?: boolean }) {
  const sessions = showUnreadOnly
    ? mockSessionList.filter((s) => (s.unreadVotes ?? 0) > 0)
    : mockSessionList;

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back">
          <ThemedText type="smallBold" style={styles.back}>
            ← Back
          </ThemedText>
        </Pressable>
        <ThemedText type="smallBold">My sessions</ThemedText>
        <View style={styles.topBarSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {sessions.map((session) => (
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
        <ThemedText type="smallBold" style={styles.newSessionLabel}>
          + New session
        </ThemedText>
      </Pressable>
    </View>
  );
}

const meta = {
  title: 'Session/Slice3/SessionListFrame',
  component: SessionListFrame,
  decorators: [hostFrameDecorator],
  args: {
    showUnreadOnly: false,
  },
} satisfies Meta<typeof SessionListFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithUnreadSessions: Story = {
  args: { showUnreadOnly: true },
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
  back: {
    color: FovColors.accent,
  },
  topBarSpacer: {
    width: 48,
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
  newSessionLabel: {
    color: FovColors.accent,
  },
  pressed: {
    opacity: 0.85,
  },
});
