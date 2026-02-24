const categoriemodel = require("../models/categoriemodel")

const createcategorie=async(req,res)=>{
    try {
        const{name,subcategorie}=req.body
        const newcategorie=await new categoriemodel({name,subcategorie})
        newcategorie.save()
        res.status(201).json({message:"catagory created",data:newcategorie})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getallcategorie=async(req,res)=>{
    try {
       const allcategories= await categoriemodel.find().populate("subcategories","name")  //populate permet d'afficher tous les champs de subcategories
       res.status(200).json({message:"category listed",data:allcategories})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const getbyid=async(req,res)=>{
    try {
        const categoriesbyid= await categoriemodel.findById(req.params.id)
if(!categoriesbyid)
{res.status(404).json({message:"categorie not found"})}
res.status(200).json({message:"categorie listed",data:categoriesbyid})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deletecategorie=async(req,res)=>{
    try {
        const categoriedeleted= await categoriemodel.findByIdAndDelete(req.params.id)
      if(!categoriedeleted)
{res.status(404).json({message:"categorie not found"})}
res.status(200).json({message:"categorie deleted"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updatecategorie=async(req,res)=>{
    try {
        const categorieupdated=await categoriemodel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!categorieupdated)
        {res.status(404).json({message:"categorie not found"})}

        res.status(200).json({message:"categorie updated",data:categorieupdated})

    } catch (error) { res.status(500).json({message:error.message})
        
    }
}
module.exports={createcategorie,getallcategorie,getbyid,deletecategorie,updatecategorie}