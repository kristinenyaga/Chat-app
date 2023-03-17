import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = parseInt(req.params.cid);
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: { post: true },
    });
    if (comment === null) {
      return res.status(404).json(`The comment id:${commentId} doesn't exist`);
    }
    if (
      ![comment.userId, comment.post.userId].includes(res.locals.requestUser.id)
    ) {
      return res
        .status(403)
        .json(`You are not authorized to delete comment id:${commentId}`);
    }
    await prisma.comment.delete({ where: { id: comment.id } });
    return res.json("Comment deleted successfully");
  } catch (e) {
    res.status(500).json(e);
  }
};
