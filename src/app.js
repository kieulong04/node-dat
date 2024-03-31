import express from 'express';
import productRouter from './router/products';
import authRouter  from './router/auth';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"));

//connect
connectDB(process.env.DB_Uri);

//routes
app.use('/api',productRouter);
app.use('/api',authRouter);


export const viteNodeApp = app;
