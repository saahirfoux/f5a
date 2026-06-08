import { StyleSheet, View } from 'react-native';

import type { SessionStateVariant } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type SessionStateFullScreenProps = {
  variant: SessionStateVariant;
  scheduledAt?: string;
  title?: string;
  message?: string;
};

function defaultCopy(variant: SessionStateVariant, scheduledAt?: string) {
  if (variant === 'scheduled') {
    return {
      title: 'Session not started yet',
      message: scheduledAt ? `Voting opens at ${scheduledAt}` : 'Voting opens when the host starts the session.',
    };
  }
  return {
    title: 'Session is over',
    message: 'Thanks for participating. This session has ended.',
  };
}

export function SessionStateFullScreen({
  variant,
  scheduledAt,
  title,
  message,
}: SessionStateFullScreenProps) {
  const copy = defaultCopy(variant, scheduledAt);

  return (
    <ThemedView style={styles.screen}>
      <View style={styles.content}>
        <View style={[styles.icon, variant === 'scheduled' ? styles.iconScheduled : styles.iconEnded]} />
        <ThemedText type="subtitle" style={styles.title}>
          {title ?? copy.title}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.message}>
          {message ?? copy.message}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.three,
    maxWidth: 320,
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginBottom: Spacing.two,
  },
  iconScheduled: {
    backgroundColor: FovColors.accent,
    opacity: 0.2,
  },
  iconEnded: {
    backgroundColor: FovColors.muted,
    opacity: 0.35,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 34,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});
