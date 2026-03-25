import { Router } from "express";
import { getAdminAuthConfig, verifyPassword } from "../config/adminAuth.js";
import {
  attachAdminSessionCookie,
  clearAdminSession,
  createAdminSession,
  expireAdminSessionCookie,
  readAdminSession,
} from "../lib/adminSessionStore.js";

const router = Router();

const loginAttemptStore = new Map();
const maxAttempts = 5;
const windowMs = 1000 * 60 * 2;

function getClientIp(request) {
  const forwardedFor = request.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.ip || request.socket.remoteAddress || "unknown";
}

function getRateLimitState(ipAddress) {
  const now = Date.now();
  const currentEntry = loginAttemptStore.get(ipAddress);

  if (!currentEntry || currentEntry.expiresAt <= now) {
    const nextEntry = {
      count: 0,
      expiresAt: now + windowMs,
    };
    loginAttemptStore.set(ipAddress, nextEntry);
    return nextEntry;
  }

  return currentEntry;
}

router.get("/me", (request, response) => {
  const session = readAdminSession(request);

  if (!session) {
    response.status(401).json({
      authenticated: false,
      adminEmail: null,
    });
    return;
  }

  response.json({
    authenticated: true,
    adminEmail: session.email,
  });
});

router.post("/login", (request, response) => {
  const { email = "", password = "" } = request.body || {};
  const clientIp = getClientIp(request);
  const rateLimitState = getRateLimitState(clientIp);

  if (rateLimitState.count >= maxAttempts) {
    response.status(429).json({
      message: "Too many failed login attempts. Please try again later.",
    });
    return;
  }

  const config = getAdminAuthConfig();
  const normalizedEmail = String(email).trim().toLowerCase();
  const matchesEmail =
    normalizedEmail &&
    config.email &&
    normalizedEmail === config.email.trim().toLowerCase();
  const matchesPassword = verifyPassword(String(password), config.passwordHash);

  if (!matchesEmail || !matchesPassword) {
    rateLimitState.count += 1;
    response.status(401).json({
      message: "Invalid admin credentials. Please try again.",
    });
    return;
  }

  loginAttemptStore.delete(clientIp);

  const session = createAdminSession(config.email);
  attachAdminSessionCookie(response, session.sessionId);

  response.json({
    authenticated: true,
    adminEmail: config.email,
  });
});

router.post("/logout", (request, response) => {
  clearAdminSession(request);
  expireAdminSessionCookie(response);

  response.json({
    authenticated: false,
  });
});

export default router;
