import { Request, Response } from "express";

export const createLike= async (req:Request,res:Response)=>{
    try{
const like=null //TODO CREATE A LIKE IN THE DB
res.json(like)
    }
    catch(e:any){
res.json(e.message)
    }
}