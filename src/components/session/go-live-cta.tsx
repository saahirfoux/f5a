import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import type { GoLiveVariant } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type GoLiveCTAProps = {
  variant?: GoLiveVariant;
  activeSessionLabel?: string;
  onPress?: () => void;
};

export function GoLiveCTA({
  variant = 'default',
  activeSessionLabel = 'Pizza vote',
  onPress,
}: GoLiveCTAProps) {
  const isLoading = variant === 'loading';
  const isResume = variant === 'resume-active';

  const label = isResume ? 'Resume session' : 'Go live';
  const subtitle = isResume ? activeSessionLabel : 'Start a session in seconds';

  return (
    <View style={styles.zone}>
      <ThemedText type="small" style={styles.hint}>
        {subtitle}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isLoading, busy: isLoading }}
        disabled={isLoading}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          pressed && !isLoading && styles.buttonPressed,
          isLoading && styles.buttonLoading,
        ]}>
        {isLoading ? (
          <ActivityIndicator color={FovColors.ctaZoneText} />
        ) : (
          <ThemedText style={styles.buttonLabel}>{label}</ThemedText>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  zone: {
    backgroundColor: FovColors.ctaZone,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  hint: {
    color: FovColors.muted,
    textAlign: 'center',
  },
  button: {
    backgroundColor: FovColors.goLive,
    borderRadius: Spacing.three,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  buttonPressed: {
    backgroundColor: FovColors.goLivePressed,
  },
  buttonLoading: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: FovColors.ctaZoneText,
    fontSize: 18,
    fontWeight: '700',
  },
});
