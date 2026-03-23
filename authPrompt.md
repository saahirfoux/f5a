# Prompt: Implement Production-Ready Auth in `f5a` (Expo)

Use this prompt with an AI coding assistant inside the `f5a` repository.

---

You are implementing authentication for the Expo app codebase (`f5a`) in the Fist of Five platform.

## Architecture context

- Marketing web: `https://www.fistoffive.co` (and apex redirect)
- Product app web + native: this repo (`f5a`)
- API: `https://api.fistoffive.co` (`f5b`, FastAPI)
- Identity provider: Supabase Auth
- API auth contract: send `Authorization: Bearer <access_token>` to protected endpoints (for example `GET /v1/me`)
- Backend verification mode: strict Supabase JWKS public-key verification (no legacy HS256 fallback)

## Required outcome

Implement a secure, maintainable auth system for Expo web + native that:

1. Signs users in with Supabase.
2. Stores sessions safely per platform:
   - native: secure storage
   - web: browser-safe storage strategy
3. Adds Bearer tokens to protected API requests.
4. Handles token refresh and 401 recovery.
5. Supports app logout and global session clear for the app context (see **Logout** below).
6. Provides a simple auth state model the rest of the app can consume.

## Non-goals

- Do not implement Ably auth/webhooks.
- Do not implement Stripe auth/webhooks.
- Do not implement host-intent split logic.

## Implementation requirements

### 1) Project structure

Create a clean, modular layout similar to:

- `src/auth/client.ts` (Supabase client setup)
- `src/auth/session.ts` (get/set/refresh helpers)
- `src/auth/useAuth.ts` (hook for auth state)
- `src/auth/AuthProvider.tsx` (context/provider)
- `src/network/apiClient.ts` (fetch wrapper with Bearer injection)
- `src/network/endpoints/me.ts` (`/v1/me` typed call)
- `src/screens/auth/*` (login/logout UI)

Follow existing project patterns if they already exist.

### 2) Supabase client

- Use official Supabase JS client for React Native/Expo.
- Keep config from environment variables (no hardcoded secrets):
  - public: Supabase URL and anon key
  - API base URL: `https://api.fistoffive.co` (environment-driven)

### 3) Session persistence

- Native: secure storage-backed session persistence.
- Web: browser storage policy appropriate for Expo web runtime.
- Never store service role or private backend secrets in the app.

### 4) API client behavior

- Attach `Authorization: Bearer <access_token>` to protected calls.
- Assume backend enforces `iss` + `aud` + signature validation from Supabase JWKS and returns 401 on invalid/expired tokens.
- Centralize request logic in one API client wrapper.
- If 401 occurs:
  - try refresh once
  - retry request once
  - if still unauthorized, force sign-out and redirect to login

### 5) Baseline auth UX

- Login screen/button flow.
- Logged-in session bootstrap on app launch.
- Logout action that clears local session and app auth state.
- Minimal protected screen that calls `/v1/me` and renders result.

### Logout (align with `f5m` + `f5b`)

Implement **two layers** on sign-out:

1. **Client:** `await supabase.auth.signOut({ scope: "global" })` so local secure storage / web storage and in-memory auth state clear, matching how `f5m` uses the browser Supabase client after `POST /auth/logout`.
2. **API (optional but recommended):** `POST https://api.fistoffive.co/v1/logout` with header `Authorization: Bearer <access_token>` (the same access JWT used for `/v1/me`). The FastAPI backend verifies the JWT (JWKS) and calls Supabase Auth Admin `sign_out` with the **service role** to revoke refresh sessions. Requires `SUPABASE_SERVICE_ROLE_KEY` on the API host only.

Notes:

- The API cannot clear marketing-site cookies; `f5m` handles that with same-origin `POST /auth/logout`.
- Access JWTs may still verify until `exp`; rely on short TTL + dead refresh after global sign-out.

### 6) Type safety and errors

- Use TypeScript types for auth/session/user payloads.
- Add user-friendly error messages for:
  - login failure
  - expired session
  - network/API failure

### 7) Testing and verification

Add a concise test or manual verification checklist proving:

1. Unauthenticated call to protected endpoint fails.
2. After sign-in, protected call succeeds.
3. After logout, protected call fails again.
4. Token refresh path works when token expires.

## References to follow

- `f5b/documentation/auth-setup/README.md`
- `f5m/documentation/setup/production_tech_stack.md`
- `f5m/documentation/ideas/cross_subdomain_auth.md`
- `f5b/documentation/sub-domain-setup/README.md`

## Coding style constraints

- Keep code modular and avoid a single monolithic auth file.
- Keep platform differences explicit (web vs native).
- Prefer small, composable functions and clear naming.
- Add only comments that clarify non-obvious logic.

Now inspect the current `f5a` repository structure, implement the auth system end-to-end, and summarize exactly what was added and how to run/verify it.
