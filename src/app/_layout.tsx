import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router';
import { StyleSheet, useColorScheme, View } from 'react-native';

import StorybookUIRoot from '../../.rnstorybook';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { PersistentTabBar } from '@/components/navigation/persistent-tab-bar';
import { MockSessionProvider } from '@/context/mock-session-context';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true') {
    return <StorybookUIRoot />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <MockSessionProvider>
        <AnimatedSplashOverlay />
        <View style={styles.shell}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="sessions" />
            <Stack.Screen name="join" />
            <Stack.Screen name="host/[id]/share" />
            <Stack.Screen name="host/[id]/live" />
          </Stack>
          <PersistentTabBar />
        </View>
      </MockSessionProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
});
