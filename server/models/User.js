import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'doctor', 'admin', 'staff'], required: true, default: 'user' },
    phone: { type: String, trim: true },
    dob: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
}, { timestamps: true });

export default mongoose.model('User', userSchema);