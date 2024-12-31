const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');
const { query } = require('express');
const { StatusCodes } = require('http-status-codes');
const {AppError}=require('../utils/index');

// creating accounts_performance class extending all the properties of CrudRepository
class AccountsPerformance extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('accounts_performance');
    }

    // Create Account Performance
async create(data) {
    try {
        // console.log(data);
        const { restaurant_id, order_value } = data;

        const performanceQuery = `
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
            )
            ON DUPLICATE KEY UPDATE
                total_orders = total_orders + 1,
                average_order_value = (average_order_value * (total_orders - 1) + VALUES(average_order_value)) / total_orders,
                status = CASE
                    WHEN total_orders + 1 <= 30 THEN 'Low'
                    WHEN total_orders + 1 > 30 AND total_orders + 1 <= 60 THEN 'Medium'
                    WHEN total_orders + 1 > 60 THEN 'High'
                END;
        `;

        // Await the query execution
        const [response] = await db.query(performanceQuery, [restaurant_id, order_value]);

        return response;
    } catch (error) {
        console.error("Error while inserting data into the database:", error);

        // Throw a more descriptive error using AppError
        throw new AppError(['Error creating entry: ' + (error.message || 'Unknown error')], 500);
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
            return AccountPerformanceResponse;
        }
        catch(error){
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
            return Response;
        }
        catch(error){
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