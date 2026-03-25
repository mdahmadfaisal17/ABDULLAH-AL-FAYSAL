import { Router } from "express";
import adminDataRouter from "./admin-data.js";
import blogsRouter from "./blogs.js";
import contactRouter from "./contact.js";
import healthRouter from "./health.js";
import portfolioRouter from "./portfolio.js";
import projectRequestsRouter from "./project-requests.js";
import subscribersRouter from "./subscribers.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json({
    message: "API root",
    endpoints: {
      adminData: "/api/admin-data",
      blogs: "/api/blogs",
      contact: "/api/contact",
      health: "/api/health",
      portfolio: "/api/portfolio",
      projectRequests: "/api/project-requests",
      subscribers: "/api/subscribers",
    },
  });
});

router.use("/admin-data", adminDataRouter);
router.use("/blogs", blogsRouter);
router.use("/contact", contactRouter);
router.use("/health", healthRouter);
router.use("/portfolio", portfolioRouter);
router.use("/project-requests", projectRequestsRouter);
router.use("/subscribers", subscribersRouter);

export default router;
