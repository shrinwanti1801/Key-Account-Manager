const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');

// importing middlewares for Pocs
const {
    validateCreatePocs,
    validateUpdatePocs,
    validateDeletePocs,
    validateRestaurantId
} = require('../../middlewares/pocs-middleware');

// importing controllers for Pocs
const {
    createPocController,
    getPocByIdController,
    getAllPocsController,
    updatePocController,
    deletePocController,
    getAllPOCsByRestaurantId
} = require('../../controllers/pocs-controller');

// Define routes
router.post('/pocs',authz,roleAuthorization(['Admin', 'Manager']),  validateCreatePocs, createPocController);
router.put('/pocs/:id',authz,roleAuthorization(['Admin', 'Manager']),  validateUpdatePocs, updatePocController);
router.delete('/pocs/:id',authz,roleAuthorization(['Admin']),  validateDeletePocs, deletePocController);
router.get('/pocs/:id',authz,roleAuthorization(['Admin', 'Manager', 'KAM']), getPocByIdController);
router.get('/pocs',authz,roleAuthorization(['Admin', 'Manager', 'KAM']),getAllPocsController);
router.get('/pocs/RestPocs/:restaurant_id',authz,roleAuthorization(['Admin', 'Manager', 'KAM']),  validateRestaurantId,getAllPOCsByRestaurantId);

module.exports = router;