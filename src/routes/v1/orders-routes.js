const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');

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
router.post('/orders',authz,roleAuthorization(['Admin', 'Manager']), validateCreateOrder, createOrderController);
router.put('/orders/:id', authz,roleAuthorization(['Admin', 'Manager']),validateUpadteOrder, updateOrderController);
router.delete('/orders/:id',authz,roleAuthorization(['Admin']), validateDeleteOrder, deleteOrderController);
router.get('/orders/:id',authz,roleAuthorization(['Admin', 'Manager', 'KAM']), getOrderByIdController);
router.get('/orders',authz,roleAuthorization(['Admin', 'Manager', 'KAM']), getAllOrdersController);
router.get('/orders/Restorder/:restaurant_id', authz,roleAuthorization(['Admin', 'Manager', 'KAM']),validateRestaurantId,getAllOrdersByRestaurantId);

module.exports = router;