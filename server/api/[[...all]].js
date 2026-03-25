import app from "../src/app.js";
import { connectToDatabase } from "../src/config/db.js";
import { seedDatabaseIfEmpty } from "../src/lib/seedDatabase.js";

let bootstrapPromise;

async function bootstrap() {
  await connectToDatabase();
  await seedDatabaseIfEmpty();
}

export default async function handler(request, response) {
  bootstrapPromise ??= bootstrap().catch((error) => {
    bootstrapPromise = undefined;
    throw error;
  });

  try {
    await bootstrapPromise;
    return app(request, response);
  } catch (error) {
    console.error("Failed to bootstrap API:", error);
    response.status(500).json({
      message: "The API could not start correctly.",
    });
  }
}
