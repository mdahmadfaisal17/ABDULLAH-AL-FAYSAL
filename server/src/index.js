import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js";
import { connectToDatabase } from "./config/db.js";
import { seedDatabaseIfEmpty } from "./lib/seedDatabase.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(currentDir, "../.env") });
dotenv.config({ path: path.resolve(currentDir, "../../.env") });

const port = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    await connectToDatabase();
    await seedDatabaseIfEmpty();

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

void startServer();
