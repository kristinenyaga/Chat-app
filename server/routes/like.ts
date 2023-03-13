import express from 'express'
import { createLike} from '../controllers/createLike'
import { deleteLike } from '../controllers/deleteLike'
export const routerLike= express.Router()

routerLike.route("/create").post(createLike)
routerLike.route("/delete").delete(deleteLike)
