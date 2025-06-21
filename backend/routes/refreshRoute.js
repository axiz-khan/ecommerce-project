const express = require("express");
const refreshRouter = express.Router();
const Token = require("../models/tokenModel.js");

const AccessTokenGeneration=require("../util/jwtHandler.js");

require('dotenv').config();

refreshRouter.get("/",async (req,res)=>{
    try{
        //extarct the refresh token from header
    const refreshToken=req.cookies.refreshToken
    // const refreshToken=authheader && authheader.split("=")[1];

    //Check if token present in token database or not

       const find=await Token.findOne({ token:refreshToken})
       if(find){
        const data=AccessTokenGeneration.tokenCheck(refreshToken);
        //if data is present than generate new token
        if(data ){
            const accessToken=AccessTokenGeneration.accessTokenGeneration({_id:data.data._id,
                password:data.data.password,
                role:data.data.role});

                return res.status(200).json({accessToken});

        }}
         res.status(400).json({message:"Please login"});
        
       


    }catch(err){
        res.send(err);
    }

    
    // const accessToken=AccessTokenGeneration.accessTokenGeneration(user);
})

module.exports={refreshRouter};