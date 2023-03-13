import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
export const login = async (req:Request,res:Response)=>{
    try{
 //check if the email exists, If not say it does not exist
 const userExists:any= null//TODO find a user from the db with req.body.email
 if(!userExists){
     return res.status(400).send("user was not found")

 }
 const passwordMatch= await bcrypt.compare(req.body.password, userExists.password)
if(!passwordMatch){
    return res.status(400).send("email or password was wrong")
}
//TODO  ASSIGN jwt acess token and refresh token
    }
    catch(e:any){
res.json(e.message)
    }
}