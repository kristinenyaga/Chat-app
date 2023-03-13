import express from "express"
import { createPost } from "../controllers/createPost"
import { deletePost } from "../controllers/deletePost"
import { createLike } from "../controllers/createLike"
import { deleteLike } from "../controllers/deleteLike"
import { createComment } from "../controllers/createComment"
import { deleteComment } from "../controllers/deleteComment"
export const routerPost=express.Router()
routerPost.route("/create").post(createPost)
routerPost.route("/:id/delete").delete(deletePost)
routerPost.route("/:id/likes").post(createLike)
routerPost.route("/:id/likes").delete(deleteLike)
routerPost.route("/:id/comments").post(createComment)
routerPost.route("/:id/comments/:cid").delete(deleteComment)