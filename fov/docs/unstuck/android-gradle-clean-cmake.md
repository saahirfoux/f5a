# Android `./gradlew clean` fails with missing `codegen/jni`

## Symptoms

`./gradlew clean` fails on `:app:externalNativeBuildCleanDebug` with CMake errors like:

`add_subdirectory given source ".../node_modules/@op-engineering/op-sqlite/android/build/generated/source/codegen/jni/" which is not an existing directory.`

Similar lines may list `react-native-nitro-modules`, `react-native-reanimated`, `react-native-gesture-handler`, etc.

## Cause

With the **New Architecture**, the app’s native build uses an autolinking CMake file that `add_subdirectory`s **codegen output** under each library in `node_modules`. During **`clean`**, Gradle removes those generated folders (or they were never created yet). The **native clean** step still asks CMake to reconfigure, which expects those paths to exist, so configuration fails. This is a **clean-order / chicken-and-egg** issue, not a broken dependency tree.

## Fix

**Do not rely on `./gradlew clean` alone** when you hit this.

1. **Reset Android build artifacts from the shell** (from repo root `fov/`):

   ```bash
   rm -rf android/app/.cxx android/app/build android/build
   ```

   If Gradle itself seems corrupted, you can also remove `android/.gradle` (next sync will be slower).

2. **Rebuild** so codegen runs again:

   ```bash
   bun android
   ```

   Or from `android/`: `./gradlew assembleDebug` (use JDK 17+).

3. **Optional:** `./gradlew --stop` if daemons were using the wrong JDK.

Avoid deleting arbitrary `node_modules/*/android/build` by hand unless a doc tells you to; prefer the `android/app/.cxx` + `android/app/build` wipe above, then a full build.

## See also

- [Android Gradle / JDK](./android-gradle-jdk.md)
