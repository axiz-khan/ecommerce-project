const express = require("express");
const logoutRouter = express.Router();
const Token = require("../models/tokenModel.js");
const Analytical = require("../AdminModels/analyticalModel.js");

logoutRouter.get("/",async (req,res,next)=>{

    try{
        //extarct the refresh token from header
        console.log(req.cookies);

    const refreshToken=req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({ error: "No Token Found" });
    }
    res.clearCookie("refreshToken"); // Ensure secure matches environment
    //Delete the Token from database

    await Token.deleteOne({token:refreshToken});
    //Changing Analytical Model
    const analytics= await Analytical.findById("680a242169cbb758a5a9bce9");
    analytics.loginUser-=1;
    await analytics.save();

    res.status(200).json({message:"Logout Successfully"});


    }catch(err){
        res.status(500).json({error:err.message});s
    }

    
})

module.exports={logoutRouter};