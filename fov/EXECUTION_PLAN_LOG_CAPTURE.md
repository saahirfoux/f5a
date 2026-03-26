# Execution Plan: Unified Log Capture (Implemented)

Goal: make iOS, Android, web, dev-server, and docker logs easy to capture in one
local place while keeping logs out of git.

## Current workflow

- `bun dev`
  - Starts app dev server.
  - Auto-starts safe stream logger supervisor (single-owner lock).
  - Captures `one dev` output into `server-dev` logs.
- `bun dev:no-logs`
  - Runs normal dev server without auto stream logging.
- `bun logs:status`
  - Shows stream supervisor + child process status.
- `bun logs:stop`
  - Stops supervisor and child collectors, clears lock/pid files.
- `bun logs:snapshot`
  - One-shot capture for docker + ios/android/web diagnostics.
- `bun logs:stream`
  - Manually run stream collector.

## Log layout

- Root: `.logs/` (gitignored)
- Per day: `.logs/YYYY-MM-DD/`
- Per type: `.logs/YYYY-MM-DD/<log-type>/`
- File names: `<timestamp>.log` (`YYYYMMDD-HHMMSS`)
- Index: `.logs/YYYY-MM-DD/index.md`
- Latest pointer: `.logs/latest`

Supported log types:

- `app-ios`
- `app-android`
- `app-web`
- `server-dev`
- `docker-zero`
- `docker-pgdb`

## Safety pattern implemented

- Lock file: `.logs/.stream.lock`
- Child pid tracking: `.logs/.stream.pids`
- Startup behavior:
  - Reuses existing live supervisor (no duplicates).
  - Cleans stale lock before starting a new supervisor.
- Cleanup behavior:
  - `trap` on `EXIT/INT/TERM` in supervisor kills child collectors.
  - `bun dev` wrapper calls stop on exit when it started the supervisor.
  - `bun logs:stop` can always be used as manual recovery.

## Troubleshooting continuation workflow

1. Run `bun backend`.
2. Run `bun dev` (auto logging starts).
3. Reproduce issue in iOS/Android/web.
4. Check `.logs/latest` and the current day `index.md`.
5. Share the most relevant files from:
   - `server-dev`
   - `docker-zero`
   - `docker-pgdb`
   - `app-ios` / `app-android` / `app-web`

