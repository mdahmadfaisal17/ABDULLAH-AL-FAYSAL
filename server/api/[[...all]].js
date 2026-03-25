import app from "../src/app.js";
import { connectToDatabase, isDatabaseConnected } from "../src/config/db.js";
import { seedDatabaseIfEmpty } from "../src/lib/seedDatabase.js";

let seedPromise;

async function ensureBootstrap() {
  await connectToDatabase();

  if (!seedPromise) {
    seedPromise = seedDatabaseIfEmpty().catch((error) => {
      seedPromise = undefined;
      throw error;
    });
  }

  await seedPromise;
}

export default async function handler(request, response) {
  try {
    if (!isDatabaseConnected()) {
      await ensureBootstrap();
    }

    return app(request, response);
  } catch (error) {
    console.error("Failed to bootstrap API:", error);
    response.status(500).json({
      message: "The API could not start correctly.",
    });
  }
}
