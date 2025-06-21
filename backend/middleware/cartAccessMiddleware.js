const Cart = require("../models/cartModel");
const cartAccessMiddleware = (req, res, next) => {
    //this function check if access header exist or not by accessing req.user field which is added by authentication and 
    //If not exist than user is not login or user accesstoken is expired
    
    if (!req.user)
        return res.status(400).json({ message: 'Login before processed' });
    next();
}
const isCartExist = async (req, res, next) => {

    console.log("Is cart Middleware");
    try {
        //Find Whether cart for user exist or not if not exist that create for 
        const find = await Cart.findOne({ userId: req.user._id });
      
        if (!find) {
            
            const cart = new Cart({
                userId: req.user._id,
            })
            let savecart = await cart.save();
            //embebeded the cartId to req.user.cartId
            req.user.cartId = savecart._id;
            return next();
        }
        else {
            
            req.user.cartId = find._id;
        }

       return next();

    } catch (err) {
        console.error("Error in isCartExist middleware:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { cartAccessMiddleware, isCartExist }