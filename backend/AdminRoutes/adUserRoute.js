const express = require("express");
const adUserRoute = express.Router();

const { User } = require("../models/userModels.js");
const Analytical = require("../AdminModels/analyticalModel.js");

adUserRoute.get("/", async (req, res) => {
    try {
        // Fetch all users with selected fields
        const users = await User.find().select("name _id address role");

        // Fetch analytics data
        const analytics = await Analytical.findOne().select("loginUser SinginUser SingoutUser");

        res.status(200).json({ users, analytics });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

adUserRoute.get("/:id", async (req, res) => {
    try {
        
        // Fetch all users with selected fields
        const users = await User.findById(req.params.id);

        // Fetch analytics data
        const analytics = await Analytical.findOne().select("loginUser SinginUser SingoutUser");

        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

adUserRoute.put("/:id", async (req, res) => {
    try{
        console.log("pinside put route")
        if(!req.body.role)
            return res.status(400).json({ message: "Role is required" });
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.role = req.body.role;
        await user.save();
        res.status(200).json({ message: "User role updated successfully" });

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

adUserRoute.delete("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const analytics = await Analytical.findById("680a242169cbb758a5a9bce9");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        analytics.loginUser -= 1;
        analytics.SinginUser -= 1;
        analytics.SingoutUser += 1;
        await analytics.save();
        // Delete the user  
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User deleted successfully" });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = {adUserRoute}; 