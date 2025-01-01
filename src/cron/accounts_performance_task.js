const {db}=require('../config/server-config');
const {AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');

const account_performance= async()=>{
    try {
      // SQL query to get all low performing restaurants
      const query = `SELECT id, restaurant_id, total_orders, average_order_value, order_frequency, status 
                     FROM accounts_performance 
                     WHERE status = 'Low'`;
  
      // Fetch the restaurants with low performance
      const [rows] = await db.query(query);
  
     if (rows.length > 0)
     console.log('Low performing restaurants:', rows);
     else 
     console.log('No low performing restaurants found.');
    } catch (error) {
      console.error('Error fetching low performing restaurants:', error);
      throw new AppError(["Error fetching low performing restaurants: "],StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

module.exports=account_performance;