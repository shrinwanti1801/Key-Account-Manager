
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');

// importing services for FollowUpCalls
const { createFollowUpCalls,
        getFollowUpCallsById,
        getAllFollowUpCalls,
        getFollowUpCallsOfRestaurant,
        updateFollowUpCalls,
        deleteFollowUpCalls,
        getFollowUpCallsOfPoc
     } = require('../services/Follow_up_calls-services');


// Controller to create a new FollowUpCalls
const createFollowUpCallsController = async (req, res) => {
    try {
        const data = req.body; // Get follow_up_calls data from the request body
        //console.log(data);
        const result = await createFollowUpCalls(data);
        SuccessResponse.message='FOllowUpCalls created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a FollowUpCalls by ID
const getFollowUpCallsByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get FollowUpCalls ID from the URL parameter
        const result = await getFollowUpCallsById(id);
        SuccessResponse.message='FollowUpcalls retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all FollowUpCalls
const getAllFollowUpCallsByRestaurantId = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        // console.log(restaurant_id)
        const result = await getFollowUpCallsOfRestaurant(restaurant_id);
        SuccessResponse.message='All FollowUpCalls retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all FollowUpCalls by pocsID
const getAllFollowUpCallsByPocsId = async (req, res) => {
    try {
        const poc_id = req.params.poc_id
        // console.log(poc_id)
        const result = await getFollowUpCallsOfPoc(poc_id);
        SuccessResponse.message='All FollowUpCalls retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all FollowUpCalls
const getAllFollowUpCallsController = async (req, res) => {
    try {
        const result = await getAllFollowUpCalls();
        SuccessResponse.message='All FollowUpCalls retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to update a FollowUpCalls by ID
const updateFollowUpCallsController = async (req, res) => {
    try {
        const id = req.params.id; // Get FollowUpCalls ID from the URL parameter
        const data = req.body; // Get FollowUpCalls data from the request body
        //console.log("sagar->",data);
        const result = await updateFollowUpCalls(id, data);

        SuccessResponse.message='FollowUpCalls updated successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a FollowUpCalls by ID
const deleteFollowUpCallsController = async (req, res) => {
    try {
        const id = req.params.id; // Get FollowUpCalls ID from the URL parameter
        const result = await deleteFollowUpCalls(id);

        SuccessResponse.message=result.message;
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// exporting all controllers
module.exports = {
    createFollowUpCallsController,
    getFollowUpCallsByIdController,
    getAllFollowUpCallsByRestaurantId,
    getAllFollowUpCallsByPocsId,
    getAllFollowUpCallsController,
    updateFollowUpCallsController,
    deleteFollowUpCallsController
};
