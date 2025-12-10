import { Router, Request, Response, NextFunction } from "express";
import Comment from "../../models/comment";
import Post from "../../models/post";

const router = Router();

router.delete(
  "/api/comment/:commentId/delete/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params;


    if (!commentId || !postId) {
      const error = new Error("post id and comment id are required") as customError;
      error.status = 400;
      next(error);
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
