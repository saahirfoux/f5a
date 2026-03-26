# iOS Simulator: `simctl openurl` fails (LSApplicationWorkspaceErrorDomain 115)

## Symptoms

Running `bun ios` builds + installs the dev client, but then fails to open it with a deep link:

- `Opening exp+takeout://expo-development-client/?url=http%3A%2F%2F...:8081 on iPhone ...`
- `xcrun simctl openurl ... exited with non-zero code: 115`
- `LSApplicationWorkspaceErrorDomain, code=115`

## Cause

The app is installed and launchable, but iOS Simulator sometimes fails to route custom URL schemes via `simctl openurl` (this is seen more often on Apple Silicon). This is a Simulator/launch tooling issue, not a Nitro / Expo Go issue.

## Fix

### Option A (workaround): open the app manually

If the app icon is present in the Simulator, launch it normally and connect to the running dev server from inside the dev client UI.

### Option B (what fixed it here): reset the Simulator

Simulator → **Device** → **Erase All Content and Settings…**

Then re-run `bun ios`.

### Option C (Apple Silicon): install Rosetta (if missing)

```bash
softwareupdate --install-rosetta
```

Then re-run `bun ios`.

## See also

- [Expo Go, Nitro modules, and dev builds](./expo-go-nitro-dev-client.md)

