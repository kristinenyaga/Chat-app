import express from "express"
import { createPost } from "../controllers/createPost"
import { deletePost } from "../controllers/deletePost"
export const routerPost=express.Router()
routerPost.route("/create").post(createPost)
routerPost.route("/delete").delete(deletePost)
