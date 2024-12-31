const { AccountsPerformance } = require('../repositories/index');

// making an instance of resturant
const accountsPerformance=new AccountsPerformance();

// Service to create a new accountsPerformance
const createAccountsPerformance = async (data) => {
    try {
        const result = await accountsPerformance.create(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a accountsPerformance by ID
const getAccountsPerformanceById = async (id) => {
    try {
        const result = await accountsPerformance.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all accountsPerformance
const getAllAccountsPerformance = async () => {
    try {
        const result = await accountsPerformance.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};


// Service to get all accountsPerformance by Restaurant id
const getAllAccountsPerformanceByRestaurantId = async (restaurant_id) => {
    try {
        const result = await accountsPerformance.getAllAccountsPerformancesByRestaurantId(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all accountsPerformance by status 
const getDataUsingStatusOfAccountPerformance = async (restaurant_id) => {
    try {
        const result = await accountsPerformance.getDataUsingStatusOfAccountPerformance(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update a accountsPerformance by ID
const updateAccountsPerformance = async (id, data) => {
    try {
        const result = await accountsPerformance.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a accountsPerformance by ID
const deleteAccountsPerformance = async (id) => {
    try {
        const result = await accountsPerformance.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// export services
module.exports = {
    createAccountsPerformance,
    getAccountsPerformanceById,
    updateAccountsPerformance,
    deleteAccountsPerformance,
    getAllAccountsPerformance,
    getAllAccountsPerformanceByRestaurantId,
    getDataUsingStatusOfAccountPerformance
};
