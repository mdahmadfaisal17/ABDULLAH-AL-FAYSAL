import mongoose from "mongoose";

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI. Add it to server/.env before starting the API.");
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Connected to MongoDB");
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
