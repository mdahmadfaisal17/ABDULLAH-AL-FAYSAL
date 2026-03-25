import crypto from "crypto";
import { getAdminAuthConfig, getCookieOptions } from "../config/adminAuth.js";

const sessionStore = new Map();
const cookieName = "admin_session";

function pruneExpiredSessions() {
  const now = Date.now();

  for (const [sessionId, session] of sessionStore.entries()) {
    if (session.expiresAt <= now) {
      sessionStore.delete(sessionId);
    }
  }
}

function parseCookies(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separatorIndex = part.indexOf("=");

      if (separatorIndex === -1) {
        return cookies;
      }

      const key = decodeURIComponent(part.slice(0, separatorIndex).trim());
      const value = decodeURIComponent(part.slice(separatorIndex + 1).trim());
      cookies[key] = value;
      return cookies;
    }, {});
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${Math.floor(options.maxAge / 1000)}`);
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }
  if (options.secure) {
    parts.push("Secure");
  }
  if (options.path) {
    parts.push(`Path=${options.path}`);
  }

  return parts.join("; ");
}

export function createAdminSession(email) {
  pruneExpiredSessions();

  const { sessionTtlMs } = getAdminAuthConfig();
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + sessionTtlMs;

  sessionStore.set(sessionId, {
    email,
    expiresAt,
  });

  return {
    sessionId,
    expiresAt,
  };
}

export function readAdminSession(request) {
  pruneExpiredSessions();

  const cookies = parseCookies(request.headers.cookie);
  const sessionId = cookies[cookieName];

  if (!sessionId) {
    return null;
  }

  const session = sessionStore.get(sessionId);

  if (!session) {
    return null;
  }

  if (session.expiresAt <= Date.now()) {
    sessionStore.delete(sessionId);
    return null;
  }

  return {
    sessionId,
    ...session,
  };
}

export function clearAdminSession(request) {
  const session = readAdminSession(request);

  if (session) {
    sessionStore.delete(session.sessionId);
  }
}

export function attachAdminSessionCookie(response, sessionId) {
  const { sessionTtlMs } = getAdminAuthConfig();
  response.setHeader(
    "Set-Cookie",
    serializeCookie(cookieName, sessionId, {
      ...getCookieOptions(),
      maxAge: sessionTtlMs,
    }),
  );
}

export function expireAdminSessionCookie(response) {
  response.setHeader(
    "Set-Cookie",
    serializeCookie(cookieName, "", {
      ...getCookieOptions(),
      maxAge: 0,
    }),
  );
}
