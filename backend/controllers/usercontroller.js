const usermodel = require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const sendemail = require("../utils/sendemail")
//génération de l'access token pour sécuriser la session dont le temps d'expiration est minimal//
const generateaccesstoken=(user)=>{
   return jwt.sign({id:user._id,role:user.role},process.env.accesskey,{expiresIn:"1h"})
}
////génération de refresh token pour sécuriser la session dont le temps d'expiration est prolongé//
const generaterefreshtoken=(user)=>{
    return jwt.sign({id:user._id, role:user.role},process.env.refreshkey,{expiresIn:"5w"})
}
const inscriptionuser=async(req,res)=>{
    try {
        const{fullname,email,password,adresse,phonenumber,role}=req.body
        const userexist=await usermodel.findOne({email})
        if(userexist)
        {
            res.status(400).json({message:"user with this email already exist"})
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newuser=new usermodel({fullname,email,password:hashedpassword,adresse,phonenumber,role})
        await newuser.save()
        res.status(201).json({message:"user created",data:newuser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
let tableauRefreshtoken=[]
const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const userexist=await usermodel.findOne({email})
        if(!userexist)
        {
            res.status(400).json({message:"user with this email doesn't exist"})
        }
        const verifypassword=await bcrypt.compare(password,userexist.password)
        if(!verifypassword)
           { res.status(400).json({message:"wrong password"})}
        const accesstoken=generateaccesstoken(userexist)
        const refreshtoken=generaterefreshtoken(userexist)
        tableauRefreshtoken.push(refreshtoken)
        res.status(200).json({message:"login succefully",data:{userexist,accesstoken,refreshtoken}})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
const logout=async(req,res)=>{
    try {
       const {refreshtoken} = req.body
       if(!refreshtoken)
        {return  req.status(404).json({message:"no token provided"})}
       tableauRefreshtoken=tableauRefreshtoken.filter(token=>token !== refreshtoken)
       res.status(200).json({message:"déconnexion réussi"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const forgetpassword=async(req,res)=>{
    try {
        const {email}=req.body
        const user=await usermodel.findOne({email})
        if (!user)
        {return res.status(404).json({message:"user with this email does't exist"})}
        const subject="Reset password"
        const token=jwt.sign({id:user._id},process.env.accesskey,{expiresIn:"1h"})
        const resetlink=`http://localhost:3000/resetpassword/${token}`
        const htmlmessage=`<h2> hello ${user.fullname}</h2>
        <p>please use this url to reset your password</p>
        <a href=${resetlink}> ${resetlink}</a>`
const emailsent=await sendemail(user.email,subject,htmlmessage)
if(emailsent){
    return res.status(200).json({message:"reset emil sent sccuflly"})
}

else {return res.status(500).json({message:"failed to send email"})}
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const resetpassword=async(req,res)=>
{
    try {
       const {newpassword}=req.body 
       const{token}=req.params
       const decodedtoken=jwt.verify(token,process.env.accesskey)
       const user=await usermodel.findById(decodedtoken.id)
       //hashage de password//
       const hashedpassword=await bcrypt.hash(newpassword,10)
       user.password=hashedpassword
       await user.save()
       res.status(200).json({message:"password reset successfully"})

    } catch (error) {
      res.status(500).json({message:error.message}) 
  }
}
const getuserprofilebyid=async(req,res)=>{
    try {
        const userdetail=await usermodel.findById(req.params.id)

    if(!userdetail)
      {res.status(404).json({message:"user not found"})}
      res.status(200).json({message:"user listed",data:userdetail})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
const getallusers=async(req,res)=>{
    try {
     const userlist= await usermodel.find()
     res.status(200).json({message:"user listed",data:userlist})   
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteuser=async(req,res)=>{
    try {
    const userdeleted=await usermodel.findByIdAndDelete(req.params.id)  
      if(!userdeleted)
      {res.status(404).json({message:"user not found"})}
      res.status(200).json({message:"user deleted"})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
module.exports={inscriptionuser,login,logout,forgetpassword,resetpassword,getuserprofilebyid,getallusers,deleteuser}