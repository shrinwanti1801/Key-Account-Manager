
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');

// create Interaction, validate
const validateCreateInteraction=async (req,res,next)=>{
    try{
        // validation
        const { restaurant_id,
                interaction_date,
                details,
                order_placed }=req.body;


        //console.log(name,address);
        if(!restaurant_id || !interaction_date || !details || order_placed===undefined || order_placed===null){
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

// update Interaction , validation
const validateUpadteInteraction = (req, res, next) => {

    const { id } = req.params;

    const { restaurant_id,
            interaction_date,
            details,
            order_placed }=req.body;

    // Check if ID is provided
    if (!id) {
        const error = new AppError(["interaction ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // Check if data is provided
    if (!restaurant_id && !interaction_date && !details && (order_placed===undefined || order_placed===null)) {
        const error = new AppError(["All feilds are missing"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Delete Interaction, Validation
const validateDeleteInteraction = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        const error = new AppError(["Interaction ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Get All Interactions of a restaurant, Validation
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
    validateCreateInteraction,
    validateUpadteInteraction,
    validateDeleteInteraction,
    validateRestaurantId
}