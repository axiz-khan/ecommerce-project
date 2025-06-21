const express = require("express");
const userRouter = express.Router();
const { User } = require("../models/userModels.js");
const { authFunctionality } = require("../util/loginChecker.js");
const jwt = require("jsonwebtoken");
const AccessTokenGeneration = require("../util/jwtHandler.js");
const { tokenEmbansStoreMiddleware } = require("../middleware/jwtTokenMiddleware.js");
const Analytical = require("../AdminModels/analyticalModel.js");

userRouter.post("/singup", async (req, res, next) => {
    try {
        // console.log("inside signup", req.body);
        console.log("Singup got the request");
        console.log(req.body);
        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9");
        // return res.send("inside singup");
        const user = new User({ ...req.body });
        // user.role="admin";
        user.password = await authFunctionality.hashing(user.password);
        console.log(user);

        await user.save();

        req.body._id = user._id;
        req.body.role = user.role;
        req.body.password = user.password;

        analytical.loginUser += 1;
        analytical.SinginUser += 1;
        await analytical.save();

        return next();

    } catch (err) {
        console.log(err.MongooseError);
        next(err);
    }
}, tokenEmbansStoreMiddleware)

userRouter.post("/login", async (req, res, next) => {
    try {
        console.log("inside login", req.body);
        const analytical = await Analytical.findById("680a242169cbb758a5a9bce9");
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (await authFunctionality.check(req.body.password, user.password)) {
            req.body._id = user._id;
            req.body.role = user.role; // Include role in the request body

            analytical.loginUser += 1;
            analytical.save();

            return next ();
        }
        res.status(400).json({ message: "Password or username is incorrect" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}, tokenEmbansStoreMiddleware);


module.exports = { userRouter };