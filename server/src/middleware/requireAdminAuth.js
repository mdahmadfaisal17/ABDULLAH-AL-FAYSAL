import { readAdminSession } from "../lib/adminSessionStore.js";

export function requireAdminAuth(request, response, next) {
  const session = readAdminSession(request);

  if (!session) {
    response.status(401).json({
      message: "Admin authentication is required.",
    });
    return;
  }

  request.adminSession = session;
  next();
}
