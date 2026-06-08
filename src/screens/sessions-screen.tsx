import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ScreenTopBar } from '@/components/navigation/screen-top-bar';
import { HostScreenLayout } from '@/components/session/host-screen-layout';
import { SessionListRow } from '@/components/session/session-list-row';
import { ThemedText } from '@/components/themed-text';
import { useMockSession } from '@/context/mock-session-context';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export function SessionsScreen() {
  const router = useRouter();
  const { listEntries, getSession, createSession, setActiveSessionId } = useMockSession();

  const handleSessionPress = (id: string) => {
    const session = getSession(id);
    if (!session) return;

    setActiveSessionId(id);
    if (session.hostEntered) {
      router.push(`/host/${id}/live`);
    } else {
      router.push(`/host/${id}/share`);
    }
  };

  const handleNewSession = () => {
    const session = createSession({ preset: 'creator' });
    router.push(`/host/${session.id}/share`);
  };

  return (
    <HostScreenLayout>
      <View style={styles.screen}>
        <ScreenTopBar title="My sessions" showBack={false} />

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {listEntries.map((session) => {
            const isLive = Boolean(getSession(session.id));
            return (
              <SessionListRow
                key={session.id}
                title={session.title}
                subtitle={session.createdAt}
                voteCount={session.voteCount}
                unreadVotes={session.unreadVotes}
                variant={session.unreadVotes ? 'unread' : 'default'}
                onPress={isLive ? () => handleSessionPress(session.id) : undefined}
              />
            );
          })}
        </ScrollView>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="New session"
          onPress={handleNewSession}
          style={({ pressed }) => [styles.newSession, pressed && styles.pressed]}>
          <ThemedText type="smallBold" style={styles.link}>
            + New session
          </ThemedText>
        </Pressable>
      </View>
    </HostScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
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
