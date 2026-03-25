import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, default: "" },
    source: { type: String, default: "" },
    subscribedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Active", "Paused"],
      default: "Active",
    },
  },
  baseSchemaOptions,
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
