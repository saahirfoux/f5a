import { Pressable, StyleSheet, View } from 'react-native';

import { SessionQrMock } from '@/components/session/session-qr-mock';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type HostShareCardProps = {
  joinUrl: string;
  disabled?: boolean;
  onCopyLink?: () => void;
  onShare?: () => void;
};

export function HostShareCard({
  joinUrl,
  disabled = false,
  onCopyLink,
  onShare,
}: HostShareCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold">Share this session</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.url} numberOfLines={2}>
        {joinUrl}
      </ThemedText>

      <View style={styles.qrRow}>
        <SessionQrMock size={140} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.qrHint}>
          Scan to join — no app required for guests
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Copy link"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onCopyLink}
          style={({ pressed }) => [styles.actionPrimary, pressed && !disabled && styles.actionPressed]}>
          <ThemedText style={styles.actionPrimaryLabel}>Copy link</ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Share"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onShare}
          style={({ pressed }) => [styles.actionSecondary, pressed && !disabled && styles.actionPressed]}>
          <ThemedText style={styles.actionSecondaryLabel}>Share</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  url: {
    fontFamily: 'monospace',
  },
  qrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  qrHint: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  actionPrimary: {
    flex: 1,
    minHeight: 48,
    borderRadius: Spacing.two,
    backgroundColor: FovColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPrimaryLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  actionSecondary: {
    flex: 1,
    minHeight: 48,
    borderRadius: Spacing.two,
    borderWidth: 2,
    borderColor: FovColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSecondaryLabel: {
    color: FovColors.accent,
    fontWeight: '700',
  },
  actionPressed: {
    opacity: 0.85,
  },
});
