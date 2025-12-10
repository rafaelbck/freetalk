import { Router, Request, Response, NextFunction } from "express";
import Post from "../../models/post";

const router = Router();

router.post(
  "/api/post/show/",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        const allPost = await Post.find();
        return res.status(200).send(allPost)
    }

    const post = await Post.findOne({ _id: id }).populate('comments')

    res.status(200).send(post)
  }
);

export { router as showPostsRouter };
