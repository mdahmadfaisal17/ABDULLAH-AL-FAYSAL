import { isDatabaseConnected } from "../config/db.js";

export function requireDbConnection(request, response, next) {
  if (isDatabaseConnected()) {
    next();
    return;
  }

  response.status(503).json({
    message: "Database connection is not ready.",
  });
}
