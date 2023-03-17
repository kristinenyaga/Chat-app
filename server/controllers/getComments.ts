import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getComments = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
    });
    res.json(comments);
  } catch (e: any) {
    res.json(e.message);
  }
};
