
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');

// importing services for resturants
const { createRestaurant, 
        getRestaurantById, 
        getAllRestaurants, 
        updateRestaurant, 
        deleteRestaurant 
    } = require('../services/restaurant-services');


// Controller to create a new restaurant
const createRestaurantController = async (req, res) => {
    try {
        const data = req.body; // Get restaurant data from the request body
        const result = await createRestaurant(data);
        SuccessResponse.message='Restaurant created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a restaurant by ID
const getRestaurantByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get restaurant ID from the URL parameter
        const result = await getRestaurantById(id);
        SuccessResponse.message='Restaurant retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all restaurants
const getAllRestaurantsController = async (req, res) => {
    try {
        const result = await getAllRestaurants();
        SuccessResponse.message='All restaurants retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to update a restaurant by ID
const updateRestaurantController = async (req, res) => {
    try {
        const id = req.params.id; // Get restaurant ID from the URL parameter
        const data = req.body; // Get restaurant data from the request body
        const result = await updateRestaurant(id, data);

        SuccessResponse.message='Restaurant updated successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a restaurant by ID
const deleteRestaurantController = async (req, res) => {
    try {
        const id = req.params.id; // Get restaurant ID from the URL parameter
        const result = await deleteRestaurant(id);

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
    createRestaurantController,
    getRestaurantByIdController,
    getAllRestaurantsController,
    updateRestaurantController,
    deleteRestaurantController
};
