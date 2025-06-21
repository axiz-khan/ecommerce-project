const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: { type: String, required: [true,"name of the item is missing"] },
    selling_price: { type: Number, required: [true, "Price is missing"], min : [100,"Price can not be less than 100"] },
    cost_price:{type:Number,required:[true,"Cost Price of Product is required"]
        /*validate:{
            validator:function(value)
        }*/
    },
    discount_percentage: {
        type: Number,
        validate:{
            validator:function(value){
                return value <50;
            },
            message:props=>`Discounted price (${props.value}) cannot be more than 50% of the original price`
        }
    },
    rate: { type: Number,default:0},
    stock: { type: Number, required: true, default: 1 },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    img_url: { type: String, required: [true,"Image URL is required"] },
    discription: { type: String, required:[true,"Discription is required"] },
    commentSec:{type:mongoose.Schema.Types.ObjectId,ref:"CommentSec"},
    category: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Category"/*, required: true*/ }, // Reference to Category ID
        name: { type: String/*, required: true*/ } // Category name
    }
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;