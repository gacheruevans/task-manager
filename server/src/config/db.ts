import mongoose, { ConnectOptions } from 'mongoose';
import { MONGO_DB_URL } from '../config/config';

export const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_DB_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        } as ConnectOptions );

        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('MongoDB Database connection established successfully');
        });
        
    } catch (error) {
        throw new Error(`MongoDB Database connection failed: ${error}`);
    }
};