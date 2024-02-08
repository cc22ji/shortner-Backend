
const jwt =  require("jsonwebtoken")
const UserModel = require("../models/users")
const { TryCatch } = require("../middlewares/error.js");
const ErrorHandler = require("../utils/utility-class.js");


var authorization = TryCatch(async(req,res,next)=>{
    let token = req.cookies.token
    
    if(!token){
       return new ErrorHandler("Unauthorized User", 401)
    }
      //verify token
            const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY)
            //Get user through Token
            req.user = await UserModel.findById(userID).select("-password")
            next();
            
            
    
    //for postman check 

    // let token
    // const {authorization} = req.headers
    // if(authorization && authorization.startsWith("Bearer")){
    //         token = authorization.split(" ")[1]
    //         //  verify token
    //         const {userID} = jwt.verify(token,process.env.JWT_SECRET_KEY)
    //         //Get user from Token
    //         req.user = await UserModel.findById(userID).select("-password")
    //         // console.log("verified auth",req.user)
    //         next()
    // }else{
    //    return new ErrorHandler("Unauthorized User", 401)
    // }
});

module.exports = authorization