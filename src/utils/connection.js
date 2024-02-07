
require('dotenv').config();
const mongoose = require('mongoose')


const dbConnect = () =>{
    const URL = process.env.DB_URL
    try {
        mongoose.connect(URL,{dbName:"stringShortner"})
        console.log("Db Connect")
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnect;