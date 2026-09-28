import bcrypt from 'bcryptjs';
import Appointment from './models/Appointment.js';
import Bed from './models/Bed.js';
import DashboardSnapshot from './models/DashboardSnapshot.js';
import Notification from './models/Notification.js';
import QueueEntry from './models/QueueEntry.js';
import User from './models/User.js';

export async function seedDatabase(demoUsers, dashboardData, { includeDemoUsers = true } = {}) {
    if (includeDemoUsers) {
        for (const user of demoUsers) {
            const { id, password, ...profile } = user;
            const role = profile.role === 'patient' ? 'user' : profile.role;
            await User.updateOne({ email: profile.email.toLowerCase() }, { $setOnInsert: {...profile, role, passwordHash: await bcrypt.hash(password, 12) } }, { upsert: true }, );
        }
    }

    const dashboardRoles = Object.entries(dashboardData).map(([role, payload]) => [
        role === 'patient' ? 'user' : role,
        payload,
    ]);
    for (const [role, payload] of dashboardRoles) {
        await DashboardSnapshot.updateOne({ role }, { $setOnInsert: { role, payload } }, { upsert: true });
    }

    if (await Appointment.estimatedDocumentCount() === 0) {
        const patientAppointments = dashboardData.patient.appointments.map((appointment) => ({
            patientName: dashboardData.patient.name,
            doctorName: appointment.doctor,
            department: appointment.department,
            date: appointment.date,
            time: appointment.time,
            status: appointment.status,
        }));
        const patientSlots = new Set(patientAppointments.map((appointment) => [
            appointment.patientName,
            appointment.doctorName,
            appointment.date,
            appointment.time,
        ].join('|')));
        const doctorAppointments = dashboardData.doctor.appointments.filter((appointment) => !patientSlots.has([
            appointment.name,
            'Dr. Meera Nair',
            '2026-09-29',
            appointment.time,
        ].join('|'))).map((appointment) => ({
            patientName: appointment.name,
            doctorName: 'Dr. Meera Nair',
            department: appointment.department,
            date: '2026-09-29',
            time: appointment.time,
            status: appointment.status,
        }));
        await Appointment.insertMany([...patientAppointments, ...doctorAppointments]);
    }

    if (await Bed.estimatedDocumentCount() === 0) {
        const beds = [...dashboardData.admin.beds, ...dashboardData.staff.beds];
        await Bed.insertMany(beds.map((bed) => ({
            bedNumber: bed.bedNumber,
            department: bed.department,
            ward: bed.ward,
            status: bed.status,
            patientName: bed.patient === '—' ? '' : bed.patient,
            lastUpdated: new Date(),
        })));
    }

    if (await QueueEntry.estimatedDocumentCount() === 0) {
        const adminQueue = dashboardData.admin.queue.map((entry) => ({
            queueNumber: entry.queue,
            patientName: entry.patient,
            department: entry.department,
            doctorName: entry.doctor,
            status: entry.status,
            waitingMinutes: Number.parseInt(entry.waitingTime, 10) || 0,
        }));
        const doctorQueue = dashboardData.doctor.queue.map((entry, index) => ({
            queueNumber: `Q-20${index + 1}`,
            patientName: entry.patient,
            department: 'Cardiology',
            doctorName: 'Dr. Meera Nair',
            status: entry.status,
            age: entry.age,
            condition: entry.condition,
        }));
        await QueueEntry.insertMany([...adminQueue, ...doctorQueue]);
    }

    if (await Notification.estimatedDocumentCount() === 0) {
        const notifications = [
            ...dashboardData.patient.notifications.map(({ title, text }) => ({ role: 'user', title, text })),
            ...dashboardData.doctor.notifications.map((text) => ({ role: 'doctor', title: 'Care update', text })),
            ...dashboardData.staff.notifications.map((text) => ({ role: 'staff', title: 'Ward update', text })),
        ];
        await Notification.insertMany(notifications);
    }

    console.log('Demo records are ready in MongoDB.');
}