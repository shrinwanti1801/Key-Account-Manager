const express = require('express');
const router = express.Router();

// importing middlewares for Interactions
const {
    validateCreateInteraction,
    validateUpadteInteraction,
    validateDeleteInteraction,
    validateRestaurantId
} = require('../../middlewares/interactions-middleware');

// importing controllers for Interactions
const {
    createInteractionController,
    getInteractionByIdController,
    getAllInteractionsByRestaurantId,
    getAllInteractionsController,
    updateInteractionController,
    deleteInteractionController
} = require('../../controllers/interactions-controller');

// Define routes
router.post('/interactions', validateCreateInteraction, createInteractionController);
router.put('/interactions/:id', validateUpadteInteraction, updateInteractionController);
router.delete('/interactions/:id', validateDeleteInteraction, deleteInteractionController);
router.get('/interactions/:id', getInteractionByIdController);
router.get('/interactions', getAllInteractionsController);
router.get('/interactions/restinter/:restaurant_id', validateRestaurantId,getAllInteractionsByRestaurantId);

module.exports = router;