import { connectToDatabase, isDatabaseConnected } from "../config/db.js";

export async function requireDbConnection(request, response, next) {
  if (isDatabaseConnected()) {
    next();
    return;
  }

  try {
    await connectToDatabase();

    if (isDatabaseConnected()) {
      next();
      return;
    }

    response.status(503).json({
      message: "Database connection is not ready.",
    });
  } catch (error) {
    next(error);
  }
}
