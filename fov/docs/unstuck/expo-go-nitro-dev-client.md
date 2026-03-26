# Expo Go, Nitro modules, and dev builds

## Symptoms

- `Error: NitroModules are not supported in Expo Go! Use EAS (expo prebuild) or eject to a bare workflow instead.`
- Followed often by: `Invariant Violation: "main" has not been registered` (the JS bundle failed before `AppRegistry.registerComponent` ran).

## Cause

This app depends on native code that uses **NitroModules** (for example `@op-engineering/op-sqlite` and libraries used by **react-native-mmkv**). The stock **Expo Go** app does not ship those native libraries, so the bundle crashes at startup. The missing `main` registration is a downstream effect, not a separate Metro misconfiguration.

## How you know it is Expo Go (not the dev client)

In the Metro / `bun dev` terminal you see something like:

`Opening exp://192.168.x.x:8081/ on iPhone …` or `… on Pixel …`

The loaded manifest includes `"expoGo": { ... }` (visible in logs as `expoGo`). That means the **Expo Go** app is loading the project. This repo needs the **custom dev client** you build with Xcode/Gradle (`bun ios` / `bun android`), not Expo Go.

**Gotcha:** While `bun dev` is running, interactive shortcuts such as **`oi` (open iOS)** often launch **Expo Go** via `exp://`. Use a **separate** terminal and `bun ios` so the Simulator runs **Takeout (Dev)** (or your dev scheme), then connect to the same Metro URL from that app if prompted.

## Fix

Do **not** open this project in Expo Go.

1. Generate native projects if needed: `bun run prebuild:native` (runs `one prebuild`).
2. Run on device/simulator with the **development client**, not Expo Go:
   - iOS: `bun ios`
   - Android: `bun android`

On a physical device, install a **development build** (local Xcode/Android Studio or EAS) and use that app to load the dev server.

## See also

- [Android Gradle / JDK](./android-gradle-jdk.md) if Android native builds fail after prebuild.
