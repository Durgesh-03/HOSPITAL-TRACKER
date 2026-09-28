import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['user', 'doctor', 'admin', 'staff'], required: true },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });

notificationSchema.index({ role: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);