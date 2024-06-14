import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users";

// Load environment variables from .env file
dotenv.config();

const connectionString = process.env.MONGODB_CONNECTION_STRING;

// Check if connection string is loaded
if (!connectionString) {
  throw new Error('MONGODB_CONNECTION_STRING is not defined in the environment variables.');
}

mongoose.connect(connectionString as string)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Database connection error:', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', userRoutes)
app.listen(3000, () => console.log('Server is running on port 3000'));
