
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// importing services for resturants
const { createPocs, 
        getPocsById, 
        getAllPocs, 
        updatePocs, 
        deletePocs,
        getPocsOfRestaurant
    } = require('../services/pocs-services');


// Controller to create a new restaurant
const createPocController = async (req, res) => {
    try {
        const data = req.body; // Get Pocs data from the request body
        const result = await createPocs(data);
        SuccessResponse.message='Pocs created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in createPocController`);
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a Pocs by ID
const getPocByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get Pocs ID from the URL parameter
        const result = await getPocsById(id);
        SuccessResponse.message='Pocs retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getPocByIdController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Pocs
const getAllPOCsByRestaurantId = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        const result = await getPocsOfRestaurant(restaurant_id);
        SuccessResponse.message='All Pocs retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getAllPOCsByRestaurantId`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Pocs
const getAllPocsController = async (req, res) => {
    try {
        const result = await getAllPocs();
        SuccessResponse.message='All Pocs retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getAllPocsController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to update a Pocs by ID
const updatePocController = async (req, res) => {
    try {
        const id = req.params.id; // Get restaurant ID from the URL parameter
        const data = req.body; // Get restaurant data from the request body
        const result = await updatePocs(id, data);

        SuccessResponse.message='Pocs updated successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in updatePocController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a Pocs by ID
const deletePocController = async (req, res) => {
    try {
        const id = req.params.id; // Get Pocs ID from the URL parameter
        const result = await deletePocs(id);

        SuccessResponse.message=result.message;
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in deletePocController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// exporting all controllers
module.exports = {
    createPocController,
    getPocByIdController,
    getAllPocsController,
    updatePocController,
    deletePocController,
    getAllPOCsByRestaurantId
};
