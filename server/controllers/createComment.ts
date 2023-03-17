import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createComment = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (post === null) {
      return res.status(404).json(`The post id:${postId} doesn't exist`);
    }
    if (!req.body.text) {
      return res.status(411).json("Please provide a comment text");
    }
    const comment = await prisma.comment.create({
      data: {
        postId: post.id,
        userId: res.locals.requestUser.id,
        text: req.body.text,
      },
    }); // TODO create comment in the db.
    res.json(comment);
  } catch (e: any) {
    res.status(500).json(e);
  }
};
