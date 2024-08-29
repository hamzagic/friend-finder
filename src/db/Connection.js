import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_URI;

const main = async () => {
    await mongoose.connect(url);
    console.log('connected!');
}

export default main;