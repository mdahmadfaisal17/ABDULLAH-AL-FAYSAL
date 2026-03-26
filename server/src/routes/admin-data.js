import { Router } from "express";
import { Blog } from "../models/Blog.js";
import { Portfolio } from "../models/Portfolio.js";
import { ProjectRequest } from "../models/ProjectRequest.js";
import { Subscriber } from "../models/Subscriber.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";
import { buildDashboardAnalyticsSummary } from "../services/analyticsService.js";

const router = Router();

router.get("/", requireAdminAuth, async (_request, response, next) => {
  try {
    const [blogs, portfolioItems, projectRequests, subscribers] = await Promise.all([
      Blog.find().sort({ publishedAt: -1 }),
      Portfolio.find().sort({ createdAt: -1 }),
      ProjectRequest.find().sort({ date: -1 }),
      Subscriber.find().sort({ subscribedAt: -1 }),
    ]);
    const analyticsSummary = await buildDashboardAnalyticsSummary({
      totalLeads: projectRequests.length,
      totalSubscribers: subscribers.length,
    });

    response.json({
      blogs,
      portfolioItems,
      projectRequests,
      subscribers,
      analyticsSummary,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
