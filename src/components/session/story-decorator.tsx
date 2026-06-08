import type { Decorator } from '@storybook/react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';

export const sessionStoryDecorator: Decorator = (Story) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: Spacing.three }}>
      <Story />
    </View>
  </SafeAreaView>
);

/** Full-height frame for participant vote context (topic top, vote bottom). */
export const participantFrameDecorator: Decorator = (Story) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, padding: Spacing.three }}>
      <Story />
    </View>
  </SafeAreaView>
);

/** Host shell: top bar + scrollable body + bottom CTA zone. */
export const hostFrameDecorator: Decorator = (Story) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1, paddingHorizontal: Spacing.three, paddingTop: Spacing.two }}>
      <Story />
    </View>
  </SafeAreaView>
);

/** Wide canvas for public results / projector-style web frames. */
export const projectorFrameDecorator: Decorator = (Story) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
    <View
      style={{
        flex: 1,
        minWidth: 720,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 960,
        padding: Spacing.four,
        justifyContent: 'center',
      }}>
      <Story />
    </View>
  </SafeAreaView>
);
