const { createsubcategorie,getallsubcategorie,getbyid,deletesubcategorie,updatesubcategorie} = require("../controllers/subcategoriecontroller")

const express=require ("express")
const router=express.Router()
router.post("/addsubcategorie",createsubcategorie)
router.get("/getallsubcategorie",getallsubcategorie)
router.get("/getbyid/:id",getbyid)
router.delete("/deletesubcategorie/:id",deletesubcategorie)
router.put("/updatesubcategorie/:id",updatesubcategorie)
module.exports=router