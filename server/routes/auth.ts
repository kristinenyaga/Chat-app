import express from "express"
import { login } from "../controllers/signup"
import { signup } from "../controllers/login"
export const routerAuth=express.Router()
routerAuth.route("/signup").post(signup)
routerAuth.route("/login").post(login)

