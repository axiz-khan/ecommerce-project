// const jwt = require("jsonwebtoken");
// const {Token}=require("../models/tokenModel");
const{refreshTokeninDd}=require("../util/refreshTokenInDb.js");
const AccessTokenGeneration=require("../util/jwtHandler");


const authCheck = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const refreshToken = req.cookies.refreshToken; 
    
    
    // Extract refresh token from cookies

    if (token && await refreshTokeninDd(req)) {
        
        const data = AccessTokenGeneration.tokenCheck(refreshToken);
        
        if (!data.success) {
            console.log("Invalid token in authCheck middleware");   
            return res.status(401).json({ message: "Invalid token" });
        }
        
        req.user = data.data;
    
        
     } //else if (refreshToken) {
    //     return res.status(401).json({ message: " Login Before Processed authenticationMiddleware" });
    // }
// Debugging line

    next();
};

const loginCheck=async(req,res,next)=>{
    
    if(!req.user)
        res.status(400).json({error:"login Before Processed"});
    next();
}

module.exports={authCheck,loginCheck};