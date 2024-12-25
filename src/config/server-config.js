const mysql = require('mysql2');
const util = require('util');
require('dotenv').config({ path: './src/.env' });

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.user, // replace with your MySQL username
    password: process.env.Password, // replace with your MySQL password
    database: process.env.DB_NAME, // database name
});


const query = util.promisify(db.query).bind(db);

// Connect to MySQL
const connectDB = async () => {
    try {
        await util.promisify(db.connect).bind(db)();
        console.log('Connected to MySQL database.');
    } catch (err) {
        console.error('Error connecting to MySQL:', err.message);
    }
};



// Initialize Database Setup
module.exports = {db,connectDB};

