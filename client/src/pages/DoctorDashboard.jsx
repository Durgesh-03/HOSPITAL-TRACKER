import { motion } from 'framer-motion';
import { Activity, Bell, CalendarCheck2, Clock3, FileText, Hospital, MessageSquareText, PlusCircle, Stethoscope, UserRound } from 'lucide-react';
import { doctorDashboardData as fallbackDashboardData } from '../data/mockData';
import { useDashboard } from '../hooks/useDashboard';
import AIChatModal from '../components/AIChatModal';

export default function DoctorDashboard() {
  const { data: doctorDashboardData, error: dashboardError } = useDashboard('doctor', fallbackDashboardData);

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 text-slate-800 lg:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Doctor Portal</p>
              <h1 className="mt-2 text-3xl font-black text-slate-900">Good Morning, Dr. Meera Nair</h1>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <Activity className="h-4 w-4" />
              Available for consultation
            </div>
          </div>
        </header>

        {dashboardError && <div role="status" className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">Showing sample data because the database API is unavailable: {dashboardError}</div>}

        <section className="grid gap-5 md:grid-cols-3">
          {[
            { label: 'Today\'s appointments', value: '18' },
            { label: 'Current OPD queue', value: '07' },
            { label: 'Unattended calls', value: '02' },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ y: -5 }} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200">
              <div className="text-sm text-slate-500">{stat.label}</div>
              <div className="mt-4 text-3xl font-black text-slate-900">{stat.value}</div>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900">Today’s appointments</h2>
              <button type="button" className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">Schedule</button>
            </div>
            <div className="space-y-4">
              {doctorDashboardData.appointments.map((appointment) => (
                <div key={`${appointment.name}-${appointment.time}`} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">{appointment.name}</div>
                    <div className="text-sm text-slate-500">{appointment.department}</div>
                  </div>
                  <div className="text-sm text-slate-600">{appointment.time}</div>
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${appointment.status === 'In Consultation' ? 'bg-sky-100 text-sky-700' : appointment.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{appointment.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Notifications</h2>
            <div className="mt-5 space-y-4">
              {doctorDashboardData.notifications.map((notification) => (
                <div key={notification} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <Bell className="h-4 w-4 text-sky-600" />
                  {notification}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Current OPD queue</h2>
            <div className="mt-5 space-y-4">
              {doctorDashboardData.queue.map((customer) => (
                <div key={customer.patient} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-bold text-slate-900">{customer.patient}</div>
                    <div className="text-sm text-slate-500">Age {customer.age} • {customer.condition}</div>
                  </div>
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${customer.status === 'In Consultation' ? 'bg-sky-100 text-sky-700' : customer.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-700'}`}>{customer.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
            <h2 className="text-xl font-black text-slate-900">Quick actions</h2>
            <div className="mt-5 grid gap-3">
              {[
                { label: 'Start consultation', icon: Stethoscope },
                { label: 'Complete consultation', icon: FileText },
                { label: 'Call next patient', icon: CalendarCheck2 },
                { label: 'Update availability', icon: Clock3 },
              ].map(({ label, icon: Icon }) => (
                <button key={label} type="button" className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50">
                  <span className="flex items-center gap-3"><Icon className="h-4 w-4 text-sky-600" /> {label}</span>
                  <PlusCircle className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <AIChatModal title="Doctor Support" suggestions={['Which patient is next?', 'What is the current queue?', 'View appointment schedule.']} />
    </div>
  );
}
