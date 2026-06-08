import type { Meta, StoryObj } from '@storybook/react-native';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { hostFrameDecorator } from '@/components/session/story-decorator';
import type { MenuAuthState } from '@/components/session/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function MenuDrawer({ authState }: { authState: MenuAuthState }) {
  return (
    <View style={styles.screen}>
      <View style={styles.dimmedContent}>
        <ThemedText type="smallBold">Fist of Five</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.dimmedHint}>
          Home shell (dimmed)
        </ThemedText>
      </View>

      <ThemedView type="backgroundElement" style={styles.drawer}>
        {authState === 'signed-in' && <SignedInContent />}
        {authState === 'login' && <LoginContent />}
        {authState === 'loading' && <LoadingContent />}
        {authState === 'error' && <ErrorContent />}
      </ThemedView>
    </View>
  );
}

function SignedInContent() {
  return (
    <>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <ThemedText type="smallBold" style={styles.avatarLabel}>
            S
          </ThemedText>
        </View>
        <View>
          <ThemedText type="smallBold">Saahir</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            saahir@example.com
          </ThemedText>
        </View>
      </View>

      <NavRow label="My sessions" />
      <NavRow label="Settings" />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Log out"
        style={({ pressed }) => [styles.logout, pressed && styles.pressed]}>
        <ThemedText type="smallBold" style={styles.logoutLabel}>
          Log out
        </ThemedText>
      </Pressable>
    </>
  );
}

function LoginContent() {
  return (
    <View style={styles.centered}>
      <ThemedText type="smallBold" style={styles.centeredTitle}>
        Sign in to host sessions
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.centeredBody}>
        Save your sessions and get vote notifications
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign in"
        style={({ pressed }) => [styles.signInButton, pressed && styles.pressed]}>
        <ThemedText style={styles.signInLabel}>Sign in</ThemedText>
      </Pressable>
    </View>
  );
}

function LoadingContent() {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={FovColors.accent} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.loadingText}>
        Signing in…
      </ThemedText>
    </View>
  );
}

function ErrorContent() {
  return (
    <View style={styles.centered}>
      <ThemedText type="smallBold" style={styles.errorTitle}>
        Could not sign in
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.centeredBody}>
        Check your connection and try again
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Retry sign in"
        style={({ pressed }) => [styles.signInButton, pressed && styles.pressed]}>
        <ThemedText style={styles.signInLabel}>Retry</ThemedText>
      </Pressable>
    </View>
  );
}

function NavRow({ label }: { label: string }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} style={styles.navRow}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        →
      </ThemedText>
    </Pressable>
  );
}

const meta = {
  title: 'Session/Slice3/MenuDrawer',
  component: MenuDrawer,
  decorators: [hostFrameDecorator],
  args: { authState: 'signed-in' as MenuAuthState },
} satisfies Meta<typeof MenuDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SignedIn: Story = {
  args: { authState: 'signed-in' },
};

export const LoginPrompt: Story = {
  args: { authState: 'login' },
};

export const Loading: Story = {
  args: { authState: 'loading' },
};

export const Error: Story = {
  args: { authState: 'error' },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
  },
  dimmedContent: {
    flex: 1,
    opacity: 0.35,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  dimmedHint: {
    marginTop: Spacing.four,
  },
  drawer: {
    width: 280,
    padding: Spacing.four,
    gap: Spacing.three,
    borderTopLeftRadius: Spacing.four,
    borderBottomLeftRadius: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginBottom: Spacing.two,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FovColors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    color: '#FFFFFF',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
    borderBottomColor: FovColors.voteTrack,
  },
  logout: {
    marginTop: 'auto',
    paddingVertical: Spacing.two,
  },
  logoutLabel: {
    color: FovColors.danger,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.four,
  },
  centeredTitle: {
    textAlign: 'center',
  },
  centeredBody: {
    textAlign: 'center',
  },
  signInButton: {
    marginTop: Spacing.two,
    backgroundColor: FovColors.accent,
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    minWidth: 160,
    alignItems: 'center',
  },
  signInLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  loadingText: {
    marginTop: Spacing.two,
  },
  errorTitle: {
    color: FovColors.danger,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.85,
  },
});
