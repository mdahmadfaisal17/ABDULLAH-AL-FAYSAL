import mongoose from "mongoose";

let connectionPromise;

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI. Add it to server/.env before starting the API.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2 && connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
    .then((mongooseInstance) => {
      console.log("Connected to MongoDB");
      return mongooseInstance.connection;
    })
    .catch((error) => {
      connectionPromise = undefined;
      throw error;
    });

  return connectionPromise;
}

export function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}
