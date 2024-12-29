
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');

// importing services for resturants
const { createOrder,
        getOrderById,
        getAllOrders,
        updateOrder,
        deleteOrder,
        getOrdersOfRestaurant
    } = require('../services/orders-services');


// Controller to create a new order
const createOrderController = async (req, res) => {
    try {
        const data = req.body; // Get Pocs data from the request body
        const result = await createOrder(data);
        SuccessResponse.message='Order created successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get a Order by ID
const getOrderByIdController = async (req, res) => {
    try {
        const id = req.params.id; // Get Order ID from the URL parameter
        const result = await getOrderById(id);
        SuccessResponse.message='Order retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Orders
const getAllOrdersByRestaurantId = async (req, res) => {
    try {
        const restaurant_id = req.params.restaurant_id
        //console.log(restaurant_id)
        const result = await getOrdersOfRestaurant(restaurant_id);
        SuccessResponse.message='All Orders retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to get all Orders
const getAllOrdersController = async (req, res) => {
    try {
        const result = await getAllOrders();
        SuccessResponse.message='All Orders retrieved successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to update a Order by ID
const updateOrderController = async (req, res) => {
    try {
        const id = req.params.id; // Get Order ID from the URL parameter
        const data = req.body; // Get Order data from the request body
        const result = await updateOrder(id, data);

        SuccessResponse.message='Orders updated successfully';
        SuccessResponse.data=result;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = new AppError([`${error.message || 'Internal Server Error'}`], error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

// Controller to delete a order by ID
const deleteOrderController = async (req, res) => {
    try {
        const id = req.params.id; // Get Order ID from the URL parameter
        const result = await deleteOrder(id);

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
    createOrderController,
    getOrderByIdController,
    getAllOrdersByRestaurantId,
    getAllOrdersController,
    updateOrderController,
    deleteOrderController
};
