# FistOfFive Multi-App Deployment and Auth Guide

This guide is the shared source of truth for deploying and operating the three app surfaces:

- `fistoffive.co` (marketing / web shell, currently this repo `f5m`)
- `app.fistoffive.co` (Expo web + native codebase `f5a`)
- `api.fistoffive.co` (Python backend codebase `f5b`)

It is also copied to the roots of `f5a` and `f5b` so each codebase keeps the same architecture context.

---

## 1) Direct answers to your current Supabase + Google setup

### Confirm Email: keep it enabled

- Keep **Confirm Email = ON** in Supabase.
- It does **not** block Google OAuth users in the same way it affects email/password flows.
- Google users come with a verified identity from the provider.

### Supabase callback URL you shared

- `https://diurtulxgvbpmoffpufb.supabase.co/auth/v1/callback` is expected and correct in **Google Cloud Authorized redirect URIs**.
- Keep this URI there.

### Redirect URLs in Supabase Auth URL configuration

You should populate redirect URLs now, even before final production domain:

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/login` (optional convenience)
- your Vercel preview callback(s) once available
- later:
  - `https://fistoffive.co/auth/callback`
  - `https://app.fistoffive.co/auth/callback` (if app host handles OAuth callback directly)

### Site URL in Supabase

For local development now:

- `Site URL = http://localhost:3000`

Later in production, set to your canonical landing host (recommend `https://fistoffive.co` or `https://www.fistoffive.co`, choose one and stay consistent).

### Google Cloud Authorized JavaScript origins

For now:

- `http://localhost:3000`

Later add:

- `https://fistoffive.co`
- `https://app.fistoffive.co`

Note: the Supabase project URL is generally not needed as a JavaScript origin for your web app runtime.

---

## 2) Required auth architecture (hybrid one-tap + fallback)

### Goal behavior

1. User logs in at `fistoffive.co` with Google one-tap (or fallback OAuth popup/redirect).
2. User arrives at `app.fistoffive.co` and is already authenticated.
3. `app.fistoffive.co` calls `api.fistoffive.co` successfully as that user.
4. Logout from `fistoffive.co` or `app.fistoffive.co` invalidates all web sessions and API access.

### Core implementation rules

- Use Supabase SSR/cookie auth for web.
- Use parent-domain cookie scope in production: `Domain=.fistoffive.co`, `Path=/`, `Secure`, `SameSite=Lax` (this repo uses `AUTH_COOKIE_DOMAIN=fistoffive.co`).
- Keep API validation based on Supabase JWT/session checks.
- For browser calls, support either:
  - cookie credentials (`credentials: include`), or
  - bearer token (`Authorization: Bearer ...`) as needed.

---

## 3) Can Vercel do everything?

Short answer: **not ideally for all three surfaces**.

- Vercel is excellent for `fistoffive.co` (Next.js).
- Vercel can host Expo web static output, but Expo native distribution still uses EAS build/update pipelines.
- Vercel can run Python serverless functions, but for a stateful/scalable API with predictable networking/background behavior, a dedicated backend host is usually better.

Recommendation:

- Use Vercel for `fistoffive.co`.
- Use either Vercel static hosting or Expo hosting path for `app.fistoffive.co`.
- Use a dedicated backend platform for `api.fistoffive.co` (Railway/Render/Fly/Cloud Run/etc).

---

## 4) DNS and domain setup with GoDaddy

Yes, this works with one GoDaddy domain, even when services are on different hosts.

- Keep DNS managed in GoDaddy (or move DNS to Cloudflare later if desired).
- Point each hostname to the platform that serves it.

Typical records:

- `fistoffive.co` -> Vercel apex target (`A` record per Vercel docs, often `76.76.21.21`)
- `www.fistoffive.co` -> Vercel CNAME target (`cname.vercel-dns.com`)
- `app.fistoffive.co` -> hosting target for Expo web (platform-specific CNAME)
- `api.fistoffive.co` -> backend host target (platform-specific CNAME/A)

You do not need to host all services on Vercel to manage subdomains on the same domain.

---

## 5) Expo app (`f5a`) deployment plan

Important distinction:

- **Expo Go** is a dev client, not your production web host.

### Web (`app.fistoffive.co`)

Recommended approach:

1. Build/export Expo web from `f5a`.
2. Deploy static web bundle to a host with custom domain support.
3. Point `app.fistoffive.co` DNS to that host.

Good options:

- Vercel (simple if you want unified DX)
- Cloudflare Pages
- Netlify
- Expo-hosted web path if/when it matches your custom-domain needs

### Native iOS/Android

1. Use EAS Build for binaries.
2. Use EAS Submit for store delivery.
3. Use EAS Update for OTA updates.
4. Keep auth contract aligned with web/API (same Supabase project/users).

---

## 6) Python API (`f5b`) hosting options

Below is a practical ranking for a small-to-mid MVP. Costs are rough estimates and vary by traffic/region/runtime.

## Hosting options sorted by estimated price then developer friendliness

1. **Railway** (often easiest)
   - Cost: low entry, usage-based (roughly starts near single-digit USD/month for light usage)
   - DX: very friendly, quick Docker/Python deploys, easy env vars
   - Best for: fastest path to production

2. **Render**
   - Cost: low entry plans, predictable starter tiers
   - DX: friendly for web services, background workers, cron
   - Best for: stable managed setup with simple scaling controls

3. **Fly.io**
   - Cost: low-to-mid for small instances, can be very cost-efficient
   - DX: moderate learning curve, strong global story
   - Best for: region-aware API deployment

4. **DigitalOcean App Platform**
   - Cost: low-to-mid (starter plans around low double digits at scale)
   - DX: straightforward managed platform
   - Best for: simple managed deploys with predictable billing

5. **Google Cloud Run**
   - Cost: can be very low at small scale; pay-per-use
   - DX: moderate complexity
   - Best for: elastic containerized API with Google ecosystem

6. **AWS App Runner / ECS Fargate**
   - Cost: typically higher operational overhead/cost floor for small teams
   - DX: more complex
   - Best for: AWS-native orgs and advanced infra controls

7. **Azure Container Apps**
   - Cost: comparable cloud-native pay-per-use patterns
   - DX: moderate-to-advanced
   - Best for: Azure-centric teams

### Recommendation for this project

- Start with **Railway** or **Render** for `api.fistoffive.co`.
- Re-evaluate after real traffic and workload patterns.

---

## 7) Cross-subdomain auth checklist (must pass)

### Supabase dashboard

- [ ] Google provider enabled
- [ ] Site URL set appropriately for current environment
- [ ] Redirect URLs include local + preview + production callback URLs

### Google Cloud OAuth

- [ ] Authorized JavaScript origins include active frontend hosts
- [ ] Authorized redirect URI includes Supabase callback URL

### Cookie/session policy (production)

- [ ] Parent domain cookie strategy enabled for web (`.fistoffive.co`)
- [ ] Secure + SameSite + Path settings correct
- [ ] Logout clears cookies with same domain/path attributes

### API integration

- [ ] `api.fistoffive.co` CORS allows explicit frontend origins
- [ ] If using cookies: `Access-Control-Allow-Credentials: true`
- [ ] API validates Supabase JWT/session on every protected endpoint

---

## 8) Rollout sequence

1. Finalize canonical hostnames (`fistoffive.co` vs `www.fistoffive.co`).
2. Implement hybrid one-tap in `f5m`:
   - Google one-tap first
   - fallback OAuth popup/redirect
3. Activate shared cookie/session behavior for subdomains.
4. Stand up `api.fistoffive.co` in chosen Python host.
5. Point `app.fistoffive.co` to Expo web hosting target.
6. Verify login, cross-host continuity, API auth, and global logout.

---

## 9) Security note

Your current `.env` contains sensitive credentials. Rotate exposed secrets if they were ever committed or shared:

- Google client secret
- Supabase service role key
- DB password and other private keys

Do not include secrets in committed docs or screenshots.

