const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');

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
router.post('/followupcalls', authz, roleAuthorization(['Admin', 'Manager']), validateCreateFollowUpCalls, createFollowUpCallsController);
router.put('/followupcalls/:id', authz,roleAuthorization(['Admin', 'Manager']),validateUpadteFollowUpCalls, updateFollowUpCallsController);
router.delete('/followupcalls/:id',authz, roleAuthorization(['Admin']), validateDeleteFollowUpCalls, deleteFollowUpCallsController);
router.get('/followupcalls/:id',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getFollowUpCallsByIdController);
router.get('/followupcalls',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getAllFollowUpCallsController);
router.get('/followupcalls/restfollowupcalls/:restaurant_id',authz, roleAuthorization(['Admin', 'Manager', 'KAM']), validateRestaurantId,getAllFollowUpCallsByRestaurantId);
router.get('/followupcalls/pocsfollowupcalls/:poc_id', authz, roleAuthorization(['Admin', 'Manager', 'KAM']),validatePOcsId,getAllFollowUpCallsByPocsId);



module.exports = router;