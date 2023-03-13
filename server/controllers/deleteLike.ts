import { Request, Response } from "express";

export const deleteLike= async (req:Request,res:Response)=>{
  
    try{
//TODO delete a post with the specific id
    }
    catch(e:any){
res.json(e.message)
    }
}