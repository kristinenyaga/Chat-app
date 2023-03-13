import express from "express"
import { createComment } from "../controllers/createComment"
import { deleteComment } from "../controllers/deleteComment"
export const routerComment=express.Router()
routerComment.route("/create").post(createComment)
routerComment.route("/delete").delete(deleteComment)