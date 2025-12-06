import type { Request, Response } from "express";
import Posts from "../models/posts.model.ts";
import Comment from "../models/comments.model.ts";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, short_desc, content } = req.body;
    const author = (req as any).user.id;
    if (!title || !short_desc || !content) {
      return res.status(400).json({
        message: "make sure you put title and short description and content.",
      });
    }
    const create_post = await Posts.create({
      title,
      short_desc,
      content,
      author,
    });
    res.status(200).json({ message: "Post created.", post: create_post });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const editPost = async (req: Request, res: Response) => {
  try {
    const { title, short_desc, content } = req.body;
    const post_id = req.params.id;
    const find_post = await Posts.findById(post_id);
    if (!find_post) {
      return res.status(404).json({ message: "Post not found." });
    }
    if (title) find_post.title = title;
    if (short_desc) find_post.short_desc = short_desc;
    if (content) find_post.content = content;
    const updated_post = await find_post.save();
    res.status(200).json({ message: "Post updated.", post: updated_post });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.id;
    const find_post = await Posts.findByIdAndDelete(post_id);
    if (!find_post) {
      return res.status(404).json({ message: "Can't find post, try again." });
    }
    res
      .status(200)
      .json({ message: "Post deleted succesfully.", post: find_post.id });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts availible." });
    }
    res.status(200).json({ message: "Posts fetched succesfully.", posts });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

const getSpecificPost = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.id;
    const find_post = await Posts.findById(post_id);
    if (!find_post) {
      return res.status(404).json({ message: "Post not found." });
    }
    res.status(200).json({ post: find_post });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

export { createPost, editPost, deletePost, getPosts, getSpecificPost };
