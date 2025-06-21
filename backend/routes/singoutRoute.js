const express = require("express");
const singoutRouter = express.Router();
const Token = require("../models/tokenModel.js");
const Analytical = require("../AdminModels/analyticalModel.js");
const{ User } = require("../models/userModels.js");

singoutRouter.get("/", async (req, res, next) => {
    try{   
        const analytics= await Analytical.findById("680a242169cbb758a5a9bce9");
        
        // Extract the refresh token from the cookies
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ error: "No Token Found" });
        }
        res.clearCookie("refreshToken", { httpOnly: true, secure: false }); // Ensure secure matches environment
        //Delete the Token from database        
        await Token.deleteOne({ token: refreshToken });
        //Delete the User from database
            
        await User.deleteOne({_id:req.user._id});
        //Delete the Analytical from database   
        analytics.loginUser--;
        analytics.SinginUser--;
        analytics.SingoutUser++;
        await analytics.save();
        res.status(200).json({ message: "Singout Successfully" });
        

    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

module.exports = { singoutRouter };