const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');
const { StatusCodes } = require('http-status-codes');
const {AppError}=require('../utils/index');
const {Logger}=require('../config/index');

// creating accounts_performance class extending all the properties of CrudRepository
class AccountsPerformance extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('accounts_performance');
    }

    // Create or Update Account Performance
    async  create(data) {
        try {
            // Destructure and validate data
            let { restaurant_id, order_value } = data;
            if (!order_value) order_value = data.order_amount;

            // Query to check if the record exists
            const performanceQueryCheck = `
                SELECT * FROM accounts_performance WHERE restaurant_id = ?;
            `;
            const [existingRecord] = await db.query(performanceQueryCheck, [restaurant_id]);

            if (existingRecord && existingRecord.length > 0) {
                // Update existing record
                const updateQuery = `
                    UPDATE accounts_performance
                    SET 
                        total_orders = total_orders + 1,
                        average_order_value = (average_order_value * (total_orders) + ?) / (total_orders + 1),
                        status = CASE
                            WHEN total_orders + 1 <= 30 THEN 'Low'
                            WHEN total_orders + 1 > 30 AND total_orders + 1 <= 60 THEN 'Medium'
                            WHEN total_orders + 1 > 60 THEN 'High'
                        END,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE restaurant_id = ?;
                `;
                await db.query(updateQuery, [order_value, restaurant_id]);
                Logger.info(`Updated performance record for restaurant_id: ${restaurant_id}`);
            } else {
                // Insert new record
                const insertQuery = `
                    INSERT INTO accounts_performance (
                        restaurant_id, 
                        total_orders, 
                        average_order_value, 
                        status
                    )
                    VALUES (
                        ?, 
                        1, 
                        ?, 
                        CASE 
                            WHEN 1 <= 30 THEN 'Low'
                            WHEN 1 > 30 AND 1 <= 60 THEN 'Medium'
                            WHEN 1 > 60 THEN 'High'
                        END
                    );
                `;
                await db.query(insertQuery, [restaurant_id, order_value]);
                Logger.info(`Inserted new performance record for restaurant_id: ${restaurant_id}`);
            }

            return { success: true, message: 'Account performance entry processed successfully.' };
        } catch (error) {
            Logger.error(`Error processing account performance for restaurant_id: ${data.restaurant_id}`);
            console.error("Error while inserting/updating data in the database:", error);

            // Throw a descriptive error using AppError
            throw new AppError(['Error processing account performance: ' + (error.message || 'Unknown error')], 500);
        }
    }



    // fetch AccountsPerformance for a given Restaurant_id
    async getAllAccountsPerformancesByRestaurantId(restaurant_id){
        try{
            // Query to fetch AccountsPerformance for a given Restaurant_id
            var query=`
             select count(*) as count
             from restaurants
             where id=?
            `

            const [response] = await db.query(query,[restaurant_id]);

            // Check if any Restaurant exist for the restaurant_id
            if(response.count===0){
                Logger.warn(`No Restaurant found for Restaurant_id ${restaurant_id} in table Restaurant `);
                throw new AppError([
                    `No Restaurant found for Restaurant_id ${restaurant_id} in table Restaurant `],
                    StatusCodes.NOT_FOUND
                );
            }

            query=`
             select * 
             from accounts_performance
             where restaurant_id=?
            `

            const [AccountPerformanceResponse] = await db.query(query,[restaurant_id]);

            // Return all AccountPerformance for the Restaurant
            Logger.info(`Fetched all AccountPerformance for the Restaurant`);
            return AccountPerformanceResponse;
        }
        catch(error){
            Logger.error(`Error in getAllAccountsPerformancesByRestaurantId method`);
            console.log("Error in getAllAccountsPerformancesByRestaurantId method -> ",error);

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

    // Fetch all account performance using status
    async getDataUsingStatusOfAccountPerformance(status){
        try{
            // query
            const query=`
            select * from 
            accounts_performance
            where status=?
            `

            // make db call
            const [Response]=db.query(query,[status]);
            
            // return response
            Logger.info(`Fetched Data SuccessFully`);
            return Response;
        }
        catch(error){
            Logger.error(`Error in getDataUsingStatusOfAccountPerformance method `);
            console.log("Error in getDataUsingStatusOfAccountPerformance method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while fetching Account Performance: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }
}

module.exports = AccountsPerformance;