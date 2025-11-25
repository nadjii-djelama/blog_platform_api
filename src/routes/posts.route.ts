import { Router } from "express";
const router = Router();
import {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getSpecificPost,
} from "../controllers/posts.controller.ts";

import { addComment } from "../controllers/comments.controller.ts";

// Post routes
router.post("/create_post", createPost);
router.put("/edit-post/:id", editPost);
router.delete("/delete-post/:id", deletePost);
router.get("/posts", getPosts);
router.get("/post/:id", getSpecificPost);

// Comment routes
router.post("/post/:post_id/add-comment", addComment);
export default router;
