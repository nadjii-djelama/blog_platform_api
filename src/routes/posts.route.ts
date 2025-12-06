import { Router } from "express";
const router = Router();
import {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getSpecificPost,
} from "../controllers/posts.controller.ts";

import authorization from "../middlewares/authorization.middleware.ts";

import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/comments.controller.ts";
// Post routes
router.post("/create-post", authorization, createPost);
router.put("/edit-post/:id", authorization, editPost);
router.delete("/delete-post/:id", authorization, deletePost);
router.get("/posts", authorization, getPosts);
router.get("/post/:id", authorization, getSpecificPost);

// Comment routes
router.post("/post/:post_id/add-comment", authorization, addComment as any);
router.put("/post/:post_id/edit-comment/:id", authorization, editComment);
router.delete(
  "/post/:post_id/remove-comment/:id",
  authorization,
  deleteComment
);

export default router;
