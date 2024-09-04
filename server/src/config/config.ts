import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET_ACCESSTOKEN || '';
export const PORT: string = process.env.PORT || '';
export const MONGO_DB_URL: string = process.env.MONGO_URL || '';