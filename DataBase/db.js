import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const DB_NAME = process.env.DB_NAME || 'dbcurso';

const MONGO_DB_URL = `${MONGO_URL}${DB_NAME}?authSource=admin`;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_DB_URL);
        console.log('Conectado a MongoDB');
    } catch (error) {
        console.error('Error de conexión de MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;

