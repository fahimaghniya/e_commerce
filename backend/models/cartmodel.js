const mongoose=require("mongoose")
const cartitemschema=mongoose.Schema({
    productid:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
quantity:{type:Number,default:1}
})
const cartSchema= mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
 items:[cartitemschema] 
})
module.exports=mongoose.model("cart",cartSchema)