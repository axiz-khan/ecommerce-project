const mongoose = require("mongoose");

const commentSecSchema=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Item"},
    rate:{type:Number},
    comments:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
            comment:{type:String},
            rating:{type:Number},
        }
    ]
})

const CommentSec=mongoose.model("CommentSec",commentSecSchema);

module.exports=CommentSec;