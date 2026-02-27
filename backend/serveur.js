/* const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Serveur Node.js en marche !");
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
}); */
//creation d'un serveur express//
const express= require("express")
const mongoose = require("mongoose")
const app= express()
const cors=require("cors")
app.use(cors())
app.use(express.json())//pour envoyer et recevoir des requetes format json//
app.get("/",function(req,res){
    res.send("hello fahima")
})
require ("dotenv").config()
mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=>console.log("connection à mongodb réussie")).catch(()=>console.log("connection failed"))
//creation de modèle dans mongodb//

//creation d'un nouveau produit//
//route express//
const productrouter=require("./routes/productroutes")
app.use("/product",productrouter)
const categorierouter=require("./routes/categorieroutes")
app.use("/categorie",categorierouter)
const subcategorierouter=require("./routes/subcategorieroute")
app.use("/subcategorie",subcategorierouter)
const userrouter=require("./routes/userroute")
app.use("/user",userrouter)
const cartrouter=require("./routes/cartroute")
app.use("/cart",cartrouter)
const orderrouter=require("./routes/orderroute")
app.use("/order",orderrouter)
app.use("/uploads",express.static("uploads"))  //pour rendre l'image public, on a ajouté cette ligne pour rendre l'image affiché dans le navigateur de frontend
const facturerouter=require("./routes/factureroute")
app.use("/facture",facturerouter)
app.listen(3001)
console.log("serveur is runnig on localhost:3001")
