const ProductModel = require("../models/productmodel")
const subcategoriemodel = require("../models/subcategoriemodel")

const createproduct=async(request,response)=>{
 try {
   const {name,price,subcategorie,description}=request.body
   const image=request.file ? request.file.filename :null
  const newProduct=new ProductModel({name,price,subcategorie,description,image})
  newProduct.save()
 response.status(201).json({message:"product added",data:newProduct})
 await subcategoriemodel.findByIdAndUpdate(request.body.subcategorie,{$push:{products:newProduct._id}})
 } catch (error) {
  response.status(500).json({message:error.message})
 }
}
//afficher(lire) la liste de produit//
const getallproduct=async(req,res)=>{
    try {
     const productlist= await ProductModel.find().populate("subcategorie")
     res.status(200).json({message:"produit affiché",data:productlist})   
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteproduct=async(req,res)=>{
    try {
      const productdeleted=await ProductModel.findByIdAndDelete(req.params.id)  
      if(!productdeleted)
      {res.status(404).json({message:"product not found"})}
      res.status(200).json({message:"product deleted"})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
const getproductbyid=async(req,res)=>{
    try {
        const productdetail=await ProductModel.findById(req.params.id)

    if(!productdetail)
      {res.status(404).json({message:"product not found"})}
      res.status(200).json({message:"product listed",data:productdetail})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
const updateproduct=async(req,res)=>{
    try {
        const productupdated=await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!productupdated)
        {res.status(404).json({message:"product not found"})}

        res.status(200).json({message:"product updated",data:productupdated})

    } catch (error) { res.status(500).json({message:error.message})
        
    }
}
const getproductbysubcategoryid=async(req,res)=>{
    try {
        const subcategoryid=req.params.subcategoryid
        const products=await ProductModel.find({subcategorie:subcategoryid})
        if(! products)     
        {
            res.status(404).json({message:"product not found"})

        }
        res.status(200).json({message:"product listed",data:products})
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
}
module.exports= {createproduct,getallproduct,deleteproduct,getproductbyid,updateproduct,getproductbysubcategoryid}
