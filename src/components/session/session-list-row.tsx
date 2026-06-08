import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

import type { SessionListRowVariant } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export type SessionListRowProps = {
  title: string;
  subtitle: string;
  voteCount: number;
  unreadVotes?: number;
  variant?: SessionListRowVariant;
  onPress?: () => void;
  onRename?: (newTitle: string) => void;
  onDelete?: () => void;
};

export function SessionListRow({
  title,
  subtitle,
  voteCount,
  unreadVotes = 0,
  variant = 'default',
  onPress,
  onRename,
  onDelete,
}: SessionListRowProps) {
  const [editValue, setEditValue] = useState(title);
  const isEditing = variant === 'editing';
  const showUnread = unreadVotes > 0 && variant !== 'editing';

  const voteLabel = voteCount === 1 ? '1 vote' : `${voteCount} votes`;

  if (isEditing) {
    return (
      <ThemedView type="backgroundElement" style={styles.rowEditing}>
        <TextInput
          accessibilityLabel="Session name"
          value={editValue}
          onChangeText={setEditValue}
          style={styles.input}
          autoFocus
        />
        <View style={styles.editActions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Save rename"
            onPress={() => onRename?.(editValue)}
            style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}>
            <ThemedText type="smallBold" style={styles.saveLabel}>
              Save
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Cancel rename"
            onPress={() => setEditValue(title)}
            style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
            <ThemedText type="small">Cancel</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${voteLabel}${showUnread ? `, ${unreadVotes} new votes` : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.rowPressable, pressed && styles.pressed]}>
      <ThemedView type="backgroundElement" style={styles.row}>
        <View style={styles.main}>
          <View style={styles.titleRow}>
            {showUnread && <View style={styles.unreadDot} accessibilityLabel="New votes" />}
            <ThemedText type="smallBold" style={styles.title} numberOfLines={1}>
              {title}
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        </View>
        <View style={styles.trailing}>
          <ThemedText type="small" themeColor="textSecondary">
            {voteLabel}
          </ThemedText>
          {showUnread && (
            <View style={styles.badge}>
              <ThemedText type="small" style={styles.badgeLabel}>
                +{unreadVotes}
              </ThemedText>
            </View>
          )}
        </View>
      </ThemedView>
      {onDelete && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Delete session"
          onPress={onDelete}
          style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
          <ThemedText type="small" style={styles.deleteLabel}>
            Delete
          </ThemedText>
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  rowPressable: {
    alignSelf: 'stretch',
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  rowEditing: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  main: {
    flex: 1,
    gap: Spacing.half,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: FovColors.accent,
  },
  trailing: {
    alignItems: 'flex-end',
    gap: Spacing.half,
  },
  badge: {
    backgroundColor: FovColors.accent,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.one,
    paddingVertical: 2,
    minWidth: 28,
    alignItems: 'center',
  },
  badgeLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    padding: Spacing.two,
    borderRadius: Spacing.two,
    borderWidth: 1,
    borderColor: FovColors.accent,
  },
  editActions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  saveButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Spacing.two,
    backgroundColor: FovColors.accent,
  },
  saveLabel: {
    color: '#FFFFFF',
  },
  cancelButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
  },
  deleteLabel: {
    color: FovColors.danger,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.85,
  },
});
