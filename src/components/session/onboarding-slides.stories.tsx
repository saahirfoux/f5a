import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { GoLiveCTA } from '@/components/session/go-live-cta';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

type SlideContent = {
  slideIndex: number;
  totalSlides: number;
  headline: string;
  body: string;
};

function OnboardingSlide({ slideIndex, totalSlides, headline, body }: SlideContent) {
  return (
    <View style={styles.screen}>
      <ThemedView type="backgroundElement" style={styles.hero}>
        <View style={styles.heroIllustration}>
          <ThemedText style={styles.heroEmoji}>✋</ThemedText>
        </View>
        <ThemedText type="subtitle" style={styles.headline}>
          {headline}
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.body}>
          {body}
        </ThemedText>
      </ThemedView>
      <View style={styles.dots}>
        {Array.from({ length: totalSlides }, (_, index) => (
          <View key={index} style={[styles.dot, index === slideIndex && styles.dotActive]} />
        ))}
      </View>
      <GoLiveCTA />
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/OnboardingSlides',
  component: OnboardingSlide,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof OnboardingSlide>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slide1Welcome: Story = {
  args: {
    slideIndex: 0,
    totalSlides: 3,
    headline: 'Vote together',
    body: 'See confidence spread in real time — from standups to all-hands.',
  },
};

export const Slide2GoLive: Story = {
  args: {
    slideIndex: 1,
    totalSlides: 3,
    headline: 'Go live in seconds',
    body: 'One tap to start. Share a link or QR. No setup wizard.',
  },
};

export const Slide3SeeSpread: Story = {
  args: {
    slideIndex: 2,
    totalSlides: 3,
    headline: 'See who voted what',
    body: 'Follow up on low scores while the room is still together.',
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  hero: {
    flex: 1,
    borderRadius: Spacing.four,
    padding: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  heroIllustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(60, 135, 247, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 56,
  },
  headline: {
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 34,
  },
  body: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 300,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: FovColors.muted,
    opacity: 0.35,
  },
  dotActive: {
    backgroundColor: FovColors.accent,
    opacity: 1,
    width: 24,
  },
});
