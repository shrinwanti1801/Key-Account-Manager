const { Orders } = require('../repositories/index');

// making an instance of resturant
const orders=new Orders();

// Service to create a new order
const createOrder = async (data) => {
    try {
        const result = await orders.createOrder(data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get a order by ID
const getOrderById = async (id) => {
    try {
        const result = await orders.get(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all orders
const getAllOrders = async () => {
    try {
        const result = await orders.getAll();
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to get all orders of Restaurant_id
const getOrdersOfRestaurant = async (restaurant_id) => {
    try {
        const result = await orders.getAllOrdersByRestaurantId(restaurant_id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to update a order by ID
const updateOrder = async (id, data) => {
    try {
        const result = await orders.update(id, data);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// Service to delete a order by ID
const deleteOrder = async (id) => {
    try {
        const result = await orders.destroy(id);
        return result;
    } catch (error) {
        throw error; // Pass the error to be handled by the controller
    }
};

// export services
module.exports = {
    createOrder,
    getOrderById,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getOrdersOfRestaurant
};
