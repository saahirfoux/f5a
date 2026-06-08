import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScreenTopBar } from '@/components/navigation/screen-top-bar';
import { HostScreenLayout } from '@/components/session/host-screen-layout';
import { SessionQrMock } from '@/components/session/session-qr-mock';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FovColors } from '@/constants/fov';
import { Spacing } from '@/constants/theme';

export function JoinScreen() {
  const [scanning, setScanning] = useState(false);

  return (
    <HostScreenLayout>
      <View style={styles.screen}>
        <ScreenTopBar title="Join a session" />

        {!scanning ? (
          <ThemedView type="backgroundElement" style={styles.panel}>
            <ThemedText type="smallBold">Camera access</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Fist of Five uses your camera to scan session QR codes. You can cancel and join via a link instead.
            </ThemedText>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Allow camera"
              onPress={() => setScanning(true)}
              style={styles.allowButton}>
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
      </View>
    </HostScreenLayout>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: Spacing.four,
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
});
