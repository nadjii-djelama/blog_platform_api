import type { Request, Response } from "express";
import Comment from "../models/comments.model.ts";

const addComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const user_id = (req as any).user.id;
    const post_id = (req as any).params.post_id;
    if (!content) {
      return res.status(400).json({ message: "Comment content is required." });
    }
    const created_comment = await Comment.create({
      content,
      author: user_id,
      post: post_id,
    });
    res.status(200).json({
      message: "Comment added successfully.",
      comment: created_comment,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

export { addComment };
