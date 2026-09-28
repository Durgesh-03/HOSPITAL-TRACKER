import mongoose from 'mongoose';

const dashboardSnapshotSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'doctor', 'admin', 'staff'], required: true, unique: true },
    payload: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true });

export default mongoose.model('DashboardSnapshot', dashboardSnapshotSchema);