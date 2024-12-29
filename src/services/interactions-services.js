const { Interactions } = require('../repositories/index');

// making an instance of Interactions
const interactions=new Interactions();

// Service to create a new Interaction
const createInteraction = async (data) => {
    try {
        const result = await interactions.createInteraction(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a Interaction by ID
const getInteractionById = async (id) => {
    try {
        const result = await interactions.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all orders
const getAllInteractions = async () => {
    try {
        const result = await interactions.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all orders of Restaurant_id
const getInteractionsOfRestaurant = async (restaurant_id) => {
    try {
        const result = await interactions.getAllInteractionsByRestaurantId(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update an Interaction by ID
const updateInteraction = async (id, data) => {
    try {
        const result = await interactions.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a Interaction by ID
const deleteInteraction = async (id) => {
    try {
        const result = await interactions.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// export services
module.exports = {
    createInteraction,
    getInteractionById,
    getAllInteractions,
    getInteractionsOfRestaurant,
    updateInteraction,
    deleteInteraction
};
