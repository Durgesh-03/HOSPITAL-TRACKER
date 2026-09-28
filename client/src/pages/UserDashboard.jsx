import { motion } from 'framer-motion';
import {
  Activity,
  Bell,
  BedDouble,
  CalendarRange,
  Clock3,
  FileText,
  HeartPulse,
  LayoutDashboard,
  MessageSquareText,
  Pill,
  Stethoscope,
  UserRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userDashboardData as fallbackDashboardData } from '../data/mockData';
import { useDashboard } from '../hooks/useDashboard';
import AIChatModal from '../components/AIChatModal';

const sidebarItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Book OPD', icon: CalendarRange },
  { label: 'My Queue', icon: Clock3 },
  { label: 'Appointments', icon: Stethoscope },
  { label: 'Doctors', icon: HeartPulse },
  { label: 'Bed Availability', icon: BedDouble },
  { label: 'Notifications', icon: Bell },
  { label: 'Medical Records', icon: FileText },
  { label: 'AI Assistant', icon: MessageSquareText },
  { label: 'Profile', icon: UserRound },
  { label: 'Logout', icon: Pill },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const { data: userDashboardData, error: dashboardError } = useDashboard('user', fallbackDashboardData);
  const name = user?.name || userDashboardData.name;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 lg:p-6">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200 lg:block">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-white"><HeartPulse className="h-5 w-5" /></div>
            <div>
              <div className="text-lg font-black text-slate-900">MediFlow</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Patient Portal</div>
            </div>
          </div>

          <nav className="mt-6 space-y-2">
            {sidebarItems.map(({ label, icon: Icon }) => (
              <button key={label} type="button" className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${label === 'Dashboard' ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
                <h1 className="mt-2 text-3xl font-black text-slate-900">Good Morning, {name}</h1>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-sky-50 px-4 py-2 text-sm text-sky-700">
                <Activity className="h-4 w-4" />
                <span>Hospital Status: {userDashboardData.status}</span>
              </div>
            </div>
          </header>

          {dashboardError && <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Showing sample data because the database API is unavailable: {dashboardError}</div>}

          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Today\'s Appointment', value: userDashboardData.appointment },
              { label: 'Queue Number', value: userDashboardData.queueNumber },
              { label: 'Estimated Waiting Time', value: userDashboardData.estimatedWait },
              { label: 'Doctor', value: userDashboardData.doctor },
            ].map((item) => (
              <motion.div key={item.label} whileHover={{ y: -5 }} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-4 text-xl font-black text-slate-900">{item.value}</div>
              </motion.div>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">My Queue</h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Current</span>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Queue Number', value: userDashboardData.queueNumber },
                  { label: 'Current Serving', value: 'Q-197' },
                  { label: 'People Ahead', value: '7' },
                  { label: 'Waiting Time', value: userDashboardData.estimatedWait },
                ].map((detail) => (
                  <div key={detail.label} className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{detail.label}</div>
                    <div className="mt-2 text-lg font-bold text-slate-900">{detail.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm text-slate-600"><span>Queue progress</span><span>{userDashboardData.progress}%</span></div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-500" style={{ width: `${userDashboardData.progress}%` }} />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Notifications</h2>
              <div className="mt-5 space-y-4">
                {userDashboardData.notificationList.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="text-sm font-bold text-slate-900">{item.title}</div>
                    <div className="mt-2 text-sm text-slate-600">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900">Upcoming Appointments</h2>
                <button type="button" className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">View all</button>
              </div>
              <div className="space-y-4">
                {userDashboardData.appointments.map((appointment) => (
                  <div key={`${appointment.doctor}-${appointment.date}`} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-bold text-slate-900">{appointment.doctor}</div>
                      <div className="mt-1 text-sm text-slate-500">{appointment.department}</div>
                    </div>
                    <div className="text-sm text-slate-600">{appointment.date} • {appointment.time}</div>
                    <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{appointment.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
              <h2 className="text-xl font-black text-slate-900">Bed Availability</h2>
              <div className="mt-5 space-y-4">
                {userDashboardData.bedSummary.map((entry) => (
                  <div key={entry.department} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{entry.department}</span>
                      <span className="text-sm text-slate-500">{entry.available} available</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-xl bg-white p-2 text-slate-600">Occupied <span className="ml-2 font-bold text-rose-600">{entry.occupied}</span></div>
                      <div className="rounded-xl bg-white p-2 text-slate-600">Available <span className="ml-2 font-bold text-emerald-600">{entry.available}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <AIChatModal title="Patient Assistant" suggestions={['What is my queue number?', 'How many people are before me?', 'Which departments have available beds?']} />
    </div>
  );
}
