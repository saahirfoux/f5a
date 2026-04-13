# Complaint: Starter Experience Breakdown (macOS + Apple Silicon)

## Author Context

- Developer environment: macOS (Darwin 24.6.0) on Apple Silicon (M1)
- Project: Takeout-style starter (`fov`)
- Expected outcome: "easy starter" onboarding and smooth path to building app features
- Actual outcome: repeated setup/runtime failures and unclear recovery guidance before basic todo functionality worked

## Executive Summary

This starter did not provide a reliable "quick start" experience for an M1 macOS developer. Critical guidance is scattered across `README`, `help.sh`, and `docs/unstuck`, and key failure modes are either buried, reactive-only, or missing entirely.

I lost significant development time on platform/tooling issues that should have been prevented by first-run docs and guardrails.

## What Finally Worked

- Running backend and migrations (`bun backend`, `bun migrate`)
- Running iOS with dev client (`bun ios`) instead of Expo Go
- Investigating logs under `.logs/YYYY-MM-DD/`
- Fixing auth propagation for Zero push mutations so todo inserts include credentials

After auth propagation fixes, creating todos on iOS succeeded.

## Incident from This Session (Concrete Evidence)

When adding todos on iOS (demo login), server logs showed:

- `Mutator "todo|insert" app error on server`
- `[permission] Not Allowed: todo with auth id: undefined`
- New diagnostics confirmed `/api/zero/push` arrived with:
  - no `Authorization` header
  - no cookie
  - `authId: null`

This produced a hard failure in a basic starter feature ("add todo"), even while the user was logged in via demo flow.

## Documentation Failures (Itemized)

1. **No mandatory first-run checklist for Apple Silicon users**
   - Docs mention pieces (Xcode, Android JDK, Expo Go caveat), but not a strict ordered checklist that prevents known M1 pitfalls.
   - Result: trial-and-error sequencing instead of deterministic setup.

2. **Quick Start over-promises simplicity and under-specifies failure prerequisites**
   - `README` quick start is concise but hides the true dependency chain for mobile + auth + Zero mutation behavior.
   - Missing explicit "you are not done until these health checks pass" section.

3. **Expo Go vs Dev Client warning is present but not enforced**
   - There is a warning in `help.sh` and `docs/unstuck/expo-go-nitro-dev-client.md`.
   - But no hard guard (script/runtime detection) to fail fast when user is in Expo Go path.
   - For a starter, this should be impossible to miss.

4. **`.logs/latest` behavior is not operationally clear for command-line usage**
   - `.logs/latest` is a file pointer, not a symlinked directory.
   - A natural command like `.logs/latest/server-dev/*.log` fails in zsh.
   - Docs do not provide canonical shell snippets for extracting latest-day logs.

5. **No "logged in but mutations unauthorized" troubleshooting path**
   - The auth docs do not call out that login/session state can diverge from mutation auth headers in native flow.
   - No explicit diagnostic recipe for Zero push auth (`Authorization`, cookie, parsed auth id).

6. **No "starter acceptance tests" for core flows**
   - A starter should ship with one command/checklist that verifies:
     - demo login works
     - add todo works on iOS
     - mutation auth is present
   - Without this, users discover breakage only after entering feature work.

7. **Unstuck docs are useful but reactive and fragmented**
   - `docs/unstuck` contains good postmortems, but new users do not know which one applies until after they fail.
   - Needs a decision tree ("if you see X, do Y") linked from top-level onboarding.

8. **Error messages do not map directly to docs**
   - Common errors (permission denied on mutation, simctl openurl 115, Expo Go mismatch) should include direct links/hints to exact docs.
   - Current experience requires manual log archaeology.

9. **No explicit platform profile docs for macOS M1**
   - Apple Silicon-specific gotchas are noted in isolated places (e.g., simctl 115/Rosetta), not consolidated in one setup page.
   - A dedicated `macos-apple-silicon.md` would have avoided repeated context switching.

10. **Starter positioning mismatch**

- The project presents as an easy starter, but currently behaves like an advanced stack requiring deep infra debugging.
- That mismatch is the core UX failure.

## Impact

- Delayed actual feature development.
- High frustration and context switching.
- Time spent debugging starter infrastructure rather than product requirements.

## What Maintainers Should Change Immediately

1. Add `docs/getting-started/macos-apple-silicon.md` with a strict ordered checklist and pass/fail checks.
2. Add a "First 10 Minutes Verification" section to `README`:
   - backend up
   - demo login succeeds
   - create todo succeeds on iOS dev client
3. Add hard runtime detection/guardrails:
   - fail fast if Expo Go is detected for this app
   - print exact remediation command (`bun ios` / `bun android`)
4. Add canonical log commands in docs:
   - resolve `.logs/latest` pointer to a path
   - grep key auth/mutation diagnostics
5. Add a troubleshooting entry specifically for:
   - "Logged in, but Zero mutator returns `Not Allowed: auth id undefined`"
6. Add a single command/script (`bun doctor` or similar) to validate environment + starter readiness.
7. Surface doc links directly in relevant error output where possible.

## Suggested "Must Pass" Starter Gate

Before claiming "starter is ready", CI/docs should require:

- Demo login passes on web + iOS dev client
- Todo insert/update/delete passes on iOS
- Zero push requests include auth on native
- Docs command examples copy-paste cleanly in zsh on macOS

## Closing

I expected to be working on application requirements by now. Instead, I had to repeatedly debug core starter wiring. This feedback is direct because the experience was expensive. The project has good technical foundations, but onboarding/documentation and guardrails currently fail the promise of an "easy starter."
