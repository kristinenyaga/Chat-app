import express from "express";
import { createComment } from "../controllers/createComment";
import { createLike } from "../controllers/createLike";
import { createPost } from "../controllers/createPost";
import { deleteComment } from "../controllers/deleteComment";
import { deleteLike } from "../controllers/deleteLike";
import { deletePost } from "../controllers/deletePost";
import { getComments } from "../controllers/getComments";
import { getNumberOfLikes } from "../controllers/getNumberOfLikes";
import { getPosts } from "../controllers/getPosts";
export const routerPost = express.Router();
routerPost.route("/").get(getPosts)
routerPost.route("/create").post(createPost);
routerPost.route("/:id").delete(deletePost);
routerPost.route("/:id/likes").post(createLike);
routerPost.route("/:id/likes/number").get(getNumberOfLikes);
routerPost.route("/:id/likes").delete(deleteLike);
routerPost.route("/:id/comments").post(createComment).get(getComments);
routerPost.route("/:id/comments/:cid").delete(deleteComment);
