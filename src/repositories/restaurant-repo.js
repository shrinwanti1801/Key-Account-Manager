const CrudRepository = require('./crud_repo');
const {db}=require('../config/server-config');
const {AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// creating resturant class extending all the properties of CrudRepository
class Restaurants extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('restaurants');
    }

    async destroy(id) {
        try {

            // recursively delete
            // delete pocs accociated with this restaurant
            const deleteQueryPocs=`
             delete from pocs
             where restaurant_id=?
            `

            await db.query(deleteQueryPocs,[id]);

            // delete follow_up_calls for this restaurant

            const deleteFollowUpCalls=`
             delete from 
             follow_up_calls 
             where restaurant_id=?
            `
            await db.query(deleteFollowUpCalls,[id]);


            const query = `DELETE FROM restaurants WHERE id = ?`;
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
            Logger.error(`Error in destroy method`);
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

module.exports = Restaurants;