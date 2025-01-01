
const { StatusCodes } = require('http-status-codes');
const {AppError}=require('../utils/index');
const {db}=require('../config/index');
const CrudRepository = require('./crud_repo');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config({ path: './src/.env' });

class Auth extends CrudRepository{
    constructor(){
        super('users');
    }

    async SignUp(data){
        try{

            const { 
                    name,
                    email,
                    password,
                    role
                  } = data;


             //check user already exist or not
             const checkQuery=
             `select 
             count(*) as count from 
             users where email=?
             `

             const isAlreadyPresent=await db.query(checkQuery,[email]);
            //  console.log(isAlreadyPresent[0][0].count);
             if(isAlreadyPresent[0][0].count!=0)
             {
                
                throw new AppError([
                    `User Already Exists for email is ${email}`],
                    StatusCodes.CONFLICT
                );
             }

             //hash password
             const hashedPassword=await bcrypt.hash(password,10);

             const query = `
              INSERT INTO users (name, email, password, role) 
              VALUES (?, ?, ?, ?)
            `;

            const [response] = await db.query(query, [name, email,hashedPassword, role]);
            console.log("User added successfully:", response);
            return response;
        }
        catch(error){
            console.error("Error while inserting data into the User:", error);
    
            // Throw a more descriptive error using AppError
            throw new AppError(['Error While Registring: ' + (error.message || 'Unknown error')], 500);
        }
    }

    async Login(req, res) {
        try {
            // Fetch data from request body
            const { email, password } = req.body;
    
            // Check if user exists in the database
            const query = `SELECT * FROM users WHERE email = ?`;
            const [rows] = await db.query(query, [email]);
    
            if (rows.length === 0) {
                throw new AppError(
                    [`User is not registered, please sign up first`],
                    StatusCodes.BAD_REQUEST
                );
            }
    
            const user = rows[0]; // Get the first row as the user data
    
            // Password matching
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new AppError(
                    [`Invalid password`],
                    StatusCodes.BAD_REQUEST
                );
            }
    
            // Payload for JWT
            const payload = {
                email: user.email,
                id: user.id,
                role: user.role,
            };
    
            // Generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "4h",
            });
    
            // Exclude password from user object in response
            delete user.password;
    
            // Create cookies and send response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };
    
            // Send cookie and response
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
            });
        } catch (error) {
            throw new AppError("User not found", 404);
        }
    }
    
}

module.exports=Auth;