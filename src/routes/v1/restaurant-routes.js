const express = require('express');
const router = express.Router();

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
router.post('/restaurants', validatecreateRes, createRestaurantController);
router.put('/restaurants/:id', validateUpdateRestaurant, updateRestaurantController);
router.delete('/restaurants/:id', validateDeleteRestaurant, deleteRestaurantController);
router.get('/restaurants/:id', getRestaurantByIdController);
router.get('/restaurants', getAllRestaurantsController);

module.exports = router;
