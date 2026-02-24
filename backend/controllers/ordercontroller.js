const cartmodel = require("../models/cartmodel")
const orderlinemodel = require("../models/orderlinemodel")
const ordermodel = require("../models/ordermodel")

const createorderfromcart=async(req,res)=>{      //commander les produits depuis le panier
    try {
        const userid=req.user.id
        const cartuser= await cartmodel.findOne({user:userid}).populate("items.productid")
        if(!cartuser||!Array(cartuser.items)){
            res.status(404).json({message:"cartuser not found"})
        }
        let total=0
        const neworder=await new ordermodel({user:userid,totalamounts:0})
        await neworder.save()
        for(i of cartuser.items){
            const totalprice=i.productid.price*i.quantity
            total+=totalprice
            const neworderline=await new orderlinemodel({product:i.productid._id,order:neworder._id,quantity:i.quantity})
            await neworderline.save()
        }
        neworder.totalamounts=total
        await neworder.save()
        cartuser.items=[]
        await cartuser.save()
        res.status(200).json({message:"order created succefully", data:neworder})

        //ne7sbou quantité*prix bch nasn3ou l'ordre
    } catch (error) {
       res.status(500).json({message:error.message})
    }
}
module.exports={createorderfromcart}