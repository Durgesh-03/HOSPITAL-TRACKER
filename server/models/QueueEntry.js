import mongoose from 'mongoose';

const queueEntrySchema = new mongoose.Schema({
    queueNumber: { type: String, required: true, unique: true, trim: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patientName: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    doctorName: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Waiting', 'In Consultation', 'Completed', 'Pending'], default: 'Waiting' },
    waitingMinutes: { type: Number, min: 0, default: 0 },
    age: { type: Number, min: 0 },
    condition: { type: String, default: '' },
}, { timestamps: true });

queueEntrySchema.index({ department: 1, status: 1 });

export default mongoose.model('QueueEntry', queueEntrySchema);