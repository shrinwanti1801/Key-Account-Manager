const express = require('express');
const router = express.Router();

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
router.post('/pocs', validateCreatePocs, createPocController);
router.put('/pocs/:id', validateUpdatePocs, updatePocController);
router.delete('/pocs/:id', validateDeletePocs, deletePocController);
router.get('/pocs/:id', getPocByIdController);
router.get('/pocs', getAllPocsController);
router.get('/pocs/RestPocs/:restaurant_id', validateRestaurantId,getAllPOCsByRestaurantId);

module.exports = router;