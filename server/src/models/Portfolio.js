import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    projectLink: {
      type: String,
      trim: true,
      default: undefined,
    },
    featuredSlot: {
      type: Number,
      enum: [1, 2, 3, 4, null],
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  baseSchemaOptions,
);

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
