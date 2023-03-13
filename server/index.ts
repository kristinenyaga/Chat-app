import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { routerAuth } from "./routes/auth";
dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));

  console.log(`hey got called`);
});
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
app.use("/auth",routerAuth)
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`app listening on http://localhost:${PORT}`);
});
