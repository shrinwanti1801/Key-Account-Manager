const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');

// creating resturant class extending all the properties of CrudRepository
class Interactions extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('interactions');
    }

    async createInteraction(data){
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
                throw new AppError([
                    `No Interactions found for Restaurant_id ${restaurant_id} in table interactions `],
                    StatusCodes.NOT_FOUND
                );
            }
            return this.create(data);
        }
        catch(error){
            console.log("Error in createInteraction method -> ",error);

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
    async getAllInteractionsByRestaurantId(restaurant_id){
        try{
            // Query to fetch POCs for a given Restaurant_id
            const query=
            ` Select * 
            from interactions 
            where restaurant_id = ?
            `

            const [response] = await db.query(query,[restaurant_id]);

            // Check if any POCs exist for the restaurant_id
            if(response.length===0){
                throw new AppError([
                    `No Interactions found for Restaurant_id ${restaurant_id} in table interactions `],
                    StatusCodes.NOT_FOUND
                );
            }

            // Return all orders for the Restaurant
            return response;
        }
        catch(error){
            console.log("Error in getAllInteractionsByRestaurantId method -> ",error);

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

module.exports = Interactions;