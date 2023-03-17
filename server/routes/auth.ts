import express from "express"
import { login } from "../controllers/login"
import { signup } from "../controllers/signup"
export const routerAuth=express.Router()
routerAuth.route("/signup").post(signup)
routerAuth.route("/login").post(login)

