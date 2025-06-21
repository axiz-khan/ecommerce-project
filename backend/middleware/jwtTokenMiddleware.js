const AccessTokenGeneration = require("../util/jwtHandler.js");
const Token = require("../models/tokenModel.js");
const {User}=require("../models/userModels.js");

const tokenEmbansStoreMiddleware = async (req, res, next) => {

    //coustomized req
    try {

        //Generating accesstoken refrshtoken 
    
        const accestoken = AccessTokenGeneration.accessTokenGeneration(req.body);
        const refreshtoken = AccessTokenGeneration.refreshTokenGeneration(req.body);

        //create new token model and add userId and Token to it
        const token = new Token({
            token: refreshtoken,
            userId: req.body._id
        })

        //Saved the newly created token
        await token.save();

        //Adding refresh Token in header
    
        res.cookie("refreshToken", refreshtoken, {
            httpOnly: false,
            secure: true, // true in production
            sameSite: "none", // or "None" if cross-origin with credentials
            maxAge: 24 * 60 * 60 * 1000
        });
        

        //Sending access Token as json object
        
        // console.log("Access Token", accestoken,"req.body.role",req.body.role);    

        console.log("Resquest role",req.body.role);
         

        res.status(200).json({ accestoken: accestoken, role: req.body.role }); // Include role in the response

    } catch (err) {
        res.status(400).json({ message: err });
    }


}

async function test() {

    console.log()
}


module.exports = { tokenEmbansStoreMiddleware };