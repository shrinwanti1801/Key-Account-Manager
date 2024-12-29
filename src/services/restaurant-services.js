const { Restaurants } = require('../repositories/index');

// making an instance of resturant
const restaurants=new Restaurants();

// Service to create a new restaurant
const createRestaurant = async (data) => {
    try {
        const result = await restaurants.create(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a restaurant by ID
const getRestaurantById = async (id) => {
    try {
        const result = await restaurants.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all restaurants
const getAllRestaurants = async () => {
    try {
        const result = await restaurants.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update a restaurant by ID
const updateRestaurant = async (id, data) => {
    try {
        const result = await restaurants.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a restaurant by ID
const deleteRestaurant = async (id) => {
    try {
        const result = await restaurants.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// export services
module.exports = {
    createRestaurant,
    getRestaurantById,
    getAllRestaurants,
    updateRestaurant,
    deleteRestaurant
};
