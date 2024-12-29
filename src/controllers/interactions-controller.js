
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');

// importing services for interactions
const { createInteraction,
        getInteractionById,
        getAllInteractions,
        getInteractionsOfRestaurant,
        updateInteraction,
        deleteInteraction
     } = require('../services/interactions-services');


// Controller to create a new interaction
const createInteractionController = async (req, res) => {
    try {
        const data = req.body; // Get interaction data from the request body
        // console.log(data);
        const result = await createInteraction(data);
        SuccessResponse.message='Interactions created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a Interaction by ID
const getInteractionByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get Interaction ID from the URL parameter
        const result = await getInteractionById(id);
        SuccessResponse.message='Interactions retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Interactions
const getAllInteractionsByRestaurantId = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        //console.log(restaurant_id)
        const result = await getInteractionsOfRestaurant(restaurant_id);
        SuccessResponse.message='All Restaurant retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Interactions
const getAllInteractionsController = async (req, res) => {
    try {
        const result = await getAllInteractions();
        SuccessResponse.message='All Interactions retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to update a Interaction by ID
const updateInteractionController = async (req, res) => {
    try {
        const id = req.params.id; // Get Interaction ID from the URL parameter
        const data = req.body; // Get Interaction data from the request body
        const result = await updateInteraction(id, data);

        SuccessResponse.message='updateInteraction updated successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a Interaction by ID
const deleteInteractionController = async (req, res) => {
    try {
        const id = req.params.id; // Get Interaction ID from the URL parameter
        const result = await deleteInteraction(id);

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
    createInteractionController,
    getInteractionByIdController,
    getAllInteractionsByRestaurantId,
    getAllInteractionsController,
    updateInteractionController,
    deleteInteractionController
};
