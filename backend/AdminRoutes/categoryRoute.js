const express = require("express");
const categoryRouter = express.Router();
const Category = require("../models/categoryModel.js"); // Import Category model  

categoryRouter.get("/", async (req, res) => {
    try {
        console.log("I get Requets");
        const categories = await Category.find().select("name") ;
        console.log("Categories:", categories); // Log the fetched categories
        res.status(200).json(categories); // Send the categories as a response
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { categoryRouter };

