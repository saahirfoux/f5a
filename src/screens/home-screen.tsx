import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { HostScreenLayout } from '@/components/session/host-screen-layout';
import { JoinLink } from '@/components/session/join-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useMockSession } from '@/context/mock-session-context';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

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

export function HomeScreen() {
  const router = useRouter();
  const { activeSessionId, getSession, createSession } = useMockSession();
  const [goLiveLoading, setGoLiveLoading] = useState(false);

  const activeSession = activeSessionId ? getSession(activeSessionId) : undefined;
  const resumeActive = Boolean(activeSession);

  const handleGoLive = () => {
    if (resumeActive && activeSession) {
      if (activeSession.hostEntered) {
        router.push(`/host/${activeSession.id}/live`);
      } else {
        router.push(`/host/${activeSession.id}/share`);
      }
      return;
    }

    setGoLiveLoading(true);
    const session = createSession({ preset: 'party' });
    setGoLiveLoading(false);
    router.push(`/host/${session.id}/share`);
  };

  return (
    <HostScreenLayout>
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

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="My sessions"
          onPress={() => router.push('/sessions')}>
          <ThemedText type="smallBold" style={styles.sessionsLink}>
            My sessions
          </ThemedText>
        </Pressable>

        <View style={styles.bottom}>
          <GoLiveCTA
            variant={goLiveLoading ? 'loading' : resumeActive ? 'resume-active' : 'default'}
            activeSessionLabel={activeSession?.label ?? 'Active session'}
            onPress={handleGoLive}
          />
          <JoinLink onPress={() => router.push('/join')} />
        </View>
      </View>
    </HostScreenLayout>
  );
}

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
});
