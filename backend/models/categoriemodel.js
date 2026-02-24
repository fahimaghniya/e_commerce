const mongoose=require("mongoose")
const categorieschema=new mongoose.Schema({
    name:{type:String,required:true},
    subcategories:[{type:mongoose.Schema.Types.ObjectId,ref:"subcategorie"}]

})
module.exports= mongoose.model("categorie",categorieschema)
