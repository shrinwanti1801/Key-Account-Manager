const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');

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
router.post('/interactions', authz, roleAuthorization(['Admin', 'Manager']),validateCreateInteraction, createInteractionController);
router.put('/interactions/:id', authz, roleAuthorization(['Admin', 'Manager']),validateUpadteInteraction, updateInteractionController);
router.delete('/interactions/:id',authz, roleAuthorization(['Admin']), validateDeleteInteraction, deleteInteractionController);
router.get('/interactions/:id',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getInteractionByIdController);
router.get('/interactions', authz, roleAuthorization(['Admin', 'Manager', 'KAM']),getAllInteractionsController);
router.get('/interactions/restinter/:restaurant_id',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), validateRestaurantId,getAllInteractionsByRestaurantId);

module.exports = router;