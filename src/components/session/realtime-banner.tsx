import { StyleSheet, View } from 'react-native';

import type { RealtimeBannerVariant } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type RealtimeBannerProps = {
  variant: RealtimeBannerVariant;
  message?: string;
};

const VARIANT_COPY: Record<RealtimeBannerVariant, { label: string; message: string; color: string }> = {
  takeover: {
    label: 'Host takeover',
    message: 'The host has taken control of this session.',
    color: FovColors.accent,
  },
  'topic-change': {
    label: 'Topic updated',
    message: 'The facilitator changed the topic. Review before you vote.',
    color: FovColors.accent,
  },
  disconnect: {
    label: 'Reconnecting',
    message: 'Connection lost. Trying to restore live updates…',
    color: FovColors.warn,
  },
  'session-end': {
    label: 'Session ended',
    message: 'Live voting is closed for this session.',
    color: FovColors.muted,
  },
};

export function RealtimeBanner({ variant, message }: RealtimeBannerProps) {
  const copy = VARIANT_COPY[variant];

  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[styles.banner, { borderLeftColor: copy.color }]}>
      <ThemedText type="smallBold" style={[styles.label, { color: copy.color }]}>
        {copy.label}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {message ?? copy.message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderLeftWidth: 4,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    gap: Spacing.half,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(60, 135, 247, 0.08)',
    borderRadius: Spacing.two,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
