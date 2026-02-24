const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    password:{type:String},
    adresse:{type:String},
    phonenumber:{type:Number},
    role:{type:String,enum:["admin","provider","client"],default:"client"},

})
module.exports=mongoose.model("user",userschema)