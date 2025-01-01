const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');
const { AppError } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

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
                Logger.warn(`No Restaurants found for Restaurant_id ${restaurant_id} in table restaurants`);
                throw new AppError([
                    `No Restaurants found for Restaurant_id ${restaurant_id} in table restaurants `],
                    StatusCodes.NOT_FOUND
                );
            }

            return this.create(data);
        }
        catch(error){
            Logger.error(`Error in createPocs method `);
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
                Logger.warn(`No POCs found for Restaurant_id ${restaurant_id} in table poc `);
                throw new AppError([
                    `No POCs found for Restaurant_id ${restaurant_id} in table poc `],
                    StatusCodes.NOT_FOUND
                );
            }

            // Return all POCs for the Restaurant
            Logger.info(`Fetched a;; POCs for the Restaurant`);
            return response;
        }
        catch(error){
            Logger.error(`Error in getAllPOCsById method`);
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


    // Delete
    async destroy(id) {
        try {

            // recursively delete
            // delete from follow up calls table
            const deleteFollowUpCalls=`
             delete from 
             follow_up_calls
             where poc_id=?
            `

            await db.query(deleteFollowUpCalls,[id]);

            // delete from poc table
            const query = `DELETE FROM pocs WHERE id = ?`;
            const [response] = await db.query(query, [id]);
    
            //console.log("Query Response ->", response);
    
            // Check if any rows were affected (resource deleted)
            if (response.affectedRows === 0) {
                Logger.warn(`Resource with ID ${id} not found in table ${this.tableName}`);
                throw new AppError(
                    [`Resource with ID ${id} not found in table ${this.tableName}`],
                    StatusCodes.NOT_FOUND
                );
            }
    
            Logger.info(`Resource with ID ${id} successfully deleted`);
            return {
                message: `Resource with ID ${id} successfully deleted`,
                deleted: true,
            };
        } catch (error) {
            Logger.error(`Error in destroy method `);
            console.error("Error in destroy method ->", error);
    
            // Handle unexpected errors
            if (!error.statusCode) {
                throw new AppError(
                    [`Error while deleting resource: ${error.message || 'Unknown error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw known AppError
            throw error;
        }
    }
}

module.exports = POCS;