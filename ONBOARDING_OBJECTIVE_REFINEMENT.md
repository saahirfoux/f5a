---
title: Host first-impression and onboarding objectives
description: Product specification for the FOV mobile host experience—first seconds, shell behavior, onboarding, and related UX notes.
status: working draft
source_plan: .cursor/plans/onboarding_objective_refinement_5e71bc32.plan.md (Cursor; export date aligns with repo)
---

# Host first-impression objectives (updated with your answers)

## Host first-seconds spec (working draft)

**Primary job:** Action, not marketing. In the first moments, a host should feel: *I can go live now; one clear control gets me the QR code and shareable link so I can drop it into Slack, text, or email.* The emotional beat is **speed** (“under N taps”: start live → share live), not enterprise trust messaging.

**Non-negotiable in-session:** The **tally and per-person results** must stay visible and scannable—analogous to seeing raised hands in a room. Fancy hero chrome must never bury that. Future chart/table/dot views are optional; the spec is “see who voted what, fast.”

**Audience split:** **Mobile app skews host** (signed in; may return many times per day). **Guests** lean on **App Clip** (lightweight) or **web** via link; sign-in optional unless the host requires auth. **No “enter session code”**—join is **QR or invite link** only, with OS/resolver behavior sending people to web or app as appropriate (universal / app links are implementation detail).

**Auth:** Host’s first committed action is **sign in**; **Continue as guest** for hosting stays behind a **feature flag** (on for now), with skepticism that guest hosting is long-term.

**After first-run onboarding:** You previously said **dashboard**; combined with the shell decision below, treat **dashboard** as **app home** (sessions list, settings, etc.) that is **reachable without being the primary focal point** when there is no active session—**Go live** stays dominant unless **resume** applies.

**Onboarding:** **2–3 slides max**; per-slide single-idea copy still TBD (see homepage alignment below).

**Returning host (resolved):** If a session is **active**, surface **resume/continue** first. Otherwise the **first screen leads with a dominant “Go live”**; **dashboard/history** is **secondary** (e.g. another tab or behind navigation). This combines fast path to live with your “don’t lose the meeting” case.

**“Already started” poll (resolved):** **Metaphor only for v1**—session is created on the action you define; copy/layout convey instant readiness without implying a fake backend state unless you add one later.

**Hero / reference UI:** The mock is **disposable**—layout inspiration only (friendly faces + upper fill, **dark bottom card** as micro-onboarding + primary button). **Canonical promises stay your f5m docs**, not the mock’s headline. **Motion:** delight-first; you’re open to **static** for v1; **reduced motion → static hero** is reasonable.

**Success metric:** **Time-to-first-session.** First A/B test: **hero static vs motion.**

**Clarifications embedded in this doc:** (1) What “hero shows voting UI” meant. (2) What “participant on slide 1” meant. (3) Why “boring v1” was asked. (4) **Host intent** vs your new direction.

---

## Alignment with [fistoffive.co](https://fistoffive.co) (homepage copy)

Useful anchors for slide copy and banned/allowed tone:

- Tagline space: **“Vote together. See the spread. Talk about what matters.”**
- Speed: **“Go live in seconds. For free.”**
- Social proof angles already on site: **Sprint-sized / Daily confidence**, **Company-wide / All-hands ready**, **Hall-scale / Big rooms, clear signal**
- Guest path: **QR → lightweight session on phone, no app download** (matches App Clip story)

Slides can inherit **one claim each** from these buckets (speed, spread/visibility, room scale) without inventing new positioning.

---

## Your answers by section (archive)

### A — Job of first screen

- **3-second belief:** Excited surprise: poll is effectively ready; one button to QR + link; fast; share anywhere.
- **Mode:** **Action** (start/create immediately).
- **Default user:** Hosts on mobile app; guests via App Clip / web; host logged in; guest auth optional unless required by session.
- **Never bury:** **Vote tally / who voted what** (the “raised hands” outcome for the Scrum Master).

### B — Reference mock and hero

- **Canonical copy:** **Docs, not the reference screenshot.**
- **Clarification (question 2):** “Show a voting UI” meant: should the **first screen literally depict fists 1–5** (or a preview of the vote strip)? You’re solving **empty space + single button** with a **friendly illustrated hero** (Memoji-like *style*, not necessarily literal fists on splash). That’s a valid pattern: **decorative hero + dark CTA zone**; optional later to add a **small** fist strip preview if it helps comprehension without clutter.
- **Speed vs trust:** **Speed** (minimal taps to live + share).
- **“Participant on slide 1” (question 4):** That referred only to **onboarding carousel** (whether slide 1 talks to guests). It did **not** mean mixing host and guest in one surface outside the live session. Your answer stands: intermingling is **in the session** (host sees live vote “reactions”); marketing slides can stay host-first.

### C — Conversion and routing

- **First action (host):** **Sign in**; guest host path flagged.
- **Join:** QR + link only; web vs app resolution by environment; no manual code entry.
- **Host intent:** You want the **host-intent concept dropped** from product thinking. **Note:** f5m still documents `host_intent` in OAuth ([host_intent_signup_signin_readme.md](../f5m/documentation/implementation/host_intent_signup_signin_readme.md)). When you implement auth, either **archive those docs** and replace with “unified sign-in + role from account/session” or update to match the new model—avoid silent drift.
- **Post-onboarding:** **Dashboard.**

### D — Slides and copy

- **Count:** 2–3 slides.
- **Per-slide idea / banned words / proof:** TBD; use homepage lines above as raw material.

### F — Motion

- **Why motion / bubbles:** Uncertain; **maybe static**.
- **Bubbles:** **Delight only**, not literal chat metaphor.
- **Perf:** Not a priority concern for you now.
- **Reduced motion:** **Perhaps** respect → static hero.

### G — Scope

- **Cold vs returning:** Unclear; secondary priority vs **instant start** for hosts who want it.
- **v1 hero out of scope:** Defer detailed cuts to v2.
- **“Boring v1” explained:** The question was whether **polish** (animated Memoji-like hero) should **block shipping** core flows. Your stance—**solid UX + functionality**—is consistent with shipping a **simple** hero first and upgrading visuals later; “boring” meant **visually plain**, not **bad UX**.

### H — Metrics

- **Primary:** **Time-to-first-session.**
- **First A/B:** **Static vs motion hero.**

---

## Live session “reactions” (YouTube-lite, no video)

You described: emoticons moving horizontally from the bottom, ephemeral per vote/change, powered by **Ably** (or similar) for realtime.

**Expo-friendly building blocks (conceptual, not a mandate):**

- **react-native-reanimated** for position/opacity loops and staggered “float up and fade” particles.
- **@shopify/react-native-skia** if you want many layered glyphs with good performance.
- **Lottie** for pre-authored bursts if you prefer designer-driven motion over code-driven particles.

There isn’t one “Twitch chat overlay kit” that drops in fully; it’s usually **Reanimated + layout** + your **event stream** from Ably. Tamagui is layout/styling; the effect is custom or small wrapper components.

**Join routing (QR vs app vs web):** Yes, this is **standard** in principle: **Universal Links (iOS)** / **Android App Links**, plus **fallback URL** to web. Exact behavior depends on install state, OS, and whether App Clip is invoked; worth a dedicated implementation checklist later.

---

## Decisions resolved (AskQuestion)

1. **Returning host:** **Smart resume** when a session is active; otherwise **dominant “Go live”** with dashboard/history secondary—not “dashboard as the only home after every open.”
2. **“Already started”:** **Metaphor-only for v1** (honest creation on tap; UX feels instant).

---

## Open items (from planning session)

- **f5m documentation:** When implementing unified auth in f5m, **archive or rewrite** `host_intent_*` docs if the OAuth model no longer uses host intent ([host_intent_oauth_decision.md](../f5m/documentation/implementation/host_intent_oauth_decision.md), [host_intent_signup_signin_readme.md](../f5m/documentation/implementation/host_intent_signup_signin_readme.md)).

---

## Related files

| Resource | Path |
|----------|------|
| Original onboarding-image goal note | [notes-onboarding-image/goal-and-why-we-are-talking-about-this-onboarding-image.md](notes-onboarding-image/goal-and-why-we-are-talking-about-this-onboarding-image.md) |
| f5m feature breakdown | [../f5m/documentation/implementation/feature_breakdown_projects.md](../f5m/documentation/implementation/feature_breakdown_projects.md) |
| f5m host intent (may be obsolete) | [../f5m/documentation/implementation/host_intent_signup_signin_readme.md](../f5m/documentation/implementation/host_intent_signup_signin_readme.md) |
