
const mongoose = require('mongoose');
const validator = require("validator");

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please enter Name"]
    },
    email : {
        type : String,
        required : [true,"please enter email"],
        unique : [true, "Email is already Exists"],
        validate : {
            validator : validator.isEmail,
            message : 'Invalid Email address'
        }
    },
    password : {
        type : String ,
        required : true,
    }
},{timestamps : true}
);

module.exports = mongoose.model("users",schema);