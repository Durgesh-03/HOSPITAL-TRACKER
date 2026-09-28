export const homeStats = [
    { label: 'Patients Served Today', value: '2,486', trend: '+12%' },
    { label: 'Active OPD Queues', value: '128', trend: '+8%' },
    { label: 'Available Beds', value: '84', trend: '+5%' },
    { label: 'Doctors Available', value: '42', trend: '+3%' },
];

export const features = [
    { title: 'Smart OPD Queue', description: 'Track patient flow, queue order, and wait times with real-time updates.', icon: 'Stethoscope' },
    { title: 'Real-Time Bed Tracking', description: 'Monitor occupancy across departments and urgent room availability.', icon: 'BedDouble' },
    { title: 'Doctor Availability', description: 'See which clinicians are free, in consultation, or off duty.', icon: 'CalendarCheck' },
    { title: 'Appointment Management', description: 'Schedule, confirm, and follow up on patient appointments seamlessly.', icon: 'BellRing' },
    { title: 'Instant Notifications', description: 'Keep staff and patients informed with queue and reminder updates.', icon: 'Megaphone' },
    { title: 'AI Hospital Assistant', description: 'Answer common OPD, bed, and guidance questions at the click of a button.', icon: 'Sparkles' },
];

export const bedPreview = [
    { department: 'General', total: 36, occupied: 24, available: 10, reserved: 2 },
    { department: 'ICU', total: 18, occupied: 12, available: 4, reserved: 2 },
    { department: 'Emergency', total: 24, occupied: 16, available: 6, reserved: 2 },
    { department: 'Pediatrics', total: 20, occupied: 13, available: 5, reserved: 2 },
];

export const queueTable = [
    { patient: 'Aisha Khan', queue: 'Q-101', status: 'Waiting', doctor: 'Dr. Kavita Rao', wait: '14 min' },
    { patient: 'Rohit Verma', queue: 'Q-102', status: 'In Consultation', doctor: 'Dr. Aditya Shah', wait: '6 min' },
    { patient: 'Neha Joshi', queue: 'Q-103', status: 'Completed', doctor: 'Dr. Priya Singh', wait: '0 min' },
    { patient: 'Anand Roy', queue: 'Q-104', status: 'Waiting', doctor: 'Dr. Mohan Iyer', wait: '20 min' },
];

export const adminStats = [
    { label: 'Total Patients Today', value: 168 },
    { label: 'OPD Patients', value: 94 },
    { label: 'Active Queues', value: 11 },
    { label: 'Available Beds', value: 38 },
    { label: 'Occupied Beds', value: 42 },
    { label: 'Available Doctors', value: 26 },
];

export const adminChartData = [
    { name: 'Mon', patients: 120 },
    { name: 'Tue', patients: 148 },
    { name: 'Wed', patients: 132 },
    { name: 'Thu', patients: 169 },
    { name: 'Fri', patients: 182 },
    { name: 'Sat', patients: 192 },
    { name: 'Sun', patients: 175 },
];

export const departmentPatients = [
    { department: 'General', patients: 52 },
    { department: 'Cardiology', patients: 31 },
    { department: 'Orthopedics', patients: 26 },
    { department: 'Pediatrics', patients: 18 },
    { department: 'Neurology', patients: 22 },
];

export const userDashboardData = {
    name: 'Aarav Sharma',
    appointment: 'Cardiology Review',
    queueNumber: 'Q-204',
    estimatedWait: '12 mins',
    doctor: 'Dr. Meera Nair',
    status: 'Operational',
    progress: 68,
    appointments: [
        { doctor: 'Dr. Meera Nair', department: 'Cardiology', date: '2026-09-28', time: '10:30 AM', status: 'Confirmed' },
        { doctor: 'Dr. Rohan Sethi', department: 'Neurology', date: '2026-09-29', time: '02:00 PM', status: 'Upcoming' },
    ],
    notificationList: [
        { title: 'Queue Update', text: 'Your queue number is now Q-204.' },
        { title: 'Appointment Reminder', text: 'Cardiology review at 10:30 AM today.' },
        { title: 'Hospital Update', text: 'Emergency ward is currently busy.' },
    ],
    bedSummary: [
        { department: 'General', available: 12, occupied: 8 },
        { department: 'ICU', available: 4, occupied: 6 },
        { department: 'Emergency', available: 6, occupied: 9 },
        { department: 'Pediatrics', available: 9, occupied: 5 },
        { department: 'Surgery', available: 7, occupied: 11 },
    ],
};

export const doctorDashboardData = {
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
};

export const staffDashboardData = {
    beds: [
        { bedNumber: 'G-18', department: 'General', ward: 'Ward C', status: 'Available', patient: '—' },
        { bedNumber: 'ICU-07', department: 'ICU', ward: 'ICU Block', status: 'Occupied', patient: 'Mukesh' },
        { bedNumber: 'ER-08', department: 'Emergency', ward: 'ER', status: 'Cleaning', patient: '—' },
        { bedNumber: 'PED-14', department: 'Pediatrics', ward: 'Pediatric Ward', status: 'Reserved', patient: 'Anya' },
    ],
    notifications: ['Admission clearance pending', 'Bed cleaning requested in ICU Ward', 'Discharge paperwork for Ishan'],
};