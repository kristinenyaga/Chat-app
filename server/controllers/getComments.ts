import { Request, Response } from "express";
export const getComments=async (req:Request,res:Response)=>{
    try{
const comments= null //TODO get comments from the db
res.json(comments)
    }
    catch(e:any){
res.json(e.message)
    }
}