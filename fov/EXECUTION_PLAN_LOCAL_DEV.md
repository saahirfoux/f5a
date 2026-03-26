# Execution Plan: Local Dev (Auth + Demo Login)

This plan is the fastest path to get local auth and "Login as Demo User" working.

## Why demo login failed

From `bun_dev_log.md`, the auth endpoint returned `500` because server-side auth could not connect to Postgres:

- `connect ECONNREFUSED 127.0.0.1:5533`
- `[auth] POST 500 http://.../api/auth/sign-up/email`

That means `bun dev` was running, but the backend dependencies (Docker Postgres/Zero) were not.

## Happy-path runbook

From `fov/`:

1. Install dependencies:
   - `bun install`
2. Start backend services (keep running):
   - `bun backend`
3. Apply migrations:
   - `bun migrate`
4. Start app dev server (new terminal):
   - `bun dev`
5. Run platform app (new terminal):
   - iOS: `bun ios`
   - Android: `bun android`
6. In app, tap **Login as Demo User**.

## Verification checklist

- **Backend terminal** (`bun backend`):
  - Docker services start successfully.
  - No Postgres connection failures.
- **App server terminal** (`bun dev`):
  - `POST /api/auth/sign-up/email` or `sign-in/email` returns non-500.
  - No `ECONNREFUSED 127.0.0.1:5533`.
- **App UI**:
  - Demo login navigates to `/home/feed` instead of showing "Demo login failed".

## Troubleshooting links

- `docs/unstuck/expo-go-nitro-dev-client.md`
- `docs/unstuck/android-gradle-jdk.md`
- `docs/unstuck/android-gradle-clean-cmake.md`
- `docs/unstuck/ios-simctl-openurl-115.md`

## Prompt for an AI coding agent

```text
You are working in f5a/fov. Execute the local-dev hardening checklist:

1) Update README.md and help.sh to explicitly state:
   - auth + demo login require `bun backend` running
   - `bun migrate` must be run after backend is up
2) Add/adjust docs/unstuck entries if local auth failures are not covered.
3) Add a compact "How to confirm backend is up" section in README.md.
4) Keep language concise and operational (commands first).
5) Do not commit secrets or environment values.
```

