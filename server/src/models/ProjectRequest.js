import mongoose from "mongoose";
import { baseSchemaOptions } from "./baseOptions.js";

const projectRequestSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true, default: "" },
    email: { type: String, required: true, trim: true, default: "" },
    whatsappNumber: { type: String, default: "" },
    selectedService: { type: String, default: "" },
    budget: { type: String, default: "" },
    preferredContactMethod: { type: String, default: "" },
    projectDescription: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  baseSchemaOptions,
);

export const ProjectRequest = mongoose.model("ProjectRequest", projectRequestSchema);
