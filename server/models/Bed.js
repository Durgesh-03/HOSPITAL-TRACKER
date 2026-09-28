import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
    bedNumber: { type: String, required: true, unique: true, trim: true },
    department: { type: String, required: true, trim: true },
    ward: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Cleaning'], required: true, default: 'Available' },
    patientName: { type: String, default: '' },
    lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

bedSchema.index({ department: 1, status: 1 });

export default mongoose.model('Bed', bedSchema);