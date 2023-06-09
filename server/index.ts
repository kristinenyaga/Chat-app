import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { routerAuth } from "./routes/auth";
import { routerPost } from "./routes/post";
import { routerUser } from "./routes/user";

const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

async function jwtVerify(req: Request, res: Response, next: NextFunction) {
  let payload: any;
  try {
    payload = jwt.verify(req.headers.authorization ?? "", "sco207");
    let userExists = await prisma.user.findUnique({
      where: { id: payload?.id },
    });
    if (userExists !== null) {
      res.locals.requestUser = userExists;
      next();
      return;
    }
  } catch (e) {
    return res.status(500).json(e);
  }
  res.status(403).json("Token is not valid");
}

app.use("/posts", jwtVerify);
app.use("/users", jwtVerify);

app.use("/auth", routerAuth);
app.use("/posts", routerPost);
app.use("/users", routerUser);
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/", express.static(path.join(__dirname, "..", "client/out")));

const PORT = process.env.PORT || 8804;
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
