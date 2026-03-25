import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, default: "" },
    slug: { type: String, required: true, trim: true, default: "" },
    category: { type: String, required: true, trim: true, default: "Uncategorized" },
    content: { type: String, required: true, default: "" },
    excerpt: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
    },
  },
  baseSchemaOptions,
);

export const Blog = mongoose.model("Blog", blogSchema);
