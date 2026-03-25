import { Router } from "express";
import {
  createProjectRequest,
  listProjectRequests,
} from "../controllers/projectRequestsController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();

router.get("/", requireAdminAuth, listProjectRequests);
router.post("/", createProjectRequest);

export default router;
