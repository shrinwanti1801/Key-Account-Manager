const express = require('express');
const router = express.Router();
const { authz, roleAuthorization }=require('../../middlewares/Authz');

// importing middlewares for resturants
const {
  validatecreateRes,
  validateUpdateRestaurant,
  validateDeleteRestaurant,
} = require('../../middlewares/restaurant-middleware');

// importing controllers for resturants
const {
  createRestaurantController,
  getRestaurantByIdController,
  getAllRestaurantsController,
  updateRestaurantController,
  deleteRestaurantController,
} = require('../../controllers/restaurant-controller');

// Define routes
router.post('/restaurants',authz,roleAuthorization(['Admin', 'Manager']), validatecreateRes, createRestaurantController);
router.put('/restaurants/:id', authz,roleAuthorization(['Admin', 'Manager']), validateUpdateRestaurant, updateRestaurantController);
router.delete('/restaurants/:id',authz,roleAuthorization(['Admin']),  validateDeleteRestaurant, deleteRestaurantController);
router.get('/restaurants/:id', authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getRestaurantByIdController);
router.get('/restaurants', authz, roleAuthorization(['Admin', 'Manager', 'KAM']), getAllRestaurantsController);

module.exports = router;
