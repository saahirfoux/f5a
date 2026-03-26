# Migrating `fov` Away from Starter Docker Backend

This guide outlines a safe migration from the current starter backend to your long-term architecture (Supabase + your backend services).

## Current `fov` backend expectations

Today, this app expects:

- Local Docker services via `bun backend` (Postgres + Zero)
- Auth flow via Better Auth backed by Postgres
- Local migrations via `bun migrate`

If Docker backend is down, auth endpoints fail (example: `ECONNREFUSED 127.0.0.1:5533` and `/api/auth/*` returns 500).

## Target direction

Based on your architecture docs in `f5m`:

- Supabase Postgres + Supabase Auth
- Your API/backend services for business logic
- Cross-surface auth strategy aligned with:
  - `f5m/documentation/setup/production_tech_stack.md`
  - `f5m/documentation/ideas/cross_subdomain_auth.md`

## Migration strategy (staged, low-risk)

### Phase 0: Stabilize current local dev

- Keep `bun backend` and existing auth flow working.
- Keep mobile dev client workflow unchanged.
- Add clear docs for when backend is required.

### Phase 1: Introduce Supabase environment scaffolding

- Add non-secret env variable placeholders for Supabase URL/keys.
- Keep existing Better Auth + local DB path as default.
- Add a feature flag or environment switch for backend mode.

### Phase 2: Auth integration transition

- Introduce Supabase Auth session/JWT handling alongside current auth flow.
- Update client auth calls gradually to a compatibility layer.
- Ensure web/native differences are handled:
  - Web: cookie/session behavior
  - Native: secure storage token flow

### Phase 3: Data path transition

- Move from local Docker Postgres connection strings to Supabase connection strings for chosen services.
- Decide whether to keep Zero in this app or replace with your realtime/data strategy.
- Update migration/seeding runbooks for Supabase-first operations.

### Phase 4: Decommission starter backend path

- Once feature parity is confirmed, mark `bun backend` as optional/legacy.
- Keep a fallback path until rollout is stable.

## What to keep vs what changes

### Keep

- Tamagui UI layer and existing app routing structure
- One/Expo dev workflow (`bun dev`, `bun ios`, `bun android`)
- Existing docs/unstuck troubleshooting pattern

### Change

- Auth client/server integration points
- API base URLs and token/session wiring
- Environment model and local onboarding instructions
- Potentially Docker composition (if replacing starter services)

## Risks and open decisions

- Zero + Supabase compatibility strategy for your use cases
- Parallel operation complexity while both backends exist
- Auth migration edge cases across web/native platforms
- Service ownership boundaries between mobile app server routes and your external backend

## Prompt for an AI coding agent

```text
You are working in f5a/fov. Implement a staged backend migration foundation:

1) Add environment variable scaffolding for Supabase (no secrets in repo).
2) Add a backend-mode switch (starter Docker vs Supabase path), defaulting to current working setup.
3) Keep existing `bun backend` + local auth path fully functional.
4) Add docs describing migration phases, verification criteria, and rollback steps.
5) If adding a new Docker strategy, keep it separate from starter compose and clearly named.
6) Reference f5m architecture docs:
   - documentation/setup/production_tech_stack.md
   - documentation/ideas/cross_subdomain_auth.md
7) Do not remove current working flows until migration parity is proven.
```

