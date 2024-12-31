const CrudRepository = require('./crud_repo');
const {db}=require('../config/index');

// creating FollowUpCalls class extending all the properties of CrudRepository
class FollowUpCalls extends CrudRepository {
    constructor() {
        // Call the parent class constructor with the table name
        super('Follow_up_calls');
    }

    async createFollowUpCalls(data){
        try{

            // check for the restaurant for given restaurant_id
            const{restaurant_id}=data;
            var query=`
             select count(*) as count
             from restaurants
             where id = ?
            `
            const [response]=await db.query(query,[restaurant_id]);
            //console.log(response);
            if(response?.count===0){
                throw new AppError([
                    `No Restaurant found for Restaurant_id ${restaurant_id} in table restaurant `],
                    StatusCodes.NOT_FOUND
                );
            }

            // check for the point of contacts for given POCs_id
            query=`
             select count(*) as count
             from pocs
             where id=?
            `
            const [PocResponse]=await db.query(query,[data?.poc_id]);

            if(PocResponse?.count===0){
                throw new AppError([
                    `No POCs found for pocs_id ${data?.poc_id} in table POCs table `],
                    StatusCodes.NOT_FOUND
                );
            }

            return this.create(data);
        }
        catch(error){
            console.log("Error in createFollowUpCalls method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while Creating FollowUpCalls: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }


    // fetch FollowUpCalls for a given Restaurant_id
    async getAllFollowUpCallsByRestaurantId(restaurant_id){
        try{

            // check if restaurant exists for this restaurant id
            var query=`
             select count(*) as count
             from restaurants where
             id=?
            `
            // console.log("line 74")
            const [RestaurantResponse] = await db.query(query,[restaurant_id]);

            if(RestaurantResponse.length===0){
                throw new AppError([
                    `No Restaurant found for Restaurant_id ${restaurant_id} in table restaurants`],
                    StatusCodes.NOT_FOUND
                );
            }

            // console.log("line 84")
            // Query to fetch follow_Up_calls for a given Restaurant_id
            query=
            `Select * 
            from Follow_up_calls
            where restaurant_id = ?
            `

            const [response] = await db.query(query,[restaurant_id]);

            // Return all followUpCalls for the Restaurant
            return response;
        }
        catch(error){
            console.log("Error in getAllFollowUpCallsByRestaurantId method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while fetching FollowUpCalls: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }

    // fetch FollowUpCalls for a given pocs_id
    async getAllFollowUpCallsByPOCs(poc_id){
        try{

            // check if pocs exists for this POC id
            var query=`
             select count(*) as count
             from pocs where
             id=?
            `

            const [RestaurantResponse] = await db.query(query,[poc_id]);

            // console.log(RestaurantResponse);

            if(RestaurantResponse.count===0){
                throw new AppError([
                    `No POCs found for poc_id ${poc_id} in table pocs`],
                    StatusCodes.NOT_FOUND
                );
            }

            // Query to fetch follow_Up_calls for a given pocs
            query=
            `Select * 
            from Follow_up_calls
            where poc_id = ?
            `

            const [response] = await db.query(query,[poc_id]);

            //console.log(response);
            // Return all followUpCalls for the poc_id
            return response;
        }
        catch(error){
            console.log("Error in getAllFollowUpCallsByPOCs method -> ",error);

            // Handel Unexpected Error
            if(!error.statusCode){
                throw new AppError([
                    `Error while fetching FollowUpCalls: ${error.message || 'Unknown Error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }

            // Re-throw Known Error
            throw error;
        }
    }
}

module.exports = FollowUpCalls;