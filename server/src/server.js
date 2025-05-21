import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import morgan from "morgan";
import fileUpload from "express-fileupload";
import connectDB from './config/db.config.js'
import userRoutes from './routes/user.route.js'
import productRoutes from './routes/product.route.js'
import errorHandler from './middlewares/error.middleware.js'
import notFound from './middlewares/notFound.middleware.js'
dotenv.config() 
connectDB() //Database Connection

const app = express()

// Use morgan middleware for logging HTTP requests
app.use(morgan("dev"));

// Middlewares
app.use(bodyParser.json())
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Express',
        'Pragma'
    ],
    credentials: true
}))

// Routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/product", productRoutes)

// Error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})