import { Pressable, StyleSheet, View } from 'react-native';

import type { PublicResultsExpiry } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

const EXPIRY_OPTIONS: { value: PublicResultsExpiry; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'hour', label: '1 hour' },
  { value: 'day', label: '1 day' },
  { value: 'days', label: 'Several days' },
];

export type PublicResultsLinkCardProps = {
  resultsUrl: string;
  expiry?: PublicResultsExpiry;
  disabled?: boolean;
  onCopyLink?: () => void;
  onEmailSelf?: () => void;
  onExpiryChange?: (expiry: PublicResultsExpiry) => void;
};

export function PublicResultsLinkCard({
  resultsUrl,
  expiry = 'default',
  disabled = false,
  onCopyLink,
  onEmailSelf,
  onExpiryChange,
}: PublicResultsLinkCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="smallBold">Public results link</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
        Share aggregate results on a projector — no login required
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.url} numberOfLines={2}>
        {resultsUrl}
      </ThemedText>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Copy results link"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onCopyLink}
          style={({ pressed }) => [styles.actionPrimary, pressed && !disabled && styles.actionPressed]}>
          <ThemedText style={styles.actionPrimaryLabel}>Copy link</ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Email link to myself"
          accessibilityState={{ disabled }}
          disabled={disabled}
          onPress={onEmailSelf}
          style={({ pressed }) => [styles.actionSecondary, pressed && !disabled && styles.actionPressed]}>
          <ThemedText style={styles.actionSecondaryLabel}>Email to self</ThemedText>
        </Pressable>
      </View>

      <ThemedText type="smallBold">Link expires</ThemedText>
      <View style={styles.expiryRow}>
        {EXPIRY_OPTIONS.map((option) => {
          const selected = expiry === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityLabel={`Expire after ${option.label}`}
              accessibilityState={{ disabled, selected }}
              disabled={disabled}
              onPress={() => onExpiryChange?.(option.value)}
              style={({ pressed }) => [
                styles.expiryChip,
                selected && styles.expiryChipSelected,
                pressed && !disabled && styles.actionPressed,
              ]}>
              <ThemedText
                type="small"
                style={[styles.expiryChipLabel, selected && styles.expiryChipLabelSelected]}>
                {option.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  hint: {
    marginTop: -Spacing.half,
  },
  url: {
    fontFamily: 'monospace',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
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
  expiryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
  expiryChip: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: FovColors.muted,
  },
  expiryChipSelected: {
    borderColor: FovColors.accent,
    backgroundColor: 'rgba(60, 135, 247, 0.12)',
  },
  expiryChipLabel: {
    color: FovColors.muted,
  },
  expiryChipLabelSelected: {
    color: FovColors.accent,
    fontWeight: '600',
  },
});
