const express = require('express');
const router = express.Router();

// importing middlewares for FollowUpCalls
const {
    validateCreateFollowUpCalls,
    validateUpadteFollowUpCalls,
    validateDeleteFollowUpCalls,
    validateRestaurantId,
    validatePOcsId
} = require('../../middlewares/Follow_up_calls-middleware');

// importing controllers for FollowUpCalls
const {
    createFollowUpCallsController,
    getFollowUpCallsByIdController,
    getAllFollowUpCallsByRestaurantId,
    getAllFollowUpCallsByPocsId,
    getAllFollowUpCallsController,
    updateFollowUpCallsController,
    deleteFollowUpCallsController
} = require('../../controllers/Follow_up_calls-controller');

// Define routes
router.post('/followupcalls', validateCreateFollowUpCalls, createFollowUpCallsController);
router.put('/followupcalls/:id', validateUpadteFollowUpCalls, updateFollowUpCallsController);
router.delete('/followupcalls/:id', validateDeleteFollowUpCalls, deleteFollowUpCallsController);
router.get('/followupcalls/:id', getFollowUpCallsByIdController);
router.get('/followupcalls', getAllFollowUpCallsController);
router.get('/followupcalls/restfollowupcalls/:restaurant_id', validateRestaurantId,getAllFollowUpCallsByRestaurantId);
router.get('/followupcalls/pocsfollowupcalls/:poc_id', validatePOcsId,getAllFollowUpCallsByPocsId);



module.exports = router;