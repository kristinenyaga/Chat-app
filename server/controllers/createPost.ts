import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
  try {
    if (!req.body.caption || !req.body.title) {
      return res.status(411).json("Please provide a caption and title");
    }
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        caption: req.body.caption,
        userId: res.locals.requestUser.id,
      },
      include: {
        user: {
          select: { username: true, picture: true },
        },
        likes: {
          select: { userId: true },
          where: { userId: res.locals.requestUser.id },
        },
        comments: {
          select: { text: true, user: { select: { username: true } } },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });
    res.status(201).json(post);
  } catch (e: any) {
    res.json(e.message);
  }
};
