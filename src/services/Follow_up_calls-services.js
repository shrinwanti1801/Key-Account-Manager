const { FollowUpCalls } = require('../repositories/index');

// making an instance of FollowUpCalls
const followUpCalls=new FollowUpCalls();

// Service to create a new FollowUpCalls
const createFollowUpCalls = async (data) => {
    try {
        const result = await followUpCalls.createFollowUpCalls(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a FollowUpCalls by ID
const getFollowUpCallsById = async (id) => {
    try {
        const result = await followUpCalls.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all followUpCalls
const getAllFollowUpCalls = async () => {
    try {
        const result = await followUpCalls.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all followUpCalls of Restaurant_id
const getFollowUpCallsOfRestaurant = async (restaurant_id) => {
    try {
        const result = await followUpCalls.getAllFollowUpCallsByRestaurantId(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all followUpCalls of Restaurant_id
const getFollowUpCallsOfPoc = async (poc_id) => {
    try {
        const result = await followUpCalls.getAllFollowUpCallsByPOCs(poc_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update an FollowUpCalls by ID
const updateFollowUpCalls = async (id, data) => {
    try {
        const result = await followUpCalls.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a followUpCalls by ID
const deleteFollowUpCalls = async (id) => {
    try {
        const result = await followUpCalls.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// export services
module.exports = {
    createFollowUpCalls,
    getFollowUpCallsById,
    getAllFollowUpCalls,
    getFollowUpCallsOfRestaurant,
    updateFollowUpCalls,
    deleteFollowUpCalls,
    getFollowUpCallsOfPoc
};
