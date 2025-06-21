const express = require("express");
const orderRouter = express.Router();
const { User } = require("../models/userModels.js");
const { Order } = require("../AdminModels/orderModel.js");
const Analytical = require("../AdminModels/analyticalModel.js");
const Cart = require("../models/cartModel.js");
const Item = require("../models/itemModels.js");
const { loginCheck } = require("../middleware/authenticationMiddleware.js");
const { isItemExist } = require("../util/isItemExist.js");
// const {Order} = require("../AdminModels/orderModel.js");


//Route for user to the order page

orderRouter.get("/user", loginCheck, async (req, res) => {
  try{

    console.log("User ID:", req.user._id); // Debugging line
    const order = await Order.find({ userId: req.user._id }).sort({ date: -1 });
    console.log("Fetched orders:", order); // Debugging line
    res.status(200).json(order);

  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
})


//User First Time click on order it shows the user basic details
orderRouter.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("name email address");
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.itemId");
    const { iscart, product_id } = req.body;

    let products = [];

    if (iscart === "true") {


      // Check if cart exists and has items
      if (cart && cart.items.length > 0) {
        products = cart.items.map(item => ({
          name: item.itemId?.name,
          quantity: item.quantity,
          price: item.itemId?.price,
        }));

      } else {
        return res.status(404).json({ error: "Cart is empty or not found." });
      }
    } else if (product_id) {
      const product = await Item.findById(product_id);
      if (product) {
        products.push({
          name: product.name,
          price: product.price,
          description: product.description
        });
      } else {
        return res.status(404).json({ error: "Product not found." });
      }
    } else {
      return res.status(400).json({ error: "Missing 'iscart' or 'product_id' query parameter." });
    }



    if (!user.address || user.address.length === 0) {
      return res.status(200).json({
        user,
        products,
        addError: "Please enter the address then proceed further"
      });
    } else {
      return res.status(200).json({
        user,
        products,
        addSelect: "Please select the address"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

orderRouter.post("/", loginCheck, async (req, res) => {
  try {
    // console.log("order body",req.body);
    //Fetching and extracting the usefull information from the body of request 
    const analytics = await Analytical.findById("680a242169cbb758a5a9bce9");
    
    const user = await User.findById(req.user._id).select("name email address");
    console.log("user", user);
    
    // const cart = await Cart.findOne({ userId: req.user._id });
    const { isCart, cartItems,productData } = req.body;

    if (isCart) {
        console.log("Request body is cart");
     

      const prvCart = await Cart.findById(cartItems._id);
      if (!prvCart || prvCart.items.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }


      if (prvCart) {
        
        prvCart.totalprice = 0;
        prvCart.totalItem = 0;




        for (let item of cartItems.items) {


          let result = await isItemExist(item.itemId);

          if (result.success == false) {


            res.status(400).json("Item Not Exist");
          }
          if (item.quantity > result.stock) {

            return res.status(400).json("Item Quantity is more than stock");
          }
          prvCart.totalItem = prvCart.totalItem + item.quantity;

          prvCart.totalprice = prvCart.totalprice + (item.quantity * result.itemdata.selling_price);
        }



        // prvCart.totalItem = totalitem;
        // prvCart.totalprice = totalprice;

        prvCart.items = cartItems.items;

        await prvCart.save();

        // console.log("cart result", result);


      }
      

      // Create the order
      const order = new Order({
        userId: user._id,
        name: user.name,
        address: user.address,
        price: prvCart.totalprice,
        items: cartItems.items.map(item => ({
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
          name: item.name
        }))
      });
      // console.log("order", order);
      for (let item of order.items) {
        const itemData = await Item.findById(item.itemId);
        // console.log("itemData", itemData);  
        if (itemData) {
          itemData.stock -= item.quantity;
          analytics.total_orders += 1;
          analytics.process_order += 1;
          analytics.lifetime_sales += itemData.selling_price * item.quantity;
          analytics.lifetime_profit += ((itemData.selling_price - itemData.cost_price) * item.quantity);
          analytics.total_cost += itemData.cost_price * item.quantity;

          if (itemData.stock <= 0) {
            analytics.stock_out_product += 1;
          }
          await itemData.save();
        }
      }
      await order.save();
      await analytics.save();

      // Clear the cart
      prvCart.items = [];
      prvCart.totalItem = 0;  
      prvCart.totalprice = 0;
      await prvCart.save();
      return res.status(200).json({ message: "Order placed successfully from cart." });

    } else {

      // console.log("Request body is not cart", productData);

      if(!productData) {
        console.log("not a productData activeted");
        return res.status(400).json({ error: "Product data is required." });
      }

      const user = await User.findById(req.user._id).select("name email address");
      const order = new Order({
        userId: user._id,
        name: user.name,
        address: user.address,
        price: productData.items.selling_price*req.body.quantity,
        items: [
          {
            itemId: productData.items._id,
            quantity: req.body.quantity,
            price: productData.items.selling_price,
            name: productData.items.name
          }
        ]
      })

      
      const itemData = await Item.findById(productData.items._id);
      console.log("itemData", itemData);
      
      if(itemData.stock-req.body.quantity<=0) {
        return res.status(400).json({ error: "Item Quantity is more than stock" });
      }
      if (itemData) {

        console.log("itemData with in if(itemData)");
        itemData.stock -= req.body.quantity;
        analytics.total_orders += 1;
        analytics.process_order += 1;
        analytics.lifetime_sales += productData.items.selling_price * req.body.quantity;
        analytics.lifetime_profit += ((productData.items.selling_price - productData.items.cost_price) * req.body.quantity);
        analytics.total_cost += productData.items.cost_price * req.body.quantity;

        if (itemData.stock == 0) {
          analytics.stock_out_product += 1;
        }
        
      }

      await itemData.save();
      await order.save();
      await analytics.save();

      res.status(200).json({ message: "Order placed successfully." });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });

  }
});
// orderRouter.post("/", loginCheck, async (req, res) => {
//   try {

//          const analytics=await Analytical.findById("680a242169cbb758a5a9bce9");
//         //check if the address is exist in the body of request


//         if(!req.body.address)
//             res.status(400).json({error:"Please Enter Address"});
//         else{
//             const user = await User.findById(req.user._id).select("name email address");

//             if (req.body.iscart === "true") {
//                 const cart = await Cart.findOne({ userId: req.user._id }).populate("items.itemId");

//                 if (!cart || cart.items.length === 0) {
//                     return res.status(400).json({ error: "Cart is empty" });
//                 }

//                 let orderItems = [];
//                 let totalPrice = 0;
//                 let totalProfit = 0;
//                 let totalCost = 0;
//                 let outOfStockCount = 0;

//                 for (const cartItem of cart.items) {
//                     const item = cartItem.itemId;

//                     if (!item || item.stock < cartItem.quantity) {
//                         return res.status(400).json({ error: `Item ${item?.name || "unknown"} is out of stock or insufficient quantity.` });
//                     }

//                     // Add item to order
//                     orderItems.push({
//                         itemId: item._id,
//                         quantity: cartItem.quantity,
//                         price: item.price,
//                         name: item.name
//                     });

//                     // Adjust stock
//                     item.stock -= cartItem.quantity;
//                     if (item.stock <= 0) {
//                         outOfStockCount += 1;
//                     }

//                     // Compute analytics
//                     const itemTotal = item.selling_price * cartItem.quantity;
//                     totalPrice += itemTotal;
//                     totalProfit += (item.selling_price - item.actual_price) * cartItem.quantity;
//                     totalCost += item.actual_price * cartItem.quantity;

//                     await item.save();
//                 }

//                 // Create the order
//                 const order = new Order({
//                     userId: req.user._id,
//                     name: user.name,
//                     address: req.body.address,
//                     price: totalPrice,
//                     items: orderItems
//                 });

//                 // Update analytics
//                 analytics.total_orders += 1;
//                 analytics.process_order += 1;
//                 analytics.lifetime_sales += totalPrice;
//                 analytics.lifetime_profit += totalProfit;
//                 analytics.total_cost += totalCost;
//                 analytics.stock_out_product += outOfStockCount;

//                 // Clear the cart
//                 cart.items = [];
//                 cart.totalItem = 0;
//                 cart.totalprice = 0;

//                 await cart.save();
//                 await order.save();
//                 await analytics.save();


//                 return res.status(200).json({ message: "Order placed successfully from cart. Cancel within 24 hours." });
//             }

//         else{
//             const item=await Item.findById(req.body.product_id);

//             const order=new Order({
//                 userId:req.user._id,
//                 name:user.name,
//                 address:req.body.address,
//                 price:item.selling_price,
//                 items:[
//                     {
//                         itemId:item._id,
//                         quantity:1,
//                         price:item.price,
//                         name:item.name
//                     }
//                 ]
//             })
//             item.stock=item.stock-order.items[0].quantity;
//             analytics.total_order+=1;
//             analytics.lifetime_sales+=item.selling_price;
//             analytics.lifetime_profit+=item.selling_price-item.actual_price;
//             analytics.total_cost+=item.actual_price;
//             analytics.process_order+=1;
//             if(item.stock<=0)
//                 analytics.stock_out_product+=1;


//             await item.save();
//             await order.save();
//             await analytics.save();

//             res.status(200).json({ message:"Order Placeced SuccessFully Cancel Within 24 Hours"});



//         }
//     }  
//   } catch (error) {
//     res.status(400).json({ error: "Its not you Its Us" });
//   }

// })





module.exports = { orderRouter };