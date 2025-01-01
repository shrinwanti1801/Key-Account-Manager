const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');


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
router.post('/accountPerformance',authz, roleAuthorization(['Admin', 'Manager']), validateCreateAccountPerformance, createAccountPerformanceController);
router.delete('/accountPerformance/:id',authz, roleAuthorization(['Admin']), validateDeleteAccountPerformance, deleteAccountPerformanceController);
router.get('/accountPerformance/:id', authz, roleAuthorization(['Admin', 'Manager', 'KAM']),getAccountPerformanceByIdController);
router.get('/accountPerformance',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getAllAccountPerformanceController);
router.get('/accountPerformance/rest/:restaurant_id',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), validateRestaurantId,getAllAccountPerformanceByRestaurantId);



module.exports = router;