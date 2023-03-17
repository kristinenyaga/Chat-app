import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: { username: true, picture: true },
        },
        likes: {
          select: { userId: true },
          where: { userId: res.locals.requestUser.id },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
    res.json(posts);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};
