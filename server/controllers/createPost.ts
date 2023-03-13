import { Request, Response } from "express";

export const createPost= async (req:Request,response:Response)=>{
try{
    const post=null//TODO create the post in the db
response.status(201).json(post)
}
catch(e:any){
 response.json(e.message)   
}
}
