import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patientName: { type: String, required: true, trim: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctorName: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['Confirmed', 'Upcoming', 'Waiting', 'In Consultation', 'Completed', 'Cancelled'], default: 'Upcoming' },
}, { timestamps: true });

appointmentSchema.index({ patientId: 1, date: 1 });

export default mongoose.model('Appointment', appointmentSchema);