import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ScreenTopBar } from '@/components/navigation/screen-top-bar';
import { HostScreenLayout } from '@/components/session/host-screen-layout';
import { LiveVoteRoster } from '@/components/session/live-vote-roster';
import {
  partyRosterPartial,
  partySpreadMajority,
  standupRoster,
  standupSpread,
} from '@/components/session/mock-data';
import { RealtimeBanner } from '@/components/session/realtime-banner';
import { SessionSummaryBar } from '@/components/session/session-summary-bar';
import { SpreadSummaryBar } from '@/components/session/spread-summary-bar';
import { TopicHeader } from '@/components/session/topic-header';
import { useMockSession } from '@/context/mock-session-context';
import { Spacing } from '@/constants/theme';

export function HostLiveScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getSession } = useMockSession();

  const session = id ? getSession(id) : undefined;

  if (!session) {
    return (
      <HostScreenLayout>
        <ScreenTopBar title="Live session" />
        <View style={styles.missing}>
          <TopicHeader topic="Session not found" />
        </View>
      </HostScreenLayout>
    );
  }

  const isParty = session.preset === 'party' || session.untitledTopic;
  const topic = session.untitledTopic ? 'Untitled' : session.topic;

  return (
    <HostScreenLayout>
      <ScreenTopBar title="Live session" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TopicHeader topic={topic} compact={session.untitledTopic} />
        {isParty && <SessionSummaryBar votedCount={8} expectedCount={12} dominantScore={5} />}
        <RealtimeBanner
          variant="topic-change"
          message={
            isParty ? 'Votes coming in — partial turnout is OK' : 'Standup votes trickling in'
          }
        />
        <SpreadSummaryBar
          counts={isParty ? partySpreadMajority : standupSpread}
          votedCount={isParty ? 8 : 4}
          expectedCount={isParty ? 12 : 5}
        />
        <LiveVoteRoster entries={isParty ? partyRosterPartial : standupRoster} />
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
  missing: {
    flex: 1,
    justifyContent: 'center',
  },
});
