
require('dotenv').config();
const mongoose = require('mongoose')


//connection tp DataBase
const dbConnect = () =>{
    const URL = process.env.DB_URL
    try {
        mongoose.connect(URL,{dbName:"stringShortner"})
    } catch (error) {
        // console.log(error)
    }
}

module.exports = dbConnect;