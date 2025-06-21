const express = require("express");
const itemRouter = express.Router();
const Item = require("../models/itemModels.js");
const CommentSec = require("../models/commentModels.js");
const {itemReqCheck}=require("../util/itemReqCheck.js");
const Category = require("../models/categoryModel.js");
require('dotenv').config();
const Analytical = require("../AdminModels/analyticalModel.js");

//Route To Get All Items
itemRouter.get("/",async (req,res)=>{
    try{
        const category = await Category.find().populate("items");
        res.status(200).json(category);
    }catch(err){
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//To get All Items
itemRouter.get("/:id", async (req, res, next) => {
    try {
        const items = await Item.findById(req.params.id).populate("commentSec");
        const category = await Category.findOne({name:items.category.name}).populate("items");
        if (!items) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({items,category});
        

    } catch (err) {
        next(err);
    }
})




module.exports = { itemRouter };