import { Router } from "express";
const router = Router();
import { createPost } from "../controllers/posts.controller.ts";
router.post("/create_post", createPost);

export default router;
