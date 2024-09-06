import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET_ACCESSTOKEN || 's3cr3t';
export const PORT: any = process.env.PORT || 5000;
export const MONGO_DB_URL: string = process.env.DB_URL || 'mongodb://root:password@tasksdb-dev:27017/';
