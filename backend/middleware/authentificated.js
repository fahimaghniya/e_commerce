const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
    const authHeader=req.headers.authorization
    if(!authHeader)
    {
        return res.status(401).json({message:"token manquant"})
    }
    try {
        const token=authHeader.split(" ")[1]  //split divise chaine de caractère ou bien un tableau//
        const decoded=jwt.verify(token,process.env.accesskey) //verify decoder le token 
//extraction de l'id de l'utilisateur depuis le token//
req.user=decoded
console.log(decoded)
next()
    } catch (error) 
    {res.status(403).json({message:"token invalide"})
        
    }
}