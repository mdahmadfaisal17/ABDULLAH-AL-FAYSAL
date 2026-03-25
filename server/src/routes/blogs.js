import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  listBlogs,
  updateBlog,
} from "../controllers/blogsController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = Router();

router.get("/", listBlogs);
router.post("/", requireAdminAuth, createBlog);
router.put("/:blogId", requireAdminAuth, updateBlog);
router.delete("/:blogId", requireAdminAuth, deleteBlog);

export default router;
