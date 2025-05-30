import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';

if (!DB_URI) {
    throw new Error("DB_URI is not defined. Please set it in your environment variables.");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB