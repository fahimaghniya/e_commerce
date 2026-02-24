
const mongoose=require("mongoose")
const orderschema=new mongoose.Schema({
     user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
     totalamounts:{type:Number,required:true},
     status:{type:String,enum:["pending","payed","shipped"],default:"pending"},
    createdat:{type:Date,default:Date.now}
    })
     
module.exports=mongoose.model("order",orderschema)