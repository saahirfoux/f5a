import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenTopBar } from '@/components/navigation/screen-top-bar';
import { EnterSessionCTA } from '@/components/session/enter-session-cta';
import { HostScreenLayout } from '@/components/session/host-screen-layout';
import { HostShareCard } from '@/components/session/host-share-card';
import { PublicResultsLinkCard } from '@/components/session/public-results-link-card';
import { TopicHeader } from '@/components/session/topic-header';
import { TopicOptionalPlaceholder } from '@/components/session/topic-optional-placeholder';
import { useMockSession } from '@/context/mock-session-context';
import { Spacing } from '@/constants/theme';

export function HostShareScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSession, markHostEntered, setActiveSessionId } = useMockSession();
  const [enterLoading, setEnterLoading] = useState(false);

  const session = id ? getSession(id) : undefined;

  if (!session) {
    return (
      <HostScreenLayout>
        <ScreenTopBar title="Share session" />
        <View style={styles.missing}>
          <TopicHeader topic="Session not found" />
        </View>
      </HostScreenLayout>
    );
  }

  const joinUrl = `https://app.fistoffive.co/session/${session.id}`;
  const resultsUrl = `https://app.fistoffive.co/results/${session.id}`;

  const handleEnter = () => {
    setEnterLoading(true);
    markHostEntered(session.id);
    setActiveSessionId(session.id);
    setTimeout(() => {
      setEnterLoading(false);
      router.replace(`/host/${session.id}/live`);
    }, 400);
  };

  return (
    <HostScreenLayout>
      <ScreenTopBar title="Share session" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {session.untitledTopic ? (
          <TopicOptionalPlaceholder />
        ) : (
          <TopicHeader topic={session.topic} />
        )}
        <HostShareCard joinUrl={joinUrl} />
        {session.showPublicResults && (
          <PublicResultsLinkCard resultsUrl={resultsUrl} expiry="default" />
        )}
        <View style={styles.bottom}>
          <EnterSessionCTA
            variant={session.hostEntered ? 'entered' : enterLoading ? 'loading' : 'default'}
            onPress={handleEnter}
          />
        </View>
      </ScrollView>
    </HostScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    gap: Spacing.three,
    paddingBottom: Spacing.three,
  },
  bottom: {
    marginTop: 'auto',
  },
  missing: {
    flex: 1,
    justifyContent: 'center',
  },
});
