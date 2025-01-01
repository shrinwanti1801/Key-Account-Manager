const mysql = require('mysql2/promise');
require('dotenv').config({ path: './src/.env' });
const logger =require('./logger-config');

// MySQL Connection Setup
// MySQL Connection Setup with Promises
const db = mysql.createPool({
    host: 'localhost',
    user: process.env.user, // replace with your MySQL username
    password: process.env.Password, // replace with your MySQL password
    database: process.env.DB_NAME, // database name
    waitForConnections: true,
    connectionLimit: 10, // adjust as per your requirement
    queueLimit: 0
});



// Connect to MySQL
const connectDB = async () => {
    try {
        const connection = await db.getConnection();
        console.log('Connected to MySQL database.');
        logger.info(`Connected to MySQL database.`);
        connection.release(); // Release the connection back to the pool
    } catch (err) {
        logger.error(`Error connecting to MySQL ${err.message}`);
        console.error('Error connecting to MySQL:', err.message);
        throw err;
    }
};



// Initialize Database Setup
module.exports = {db,connectDB};

