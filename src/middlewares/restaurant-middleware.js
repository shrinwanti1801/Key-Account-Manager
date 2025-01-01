
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index')

// create resturant validate
const validatecreateRes=async (req,res,next)=>{
    try{
        // validation
        const {name,address}=req.body;

        //console.log(name,address);
        if(!name || !address){
            Logger.error(`name or address missing in validatecreateRes method`);
            ErrorResponse.error=new AppError(["Fields are required"], 400);;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
    }
    catch(error){
        Logger.error(`Error Occured in Create Resturant Validation`);
        ErrorResponse.error=new AppError(["An error occurred during validation"], 500);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// update resturant , validation
const validateUpdateRestaurant = (req, res, next) => {
    const { id } = req.params;
    const { name, address } = req.body;

    // Check if ID is provided
    if (!id) {
        const error = new AppError(["Restaurant ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // Check if data is provided
    if (!name && !address) {
        Logger.error(`name or address missing in validateUpdateRestaurant method`);
        const error = new AppError(["Fields 'name' or 'address' are required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Delete Resturant, Validation
const validateDeleteRestaurant = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        Logger.error(`Restaurant id is required in validateDeleteRestaurant Method`);
        const error = new AppError(["Restaurant ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// export all middlewares
module.exports={
    validatecreateRes,
    validateUpdateRestaurant,
    validateDeleteRestaurant
}