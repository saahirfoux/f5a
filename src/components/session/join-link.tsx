import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type JoinLinkProps = {
  disabled?: boolean;
  onPress?: () => void;
};

export function JoinLink({ disabled = false, onPress }: JoinLinkProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Join session"
      accessibilityHint="Scan a QR code or open an invite link"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}>
      <ThemedText style={styles.label}>Join session</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: Spacing.three,
    borderWidth: 2,
    borderColor: FovColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    alignSelf: 'stretch',
  },
  buttonDisabled: {
    opacity: 0.45,
    borderColor: FovColors.muted,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  label: {
    color: FovColors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
});
