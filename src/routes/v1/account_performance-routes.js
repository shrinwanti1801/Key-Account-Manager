const express = require('express');
const router = express.Router();

// importing middlewares for Account Performance
const {
    validateCreateAccountPerformance,
    validateDeleteAccountPerformance,
    validateRestaurantId
} = require('../../middlewares/account_performance-middleware');

// importing controllers for Account Performance
const {
    createAccountPerformanceController,
    getAccountPerformanceByIdController,
    getAllAccountPerformanceByRestaurantId,
    getAllAccountPerformanceController,
    deleteAccountPerformanceController,
} = require('../../controllers/account_performance-controller');

// Define routes
router.post('/accountPerformance', validateCreateAccountPerformance, createAccountPerformanceController);
router.delete('/accountPerformance/:id', validateDeleteAccountPerformance, deleteAccountPerformanceController);
router.get('/accountPerformance/:id', getAccountPerformanceByIdController);
router.get('/accountPerformance', getAllAccountPerformanceController);
router.get('/accountPerformance/rest/:restaurant_id', validateRestaurantId,getAllAccountPerformanceByRestaurantId);



module.exports = router;