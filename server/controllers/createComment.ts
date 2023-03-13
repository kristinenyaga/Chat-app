import { Request, Response } from "express";

export const createComment=async (req:Request,res:Response)=>{
    try{
const comment= null// TODO create comment in the db.
res.json(comment)

    }
    catch(e:any){
res.json(e.message)
    }
}