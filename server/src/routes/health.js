import { Router } from "express";

const router = Router();

router.get("/", (_request, response) => {
  response.status(200).json({
    ok: true,
    service: "modern-website-server",
    timestamp: new Date().toISOString(),
  });
});

export default router;
