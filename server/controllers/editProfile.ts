import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import path from "path";

const prisma = new PrismaClient();

export const editProfile = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== res.locals.requestUser.id) {
      return res.status(403).json({
        message: `You are not authorized to edit user id:${userId}`,
      });
    }
    const picture = req.file;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        username: req.body.username ?? res.locals.requestUser.username,
        picture: picture
          ? `/media/${picture.filename}`
          : res.locals.requestUser.picture,
      },
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
    res.json({
      user: user,
      path: path.join(__dirname, "..", "media"),
      file: picture,
    });
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};