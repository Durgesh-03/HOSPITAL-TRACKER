import mongoose from 'mongoose';

export async function connectDatabase() {
    if (process.env.VERCEL === '1' && !process.env.MONGODB_URI) {
        throw new Error('Set MONGODB_URI in the Vercel project environment variables.');
    }
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hospital_opd';
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
}