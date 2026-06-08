import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type ScreenTopBarProps = {
  title: string;
  showBack?: boolean;
};

export function ScreenTopBar({ title, showBack = true }: ScreenTopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <View style={styles.bar}>
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={handleBack}
          style={styles.backSlot}>
          <ThemedText type="smallBold" style={styles.backLabel}>
            ← Back
          </ThemedText>
        </Pressable>
      ) : (
        <View style={styles.backSlot} />
      )}
      <ThemedText type="smallBold" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.backSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backSlot: {
    width: 72,
  },
  backLabel: {
    color: FovColors.accent,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
