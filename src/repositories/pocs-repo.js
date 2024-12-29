const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');
const { AppError } = require('../utils');
const { StatusCodes } = require('http-status-codes');

// creating resturant class extending all the properties of CrudRepository
class POCS extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('pocs');
    }

    async createPocs(data){
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
                    `No Restaurants found for Restaurant_id ${restaurant_id} in table restaurants `],
                    StatusCodes.NOT_FOUND
                );
            }

            return this.create(data);
        }
        catch(error){
            console.log("Error in createPocs method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while Creating POCs: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }

    // fetch POCs for a given Restaurant_id
    async getAllPOCsByRestaurantId(restaurant_id){
        try{
            // Query to fetch POCs for a given Restaurant_id
            const query=
            ` Select * 
            from pocs 
            where restaurant_id = ?
            `

            const [response] = await db.query(query,[restaurant_id]);

            // Check if any POCs exist for the restaurant_id
            if(response.length===0){
                throw new AppError([
                    `No POCs found for Restaurant_id ${restaurant_id} in table poc `],
                    StatusCodes.NOT_FOUND
                );
            }

            // Return all POCs for the Restaurant
            return response;
        }
        catch(error){
            console.log("Error in getAllPOCsById method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while fetching POCs: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }
}

module.exports = POCS;