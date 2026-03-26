# Takeout Free

> **[Takeout Pro](https://tamagui.dev/takeout)** - The full version with more features, templates, and support.

> **⚠️ v2-beta** - This stack is in active development. APIs may change.

A full-stack, cross-platform starter kit for building modern web and mobile
applications with React Native.

## Prerequisites

Before you begin, ensure you have:

- **Bun** - [Install Bun](https://bun.sh)
- **Docker** - [Install Docker](https://docs.docker.com/get-docker/) (on macOS,
  we recommend [OrbStack](https://orbstack.dev) as a faster alternative)
- **Git** - For version control

For mobile development:

- **iOS**: macOS with Xcode 16+
- **Android**: Android Studio with JDK 17+

## Quick Start

```bash
bun install
bun backend      # start docker services (postgres, zero)
bun dev          # start web dev server at http://localhost:8092
```

Auth endpoints (including **Login as Demo User**) require the backend services above. If `bun backend` is not running, auth requests can fail with `500` and connection-refused errors.

## Stack

At a high level, the primary technologies used are:

- [One](https://onestack.dev) - Universal React framework
- [Zero](https://zero.rocicorp.dev) - Real-time sync
- [Tamagui](https://tamagui.dev) - Universal UI
- [Better Auth](https://www.better-auth.com) - Authentication
- [Drizzle ORM](https://orm.drizzle.team) - Database schema

## Project Structure

```
takeout-free/
├── app/                   # File-based routing (One router)
│   ├── (app)/             # Authenticated routes
│   │   ├── auth/          # Login flows
│   │   └── home/          # Main app tabs
│   └── api/               # API routes
├── src/
│   ├── features/          # Feature modules (auth, todo, theme)
│   ├── interface/         # Reusable UI components
│   ├── database/          # Database schema and migrations
│   ├── data/              # Zero schema, models, and queries
│   ├── zero/              # Real-time sync configuration
│   ├── server/            # Server-side code
│   └── tamagui/           # Theme configuration
├── scripts/               # CI/CD and helper scripts
├── docs/                  # Documentation
└── assets/                # Images, fonts, splash screens
```

## Common Commands

Run `./help.sh` (from this folder) for a printable cheat sheet of these commands and troubleshooting hints.

```bash
# development
bun dev                      # start dev server + auto-stream log capture
bun dev:no-logs              # start dev server without auto log streams
bun ios                      # run iOS simulator
bun android                  # run Android emulator
bun backend                  # start docker services

# code quality
bun check                    # typescript type checking
bun lint                     # run oxlint
bun lint:fix                 # auto-fix linting issues

# testing
bun test:unit                # unit tests
bun test:integration         # integration tests

# database
bun migrate                  # build and run migrations

# logging
bun logs:status              # check stream lock/supervisor + child pids
bun logs:stop                # stop stream supervisor + children, clear lock
bun logs:snapshot            # one-shot capture (ios/android/web/docker status)

# deployment
bun ci --dry-run             # run full CI pipeline without deploy
bun ci                       # full CI/CD with deployment
```

### How to confirm backend is up

- `bun backend` terminal stays healthy (no Postgres startup failures)
- auth requests in `bun dev` are not returning `500`
- demo login does not fail with `ECONNREFUSED 127.0.0.1:5533`

## Logging

`bun dev` auto-starts a safe background stream logger. The logger uses a single
lock file and stale-lock cleanup so re-running `bun dev` does not start
duplicate stream supervisors.

- Logs are written under `.logs/YYYY-MM-DD/<log-type>/<timestamp>.log`
- Today's index: `.logs/YYYY-MM-DD/index.md`
- Latest day pointer: `.logs/latest`
- Escape hatch: `bun dev:no-logs`
- Manual controls: `bun logs:status`, `bun logs:stop`, `bun logs:snapshot`

If you stop `bun dev` with Ctrl+C, the wrapper attempts to stop the stream
supervisor it started and clean child log collectors.

## Database

### Local Development

PostgreSQL runs in Docker on port 5444:

- Main database: `postgresql://user:password@localhost:5444/postgres`
- Zero sync databases: `zero_cvr` and `zero_cdb`

### Migrations

Update your schema in:

- `src/database/schema-public.ts` - Public tables (exposed to Zero/client)
- `src/database/schema-private.ts` - Private tables

Then run:

```bash
bun migrate
```

## Environment Configuration

### File Structure

- `.env.development` - Development defaults (committed)
- `.env` - Active environment (generated, gitignored)
- `.env.local` - Personal secrets/overrides (gitignored)
- `.env.production` - Production config (gitignored)
- `.env.production.example` - Production template (committed)

### Key Variables

```bash
# authentication
BETTER_AUTH_SECRET=<secret>
BETTER_AUTH_URL=<url>

# server
ONE_SERVER_URL=<url>

# zero
ZERO_UPSTREAM_DB=<connection-string>
ZERO_CVR_DB=<connection-string>
ZERO_CHANGE_DB=<connection-string>

# storage (S3/R2)
CLOUDFLARE_R2_ENDPOINT=<endpoint>
CLOUDFLARE_R2_ACCESS_KEY=<key>
CLOUDFLARE_R2_SECRET_KEY=<secret>
```

See `.env.production.example` for complete production configuration.

## Mobile Apps

### iOS

```bash
bun ios          # run in simulator
```

Requires macOS, Xcode 16+, and iOS 17.0+ deployment target.

### Android

```bash
bun android      # run in emulator
```

Requires Android Studio, JDK 17+, and Android SDK 34+.

## Adding Features

### Data Models

1. Add schema to `src/database/schema-public.ts`
2. Run `bun migrate`
3. Add Zero model to `src/data/models/`
4. Run `bun zero:generate`
5. Use queries in your components

### UI Components

Reusable components live in `src/interface/`. Use components from there rather
than importing directly from Tamagui when possible.

### Icons

This project uses [Phosphor Icons](https://phosphoricons.com/). Icons are in
`src/interface/icons/phosphor/`.

## License

MIT
