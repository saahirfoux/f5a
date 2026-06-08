import { StyleSheet } from 'react-native';

import { TOPIC_UNTITLED } from '@/components/session/mock-data';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type TopicOptionalPlaceholderProps = {
  hint?: string;
};

export function TopicOptionalPlaceholder({
  hint = 'Say the topic out loud — no need to type it',
}: TopicOptionalPlaceholderProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedText type="small" themeColor="textSecondary">
        Topic
      </ThemedText>
      <ThemedText type="smallBold" style={styles.untitled}>
        {TOPIC_UNTITLED}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
        {hint}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.half,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: FovColors.muted,
    borderStyle: 'dashed',
  },
  untitled: {
    fontSize: 18,
    fontStyle: 'italic',
    color: FovColors.muted,
  },
  hint: {
    marginTop: Spacing.one,
  },
});
