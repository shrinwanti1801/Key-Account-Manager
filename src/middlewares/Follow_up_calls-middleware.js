
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');
const moment = require('moment');

// create FollowUpCalls, validate
const validateCreateFollowUpCalls=async (req,res,next)=>{
    try{

        // validation
        const { poc_id,
                restaurant_id,
                scheduled_date,
                call_frequency,
                status,
                notes }=req.body;
 

        var last_call_date = req?.body?.last_call_date;
        if(!last_call_date)
        last_call_date=null;

        console.log("first",req.body);
        //console.log(name,address);
        if(!restaurant_id || !poc_id || !scheduled_date || !call_frequency || !status || !notes){
            ErrorResponse.error=new AppError(["Fields are required"], 400);;
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }


        //console.log(req.body);

        //console.log(req.body);
        req.scheduled_date=moment.utc(scheduled_date).toISOString();
        if(last_call_date)
        req.last_call_date=moment.utc(last_call_date).toISOString();

        next();
    }
    catch(error){
        ErrorResponse.error=new AppError(["An error occurred during validation"], 500);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

// update FollowUpCalls , validation
const validateUpadteFollowUpCalls = (req, res, next) => {

    const { id } = req.params;

    const { poc_id,
            scheduled_date,
            call_frequency,
            status,
            notes,
            last_call_date
        }=req.body;

    // Check if ID is provided
    if (!id) {
        const error = new AppError(["FollowUpID ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    //console.log(last_call_date);
    // Check if data is provided
    if (!poc_id && !scheduled_date && !call_frequency && !status && !notes && !last_call_date) {
        const error = new AppError(["All feilds are missing"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Delete FollowUpCalls, Validation
const validateDeleteFollowUpCalls = (req, res, next) => {
    const { id } = req.params;
    
    if (!id) {
        const error = new AppError(["FollowUpCalls ID is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
};

// Get All FollowUpCalls of a restaurant, Validation
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

// Get All FollowUpCalls of a POCs, Validation
const validatePOcsId = (req, res, next) => {
    const { poc_id } = req.params;
    // console.log("Yes");
    // console.log(restaurant_id);
    if (!poc_id) {
        const error = new AppError(["poc_id is required"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    // console.log(poc_id);
    next();
};

// export all middlewares
module.exports={
    validateCreateFollowUpCalls,
    validateUpadteFollowUpCalls,
    validateDeleteFollowUpCalls,
    validateRestaurantId,
    validatePOcsId
}