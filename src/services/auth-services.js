const { Auth } = require('../repositories/index');

// making an instance of resturant
const auth=new Auth();


// login services
const Login=async(req,res)=>{
    try{
        const result = await auth.Login(req,res);
        return result;
    }
    catch(error){
        throw error;
    }
}

// signUp services
const SignUp=async(data)=>{
    try{
        const result = await auth.SignUp(data);
        return result;
    }
    catch(error){
        throw error;
    }
}

module.exports={
    Login,
    SignUp
}