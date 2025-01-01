
const {ErrorResponse, AppError}=require("../utils/index");
const {SuccessResponse}=require("../utils/index");
const { StatusCodes } = require('http-status-codes');
const {Logger}=require('../config/index');

// Login, Validation
const LoginValidation=async (req,res,next)=>{

    // get data from req's body
    const { email, password } = req.body;

    // Check if data is provided
    if (!email || !password) {
        Logger.error(`Email ID or Password are missing in LoginValidation MiddleWare`)
        const error = new AppError(["Email ID or Password are missing"], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json({ error });
    }

    next();
}

// Sign Up Validation
const SignUpValidation = (req, res, next) => {

     // validation
     const { name,
        email,
        password,
        role
     }=req.body;

    //console.log(name,address);
    if(!name || !email || !password || !role){
        Logger.error(`Fields are required in SignUpValidation MiddleWare`)
        ErrorResponse.error=new AppError(["Fields are required"], 400);;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
};


module.exports={
    LoginValidation,
    SignUpValidation
}