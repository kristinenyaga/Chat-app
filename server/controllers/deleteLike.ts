import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteLike = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const like = await prisma.like.findFirst({
      where: {
        postId: { equals: postId },
        userId: { equals: res.locals.requestUser.id },
      },
    });
    if (like === null) {
      return res.status(404).json(`You haven't liked post id:${postId}`);
    }
    await prisma.like.delete({ where: { id: like.id } });
    return res.json("Like deleted successfully");
  } catch (e: any) {
    res.status(500).json(e);
  }
};
