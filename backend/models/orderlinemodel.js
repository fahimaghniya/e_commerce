const mongoose=require("mongoose")
const orderlineschema=new mongoose.Schema({
     product:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
     order:{type:mongoose.Schema.Types.ObjectId,ref:"order"},
     quantity:{type:Number}})
     
module.exports=mongoose.model("orderline",orderlineschema)
    