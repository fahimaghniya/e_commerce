const express=require("express")
const authentificated = require("../middleware/authentificated")
const { createorderfromcart } = require("../controllers/ordercontroller")
const router=express.Router()
router.post("/createorderfromcart",authentificated,createorderfromcart)
module.exports=router