
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');

// create Pocs validate
const validateCreatePocs=async (req,res,next)=>{
    try{
        // validation
        const {restaurant_id,name,role,phone,email}=req.body;

        //console.log(name,address);
        if(!name || !role || !phone || !email){
            ErrorResponse.error=new AppError(["Fields are required"], 400);;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        next();
    }
    catch(error){
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
        const error = new AppError(["Pocs ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // Check if data is provided
    if (!name && !role && !phone && !email && !restaurant_id) {
        const error = new AppError(["All feilds are missing"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Delete Pocs, Validation
const validateDeletePocs = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
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