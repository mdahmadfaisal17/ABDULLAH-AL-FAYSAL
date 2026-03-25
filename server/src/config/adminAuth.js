import crypto from "crypto";

const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const scryptKeyLength = 64;

export function getAdminAuthConfig() {
  return {
    email: process.env.ADMIN_LOGIN_EMAIL || "",
    passwordHash: process.env.ADMIN_LOGIN_PASSWORD_HASH || "",
    sessionSecret: process.env.ADMIN_SESSION_SECRET || "",
    sessionTtlMs: Number(process.env.ADMIN_SESSION_TTL_MS) || DEFAULT_SESSION_TTL_MS,
  };
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const derivedKey = crypto.scryptSync(password, salt, scryptKeyLength).toString("hex");
  return `${salt}:${derivedKey}`;
}

export function verifyPassword(password, storedHash) {
  if (!password || !storedHash || !storedHash.includes(":")) {
    return false;
  }

  const [salt, expectedHash] = storedHash.split(":");
  const actualHash = crypto.scryptSync(password, salt, scryptKeyLength);
  const expectedBuffer = Buffer.from(expectedHash, "hex");

  if (actualHash.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(actualHash, expectedBuffer);
}

export function getCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    domain: process.env.ADMIN_SESSION_COOKIE_DOMAIN || undefined,
  };
}
