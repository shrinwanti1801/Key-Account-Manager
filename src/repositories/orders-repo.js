const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');
const {Logger}=require('../config/index');
const AccountsPerformance=require('./accounts_performance-repo');

var accountsPerformance=new AccountsPerformance();

// creating resturant class extending all the properties of CrudRepository
class Orders extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('orders');
    }

    async createOrder(data){
        try{
            const{restaurant_id}=data;
            const query=`
             select count(*) as count
             from restaurants
             where id = ?
            `
            const [response]=await db.query(query,[restaurant_id]);
            //console.log(response);
            if(response?.count===0){
                Logger.warn(`No Restaurants found for Restaurant_id ${restaurant_id} in table restaurants `);
                throw new AppError([
                    `No Restaurants found for Restaurant_id ${restaurant_id} in table restaurants `],
                    StatusCodes.NOT_FOUND
                );
            }

            accountsPerformance.create(data);
            return this.create(data);
        }
        catch(error){
            Logger.error(`Error in createOrder method`);
            console.log("Error in createOrder method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while Creating Order: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }


    // fetch Orders for a given Restaurant_id
    async getAllOrdersByRestaurantId(restaurant_id){
        try{
            // Query to fetch POCs for a given Restaurant_id
            const query=
            ` Select * 
            from orders 
            where restaurant_id = ?
            `

            const [response] = await db.query(query,[restaurant_id]);

            // Check if any POCs exist for the restaurant_id
            if(response.length===0){
                Logger.warn(`No Orders found for Restaurant_id ${restaurant_id} in table orders`);
                throw new AppError([
                    `No Orders found for Restaurant_id ${restaurant_id} in table orders `],
                    StatusCodes.NOT_FOUND
                );
            }

            // Return all orders for the Restaurant
            return response;
        }
        catch(error){
            Logger.error(`Error in getAllOrdersByRestaurantId method`);
            console.log("Error in getAllOrdersByRestaurantId method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while fetching Orders: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }
}

module.exports = Orders;