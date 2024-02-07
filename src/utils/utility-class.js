
// create to add status code in default Error
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }
}


module.exports =  ErrorHandler;