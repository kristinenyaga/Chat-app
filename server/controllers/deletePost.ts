import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post === null) {
      return res
        .status(404)
        .json({ message: `The post id:${postId} doesn't exist` });
    }
    if (post.userId !== res.locals.requestUser.id) {
      return res
        .status(403)
        .json({
          message: `You are not authorized to delete post id:${postId}`,
        });
    }
    await prisma.post.delete({ where: { id: post.id } });
    return res.json({ message: "Post deleted successfully" });
  } catch (e: any) {
    res.status(500).json(e);
  }
};
