const express=require("express");
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const Item=require("./models/itemModels.js");
const {itemRouter}=require("./routes/itemRoutes.js")
const {userRouter}=require("./routes/userRoutes.js");
const {refreshRouter}=require("./routes/refreshRoute.js");
const {logoutRouter}=require("./routes/logoutRoute.js");
const{cartRouter}=require("./routes/cartRoute.js");
const{orderRouter}=require("./routes/orderRoute.js");
const{commentRouter}=require("./routes/commentRoute.js");
const{analyticalRouter}=require("./AdminRoutes/analyticalRoute.js");
const {homeRouter}=require("./routes/homeRoute.js");
const {adUserRoute}=require("./AdminRoutes/adUserRoute.js");
const {productRouter}=require("./AdminRoutes/productRoute.js");
const {adorderRouter}=require("./AdminRoutes/adorderRoute.js");
const {singoutRouter}=require("./routes/singoutRoute.js");
const {categoryRouter}=require("./AdminRoutes/categoryRoute.js");
const {adhomeRouter}=require("./AdminRoutes/adhomeRoute.js");   
const {cartAccessMiddleware}=require("./middleware/cartAccessMiddleware.js");
const {adminAccessMiddleware}=require("./middleware/adminAccessMiddleware.js");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const app=express();
const {authCheck}=require("./middleware/authenticationMiddleware.js");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Allow credentials (cookies) to be sent
}));

app.use('/uploads', express.static('uploads'));
app.use(authCheck);

// app.use(express.urlencoded({ extended: true }));

app.use("/logout",logoutRouter);
app.use("/refresh",refreshRouter);
app.use("/items/auth",userRouter);
app.use("/product",itemRouter);
app.use("/home",homeRouter);
app.use("/cart",cartAccessMiddleware,cartRouter);
app.use("/shop/comments",commentRouter);
app.use("/order",cartAccessMiddleware,orderRouter);
app.use("/singout",singoutRouter);


//All the Admin Routes
app.use("/admin/analytics",adminAccessMiddleware,analyticalRouter);
app.use("/admin/user",adminAccessMiddleware,adUserRoute);
app.use("/admin/product",adminAccessMiddleware,productRouter);
app.use("/admin/order",adminAccessMiddleware,adorderRouter);
app.use("/admin/category",adminAccessMiddleware,categoryRouter);
app.use("/admin/home",adminAccessMiddleware,adhomeRouter);
//Test Routes
app.get("/test",(req,res)=>{
    res.send("Welcome to protected path");

})

//All Routes



//Root Route
app.get("/",(req,res)=>{
    res.send("Welcome to root");
});



// Central Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err : {}, // Show detailed error in development
    });
});


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.LINK);

  app.listen(process.env.PORT,()=>{
    console.log("server is listening to port = 8080");
})

}
