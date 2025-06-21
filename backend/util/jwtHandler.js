const jwt=require("jsonwebtoken");
// const Token=require("../models/tokenModel.js");

//Token model is created now we have to store refreshtoken in token model and aslo create a function that handle token send access token to client while store refresh token as cookies and implimenting the accesstoken generatiin method
// console.dir(Token);


const AccessTokenGeneration={
    accessTokenGeneration:(user)=>{
        const option={
            expiresIn: '60min'
        }
        
        
        return jwt.sign(user,process.env.PRIVATEKEY,option);
    },
    refreshTokenGeneration:(user)=>{
        
        const option={
            expiresIn:"1d"
        }
        return jwt.sign(user,process.env.PRIVATEKEY,option);
    },
    tokenCheck:(token)=>{
        try{
            const decode=jwt.verify(token,process.env.PRIVATEKEY);
            return {success:true,data:decode}
           }catch(err){
            return {success:false,err:err}
           }
    }

}

module.exports=AccessTokenGeneration;