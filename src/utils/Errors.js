const { error } = require("./ErrorResponse");

class AppError extends error{
    constructor(message,stausCode){
        super(message);
        this.stausCode=stausCode;
        this.explanation=message;
    }
}

module.exports=AppError;