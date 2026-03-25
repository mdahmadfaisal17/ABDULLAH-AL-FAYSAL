import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const portfolioItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: undefined },
    category: { type: String, required: true, trim: true, default: "" },
    description: { type: String, default: "" },
    link: { type: String, default: undefined },
    featuredPosition: {
      type: Number,
      enum: [1, 2, 3, 4, null],
      default: null,
    },
    createdAt: { type: Date, default: Date.now },
  },
  baseSchemaOptions,
);

export const PortfolioItem = mongoose.model("PortfolioItem", portfolioItemSchema);
