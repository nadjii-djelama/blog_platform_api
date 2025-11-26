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
import authorization from "../middlewares/authorization.middleware.ts";
// Post routes
router.post("/create-post", authorization, createPost);
router.put("/edit-post/:id", authorization, editPost);
router.delete("/delete-post/:id", authorization, deletePost);
router.get("/posts", authorization, getPosts);
router.get("/post/:id", authorization, getSpecificPost);

// Comment routes
router.post("/post/:post_id/add-comment", authorization, addComment);

export default router;
