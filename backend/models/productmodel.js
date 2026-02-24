const mongoose=require("mongoose")
const productschema=new mongoose.Schema({
  name:{type:String},
  price:{type:Number},
  subcategorie:{type:mongoose.Schema.Types.ObjectId,ref:"subcategorie"},
  image:{type:String},
  description:{type:String}
})
const ProductModel=mongoose.model("product",productschema)
module.exports=ProductModel