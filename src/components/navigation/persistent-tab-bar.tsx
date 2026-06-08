import { usePathname, useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TabId = 'home' | 'sessions';

const TABS: { id: TabId; label: string; href: '/' | '/sessions'; icon: number }[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: require('@/assets/images/tabIcons/home.png'),
  },
  {
    id: 'sessions',
    label: 'Sessions',
    href: '/sessions',
    icon: require('@/assets/images/tabIcons/explore.png'),
  },
];

function activeTabForPath(pathname: string): TabId {
  if (pathname === '/sessions' || pathname.startsWith('/sessions/')) {
    return 'sessions';
  }
  return 'home';
}

export function PersistentTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const activeTab = activeTabForPath(pathname);

  return (
    <ThemedView
      type="backgroundElement"
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, Spacing.two),
          borderTopColor: theme.backgroundSelected,
        },
      ]}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => router.push(tab.href)}
            style={({ pressed }) => [styles.tab, pressed && styles.tabPressed]}>
            <Image
              source={tab.icon}
              style={[styles.icon, { tintColor: isActive ? FovColors.accent : theme.textSecondary }]}
            />
            <ThemedText
              type="small"
              style={[styles.label, isActive && styles.labelActive]}
              themeColor={isActive ? undefined : 'textSecondary'}>
              {tab.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    minHeight: BottomTabInset,
    paddingTop: Spacing.two,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
    minHeight: 48,
  },
  tabPressed: {
    opacity: 0.85,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 12,
  },
  labelActive: {
    color: FovColors.accent,
    fontWeight: '700',
  },
});
