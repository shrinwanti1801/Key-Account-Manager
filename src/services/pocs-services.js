const { POCS } = require('../repositories/index');

// making an instance of resturant
const pocs=new POCS();

// Service to create a new Pocs
const createPocs = async (data) => {
    try {
        const result = await pocs.createPocs(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a Pocs by ID
const getPocsById = async (id) => {
    try {
        const result = await pocs.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all Pocs
const getAllPocs = async () => {
    try {
        const result = await pocs.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};


// Service to get all Pocs of Restaurant_id
const getPocsOfRestaurant = async (restaurant_id) => {
    try {
        const result = await pocs.getAllPOCsByRestaurantId(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update a Pocs by ID
const updatePocs = async (id, data) => {
    try {
        const result = await pocs.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a Pocs by ID
const deletePocs = async (id) => {
    try {
        const result = await pocs.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};




// export services
module.exports = {
    createPocs,
    getPocsById,
    getAllPocs,
    updatePocs,
    deletePocs,
    getPocsOfRestaurant
};
