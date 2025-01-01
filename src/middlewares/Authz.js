const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './src/.env' });

const authz = async (req, res, next) => {
    try {
        const token = req?.body?.token || req?.cookies?.token || req.header("Authorization")?.replace("Bearer ","");
    
        //console.log(req?.body?.token);
        console.log(req?.cookies?.token);
        //console.log(req.header("Authorization")?.replace("Bearer ",""));

        //console.log("req.body ", req.body);
        //console.log("cookies ",req.cookies.token);
        //console.log("header ",req.header("Authorization").replace("Bearer ",""))
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token"
        });
    }
    next();
};



const roleAuthorization = (roles) => {
    return async (req, res, next) => {
        const userRole = req.user.role; // Assume req.user is set from auth middleware
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Access denied: You do not have the necessary permissions.',
            });
        }
        next(); // Proceed to next middleware/route handler
    };
};


module.exports={
    authz,
    roleAuthorization
}