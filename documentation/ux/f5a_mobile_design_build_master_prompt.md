# Fist of Five — design / codegen master prompt (`f5a`)

Copy the sections below into **Figma AI**, **Replit**, **v0**, **Cursor**, or any other tool. Adjust tone if the tool prefers a single block (use **§ One-shot consolidated prompt** at the end).

**Product:** Fist of Five — real-time group **fist-of-five** voting (values **1–5**) in **sessions** with **topics**, roles, and live updates.

---

## § Portability — paste into tools with no extra context

When you paste this into another platform, assume **the model has zero access** to:

- This repo, monorepo, or workspace (`f5a`, `f5m`, `f5b`, or any path)
- Linked or “mentioned” docs (`f5a_mobile_ux_requirements.md`, canonical contract packs, plans, Notion, etc.)
- Private URLs, env files, design systems, or brand assets unless **you paste them in the same message**

**Instructions for the receiving AI:** Treat **only the text the user pastes** (this prompt) as source of truth. **Do not** ask the user to upload unspecified files or assume you can open links. If something is ambiguous, **state reasonable assumptions** and proceed. If the user later pastes extra constraints (colors, copy, API shapes), merge them.

When pasting, you can prepend one line: *“No repo or external docs available—follow the prompt only.”*

---

## § Preamble (paste first)

You are a senior product designer and React Native engineer helping build **Fist of Five**, a mobile-first (Expo) app for **live session voting**.

You have **no access** to the project codebase or external documentation unless the user pasted it in this chat. Rely **only** on the requirements below.

**Goal:** Produce UI (Figma) or UI code (Expo / TypeScript) that is **accessible**, **clear under stress** (meetings, classrooms), and **aligned with server-driven session state**—never show voting enabled when the session is scheduled, ended, or expired.

**Stack:** Expo (React Native + web), **Supabase Auth**, API at `https://api.fistoffive.co` with **`Authorization: Bearer <access_token>`** on protected routes, realtime via **Ably or Socket.IO** (same event names as product spec). API payloads use **snake_case** field names everywhere.

**Non-goals:** Do not invent secrets; do not hardcode API keys; do not assume Ably vs Socket.IO—abstract as “realtime client.”

---

## § Product summary

1. **After login**, the **home shell** shows two primary actions: **Join a session** and **Create session** (Start session).
2. **Join paths:** (a) **Camera QR scan** → resolves HTTPS session URL, (b) **deep link / universal link**, (c) **iOS App Clip** — lands **directly in session** with **vote-first** minimal UI; same session gating as full app.
3. **Create path:** **Ad-hoc session by default**; scheduling and options (`require_name`, `require_auth`, duration) appear **after create** or **in-session**, not as a blocking wizard.
4. **Host (v4):** After creating a session, host must tap **Enter session** to join the realtime room; URL shape preserves **`/host/<session_id>`** for refresh.
5. **Menu:** Invites, role management (managers+), **subscription/billing** screen **ADMIN-only**; other roles see hidden entry or “Contact your admin.”
6. **Gating:** Features may require **subscription tier**, **role**, or **both**—show **why** when disabled (upgrade vs permission).
7. **Realtime UX:** Toasts/banners for **topic added/changed/removed**, **host join/leave**, **session takeover**, **timeout warnings**, **session over**, **mode/experience** changes—fast, non-blocking, accessible strings.

---

## § Technical constraints (for code generators)

- **Framework:** Expo, TypeScript, functional components.
- **Auth:** Supabase; native **secure storage** for session; attach **Bearer** token to API client; on **401**: refresh once, retry once, then sign out + login.
- **Data:** Use **snake_case** when typing API DTOs to match backend.
- **Session states:** `CREATED`, `SCHEDULED`, `ACTIVE`, `ACTIVE_WITH_HOST_CONTROL`, `ENDED`, `EXPIRED` — UI must match (e.g. scheduled pre-start: show start time, **no vote**).
- **Participant:** May be **anonymous** (`user_id` null) when session allows.
- **Accessibility:** `accessibilityLabel` / roles on all tappable vote buttons; support large text; respect **reduce motion** for non-essential animation.

---

## § Screen list (generate frames or routes)

1. **Auth** — Login, loading, error.
2. **Home shell** — Join | Create CTAs, profile chip → menu.
3. **QR scanner** — Camera permission rationale; cancel back to home.
4. **Session participant** — Topic header, vote 1–5, connection banner, “session over” / scheduled wait states.
5. **Session host** — Share link + QR, **Enter session**, host controls (overflow), in-session settings (schedule, flags).
6. **App Clip compact** — Participant session only; “Get full app” CTA; optional sign-in for `require_auth`.
7. **Menu drawer / stack** — Invites, team & roles, subscription (admin), settings, logout.
8. **Invites** — List, send invite, pending states.
9. **Role management** — List members, change role, disable (per permissions).
10. **Subscription (ADMIN)** — Plan, usage, upgrade CTA.
11. **Settings** — Notifications placeholder, legal, version.

---

## § Component inventory

- **VoteControl:** Five large tappable targets (1–5), selected state, disabled when session not votable.
- **TopicHeader:** Current topic text; subtle animation or text transition on change + **accessibility announcement** hook.
- **RealtimeBanner:** Fixed or stacked toasts for lifecycle (takeover, topic change, disconnect + retry).
- **PrimaryCTAPair:** Join (secondary style ok) + Create on home.
- **GatedButton:** Disabled + helper text (“Upgrade required” / “No permission”).
- **SessionStateFullScreen:** Scheduled countdown copy; Session over illustration + dismiss.
- **HostShareCard:** URL copy, share sheet trigger, QR display.

---

## § Visual direction (until brand tokens exist)

- **Professional, calm, trustworthy** — suitable for workplaces and classrooms.
- **Light and dark** system modes.
- **Brand:** Use **semantic tokens** (`--color-primary`, `--color-surface`, `--color-danger`) as placeholders; no fake logo unless provided.
- **Density:** Mobile-first; generous spacing around vote controls.

---

## § Output instructions

### For Figma

- Use **auto-layout**; define **components** with **variants** (default / disabled / loading / error).
- One **flow** per critical path: Home → Join → Session; Home → Create → Host → Enter session.
- Include **annotation** frames for **VoiceOver** strings on vote and alerts.

### For code tools (any codegen / IDE agent)

- Output **TypeScript** + **Expo Router** or **React Navigation** (pick one and note the choice; do not assume a specific IDE).
- **No** env secrets in snippets; use `process.env.EXPO_PUBLIC_*` placeholders only.
- Each interactive element: `accessibilityLabel` and, where needed, `accessibilityHint`.
- Do **not** reference files or packages you cannot see; use standard Expo / React Native patterns only.

---

## § One-shot consolidated prompt (character-limited tools)

```
No repo or external docs—you only have this text. You are designing/building "Fist of Five": Expo app for live 1–5 voting in sessions with topics. After login: home with Join (QR + deep link; iOS App Clip = vote-first) and Create (ad-hoc default; schedule/options after start). Host must "Enter session" after create; paths /host/:id and /session/:id. Menu: invites, roles (managers+), billing (ADMIN only). Gate features by subscription AND role with clear disabled reasons. Realtime: toasts/banners for topic change, host presence, takeover, timeout, session end. Server states SCHEDULED/ACTIVE/ENDED drive UI; snake_case API. Supabase + Bearer JWT. WCAG-oriented: 44pt targets, labels, reduce motion. Deliver: screen list + key components (Figma auto-layout OR Expo TS components with a11y props). No secrets; state assumptions if unclear.
```

---

## Maintenance

In **this** repo, keep this file next to **`f5a_mobile_ux_requirements.md`** under `f5a/documentation/ux/`. Update when flows or stack decisions change. **Recipients of a paste** do not see that path unless you include it.
