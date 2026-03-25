import { Router } from "express";
import {
  createPortfolio,
  deletePortfolio,
  listPortfolio,
  updatePortfolio,
} from "../controllers/portfolioController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();

router.get("/", listPortfolio);
router.post("/", requireAdminAuth, createPortfolio);
router.put("/:portfolioId", requireAdminAuth, updatePortfolio);
router.delete("/:portfolioId", requireAdminAuth, deletePortfolio);

export default router;
