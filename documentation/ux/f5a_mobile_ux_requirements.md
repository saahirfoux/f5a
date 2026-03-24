# Fist of Five — Expo mobile UX requirements (`f5a`)

Human-readable specification for designers and engineers. Covers product intent for the **Expo** app (iOS, Android, web), **post-login** behavior, **App Clip** / lightweight join, **realtime** UX, **RBAC** and **subscription** gating, and industry-standard UX expectations.

**Related platform docs** (authoritative contracts): see the `f5m` repo — `documentation/implementation/canonical_contract_pack.md` and v4 foundational specs under `documentation/foundational/` (relative to your monorepo or sibling checkout).

---

## 1. Audience, scope, platforms

| | |
| --- | --- |
| **Audience** | Product, design, mobile engineering |
| **Codebase** | `f5a` — Expo (React Native + web export to `app.fistoffive.co`) |
| **Platforms** | **iOS**, **Android**, **Expo web** (same codebase; responsive/layout may differ) |
| **Out of scope for this doc** | Marketing site (`f5m`), API implementation (`f5b`), exact visual brand tokens (use placeholders until brand doc exists) |

**v1 intent:** Real-time **fist-of-five** (values **1–5**) voting in **sessions** with **topics**, **roles**, **invites**, REST + realtime transport (Socket.IO and/or Ably per stack). API field names remain **snake_case** end-to-end.

---

## 2. Design principles

1. **Clarity over density** — In-session UI prioritizes **current topic** and **vote**; secondary actions live in overflow or host panels.
2. **Server-authoritative** — UI reflects **`sessions.status`** and server rules; never imply the user can vote when the server would reject it.
3. **Predictable gating** — If an action is blocked, show **why** (role, subscription, or session state)—never a silent disabled control without explanation.
4. **Fast perceived realtime** — Topic changes, session end, and vote-ability changes should feel **immediate** (websocket/Ably), not poll-based.
5. **Accessibility (WCAG 2.2–oriented)** — Sufficient **contrast**; **touch targets ≥ 44×44 pt** (iOS HIG) / **48×48 dp** (Material); support **Dynamic Type** / system font scaling; respect **Reduce Motion** (avoid essential information only in motion).
6. **Inclusive feedback** — Pair color with **icon/text**; ensure **VoiceOver** / **TalkBack** labels on vote controls and alerts.

---

## 3. Information architecture

### 3.1 Post-login shell (home)

- **Primary CTAs:** **Join a session** | **Create session** (or **Start a session**).
- **Profile / account entry:** Compact “signed in as …” → opens **menu**.

### 3.2 Session routes (conceptual)

- **Participant:** `/session/<session_id>` (or native equivalent).
- **Host:** `/host/<session_id>` — preserves context on refresh (v4); host **explicitly enters** realtime room (“Enter session”).

### 3.3 Menu (from shell)

| Surface | Typical visibility |
| --- | --- |
| **Invites** | Managers+ (and subscription allowing seats)—see RBAC matrix |
| **Role management** | Managers+ |
| **Subscription / billing** | **ADMIN** only; others hidden or “Contact your admin” |
| **Settings** | Logout, notifications (if any), legal |
| **Analytics / reporting** | Reporter / Super Admin as product allows—often secondary on phone |

---

## 4. Critical flows

### 4.1 Join a session

1. **QR (camera)** — “Join” opens **camera**; scan encodes **HTTPS URL** (same as universal link / App Clip invocation where applicable).
2. **Deep link** — Universal / app links open **session** route; apply **scheduled / ended** gating immediately.
3. **App Clip (iOS)** — Invocation lands **directly in session** with **vote-first** UI; same gating as full app (see §5).

### 4.2 Create session (host)

1. **Default: ad-hoc** — Minimal taps to create; **no mandatory** long wizard before the session exists.
2. **Post-create / in-session config** — Schedule, `require_name`, `require_auth`, duration, etc., via settings or host overflow when permitted.
3. **After create** — Show **join URL**; **share sheet** + **QR** for participants.
4. **v4 host rule** — Host is **not** auto-in realtime room; **Enter session** required before **`state_sync`**.

### 4.3 Vote

- **1–5** control; **idempotent** server behavior per `(session_id, participant_id, topic_id)`.
- Reflect **`vote_updated`** (and local optimistic rules only if they reconcile with server).

### 4.4 Logout

- Client: global Supabase sign-out; optional API logout per [authPrompt.md](../../authPrompt.md).
- Clear UI auth state; protected routes return to login.

---

## 5. App Clip appendix (iOS)

### 5.1 Invocation and URLs

- Register **App Clip Experience** in App Store Connect; URL is **HTTPS** on a controlled host.
- **Associated Domains:** `applinks:` + **`appclips:`** aligned with chosen host (e.g. `app.fistoffive.co` or dedicated clip host—document one strategy).
- **QR** encodes the **same HTTPS** join URL so one code serves Clip + full app users.

### 5.2 Scope (what ships in the Clip)

**In scope (default):** Single-session **participant** — current topic, vote **1–5**, minimal chrome, realtime for `state_sync`, votes, topic/lifecycle alerts.

**Defer to full app:** Create session, invites, role management, subscription, multi-session browsing, Super Admin analytics, **host takeover** (unless you explicitly add a read-only host mode).

### 5.3 Identity matrix

| Session flags | Clip behavior |
| --- | --- |
| `require_auth = false`, `require_name = false` | Anonymous participant; `user_id` null per schema v4 |
| `require_name = true` | Prompt **display_name** before or on join |
| `require_auth = true` | **Sign in with Apple** / OAuth in Clip, **or** single CTA **Open full app to sign in** with `session_id` (+ join token) preserved—pick **one primary path** per product decision |

### 5.4 Realtime and lifecycle in Clip

- Same event semantics as full app; on resume after background: **reconnect**, **`state_sync`**, **disconnected** banner + **Retry**.

### 5.5 Handoff to full app

- Non-blocking **“Get the full app”** CTA; use **SKOverlay** (or equivalent) when offering install—**do not** block voting behind install.
- Deep link preserves **`session_id`**; define **participant continuity** (merge vs new participant) with server idempotency rules.

### 5.6 Engineering notes

- App Clip requires native target, entitlements, size budget (~15 MB—verify current Apple docs); **Expo prebuild** + config plugin or Xcode.
- **TestFlight** + physical **QR** + cold-start latency required for QA.

### 5.7 Android

- No App Clip; **App Links** + **QR** + optional Play Instant; same **UX requirements** for gating and alerts.

---

## 6. Realtime UX matrix

Map server → client events (see canonical contract pack) to UI patterns. **Priority: high** = user must notice before acting; **medium** = contextual; **low** = optional batching.

| Event / condition | Suggested UI | Priority | A11y |
| --- | --- | --- | --- |
| `state_sync` after join | Set baseline UI silently or one subtle “Connected” | Medium | Announce session ready if blocking cleared |
| `topic_created` / `topic_updated` / `topic_deleted` | **Banner** or **toast** + update topic header; **haptic** light on change | **High** | “Topic changed to …” / “Topic removed” |
| `session_started` / lifecycle → ACTIVE | Enable vote UI; short confirmation | High | “Voting is open” |
| `session_takeover` / `session_control_changed` | **Banner**: control mode changed | High | Read non-technical summary |
| Host joined / left (presence) | **Toast** or inline presence; tie to timeout story | Medium | Optional announcement |
| Ad-hoc host-away / **15m** timeout risk | **Countdown** or escalating warnings | High | Time-sensitive announcement |
| `session_ended` / status ENDED or EXPIRED | Full **Session is over** state; disable vote | **High** | “Session ended” |
| `vote_updated` | Update aggregates / visualization (mode-dependent) | Medium | Optional if not noisy |
| `experience_updated` | Visual transition; respect **Reduce Motion** | Medium | “Display mode changed” |
| `error_event` (e.g. join blocked) | Inline error + explain **scheduled** wait or **over** | High | Read error message |
| Transport disconnect | **Banner** + **Retry** | High | “Reconnecting…” / “Offline” |

---

## 7. Gating and errors

### 7.1 Subscription + RBAC

- Any feature may be gated by **subscription tier**, **role**, or **both**.
- **Create session** — requires `create_session` permission + plan allowing hosting.
- **Invites / roles** — Manager+ (per matrix); may also require seat limits on plan.
- **Billing** — ADMIN only.

**Copy patterns:**

- **Insufficient role:** “You don’t have permission. Ask an account admin or manager.”
- **Plan limit:** “This requires a higher plan.” + CTA to upgrade (ADMIN) or contact admin.
- **Both:** Show both reasons in order: plan first if upgrade fixes, else role.

### 7.2 Loading, empty, retry

- **Loading:** Prefer **skeleton** for shell; **spinner** only for short actions.
- **Empty states:** Explain **what** and **next step** (e.g. “No pending invites”).
- **Network failure:** **Retry** button; preserve user input.
- **401 / session expired:** Single path to re-auth after one refresh attempt (per auth prompt).

---

## 8. Session lifecycle UI

| `sessions.status` | Participant | Host |
| --- | --- | --- |
| CREATED | Rarely shown; clarify if waiting | Prepare session, share link |
| SCHEDULED (pre-ACTIVE) | **Wait** UI + **human-readable start time**; **no vote** | Same rules; host may configure |
| ACTIVE | Vote enabled | Enter room, host controls as permitted |
| ACTIVE_WITH_HOST_CONTROL | Vote enabled | Topic edit per rules |
| ENDED / EXPIRED | **“Session is over”**; vote disabled | Same + wrap-up actions if any |

**Votes accepted only** in **ACTIVE** and **ACTIVE_WITH_HOST_CONTROL** (per canonical pack).

---

## 9. Forms and feedback

- **Inline validation** on display name, invites email, etc.
- **Destructive actions** (end session, remove user): confirm modal with clear consequence.
- **Success** — Brief confirmation for invites sent, role updated; avoid blocking toasts.

---

## 10. Privacy and trust

- **Camera (QR):** Request permission in context (“Scan a code to join”).
- **Clip vs full app:** Minimize PII on Clip surfaces; no secrets in logs/UI.
- **Anonymous voting:** Clear copy when user is not logged in but may still vote (when allowed).

---

## 11. Localization

- Plan for **RTL** layouts on session shell and vote row.
- **Dates/times** for scheduled sessions: locale-aware, timezone clear when ambiguous.
- **Numbers** for any displayed tallies: locale formatting.

---

## 12. References

| Source | Use |
| --- | --- |
| `f5m` — canonical_contract_pack | Roles, REST/socket events, session states, experience modes |
| `f5m` — fist_of_five_acceptance_v4.md, spec_v4.md, socket_v4.md, schema_v4.md | v4 host/participant rules |
| `f5m` — feature_breakdown_projects.md | Slices and DoD alignment |
| `f5a` — authPrompt.md | Auth, `/v1/me`, logout |
| **Apple Human Interface Guidelines** | Navigation, touch targets, App Clips |
| **Material Design 3** (Android) | Components, motion, accessibility |
| **Nielsen heuristics** | Visibility of status, error recovery, consistency |

---

## Document maintenance

Add further **Expo / mobile-only** UX specs under **`f5a/documentation/ux/`** so they stay versioned with the app repo.
