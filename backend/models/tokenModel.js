const mongoose = require("mongoose");
const {User}=require("../models/userModels.js");

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
        index: true,
        immutable:true
    }, createdAt: {
         type: Date, 
         default: Date.now, 
         immutable: true 
    }, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const Token=mongoose.model("Token",tokenSchema);

module.exports=Token;