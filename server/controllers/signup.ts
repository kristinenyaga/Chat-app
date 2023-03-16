import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    //Check if the user exists in the database
    const email = req.body.email;
    const username = req.body.username;
    const userExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (userExists !== null) {
      return res.status(409).send("user already exists");
    }
    // create a user in the db from req.body
    const user: any = await prisma.user.create({
      data: { email: email, username: username, password: hashPassword },
      select: {
        password: false,
        id: true,
        email: true,
        username: true,
        picture: true,
      },
    });
    user.token = jwt.sign({ id: user.id, email: user.email }, "sco207");
    res.json(user);
  } catch (e: any) {
    res.status(500).json(e);
  }
};
