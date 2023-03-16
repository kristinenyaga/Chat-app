import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { routerAuth } from "./routes/auth";
import { routerPost } from "./routes/post";
import mime from "mime"
const prisma = new PrismaClient();

dotenv.config();
const app = express();
const mimeTypes = {
  css: 'text/css',
  js: 'text/javascript'
};

// // Add the static middleware with the mimeTypes option


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
  res.status(403).json({ message: "Token is not valid" });
}

app.use("/posts", jwtVerify);

app.use("/auth", routerAuth);
app.use("/posts", routerPost);
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client", "index.html"));

//   console.log(`hey got called`);
// });
app.use(express.static(path.join(__dirname, '..',"client")));

const PORT = process.env.PORT || 8801;
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
