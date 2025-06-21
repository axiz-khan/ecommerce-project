const express = require("express");
const productRouter = express.Router();
const Item = require("../models/itemModels.js");
const CommentSec = require("../models/commentModels.js"); // Import CommentSec model
const { itemReqCheck } = require("../util/itemReqCheck.js"); // Import itemReqCheck utility
const Analytical = require("../AdminModels/analyticalModel.js");
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




productRouter.get("/", async (req, res) => {
    try {

        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9").select("total_product stock_product stock_out_product");
        const products = await Item.find();
        res.status(200).json({ products, analytical });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

productRouter.get("/:id", async (req, res) => {
    try {
        console.log("I get Requets");
        const product = await Item.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Add New Product
productRouter.post("/", upload.single('file'), async (req, res) => {
    // console.log("Request body:", req.body); 

    try {
        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9");
        req.body.category = req.body.category.trim().toLowerCase();
        let category = await Category.findOne({ name: req.body.category }) // Find category by name and select only name and _id fields
        console.log("Category found:", category); // Log the found category for debugging



        if (category === null) {
            category = new Category({ name: req.body.category });

            category = await category.save(); // Save the new category

        }

        const validation = itemReqCheck(req.body);// Log the validation result for debugging


        if (!validation.success) {
            return res.status(400).json({ validate: validation.message });
        }

        const item = new Item(req.body);
        item.img_url = req.file.path.replace(/\\/g, "/");
        item.category = {
            id: category._id, // Assign the category ID to the item 
            name: category.name // Assign the category name to the item
        };

        category.items.push(item._id); // Add the item ID to the category's items array



        const comment = new CommentSec({
            productId: item._id,
            rate: 0
        });
        item.commentSec = comment._id;

        analytical.total_product += 1;
        analytical.stock_product += 1;

        await analytical.save();

        await item.save();

        await comment.save();

        await Category.findByIdAndUpdate(category._id, { items: category.items });

        res.status(201).json({ message: "Product added successfully", item });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update Product
productRouter.put("/:id", upload.single('file'), async (req, res) => {
    try {

        const validation = itemReqCheck(req.body);
        req.body.category = req.body.category.trim().toLowerCase();
        const existingCategory = await Category.findOne({ name: req.body.category });
        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9");
        const updateItem = await Item.findById(req.params.id);



        if (!validation.success) {
            return res.status(400).json({ message: validation.message });
        }


        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }

        // If a new image is provided, delete the old image and update the path
        if (req.file) {
            if (item.img_url) {
                fs.unlink(item.img_url, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                });
            }
            item.img_url = req.file.path.replace(/\\/g, "/"); // Update the image URL in the request body
        }

        if (req.body.category != updateItem.category.name) {

            let category = await Category.findOne({ name: req.body.category });
            console.log(category);
            if (category === null) {

                category = new Category({ name: req.body.category });

                category = await category.save(); // Save the new category

            }
            // Remove the item from the existing category's items array
            const existingCategory = await Category.findById(updateItem.category.id);
            if (existingCategory != null) {
                existingCategory.items = existingCategory.items.filter(
                    (itemId) => itemId.toString() !== updateItem._id.toString()
                );
                await Category.findByIdAndUpdate(existingCategory._id, existingCategory); // Save the updated existing category
                console.log("Existing Category : ", existingCategory);
            }

            // Add the item to the new category's items array only if it doesn't already exist
            if (!category.items.includes(updateItem._id)) {
                category.items.push(updateItem._id);
                await Category.findByIdAndUpdate(category._id, category);
            }

            // Update the item's category to the new category
            updateItem.category.name = category.name;
            updateItem.category.id = category._id;

            // Add the item to the new category's items array
            // category.items.push(updateItem._id);
            // await Category.findByIdAndUpdate(category._id, category); // Save the updated new category
            console.log("new Category", category);

        }

        updateItem.name = req.body.name;
        updateItem.selling_price = req.body.selling_price;
        updateItem.cost_price = req.body.cost_price;
        updateItem.description = req.body.description;
        updateItem.discount_percentage = req.body.discount_percentage;

        if (req.body.stock) {
            if (req.body.stock > updateItem.stock) {
                {
                    if (updateItem.stock == 0) {
                        analytical.stock_product += 1;
                        analytical.stock_out_product -= 1;
                    }
                }

            }
        } else if (req.body.stock == 0) {
            analytical.stock_product -= 1;
            analytical.stock_out_product += 1;
        }

        updateItem.stock = req.body.stock ;



        let result = await updateItem.save();
        await analytical.save();



        res.status(200).json({ message: "Product updated successfully", result });
    }
    catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete Product
productRouter.delete("/:id", async (req, res) => {
    try {
        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9");
        const item = await Item.findById(req.params.id);
        const category = await Category.findById(item.category.id);
        if (category != null) {
            category.items = category.items.filter(
                (itemId) => itemId.toString() !== item._id.toString()
            );
            await category.save() // Save the updated existing category

        }
        if (!item) {
            return res.status(404).json({ message: "Product not found" });
        }


        await CommentSec.findByIdAndDelete(item.commentSec);
        fs.unlink(item.img_url, (err) => {
            if (err) console.error("Error deleting image:", err);
        })
        await item.deleteOne();
        analytical.total_product -= 1;
        analytical.stock_product -= 1;
        await analytical.save();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error deleting product:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = { productRouter };
