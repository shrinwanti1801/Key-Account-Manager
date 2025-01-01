const mysql = require('mysql2/promise');
require('dotenv').config({ path: './src/.env' });
const logger =require('./logger-config');

// MySQL Connection Setup
// MySQL Connection Setup with Promises

// for development
const db = mysql.createPool({
    host: 'localhost',
    user: process.env.user, // replace with your MySQL username
    password: process.env.Password, // replace with your MySQL password
    database: process.env.DB_NAME, // database name
    waitForConnections: true,
    connectionLimit: 10, // adjust as per your requirement
    queueLimit: 0
});


// for test
const testDb = mysql.createPool({
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    port: process.env.TEST_DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// for production
const productionDb = mysql.createPool({
    host: process.env.PROD_DB_HOST,
    user: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    port: process.env.PROD_DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,  
    queueLimit: 0,       
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
module.exports = {
    db,
    connectDB
};

