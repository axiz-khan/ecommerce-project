const express=require("express");
const Analytical=require("../AdminModels/analyticalModel.js")
const analyticalRouter=express.Router();

analyticalRouter.get("/",async (req,res)=>{
    
    
    //Query to fetch all the data in the Analytical model
    const Data = await Analytical.find().select('+loginUser +SinginUser +SingoutUser +total_orders +cancel_orders +process_order +total_product +stock_product +stock_out_product +lifetime_sales +lifetime_profit +total_cost');

    res.status(200).json(... Data);
})

// analyticalRouter.post("/",async (req,res)=>{
//     const analytical=new Analytical();
//     await analytical.save();
// })

module.exports= { analyticalRouter };