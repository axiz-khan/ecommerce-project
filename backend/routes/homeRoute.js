const express = require("express");
const homeRouter = express.Router();
const Home = require("../models/homeModel.js"); // Import Home model
const Category = require("../models/categoryModel.js"); // Import Category model

homeRouter.get("/", async (req, res) => {
    try{
        console.log("Fetching home data..."); // Log the request for debugging
        const home=await Home.findById("68139236576178c5669bcede");
        let existingCategories = {}
        for(let i=0;i<home.category.length;i++){
            existingCategories[`${i}`] =await Category.findById(home.category[i].id) .populate({
                path: "items", // Path to the field to populate
                select: "name selling_price img_url rate", // Fields to include
            }); 
        }
        res.status(200).json({home,existingCategories}); 
    }catch(err){

        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = {homeRouter};  
