import type { Request, Response } from "express";
import Posts from "../models/posts.model.ts";

const createPost = async (req: Request, res: Response) => {
  try {
    const { title, short_desc, content, author } = req.body;
    if (!title || !short_desc || !content) {
      return res.status(400).json({
        message: "make sure you put title and short description and content.",
      });
    }
    const create_post = await Posts.create({
      title,
      short_desc,
      content,
      author: (req as any).user.id,
    });
    res.status(200).json({ message: "Post created.", post: create_post });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

export { createPost };
