import crypto from "crypto";
import { getAdminAuthConfig, getCookieOptions } from "../config/adminAuth.js";

const cookieName = "admin_session";

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
  if (options.domain) {
    parts.push(`Domain=${options.domain}`);
  }

  return parts.join("; ");
}

function createSessionSignature(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function encodeSession(email, expiresAt, secret) {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      expiresAt,
    }),
  ).toString("base64url");
  const signature = createSessionSignature(payload, secret);
  return `${payload}.${signature}`;
}

function decodeSession(token, secret) {
  if (!token || !token.includes(".")) {
    return null;
  }

  const [payload, signature] = token.split(".");
  const expectedSignature = createSessionSignature(payload, secret);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (!session?.email || !session?.expiresAt) {
      return null;
    }

    if (Number(session.expiresAt) <= Date.now()) {
      return null;
    }

    return {
      sessionId: token,
      email: String(session.email),
      expiresAt: Number(session.expiresAt),
    };
  } catch {
    return null;
  }
}

export function createAdminSession(email) {
  const { sessionSecret, sessionTtlMs } = getAdminAuthConfig();

  if (!sessionSecret) {
    throw new Error("Missing ADMIN_SESSION_SECRET. Set it before starting the API.");
  }

  const expiresAt = Date.now() + sessionTtlMs;
  const sessionId = encodeSession(email, expiresAt, sessionSecret);

  return {
    sessionId,
    expiresAt,
  };
}

export function readAdminSession(request) {
  const { sessionSecret } = getAdminAuthConfig();

  if (!sessionSecret) {
    return null;
  }

  const cookies = parseCookies(request.headers.cookie);
  const sessionToken = cookies[cookieName];

  if (!sessionToken) {
    return null;
  }

  return decodeSession(sessionToken, sessionSecret);
}

export function clearAdminSession() {
  return;
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
