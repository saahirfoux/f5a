import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { SESSION_PRESETS } from '@/components/session/mock-data';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { TopicOptionalPlaceholder } from '@/components/session/topic-optional-placeholder';
import type { SessionPresetId } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function SessionPresetsPicker({ selectedPreset }: { selectedPreset?: SessionPresetId }) {
  const selected = selectedPreset ?? null;

  return (
    <View style={styles.screen}>
      <ThemedText type="subtitle" style={styles.headline}>
        Quick setup
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.subhead}>
        Pick a preset — you can change settings later
      </ThemedText>

      <View style={styles.presetList}>
        {SESSION_PRESETS.map((preset) => {
          const isSelected = selected === preset.id;
          return (
            <Pressable
              key={preset.id}
              accessibilityRole="button"
              accessibilityLabel={preset.label}
              accessibilityState={{ selected: isSelected }}
              style={({ pressed }) => [pressed && styles.pressed]}>
              <ThemedView
                type="backgroundElement"
                style={[styles.presetCard, isSelected && styles.presetCardSelected]}>
                <ThemedText style={styles.presetEmoji}>{preset.emoji}</ThemedText>
                <View style={styles.presetBody}>
                  <ThemedText type="smallBold">{preset.label}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {preset.description}
                  </ThemedText>
                </View>
              </ThemedView>
            </Pressable>
          );
        })}
      </View>

      {selected === 'party' && <TopicOptionalPlaceholder />}

      <View style={styles.bottom}>
        <GoLiveCTA />
      </View>
    </View>
  );
}

const meta = {
  title: 'Session/Slice3/SessionPresetsPicker',
  component: SessionPresetsPicker,
  decorators: [hostFrameDecorator],
  argTypes: {
    selectedPreset: { control: false },
  },
} satisfies Meta<typeof SessionPresetsPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PartySelected: Story = {
  args: { selectedPreset: 'party' },
};

export const AllHandsSelected: Story = {
  args: { selectedPreset: 'all-hands' },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.three,
  },
  headline: {
    textAlign: 'center',
  },
  subhead: {
    textAlign: 'center',
    marginTop: -Spacing.two,
  },
  presetList: {
    gap: Spacing.two,
  },
  presetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.three,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  presetCardSelected: {
    borderColor: FovColors.accent,
  },
  presetEmoji: {
    fontSize: 28,
  },
  presetBody: {
    flex: 1,
    gap: Spacing.half,
  },
  bottom: {
    marginTop: 'auto',
  },
  pressed: {
    opacity: 0.85,
  },
});
