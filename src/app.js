const express = require ('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./utils/connection')
const users = require('./routes/users')
const url = require('./routes/url')
const {errorMiddleware} = require("./middlewares/error")
const cors = require("cors")
const cookieParser = require("cookie-parser");

const port = process.env.PORT
const Originurl = process.env.ORIGIN_URL


//use cors
// app.use(cors())
const corsOptions = {
    origin: Originurl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//use cookie parser
app.use(cookieParser());


dbConnect();

// login, singup public routes
app.use('/api/v1/user',users)

// protected routes
app.use('/api/v1',url)



app.use(errorMiddleware)


app.listen(port,()=>{console.log(`server is listening on port ${port}`)})
