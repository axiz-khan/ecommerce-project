const mongoose = require('mongoose');

const userSchema1 = new mongoose.Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId,
        auto:true,
    }, name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    }, email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "Email is already in use"],
        index: true,
    }, password: {
        type: String,
        required: [true, "password is required"],
    }, role: {
        type: String,
        required: true,
        default: "user",
        enum: ["admin", "user"]
    }, createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
        select: true,
    },
    address:
        {
            type:String,
            
        }
    
})

const User=mongoose.model("User",userSchema1);

module.exports={User};