import { Request, Response } from "express";
export const getNumberOfLikes=async (req:Request,res:Response)=>{
    try{
const comments:any= null //TODO get likes  from the db, comments is an array
res.json(comments.length)
    }
    catch(e:any){
res.json(e.message)
    }
}