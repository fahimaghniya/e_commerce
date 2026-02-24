const mongoose=require("mongoose")
const subcategorieschema=new mongoose.Schema({
    name:{type:String},
    categorie:{type:mongoose.Schema.Types.ObjectId,ref:"categorie"},
    products:[{type:mongoose.Schema.Types.ObjectId,ref:"product"}]
})

module.exports=mongoose.model("subcategorie",subcategorieschema)