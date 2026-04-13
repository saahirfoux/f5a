import { getJWTRequestCookie } from './getJWTRequestCookie'
import { InvalidTokenError, validateToken } from './validateToken'

import type { JWTPayload } from '../types'
import type { AuthData } from 'on-zero'

export async function validateAuthHeader(req: Request) {
  const payload = await getAuthHeader(req)
  if (!payload) {
    throw new NotAuthenticatedError(`Not authenticated: no authorization header`)
  }
  return payload
}

export class NotAuthenticatedError extends Error {}

export async function getAuthHeader(req: Request) {
  // try authorization header first (token-based auth)
  const authHeader = req.headers.get('authorization')
  let token = authHeader?.replace('Bearer ', '')
  let source = token ? 'header' : null

  // fall back to cookie (zero forwards cookies when ZERO_MUTATE_FORWARD_COOKIES is set)
  if (!token) {
    token = getJWTRequestCookie(req) ?? undefined
    source = token ? 'cookie' : null
  }

  // Diagnostic logging for native auth propagation issues.
  // Intentionally logs only presence and token shape, never full token value.
  console.info(`[auth] token diagnostics`, {
    hasAuthorizationHeader: Boolean(authHeader),
    hasJwtCookie: Boolean(getJWTRequestCookie(req)),
    tokenSource: source,
    tokenLength: token?.length ?? 0,
    tokenPrefix: token ? token.slice(0, 12) : null,
    requestPath: new URL(req.url).pathname,
  })

  try {
    const result = token ? ((await validateToken(token)) as unknown as JWTPayload) : null
    const userId = result?.id || result?.sub
    console.info(`[auth] token parsed`, {
      tokenSource: source,
      authId: userId ?? null,
      requestPath: new URL(req.url).pathname,
    })
    return result
  } catch (err) {
    console.error(`[auth] validateToken error:`, err)
    if (err instanceof InvalidTokenError) {
      return null
    }
    throw err
  }
}

export async function getAuthDataFromRequest(request: Request): Promise<AuthData | null> {
  const auth = await getAuthHeader(request)
  // use sub as fallback for id (standard JWT uses sub for subject/user id)
  const userId = auth?.id || auth?.sub

  return auth && userId
    ? {
        email: auth.email,
        id: userId,
        role: auth.role === 'admin' ? 'admin' : undefined,
      }
    : null
}
