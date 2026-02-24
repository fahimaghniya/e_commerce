const categoriemodel = require("../models/categoriemodel")
const subcategoriemodel = require("../models/subcategoriemodel")

const createsubcategorie= async(req,res)=>{
    try {
        const {name,categorie}=req.body
        const newsubcategorie=new subcategoriemodel({name,categorie})
        newsubcategorie.save()
        res.status(200).json({message:"subcategorie created",data:newsubcategorie})
        //push de l'id de subcategorie dans le modelcategorie//
await categoriemodel.findByIdAndUpdate(
    req.body.categorie,{$push:{subcategories:newsubcategorie._id}}
)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
//affiche la liste des sous categories//
const getallsubcategorie=async(req,res)=>{
    try {
       const allsubcategories= await subcategoriemodel.find() 
       res.status(200).json({message:"subcategory listed",data:allsubcategories})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getbyid=async(req,res)=>{
    try {
        const subcategoriesbyid= await subcategoriemodel.findById(req.params.id)
if(!subcategoriesbyid)
{res.status(404).json({message:"subcategorie not found"})}
res.status(200).json({message:"subcategorie listed",data:subcategoriesbyid})
    } catch (error) {
        res.status(500).json({message:error.message})
    }cate
}
const deletesubcategorie=async(req,res)=>{
    try {
        const subcategoriedeleted= await subcategoriemodel.findByIdAndDelete(req.params.id)
      if(!subcategoriedeleted)
{res.status(404).json({message:"subcategorie not found"})}
res.status(200).json({message:"subcategorie deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updatesubcategorie=async(req,res)=>{
    try {
        const subcategorieupdated=await subcategoriemodel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!subcategorieupdated)
        {res.status(404).json({message:"subcategorie not found"})}

        res.status(200).json({message:"subcategorie updated",data:subcategorieupdated})

    } catch (error) { res.status(500).json({message:error.message})
        
    }
}
module.exports={createsubcategorie,getallsubcategorie,getbyid,deletesubcategorie,updatesubcategorie}