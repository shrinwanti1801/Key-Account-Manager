const express = require('express');
const router = express.Router();

// importing middlewares for auth
const {
    LoginValidation,
    SignUpValidation
} = require('../../middlewares/auth-middleware');

// importing controllers for auth
const {
    LoginController,
    SignUpController
} = require('../../controllers/auth-controller');

// Define routes
router.post('/login',LoginValidation,LoginController);
router.post('/signup',SignUpValidation,SignUpController);


module.exports = router;