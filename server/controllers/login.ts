import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    //check if the email exists, If not say it does not exist
    console.log(req.body.email)
    
    const userExists = await prisma.user.findUnique({
      where: { email: req.body.email }
    });
    if (userExists === null) {
      return res.status(400).send("user was not found");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      userExists.password
    );
    if (!passwordMatch) {
      return res.status(400).send("email or password was wrong");
    }
    const token = jwt.sign(
      { id: userExists.id, email: userExists.email },
      "sco207"
    );
    let user = {
      id: userExists.id,
      email: userExists.email,
      username: userExists.username,
      picture: userExists.picture,
      token: token
    };
    return res.json(user);
  } catch (e: any) {
    res.status(500).json(e.message);
  }
};
