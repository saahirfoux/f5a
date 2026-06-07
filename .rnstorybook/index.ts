import AsyncStorage from '@react-native-async-storage/async-storage';

import { view } from './storybook.requires';

/**
 * Storybook entry for Expo Router: import as default in src/app/_layout.tsx
 * when EXPO_PUBLIC_STORYBOOK_ENABLED=true.
 */
const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

export default StorybookUIRoot;
