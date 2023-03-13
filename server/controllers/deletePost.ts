import { Request, Response } from "express";

export const deletePost= async (req:Request,res:Response)=>{
    const {id:any}= req.params
    try{
//TODO delete a post with the specific id
    }
    catch(e:any){
res.json(e.message)
    }
}