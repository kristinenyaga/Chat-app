import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { routerAuth } from "./routes/auth";
import { routerPost } from "./routes/post";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use("/auth",routerAuth)
app.use("/post", routerPost)
app.use("/like")
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));

  console.log(`hey got called`);
});
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
