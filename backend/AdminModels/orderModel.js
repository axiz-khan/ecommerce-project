const mongoose=require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
        name:{
            type:String,
            required:true,
        },
        address:{
            type:String,
        },
        date:{
            immutable: true,
            type: Date,
            default: Date.now,

        },
        price:{
            type:Number,
            required:true,
        },
        status:{
            type:String,
            required:true,
            default:"placed",
            enum: ["placed", "pending","canceled","deliver"]
        },
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
                    }
                }
        
            ],
       
})

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };