import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDatabase } from './config/database.js';
import Appointment from './models/Appointment.js';
import Bed from './models/Bed.js';
import DashboardSnapshot from './models/DashboardSnapshot.js';
import Notification from './models/Notification.js';
import QueueEntry from './models/QueueEntry.js';
import User from './models/User.js';
import { seedDatabase } from './seedDatabase.js';
import { dashboardData, demoUsers } from './fixtures.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'development-only-change-me';

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

function asyncRoute(handler) {
    return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function authenticateToken(req, res, next) {
    const authorization = req.headers.authorization || '';
    if (!authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        req.auth = jwt.verify(authorization.slice(7), jwtSecret);
        next();
    } catch {
        res.status(401).json({ message: 'Your session has expired. Please log in again.' });
    }
}

function safeUser(user) {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
    };
}

function createToken(user) {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, jwtSecret, { expiresIn: '7d' });
}

function formatDashboard(role, payload) {
    if (role !== 'user') return payload;
    return {
        name: payload.name,
        appointment: payload.todayAppointment,
        queueNumber: payload.queueNumber,
        estimatedWait: payload.estimatedWait,
        doctor: payload.doctor,
        status: payload.hospitalStatus,
        progress: payload.queueProgress,
        appointments: payload.appointments,
        notificationList: payload.notifications,
        bedSummary: payload.bedSummary,
    };
}

function uniqueAppointments(appointments) {
    const seen = new Set();
    return appointments.filter((appointment) => {
        const key = [appointment.patientName, appointment.doctorName, appointment.date, appointment.time].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

app.get('/api/health', (req, res) => {
    const connected = mongoose.connection.readyState === 1;
    res.json({ status: connected ? 'ok' : 'starting', service: 'Hospital OPD Backend', database: connected ? 'connected' : 'disconnected' });
});

app.post('/api/auth/login', asyncRoute(async(req, res) => {
    const email = String((req.body && req.body.email) || '').trim().toLowerCase();
    const password = String((req.body && req.body.password) || '');
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (req.body && req.body.role && req.body.role !== user.role) {
        return res.status(403).json({ message: 'This account does not have the selected role.' });
    }
    res.json({ token: createToken(user), user: safeUser(user), redirect: `/${user.role}/dashboard` });
}));

app.post('/api/auth/signup', asyncRoute(async(req, res) => {
    const { fullName, email, phone, password, gender, dob } = req.body || {};
    if (!fullName || !email || !phone || !password) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    if (await User.exists({ email: normalizedEmail })) {
        return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const user = await User.create({
        name: String(fullName).trim(),
        email: normalizedEmail,
        phone: String(phone).trim(),
        passwordHash: await bcrypt.hash(String(password), 12),
        gender,
        dob,
        role: 'user',
    });
    res.status(201).json({ token: createToken(user), user: safeUser(user), redirect: '/user/dashboard' });
}));

app.get('/api/dashboard/:role', authenticateToken, asyncRoute(async(req, res) => {
    const { role } = req.params;
    if (req.auth.role !== role) return res.status(403).json({ message: 'You do not have access to this dashboard.' });

    const snapshot = await DashboardSnapshot.findOne({ role }).lean();
    if (!snapshot) return res.status(404).json({ message: 'Dashboard data not found.' });
    const payload = formatDashboard(role, snapshot.payload);

    if (role === 'admin') {
        const [beds, queue, doctorCount] = await Promise.all([
            Bed.find().sort({ department: 1, bedNumber: 1 }).lean(),
            QueueEntry.find().sort({ queueNumber: 1 }).lean(),
            User.countDocuments({ role: 'doctor' }),
        ]);
        payload.beds = beds.map((bed) => ({...bed, bed: bed.bedNumber, patient: bed.patientName || '—' }));
        payload.queue = queue.map((entry) => ({
            patient: entry.patientName,
            department: entry.department,
            doctor: entry.doctorName,
            status: entry.status,
            wait: `${entry.waitingMinutes} min`,
            queue: entry.queueNumber,
        }));
        payload.stats = payload.stats.map((stat) => {
            if (stat.label === 'Available Beds') return {...stat, value: beds.filter((bed) => bed.status === 'Available').length };
            if (stat.label === 'Occupied Beds') return {...stat, value: beds.filter((bed) => bed.status === 'Occupied').length };
            if (stat.label === 'Active Queues') return {...stat, value: queue.filter((entry) => ['Waiting', 'In Consultation'].includes(entry.status)).length };
            if (stat.label === 'Available Doctors') return {...stat, value: doctorCount };
            return stat;
        });
        return res.json(payload);
    }

    if (role === 'staff') {
        const [beds, notifications] = await Promise.all([
            Bed.find().sort({ department: 1, bedNumber: 1 }).lean(),
            Notification.find({ role }).sort({ createdAt: -1 }).lean(),
        ]);
        payload.beds = beds.map((bed) => ({...bed, patient: bed.patientName || '—' }));
        payload.notifications = notifications.map((notification) => notification.text);
        return res.json(payload);
    }

    const user = await User.findById(req.auth.id).lean();
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });

    if (role === 'doctor') {
        const [appointments, notifications, queue] = await Promise.all([
            Appointment.find({ doctorName: user.name }).sort({ date: 1, time: 1 }).lean(),
            Notification.find({ role }).sort({ createdAt: -1 }).lean(),
            QueueEntry.find({ doctorName: user.name }).sort({ queueNumber: 1 }).lean(),
        ]);
        payload.appointments = uniqueAppointments(appointments).map((appointment) => ({
            name: appointment.patientName,
            department: appointment.department,
            time: appointment.time,
            status: appointment.status,
        }));
        payload.notifications = notifications.map((notification) => notification.text);
        payload.queue = queue.filter((entry) => entry.age !== undefined).map((entry) => ({
            patient: entry.patientName,
            age: entry.age,
            condition: entry.condition,
            status: entry.status,
        }));
        return res.json(payload);
    }

    const [appointments, bedSummary, notifications, queueEntry] = await Promise.all([
        Appointment.find({ patientName: user.name }).sort({ date: 1, time: 1 }).lean(),
        Bed.aggregate([
            { $group: { _id: { department: '$department', status: '$status' }, count: { $sum: 1 } } },
            { $group: { _id: '$_id.department', counts: { $push: { status: '$_id.status', count: '$count' } } } },
        ]),
        Notification.find({ role }).sort({ createdAt: -1 }).lean(),
        QueueEntry.findOne({ patientName: user.name, status: { $in: ['Waiting', 'In Consultation'] } }).sort({ queueNumber: 1 }).lean(),
    ]);
    payload.name = user.name;
    payload.appointments = uniqueAppointments(appointments).map((appointment) => ({
        doctor: appointment.doctorName,
        department: appointment.department,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
    }));
    payload.bedSummary = bedSummary.map(({ _id, counts }) => ({
        department: _id,
        available: (counts.find((entry) => entry.status === 'Available') || {}).count || 0,
        occupied: (counts.find((entry) => entry.status === 'Occupied') || {}).count || 0,
    }));
    payload.notificationList = notifications.map(({ title, text }) => ({ title, text }));
    if (queueEntry) {
        payload.queueNumber = queueEntry.queueNumber;
        payload.estimatedWait = `${queueEntry.waitingMinutes} mins`;
        payload.doctor = queueEntry.doctorName;
    }
    res.json(payload);
}));

app.get('/api/appointments', authenticateToken, asyncRoute(async(req, res) => {
    const user = await User.findById(req.auth.id).lean();
    const filter = req.auth.role === 'admin' ? {} :
        req.auth.role === 'doctor' ? { doctorName: user.name } : { patientName: user.name };
    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 }).lean();
    res.json(uniqueAppointments(appointments));
}));

app.get('/api/beds', authenticateToken, asyncRoute(async(req, res) => {
    res.json(await Bed.find().sort({ department: 1, bedNumber: 1 }).lean());
}));

app.patch('/api/beds/:bedNumber/status', authenticateToken, asyncRoute(async(req, res) => {
    if (!['admin', 'staff'].includes(req.auth.role)) {
        return res.status(403).json({ message: 'Only hospital staff can update bed status.' });
    }
    const allowedStatuses = ['Available', 'Occupied', 'Reserved', 'Cleaning'];
    if (!allowedStatuses.includes(req.body && req.body.status)) return res.status(400).json({ message: 'Invalid bed status.' });
    const bed = await Bed.findOneAndUpdate({ bedNumber: req.params.bedNumber }, { status: req.body.status, lastUpdated: new Date() }, { new: true, runValidators: true }, ).lean();
    if (!bed) return res.status(404).json({ message: 'Bed not found.' });
    res.json(bed);
}));

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'An unexpected server error occurred.' });
});

let databaseInitialization;

export function initializeDatabase() {
    if (!databaseInitialization) {
        const includeDemoUsers = process.env.VERCEL !== '1' && process.env.SEED_DEMO_DATA !== 'false';
        databaseInitialization = connectDatabase()
            .then(() => seedDatabase(demoUsers, dashboardData, { includeDemoUsers }))
            .catch((error) => {
                databaseInitialization = null;
                throw error;
            });
    }
    return databaseInitialization;
}

async function startServer() {
    try {
        await initializeDatabase();
        app.listen(port, () => console.log(`Hospital backend running on http://localhost:${port}`));
    } catch (error) {
        console.error(`Unable to start the hospital backend: ${error.message}`);
        process.exitCode = 1;
    }
}

if (process.argv[1] && fileURLToPath(
        import.meta.url) === resolve(process.argv[1])) {
    startServer();
}

export { app };