
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// importing services for account performance
const { createAccountsPerformance,
        getAccountsPerformanceById,
        updateAccountsPerformance,
        deleteAccountsPerformance,
        getAllAccountsPerformance,
        getAllAccountsPerformanceByRestaurantId,
        getDataUsingStatusOfAccountPerformance
     } = require('../services/accounts_performance-services');


// Controller to create a new AccountPerformance
const createAccountPerformanceController = async (req, res) => {
    try {
        const data = req.body; // Get AccountPerformance data from the request body
        // console.log(data);
        const result = await createAccountsPerformance(data);
        SuccessResponse.message='Account Performance created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in createAccountPerformanceController`);
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a AccountsPerformance by ID
const getAccountPerformanceByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get AccountPerformance ID from the URL parameter
        const result = await getAccountsPerformanceById(id);
        SuccessResponse.message='AccountPerformance retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getAccountPerformanceByIdController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all AccountPerformance
const getAllAccountPerformanceByRestaurantId = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        //console.log(restaurant_id)
        const result = await getAllAccountsPerformanceByRestaurantId(restaurant_id);
        SuccessResponse.message='All AccountPerformance retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getAllAccountPerformanceByRestaurantId`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all AccountPerformance
const getAllAccountPerformanceController = async (req, res) => {
    try {
        const result = await getAllAccountsPerformance();
        SuccessResponse.message='All AccountPerformance retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in getAllAccountPerformanceController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a AccountPerformance by ID
const deleteAccountPerformanceController = async (req, res) => {
    try {
        const id = req.params.id; // Get AccountPerformance ID from the URL parameter
        const result = await deleteAccountsPerformance(id);

        SuccessResponse.message=result.message;
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        Logger.error(`Error in deleteAccountPerformanceController`);
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// exporting all controllers
module.exports = {
    createAccountPerformanceController,
    getAccountPerformanceByIdController,
    getAllAccountPerformanceByRestaurantId,
    getAllAccountPerformanceController,
    deleteAccountPerformanceController,
};
