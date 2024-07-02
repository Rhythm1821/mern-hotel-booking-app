import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Load environment variables from .env file
const envFile = process.env.NODE_ENV === 'e2e' ? '.env.e2e' : '.env';
dotenv.config({ path: envFile });

const connectionString = process.env.MONGODB_CONNECTION_STRING;


mongoose.connect(connectionString as string)
  .then(() => console.log('Database connected!', connectionString))
  .catch((err) => console.log('Database connection error:', err));

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.listen(3000, () => console.log('Server is running on port 3000'));
