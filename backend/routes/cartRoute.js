const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cartModel.js");
const Item = require("../models/itemModels.js");
const { isCartExist } = require("../middleware/cartAccessMiddleware.js");
const { isItemExist } = require("../util/isItemExist.js");

require('dotenv').config();

// cartRouter.use(isCartExist);

//Route To Add New Item
// cartRouter.get("/", (req, res) => {
//     res.send(req.user);
// })
cartRouter.get("/", isCartExist, async (req, res) => {

    
    try{

        console.log("Cart ID:", req.user.cartId); // Log the cart ID for debugging
        const cart = await Cart.findById(req.user.cartId); // Populate item details
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);

    }catch(err){
        console.error("Error in cartRouter.get:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
cartRouter.put("/:id", isCartExist, async (req, res) => {
    let item = await isItemExist(req.params.id);

    console.log("Cart put get the request");

    try {
        // console.log("Item ID:", req.params.id); // Log the item ID for debugging
        // console.log("Item Details:", item); // Log the item details for debugging
         if (item.success) {
             const size = Number(req.query.size) || 1;
             const cart = await Cart.findById(req.user.cartId);

            //  console.log("cart",cart);
            //  console.log("size",size);

           if (!cart) return res.status(404).json({ message: "Cart not found" });

             const itemIndex = cart.items.findIndex(item => item.itemId.equals(req.params.id));
             const itemDetails = await Item.findById(req.params.id); // Fetch item details from the database

            //  console.log("itemIndex",itemIndex);
            //  console.log("itemsDetails",itemDetails);

            if (!itemDetails) return res.status(404).json({ message: "Item not found" });

             const itemPrice = itemDetails.selling_price ; // Use selling_price or fallback to actual_price
            const itemName = itemDetails.name;
            const itemImgUrl = itemDetails.img_url; // Fetch the image URL from the database

            // console.log("itemPrice",itemPrice);
            // console.log("itemName",itemName);
            // console.log("itemImgUrl",itemImgUrl);

            if (itemIndex > -1) {
                const existingItem = cart.items[itemIndex];
                if(existingItem.quantity + size >itemDetails.stock)
                    throw new Error("Stock is not available");
                existingItem.quantity += size;
                existingItem.price = itemPrice; // Ensure the price is updated correctly
                cart.totalprice += itemPrice * size;
                
    } 
    else {  
                if(size > itemDetails.stock)
                    throw new Error("Stock is not available");
                cart.items.push({
                    itemId: req.params.id,
                    quantity: size,
                    price: itemPrice, // Assign the correct price here
                    name: itemName,
                    img_url: itemImgUrl // Add the image URL to the cart item
                });
                cart.totalprice += itemPrice * size;
             }

            cart.totalItem += size;
            await cart.save();
            res.status(200).json({ message: "Item added successfully" });
        } else {
            res.status(400).json({ message: "Item doesn't exist" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err });
    }
});

//Endpoint to either delete the no of item or entierly remove item
cartRouter.patch("/:id", isCartExist, async (req, res) => {
    try {

        
        
        const cart=req.body.cartItems;
    
        const prvCart=await Cart.findById(cart._id);
 

        if(prvCart){
            let totalprice=0;
            let totalitem=0;
            

            

            for(let item of cart.items){

            
                let result = await isItemExist(item.itemId);
                
                if(result.success == false){

                    
                    res.status(400).json("Item Not Exist");
                }
                if(item.quantity>result.stock){
                    
                    return res.status(400).json("Item Quantity is more than stock");
                }
                totalitem=totalitem+item.quantity;

                totalprice=totalprice+(item.quantity*result.itemdata.selling_price);
            }

        

            prvCart.totalItem=totalitem;
            prvCart.totalprice=totalprice;

            prvCart.items=cart.items;

            const result=await prvCart.save();

            res.status(200).json(result);

            
        }
    } catch (err) {
        //if any error ocuure we send 500 status code with error occured 
        res.status(500).json({ message: "error occured", err: err });
    }

})


module.exports = { cartRouter };