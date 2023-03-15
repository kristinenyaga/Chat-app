
import {Request,Response} from "express"
export const getPosts= async (req:Request,res:Response)=>{
    try{
const posts= null //TODO get post from db
res.json(posts)
    }
    catch(e:any){
res.json(e.message)
    }
}