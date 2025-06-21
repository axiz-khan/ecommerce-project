const AccessTokenGeneration = require("../util/jwtHandler.js");

const adminAccessMiddleware = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    
    if (!req.user) {
        console.log("User not found in request object (AdminAccessMiddleWare)");    
        return res.status(401).json({  message: "Login Before Processed (AdminAccessMiddleWare)" });
    }

    const role = req.user.role;

    const adminChecker = (role, refreshToken) => {
        // Checking if the logged-in user's role is admin
        const tokenData = AccessTokenGeneration.tokenCheck(refreshToken);
        if (role === "admin" && refreshToken && tokenData.success && tokenData.data.role === "admin") {
            return true;
        } else {
            return false;
        }
    };

    if (adminChecker(role, refreshToken)) {
        
        next();
    } else {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { adminAccessMiddleware };
