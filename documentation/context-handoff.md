# Fist of Five — context handoff

Last updated: June 2026. Use this when starting a new chat or onboarding a contributor.

---

## Repos

| Repo | Role |
|------|------|
| **f5a** | Expo app + Storybook (`bun run storybook` with `EXPO_PUBLIC_STORYBOOK_ENABLED=true`) |
| **f5b** | FastAPI auth only (`/me`, `/logout`, public) — **no `/sessions` yet** |
| **f5m** | Marketing |

---

## Documentation (done — do not re-plan unless asked)

| Doc | Purpose |
|-----|---------|
| [`platform-documentation-audit.html`](platform-documentation-audit.html) | Audit, traceability, Storybook roadmap, `#storybook-priority-review`, `#feature-roadmap` |
| [`platform-personas.html`](platform-personas.html) | 7 personas, Host life modes |
| [`life-scenarios-for-host.md`](life-scenarios-for-host.md) | Source narratives (host-only; do not edit unless asked) |

---

## Storybook — what’s built

### Slice 1 components

Location: `src/components/session/`

- `GoLiveCTA`
- `VoteControl`
- `SessionStateFullScreen`
- `RealtimeBanner`
- `LiveVoteRoster`
- `SpreadSummaryBar`

### VoteControl layouts

| Layout | Use |
|--------|-----|
| `thumbArc` | Default on the component; host-oriented |
| `slider` | **Chosen for participant / App Clip frames** |
| `row` | Legacy compare only (`LegacyRow` story) |

### Slice 2 components

- `TopicHeader`
- `HostShareCard`
- `JoinLink`
- `EnterSessionCTA`
- `SessionQrMock`

### Slice 2 frames (Storybook → `Session/Slice2/`)

- `HomeShell`
- `HostLiveFrame`
- `HostShareFrame`
- `ParticipantSessionFrame`
- `AppClipCompact`
- `QrScannerFrame`
- `OnboardingSlides`

Mock data: [`src/components/session/mock-data.ts`](../src/components/session/mock-data.ts) — `MOCK_JOIN_URL`, topics for Stories A/B/C.

First-slice regression stories remain under `Session/FirstSlice/`.

---

## App state

- Expo app is still the **Expo starter template** — session UI is **Storybook-only**, not wired to Expo Router.
- f5b needs auth path migration (`/v1/*` → root paths) then **session CRUD** before a real go-live loop.

---

## Product decisions (from docs)

- **Go live** dominant CTA; Join secondary
- Votes **1–5 only**; **Ably** realtime; **Enter session** before host room (v4 invariant)
- **Open decisions:** pinned wall QR vs per-session URL; auto-enter on go-live; public results URL host (f5m vs f5a web)

---

## Suggested next work

Pick one:

1. **Storybook review** — walk `Session/Slice2/*`, note refinements in audit `#storybook-priority-review`
2. **Storybook Slice 3** — audit rows #16–#23 (v1.1: `SessionSummaryBar`, `PublicResultsLinkCard`, session list, presets, etc.)
3. **Track B — f5b** — migrate auth paths + `/sessions` API
4. **Wire f5a** — replace starter home with `HomeShell` + go-live flow (needs API or client mocks)

---

## Run Storybook

```bash
cd f5a
bun run storybook
```

Also: `storybook:ios`, `storybook:android`, `storybook:web`.

---

## Related audit sections

- Host life scenarios → [`#host-life-scenarios-traceability`](platform-documentation-audit.html#host-life-scenarios-traceability)
- Build queue → [`#storybook-priority-review`](platform-documentation-audit.html#storybook-priority-review)
- Full feature backlog → [`#feature-roadmap`](platform-documentation-audit.html#feature-roadmap)
