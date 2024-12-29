const express = require('express');
const router = express.Router();

// importing middlewares for orders
const {
    validateCreateOrder,
    validateUpadteOrder,
    validateDeleteOrder,
    validateRestaurantId
} = require('../../middlewares/orders-middleware');

// importing controllers for orders
const {
    createOrderController,
    getOrderByIdController,
    getAllOrdersByRestaurantId,
    getAllOrdersController,
    updateOrderController,
    deleteOrderController
} = require('../../controllers/orders-controller');

// Define routes
router.post('/orders', validateCreateOrder, createOrderController);
router.put('/orders/:id', validateUpadteOrder, updateOrderController);
router.delete('/orders/:id', validateDeleteOrder, deleteOrderController);
router.get('/orders/:id', getOrderByIdController);
router.get('/orders', getAllOrdersController);
router.get('/orders/Restorder/:restaurant_id', validateRestaurantId,getAllOrdersByRestaurantId);

module.exports = router;