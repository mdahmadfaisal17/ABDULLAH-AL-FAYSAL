import { Router } from "express";
import { VisitEvent } from "../models/VisitEvent.js";

const router = Router();

function shouldIgnorePath(path) {
  return path.startsWith("/admin") || path.startsWith("/auth");
}

router.post("/page-view", async (request, response, next) => {
  try {
    const { sessionId, path, title } = request.body ?? {};

    if (typeof sessionId !== "string" || !sessionId.trim()) {
      response.status(400).json({ message: "sessionId is required." });
      return;
    }

    if (typeof path !== "string" || !path.trim()) {
      response.status(400).json({ message: "path is required." });
      return;
    }

    const normalizedPath = path.trim();

    if (shouldIgnorePath(normalizedPath)) {
      response.status(202).json({ recorded: false });
      return;
    }

    await VisitEvent.create({
      sessionId: sessionId.trim(),
      path: normalizedPath.slice(0, 512),
      title: typeof title === "string" ? title.trim().slice(0, 200) : "",
    });

    response.status(201).json({ recorded: true });
  } catch (error) {
    next(error);
  }
});

export default router;
