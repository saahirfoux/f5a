import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import type { EnterSessionVariant } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type EnterSessionCTAProps = {
  variant?: EnterSessionVariant;
  onPress?: () => void;
};

export function EnterSessionCTA({ variant = 'default', onPress }: EnterSessionCTAProps) {
  const isLoading = variant === 'loading';
  const isEntered = variant === 'entered';

  return (
    <View style={styles.zone}>
      <ThemedText type="small" style={styles.hint}>
        {isEntered
          ? 'You are in the session room'
          : 'Share the link first, then enter to see live votes'}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isEntered ? 'In session' : 'Enter session'}
        accessibilityState={{ disabled: isLoading || isEntered, busy: isLoading }}
        disabled={isLoading || isEntered}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          isEntered && styles.buttonEntered,
          pressed && !isLoading && !isEntered && styles.buttonPressed,
          isLoading && styles.buttonLoading,
        ]}>
        {isLoading ? (
          <ActivityIndicator color={FovColors.ctaZoneText} />
        ) : (
          <ThemedText style={styles.buttonLabel}>{isEntered ? 'In session' : 'Enter session'}</ThemedText>
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
    backgroundColor: FovColors.accent,
    borderRadius: Spacing.three,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
  },
  buttonEntered: {
    backgroundColor: FovColors.muted,
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.9,
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
