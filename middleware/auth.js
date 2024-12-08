const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")
dotenv.config()
const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message : "This action is not allowed"})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }

    catch(err){
        return res.status(401).json({message : "Invalid token"})
    }
}

module.exports = auth;