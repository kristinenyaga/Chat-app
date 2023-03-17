import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createLike = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post === null) {
      return res
        .status(404)
        .json({ message: `The post id:${postId} doesn't exist` });
    }
    const like = await prisma.like.create({
      data: { postId: post.id, userId: res.locals.requestUser.id },
    });
    res.json(like);
  } catch (e: any) {
    if (e.code === "P2002") {
      return res
        .status(208)
        .json({ message: `You have already liked post id:${req.params.id}` });
    }
    res.status(500).json(e);
  }
};
