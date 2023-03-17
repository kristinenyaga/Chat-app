import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        email: true,
        username: true,
        picture: true,
        posts: {
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
        },
      },
    });
    res.json(user);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};
