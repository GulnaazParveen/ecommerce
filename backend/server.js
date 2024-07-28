import express from 'express';
const app=express();
import dotenv from "dotenv"
const database_url=process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017'
import bodyParser from "body-parser";
import productRouter from "./routes/productRoute.js"
import dbconnect from './db/databaseConnect.js';
import errorMiddleware from './middleware/error.js';

import userRouter from './routes/userRoute.js'; // Correct import
import cookieParser from "cookie-parser"; // Import cookie-parser
import OrderRouter from './routes/OrderRoutes.js';

// config
dotenv.config({path:"backend/config/config.env"})

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser()); // Use cookie-parser middleware

// database connection
dbconnect(database_url)

// defining main route
app.use("/api/v1",productRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",OrderRouter)

// middleware for errors
app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`server is runnig on ${process.env.PORT}`);
})
