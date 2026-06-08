import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type TopicHeaderProps = {
  topic: string;
  compact?: boolean;
  /** Visual emphasis when topic just changed (Storybook / host topic switch). */
  highlightChange?: boolean;
  announceChange?: boolean;
};

export function TopicHeader({
  topic,
  compact = false,
  highlightChange = false,
  announceChange = false,
}: TopicHeaderProps) {
  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.container, compact && styles.containerCompact, highlightChange && styles.highlightChange]}
      accessibilityRole="header"
      accessibilityLabel={`Current topic: ${topic}`}
      {...(announceChange ? { accessibilityLiveRegion: 'polite' as const } : {})}>
      {!compact && (
        <ThemedText type="small" themeColor="textSecondary">
          Current topic
        </ThemedText>
      )}
      <ThemedText type="smallBold" style={[styles.topic, compact && styles.topicCompact]}>
        {topic}
      </ThemedText>
      {highlightChange && (
        <View style={styles.changeBadge}>
          <ThemedText type="small" style={styles.changeBadgeText}>
            Topic updated
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.half,
    alignSelf: 'stretch',
  },
  containerCompact: {
    padding: Spacing.two,
  },
  highlightChange: {
    borderWidth: 2,
    borderColor: FovColors.accent,
  },
  topic: {
    fontSize: 18,
    lineHeight: 24,
  },
  topicCompact: {
    fontSize: 16,
    lineHeight: 22,
  },
  changeBadge: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(60, 135, 247, 0.12)',
  },
  changeBadgeText: {
    color: FovColors.accent,
    fontWeight: '600',
  },
});
