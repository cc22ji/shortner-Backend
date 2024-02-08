
require('dotenv').config();
const mongoose = require('mongoose')


//connection tp DataBase
const dbConnect = () =>{
    const URL = process.env.DB_URL || " mongodb+srv://chetanchouhan222:Everst%40321@cluster0.axajown.mongodb.net/b.net/"
    try {
        mongoose.connect(URL,{dbName:"stringShortner"})
    } catch (error) {
        // console.log(error)
    }
}

module.exports = dbConnect;