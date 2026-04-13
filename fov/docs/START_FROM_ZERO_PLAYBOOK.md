# Tamagui Takeout: Start-From-Zero Playbook (macOS Apple Silicon)

Use this if you nuke the repo or start from an empty repo and want a deterministic path to a working `fov` setup (including iOS todo creation, logging streams, and troubleshooting).

## 0) Scope and Success Criteria

You are done when all are true:

- `bun backend` is healthy (Postgres + Zero)
- `bun dev` runs and app loads
- iOS runs in dev client (not Expo Go)
- demo login works
- creating todo on iOS works (no `auth id: undefined` mutator error)
- logs stream to `.logs/YYYY-MM-DD/*` and can be queried quickly

## 1) Required Docs (Read First)

- Core project guide: `README.md`
- Command cheat sheet: `help.sh` (run `./help.sh`)
- Unstuck index: `docs/unstuck/README.md`
- Expo Go vs dev client: `docs/unstuck/expo-go-nitro-dev-client.md`
- iOS simctl openurl code 115: `docs/unstuck/ios-simctl-openurl-115.md`
- Android JDK requirements: `docs/unstuck/android-gradle-jdk.md`
- Android CMake/codegen clean issue: `docs/unstuck/android-gradle-clean-cmake.md`
- Backend migration context (optional): `README_MIGRATE_BACKEND.md`

## 2) Machine Prereqs (macOS M1)

- Xcode 16+ (with iOS Simulator installed)
- Docker Desktop or OrbStack running
- Bun installed
- Git installed
- (Android only) JDK 17+ and Android Studio
- Optional but useful on Apple Silicon: Rosetta
  - `softwareupdate --install-rosetta`

## 3) Fresh Repo Bootstrap

From repo root (`fov`):

```bash
bun install
bun backend
```

In a second terminal:

```bash
bun migrate
```

Then in a third terminal:

```bash
bun dev
```

For iOS (fourth terminal):

```bash
bun ios
```

## 4) Critical Rule: Do Not Use Expo Go

This project requires a dev client for native modules (Nitro stack).

- Wrong path symptoms:
  - Metro says it is opening `exp://...`
  - runtime crash mentioning Nitro modules / `main has not been registered`
- Correct path:
  - Launch using `bun ios` / `bun android`
  - Use the installed dev build app in simulator/device

See `docs/unstuck/expo-go-nitro-dev-client.md`.

## 5) Daily Developer Command Set

Use these as your standard loop:

```bash
./help.sh
bun backend
bun migrate
bun dev
bun ios
```

Useful support commands:

```bash
bun logs:status
bun logs:snapshot
bun logs:stop
bun check types
bun lint
```

## 6) Logging + Streaming Workflow (Important)

`bun dev` runs with stream logging enabled by default.

- Logs layout: `.logs/YYYY-MM-DD/<log-type>/<timestamp>.log`
- Day index: `.logs/YYYY-MM-DD/index.md`
- Latest pointer: `.logs/latest` (**file pointer, not a symlinked folder**)

Resolve latest path safely in zsh:

```bash
LATEST_DIR="$(tr -d '\n' < .logs/latest)"
echo "$LATEST_DIR"
ls -la "$LATEST_DIR"
```

Query key app/server failures:

```bash
LATEST_DIR="$(tr -d '\n' < .logs/latest)"
rg "ERROR|Exception|todo\.insert|Not Allowed|auth id|ECONNREFUSED|simctl|Expo Go" "$LATEST_DIR" -g "*.log"
```

Query auth/mutator diagnostics specifically:

```bash
LATEST_DIR="$(tr -d '\n' < .logs/latest)"
rg "\[zero\] push request diagnostics|\[auth\] token diagnostics|\[auth\] token parsed|\[zero\] push auth diagnostics|todo\.insert failed|Not Allowed: todo with auth id" "$LATEST_DIR"/server-dev/*.log
```

## 7) Known High-Value Failure Branches (X / Y / Z)

### X) Demo login fails / auth endpoints 500

Symptoms:
- `/api/auth/*` errors
- `ECONNREFUSED 127.0.0.1:5533`

Do:
1. Ensure Docker is running
2. Run `bun backend`
3. Run `bun migrate`
4. Re-check with `bun logs:snapshot` and `bun logs:status`

### Y) iOS app opens but todo insert fails with permission/auth error

Symptoms:
- `Mutator "todo|insert" app error on server`
- `Not Allowed: todo with auth id: undefined`

Do:
1. Confirm you are logged in with demo user
2. Pull server logs using the auth diagnostics query above
3. Check for:
   - `hasAuthorizationHeader: true`
   - `tokenSource: header`
   - `authId: <user-id>`
4. If header/token is missing, apply this exact patch (do not guess):

`src/features/auth/client/authClient.ts`:

```ts
import { createBetterAuthClient } from '@take-out/better-auth-utils'
import { href } from 'one'
import { useEffect } from 'react'

// ... existing betterAuthClient setup ...

export const useAuth = () => {
  const auth = betterAuthClient.useAuth()

  useEffect(() => {
    const sessionToken = auth.session?.token
    if (auth.state !== 'logged-in' || auth.token || !sessionToken) {
      return
    }

    void (async () => {
      const token = await betterAuthClient.getValidToken()
      if (!token) return

      await betterAuthClient.setAuthClientToken({
        token,
        session: sessionToken,
      })
    })()
  }, [auth.state, auth.token, auth.session?.token])

  return {
    ...auth,
    loginText: auth.state === 'logged-in' ? 'Account' : 'Login',
    loginLink: href(auth.state === 'logged-in' ? '/home/feed' : '/auth/login'),
  }
}
```

`src/zero/client.tsx`:

```ts
export const ProvideZero = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()
  const userId = auth?.user?.id || 'anon'
  const jwtToken = auth?.token || ''
  const role = auth.user?.role
  const providerKey = `${userId}:${jwtToken ? jwtToken.slice(0, 16) : 'no-token'}`

  // ...authData useMemo...

  return (
    <ProvideZeroWithoutAuth
      key={providerKey}
      userID={userId}
      auth={jwtToken}
      kvStore={isBrowser && userId ? 'idb' : 'mem'}
      authData={authData}
      cacheURL={ZERO_SERVER_URL}
    >
      {children}
      <ZeroDevTools />
    </ProvideZeroWithoutAuth>
  )
}
```

5. Restart dev surfaces after patch:
   - stop/restart `bun dev`
   - relaunch iOS dev client with `bun ios`
6. Re-test todo create and confirm auth diagnostics now show header/token/auth id present.

### Z) iOS `simctl openurl` fails (code 115)

Do:
1. Open app manually in Simulator if already installed
2. If still stuck, erase simulator content/settings and rerun `bun ios`
3. On Apple Silicon, install Rosetta if missing

See `docs/unstuck/ios-simctl-openurl-115.md`.

## 8) Verification Checklist (Copy/Paste)

```bash
bun logs:status
bun check types
LATEST_DIR="$(tr -d '\n' < .logs/latest)"
test -f "$LATEST_DIR/index.md" && echo "index ok"
rg "todo\.insert|Not Allowed: todo with auth id|push request diagnostics|token diagnostics" "$LATEST_DIR"/server-dev/*.log
```

Pass criteria:
- Typecheck passes
- index exists
- no new `Not Allowed: todo with auth id: undefined` after creating todo

## 9) AI Prompts You Can Reuse in a Fresh Context

### Prompt A: Fast triage from logs

```text
Project root is fov.
Review .logs/latest + today's index.md for ISSUE: <describe symptom>.
Return top 3 root-cause leads, confidence, and next 3 checks.
Assume .logs/latest is a file pointer, resolve it correctly before searching logs.
```

### Prompt B: Native auth/mutator diagnostics

```text
In fov, investigate why iOS todo insert fails with mutator auth errors.
Inspect:
- app/api/zero/push+api.tsx
- src/features/auth/server/validateAuthHeader.ts
- src/features/auth/client/authClient.ts
- src/zero/client.tsx
Confirm whether Zero push requests include Authorization headers and whether auth.id is populated.
Return exact root cause and minimal patch.
```

### Prompt C: Setup sanity audit for Apple Silicon

```text
Audit this fov setup for macOS Apple Silicon (M1/M2):
1) Prereq validation
2) bun backend + migrate + dev + ios flow
3) Expo Go misuse detection
4) Logging stream health and latest-day log query commands
Return a checklist with pass/fail and immediate fixes.
```

### Prompt D: Documentation gap report

```text
Review README.md, help.sh, and docs/unstuck/*.md.
Produce a prioritized list of onboarding/documentation gaps for first-time macOS Apple Silicon developers.
For each gap, include exact text or command that should be added.
```

## 10) What to Keep in Your Local Notes

- Always keep `bun backend` running during auth/demo flows.
- Always start iOS through `bun ios`, not dev-server shortcuts that open Expo Go.
- Treat `.logs/latest` as a pointer file; resolve it before globs.
- Use `./help.sh` as your daily command source of truth.

