import { Router } from "express";
import {
  createSubscriber,
  listSubscribers,
} from "../controllers/subscribersController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();

router.get("/", requireAdminAuth, listSubscribers);
router.post("/", createSubscriber);

export default router;
