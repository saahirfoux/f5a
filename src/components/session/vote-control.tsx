import { useState } from 'react';
import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';

import {
  ARC_ZONE_HEIGHT,
  getThumbArcPositions,
  TARGET_SIZE,
} from '@/components/session/vote-control-arc';
import { VoteControlSlider } from '@/components/session/vote-control-slider';
import { ThemedText } from '@/components/themed-text';
import { FovColors, VOTE_VALUES, type VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VoteControlHandedness = 'right' | 'left';
export type VoteControlLayout = 'thumbArc' | 'slider' | 'row';

export type VoteControlProps = {
  selectedVote?: VoteValue | null;
  disabled?: boolean;
  onVote?: (vote: VoteValue) => void;
  handedness?: VoteControlHandedness;
  layout?: VoteControlLayout;
};

function FingerCountIcon({ count, selected }: { count: VoteValue; selected: boolean }) {
  return (
    <View style={styles.fingerIcon} accessibilityElementsHidden importantForAccessibility="no">
      {VOTE_VALUES.map((value) => (
        <View
          key={value}
          style={[
            styles.fingerDot,
            value <= count && (selected ? styles.fingerDotActiveSelected : styles.fingerDotActive),
            value > count && styles.fingerDotInactive,
          ]}
        />
      ))}
    </View>
  );
}

function VoteTarget({
  value,
  selected,
  disabled,
  trackColor,
  onPress,
  style,
}: {
  value: VoteValue;
  selected: boolean;
  disabled: boolean;
  trackColor: string;
  onPress: () => void;
  style?: object;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={`Vote ${value} of 5`}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.voteTarget,
        { backgroundColor: trackColor },
        style,
        selected && styles.voteTargetSelected,
        disabled && styles.voteTargetDisabled,
        pressed && !disabled && styles.voteTargetPressed,
      ]}>
      <FingerCountIcon count={value} selected={selected} />
      <ThemedText
        style={[
          styles.voteNumber,
          selected && styles.voteNumberSelected,
          disabled && styles.voteNumberDisabled,
        ]}>
        {value}
      </ThemedText>
    </Pressable>
  );
}

function VoteControlRow({
  selectedVote,
  disabled,
  trackColor,
  onVote,
}: {
  selectedVote: VoteValue | null;
  disabled: boolean;
  trackColor: string;
  onVote?: (vote: VoteValue) => void;
}) {
  return (
    <View style={styles.row}>
      {VOTE_VALUES.map((value) => (
        <VoteTarget
          key={value}
          value={value}
          selected={selectedVote === value}
          disabled={disabled}
          trackColor={trackColor}
          onPress={() => onVote?.(value)}
          style={styles.rowTarget}
        />
      ))}
    </View>
  );
}

function VoteControlThumbArc({
  selectedVote,
  disabled,
  trackColor,
  handedness,
  onVote,
}: {
  selectedVote: VoteValue | null;
  disabled: boolean;
  trackColor: string;
  handedness: VoteControlHandedness;
  onVote?: (vote: VoteValue) => void;
}) {
  const [arcWidth, setArcWidth] = useState(0);

  const onArcLayout = (event: LayoutChangeEvent) => {
    setArcWidth(event.nativeEvent.layout.width);
  };

  const positions = arcWidth > 0 ? getThumbArcPositions(handedness, arcWidth) : null;

  return (
    <View style={styles.arcPanel}>
      <View style={styles.arcZone} onLayout={onArcLayout}>
        {positions &&
          VOTE_VALUES.map((value) => (
            <VoteTarget
              key={value}
              value={value}
              selected={selectedVote === value}
              disabled={disabled}
              trackColor={trackColor}
              onPress={() => onVote?.(value)}
              style={[
                styles.arcTarget,
                {
                  left: positions[value].x,
                  top: positions[value].y,
                },
                selectedVote === value && styles.arcTargetSelectedScale,
              ]}
            />
          ))}
      </View>
    </View>
  );
}

export function VoteControl({
  selectedVote = null,
  disabled = false,
  onVote,
  handedness = 'right',
  layout = 'thumbArc',
}: VoteControlProps) {
  const theme = useTheme();
  const trackColor = theme.backgroundSelected ?? FovColors.voteTrack;

  return (
    <View style={styles.container} accessibilityRole="radiogroup" accessibilityLabel="Vote confidence 1 to 5">
      <ThemedText type="smallBold" style={styles.prompt}>
        How confident are you?
      </ThemedText>
      {layout === 'row' ? (
        <VoteControlRow
          selectedVote={selectedVote}
          disabled={disabled}
          trackColor={trackColor}
          onVote={onVote}
        />
      ) : layout === 'slider' ? (
        <VoteControlSlider selectedVote={selectedVote} disabled={disabled} onVote={onVote} />
      ) : (
        <VoteControlThumbArc
          selectedVote={selectedVote}
          disabled={disabled}
          trackColor={trackColor}
          handedness={handedness}
          onVote={onVote}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  prompt: {
    marginBottom: Spacing.two,
    paddingHorizontal: Spacing.one,
  },
  arcPanel: {
    backgroundColor: 'rgba(26, 26, 31, 0.06)',
    borderRadius: Spacing.four,
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingBottom: Spacing.one,
  },
  arcZone: {
    height: ARC_ZONE_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  arcTarget: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
  },
  arcTargetSelectedScale: {
    transform: [{ scale: 1.05 }],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  rowTarget: {
    flex: 1,
    maxWidth: 64,
    aspectRatio: 1,
  },
  voteTarget: {
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    borderRadius: TARGET_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 2,
  },
  voteTargetSelected: {
    backgroundColor: FovColors.voteSelected,
    borderColor: FovColors.voteSelected,
  },
  voteTargetDisabled: {
    opacity: 0.45,
  },
  voteTargetPressed: {
    opacity: 0.9,
  },
  fingerIcon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 14,
  },
  fingerDot: {
    width: 3,
    height: 8,
    borderRadius: 2,
  },
  fingerDotActive: {
    backgroundColor: FovColors.accent,
  },
  fingerDotActiveSelected: {
    backgroundColor: '#FFFFFF',
  },
  fingerDotInactive: {
    backgroundColor: FovColors.muted,
    opacity: 0.35,
    height: 5,
  },
  voteNumber: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
  voteNumberSelected: {
    color: '#FFFFFF',
  },
  voteNumberDisabled: {
    color: FovColors.muted,
  },
});
