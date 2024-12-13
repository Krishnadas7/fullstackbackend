import mongoose from "mongoose";

const DB_STRING: string = process.env.DB_STRING || 'mongodb://127.0.0.1:27017/eventhive'

const connectDb = async () => {
    try {
        await mongoose.connect(DB_STRING);
        
        console.log(`Database connected on ${mongoose.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default connectDb;
