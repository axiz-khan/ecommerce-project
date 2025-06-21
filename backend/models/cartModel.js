const mongoose = require("mongoose");
const { User } = require("../models/userModels.js");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
            quantity:{type:Number,
                default:1           
            },
            price:{type:Number,
                default:0,
                required:true        
            },name:{
                type:String,
            },img_url:{
                type:String,
            }
        }

    ],
    totalItem:{type:Number,required:true,default:0},
    totalprice:{type:Number,
        default:0,
        required:true        
    }
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;