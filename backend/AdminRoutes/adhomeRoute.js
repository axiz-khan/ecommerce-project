const express = require("express");
const Home = require("../models/homeModel.js");
const adhomeRouter = express.Router();
const Category = require("../models/categoryModel.js"); // Import Category model

const multer = require('multer');
const path = require('path');

const fs = require("fs"); // Import fs module for file operations



// Set storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads folder at root
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // unique name + original extension
    }
});

const upload = multer({ storage: storage });

adhomeRouter.get("/", async (req, res) => {
    try{
        const home=await Home.findById("68139236576178c5669bcede");
        let categories=await Category.find().select("name");
        let existingCategories = {}

        for(let i=0;i<home.category.length;i++){
            existingCategories[`${i}`] =await Category.findById(home.category[i].id) .populate({
                path: "items", // Path to the field to populate
                select: "name selling_price img_url rate", // Fields to include
            }); 
        }
        categories=categories.map((category)=>{
            return category.name;
        });
        res.status(200).json({home,categories,existingCategories}); 
    }catch(err){
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }

})

adhomeRouter.put("/", upload.single('file'), async (req, res) => {
    try {

        console.log("Request body:", req.body); // Log the request body for debugging
        console.log("Request file:", req.file); // Log the uploaded file for debugging
        const home=await Home.findById("68139236576178c5669bcede");
        console.log("Home:", home); // Log the fetched home items
        req.body.categories = JSON.parse(req.body.categories);
        req.body.banner = JSON.parse(req.body.banner);
        console.log("Request body:", req.body); // Log the request body for debugging   
        console.log("Request file",req.file);

        for (let i = 0; i < home.banner.length; i++) {
        
        
            // Check if the current banner image URL is included in req.body.banner
            if (!req.body.banner.includes(home.banner[i].img_url)) {
                
                fs.unlink(home.banner[i].img_url, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${home.banner[i].img_url}:`, err);
                    } else {
                        console.log("Deleted file:");
                    }
                });
        
                // Remove the banner object from the home.banner array
                home.banner.splice(i, 1);
                i--; // Adjust the index after removing an element
            }
        }

        for(let i=0;i<req.body.categories.length;i++){
            if(home.category.length<=i){
                const category = await Category.findOne({ name: req.body.categories[i] });
                console.log("Category found:", category); // Log the found category for debugging
                home.category.push({name:category.name,
                    id:category._id});

            }
            if(!req.body.categories.includes(home.category[i].name)){
                home.category.splice(i,1);
                
                const category = await Category.findOne({ name: req.body.categories[i] });
                home.category.push({name:category.name,
                    id:category._id});
                
            }
        }

        if(req.file){
        
            home.banner.push({img_url:req.file.path.replace(/\\/g, "/")});

        }
        console.log("Home after update:", home); // Log the updated home items

        await Home.findByIdAndUpdate("68139236576178c5669bcede", home, { new: true });
        res.status(200).json({ message: "Home items updated successfully" });



        


    } catch (err) {
        console.error("Error adding home item:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = { adhomeRouter };