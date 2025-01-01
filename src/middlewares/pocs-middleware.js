
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// create Pocs validate
const validateCreatePocs=async (req,res,next)=>{
    try{
        // validation
        const {restaurant_id,name,role,phone,email}=req.body;

        //console.log(name,address);
        if(!name || !role || !phone || !email){
            Logger.error(`Name or Role or Phone or Email any of them missing in validateCreatePocs MiddleWare`);
            ErrorResponse.error=new AppError(["Fields are required"], 400);;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
    }
    catch(error){
        Logger.error(`An error occurred during validation in validateCreatePocs Method `)
        ErrorResponse.error=new AppError(["An error occurred during validation"], 500);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// update Pocs , validation
const validateUpdatePocs = (req, res, next) => {

    const { id } = req.params;

    const {restaurant_id,
           name,
           role,
           phone,
           email}=req.body;

    // Check if ID is provided
    if (!id) {
        Logger.error(`Pocs id missing in validateUpdatePocs MiddleWare`);
        const error = new AppError(["Pocs ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // Check if data is provided
    if (!name && !role && !phone && !email && !restaurant_id) {
        Logger.error(`There is no data to update in validateUpdatePocs Middleware`)
        const error = new AppError(["All feilds are missing"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Delete Pocs, Validation
const validateDeletePocs = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        Logger.error(`Pocs id missing in validateDeletePocs MiddleWare`);
        const error = new AppError(["Pocs ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Get All POCs, Validation
const validateRestaurantId = (req, res, next) => {
    const { restaurant_id } = req.params;
    // console.log("Yes");
    // console.log(restaurant_id);
    if (!restaurant_id) {
        Logger.error(`restaurant_id missing in validateRestaurantId MiddleWare`);
        const error = new AppError(["restaurant_id is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// export all middlewares
module.exports={
    validateCreatePocs,
    validateUpdatePocs,
    validateDeletePocs,
    validateRestaurantId
}