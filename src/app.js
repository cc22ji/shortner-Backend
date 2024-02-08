const express = require ('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./utils/connection')
const users = require('./routes/users')
const url = require('./routes/url')
const {errorMiddleware} = require("./middlewares/error")
const cors = require("cors")
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 4000
const Originurl = process.env.ORIGIN_URL || 'http://localhost:3000'


//use cors
const corsOptions = {
    origin: Originurl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));

//use json middleware
app.use(express.json());

//use encoded middleware 
app.use(express.urlencoded({ extended: true }));

//use cookie parser
app.use(cookieParser());

// connection from DataBase
dbConnect();

// User routes
app.use('/api/v1/user',users)

// Url's routes
app.use('/api/v1',url)

//custom Error Handler middleware
app.use(errorMiddleware)

//port
app.listen(port,()=>{
  // console.log(`server is listening on port ${port}`)
})
