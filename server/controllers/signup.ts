import { Request, Response } from "express";
import bcrypt from 'bcryptjs'

export const signup = async (req:Request,res: Response)=>{
   

    try{
//hash the password
const salt= await bcrypt.genSalt(10)
const hashPassword= await bcrypt.hash(req.body.password,salt)
req.body.password=hashPassword
//Check if the user exists in the database
const userExists=null //TODO find a user in db 

if(userExists!==null){
    return res.status(409).send("user already exists" )
}
const user= null// TODO create a user in the db from req.body
res.json(user)
    }
    catch(e:any){
res.json(e.message)
    }
}