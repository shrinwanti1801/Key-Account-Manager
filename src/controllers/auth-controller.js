
var {SuccessResponse,ErrorResponse, AppError}=require('../utils/index');
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// importing services for FollowUpCalls
const { 
       Login,
       SignUp
     } = require('../services/auth-services');


// Controller for login
const LoginController = async (req, res) => {
    try {
        const data = req.body; // Get login data from the request body
        //console.log(data);
        const result = await Login(req,res);
        SuccessResponse.message='Loged in successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        Logger.error('Error in LoginController');
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};


// Controller for SignUp
const SignUpController = async (req, res) => {
    try {
        const data = req.body; // Get SignUp data from the request body
        //console.log(data);
        const result = await SignUp(data);
        SuccessResponse.message='Registered successfully'
        SuccessResponse.data=result;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        Logger.error('Error in SignUpController');
        ErrorResponse = new AppError([`${error.message || 'Internal Server Error'}`],`${error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR}`);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

module.exports={
    LoginController,
    SignUpController
}
