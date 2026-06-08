import type { Meta, StoryObj } from '@storybook/react-native';
import { Pressable, StyleSheet, View } from 'react-native';

import { SessionQrMock } from '@/components/session/session-qr-mock';
import { hostFrameDecorator } from '@/components/session/story-decorator';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

function QrScannerFrame({ state }: { state: 'permission' | 'scanning' }) {
  return (
    <View style={styles.screen}>
      <ThemedText type="subtitle" style={styles.title}>
        Join a session
      </ThemedText>
      {state === 'permission' ? (
        <ThemedView type="backgroundElement" style={styles.panel}>
          <ThemedText type="smallBold">Camera access</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Fist of Five uses your camera to scan session QR codes. You can cancel and join via a link instead.
          </ThemedText>
          <Pressable accessibilityRole="button" accessibilityLabel="Allow camera" style={styles.allowButton}>
            <ThemedText style={styles.allowLabel}>Allow camera</ThemedText>
          </Pressable>
        </ThemedView>
      ) : (
        <View style={styles.scannerZone}>
          <View style={styles.viewfinder}>
            <SessionQrMock size={180} />
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.scanHint}>
            Point at a session QR code
          </ThemedText>
        </View>
      )}
      <Pressable accessibilityRole="button" accessibilityLabel="Cancel" style={styles.cancel}>
        <ThemedText type="linkPrimary">Cancel — back to home</ThemedText>
      </Pressable>
    </View>
  );
}

const meta = {
  title: 'Session/Slice2/QrScannerFrame',
  component: QrScannerFrame,
  decorators: [hostFrameDecorator],
} satisfies Meta<typeof QrScannerFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PermissionRationale: Story = {
  args: { state: 'permission' },
};

export const Scanning: Story = {
  args: { state: 'scanning' },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.four,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  panel: {
    borderRadius: Spacing.four,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  allowButton: {
    backgroundColor: FovColors.accent,
    borderRadius: Spacing.two,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allowLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scannerZone: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  viewfinder: {
    padding: Spacing.three,
    borderRadius: Spacing.four,
    borderWidth: 2,
    borderColor: FovColors.accent,
    borderStyle: 'dashed',
  },
  scanHint: {
    textAlign: 'center',
  },
  cancel: {
    alignSelf: 'center',
    paddingVertical: Spacing.two,
  },
});
