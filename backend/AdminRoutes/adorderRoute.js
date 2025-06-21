const express = require("express");
const adorderRouter = express.Router();
const {Order} = require("../AdminModels/orderModel.js");
const Item=require("../models/itemModels.js");
const Analytical = require("../AdminModels/analyticalModel.js");

adorderRouter.get("/", async (req, res) => {
    try {
        const order = await Order.find().select("_id name address date price status date" );
        const analytics = await Analytical.findById("680a242169cbb758a5a9bce9").select("total_orders cancel_orders process_order");
        res.status(200).json({order,analytics});
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// adorderRouter.get("/:id", async (req, res) => {
//     try {
//         // console.log("Fetching order with ID:", req.params.id); // Debugging line
//         const order=await Order.findById(req.params.id);
//         console.log("Fetched order:", order.items[0].itemId); // Debugging line
//         if (!order) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         res.status(200).json(order);
//     } catch (err) {
//         console.error("Error fetching product:", err);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

adorderRouter.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Enrich each item with img_url from ItemModel
        const enrichedItems = await Promise.all(order.items.map(async (item) => {
            const itemDoc = await Item.findById(item.itemId).select("img_url");
            return {
                ...item.toObject(), // keep original fields like name, quantity, price
                img_url: itemDoc?.img_url || null
            };
        }));

        const orderWithImages = {
            ...order.toObject(),
            items: enrichedItems
        };

        res.status(200).json(orderWithImages);
    } catch (err) {
        console.error("Error fetching order with item images:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


adorderRouter.put("/:id", async (req, res) => {
    try{
         
        const analytics = await Analytical.findById("680a242169cbb758a5a9bce9");    
        
        const order=await Order.findById(req.params.id);
        
         if (!order) {
            return res.status(404).json({ message: "Product not found" });
         }
         if(order.status==="canceled"|| order.status==="deliver"){
             return res.status(400).json({ message: "Order already cancelled or delivered" });
         }
         order.status=req.body.status;
         console.log("Updated order:", order); // Debugging line
        if(order.status==="canceled"){
            analytics.cancel_orders+=1;
            analytics.process_order-=1;
            await analytics.save();
        }
        if(order.status==="deliver"){
            analytics.process_order-=1;
            analytics.total_orders+=1;
            await analytics.save();
        }
        let newOrder=await order.save();
    
        res.status(200).json({ message: "Order status updated successfully" });
    }catch(err){
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = {adorderRouter};
