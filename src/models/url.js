const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true ,
        trim:true
    },
    redirectURL : {
        type : String,
        required : true,
        trim:true
    },
    history:[
        {timestamps : {type:Number}}
    ]
},{timestamps:true})

const schema = new mongoose.Schema({
    reference_id : {type : String},
    urls : {
        type : [referenceSchema]
    }
  
}
)

module.exports = mongoose.model("URLs",schema) 