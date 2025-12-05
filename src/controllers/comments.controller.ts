import type { Request, Response } from "express";
import Comment from "../models/comments.model.ts";

// Typed interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user: {
    id: string;
  };
}

const addComment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { content } = req.body;
    const user_id = req.user.id;
    const post_id = req.params.post_id;

    if (!post_id) {
      return res.status(400).json({ message: "Post ID is required." });
    }

    if (!content) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    const created_comment = await Comment.create({
      content,
      author: user_id,
      post: post_id,
    });

    res.status(201).json({
      message: "Comment created successfully.",
      comment: created_comment,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

const editComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const comment_id = req.params.id;

    if (!comment_id) {
      return res
        .status(400)
        .json({ message: "You should provide a comment id." });
    }

    if (!content) {
      return res.status(400).json({ message: "Comment content is required." });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      comment_id,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res
      .status(200)
      .json({ message: "Comment edited.", comment: updatedComment });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment_id = req.params.id;

    if (!comment_id) {
      return res
        .status(400)
        .json({ message: "You should provide a valid comment id." });
    }

    const deletedComment = await Comment.findByIdAndDelete(comment_id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({ message: "Comment deleted." });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: err.message });
  }
};

export { addComment, editComment, deleteComment };
