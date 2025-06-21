const mongoose = require("mongoose");
const Category = require("./categoryModel.js");

const homeSchema = new mongoose.Schema({
    category: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Category"/*, required: true*/ }, // Reference to Category ID
            name: { type: String/*, required: true*/ } // Category name
        }
    ],
    banner: [
            {
            img_url: { type: String, required: [false, "Image URL is required"] },
        }
    ]
});

const Home=mongoose.model("Home",homeSchema);

module.exports = Home;
