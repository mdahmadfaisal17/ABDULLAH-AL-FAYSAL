import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const visitEventSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, trim: true, index: true },
    path: { type: String, required: true, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    occurredAt: { type: Date, default: Date.now, index: true },
  },
  baseSchemaOptions,
);

visitEventSchema.index({ sessionId: 1, occurredAt: -1 });

export const VisitEvent = mongoose.model("VisitEvent", visitEventSchema);
