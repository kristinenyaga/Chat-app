import express from "express";
import multer from "multer";
import path from "path";
import { editProfile } from "../controllers/editProfile";
import { getUser } from "../controllers/getUser";
export const routerUser = express.Router();
const upload = multer({ dest: path.join(__dirname, "..", "media") });
routerUser.route("/:id").get(getUser);
routerUser.post("/:id", upload.single("picture"), editProfile);
