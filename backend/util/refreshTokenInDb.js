const Token=require("../models/tokenModel.js");
//When request comes in authCheck it send the req here and this fucntion check if token exist in database or not if token don't exist in database
//it will return false if it exist it return true 

const refreshTokeninDd=async (req)=>{
    
    if(await Token.findOne({token:req.cookies.refreshToken})){
        return true;
    }else{
        return false;
    }
}

module.exports={refreshTokeninDd};