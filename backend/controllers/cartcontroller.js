const cartmodel = require("../models/cartmodel")

const addtocart=async(req,res)=>{
    try {
        const userid=req.user.id  //req.user from middle ware
        const{productid,quantity}=req.body //envoyer productid et quantity lel body
let cart= await cartmodel.findOne({user:userid})        //let pour declarer variable et const pour declarer constante
if (!cart)
{
    cart=new cartmodel({user:userid,items:[]})
}
    //addproduct in the cart
    const itemindex=cart.items.findIndex(i=>i.productid && i.productid.toString()=== productid.toString())//tostring force que le type de id soit string
    if(itemindex>-1){
        cart.items[itemindex].quantity+=quantity //+= l'ancienne valeur+nouvelle valeur
    } else
    {
        cart.items.push({productid,quantity})
    }
   await cart.save()
   res.status(200).json({message:"product added",data:cart})
    } catch (error) {res.status(500).json({message:error.message})
        
    }
}
const getcart=async(req,res)=>{
    try {
        const userid=req.user.id 
        const cartuser=await cartmodel.findOne({user:userid}).populate("items.productid") 
        if(!cartuser){
            res.status(404).json({message:"cart for this user not found"})
        }
        res.status(200).json({message:"cart listed",data:cartuser})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const removefromcart=async(req,res)=>{
    try {const userid=req.user.id// from midlle ware
        const {productid}=req.params
        const cartuser=await cartmodel.findOne({user:userid})
        if(!cartuser){
            res.status(404).json({message:"cart not found"})  
        }
        cartuser.items=cartuser.items.filter(i=>i.productid.toString()!==productid.toString())
        await cartuser.save()
        res.status(200).json({message:"product deleted from cart"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}
const updatecartitems=async(req,res)=>{
    try {
       const middlewareidofuser= req.user.id
       const {quantity}=req.body
       const productid=req.params.productid
      const cartuser=await cartmodel.findOne({user:middlewareidofuser})
      if(!cartuser){
        res.status(404).json({message:"cartuser not found"})
      }
      const item=cartuser.items.find(i=>i.productid.toString()===productid.toString())
      if(!item){
        res.status(404).json({message:"product not found in the cart"})
      }
      item.quantity=quantity
     await cartuser.save()
      res.status(200).json({message:"quantity updated",data:cartuser},)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports={addtocart,getcart,removefromcart, updatecartitems}