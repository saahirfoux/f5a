import Slider from '@react-native-community/slider';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FovColors, VOTE_VALUES, type VoteValue } from '@/constants/fov';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type VoteControlSliderProps = {
  selectedVote?: VoteValue | null;
  disabled?: boolean;
  onVote?: (vote: VoteValue) => void;
};

function FingerBars({ count, emphasized }: { count: VoteValue; emphasized: boolean }) {
  return (
    <View style={styles.fingerBars} accessibilityElementsHidden importantForAccessibility="no">
      {VOTE_VALUES.map((value) => (
        <View
          key={value}
          style={[
            styles.fingerBar,
            value <= count && (emphasized ? styles.fingerBarEmphasized : styles.fingerBarActive),
            value > count && styles.fingerBarInactive,
          ]}
        />
      ))}
    </View>
  );
}

function clampVote(value: number): VoteValue {
  const rounded = Math.round(value) as VoteValue;
  if (rounded < 1) return 1;
  if (rounded > 5) return 5;
  return rounded;
}

export function VoteControlSlider({ selectedVote = null, disabled = false, onVote }: VoteControlSliderProps) {
  const theme = useTheme();
  const trackColor = theme.backgroundSelected ?? FovColors.voteTrack;
  const hasVote = selectedVote !== null;
  const sliderValue = selectedVote ?? 3;

  return (
    <View
      style={styles.panel}
      accessibilityRole="adjustable"
      accessibilityLabel="Vote confidence slider"
      accessibilityValue={{
        min: 1,
        max: 5,
        now: hasVote ? selectedVote : undefined,
        text: hasVote ? `Vote ${selectedVote} of 5` : 'No vote selected',
      }}>
      <View style={styles.hero}>
        {hasVote ? (
          <>
            <ThemedText style={styles.heroValue}>{selectedVote}</ThemedText>
            <FingerBars count={selectedVote} emphasized />
            <ThemedText type="small" themeColor="textSecondary">
              Confidence vote
            </ThemedText>
          </>
        ) : (
          <>
            <ThemedText style={styles.heroPlaceholder}>—</ThemedText>
            <ThemedText type="small" themeColor="textSecondary" style={styles.heroHint}>
              Slide or tap a number below
            </ThemedText>
          </>
        )}
      </View>

      <View style={styles.sliderRow}>
        <Slider
          style={styles.slider}
          disabled={disabled}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={sliderValue}
          minimumTrackTintColor={FovColors.voteSelected}
          maximumTrackTintColor={trackColor}
          thumbTintColor={hasVote ? FovColors.voteSelected : FovColors.muted}
          onValueChange={(value) => onVote?.(clampVote(value))}
        />
      </View>

      <View style={styles.stepLabels} accessibilityRole="radiogroup">
        {VOTE_VALUES.map((value) => {
          const selected = selectedVote === value;
          return (
            <Pressable
              key={value}
              accessibilityRole="radio"
              accessibilityLabel={`Vote ${value} of 5`}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onVote?.(value)}
              style={({ pressed }) => [
                styles.stepChip,
                { backgroundColor: trackColor },
                selected && styles.stepChipSelected,
                disabled && styles.stepChipDisabled,
                pressed && !disabled && styles.stepChipPressed,
              ]}>
              <ThemedText
                style={[
                  styles.stepChipLabel,
                  selected && styles.stepChipLabelSelected,
                  disabled && styles.stepChipLabelDisabled,
                ]}>
                {value}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const THUMB_ZONE_MIN_HEIGHT = 56;

const styles = StyleSheet.create({
  panel: {
    backgroundColor: 'rgba(26, 26, 31, 0.06)',
    borderRadius: Spacing.four,
    padding: Spacing.three,
    gap: Spacing.two,
    alignSelf: 'stretch',
  },
  hero: {
    alignItems: 'center',
    gap: Spacing.one,
    minHeight: 88,
    justifyContent: 'center',
  },
  heroValue: {
    fontSize: 56,
    fontWeight: '700',
    lineHeight: 60,
    color: FovColors.voteSelected,
  },
  heroPlaceholder: {
    fontSize: 56,
    fontWeight: '300',
    lineHeight: 60,
    color: FovColors.muted,
  },
  heroHint: {
    textAlign: 'center',
  },
  fingerBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 28,
  },
  fingerBar: {
    width: 6,
    borderRadius: 3,
  },
  fingerBarActive: {
    backgroundColor: FovColors.accent,
    height: 22,
  },
  fingerBarEmphasized: {
    backgroundColor: FovColors.voteSelected,
    height: 28,
  },
  fingerBarInactive: {
    backgroundColor: FovColors.muted,
    opacity: 0.25,
    height: 12,
  },
  sliderRow: {
    minHeight: THUMB_ZONE_MIN_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: Spacing.one,
  },
  slider: {
    width: '100%',
    height: 44,
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  stepChip: {
    flex: 1,
    minHeight: 44,
    borderRadius: Spacing.two,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stepChipSelected: {
    backgroundColor: FovColors.voteSelected,
    borderColor: FovColors.voteSelected,
  },
  stepChipDisabled: {
    opacity: 0.45,
  },
  stepChipPressed: {
    opacity: 0.9,
  },
  stepChipLabel: {
    fontSize: 17,
    fontWeight: '700',
  },
  stepChipLabelSelected: {
    color: '#FFFFFF',
  },
  stepChipLabelDisabled: {
    color: FovColors.muted,
  },
});
