export const demoUsers = [
    { name: 'Aarav Sharma', email: 'patient@hospital.com', password: 'Patient@123', role: 'user', phone: '+91 98765 43210', dob: '2000-12-15', gender: 'Male' },
    { name: 'Dr. Meera Nair', email: 'doctor@hospital.com', password: 'Doctor@123', role: 'doctor', phone: '+91 98111 55223', dob: '1986-05-20', gender: 'Female' },
    { name: 'Riya Kapoor', email: 'admin@hospital.com', password: 'Admin@123', role: 'admin', phone: '+91 99122 33445', dob: '1990-11-08', gender: 'Female' },
    { name: 'Nisha Singh', email: 'staff@hospital.com', password: 'Staff@123', role: 'staff', phone: '+91 90000 11223', dob: '1995-02-18', gender: 'Female' },
];

export const dashboardData = {
    patient: {
        name: 'Aarav Sharma',
        todayAppointment: 'Cardiology Review',
        queueNumber: 'Q-204',
        estimatedWait: '12 mins',
        doctor: 'Dr. Meera Nair',
        hospitalStatus: 'Operational',
        queueProgress: 68,
        appointments: [
            { doctor: 'Dr. Meera Nair', department: 'Cardiology', date: '2026-09-29', time: '10:30 AM', status: 'Confirmed' },
            { doctor: 'Dr. Rohan Sethi', department: 'Neurology', date: '2026-09-30', time: '02:00 PM', status: 'Upcoming' },
        ],
        bedSummary: [],
        notifications: [
            { title: 'Queue Update', text: 'Your queue number is now Q-204.' },
            { title: 'Appointment Reminder', text: 'Cardiology review at 10:30 AM today.' },
            { title: 'Hospital Update', text: 'Emergency ward is currently busy.' },
        ],
    },
    admin: {
        stats: [
            { label: 'Total Patients Today', value: 168 }, { label: 'OPD Patients', value: 94 },
            { label: 'Active Queues', value: 11 }, { label: 'Available Beds', value: 38 },
            { label: 'Occupied Beds', value: 42 }, { label: 'Available Doctors', value: 26 },
        ],
        queue: [
            { patient: 'Aisha Khan', department: 'General Medicine', doctor: 'Dr. Kavita Rao', status: 'Waiting', waitingTime: '14 min', queue: 'Q-101' },
            { patient: 'Rohit Verma', department: 'Orthopedics', doctor: 'Dr. Aditya Shah', status: 'In Consultation', waitingTime: '6 min', queue: 'Q-102' },
            { patient: 'Neha Joshi', department: 'Pediatrics', doctor: 'Dr. Priya Singh', status: 'Completed', waitingTime: '0 min', queue: 'Q-103' },
        ],
        beds: [
            { bedNumber: 'G-14', department: 'General', ward: 'Ward A', status: 'Available', patient: '—' },
            { bedNumber: 'ICU-02', department: 'ICU', ward: 'ICU Block', status: 'Occupied', patient: 'Rakesh' },
            { bedNumber: 'ER-06', department: 'Emergency', ward: 'ER', status: 'Reserved', patient: 'Aditi' },
            { bedNumber: 'PED-09', department: 'Pediatrics', ward: 'Pediatric Ward', status: 'Cleaning', patient: '—' },
        ],
        chartData: [
            { name: 'Mon', patients: 120 }, { name: 'Tue', patients: 148 }, { name: 'Wed', patients: 132 },
            { name: 'Thu', patients: 169 }, { name: 'Fri', patients: 182 }, { name: 'Sat', patients: 192 }, { name: 'Sun', patients: 175 },
        ],
        departmentData: [
            { department: 'General', patients: 52 }, { department: 'Cardiology', patients: 31 },
            { department: 'Orthopedics', patients: 26 }, { department: 'Pediatrics', patients: 18 }, { department: 'Neurology', patients: 22 },
        ],
    },
    doctor: {
        appointments: [
            { name: 'Aarav Sharma', department: 'Cardiology', time: '10:30 AM', status: 'Waiting' },
            { name: 'Pooja Sen', department: 'Cardiology', time: '11:15 AM', status: 'In Consultation' },
            { name: 'Karan Malhotra', department: 'Cardiology', time: '12:00 PM', status: 'Confirmed' },
        ],
        queue: [
            { patient: 'Aarav Sharma', age: 26, condition: 'Hypertension review', status: 'Waiting' },
            { patient: 'Pooja Sen', age: 34, condition: 'Chest pain follow-up', status: 'In Consultation' },
            { patient: 'Ishita Mehta', age: 41, condition: 'ECG review', status: 'Pending' },
        ],
        notifications: ['Ward intake approved', 'Lab reports received', 'Two patients need follow-up calls'],
    },
    staff: {
        beds: [
            { bedNumber: 'G-18', department: 'General', ward: 'Ward C', status: 'Available', patient: '—' },
            { bedNumber: 'ICU-07', department: 'ICU', ward: 'ICU Block', status: 'Occupied', patient: 'Mukesh' },
            { bedNumber: 'ER-08', department: 'Emergency', ward: 'ER', status: 'Cleaning', patient: '—' },
            { bedNumber: 'PED-14', department: 'Pediatrics', ward: 'Pediatric Ward', status: 'Reserved', patient: 'Anya' },
        ],
        notifications: ['Admission clearance pending', 'Bed cleaning requested in ICU Ward', 'Discharge paperwork for Ishan'],
    },
};