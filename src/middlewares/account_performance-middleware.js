
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');

// create Account Performance, validate
const validateCreateAccountPerformance=async (req,res,next)=>{
    try{
        // get data from req's body
        const { restaurant_id,
                order_value }=req.body;

        // validation
        if(!restaurant_id || !order_value){
            ErrorResponse.error=new AppError(["restaurant_id and order_value are required"], 400);;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
    }
    catch(error){
        ErrorResponse.error=new AppError(["An error occurred during validation"], 500);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


// Delete Account_performance, Validation
const validateDeleteAccountPerformance = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        const error = new AppError(["Account_performance ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Get All Account_performance of a restaurant, Validation
const validateRestaurantId = (req, res, next) => {
    const { restaurant_id } = req.params;
    // console.log("Yes");
    // console.log(restaurant_id);
    if (!restaurant_id) {
        const error = new AppError(["restaurant_id is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};


// export all middlewares
module.exports={
    validateCreateAccountPerformance,
    validateDeleteAccountPerformance,
    validateRestaurantId
}