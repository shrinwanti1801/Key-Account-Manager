
const { StatusCodes } = require('http-status-codes');
const {AppError}=require('../utils/index');
const {db}=require('../config/index');

// CrudRepository class
class CrudRepository {
    constructor(tableName) {
        this.tableName = tableName;
    }

    // Create
    async create(data) {
        try {
            
            // Generate column names and placeholders dynamically
            const columns = Object.keys(data).join(', ');
            const placeholders = Object.keys(data).map(() => '?').join(', ');
    
            // console.log("Table name -> ", this.tableName);
            // console.log("Columns -> ", columns);
            // console.log("Placeholders -> ", placeholders);
            // console.log("Data -> ", data);
    
            // SQL query
            const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
    
            //console.log("Generated Query ->", query);
    
            // Execute query
            const response = await db.execute(query, Object.values(data));
    
            //console.log("Response ->", response);
    
            return response; // Return the actual response from the database
        } catch (error) {
            console.error("Error while inserting data into the database:", error);
    
            // Throw a more descriptive error using AppError
            throw new AppError(['Error creating entry: ' + (error.message || 'Unknown error')], 500);
        }
    }
    
    // Delete
    async destroy(id) {
        try {
            const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
            const [response] = await db.query(query, [id]);
    
            //console.log("Query Response ->", response);
    
            // Check if any rows were affected (resource deleted)
            if (response.affectedRows === 0) {
                throw new AppError(
                    [`Resource with ID ${id} not found in table ${this.tableName}`],
                    StatusCodes.NOT_FOUND
                );
            }
    
            return {
                message: `Resource with ID ${id} successfully deleted`,
                deleted: true,
            };
        } catch (error) {
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
    
    // Get by ID
    async get(id) {
        try {
            //console.log("id");
            const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
            const [response] = await db.query(query, [id]);
    
            //console.log("Query Response ->", response);
    
            
            // Check if the resource exists
            if (response.length === 0) {
                throw new AppError(
                    [`Resource with ID ${id} not found in table ${this.tableName}`],
                    StatusCodes.NOT_FOUND
                );
            }
    
            
            return response[0]; // Return the first matching record
        } catch (error) {
            console.error("Error in get method ->", error);
    
            // Handle unexpected errors
            if (!error.statusCode) {
                throw new AppError(
                    [`Error while fetching resource: ${error.message || 'Unknown error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
    
            // Re-throw known AppError
            throw error;
        }
    }
    
    // Get ALL
    async getAll() {
        try {
            const query = `SELECT * FROM ${this.tableName}`;
            const [response] = await db.query(query);
    
            //console.log("Query Response ->", response);
    
            return response; // Return all resources
        } catch (error) {
            console.error("Error while fetching all resources ->", error);
    
            // Wrap unexpected errors in a consistent AppError
            throw new AppError(
                [`Unable to fetch all resources from table ${this.tableName}: ${error.message || 'Unknown error'}`],
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    

    // Update by ID
    async update(id, data) {
        try {
            // Generate the fields and values for the update query dynamically
            const fields = Object.keys(data).map((key) => `${key} = ?`).join(', ');
            const values = [...Object.values(data), id];
    
            const query = `UPDATE ${this.tableName} SET ${fields} WHERE id = ?`;
    
            // console.log("Generated Query ->", query);
            // console.log("Values ->", values);
    
            // Execute the query
            const [response] = await db.query(query, values);
    
            // Check if the update affected any rows
            if (response.affectedRows === 0) {
                throw new AppError(
                    [`Resource with ID ${id} not found in table ${this.tableName}`],
                    StatusCodes.NOT_FOUND
                );
            }
    
            return {
                message: `Resource with ID ${id} successfully updated`,
                updated: true,
            };
        } catch (error) {
            console.error("Error while updating resource ->", error);
    
            if (!error.statusCode) {
                throw new AppError(
                    [`Error while updating resource: ${error.message || 'Unknown error'}`],
                    StatusCodes.INTERNAL_SERVER_ERROR
                );
            }
            throw error; // Rethrow known AppError
        }
    }
    
}

// Export CrudRepository Class
module.exports = CrudRepository;