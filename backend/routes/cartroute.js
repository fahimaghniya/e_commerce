const express=require("express")
const { addtocart, getcart, removefromcart, updatecartitems } = require("../controllers/cartcontroller")
const authentificated = require("../middleware/authentificated")
const router=express.Router()
router.post("/addtocart",authentificated,addtocart)
router.get("/getusercart",authentificated,getcart)
router.delete("/deleteproductfromcart/:productid",authentificated,removefromcart)
router.put("/updatecartitems/:productid",authentificated, updatecartitems)
module.exports=router