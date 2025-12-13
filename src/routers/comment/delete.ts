import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";
import { BadRequestError } from "../../../common";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;


    if (!commentId || !postId) {
      return (new BadRequestError("post id and comment id are required"))
    }

    try {
      await Comment.findOneAndDelete({ _id: commentId });
    } catch (err) {
        next(new Error('comment cannot be deleted!'))
    }

    await Post.findOneAndUpdate(
        { _id: postId },
        { $pull: { comments: commentId } }
    )

    res.status(200).json({ success: true })
  }
);

export { router as deleteCommentRouter };
