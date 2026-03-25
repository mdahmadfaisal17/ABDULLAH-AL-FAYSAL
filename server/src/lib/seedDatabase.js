import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Blog } from "../models/Blog.js";
import { Portfolio } from "../models/Portfolio.js";
import { ProjectRequest } from "../models/ProjectRequest.js";
import { Subscriber } from "../models/Subscriber.js";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const seedFilePath = path.resolve(currentDir, "../data/database.json");

async function readSeedData() {
  try {
    const contents = await fs.readFile(seedFilePath, "utf8");
    return JSON.parse(contents);
  } catch (error) {
    console.error("Failed to read seed database.json:", error);
    return {
      blogs: [],
      portfolioItems: [],
      projectRequests: [],
      subscribers: [],
    };
  }
}

export async function seedDatabaseIfEmpty() {
  const [blogCount, portfolioCount, requestCount, subscriberCount] = await Promise.all([
    Blog.countDocuments(),
    Portfolio.countDocuments(),
    ProjectRequest.countDocuments(),
    Subscriber.countDocuments(),
  ]);

  if (blogCount || portfolioCount || requestCount || subscriberCount) {
    return;
  }

  const seedData = await readSeedData();

  await Promise.all([
    seedData.blogs?.length ? Blog.insertMany(seedData.blogs) : Promise.resolve(),
    seedData.portfolioItems?.length
      ? Portfolio.insertMany(
        seedData.portfolioItems.map((item) => ({
          title: item.title,
          category: item.category,
          imageUrl: item.imageUrl || item.image || "",
          projectLink: item.projectLink || item.link || undefined,
          createdAt: item.createdAt,
        })),
      )
      : Promise.resolve(),
    seedData.projectRequests?.length
      ? ProjectRequest.insertMany(seedData.projectRequests)
      : Promise.resolve(),
    seedData.subscribers?.length
      ? Subscriber.insertMany(seedData.subscribers)
      : Promise.resolve(),
  ]);

  console.log("Seeded MongoDB with initial server data");
}
