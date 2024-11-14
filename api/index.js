import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import carRouter from './routes/car.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const mongoUrl = process.env.MONGOURL;

mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB!")
}).catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server is running on port 3000!");
});

// app.use(express.urlencoded({
//     extended: true
// }))

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/car', carRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; //500 means internal server error
    const message = err.message || "Internal Sever Error";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});